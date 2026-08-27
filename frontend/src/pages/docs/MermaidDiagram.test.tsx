import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { mermaidSourceFromPreChildren } from "@/pages/docs/mermaidFromMarkdown";

describe("mermaidSourceFromPreChildren", () => {
  it("extracts mermaid source from a fenced code block", () => {
    const code = createElement("code", {
      className: "language-mermaid",
      children: "flowchart TD\n  A --> B\n",
    });
    expect(mermaidSourceFromPreChildren(code)).toBe("flowchart TD\n  A --> B");
  });

  it("ignores non-mermaid code", () => {
    const code = createElement("code", {
      className: "language-sql",
      children: "SELECT 1",
    });
    expect(mermaidSourceFromPreChildren(code)).toBeNull();
  });
});
