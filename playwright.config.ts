import os from "node:os";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const useExternalBaseUrl = Boolean(process.env.PLAYWRIGHT_BASE_URL);
const outputDir = path.join(os.tmpdir(), "fuga-playwright-results");
const isVisualDebug =
  process.env.PLAYWRIGHT_VISUAL_DEBUG === "true" || process.env.PWDEBUG === "1";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  testIgnore: ["**/unit/**"],
  outputDir,
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: {
    timeout: 10_000
  },
  use: {
    baseURL,
    headless: !isVisualDebug,
    trace: isVisualDebug ? "on" : "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions: isVisualDebug
      ? {
          slowMo: 500
        }
      : undefined
  },
  webServer: useExternalBaseUrl
    ? undefined
    : {
        command: "npm run dev -- --hostname 127.0.0.1 --port 3000",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000
      },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ]
});
