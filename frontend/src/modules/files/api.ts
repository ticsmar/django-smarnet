import { apiRequest, ApiError, API_BASE_URL } from "@/api/client";
import type {
  ArquivoHistoricoItem,
  ArquivoTree,
  FileManagerSistema,
  FileManagerSistemaInput,
} from "./types";

export { ApiError };

const BASE = "/arquivos";

function scopeQuery(sistema: number, filtro: string): string {
  const search = new URLSearchParams({
    sistema: String(sistema),
    filtro,
  });
  return search.toString();
}

export function listArquivoSistemas(): Promise<FileManagerSistema[]> {
  return apiRequest<FileManagerSistema[]>(`${BASE}/sistemas/`);
}

export function createArquivoSistema(
  input: FileManagerSistemaInput,
): Promise<FileManagerSistema> {
  return apiRequest<FileManagerSistema>(`${BASE}/sistemas/`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateArquivoSistema(
  codigo: number,
  input: FileManagerSistemaInput,
): Promise<FileManagerSistema> {
  return apiRequest<FileManagerSistema>(`${BASE}/sistemas/${codigo}/`, {
    method: "PUT",
    body: JSON.stringify({
      nome: input.nome,
      descricao: input.descricao ?? "",
      ativo: input.ativo ?? true,
    }),
  });
}

export function getArquivoTree(
  sistema: number,
  filtro: string,
): Promise<ArquivoTree> {
  return apiRequest<ArquivoTree>(`${BASE}/tree/?${scopeQuery(sistema, filtro)}`);
}

export function createArquivoFolder(input: {
  sistema: number;
  filtro: string;
  nome: string;
  descricao?: string;
  par_codigo_pai?: number | null;
}): Promise<{ par_codigo: number }> {
  return apiRequest<{ par_codigo: number }>(`${BASE}/folders/`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function uploadArquivoFile(input: {
  sistema: number;
  filtro: string;
  file: File;
  descricao?: string;
  par_codigo_pai?: number | null;
}): Promise<{ par_codigo: number }> {
  const form = new FormData();
  form.append("sistema", String(input.sistema));
  form.append("filtro", input.filtro);
  form.append("arquivo", input.file);
  if (input.descricao) {
    form.append("descricao", input.descricao);
  }
  if (input.par_codigo_pai != null) {
    form.append("par_codigo_pai", String(input.par_codigo_pai));
  }
  return apiRequest<{ par_codigo: number }>(`${BASE}/files/`, {
    method: "POST",
    body: form,
  });
}

export function moveArquivoNode(input: {
  par_codigo: number;
  sistema: number;
  filtro: string;
  par_codigo_pai?: number | null;
  nome?: string;
}): Promise<void> {
  return apiRequest<void>(`${BASE}/nodes/${input.par_codigo}/move/`, {
    method: "POST",
    body: JSON.stringify({
      sistema: input.sistema,
      filtro: input.filtro,
      par_codigo_pai: input.par_codigo_pai ?? null,
      nome: input.nome ?? null,
    }),
  });
}

export function trashArquivoNodes(input: {
  sistema: number;
  filtro: string;
  par_codigos: number[];
}): Promise<void> {
  return apiRequest<void>(`${BASE}/nodes/trash/`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function listArquivoHistorico(
  sistema: number,
  filtro: string,
): Promise<ArquivoHistoricoItem[]> {
  return apiRequest<ArquivoHistoricoItem[]>(
    `${BASE}/historico/?${scopeQuery(sistema, filtro)}`,
  );
}

function filenameFromDisposition(header: string | null, fallback: string): string {
  if (!header) {
    return fallback;
  }
  const utf = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (utf?.[1]) {
    return decodeURIComponent(utf[1]);
  }
  const simple = /filename="?([^";]+)"?/i.exec(header);
  return simple?.[1] ?? fallback;
}

export async function downloadArquivoNode(input: {
  par_codigo: number;
  sistema: number;
  filtro: string;
  nome: string;
}): Promise<void> {
  const path = `${BASE}/nodes/${input.par_codigo}/download/?${scopeQuery(input.sistema, input.filtro)}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { credentials: "include" });
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, null);
  }
  const blob = await response.blob();
  const filename = filenameFromDisposition(
    response.headers.get("Content-Disposition"),
    input.nome,
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
