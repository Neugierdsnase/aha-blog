import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from './styles.js';

/**
 * Tufte New Thought component - small caps for starting sections.
 *
 * @slot - Text to be rendered in small caps
 *
 * @example
 * ```html
 * <p>
 *   <tufte-newthought>In his later books</tufte-newthought>, Tufte starts each section...
 * </p>
 * ```
 */
@customElement('tufte-newthought')
export class TufteNewthought extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        font-variant: small-caps;
        font-size: 1.2em;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-newthought': TufteNewthought;
  }
}
