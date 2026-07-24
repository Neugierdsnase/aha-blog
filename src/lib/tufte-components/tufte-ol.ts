/**
 * Tufte ordered list - a customized built-in that extends `<ol>` directly.
 *
 * Because it *is* an `<ol>` (used as `<ol is="tufte-ol">`), no wrapper element is
 * needed and native list semantics and numbering are preserved for free. The
 * Tufte metrics and marker are applied inline on connect; inline styles also
 * restore the numbering, indent and margin that an aggressive page reset (e.g.
 * Tailwind's preflight `ol { list-style: none; margin: 0; padding: 0 }`) would
 * otherwise strip. Font family and colour inherit from the surrounding
 * `<tufte-article>`.
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
    this.style.listStyle = 'upper-roman';
    this.style.margin = '1rem 0';
    this.style.paddingLeft = '1.5em';
  }
}

if (!customElements.get('tufte-ol')) {
  customElements.define('tufte-ol', TufteOrderedList, { extends: 'ol' });
}
