import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fontFaces, baseStyles } from './styles.js';

/**
 * Tufte Subtitle component - the italic subtitle that follows an article title.
 *
 * Replaces a raw `<p class="subtitle">`, owning its own metrics in shadow DOM.
 * The box-model lives on an inner `<p>` (not `:host`) so a page-level reset
 * (e.g. Tailwind's preflight `*{margin:0}`) can't override the margins —
 * outer-document rules beat `:host` but never reach into the shadow tree.
 *
 * @slot - Subtitle text
 *
 * @example
 * ```html
 * <tufte-h1>Article Title</tufte-h1>
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
      }

      p {
        font-style: italic;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1.8rem;
        line-height: 1;
      }
    `,
  ];

  render() {
    return html`<p><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-subtitle': TufteSubtitle;
  }
}
