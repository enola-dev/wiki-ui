# Wiki UI

This is the CSS + TS source code for the client-side UI assets of the [Wiki](../wiki)<!-- TODO and its API (as OpenAPI spec)-->.

## Distribution Assets & Architecture

Building the project consolidates the output into exactly 4 production assets in `dist/`, using a 3-way progressive loading split:

* `dist/wiki.css` (~3.1 KB) — Consolidated stylesheet containing typography, wiki layout, and `highlight.js` GitHub theme.
* `dist/wiki.js` (~0.5 KB) — Ultra-lightweight core bootstrap module. Runs on all pages with zero dependencies, detects DOM requirements, and dynamically loads code highlighting and/or Mermaid only when needed.
* `dist/code.js` (~98 KB) — Curated syntax highlighting bundle powered by `highlight.js/lib/core`. Dynamically fetched only when `<pre code>` elements exist on the page.
  * **Supported languages & aliases**: Java, TypeScript (`ts`, `tsx`), JavaScript (`js`, `jsx`), Bash (`sh`, `shell`, `zsh`), JSON (`jsonc`), YAML (`yml`), XML/HTML (`svg`, `xhtml`), Markdown (`md`), SQL, Python (`py`), Rust (`rs`), Go (`golang`), CSS, Nix, C, C++ (`cpp`, `cc`), Diff (`patch`), Kotlin (`kt`).
* `dist/mermaid.js` (~3.5 MB) — Mermaid diagram rendering engine. Dynamically fetched only when `<pre class="mermaid">` elements exist on the page.

### Progressive Loading Summary

| Page Content | Assets Downloaded | Total JS + CSS Size |
| :--- | :--- | :--- |
| **Prose / Index / Directory** (no code, no diagrams) | `wiki.css` + `wiki.js` | **~3.6 KB** |
| **Documentation with Code** (no diagrams) | `wiki.css` + `wiki.js` + `code.js` | **~101 KB** |
| **Pages with Diagrams** | `wiki.css` + `wiki.js` + `code.js` + `mermaid.js` | **~3.6 MB** |

## Commands

All development tasks use [Bun](https://bun.sh):

```bash
# Start live development server with hot reload (TS, JS, CSS) at http://localhost:3000
bun run dev

# Build and minify production bundle into dist/
bun run build

# Build and preview the production dist/ bundle at http://localhost:3000
bun run preview

# Run tests
bun test

# Run type checking and test suite
bun run check
```

## Demo & Testing

Interactive fixture pages are located in the `demo/` directory:

* `http://localhost:3000/` (`demo/index.html`) — Full fixture with syntax highlighting, header actions, breadcrumbs, and lazy-loaded Mermaid diagrams.
* `http://localhost:3000/no-mermaid.html` (`demo/no-mermaid.html`) — Fixture with code blocks only (loads `code.js`, verifies `mermaid.js` is not fetched).
* `http://localhost:3000/prose.html` (`demo/prose.html`) — Fixture with pure prose (verifies ultra-fast load with only `wiki.js` and `wiki.css`).
