import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles, sidenoteStyles } from './styles.js';

/**
 * Tufte Sidenote component - numbered sidenotes in the margin.
 *
 * @slot - Sidenote content
 *
 * @example
 * ```html
 * <p>
 *   Some text with a sidenote<tufte-sidenote>This is a sidenote</tufte-sidenote>.
 * </p>
 * ```
 */
@customElement('tufte-sidenote')
export class TufteSidenote extends LitElement {
  static styles = [
    baseStyles,
    sidenoteStyles,
    css`
      :host {
        display: inline;
      }

      .sidenote-wrapper {
        display: inline;
      }
    `,
  ];

  /**
   * Unique ID for this sidenote (auto-generated if not provided)
   */
  @property({ type: String })
  noteId = '';

  @state()
  private _generatedId = '';

  connectedCallback() {
    super.connectedCallback();
    if (!this.noteId) {
      this._generatedId = `sn-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  private get noteIdentifier() {
    return this.noteId || this._generatedId;
  }

  render() {
    return html`
      <span class="sidenote-wrapper">
        <label for="${this.noteIdentifier}" class="margin-toggle sidenote-number"></label>
        <input type="checkbox" id="${this.noteIdentifier}" class="margin-toggle" />
        <span class="sidenote"><slot></slot></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tufte-sidenote': TufteSidenote;
  }
}
