import { expect, test } from "@playwright/test";

test("blockquotes visual regression", async ({ page }) => {
  await page.goto("/test-content/blockquote-test");

  // Wait for the footnote-to-sidenote transform to finish
  await expect(page.locator(".margin-toggle").first()).toBeAttached();
  await expect(page.locator("section.footnotes")).toHaveCount(0);

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("blockquotes.png");
});
