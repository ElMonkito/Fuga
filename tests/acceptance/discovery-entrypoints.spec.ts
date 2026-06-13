import { expect, test } from "@playwright/test";

test.describe("Acceptance - découverte", () => {
  test("la recherche par mot-clé sur la home affine les pays puis préremplit la recherche @acceptance", async ({
    page
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.getByLabel("Recherche de pays").fill("espagne");
    const spainTile = page.getByTestId("country-tile").filter({ hasText: "Espagne" });

    await expect(spainTile).toBeVisible();
    await expect(spainTile).toHaveAttribute("href", "/recherche?destination=Espagne");
    await page.goto("/recherche?destination=Espagne", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/recherche\?destination=Espagne/);
    await expect(page.getByLabel("Destination")).toHaveValue("Espagne");
  });
});
