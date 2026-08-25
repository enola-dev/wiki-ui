import mermaid from 'mermaid';

export async function renderMermaid() {
  mermaid.initialize({ startOnLoad: false });
  await mermaid.run({ querySelector: '.mermaid' });
}
