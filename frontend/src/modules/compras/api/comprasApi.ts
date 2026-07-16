import { apiRequest, ApiError } from "@/api/client";
import type {
  FornecContato,
  Fornecedor,
  GravaFornecContatoInput,
  GravaFornecContatoResult,
  GravaFornecedorInput,
  GravaFornecedorResult,
  ListFornecContatosParams,
  ListFornecedoresParams,
  OkResult,
  Paginated,
  Pais,
} from "../types/fornecedor";

export { ApiError };

function buildQuery(
  params: Record<string, string | number | null | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function listFornecedores(
  params: ListFornecedoresParams = {},
): Promise<Paginated<Fornecedor>> {
  return apiRequest<Paginated<Fornecedor>>(
    `/compras/fornecedores/${buildQuery({
      search: params.search,
      ativo: params.ativo ?? undefined,
      page: params.page,
      page_size: params.page_size,
    })}`,
  );
}

export async function listPaises(search = ""): Promise<Pais[]> {
  return apiRequest<Pais[]>(
    `/compras/paises/${buildQuery({ search: search || undefined })}`,
  );
}

export async function getFornecedor(codFornec: number): Promise<Fornecedor> {
  return apiRequest<Fornecedor>(`/compras/fornecedores/${codFornec}/`);
}

export async function gravaFornecedor(
  input: GravaFornecedorInput,
): Promise<GravaFornecedorResult> {
  return apiRequest<GravaFornecedorResult>("/compras/fornecedores/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function ativaFornecedor(codFornec: number): Promise<OkResult> {
  return apiRequest<OkResult>(`/compras/fornecedores/${codFornec}/ativar/`, {
    method: "POST",
  });
}

export async function inativaFornecedor(codFornec: number): Promise<OkResult> {
  return apiRequest<OkResult>(`/compras/fornecedores/${codFornec}/inativar/`, {
    method: "POST",
  });
}

export async function listFornecContatos(
  params: ListFornecContatosParams = {},
): Promise<Paginated<FornecContato>> {
  return apiRequest<Paginated<FornecContato>>(
    `/compras/fornecedor-contatos/${buildQuery({
      for_codigo: params.for_codigo ?? undefined,
      search: params.search,
      page: params.page,
      page_size: params.page_size,
    })}`,
  );
}

export async function getFornecContato(
  codContato: number,
): Promise<FornecContato> {
  return apiRequest<FornecContato>(`/compras/fornecedor-contatos/${codContato}/`);
}

export async function gravaFornecContato(
  input: GravaFornecContatoInput,
): Promise<GravaFornecContatoResult> {
  return apiRequest<GravaFornecContatoResult>("/compras/fornecedor-contatos/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function excluiFornecContato(
  codContato: number,
): Promise<OkResult> {
  return apiRequest<OkResult>(`/compras/fornecedor-contatos/${codContato}/`, {
    method: "DELETE",
  });
}
