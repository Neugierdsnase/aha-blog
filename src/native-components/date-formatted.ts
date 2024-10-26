import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("date-formatted")
class DateFormatted extends LitElement {
  @property({ type: String }) date = "";

  render() {
    return html`
      <time datetime=${new Date(this.date).toISOString()}>
        ${new Date(this.date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
    `;
  }
}

export default DateFormatted;
