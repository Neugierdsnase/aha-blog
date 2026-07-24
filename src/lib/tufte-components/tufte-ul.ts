/**
 * Tufte unordered list - a customized built-in that extends `<ul>` directly.
 *
 * Because it *is* a `<ul>` (used as `<ul is="tufte-ul">`), no wrapper element is
 * needed and native list semantics are preserved for free. The Tufte metrics and
 * marker are applied inline on connect; inline styles also restore the marker,
 * indent and margin that an aggressive page reset (e.g. Tailwind's preflight
 * `ul { list-style: none; margin: 0; padding: 0 }`) would otherwise strip. Font
 * family and colour inherit from the surrounding `<tufte-article>`.
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
    this.style.listStyle = 'square';
    this.style.margin = '1rem 0';
    this.style.paddingLeft = '1.5em';
  }
}

if (!customElements.get('tufte-ul')) {
  customElements.define('tufte-ul', TufteUnorderedList, { extends: 'ul' });
}
