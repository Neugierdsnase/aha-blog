import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles, linkStyles } from './styles.js';

/**
 * Tufte level-1 heading - the article title.
 *
 * Encapsulates the heading metrics (size, style and vertical rhythm) in its own
 * shadow DOM so they apply regardless of how deeply the heading is nested,
 * mirroring `<tufte-paragraph>`. This replaces a raw `<h1>`; a real `<h1>` in
 * the shadow tree carries the level-1 heading semantics.
 *
 * @slot - Heading text
 *
 * @example
 * ```html
 * <tufte-heading-1>Article Title</tufte-heading-1>
 * ```
 */
@customElement('tufte-heading-1')
export class TufteHeading1 extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    linkStyles,
    css`
      :host {
        display: block;
      }

      /* Box-model and type live on the inner <h1>, not on :host, so a
         page-level reset (e.g. Tailwind's preflight *{margin:0}) can't override
         them — outer-document rules beat :host but never reach into the shadow.
         The real <h1> also carries the heading semantics for free. */
      h1 {
        font-weight: 400;
        line-height: 1;
        margin-top: 4rem;
        margin-bottom: 1.5rem;
        font-size: 3.2rem;
      }
    `,
  ];

  render() {
    return html`<h1><slot></slot></h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-heading-1': TufteHeading1;
  }
}
