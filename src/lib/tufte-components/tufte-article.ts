import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte Article component - main wrapper for Tufte-styled content.
 *
 * @slot - Default slot for article content
 *
 * @example
 * ```html
 * <tufte-article>
 *   <h1>Article Title</h1>
 *   <p class="subtitle">Subtitle</p>
 *   <section>
 *     <p>Content goes here...</p>
 *   </section>
 * </tufte-article>
 * ```
 */
@customElement('tufte-article')
export class TufteArticle extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    css`
      :host {
        display: block;
        width: 87.5%;
        margin-left: auto;
        margin-right: auto;
        padding-left: 12.5%;
        background-color: var(--tufte-background-color, #fffff8);
        max-width: 1400px;
        counter-reset: sidenote-counter;
      }

      ::slotted(article) {
        padding: 5rem 0rem;
      }

      ::slotted(section) {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      ::slotted(h1) {
        font-weight: 400;
        margin-top: 4rem;
        margin-bottom: 1.5rem;
        font-size: 3.2rem;
        line-height: 1;
      }

      ::slotted(h2) {
        font-style: italic;
        font-weight: 400;
        margin-top: 2.1rem;
        margin-bottom: 1.4rem;
        font-size: 2.2rem;
        line-height: 1;
      }

      ::slotted(h3) {
        font-style: italic;
        font-weight: 400;
        font-size: 1.7rem;
        margin-top: 2rem;
        margin-bottom: 1.4rem;
        line-height: 1;
      }

      ::slotted(p),
      ::slotted(dl),
      ::slotted(ol),
      ::slotted(ul) {
        font-size: 1.4rem;
        line-height: 2rem;
      }

      ::slotted(p) {
        margin-top: 1.4rem;
        margin-bottom: 1.4rem;
        padding-right: 0;
        vertical-align: baseline;
      }

      ::slotted(p.subtitle) {
        font-style: italic;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1.8rem;
        display: block;
        line-height: 1;
      }

      ::slotted(a:link),
      ::slotted(a:visited) {
        color: inherit;
        text-underline-offset: 0.1em;
        text-decoration-thickness: 0.05em;
      }

      @media (max-width: 760px) {
        :host {
          width: 84%;
          padding-left: 8%;
          padding-right: 8%;
        }
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-article': TufteArticle;
  }
}
