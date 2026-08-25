import { describe, expect, test } from "bun:test";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

describe("wiki-ui bundle", () => {
  const distDir = join(import.meta.dir, "../dist");
  const wikiJsPath = join(distDir, "wiki.js");
  const wikiCssPath = join(distDir, "wiki.css");

  test("dist/wiki.js exists and is an IIFE (CORS/file:// compatible)", () => {
    expect(existsSync(wikiJsPath)).toBe(true);
    const content = readFileSync(wikiJsPath, "utf-8");
    expect(content.length).toBeGreaterThan(1000);
    // Must be bundled as IIFE (self-invoking function) without ES module import/export
    expect(content.startsWith("(()=>") || content.startsWith("(function")).toBe(true);
    expect(content.endsWith(")();\n") || content.endsWith(")();")).toBe(true);
    expect(content).toContain("highlightAll");
    expect(content).toContain("mermaid");
    expect(content).toContain(".mermaid");
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
