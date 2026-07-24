import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles, linkStyles } from './styles.js';

/**
 * Tufte level-3 heading - a subsection heading.
 *
 * Encapsulates the heading metrics (size, style and vertical rhythm) in its own
 * shadow DOM so they apply regardless of how deeply the heading is nested,
 * mirroring `<tufte-paragraph>`. This replaces a raw `<h3>`; a real `<h3>` in
 * the shadow tree carries the level-3 heading semantics.
 *
 * @slot - Heading text
 *
 * @example
 * ```html
 * <tufte-h3>A Subsection</tufte-h3>
 * ```
 */
@customElement('tufte-h3')
export class TufteHeading3 extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    linkStyles,
    css`
      :host {
        display: block;
      }

      /* Box-model and type live on the inner <h3>, not on :host, so a
         page-level reset (e.g. Tailwind's preflight *{margin:0}) can't override
         them — outer-document rules beat :host but never reach into the shadow.
         The real <h3> also carries the heading semantics for free. */
      h3 {
        font-weight: 400;
        line-height: 1;
        font-style: italic;
        margin-top: 2rem;
        margin-bottom: 1.4rem;
        font-size: 1.7rem;
      }
    `,
  ];

  render() {
    return html`<h3><slot></slot></h3>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-h3': TufteHeading3;
  }
}
