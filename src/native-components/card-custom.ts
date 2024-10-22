import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("card-custom")
class CardCustom extends LitElement {
@property({ type: String }) title = "";

static styles = css`
  article {
    display: grid;
    grid-template-columns: 15px 1fr 15px;
    grid-template-rows: 15px 1fr 15px;
    grid-template-areas:
      "deco-top-left deco-top deco-top-right"
      "deco-left slot deco-right"
      "deco-bottom-left deco-bottom deco-bottom-right";
  }

  .deco-top-left {
    grid-area: deco-top-left;
    transform: translate(10px, 10px);)
  }

  .deco-top {
    grid-area: deco-top;
    margin: 0 auto;
    min-width: calc(100% - 40px);
    border-bottom: 1px solid light-dark(#151515, #fffff9);
    transform: translateY(-4.5px);
  } 

  .deco-top-right {
    grid-area: deco-top-right;
    transform: translate(-20px, 10px);)
  }

  .deco-left {
    grid-area: deco-left;
    height: calc(100% - 40px);
    width: 10px;
    margin-top: 20px;
      border-right: 1px solid light-dark(#151515, #fffff9);
  }

  .slot {
    grid-area: slot;
    border: 0.8px solid light-dark(#151515, #fffff9);
    padding: 40px 20px 20px;
  }

  .deco-right {
    grid-area: deco-right;
    width: 100%;
    display: flex;
    align-items: center;
    height: calc(100% - 40px);
    width: 4.5px;
    margin-top: 20px;
      border-right: 1px solid light-dark(#151515, #fffff9);
  }

  .deco-bottom-left {
    grid-area: deco-bottom-left;
    transform: translate(10px, -20px);)
  }

  .deco-bottom {
    grid-area: deco-bottom;
    margin: 0 auto;
    min-width: calc(100% - 40px);
    height: 4.5px;
    border-bottom: 0.8px solid light-dark(#151515, #fffff9);
  }

  .deco-bottom-right {
    grid-area: deco-bottom-right;
    transform: translate(-20px, -20px);)
  }

h2 {
  font-size: 4cap;
  font-weight: normal;
}
`;

render() {
return html`<article>
      <div class="deco-top-left">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path
            d="M 0 25 L 25 0"
            stroke="light-dark(#151515, #fffff9)"
            stroke-width="0.8"
          />
        </svg>
      </div>
      <div class="deco-top"></div>
      <div class="deco-top-right">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path
            d="M 0 0 L 25 25"
            stroke="light-dark(#151515, #fffff9)"
            stroke-width="0.8"
          />
        </svg>
      </div>
      <div class="deco-left"></div>
      <div class="slot">
        <h2>${this.title}</h2>
    <slot></slot>
      </div>
      <div class="deco-right"></div>
      <div class="deco-bottom-left">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path
            d="M 0 0 L 25 25"
            stroke="light-dark(#151515, #fffff9)"
            stroke-width="0.8"
          />
        </svg>
      </div>
      <div class="deco-bottom"></div>
      <div class="deco-bottom-right">
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path
            d="M 0 25 L 25 0"
            stroke="light-dark(#151515, #fffff9)"
            stroke-width="0.8"
          />
        </svg>
      </div>
    </article>`;
}
}

export default CardCustom;
