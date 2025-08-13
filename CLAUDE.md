# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site (includes astro check for type checking)
- `npm run preview` - Preview production build locally
- `astro check` - Type check the codebase
- `prettier --write .` - Format code (Prettier configured for Astro)

## Architecture

This is an Astro-based blog focused on books and personal writing, using a **Tufte CSS** design system for academic-style typography with sidenotes.

### Content Architecture
- **Two content collections**: `blog` (personal posts) and `book` (book reviews/notes)
- Content stored as MDX files in `src/content/{blog,book}/`
- Frontmatter schemas defined in `src/content/config.ts`
- Blog posts have: title, description, pubDate, updatedDate, heroImage, draft
- Book entries have: title, subtitle, authors, finishedDate, publisher, draft

### Layout System
- `ContentBase.astro` - Base layout for all content pages
- `BlogPost.astro` - Layout for blog posts
- `BookPost.astro` - Layout for book reviews
- Site language set to `de-AT` (German/Austrian)

### Styling & Typography
- **Tufte CSS**: Academic-style typography with sidenotes and margin notes
- Custom Rehype plugin (`scripts/rehype-tufte-footnotes.js`) converts Markdown footnotes to Tufte-style sidenotes
- ET Book font family loaded from `/public/et-book/`
- Tailwind CSS for utility styles
- Custom CSS in `src/styles/tufte.css` and `src/styles/app.css`

### Key Technical Details
- Astro 5.x with MDX support
- Site URL: `https://blog.vomkonstant.in`
- Custom footnote processing for academic-style sidenotes
- Sitemap and RSS feed generation included
- No syntax highlighting enabled (syntaxHighlight: false)

### Content Organization
- Public images in `/public/img/` for book covers and post illustrations
- SVG decorative elements in `/public/svg/decals/`
- Art Nouveau design elements throughout