import { expect, test } from "@playwright/test";

test.describe("Acceptance - recherche", () => {
  test("retourne des offres cohérentes avec destination, budget et dates conservées @acceptance", async ({
    page
  }) => {
    await page.goto(
      "/recherche?destination=Espagne&departureDate=2026-07-01&returnDate=2026-07-07&budget=300",
      { waitUntil: "domcontentloaded" }
    );

    await expect(page.getByLabel("Destination")).toHaveValue("Espagne");
    await expect(page).toHaveURL(/destination=Espagne/);
    await expect(page).toHaveURL(/departureDate=2026-07-01/);
    await expect(page).toHaveURL(/returnDate=2026-07-07/);
    await expect(page).toHaveURL(/budget=300/);

    const firstResult = page.getByTestId("search-offer-row").first();
    await expect(firstResult).toBeVisible();
    await expect(firstResult).toContainText("Espagne");
    await expect(firstResult).toContainText("CHF");

    await firstResult.getByRole("link", { name: /Voir l’offre/i }).click();

    await expect(page.getByText("Dates sélectionnées:")).toBeVisible();
    await expect(page.getByRole("button", { name: /Réserver · .*CHF/i })).toBeVisible();
  });
});
