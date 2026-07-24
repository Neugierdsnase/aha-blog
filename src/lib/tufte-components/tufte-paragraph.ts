import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

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
    css`
      :host {
        display: block;
        font-size: 1.4rem;
        line-height: 2rem;
        margin-top: 1.4rem;
        margin-bottom: 1.4rem;
        padding-right: 0;
        vertical-align: baseline;
      }

      /* First paragraph after a heading should sit tight against it,
         matching the raw-<p> behaviour in tufte.css. */
      :host(:first-child) {
        margin-top: 0;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-paragraph': TufteParagraph;
  }
}
