import { expect, test } from "@playwright/test";

// Keep visual tests hermetic: no live webmention.io traffic
test.beforeEach(async ({ page }) => {
  await page.route("https://webmention.io/**", (route) => route.abort());
});

test("epigraph visual regression", async ({ page }) => {
  await page.goto("/test-content/epigraph-test");

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("epigraph.png");
});
