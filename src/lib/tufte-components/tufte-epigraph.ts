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
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-epigraph': TufteEpigraph;
  }
}
