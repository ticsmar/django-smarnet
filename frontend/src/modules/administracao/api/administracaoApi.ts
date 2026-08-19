import { apiRequest, ApiError } from "@/api/client";
import type {
  ConsultaCnpjResult,
  ConsultaFuncionarioResult,
  CreateFromFuncionarioResult,
  ClienteDetail,
  ClienteListItem,
  Estado,
  GravaClienteInput,
  GravaClienteResult,
  ListClientesParams,
  LookupDocumentoResult,
  Origem,
  Paginated,
  Pais,
} from "../types/cliente";

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

export async function listClientes(
  params: ListClientesParams = {},
): Promise<Paginated<ClienteListItem>> {
  return apiRequest<Paginated<ClienteListItem>>(
    `/administracao/clientes/${buildQuery({
      search: params.search,
      page: params.page,
      page_size: params.page_size,
    })}`,
  );
}

export async function getCliente(codigo: number): Promise<ClienteDetail> {
  return apiRequest<ClienteDetail>(`/administracao/clientes/${codigo}/`);
}

export async function gravaCliente(
  input: GravaClienteInput,
): Promise<GravaClienteResult> {
  return apiRequest<GravaClienteResult>("/administracao/clientes/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function atualizaCliente(
  codigo: number,
  input: GravaClienteInput,
): Promise<GravaClienteResult> {
  return apiRequest<GravaClienteResult>(`/administracao/clientes/${codigo}/`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function lookupClienteDocumento(
  documento: string,
): Promise<LookupDocumentoResult> {
  return apiRequest<LookupDocumentoResult>(
    `/administracao/clientes/documento/${buildQuery({ documento })}`,
  );
}

export async function consultaCnpj(cnpj: string): Promise<ConsultaCnpjResult> {
  return apiRequest<ConsultaCnpjResult>("/administracao/clientes/cnpj/", {
    method: "POST",
    body: JSON.stringify({ cnpj }),
  });
}

export async function consultaFuncionario(
  cpf: string,
): Promise<ConsultaFuncionarioResult> {
  return apiRequest<ConsultaFuncionarioResult>(
    "/administracao/clientes/funcionario/",
    {
      method: "POST",
      body: JSON.stringify({ cpf }),
    },
  );
}

export async function createClienteFromFuncionario(
  cpf: string,
): Promise<CreateFromFuncionarioResult> {
  return apiRequest<CreateFromFuncionarioResult>(
    "/administracao/clientes/from-funcionario/",
    {
      method: "POST",
      body: JSON.stringify({ cpf }),
    },
  );
}

export async function listClientePaises(): Promise<Pais[]> {
  return apiRequest<Pais[]>("/administracao/catalogos/paises/");
}

export async function listClienteEstados(
  paiCodigo: number,
): Promise<Estado[]> {
  return apiRequest<Estado[]>(
    `/administracao/catalogos/estados/${buildQuery({ pai_codigo: paiCodigo })}`,
  );
}

export async function listClienteOrigens(): Promise<Origem[]> {
  return apiRequest<Origem[]>("/administracao/catalogos/origens/");
}
