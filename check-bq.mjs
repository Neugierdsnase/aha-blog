import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await b.newPage();
await p.setViewportSize({ width: 1280, height: 1000 });
await p.route("https://webmention.io/**", (r) => r.abort());
await p.goto("http://localhost:4321/test-content/sidenotes-test", {
  waitUntil: "networkidle",
});
await p.addStyleTag({
  content: "astro-dev-toolbar { display: none !important; }",
});
await p.getByTestId("article-container").screenshot({ path: "check-hidden.png" });
console.log("wrote check-hidden.png");
await b.close();
