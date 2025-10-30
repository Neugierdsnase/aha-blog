import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Konstantin/);
});

test("'continue reading' link screenshot", async ({ page }) => {
  await page.goto("/");

  // Get the continue reading button
  const continueReadingButton = page.getByTestId("btn-continue-reading");
  expect(continueReadingButton).toHaveScreenshot();
});

test("'continue reading' link", async ({ page }) => {
  await page.goto("/");

  // Get the continue reading button
  const continueReadingButton = page.getByTestId("btn-continue-reading");

  // Click the get started link.
  await continueReadingButton.click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByTestId("heading-book")).toBeVisible();
});
