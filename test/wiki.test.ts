import { describe, expect, test } from "bun:test";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

describe("wiki-ui bundle", () => {
  const distDir = join(import.meta.dir, "../dist");
  const wikiJsPath = join(distDir, "wiki.js");
  const wikiCssPath = join(distDir, "wiki.css");

  test("dist/wiki.js exists and dynamically imports mermaid", () => {
    expect(existsSync(wikiJsPath)).toBe(true);
    const content = readFileSync(wikiJsPath, "utf-8");
    expect(content.length).toBeGreaterThan(1000);
    expect(content).toContain("highlightAll");
    expect(content).toContain(".mermaid");
    expect(content).toContain("import(");
    expect(content).toContain("export");
  });

  test("dist/wiki.css exists and contains wiki and highlight.js styles", () => {
    expect(existsSync(wikiCssPath)).toBe(true);
    const content = readFileSync(wikiCssPath, "utf-8");
    expect(content).toContain(".header-actions");
    expect(content).toContain(".edit-button");
    expect(content).toContain(".mermaid");
    expect(content).toContain(".hljs");
  });
});
