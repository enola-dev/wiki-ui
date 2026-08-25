import './wiki.css';
import 'highlight.js/styles/github.css';

// TODO: Package as an embeddable Web Component (e.g. <wiki ...>) and modern ES module for embedding by other web apps.

export async function init(): Promise<void> {
  if (typeof document === 'undefined') return;

  const tasks: Promise<void>[] = [];

  if (document.querySelector('pre code')) {
    tasks.push(
      (async () => {
        const { highlightCode } = await import(String('./code.js'));
        await highlightCode().catch(console.error);
      })(),
    );
  }

  if (document.querySelector('pre.mermaid')) {
    tasks.push(
      (async () => {
        const { renderMermaid } = await import(String('./mermaid.js'));
        await renderMermaid().catch(console.error);
      })(),
    );
  }

  await Promise.all(tasks);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      void init();
    });
  } else {
    void init();
  }
}
