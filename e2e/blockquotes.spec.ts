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
  // Hide Astro's dev toolbar: a fixed, dev-server-only overlay (absent from
  // production) that gets stitched into the tall element screenshot at a
  // nondeterministic position. It is unrelated to the content under test.
  await page.addStyleTag({
    content: "astro-dev-toolbar { display: none !important; }",
  });
  await expect(article).toHaveScreenshot("blockquotes.png");
});
