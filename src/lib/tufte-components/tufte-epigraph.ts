import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte Epigraph component - chapter epigraphs with quotes.
 *
 * @slot - Blockquote elements containing epigraph quotes
 *
 * @example
 * ```html
 * <tufte-epigraph>
 *   <blockquote>
 *     <p>Quote text here...</p>
 *     <footer>Author, Source</footer>
 *   </blockquote>
 * </tufte-epigraph>
 * ```
 */
@customElement('tufte-epigraph')
export class TufteEpigraph extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    css`
      :host {
        display: block;
      }

      /* Outer spacing lives on an inner wrapper, not on :host: the host is in
         the outer document, where a page reset (e.g. Tailwind's preflight
         *{margin:0}) would beat a :host margin. (The slotted <blockquote>'s own
         margins remain subject to that reset — it is light DOM — but the 5em
         wrapper carries the epigraph's separation.) */
      .epigraph {
        margin: 5em 0;
      }

      ::slotted(blockquote) {
        margin-top: 3em;
        margin-bottom: 3em;
        font-size: 1.4rem;
      }

      ::slotted(blockquote),
      ::slotted(blockquote p) {
        font-style: italic;
      }

      ::slotted(blockquote footer) {
        font-style: normal;
        font-size: 1.1rem;
        text-align: right;
      }

      ::slotted(blockquote footer cite) {
        font-style: italic;
      }
    `,
  ];

  render() {
    return html`<div class="epigraph"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-epigraph': TufteEpigraph;
  }
}
