import { expect, test } from "@playwright/test";

// Keep visual tests hermetic: no live webmention.io traffic
test.beforeEach(async ({ page }) => {
  await page.route("https://webmention.io/**", (route) => route.abort());
});

test("marginnotes visual regression", async ({ page }) => {
  await page.goto("/test-content/marginnotes-test");

  // Wait for tufte-marginnote elements to be present
  await expect(page.locator("tufte-marginnote").first()).toBeAttached();
  await expect(page.locator("section.footnotes")).toHaveCount(0);

  // Webmentions island settles to empty once the blocked fetch aborts
  await expect(page.locator(".webmentions")).toHaveCount(0);

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("marginnotes.png");
});
