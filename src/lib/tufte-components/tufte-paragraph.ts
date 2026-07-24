import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles, linkStyles } from './styles.js';

/**
 * Tufte Paragraph component - body text with Tufte typography.
 *
 * Encapsulates the paragraph metrics (font size, line height and vertical
 * rhythm) in its own shadow DOM, so the styling applies regardless of how
 * deeply the paragraph is nested inside `<tufte-article>`. This is the
 * recommended replacement for a raw `<p>`, which only picks up the article's
 * `::slotted(p)` rules when it is a *direct* child of `<tufte-article>`.
 *
 * @slot - Paragraph content (text, sidenotes, margin notes, new thoughts...)
 *
 * @example
 * ```html
 * <tufte-article>
 *   <section>
 *     <tufte-paragraph>
 *       Body text with a sidenote<tufte-sidenote>Note</tufte-sidenote>.
 *     </tufte-paragraph>
 *   </section>
 * </tufte-article>
 * ```
 */
@customElement('tufte-paragraph')
export class TufteParagraph extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    linkStyles,
    css`
      :host {
        display: block;
      }

      /* Box-model lives on the inner <p>, not on :host. The host is part of the
         outer document, so a page-level reset (e.g. Tailwind's preflight
         *{margin:0;padding:0}) would win over :host declarations; elements
         inside the shadow tree are out of the outer cascade's reach. Rendering
         a real <p> also restores the paragraph semantics. */
      p {
        margin-top: 1.4rem;
        margin-bottom: 1.4rem;
        padding-right: 0;
        font-size: 1.4rem;
        line-height: 2rem;
      }

      /* First paragraph after a heading should sit tight against it,
         matching the raw <p> behaviour in tufte.css. */
      :host(:first-child) p {
        margin-top: 0;
      }
    `,
  ];

  render() {
    return html`<p><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-paragraph': TufteParagraph;
  }
}
