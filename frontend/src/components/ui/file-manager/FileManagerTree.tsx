import { ChevronDown, ChevronRight, FolderTree, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { FileManagerNode } from "./types";
import { FileTypeIcon } from "./FileTypeIcon";
import { childrenOf, formatKb, formatNodeDate, trashItems } from "./treeUtils";

export type FileManagerTreeProps = {
  rootLabel: string;
  nodes: FileManagerNode[];
  selected: Set<number>;
  activeId: number | null;
  expanded: Set<number>;
  disabled?: boolean;
  onToggleExpand: (parCodigo: number) => void;
  onToggleSelect: (parCodigo: number) => void;
  onActivate: (node: FileManagerNode) => void;
  onDownload: (node: FileManagerNode) => void;
};

function NodeRow({
  node,
  depth,
  selected,
  activeId,
  expanded,
  disabled,
  nodes,
  onToggleExpand,
  onToggleSelect,
  onActivate,
  onDownload,
}: {
  node: FileManagerNode;
  depth: number;
  nodes: FileManagerNode[];
  selected: Set<number>;
  activeId: number | null;
  expanded: Set<number>;
  disabled: boolean;
  onToggleExpand: (parCodigo: number) => void;
  onToggleSelect: (parCodigo: number) => void;
  onActivate: (node: FileManagerNode) => void;
  onDownload: (node: FileManagerNode) => void;
}) {
  const isFolder = node.tipo === 0;
  const kids = isFolder ? childrenOf(nodes, node.par_codigo) : [];
  const isOpen = expanded.has(node.par_codigo);
  const restricted = node.ace_codigo != null;

  return (
    <div>
      <div
        className={cn(
          "flex items-start gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted/60",
          activeId === node.par_codigo && "bg-primary/10",
        )}
        style={{ paddingLeft: 8 + depth * 16 }}
      >
        {isFolder ? (
          <button
            type="button"
            className="mt-0.5 text-muted-foreground"
            onClick={() => onToggleExpand(node.par_codigo)}
            aria-label={isOpen ? "Recolher" : "Expandir"}
          >
            {isOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
        ) : (
          <span className="mt-0.5 w-4" />
        )}
        <Checkbox
          checked={selected.has(node.par_codigo)}
          onCheckedChange={() => onToggleSelect(node.par_codigo)}
          disabled={disabled || node.pasta_fixa}
          className="mt-0.5"
        />
        <button
          type="button"
          className="flex min-w-0 flex-1 items-start gap-2 text-left"
          onClick={() => {
            onActivate(node);
            if (node.tipo === 1) {
              onDownload(node);
            }
          }}
        >
          <FileTypeIcon node={node} />
          <span className="min-w-0">
            <span className={cn("font-medium", restricted && "text-accent")}>{node.nome}</span>
            {node.descricao ? (
              <span className="text-muted-foreground italic">
                {" "}
                - &quot;{node.descricao}&quot;
              </span>
            ) : null}
            {node.tipo === 1 ? (
              <span className="ml-2 text-xs text-muted-foreground">
                {formatNodeDate(node.data)} {formatKb(node.tamanho)}
              </span>
            ) : null}
          </span>
        </button>
      </div>
      {isFolder && isOpen
        ? kids.map((child) => (
            <NodeRow
              key={child.par_codigo}
              node={child}
              depth={depth + 1}
              nodes={nodes}
              selected={selected}
              activeId={activeId}
              expanded={expanded}
              disabled={disabled}
              onToggleExpand={onToggleExpand}
              onToggleSelect={onToggleSelect}
              onActivate={onActivate}
              onDownload={onDownload}
            />
          ))
        : null}
    </div>
  );
}

export function FileManagerTree({
  rootLabel,
  nodes,
  selected,
  activeId,
  expanded,
  disabled = false,
  onToggleExpand,
  onToggleSelect,
  onActivate,
  onDownload,
}: FileManagerTreeProps) {
  const roots = childrenOf(nodes, null);
  const trash = trashItems(nodes);

  return (
    <div className="space-y-1 py-2">
      <div className="flex items-center gap-2 px-2 py-1 text-sm font-semibold">
        <FolderTree className="size-4 text-accent" />
        {rootLabel}
      </div>
      {roots.map((node) => (
        <NodeRow
          key={node.par_codigo}
          node={node}
          depth={1}
          nodes={nodes}
          selected={selected}
          activeId={activeId}
          expanded={expanded}
          disabled={disabled}
          onToggleExpand={onToggleExpand}
          onToggleSelect={onToggleSelect}
          onActivate={onActivate}
          onDownload={onDownload}
        />
      ))}
      <div className="mt-3 flex items-center gap-2 px-2 py-1 text-sm font-semibold text-muted-foreground">
        <Trash2 className="size-4" />
        Lixeira
      </div>
      {trash.map((node) => (
        <NodeRow
          key={`trash-${node.par_codigo}`}
          node={node}
          depth={1}
          nodes={nodes}
          selected={selected}
          activeId={activeId}
          expanded={expanded}
          disabled={disabled}
          onToggleExpand={onToggleExpand}
          onToggleSelect={onToggleSelect}
          onActivate={onActivate}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
