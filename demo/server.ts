import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const rootDir = join(import.meta.dir, '..');

async function getDevJs(): Promise<string> {
  const build = await Bun.build({
    entrypoints: [join(rootDir, 'src/wiki.ts')],
    target: 'browser',
    format: 'esm',
    external: ['./mermaid.js', './mermaid', 'mermaid', './code.js', './code', 'code'],
  });
  const jsOutput = build.outputs.find(o => o.path.endsWith('.js'));
  return jsOutput ? await jsOutput.text() : '';
}

async function getDevCodeJs(): Promise<string> {
  const build = await Bun.build({
    entrypoints: [join(rootDir, 'src/code.ts')],
    target: 'browser',
    format: 'esm',
  });
  const jsOutput = build.outputs.find(o => o.path.endsWith('.js'));
  return jsOutput ? await jsOutput.text() : '';
}

async function getDevMermaidJs(): Promise<string> {
  const build = await Bun.build({
    entrypoints: [join(rootDir, 'src/mermaid.ts')],
    target: 'browser',
    format: 'esm',
  });
  const jsOutput = build.outputs.find(o => o.path.endsWith('.js'));
  return jsOutput ? await jsOutput.text() : '';
}

async function getDevCss(): Promise<string> {
  const wikiCssPath = join(rootDir, 'src/wiki.css');
  const hljsCssPath = join(rootDir, 'node_modules/highlight.js/styles/github.css');

  const wikiCss = existsSync(wikiCssPath) ? readFileSync(wikiCssPath, 'utf-8') : '';
  const hljsCss = existsSync(hljsCssPath) ? readFileSync(hljsCssPath, 'utf-8') : '';
  return `${wikiCss}\n${hljsCss}`;
}

export function createDemoServer(options: { port?: number; isPreview?: boolean } = {}) {
  const isPreview = options.isPreview ?? process.argv.includes('--preview');
  const port = options.port ?? (Number(process.env.PORT) || 3000);

  return Bun.serve({
    port,
    development: !isPreview,
    async fetch(req) {
      const url = new URL(req.url);
      let pathname = url.pathname;

      if (pathname === '/' || pathname === '/index.html') {
        pathname = '/demo/index.html';
      } else if (pathname === '/no-mermaid' || pathname === '/no-mermaid.html') {
        pathname = '/demo/no-mermaid.html';
      } else if (pathname === '/prose' || pathname === '/prose.html') {
        pathname = '/demo/prose.html';
      }

      if (pathname === '/wiki.css') {
        if (isPreview) {
          const file = Bun.file(join(rootDir, 'dist/wiki.css'));
          if (!(await file.exists())) {
            return new Response('/* dist/wiki.css not found. Run "bun run build" first. */', {
              status: 404,
              headers: { 'Content-Type': 'text/css' },
            });
          }
          return new Response(file, { headers: { 'Content-Type': 'text/css' } });
        }
        return new Response(await getDevCss(), { headers: { 'Content-Type': 'text/css' } });
      }

      if (pathname === '/wiki.js') {
        if (isPreview) {
          const file = Bun.file(join(rootDir, 'dist/wiki.js'));
          if (!(await file.exists())) {
            return new Response('// dist/wiki.js not found. Run "bun run build" first.', {
              status: 404,
              headers: { 'Content-Type': 'application/javascript' },
            });
          }
          return new Response(file, { headers: { 'Content-Type': 'application/javascript' } });
        }
        return new Response(await getDevJs(), {
          headers: { 'Content-Type': 'application/javascript' },
        });
      }

      if (pathname === '/code.js') {
        if (isPreview) {
          const file = Bun.file(join(rootDir, 'dist/code.js'));
          if (!(await file.exists())) {
            return new Response('// dist/code.js not found. Run "bun run build" first.', {
              status: 404,
              headers: { 'Content-Type': 'application/javascript' },
            });
          }
          return new Response(file, { headers: { 'Content-Type': 'application/javascript' } });
        }
        return new Response(await getDevCodeJs(), {
          headers: { 'Content-Type': 'application/javascript' },
        });
      }

      if (pathname === '/mermaid.js') {
        if (isPreview) {
          const file = Bun.file(join(rootDir, 'dist/mermaid.js'));
          if (!(await file.exists())) {
            return new Response('// dist/mermaid.js not found. Run "bun run build" first.', {
              status: 404,
              headers: { 'Content-Type': 'application/javascript' },
            });
          }
          return new Response(file, { headers: { 'Content-Type': 'application/javascript' } });
        }
        return new Response(await getDevMermaidJs(), {
          headers: { 'Content-Type': 'application/javascript' },
        });
      }

      const filePath = join(rootDir, pathname.startsWith('/') ? pathname.slice(1) : pathname);
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }

      return new Response('Not Found', { status: 404 });
    },
  });
}

if (import.meta.main) {
  const isPreview = process.argv.includes('--preview');
  const server = createDemoServer({ isPreview });
  console.log(
    `🚀 Wiki UI [${isPreview ? 'PREVIEW (dist/)' : 'DEV (live hot reload)'}] running at http://localhost:${server.port}`,
  );
}
