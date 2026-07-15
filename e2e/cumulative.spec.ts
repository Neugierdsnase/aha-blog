import { expect, test } from "@playwright/test";

test("cumulative visual regression", async ({ page }) => {
  await page.goto("/test-content/cumulative-test");

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("cumulative.png");
});
