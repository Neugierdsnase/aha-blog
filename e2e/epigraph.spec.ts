import { expect, test } from "@playwright/test";

test("epigraph visual regression", async ({ page }) => {
  await page.goto("/test-content/epigraph-test");

  const article = page.getByTestId("article-container");
  await expect(article).toHaveScreenshot("epigraph.png");
});
