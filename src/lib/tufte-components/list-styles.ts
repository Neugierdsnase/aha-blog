/**
 * Shared list metrics for the Tufte customized built-in lists.
 *
 * `<ul is="tufte-ul">` and `<ol is="tufte-ol">` extend the native list elements
 * and therefore live in the light DOM with no shadow root of their own. Rather
 * than inline the metrics on every instance (which would beat author CSS on
 * specificity), the rule is published once as a constructable stylesheet adopted
 * into the document the first time either element connects. Font family and
 * colour are left to inherit from the surrounding `<tufte-article>`, matching how
 * the rest of the light-DOM prose is styled.
 */
const listStyles = new CSSStyleSheet();
listStyles.replaceSync(`
  ul[is="tufte-ul"],
  ol[is="tufte-ol"] {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`);

let adopted = false;

/** Adopt the shared list stylesheet into the document exactly once. */
export function adoptTufteListStyles(): void {
  if (adopted) return;
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, listStyles];
  adopted = true;
}
