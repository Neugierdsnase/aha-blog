import { expect, test } from "@playwright/test";

test("sidenotes visual regression", async ({ page }) => {
  await page.goto("/test-content/sidenotes-test");

  const article = page.getByTestId("article-container");
  expect(article).toHaveScreenshot();
});

