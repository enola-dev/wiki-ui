import hljs from 'highlight.js';
import mermaid from 'mermaid';
import './wiki.css';
import 'highlight.js/styles/github.css';

function init() {
  hljs.highlightAll();
  mermaid.initialize({ startOnLoad: false });
  mermaid.run({ querySelector: '.mermaid' }).catch(console.error);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
