import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from './styles.js';

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
         tufte-blockquote, ...).

         The background is a frosted-glass tint rather than fully transparent
         or fully opaque: it needs to stay translucent enough for
         PageBackdrop's gradient/grain to read as glass underneath, while
         being opaque enough that body text keeps contrast as that gradient
         shifts hue down the page. backdrop-filter is what actually blurs the
         backdrop into a frost; the color-mix background alone would just be
         a flat tinted rectangle. */
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
        background-color: color-mix(
          in oklch,
          var(--tufte-background-color, #fffff8) 85%,
          transparent
        );
        border: 1px solid
          color-mix(in oklch, var(--tufte-text-color, #111) 10%, transparent);
        backdrop-filter: blur(20px) saturate(160%);
        -webkit-backdrop-filter: blur(20px) saturate(160%);
        counter-reset: sidenote-counter;
      }

      @supports not (
        (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
      ) {
        .page {
          background-color: var(--tufte-background-color, #fffff8);
        }
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
