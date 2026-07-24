import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles, linkStyles } from './styles.js';

/**
 * Tufte level-2 heading - a section heading.
 *
 * Encapsulates the heading metrics (size, style and vertical rhythm) in its own
 * shadow DOM so they apply regardless of how deeply the heading is nested,
 * mirroring `<tufte-paragraph>`. This replaces a raw `<h2>`; the host is exposed
 * to assistive tech as a level-2 heading.
 *
 * @slot - Heading text
 *
 * @example
 * ```html
 * <tufte-heading-2>A Section</tufte-heading-2>
 * ```
 */
@customElement('tufte-heading-2')
export class TufteHeading2 extends LitElement {
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
        margin-top: 2.1rem;
        margin-bottom: 1.4rem;
        font-size: 2.2rem;
      }
    `,
  ];

  protected willUpdate() {
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '2');
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-heading-2': TufteHeading2;
  }
}
