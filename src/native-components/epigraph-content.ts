import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("epigraph-content")
class EpigraphContent extends LitElement {
static styles = css`
    :host {
      margin: 5em 0;
    }

    blockquote {
      margin-top: 3em;
      margin-bottom: 3em;
      margin-left: 1.5em;
      margin-right: 0;
      font-size: 1.4rem;
      font-style: italic;

      & p {
        width: var(--content-width);
        margin-right: 40px;
      }

  @media (max-width: 760px) {
    blockquote {
      margin-left: 1.5em;
      margin-right: 0;
    }

    p {
      width: 100%;
    }
}
    }
  `;

render() {
return html`<blockquote><slot></slot></blockquote>`;
}
}

export default EpigraphContent;
