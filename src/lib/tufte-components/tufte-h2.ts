import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles, linkStyles } from './styles.js';

/**
 * Tufte level-2 heading - a section heading.
 *
 * Encapsulates the heading metrics (size, style and vertical rhythm) in its own
 * shadow DOM so they apply regardless of how deeply the heading is nested,
 * mirroring `<tufte-paragraph>`. This replaces a raw `<h2>`; a real `<h2>` in
 * the shadow tree carries the level-2 heading semantics.
 *
 * @slot - Heading text
 *
 * @example
 * ```html
 * <tufte-h2>A Section</tufte-h2>
 * ```
 */
@customElement('tufte-h2')
export class TufteHeading2 extends LitElement {
  static styles = [
    baseStyles,
    linkStyles,
    css`
      h2 {
        font-weight: 400;
        line-height: 1;
        font-style: italic;
        margin-top: 2.1rem;
        margin-bottom: 1.4rem;
        font-size: 2.2rem;
        font-family: var(--font-display);
      }
    `,
  ];

  render() {
    return html`<h2><slot></slot></h2>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-h2': TufteHeading2;
  }
}
