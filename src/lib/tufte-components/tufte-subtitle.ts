import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte Subtitle component - the italic subtitle that follows an article title.
 *
 * Replaces a raw `<p class="subtitle">`, owning its own metrics in shadow DOM.
 *
 * @slot - Subtitle text
 *
 * @example
 * ```html
 * <tufte-heading-1>Article Title</tufte-heading-1>
 * <tufte-subtitle>A short, descriptive subtitle</tufte-subtitle>
 * ```
 */
@customElement('tufte-subtitle')
export class TufteSubtitle extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    css`
      :host {
        display: block;
        font-style: italic;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1.8rem;
        line-height: 1;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-subtitle': TufteSubtitle;
  }
}
