import { defineConfig, devices } from "@playwright/test";

/**
 * Visual regression + component-behaviour suite for the Tufte web
 * components. Runs locally via the pre-commit hook (see .husky/pre-commit) —
 * this is a solo project with no CI pipeline, so there's no CI-only branching
 * here (retries, worker limits, etc. always use the local defaults).
 *
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "http://localhost:4321",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Chromium only: this is a solo blog with no CI pipeline, and a single
     engine keeps the pre-commit hook fast with one baseline image per test
     to review. Firefox/WebKit were dropped — no baselines were ever
     committed for them, and extra engines mostly add font-rendering noise
     rather than catching real layout regressions. */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
  },
});
