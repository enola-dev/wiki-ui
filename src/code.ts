import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import markdown from 'highlight.js/lib/languages/markdown';
import nix from 'highlight.js/lib/languages/nix';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

// Register core curated languages & aliases
hljs.registerLanguage('bash', bash);
hljs.registerAliases(['sh', 'shell', 'zsh'], { languageName: 'bash' });

hljs.registerLanguage('c', c);
hljs.registerAliases(['h'], { languageName: 'c' });

hljs.registerLanguage('cpp', cpp);
hljs.registerAliases(['cc', 'c++', 'hpp', 'hh', 'cxx'], { languageName: 'cpp' });

hljs.registerLanguage('css', css);

hljs.registerLanguage('diff', diff);
hljs.registerAliases(['patch'], { languageName: 'diff' });

hljs.registerLanguage('go', go);
hljs.registerAliases(['golang'], { languageName: 'go' });

hljs.registerLanguage('java', java);

hljs.registerLanguage('javascript', javascript);
hljs.registerAliases(['js', 'jsx', 'mjs', 'cjs'], { languageName: 'javascript' });

hljs.registerLanguage('json', json);
hljs.registerAliases(['jsonc'], { languageName: 'json' });

hljs.registerLanguage('kotlin', kotlin);
hljs.registerAliases(['kt', 'kts'], { languageName: 'kotlin' });

hljs.registerLanguage('markdown', markdown);
hljs.registerAliases(['md', 'mkdown'], { languageName: 'markdown' });

hljs.registerLanguage('nix', nix);

hljs.registerLanguage('python', python);
hljs.registerAliases(['py', 'gyp'], { languageName: 'python' });

hljs.registerLanguage('rust', rust);
hljs.registerAliases(['rs'], { languageName: 'rust' });

hljs.registerLanguage('sql', sql);

hljs.registerLanguage('typescript', typescript);
hljs.registerAliases(['ts', 'tsx', 'mts', 'cts'], { languageName: 'typescript' });

hljs.registerLanguage('xml', xml);
hljs.registerAliases(['html', 'xhtml', 'svg', 'rss'], { languageName: 'xml' });

hljs.registerLanguage('yaml', yaml);
hljs.registerAliases(['yml'], { languageName: 'yaml' });

export async function highlightCode(): Promise<void> {
  hljs.highlightAll();
}
