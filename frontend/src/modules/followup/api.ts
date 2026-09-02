import { apiRequest, ApiError } from "@/api/client";
import type {
  FollowUpClienteNotes,
  FollowUpList,
  FollowUpMotivo,
  FollowUpSistema,
  FollowUpSistemaInput,
  FollowUpStatus,
  FollowUpTipo,
  GravaFollowUpInput,
} from "./types";

export { ApiError };

const BASE = "/followup";

function scopeQuery(
  sistema: number,
  filtro: string,
  tre?: number | null,
): string {
  const search = new URLSearchParams({
    sistema: String(sistema),
    filtro,
  });
  if (tre) search.set("tre", String(tre));
  return search.toString();
}

export function listFollowUpSistemas(): Promise<FollowUpSistema[]> {
  return apiRequest<FollowUpSistema[]>(`${BASE}/sistemas/`);
}

export function createFollowUpSistema(
  input: FollowUpSistemaInput,
): Promise<FollowUpSistema> {
  return apiRequest<FollowUpSistema>(`${BASE}/sistemas/`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateFollowUpSistema(
  codigo: number,
  input: FollowUpSistemaInput,
): Promise<FollowUpSistema> {
  return apiRequest<FollowUpSistema>(`${BASE}/sistemas/${codigo}/`, {
    method: "PUT",
    body: JSON.stringify({
      nome: input.nome,
      descricao: input.descricao ?? "",
      ativo: input.ativo ?? true,
    }),
  });
}

export function listFollowUpItems(
  sistema: number,
  filtro: string,
  tre?: number | null,
): Promise<FollowUpList> {
  return apiRequest<FollowUpList>(
    `${BASE}/items/?${scopeQuery(sistema, filtro, tre)}`,
  );
}

export function gravaFollowUp(input: GravaFollowUpInput): Promise<void> {
  return apiRequest<void>(`${BASE}/items/`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function baixaFollowUp(
  preCodigo: number,
  sistema: number,
  filtro: string,
): Promise<void> {
  return apiRequest<void>(
    `${BASE}/items/${preCodigo}/baixa/?${scopeQuery(sistema, filtro)}`,
    { method: "POST" },
  );
}

export function listFollowUpTipos(sistema: number): Promise<FollowUpTipo[]> {
  return apiRequest<FollowUpTipo[]>(`${BASE}/tipos/?sistema=${sistema}`);
}

export function listFollowUpMotivos(): Promise<FollowUpMotivo[]> {
  return apiRequest<FollowUpMotivo[]>(`${BASE}/motivos/`);
}

export function getFollowUpStatus(
  sistema: number,
  filtro: string,
): Promise<FollowUpStatus> {
  return apiRequest<FollowUpStatus>(`${BASE}/status/?${scopeQuery(sistema, filtro)}`);
}

export function getClienteNotes(codigo: number): Promise<FollowUpClienteNotes> {
  return apiRequest<FollowUpClienteNotes>(`${BASE}/cliente-notes/?codigo=${codigo}`);
}

export function appendClienteNotes(codigo: number, texto: string): Promise<void> {
  return apiRequest<void>(`${BASE}/cliente-notes/`, {
    method: "POST",
    body: JSON.stringify({ codigo, texto }),
  });
}
