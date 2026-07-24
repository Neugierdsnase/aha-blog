import { defineHastPlugin } from "satteri";

/**
 * Rewrites the plain HTML that markdown produces into the Tufte web components,
 * so rendered content pages use `<tufte-*>` elements instead of bare tags.
 *
 * Three kinds of rewrite:
 *  - {@link TAG_MAP}: autonomous custom elements — the tag is renamed outright.
 *  - {@link IS_MAP}: customized built-ins (`tufte-ul`/`tufte-ol`) — the tag is
 *    kept so it stays a real `<ul>`/`<ol>`, and the element is attached via the
 *    `is` attribute (`<ul is="tufte-ul">`).
 *  - {@link SPAN_CLASS_MAP}: `<span class="sidenote">` / `marginnote` become the
 *    matching note element.
 */

// Plain tagName → autonomous custom element tagName.
const TAG_MAP: Record<string, string> = {
  article: "tufte-article",
  h1: "tufte-heading-1",
  h2: "tufte-heading-2",
  h3: "tufte-heading-3",
  subtitle: "tufte-subtitle", // only fires if <subtitle> elements exist
  section: "tufte-section",
  p: "tufte-paragraph", // "paragraph" in mdast is <p> in hast
  figure: "tufte-figure",
};

// Native list tag → the `is` value of the matching customized built-in. The
// tagName is preserved so the element stays a real list.
const IS_MAP: Record<string, string> = {
  ul: "tufte-ul",
  ol: "tufte-ol",
};

// span + class → custom element tagName.
const SPAN_CLASS_MAP: Record<string, string> = {
  sidenote: "tufte-sidenote",
  marginnote: "tufte-marginnote",
};

export default defineHastPlugin({
  name: "tufte-custom-tags",
  element: [
    {
      filter: Object.keys(TAG_MAP),
      visit(node) {
        return { ...node, tagName: TAG_MAP[node.tagName] };
      },
    },
    {
      filter: Object.keys(IS_MAP),
      visit(node) {
        return {
          ...node,
          properties: { ...node.properties, is: IS_MAP[node.tagName] },
        };
      },
    },
    {
      filter: ["span"],
      visit(node) {
        const classes = node.properties?.className;
        const list = Array.isArray(classes)
          ? classes
          : typeof classes === "string"
            ? classes.split(/\s+/)
            : [];
        const match = list.find(
          (c): c is string => typeof c === "string" && c in SPAN_CLASS_MAP,
        );
        if (!match) return; // leave other spans alone
        return { ...node, tagName: SPAN_CLASS_MAP[match] };
      },
    },
  ],
});
