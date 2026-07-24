import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte ordered list - Tufte typography for numbered lists.
 *
 * Replaces a raw `<ol>`; its `<li>` children become the slotted content. The
 * box-model styling (numbering, indent, margin, metrics) lives on an inner
 * `<ol>` in the shadow tree rather than on `:host`. A host is part of the
 * *outer* document, so an aggressive page reset (e.g. Tailwind's preflight
 * `ol { list-style: none; margin: 0; padding: 0 }`) would win over `:host`
 * declarations; elements inside the shadow tree are immune to it. Rendering a
 * real `<ol>` also keeps the list semantics and numbering. Font family and
 * colour inherit from the surrounding `<tufte-article>`.
 *
 * @slot - List items (`<li>`)
 *
 * @example
 * ```html
 * <tufte-ol>
 *   <li>First</li>
 *   <li>Second</li>
 * </tufte-ol>
 * ```
 */
@customElement('tufte-ol')
export class TufteOrderedList extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    css`
      :host {
        display: block;
      }

      ol {
        margin: 1rem 0;
        padding-left: 1.5em;
        list-style: upper-roman;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    `,
  ];

  render() {
    return html`<ol><slot></slot></ol>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-ol': TufteOrderedList;
  }
}
