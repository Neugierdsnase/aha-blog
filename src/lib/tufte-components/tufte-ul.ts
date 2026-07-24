/**
 * Tufte unordered list - a customized built-in that extends `<ul>` directly.
 *
 * Because it *is* a `<ul>` (used as `<ul is="tufte-ul">`), no wrapper element is
 * needed and native list semantics and markers are preserved for free. The Tufte
 * list metrics are set on connect; font family and colour inherit from the
 * surrounding `<tufte-article>`.
 *
 * @example
 * ```html
 * <ul is="tufte-ul">
 *   <li>First</li>
 *   <li>Second</li>
 * </ul>
 * ```
 */
export class TufteUnorderedList extends HTMLUListElement {
  connectedCallback() {
    this.style.fontSize = '1.4rem';
    this.style.lineHeight = '2rem';
  }
}

if (!customElements.get('tufte-ul')) {
  customElements.define('tufte-ul', TufteUnorderedList, { extends: 'ul' });
}
