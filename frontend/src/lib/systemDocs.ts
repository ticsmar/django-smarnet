/**
 * Catálogo da Documentação do Sistema (Markdown em docs/).
 * Conteúdo embutido no bundle via import.meta.glob (?raw).
 */

export type DocNode = {
  /** Caminho relativo a docs/, sem .md (README → pasta ou ""). */
  slug: string;
  /** Título exibido (H1 do arquivo ou nome amigável). */
  title: string;
  /** Conteúdo Markdown bruto. */
  content: string;
  /** true se o arquivo é README.md da pasta. */
  isIndex: boolean;
};

export type DocTreeNode = {
  id: string;
  label: string;
  /** Se definido, é um arquivo navegável. */
  slug?: string;
  children?: DocTreeNode[];
};

const rawModules = import.meta.glob("../../../docs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function filePathToRel(moduleKey: string): string {
  const normalized = moduleKey.replace(/\\/g, "/");
  const marker = "/docs/";
  const idx = normalized.lastIndexOf(marker);
  if (idx >= 0) return normalized.slice(idx + marker.length);
  const alt = "docs/";
  const i2 = normalized.indexOf(alt);
  if (i2 >= 0) return normalized.slice(i2 + alt.length);
  return normalized.replace(/^\.\.\//g, "").replace(/^docs\//, "");
}

function relToSlug(rel: string): string {
  const noExt = rel.replace(/\.md$/i, "");
  if (noExt === "README" || noExt.endsWith("/README")) {
    const dir = noExt === "README" ? "" : noExt.slice(0, -"/README".length);
    return dir;
  }
  return noExt;
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match?.[1]) return match[1].trim();
  return fallback
    .split(/[/\\]/)
    .filter(Boolean)
    .pop()!
    .replace(/\.md$/i, "")
    .replace(/-/g, " ");
}

function labelFromSegment(segment: string): string {
  const map: Record<string, string> = {
    developers: "Developers",
    admins: "Admins",
    operators: "Operators",
    adr: "ADRs",
  };
  if (map[segment]) return map[segment];
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const docsBySlug = new Map<string, DocNode>();

for (const [key, content] of Object.entries(rawModules)) {
  const rel = filePathToRel(key);
  if (!rel.toLowerCase().endsWith(".md")) continue;
  const slug = relToSlug(rel);
  const isIndex = /(?:^|\/)README\.md$/i.test(rel);
  const fallbackName = isIndex
    ? slug === ""
      ? "Documentação"
      : slug.split("/").pop() || "Index"
    : rel.replace(/\.md$/i, "").split("/").pop() || slug;
  docsBySlug.set(slug, {
    slug,
    title: extractTitle(content, fallbackName),
    content,
    isIndex,
  });
}

export function getDoc(slug: string): DocNode | undefined {
  const key = slug.replace(/^\/+|\/+$/g, "");
  return docsBySlug.get(key);
}

export function listDocs(): DocNode[] {
  return [...docsBySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Árvore para o menu lateral (pastas + arquivos). */
export function buildDocsTree(): DocTreeNode[] {
  type Mutable = {
    id: string;
    label: string;
    slug?: string;
    children: Map<string, Mutable>;
  };

  const root: Mutable = {
    id: "",
    label: "docs",
    children: new Map(),
  };

  // Índice raiz
  const rootDoc = docsBySlug.get("");
  if (rootDoc) {
    root.slug = "";
    root.label = rootDoc.title;
  }

  for (const doc of docsBySlug.values()) {
    if (doc.slug === "") continue;
    const parts = doc.slug.split("/");
    let cursor = root;

    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1;
      const id = parts.slice(0, index + 1).join("/");

      if (isLeaf && !doc.isIndex) {
        // arquivo .md (não README)
        if (!cursor.children.has(part)) {
          cursor.children.set(part, {
            id,
            label: doc.title,
            slug: doc.slug,
            children: new Map(),
          });
        } else {
          const existing = cursor.children.get(part)!;
          existing.slug = doc.slug;
          existing.label = doc.title;
        }
        return;
      }

      // pasta (ou README da pasta)
      if (!cursor.children.has(part)) {
        const folderDoc = docsBySlug.get(id);
        cursor.children.set(part, {
          id,
          label: folderDoc?.title ?? labelFromSegment(part),
          slug: folderDoc ? id : undefined,
          children: new Map(),
        });
      } else if (doc.isIndex && isLeaf) {
        const existing = cursor.children.get(part)!;
        existing.slug = id;
        existing.label = doc.title;
      }
      cursor = cursor.children.get(part)!;
    });
  }

  function toTree(node: Mutable): DocTreeNode {
    const children = [...node.children.values()]
      .map(toTree)
      .sort((a, b) => {
        const aDir = Boolean(a.children?.length);
        const bDir = Boolean(b.children?.length);
        if (aDir !== bDir) return aDir ? -1 : 1;
        return a.label.localeCompare(b.label, "pt");
      });
    return {
      id: node.id,
      label: node.label,
      slug: node.slug,
      children: children.length ? children : undefined,
    };
  }

  return toTree(root).children ?? [];
}

export function docHref(slug: string): string {
  return slug === "" ? "/docs" : `/docs/${slug}`;
}

/**
 * Resolve link relativo de um .md para slug de rota, ou null se externo/inválido.
 */
export function resolveDocLink(fromSlug: string, href: string): string | null {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
    return null;
  }
  let path = href.split("#")[0] ?? href;
  if (path.startsWith("/docs/") || path === "/docs") {
    return path === "/docs" ? "" : path.replace(/^\/docs\//, "").replace(/\.md$/i, "");
  }
  // só tratamos links .md ou caminhos relativos sem protocolo
  if (path.startsWith("/")) return null;

  const fromDir = fromSlug === "" ? "" : fromSlug.includes("/") ? fromSlug.slice(0, fromSlug.lastIndexOf("/")) : "";
  const stack = fromDir ? fromDir.split("/") : [];
  for (const seg of path.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") {
      stack.pop();
      continue;
    }
    stack.push(seg);
  }
  let joined = stack.join("/");
  joined = joined.replace(/\.md$/i, "");
  if (joined.endsWith("/README")) joined = joined.slice(0, -"/README".length);
  if (joined === "README") joined = "";
  // links para CONTEXT.md / AGENTS.md fora de docs/
  if (joined === "CONTEXT" || joined.endsWith("/CONTEXT") || joined === "AGENTS" || joined.endsWith("/AGENTS")) {
    return null;
  }
  return joined.replace(/^\.\.\//, "");
}
