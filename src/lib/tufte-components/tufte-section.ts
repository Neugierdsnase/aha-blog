import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from './styles.js';

/**
 * Tufte Section component - a content section with Tufte vertical rhythm.
 *
 * Provides the block padding that groups content within an article. The padding
 * lives on an inner `<section>` (not `:host`) so a page-level reset (e.g.
 * Tailwind's preflight `*{padding:0}`) can't override it — outer-document rules
 * beat `:host` but never reach into the shadow tree — and the real `<section>`
 * carries the sectioning semantics.
 *
 * @slot - Section content
 *
 * @example
 * ```html
 * <tufte-article>
 *   <tufte-section>
 *     <tufte-h2>A Section</tufte-h2>
 *     <tufte-paragraph>Body text...</tufte-paragraph>
 *   </tufte-section>
 * </tufte-article>
 * ```
 */
@customElement('tufte-section')
export class TufteSection extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      section {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    `,
  ];

  render() {
    return html`<section><slot></slot></section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-section': TufteSection;
  }
}
