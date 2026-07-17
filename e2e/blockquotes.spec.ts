import { expect, test } from "@playwright/test";

// Keep visual tests hermetic: no live webmention.io traffic
test.beforeEach(async ({ page }) => {
  await page.route("https://webmention.io/**", (route) => route.abort());
});

test("blockquotes visual regression", async ({ page }) => {
  await page.goto("/test-content/blockquote-test");

  // Wait for tufte-sidenote elements to be present
  await expect(page.locator("tufte-sidenote").first()).toBeAttached();
  await expect(page.locator("section.footnotes")).toHaveCount(0);

  // Webmentions island settles to empty once the blocked fetch aborts
  await expect(page.locator(".webmentions")).toHaveCount(0);

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("blockquotes.png");
});
