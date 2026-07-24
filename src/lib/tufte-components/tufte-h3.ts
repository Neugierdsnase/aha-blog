import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles, linkStyles } from './styles.js';

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
    baseStyles,
    linkStyles,
    css`
      h3 {
        font-weight: 400;
        line-height: 1;
        font-style: italic;
        margin-top: 2rem;
        margin-bottom: 1.4rem;
        font-size: 1.7rem;
        font-family: var(--font-display);
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
