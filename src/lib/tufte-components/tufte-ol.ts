/**
 * Tufte ordered list - a customized built-in that extends `<ol>` directly.
 *
 * Because it *is* an `<ol>` (used as `<ol is="tufte-ol">`), no wrapper element is
 * needed and native list semantics, numbering and markers are preserved for
 * free. The Tufte list metrics are set on connect; font family and colour
 * inherit from the surrounding `<tufte-article>`.
 *
 * @example
 * ```html
 * <ol is="tufte-ol">
 *   <li>First</li>
 *   <li>Second</li>
 * </ol>
 * ```
 */
export class TufteOrderedList extends HTMLOListElement {
  connectedCallback() {
    this.style.fontSize = '1.4rem';
    this.style.lineHeight = '2rem';
  }
}

if (!customElements.get('tufte-ol')) {
  customElements.define('tufte-ol', TufteOrderedList, { extends: 'ol' });
}
