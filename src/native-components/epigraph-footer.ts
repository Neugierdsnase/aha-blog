import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("epigraph-footer")
class EpigraphFooter extends LitElement {
static styles = css`
    footer {
      font-style: normal;
      width: 55%;
      font-size: 1.1rem;
      text-align: right;
      width: 100%;

      & > cite {
        font-style: italic;
      }
    }
  `;

render() {
return html`<footer><slot /></footer> `;
}
}

export default EpigraphFooter;
