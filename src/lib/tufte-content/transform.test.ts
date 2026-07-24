import { describe, expect, it } from "vitest";
import { transformTufteContent } from "./transform";

/**
 * Builds the HTML that `remark-gfm` emits for a single footnote: an inline
 * `<sup>` reference plus the trailing `<section data-footnotes>` that holds the
 * body and a back-reference link.
 */
function withFootnote(id: string, body: string): string {
  return [
    `<p>Text with a note<sup class="footnote-ref">`,
    `<a href="#user-content-fn-${id}" id="user-content-fnref-${id}" data-footnote-ref>1</a>`,
    `</sup>.</p>`,
    `<section data-footnotes class="footnotes">`,
    `<h2 class="sr-only" id="footnote-label">Footnotes</h2>`,
    `<ol><li id="user-content-fn-${id}">`,
    `<p>${body} `,
    `<a href="#user-content-fnref-${id}" data-footnote-backref class="data-footnote-backref">↩</a>`,
    `</p></li></ol></section>`,
  ].join("");
}

describe("transformTufteContent", () => {
  describe("block elements", () => {
    it("renames paragraphs to <tufte-paragraph>", () => {
      const out = transformTufteContent("<p>Hello world</p>");
      expect(out).toContain("<tufte-paragraph>Hello world</tufte-paragraph>");
      expect(out).not.toMatch(/<p[ >]/);
    });

    it("maps h1/h2/h3 to their numbered heading components", () => {
      const out = transformTufteContent("<h1>A</h1><h2>B</h2><h3>C</h3>");
      expect(out).toContain("<tufte-h1>A</tufte-h1>");
      expect(out).toContain("<tufte-h2>B</tufte-h2>");
      expect(out).toContain("<tufte-h3>C</tufte-h3>");
    });

    it("preserves a heading's id so in-page anchors keep working", () => {
      const out = transformTufteContent('<h2 id="my-section">Title</h2>');
      expect(out).toContain('<tufte-h2 id="my-section">');
    });

    it("leaves h4–h6 untouched (Tufte only styles three levels)", () => {
      const out = transformTufteContent("<h4>Deep</h4><h6>Deeper</h6>");
      expect(out).toContain("<h4>Deep</h4>");
      expect(out).toContain("<h6>Deeper</h6>");
      expect(out).not.toContain("tufte-h4");
    });

    it("renames blockquotes and their inner paragraphs", () => {
      const out = transformTufteContent(
        "<blockquote><p>Quoted text</p></blockquote>",
      );
      expect(out).toContain(
        "<tufte-blockquote><tufte-paragraph>Quoted text</tufte-paragraph></tufte-blockquote>",
      );
    });

    it("does not touch a blockquote owned by a component (epigraph)", () => {
      const out = transformTufteContent(
        "<tufte-epigraph><blockquote><p>Q</p><footer>Author</footer></blockquote></tufte-epigraph>",
      );
      // The epigraph keeps its raw <blockquote>...
      expect(out).toContain("<tufte-epigraph><blockquote>");
      expect(out).not.toContain("tufte-blockquote");
      // ...but the paragraph inside is still upgraded.
      expect(out).toContain("<tufte-paragraph>Q</tufte-paragraph>");
    });

    it("upgrades ul/ol to their components", () => {
      expect(transformTufteContent("<ul><li>a</li></ul>")).toContain(
        "<tufte-ul><li>a</li></tufte-ul>",
      );
      expect(transformTufteContent("<ol><li>a</li></ol>")).toContain(
        "<tufte-ol><li>a</li></tufte-ol>",
      );
    });

    it("upgrades nested lists too", () => {
      const out = transformTufteContent(
        "<ul><li>a<ul><li>b</li></ul></li></ul>",
      );
      expect(out.match(/<tufte-ul>/g)).toHaveLength(2);
    });

    it("leaves <dl> alone (no component for it)", () => {
      const out = transformTufteContent("<dl><dt>a</dt><dd>b</dd></dl>");
      expect(out).toContain("<dl>");
      expect(out).not.toContain("tufte-");
    });
  });

  describe("footnotes → notes", () => {
    it("hoists a footnote body into a <tufte-sidenote> at the reference", () => {
      const out = transformTufteContent(withFootnote("1", "The note body."));
      expect(out).toContain('<tufte-sidenote note-id="user-content-fn-1">');
      expect(out).toContain("The note body.");
    });

    it("removes the footnotes section and the back-reference link", () => {
      const out = transformTufteContent(withFootnote("1", "Body."));
      expect(out).not.toContain("data-footnotes");
      expect(out).not.toContain("↩");
      expect(out).not.toContain("<sup");
    });

    it("uses <tufte-marginnote> for mn-prefixed ids", () => {
      const out = transformTufteContent(withFootnote("mn-aside", "Aside."));
      expect(out).toContain(
        '<tufte-marginnote note-id="user-content-fn-mn-aside">',
      );
      expect(out).not.toContain("tufte-sidenote");
    });

    it("handles multiple footnotes independently", () => {
      const input =
        `<p>One<sup><a href="#user-content-fn-a" data-footnote-ref>1</a></sup> ` +
        `two<sup><a href="#user-content-fn-b" data-footnote-ref>2</a></sup>.</p>` +
        `<section data-footnotes class="footnotes"><ol>` +
        `<li id="user-content-fn-a"><p>First.</p></li>` +
        `<li id="user-content-fn-b"><p>Second.</p></li>` +
        `</ol></section>`;
      const out = transformTufteContent(input);
      expect(out).toContain('note-id="user-content-fn-a"');
      expect(out).toContain("First.");
      expect(out).toContain('note-id="user-content-fn-b"');
      expect(out).toContain("Second.");
      expect(out).not.toContain("data-footnotes");
    });

    it("leaves a plain <sup> that is not a footnote reference alone", () => {
      const out = transformTufteContent("<tufte-paragraph>x<sup>2</sup></tufte-paragraph>");
      expect(out).toContain("<sup>2</sup>");
    });
  });

  describe("pass-through", () => {
    it("returns content without special elements unchanged in spirit", () => {
      const out = transformTufteContent("<hr>");
      expect(out).toContain("<hr>");
    });

    it("does not crash when a footnote reference has no matching body", () => {
      const input =
        '<p>Dangling<sup><a href="#user-content-fn-missing" data-footnote-ref>1</a></sup>.</p>';
      const out = transformTufteContent(input);
      // No body to hoist, so the reference is left as-is inside the paragraph.
      expect(out).toContain("<sup>");
      expect(out).toContain("<tufte-paragraph>");
    });
  });
});
