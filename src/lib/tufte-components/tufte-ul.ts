import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from './styles.js';

/**
 * Tufte unordered list - Tufte typography for bulleted lists.
 *
 * Replaces a raw `<ul>`; its `<li>` children become the slotted content. The
 * box-model styling (marker, indent, margin, metrics) lives on an inner `<ul>`
 * in the shadow tree rather than on `:host`. A host is part of the *outer*
 * document, so an aggressive page reset (e.g. Tailwind's preflight
 * `ul { list-style: none; margin: 0; padding: 0 }`) would win over `:host`
 * declarations; elements inside the shadow tree are immune to it. Rendering a
 * real `<ul>` also keeps the list semantics and marker. Font family and colour
 * inherit from the surrounding `<tufte-article>`.
 *
 * @slot - List items (`<li>`)
 *
 * @example
 * ```html
 * <tufte-ul>
 *   <li>First</li>
 *   <li>Second</li>
 * </tufte-ul>
 * ```
 */
@customElement('tufte-ul')
export class TufteUnorderedList extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
        /* Matches tufte.css's "section > ul { width: 50% }". */
        width: 50%;
      }

      ul {
        margin: 1rem 0;
        padding-left: 1.5em;
        list-style: square;
        font-size: 1.4rem;
        line-height: 2rem;
      }

      @media (max-width: 760px) {
        :host {
          width: 90%;
        }
      }
    `,
  ];

  render() {
    return html`<ul><slot></slot></ul>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-ul': TufteUnorderedList;
  }
}
