import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte Figure component - figures with optional fullwidth and captions.
 *
 * @slot - Figure content (img, etc.)
 * @slot caption - Figure caption (appears as margin note)
 *
 * @example
 * ```html
 * <tufte-figure>
 *   <img src="example.png" alt="Example" />
 *   <span slot="caption">Caption text here</span>
 * </tufte-figure>
 * ```
 */
@customElement('tufte-figure')
export class TufteFigure extends LitElement {
  static styles = [
    fontFaces,
    baseStyles,
    css`
      :host {
        display: block;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        max-width: 55%;
        margin: 0 0 3em 0;
      }

      :host([fullwidth]) {
        max-width: 100%;
        width: 100%;
      }

      ::slotted(img) {
        max-width: 100%;
        height: auto;
      }

      :host([fullwidth]) ::slotted(img) {
        width: 100%;
      }

      .caption {
        float: right;
        clear: right;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 1.1rem;
        line-height: 1.6;
        vertical-align: baseline;
        position: relative;
        max-width: 40%;
      }

      :host([fullwidth]) .caption {
        margin-right: 24%;
      }

      @media (max-width: 760px) {
        :host {
          max-width: 90%;
        }

        .caption,
        :host([fullwidth]) .caption {
          margin-right: 0%;
          max-width: none;
        }

        ::slotted(img) {
          width: 100%;
        }
      }
    `,
  ];

  /**
   * Whether this is a fullwidth figure
   */
  @property({ type: Boolean, reflect: true })
  fullwidth = false;

  render() {
    return html`
      <slot></slot>
      <div class="caption">
        <slot name="caption"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-figure': TufteFigure;
  }
}
