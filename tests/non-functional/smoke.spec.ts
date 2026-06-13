import { expect, test } from "@playwright/test";

test.describe("Non-functional smoke", () => {
  test("la home charge sans erreurs console bloquantes et dans un temps raisonnable @non-functional", async ({
    page
  }) => {
    const consoleErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() !== "error") {
        return;
      }

      const text = message.text();
      if (text.includes("favicon")) {
        return;
      }

      consoleErrors.push(text);
    });

    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Partis en moins de cinq minutes." })
    ).toBeVisible();

    const domContentLoaded = await page.evaluate(() => {
      const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      return navigation?.domContentLoadedEventEnd ?? 0;
    });

    expect(consoleErrors).toEqual([]);
    expect(domContentLoaded).toBeLessThan(10_000);
  });
});
