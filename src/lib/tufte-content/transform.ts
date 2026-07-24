/**
 * Transforms rendered markdown HTML into Tufte web components.
 *
 * Two responsibilities, both driven by the shape of the HTML that `remark-gfm`
 * emits:
 *
 * 1. **Footnotes → sidenotes / margin notes.** GFM renders footnotes as inline
 *    `<sup><a href="#user-content-fn-…">` refs plus a trailing
 *    `<section data-footnotes>`. Each footnote body is hoisted into a
 *    `<tufte-sidenote>` (or `<tufte-marginnote>` when the id uses an `mn-`
 *    prefix) at the reference site, and the now-empty section is dropped.
 * 2. **Block elements → components.** Paragraphs become `<tufte-paragraph>`,
 *    `<h1>`–`<h3>` become `<tufte-heading-1|2|3>`, `<blockquote>` becomes
 *    `<tufte-blockquote>`, and `<ul>`/`<ol>` are upgraded to their customized
 *    built-ins (`is="tufte-ul"` / `is="tufte-ol"`), so the Tufte typography
 *    lives in the components rather than in page CSS. Elements already inside a
 *    `tufte-*` component (e.g. an epigraph's blockquote) are left untouched —
 *    that component owns them.
 *
 * Kept as a pure `string -> string` function so it can be unit-tested without
 * rendering an Astro component. See `transform.test.ts`.
 */
import {
  DOCUMENT_NODE,
  ELEMENT_NODE,
  h,
  parse,
  renderSync,
  walkSync,
} from "ultrahtml";
import type { DocumentNode, ElementNode, Node } from "ultrahtml";

type ContainerNode = DocumentNode | ElementNode;

const isElement = (node: Node): node is ElementNode =>
  node.type === ELEMENT_NODE;

const isContainer = (node: Node): node is ContainerNode =>
  node.type === ELEMENT_NODE || node.type === DOCUMENT_NODE;

const findChild = (node: ElementNode, name: string): ElementNode | undefined =>
  node.children.find((c): c is ElementNode => isElement(c) && c.name === name);

const isFootnotesSection = (node: ElementNode): boolean =>
  (node.attributes.class ?? "").includes("footnotes") ||
  "data-footnotes" in node.attributes;

const isBackref = (node: Node): boolean =>
  isElement(node) &&
  node.name === "a" &&
  ((node.attributes.class ?? "").includes("backref") ||
    "data-footnote-backref" in node.attributes);

/** `h1`/`h2`/`h3` → the numeric level, or `undefined` for anything else. */
const headingLevel = (name: string): string | undefined =>
  /^h[1-3]$/.test(name) ? name[1] : undefined;

export function transformTufteContent(html: string): string {
  const ast = parse(html);

  // Pass 1: index each footnote's body by its list-item id, and remember the
  // footnotes section (and its parent) so it can be removed after transforming.
  const footnotes = new Map<string, Node[]>();
  let footnotesSection: ElementNode | undefined;
  let footnotesParent: ContainerNode | undefined;

  walkSync(ast, (node, parent) => {
    if (
      !isElement(node) ||
      node.name !== "section" ||
      !isFootnotesSection(node)
    )
      return;
    footnotesSection = node;
    footnotesParent = parent && isContainer(parent) ? parent : undefined;

    for (const li of findChild(node, "ol")?.children ?? []) {
      if (!isElement(li) || li.name !== "li" || !li.attributes.id) continue;
      const body = findChild(li, "p");
      if (body) {
        footnotes.set(
          li.attributes.id,
          body.children.filter((c) => !isBackref(c)),
        );
      }
    }
  });

  // Pass 2: rename block elements and swap each footnote reference for a note.
  walkSync(ast, (node, parent, index) => {
    if (isElement(node)) {
      if (node.name === "p") {
        node.name = "tufte-paragraph";
        return;
      }
      const level = headingLevel(node.name);
      if (level) {
        node.name = `tufte-heading-${level}`;
        return;
      }

      // Elements owned by an enclosing component (e.g. an epigraph's
      // blockquote) keep their raw tag so that component can style them.
      const parentEl = parent && isElement(parent) ? parent : undefined;
      const insideComponent = parentEl?.name.startsWith("tufte-") ?? false;

      if (!insideComponent && node.name === "blockquote") {
        node.name = "tufte-blockquote";
        return;
      }

      // Upgrade native lists to their customized built-ins, which keeps the
      // real <ul>/<ol> (and thus list semantics and markers) in place.
      if (!insideComponent && node.name === "ul") {
        node.attributes.is = "tufte-ul";
        return;
      }
      if (!insideComponent && node.name === "ol") {
        node.attributes.is = "tufte-ol";
        return;
      }
    }
    if (
      !isElement(node) ||
      node.name !== "sup" ||
      !parent ||
      typeof index !== "number"
    )
      return;

    const ref = node.children.find(
      (c): c is ElementNode =>
        isElement(c) &&
        c.name === "a" &&
        (c.attributes.href ?? "").startsWith("#user-content-fn-"),
    );
    const id = ref?.attributes.href.slice(1);
    const body = id ? footnotes.get(id) : undefined;
    if (!id || !body || !isContainer(parent)) return;

    const tag = id.replace("user-content-fn-", "").startsWith("mn-")
      ? "tufte-marginnote"
      : "tufte-sidenote";
    parent.children[index] = h(tag, { "note-id": id }, ...body);
  });

  // The referenced footnotes now live inline as tufte notes; drop the section.
  if (footnotesSection && footnotesParent) {
    footnotesParent.children = footnotesParent.children.filter(
      (c: Node) => c !== footnotesSection,
    );
  }

  return renderSync(ast);
}
