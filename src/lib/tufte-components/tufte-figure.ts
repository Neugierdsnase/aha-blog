import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from './styles.js';

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
    baseStyles,
    css`
      :host {
        display: block;
      }

      /* Box-model lives on the inner <figure>, not :host, so a page-level reset
         (e.g. Tailwind's preflight *{margin:0;padding:0}) can't override it —
         outer-document rules beat :host but never reach into the shadow tree.
         The real <figure>/<figcaption> also restore the figure semantics. */
      figure {
        max-width: 55%;
        margin: 0 0 3em 0;
        padding: 0;
        border: 0;
      }

      :host([fullwidth]) figure {
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
        figure {
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
      <figure>
        <slot></slot>
        <figcaption class="caption">
          <slot name="caption"></slot>
        </figcaption>
      </figure>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-figure': TufteFigure;
  }
}
