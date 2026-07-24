import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles, sidenoteStyles } from './styles.js';

/**
 * Tufte Margin Note component - unnumbered notes in the margin.
 *
 * @slot - Margin note content
 *
 * @example
 * ```html
 * <p>
 *   Some text with a margin note<tufte-marginnote>This is a margin note</tufte-marginnote>.
 * </p>
 * ```
 */
@customElement('tufte-marginnote')
export class TufteMarginnote extends LitElement {
  static styles = [
    baseStyles,
    sidenoteStyles,
    css`
      :host {
        display: inline;
      }

      .marginnote-wrapper {
        display: inline;
      }
    `,
  ];

  /**
   * Unique ID for this margin note (auto-generated if not provided)
   */
  @property({ type: String })
  noteId = '';

  /**
   * Symbol to use for toggle (default: ⊕)
   */
  @property({ type: String })
  symbol = '⊕';

  @state()
  private _generatedId = '';

  connectedCallback() {
    super.connectedCallback();
    if (!this.noteId) {
      this._generatedId = `mn-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  private get noteIdentifier() {
    return this.noteId || this._generatedId;
  }

  render() {
    return html`
      <span class="marginnote-wrapper">
        <label for="${this.noteIdentifier}" class="margin-toggle">${this.symbol}</label>
        <input type="checkbox" id="${this.noteIdentifier}" class="margin-toggle" />
        <span class="marginnote"><slot></slot></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-marginnote': TufteMarginnote;
  }
}
