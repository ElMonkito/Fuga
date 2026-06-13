import { expect, test } from "@playwright/test";

test.describe("Search page", () => {
  test("filtre les offres par destination et budget", async ({ page }) => {
    await page.goto("/recherche");

    await page.getByLabel("Destination").fill("Espagne");
    await page
      .getByRole("slider", { name: "Budget", exact: true })
      .evaluate((element) => {
        const input = element as HTMLInputElement;
        const descriptor = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        );

        descriptor?.set?.call(input, "300");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    await page.getByRole("button", { name: "Chercher" }).click();

    await expect(page).toHaveURL(/destination=Espagne/);
    await expect(page).toHaveURL(/budget=300/);

    const rows = page.getByTestId("search-offer-row");
    await expect(rows.first()).toBeVisible();

    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < Math.min(count, 3); index += 1) {
      await expect(rows.nth(index)).toContainText("Espagne");
      await expect(rows.nth(index)).toContainText("CHF");
    }
  });

  test("applique aussi les filtres avancés de pays et de mot-clé", async ({ page }) => {
    await page.goto("/recherche");

    await page.getByLabel("Pays").selectOption("Portugal");
    await expect(page).toHaveURL(/country=Portugal/);
    await page.getByRole("button", { name: "Annulation gratuite" }).click();

    await expect(page).toHaveURL(/tag=Annulation(\+|%20)gratuite/);
    await expect(page.getByTestId("search-offer-row").first()).toContainText("Portugal");
  });
});
