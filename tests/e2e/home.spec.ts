import { expect, test } from "@playwright/test";

test.describe("Home discovery", () => {
  test("filtre les pays depuis la home et prépare la bonne entrée vers la recherche", async ({
    page
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Partis en moins de cinq minutes." })
    ).toBeVisible();
    await expect(page.getByTestId("country-tile").first()).toBeVisible();

    await page.getByLabel("Recherche de pays").fill("plage");

    const spainTile = page.getByTestId("country-tile").filter({ hasText: "Espagne" });
    const croatiaTile = page.getByTestId("country-tile").filter({ hasText: "Croatie" });

    await expect(spainTile).toBeVisible();
    await expect(croatiaTile).toBeVisible();

    await expect(spainTile).toHaveAttribute("href", "/recherche?destination=Espagne");
  });
});
