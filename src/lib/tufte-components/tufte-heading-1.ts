import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles, linkStyles } from './styles.js';

/**
 * Tufte level-1 heading - the article title.
 *
 * Encapsulates the heading metrics (size, style and vertical rhythm) in its own
 * shadow DOM so they apply regardless of how deeply the heading is nested,
 * mirroring `<tufte-paragraph>`. This replaces a raw `<h1>`; the host is exposed
 * to assistive tech as a level-1 heading.
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
        font-weight: 400;
        line-height: 1;
        margin-top: 4rem;
        margin-bottom: 1.5rem;
        font-size: 3.2rem;
      }
    `,
  ];

  protected willUpdate() {
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '1');
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-heading-1': TufteHeading1;
  }
}
