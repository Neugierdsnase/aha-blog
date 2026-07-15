import { expect, test } from "@playwright/test";

test("sidenotes visual regression", async ({ page }) => {
  await page.goto("/test-content/sidenotes-test");

  // Wait for the footnote-to-sidenote transform to finish
  await expect(page.locator(".margin-toggle").first()).toBeAttached();
  await expect(page.locator("section.footnotes")).toHaveCount(0);

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("sidenotes.png");
});
