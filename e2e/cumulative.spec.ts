import { expect, test } from "@playwright/test";

// Keep visual tests hermetic: no live webmention.io traffic
test.beforeEach(async ({ page }) => {
  await page.route("https://webmention.io/**", (route) => route.abort());
});

test("cumulative visual regression", async ({ page }) => {
  await page.goto("/test-content/cumulative-test");

  // Webmentions island settles to empty once the blocked fetch aborts
  await expect(page.locator(".webmentions")).toHaveCount(0);

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("cumulative.png");
});
