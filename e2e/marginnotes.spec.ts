import { expect, test } from "@playwright/test";

test("marginnotes visual regression", async ({ page }) => {
  await page.goto("/test-content/marginnotes-test");

  const article = page.getByTestId("article-container");
  expect(article).toHaveScreenshot();
});

