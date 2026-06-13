import { expect, test } from "@playwright/test";

test.describe("Non-functional accessibility", () => {
  test("les contrôles principaux de la recherche restent utilisables au clavier sur mobile @non-functional", async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/recherche");

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /FUGA/i })).toBeFocused();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Destination")).toBeFocused();

    await page.keyboard.type("Espagne");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("button", { name: "Mois précédent" })).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("button", { name: "Mois précédent" })).not.toBeVisible();
  });
});
