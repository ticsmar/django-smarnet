import type { FileManagerNode } from "./types";

export function folderOptions(nodes: FileManagerNode[]): FileManagerNode[] {
  return nodes.filter((node) => node.tipo === 0 && !node.in_lixeira);
}

export function childrenOf(
  nodes: FileManagerNode[],
  parentId: number | null,
): FileManagerNode[] {
  return nodes.filter(
    (node) =>
      !node.in_lixeira &&
      (parentId === null
        ? node.par_codigo_pai == null
        : node.par_codigo_pai === parentId),
  );
}

export function trashItems(nodes: FileManagerNode[]): FileManagerNode[] {
  return nodes.filter((node) => node.in_lixeira);
}

export function formatKb(tamanho: number | null): string {
  if (tamanho == null || Number.isNaN(tamanho)) {
    return "";
  }
  const kb = Math.max(1, Math.round(tamanho / 1024));
  return `${kb} Kb`;
}

export function formatNodeDate(value: string | null): string {
  if (!value) {
    return "";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString();
}

const ACAO_LABELS: Record<string, string> = {
  INSERT: "Inseriu",
  MOVE: "Moveu",
  UPDATE: "Alterou",
  DELETE: "Excluiu",
  RESTORE: "Restaurou",
};

export function historicoAcaoLabel(acao: string): string {
  return ACAO_LABELS[acao] ?? acao;
}

/** 3.01 `desabilita` (0/1). 1 ou true bloqueia incluir, alterar e excluir. */
export type FileManagerDisabled = boolean | 0 | 1;

export function isFileManagerDisabled(value: FileManagerDisabled | undefined): boolean {
  return value === true || value === 1;
}
