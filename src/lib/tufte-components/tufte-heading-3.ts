import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles, linkStyles } from './styles.js';

/**
 * Tufte level-3 heading - a subsection heading.
 *
 * Encapsulates the heading metrics (size, style and vertical rhythm) in its own
 * shadow DOM so they apply regardless of how deeply the heading is nested,
 * mirroring `<tufte-paragraph>`. This replaces a raw `<h3>`; the host is exposed
 * to assistive tech as a level-3 heading.
 *
 * @slot - Heading text
 *
 * @example
 * ```html
 * <tufte-heading-3>A Subsection</tufte-heading-3>
 * ```
 */
@customElement('tufte-heading-3')
export class TufteHeading3 extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    linkStyles,
    css`
      :host {
        display: block;
        font-weight: 400;
        line-height: 1;
        font-style: italic;
        margin-top: 2rem;
        margin-bottom: 1.4rem;
        font-size: 1.7rem;
      }
    `,
  ];

  protected willUpdate() {
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '3');
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-heading-3': TufteHeading3;
  }
}
