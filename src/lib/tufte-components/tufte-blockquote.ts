import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from './styles.js';

/**
 * Tufte Blockquote component - quoted passages with Tufte typography.
 *
 * Replaces a raw `<blockquote>`; its former children (paragraphs, an optional
 * `<footer>`) become the slotted content. The border colour is exposed as a
 * custom property so the client app can point it at a theme token:
 *
 * ```css
 * tufte-article { --tufte-blockquote-border-color: var(--color-muted); }
 * ```
 *
 * The box-model styling (margin, padding, border) is applied to an inner
 * `<blockquote>` in the shadow tree rather than to `:host`. A host is part of
 * the *outer* document, so an aggressive page reset (e.g. Tailwind's
 * `*{margin:0;padding:0;border:0}`) would win over `:host` declarations;
 * elements inside the shadow tree are immune to it. Rendering a real
 * `<blockquote>` also keeps the quotation semantics.
 *
 * @slot - Quote content (`<tufte-paragraph>`s and an optional `<footer>`)
 *
 * @example
 * ```html
 * <tufte-blockquote>
 *   <tufte-paragraph>Quoted text...</tufte-paragraph>
 *   <footer>Author, Source</footer>
 * </tufte-blockquote>
 * ```
 */
@customElement('tufte-blockquote')
export class TufteBlockquote extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      blockquote {
        margin: 2rem 1rem;
        padding-left: 1rem;
        font-size: 1.4rem;
        border-left: 2px solid var(--tufte-blockquote-border-color, currentColor);
      }

      ::slotted(tufte-paragraph) {
        width: 86%;
      }

      ::slotted(footer) {
        width: 86%;
        font-size: 1.1rem;
        text-align: right;
      }

      @media (max-width: 760px) {
        blockquote {
          margin-left: 1.5em;
          margin-right: 0;
        }

        ::slotted(tufte-paragraph),
        ::slotted(footer) {
          width: 90%;
        }
      }
    `,
  ];

  render() {
    return html`<blockquote><slot></slot></blockquote>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-blockquote': TufteBlockquote;
  }
}
