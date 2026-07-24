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
 *   <tufte-h1>Article Title</tufte-h1>
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
      }

      /* The article's layout box (width, centering, padding, background) lives
         on an inner <div>, not on :host. The host is part of the outer
         document, so a page-level reset (e.g. Tailwind's preflight
         *{margin:0;padding:0}) would zero the host's margin/padding; elements
         inside the shadow tree are out of the outer cascade's reach. The
         padding-left is what opens the right-hand gutter that sidenotes and
         margin notes float into. Content-level typography belongs to the
         content components (tufte-h1/h2/h3, tufte-paragraph, tufte-section,
         tufte-blockquote, ...). */
      .page {
        /* border-box so width 87.5% includes the 12.5% padding — matching the
           app's global box-sizing, which does not cross the shadow boundary. */
        box-sizing: border-box;
        width: 87.5%;
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 5rem;
        padding-bottom: 5rem;
        padding-left: 12.5%;
        background-color: var(--tufte-background-color, #fffff8);
        counter-reset: sidenote-counter;
      }

      @media (max-width: 760px) {
        .page {
          width: 84%;
          padding-left: 8%;
          padding-right: 8%;
        }
      }
    `,
  ];

  render() {
    return html`<div class="page"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-article': TufteArticle;
  }
}
