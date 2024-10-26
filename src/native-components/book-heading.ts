import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("book-heading")
class BookHeading extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: Array }) authors = [];
  @property({ type: String }) releaseDate = "";

  static styles = css`
  :host {
    margin-top: -1rem;
    opacity: 0.8;
    font-size: 1.1rem;
  }

  span.authors:has(> :nth-child(2)) {
    & span.author:not(:nth-last-child(2))::after {
      content: ", ";
    }

    & span.author:last-child::before {
      content: " und ";
    }
  }
  `;

  render() {
    return html`<h2>${this.title}</h2>
      <p>
        <span class="authors"
          >${this.authors.map(
            (author: string) => html`<span class="author">${author}</span>`,
          )}</span
        >, ${this.releaseDate}
      </p> `;
  }
}

export default BookHeading;
