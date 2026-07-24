# CLAUDE.md

This file provides guidance to Claude Code when working on this repository.

## Project Overview

Personal blog built with Astro 7, using Tufte CSS for typography. Content includes blog posts and book reviews written in MDX.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Type-check and build for production
- `npm run lint` - Run oxlint
- `npx playwright test` - Run e2e visual regression tests

## Code Review Standards
After completing any implementation, review the code for:
- Functions longer than 30 lines (likely doing too much)
- Logic duplicated more than twice (extract to utility)
- Any `any` type usage in TypeScript (replace with real types)
- Components with more than 3 props that could be grouped into an object
- Missing error handling on async operations

Run /simplify before presenting code to the user.

## Architecture

### Content Structure
- `src/content/blog/` - Blog posts (MDX)
- `src/content/book/` - Book reviews (MDX)
- `src/content/test-content/` - Test fixtures for visual regression

### Key Components
- `TufteContent.astro` - Wraps markdown content, transforms GFM footnotes to tufte-css web components
- `Article.astro` - Article layout with tufte-css `<tufte-article>` wrapper
- `Epigraph.astro`, `Figure.astro`, `NewThought.astro` - Tufte typography components

### Styling
- Tailwind CSS 4 for utility styles
- `tufte-prose.css` - Tufte typography overrides using CSS custom properties
- tufte-css web components (`tufte-sidenote`, `tufte-marginnote`, `tufte-epigraph`)

### Footnotes/Sidenotes
GFM footnotes in markdown are automatically transformed to `<tufte-sidenote>` elements by `TufteContent.astro`. Use `[^note]` syntax for sidenotes or an `mn-` prefixed id (`[^mn-note]`) for margin notes (no number). The transform lives in `src/lib/tufte-content/transform.ts` (unit-tested via `npm test`).
