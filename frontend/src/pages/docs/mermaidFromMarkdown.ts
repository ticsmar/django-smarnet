import { Children, isValidElement, type ReactNode } from "react";

export function mermaidSourceFromPreChildren(
  children: ReactNode,
): string | null {
  const items = Children.toArray(children);
  const code = items.find((child) => isValidElement(child));
  if (!isValidElement<{ className?: string; children?: ReactNode }>(code)) {
    return null;
  }
  const className = String(code.props.className ?? "");
  const languages = className.split(/\s+/);
  if (!languages.includes("language-mermaid")) {
    return null;
  }
  return String(code.props.children ?? "").replace(/\n$/, "");
}
