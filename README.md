# Wiki UI

This is the CSS + TS source code for the client-side UI assets of the [Wiki](../wiki)<!-- TODO and its API (as OpenAPI spec)-->.

## Distribution Assets

Building the project consolidates the output into exactly 3 production assets in `dist/`:

* `dist/wiki.css` — Consolidated stylesheet containing typography, wiki layout, and `highlight.js` GitHub theme.
* `dist/wiki.js` — Client-side bootstrap module that runs syntax highlighting and dynamically loads Mermaid if `<pre class="mermaid">` elements exist on the page.
* `dist/mermaid.js` — Lazy-loaded Mermaid bundle, fetched dynamically only when diagrams are present.

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
* `http://localhost:3000/no-mermaid.html` (`demo/no-mermaid.html`) — Fixture without Mermaid, used to verify in browser DevTools Network tab that `mermaid.js` is not fetched.
