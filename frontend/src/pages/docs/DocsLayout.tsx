import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  Monitor,
  Moon,
  Shield,
  Sun,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import {
  buildDocsTree,
  docHref,
  getDoc,
  resolveDocLink,
  type DocTreeNode,
} from "@/lib/systemDocs";
import { MermaidDiagram } from "./MermaidDiagram";
import { mermaidSourceFromPreChildren } from "./mermaidFromMarkdown";

function TreeItem({
  node,
  depth = 0,
}: {
  node: DocTreeNode;
  depth?: number;
}) {
  const hasChildren = Boolean(node.children?.length);
  const [open, setOpen] = useState(depth < 2);
  const { pathname } = useLocation();
  const active =
    node.slug !== undefined &&
    (node.slug === ""
      ? pathname === "/docs"
      : pathname === `/docs/${node.slug}`);

  const rowClass = cn(
    "flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-sm font-medium transition-all",
    active && node.slug !== undefined
      ? "bg-primary text-primary-foreground shadow-ambient"
      : "text-muted-foreground hover:bg-surface-container hover:text-foreground",
  );

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-0.5" style={{ paddingLeft: depth * 8 }}>
        {hasChildren ? (
          <button
            type="button"
            aria-label={open ? "Recolher" : "Expandir"}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-container hover:text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-7 shrink-0" />
        )}
        {node.slug !== undefined ? (
          <NavLink to={docHref(node.slug)} end={node.slug === ""} className={cn(rowClass, "min-w-0 flex-1")}>
            {hasChildren ? <Folder size={14} className="shrink-0" /> : <FileText size={14} className="shrink-0" />}
            <span className="truncate">{node.label}</span>
          </NavLink>
        ) : (
          <button type="button" className={cn(rowClass, "min-w-0 flex-1")} onClick={() => setOpen((v) => !v)}>
            <Folder size={14} className="shrink-0" />
            <span className="truncate">{node.label}</span>
          </button>
        )}
      </div>
      {hasChildren && open
        ? node.children!.map((child) => <TreeItem key={child.id} node={child} depth={depth + 1} />)
        : null}
    </div>
  );
}

function DocsSidebarNav() {
  const tree = useMemo(() => buildDocsTree(), []);
  const root = getDoc("");

  return (
    <nav className="sticky top-24 space-y-1">
      {root ? (
        <NavLink
          to="/docs"
          end
          className={({ isActive }) =>
            cn(
              "mb-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground shadow-ambient"
                : "text-muted-foreground hover:bg-surface-container hover:text-foreground",
            )
          }
        >
          <BookOpen size={16} />
          Visão geral
        </NavLink>
      ) : null}
      {tree.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </nav>
  );
}

function MarkdownView({ slug, content }: { slug: string; content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-8 border-b border-border/40 pb-2 font-display text-xl font-bold tracking-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-6 font-display text-lg font-semibold">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 text-sm leading-relaxed text-foreground/90">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5 text-sm">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5 text-sm">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-accent/60 bg-surface-container-low px-4 py-2 text-sm text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ className, children, ...props }) => {
          const isBlock = Boolean(className?.includes("language-") || String(children).includes("\n"));
          if (isBlock) {
            return (
              <code className={cn("font-mono text-[12px] text-foreground", className)} {...props}>
                {children}
              </code>
            );
          }
          return (
            <code
              className="rounded-md bg-surface-container-high px-1.5 py-0.5 font-mono text-[12px] text-secondary"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => {
          const mermaidSource = mermaidSourceFromPreChildren(children);
          if (mermaidSource !== null) {
            return <MermaidDiagram chart={mermaidSource} />;
          }
          return (
            <pre className="mb-4 overflow-x-auto rounded-xl border border-border/50 bg-surface-container-low p-4 text-[12px]">
              {children}
            </pre>
          );
        },
        table: ({ children }) => (
          <div className="mb-6 overflow-x-auto rounded-xl border border-border/50">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-surface-container-high">{children}</thead>,
        th: ({ children }) => (
          <th className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {children}
          </th>
        ),
        td: ({ children }) => <td className="border-t border-border/30 px-3 py-2 align-top">{children}</td>,
        a: ({ href, children }) => {
          const resolved = href ? resolveDocLink(slug, href) : null;
          if (resolved !== null && getDoc(resolved)) {
            return (
              <Link to={docHref(resolved)} className="font-medium text-primary underline-offset-2 hover:underline">
                {children}
              </Link>
            );
          }
          const external = href?.startsWith("http");
          return (
            <a
              href={href}
              className="font-medium text-primary underline-offset-2 hover:underline"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {children}
            </a>
          );
        },
        hr: () => <hr className="my-8 border-border/50" />,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function DocPage() {
  const { "*": splat } = useParams();
  const slug = (splat ?? "").replace(/^\/+|\/+$/g, "");
  const doc = getDoc(slug);

  if (!doc) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
        <p className="font-display text-lg font-bold">Documento não encontrado</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Não há Markdown para a rota /docs/{slug || ""}
        </p>
        <Link to="/docs" className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
          Voltar à visão geral
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
        Documentação do Sistema
        {doc.slug ? ` · ${doc.slug}` : ""}
      </p>
      <MarkdownView slug={doc.slug} content={doc.content} />
    </article>
  );
}

function flattenTree(nodes: DocTreeNode[], prefix = ""): { slug: string; label: string }[] {
  const out: { slug: string; label: string }[] = [];
  for (const n of nodes) {
    const label = prefix ? `${prefix} / ${n.label}` : n.label;
    if (n.slug !== undefined && n.slug !== "") {
      out.push({ slug: n.slug, label });
    }
    if (n.children) out.push(...flattenTree(n.children, label));
  }
  return out;
}

export default function DocsLayout() {
  const { theme, setTheme } = useApp();
  const navigate = useNavigate();
  const { "*": splat } = useParams();
  const slug = (splat ?? "").replace(/^\/+|\/+$/g, "");
  const tree = useMemo(() => buildDocsTree(), []);
  const themes = [
    { id: "light" as const, icon: Sun, label: "Claro" },
    { id: "dark" as const, icon: Moon, label: "Escuro" },
    { id: "system" as const, icon: Monitor, label: "Sistema" },
    { id: "admin" as const, icon: Shield, label: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>
            <span className="h-5 w-px bg-border" />
            <p className="font-display text-base font-extrabold tracking-tight">
              smar<span className="text-accent">NET</span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Docs
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1 rounded-xl bg-surface-container p-1">
              {themes.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  title={label}
                  aria-label={`Tema ${label}`}
                  className={cn(
                    "flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-all",
                    theme === id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            <p className="hidden text-xs text-muted-foreground md:block">Documentação do Sistema</p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="hidden min-h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border/40 px-3 py-8 md:block">
          <DocsSidebarNav />
        </aside>

        <main className="min-w-0 flex-1 px-6 py-10 md:px-10">
          <div className="mb-6 md:hidden">
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              Navegar
            </label>
            <select
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
              value={slug}
              onChange={(e) => navigate(docHref(e.target.value))}
            >
              <option value="">Visão geral</option>
              {flattenTree(tree).map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
