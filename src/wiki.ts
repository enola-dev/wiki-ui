import hljs from 'highlight.js';
import './wiki.css';
import 'highlight.js/styles/github.css';

// TODO: Package as an embeddable Web Component (e.g. <wiki ...>) and modern ES module for embedding by other web apps.

export async function init() {
  hljs.highlightAll();

  if (typeof document !== 'undefined' && document.querySelector('pre.mermaid')) {
    const { renderMermaid } = await import(String('./mermaid.js'));
    await renderMermaid().catch(console.error);
  }
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
