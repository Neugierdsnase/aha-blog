import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte Section component - a content section with Tufte vertical rhythm.
 *
 * Provides the block padding that groups content within an article. Wrap a
 * real `<section>` (kept in light DOM for semantics) or use it directly.
 *
 * @slot - Section content
 *
 * @example
 * ```html
 * <tufte-article>
 *   <tufte-section>
 *     <tufte-heading-2>A Section</tufte-heading-2>
 *     <tufte-paragraph>Body text...</tufte-paragraph>
 *   </tufte-section>
 * </tufte-article>
 * ```
 */
@customElement('tufte-section')
export class TufteSection extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    css`
      :host {
        display: block;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-section': TufteSection;
  }
}
