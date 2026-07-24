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
 *   <tufte-heading-1>Article Title</tufte-heading-1>
 *   <tufte-subtitle>Subtitle</tufte-subtitle>
 *   <tufte-section>
 *     <tufte-paragraph>Content goes here...</tufte-paragraph>
 *   </tufte-section>
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
        /* Vertical breathing room around the article body. Lives on the host
           (rather than on a slotted <article>) so the article only styles
           itself; content-level typography belongs to the content components
           (tufte-heading-*, tufte-paragraph, tufte-section, tufte-list, ...). */
        padding-top: 5rem;
        padding-bottom: 5rem;
        padding-left: 12.5%;
        background-color: var(--tufte-background-color, #fffff8);
        max-width: 1400px;
        counter-reset: sidenote-counter;
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
