import { css } from 'lit';

/**
 * Shared Tufte CSS styles for web components.
 * These styles are encapsulated within shadow DOM to avoid FOUC.
 */

export const fontFaces = css`
  @font-face {
    font-family: "et-book";
    src: url("et-book/et-book-roman-line-figures/et-book-roman-line-figures.eot");
    src: url("et-book/et-book-roman-line-figures/et-book-roman-line-figures.eot?#iefix") format("embedded-opentype"),
         url("et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff") format("woff"),
         url("et-book/et-book-roman-line-figures/et-book-roman-line-figures.ttf") format("truetype"),
         url("et-book/et-book-roman-line-figures/et-book-roman-line-figures.svg#etbookromanosf") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "et-book";
    src: url("et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.eot");
    src: url("et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.eot?#iefix") format("embedded-opentype"),
         url("et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.woff") format("woff"),
         url("et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.ttf") format("truetype"),
         url("et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.svg#etbookromanosf") format("svg");
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "et-book";
    src: url("et-book/et-book-bold-line-figures/et-book-bold-line-figures.eot");
    src: url("et-book/et-book-bold-line-figures/et-book-bold-line-figures.eot?#iefix") format("embedded-opentype"),
         url("et-book/et-book-bold-line-figures/et-book-bold-line-figures.woff") format("woff"),
         url("et-book/et-book-bold-line-figures/et-book-bold-line-figures.ttf") format("truetype"),
         url("et-book/et-book-bold-line-figures/et-book-bold-line-figures.svg#etbookromanosf") format("svg");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "et-book-roman-old-style";
    src: url("et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.eot");
    src: url("et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.eot?#iefix") format("embedded-opentype"),
         url("et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.woff") format("woff"),
         url("et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.ttf") format("truetype"),
         url("et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.svg#etbookromanosf") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

/**
 * Base styles shared by every component.
 *
 * Colors and fonts are exposed as CSS custom properties so the client
 * application can override them from its own stylesheet, e.g.:
 *
 * ```css
 * tufte-article {
 *   --tufte-font-family: Georgia, serif;
 *   --tufte-text-color: #222;
 *   --tufte-background-color: #fff;
 * }
 * ```
 *
 * Custom properties inherit across the shadow DOM boundary, so setting them
 * on the host element (or any ancestor) applies to the encapsulated styles.
 * Each is consumed with a `var(--token, <default>)` fallback, so leaving a
 * property unset preserves the original Tufte defaults.
 *
 * Theming (e.g. dark mode) is the client application's responsibility: point
 * these properties at your own theme variables and switch them however you
 * like (a `prefers-color-scheme` media query, a `data-theme` attribute, etc.).
 */
export const baseStyles = css`
  :host {
    font-family: var(
      --tufte-font-family,
      et-book, Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif
    );
    font-size: var(--tufte-font-size, 15px);
    color: var(--tufte-text-color, #111);
  }
`;

/**
 * Link styling for anchors that appear as direct children of a component's
 * slot (e.g. inside `<tufte-paragraph>` or `<tufte-h1>`). Kept here as a
 * shared token so each component can own the styling of the links it contains,
 * rather than a wrapper reaching across the tree to style them.
 */
export const linkStyles = css`
  ::slotted(a:link),
  ::slotted(a:visited) {
    color: inherit;
    text-underline-offset: 0.1em;
    text-decoration-thickness: 0.05em;
  }
`;

export const sidenoteStyles = css`
  .sidenote,
  .marginnote {
    float: right;
    clear: right;
    margin-right: -60%;
    width: 50%;
    margin-top: 0.3rem;
    margin-bottom: 0;
    font-size: 1.1rem;
    line-height: 1.3;
    vertical-align: baseline;
    position: relative;
  }

  .sidenote-number {
    counter-increment: sidenote-counter;
  }

  .sidenote-number::after,
  .sidenote::before {
    font-family: var(--tufte-numerals-font-family, et-book-roman-old-style);
    position: relative;
    vertical-align: baseline;
  }

  .sidenote-number::after {
    content: counter(sidenote-counter);
    font-size: 1rem;
    top: -0.5rem;
    left: 0.1rem;
  }

  .sidenote::before {
    content: counter(sidenote-counter) " ";
    font-size: 1rem;
    top: -0.5rem;
  }

  input.margin-toggle {
    display: none;
  }

  label.sidenote-number {
    display: inline-block;
    max-height: 2rem;
  }

  label.margin-toggle:not(.sidenote-number) {
    display: none;
  }

  @media (max-width: 760px) {
    label.margin-toggle:not(.sidenote-number) {
      display: inline;
    }

    .sidenote,
    .marginnote {
      display: none;
    }

    .margin-toggle:checked + .sidenote,
    .margin-toggle:checked + .marginnote {
      display: block;
      float: left;
      left: 1rem;
      clear: both;
      width: 95%;
      margin: 1rem 2.5%;
      vertical-align: baseline;
      position: relative;
    }

    label {
      cursor: pointer;
    }
  }
`;
