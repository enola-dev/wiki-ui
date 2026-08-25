import hljs from 'highlight.js';
import mermaid from 'mermaid';
import './wiki.css';
import 'highlight.js/styles/github.css';

// TODO: Package as an embeddable Web Component (e.g. <wiki ...>) and modern ES module for embedding by other web apps.

export function init() {
  hljs.highlightAll();
  mermaid.initialize({ startOnLoad: false });
  mermaid.run({ querySelector: '.mermaid' }).catch(console.error);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

