import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles, linkStyles } from './styles.js';

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
 * <tufte-h1>Article Title</tufte-h1>
 * ```
 */
@customElement('tufte-h1')
export class TufteHeading1 extends LitElement {
  static styles = [
    baseStyles,
    linkStyles,
    css`
      h1 {
        font-weight: 400;
        margin-top: 4rem;
        margin-bottom: min(2.5cqw, 1rem);
        font-size: 3.2rem;
        line-height: 1;
        font-family: var(--font-display);
      }
    `,
  ];

  render() {
    return html`<h1><slot></slot></h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-h1': TufteHeading1;
  }
}
