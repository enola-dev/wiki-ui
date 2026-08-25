import { describe, expect, test } from "bun:test";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

describe("wiki-ui bundle", () => {
  const distDir = join(import.meta.dir, "../dist");
  const wikiJsPath = join(distDir, "wiki.js");
  const mermaidJsPath = join(distDir, "mermaid.js");
  const wikiCssPath = join(distDir, "wiki.css");

  test("dist contains exactly 3 consolidated files", () => {
    const files = readdirSync(distDir).sort();
    expect(files).toEqual(["mermaid.js", "wiki.css", "wiki.js"]);
  });

  test("dist/wiki.js exists and dynamically imports ./mermaid.js", () => {
    expect(existsSync(wikiJsPath)).toBe(true);
    const content = readFileSync(wikiJsPath, "utf-8");
    expect(content.length).toBeGreaterThan(1000);
    expect(content).toContain("highlightAll");
    expect(content).toContain(".mermaid");
    expect(content).toContain("import(");
    expect(content).toContain("./mermaid.js");
    expect(content).toContain("export");
  });

  test("dist/mermaid.js exists and contains Mermaid renderer", () => {
    expect(existsSync(mermaidJsPath)).toBe(true);
    const content = readFileSync(mermaidJsPath, "utf-8");
    expect(content.length).toBeGreaterThan(100000);
    expect(content).toContain("renderMermaid");
    expect(content).toContain("mermaid");
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

describe("wiki-ui demo fixtures", () => {
  const demoDir = join(import.meta.dir, "../demo");

  test("demo/index.html exists and contains fixture elements", () => {
    const indexPath = join(demoDir, "index.html");
    expect(existsSync(indexPath)).toBe(true);
    const content = readFileSync(indexPath, "utf-8");
    expect(content).toContain('class="header-actions"');
    expect(content).toContain('class="breadcrumbs"');
    expect(content).toContain('class="mermaid"');
    expect(content).toContain('class="language-typescript"');
  });

  test("demo/no-mermaid.html exists and excludes mermaid elements", () => {
    const noMermaidPath = join(demoDir, "no-mermaid.html");
    expect(existsSync(noMermaidPath)).toBe(true);
    const content = readFileSync(noMermaidPath, "utf-8");
    expect(content).toContain('class="header-actions"');
    expect(content).toContain('class="breadcrumbs"');
    expect(content).not.toContain('class="mermaid"');
    expect(content).toContain('class="language-typescript"');
  });
});

describe("wiki-ui demo server", () => {
  test("serves dev mode endpoints", async () => {
    const { createDemoServer } = await import("../demo/server");
    const server = createDemoServer({ port: 0, isPreview: false });
    const baseUrl = `http://localhost:${server.port}`;

    try {
      const indexRes = await fetch(`${baseUrl}/`);
      expect(indexRes.status).toBe(200);
      expect(indexRes.headers.get("content-type")).toContain("text/html");
      const indexText = await indexRes.text();
      expect(indexText).toContain("Wiki UI Demo");

      const noMermaidRes = await fetch(`${baseUrl}/no-mermaid`);
      expect(noMermaidRes.status).toBe(200);
      const noMermaidText = await noMermaidRes.text();
      expect(noMermaidText).toContain("Without Mermaid");

      const cssRes = await fetch(`${baseUrl}/wiki.css`);
      expect(cssRes.status).toBe(200);
      expect(cssRes.headers.get("content-type")).toContain("text/css");

      const jsRes = await fetch(`${baseUrl}/wiki.js`);
      expect(jsRes.status).toBe(200);
      expect(jsRes.headers.get("content-type")).toContain("application/javascript");

      const mermaidRes = await fetch(`${baseUrl}/mermaid.js`);
      expect(mermaidRes.status).toBe(200);
      expect(mermaidRes.headers.get("content-type")).toContain("application/javascript");
    } finally {
      server.stop(true);
    }
  });

  test("serves preview mode endpoints from dist/", async () => {
    const { createDemoServer } = await import("../demo/server");
    const server = createDemoServer({ port: 0, isPreview: true });
    const baseUrl = `http://localhost:${server.port}`;

    try {
      const indexRes = await fetch(`${baseUrl}/`);
      expect(indexRes.status).toBe(200);

      const cssRes = await fetch(`${baseUrl}/wiki.css`);
      expect(cssRes.status).toBe(200);
      expect(cssRes.headers.get("content-type")).toContain("text/css");

      const jsRes = await fetch(`${baseUrl}/wiki.js`);
      expect(jsRes.status).toBe(200);
      expect(jsRes.headers.get("content-type")).toContain("application/javascript");

      const mermaidRes = await fetch(`${baseUrl}/mermaid.js`);
      expect(mermaidRes.status).toBe(200);
      expect(mermaidRes.headers.get("content-type")).toContain("application/javascript");
    } finally {
      server.stop(true);
    }
  });
});
