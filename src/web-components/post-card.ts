import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * `<post-card>` is a web component for displaying a teaser for a text content post.
 * It uses Shadow DOM for encapsulation and supports external theming via CSS custom properties.
 *
 * ### Slots:
 * - `header`: An optional named slot for the card header (e.g. title, subtitle).
 * - *default slot*: For the main body content of the card.
 *
 * ### Custom CSS Properties:
 * | Property Name             | Description                           | Default Value                   |
 * |--------------------------|---------------------------------------|---------------------------------|
 * | `--card-bg`              | Background color of the card          | `white`                         |
 * | `--card-fg`              | Text color                            | `#1f2937` (gray-800)            |
 *
 * ### Example Usage:
 * ```html
 * <post-card style="--card-bg: #1f2937; --card-fg: #fff;">
 *   <div slot="header">
 *     <h2>Card Title</h2>
 *     <p>Subtitle text</p>
 *   </div>
 *   <p>This is the card content.</p>
 * </post-card>
 * ```
 */
@customElement("post-card")
export class PostCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: ui-sans-serif, system-ui, sans-serif;
      background-color: var(--card-bg, white);
      color: var(--card-fg, black);
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background-color: var(--card-bg, #f9fafb);
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .body {
      padding: 1rem;
      line-height: 1.5;
    }
  `;

  render() {
    return html`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "post-card": PostCard;
  }
}
