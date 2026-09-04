import mermaid from 'mermaid';

const SOURCE_ATTR = 'data-mermaid-source';
const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function prefersDarkMode(): boolean {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches;
}

function getMermaidTheme(): 'default' | 'dark' {
  return prefersDarkMode() ? 'dark' : 'default';
}

function getMermaidConfig(): Parameters<typeof mermaid.initialize>[0] {
  return {
    startOnLoad: false,
    theme: getMermaidTheme(),
    themeVariables: {
      background: 'transparent',
    },
  };
}

function stashDiagramSource(element: HTMLElement): void {
  if (element.hasAttribute(SOURCE_ATTR)) return;

  const source = element.textContent?.trim() ?? '';
  if (source) {
    element.setAttribute(SOURCE_ATTR, source);
  }
}

function resetDiagram(element: HTMLElement): void {
  const source = element.getAttribute(SOURCE_ATTR);
  if (!source) return;

  element.removeAttribute('data-processed');
  element.textContent = source;
}

function prepareDiagrams(nodes: NodeListOf<HTMLElement>): void {
  for (const node of nodes) {
    stashDiagramSource(node);
  }
}

async function renderDiagrams(nodes: NodeListOf<HTMLElement>): Promise<void> {
  mermaid.initialize(getMermaidConfig());
  await mermaid.run({ nodes });
}

let themeListenerAttached = false;

function attachThemeListener(): void {
  if (themeListenerAttached) return;
  themeListenerAttached = true;

  window.matchMedia(COLOR_SCHEME_QUERY).addEventListener('change', () => {
    const nodes = document.querySelectorAll<HTMLElement>('.mermaid');
    if (nodes.length === 0) return;

    for (const node of nodes) {
      resetDiagram(node);
    }

    void renderDiagrams(nodes);
  });
}

export async function renderMermaid(): Promise<void> {
  const nodes = document.querySelectorAll<HTMLElement>('.mermaid');
  if (nodes.length === 0) return;

  prepareDiagrams(nodes);
  await renderDiagrams(nodes);
  attachThemeListener();
}
