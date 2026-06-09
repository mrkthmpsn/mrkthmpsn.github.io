# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production (uses static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Single Page Testing
Next.js automatically handles page routing. Individual pages can be tested by navigating to their routes (e.g., `/projects`, `/about`, `/contact`).

## Architecture Overview

This is a **Next.js 15 personal portfolio website** using the App Router architecture, featuring football data visualizations and project showcases.

### Key Architecture Patterns

**Static Site Generation**: Configured for static export (`output: "export"` in next.config.js) suitable for GitHub Pages deployment.

**Component-based Architecture**:
- `components/` - Reusable UI components (navbar, cards, wrappers)
- `app/` - Page routes using App Router with individual page.tsx files
- Each project page follows the pattern: `app/[project-name]/page.tsx` + `[project-name].md`

**Data Visualization System**:
- Uses D3.js + d3-soccer for football pitch animations
- Custom TypeScript types in `data/types.tsx` for match/player data
- Pitch animation components in `components/pitchAnimation/`

**Content Management**:
- Markdown files (`.md`) co-located with pages for project content
- Webpack 5 `asset/source` configuration for importing markdown
- ProjectPageWrapper component for consistent project page layouts

### Styling System
- **Tailwind CSS** for utility-first styling
- **Bootstrap** for grid components (navbar is custom)
- **Custom color scheme**: brandStraw, brandLightBlue, ggOrange variants defined in tailwind.config.js
- **Fonts**: Roboto Slab for headings, Inter (via next/font) for body text

### TypeScript Configuration
- Strict mode enabled with path aliases (`@/*` points to root)
- Includes both `.ts` and `.js` files (some legacy plotting tools are in JavaScript)
- Custom type definitions for football data structures

## Project Structure Patterns

**Page Layout**: Each route page imports CustomNavbar and follows consistent grid layouts
**Project Pages**: Use ProjectPageWrapper with markdown content and header images
**Image Assets**: Organized by feature in `public/images/[feature-name]/`
**Football Visualizations**: Complex D3.js animations with TypeScript interfaces for data handling

## Development Notes

**Webpack Configuration**: Uses `asset/source` for markdown import and filesystem fallbacks for client-side rendering
**Component Naming**: Use PascalCase for components, camelCase for utilities
**Asset Imports**: Static imports for images, dynamic imports for markdown content
**Responsive Design**: Mobile-first approach with Tailwind responsive prefixes (md:, lg:)