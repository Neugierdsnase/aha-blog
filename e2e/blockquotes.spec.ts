import { expect, test } from "@playwright/test";

test("blockquotes visual regression", async ({ page }) => {
  await page.goto("/test-content/blockquotes-test");

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot('blockquotes.png');
});

