import { apiRequest, ApiError } from "@/api/client";
import type {
  AreaOs,
  Arclass,
  Arlevel,
  Arsalesp,
  Cidade,
  ClienteCobranca,
  ClienteContato,
  ClienteDetail,
  ClienteEmbarque,
  ClienteRisco,
  ClienteListItem,
  ClienteLog,
  ConsultaCnpjResult,
  ConsultaFuncionarioResult,
  CreateFromFuncionarioResult,
  Estado,
  GravaBloqueioInput,
  GravaClienteFinanInput,
  GravaClienteInput,
  GravaClienteResult,
  GravaContatoInput,
  GravaEnderecoRefInput,
  GrupoTributario,
  ListClientesParams,
  LookupDocumentoResult,
  ModeloPagt,
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

export async function listClienteArclasses(): Promise<Arclass[]> {
  return apiRequest<Arclass[]>("/administracao/catalogos/arclasses/");
}

export async function listClienteRiscos(): Promise<ClienteRisco[]> {
  return apiRequest<ClienteRisco[]>("/administracao/catalogos/riscos-cliente/");
}

export async function listClienteArlevels(): Promise<Arlevel[]> {
  return apiRequest<Arlevel[]>("/administracao/catalogos/arlevels/");
}

export async function listClienteArsalesps(): Promise<Arsalesp[]> {
  return apiRequest<Arsalesp[]>("/administracao/catalogos/arsalesps/");
}

export async function listClienteCidades(params: {
  pai_codigo?: number | null;
  est_codigo?: number | null;
}): Promise<Cidade[]> {
  return apiRequest<Cidade[]>(
    `/administracao/catalogos/cidades/${buildQuery({
      pai_codigo: params.pai_codigo,
      est_codigo: params.est_codigo,
    })}`,
  );
}

export async function listClienteGruposTributarios(params: {
  est_codigo?: number | null;
  cli_tipo?: string | null;
}): Promise<GrupoTributario[]> {
  return apiRequest<GrupoTributario[]>(
    `/administracao/catalogos/grupos-tributarios/${buildQuery({
      est_codigo: params.est_codigo,
      cli_tipo: params.cli_tipo,
    })}`,
  );
}

export async function listClienteAreasOs(params: {
  tipo?: string;
  mun_ibge?: string | null;
  est_codigo?: number | null;
  pai_codigo?: number | null;
  current?: number | null;
}): Promise<AreaOs[]> {
  return apiRequest<AreaOs[]>(
    `/administracao/catalogos/areas-os/${buildQuery({
      tipo: params.tipo,
      mun_ibge: params.mun_ibge,
      est_codigo: params.est_codigo,
      pai_codigo: params.pai_codigo,
      current: params.current,
    })}`,
  );
}

export async function listClienteModelosPagto(params: {
  origem?: string | null;
  mpg_codigo?: number | null;
  risco_protheus?: string | null;
}): Promise<ModeloPagt[]> {
  return apiRequest<ModeloPagt[]>(
    `/administracao/catalogos/modelos-pagto/${buildQuery({
      origem: params.origem,
      mpg_codigo: params.mpg_codigo,
      risco_protheus: params.risco_protheus,
    })}`,
  );
}

export async function atualizaClienteFinanceiro(
  codigo: number,
  input: GravaClienteFinanInput,
): Promise<void> {
  await apiRequest<void>(`/administracao/clientes/${codigo}/financeiro/`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function gravaClienteBloqueio(
  codigo: number,
  input: GravaBloqueioInput,
): Promise<void> {
  await apiRequest<void>(`/administracao/clientes/${codigo}/bloqueio/`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function listClienteContatos(
  codigo: number,
  search = "",
): Promise<ClienteContato[]> {
  return apiRequest<ClienteContato[]>(
    `/administracao/clientes/${codigo}/contatos/${buildQuery({ search })}`,
  );
}

export async function gravaClienteContato(
  codigo: number,
  input: GravaContatoInput,
): Promise<{ con_codigo: number | null }> {
  return apiRequest<{ con_codigo: number | null }>(
    `/administracao/clientes/${codigo}/contatos/`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function setClienteContatoPadrao(
  codigo: number,
  input: {
    con_codigo_com?: number | null;
    con_codigo_tec?: number | null;
    con_codigo_fin?: number | null;
  },
): Promise<void> {
  await apiRequest<void>(`/administracao/clientes/${codigo}/contatos/padrao/`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function listClienteCobrancas(
  codigo: number,
): Promise<ClienteCobranca[]> {
  return apiRequest<ClienteCobranca[]>(
    `/administracao/clientes/${codigo}/cobrancas/`,
  );
}

export async function gravaClienteCobranca(
  codigo: number,
  input: GravaEnderecoRefInput,
): Promise<void> {
  await apiRequest<void>(`/administracao/clientes/${codigo}/cobrancas/`, {
    method: "POST",
    body: JSON.stringify({
      chavecobra: input.chave,
      ativo: input.ativo,
      cli_codigo_ref: input.cli_codigo_ref,
      tipo_cadastro: input.tipo_cadastro,
    }),
  });
}

export async function setClienteCobrancaPadrao(
  codigo: number,
  chave: string,
): Promise<void> {
  await apiRequest<void>(
    `/administracao/clientes/${codigo}/cobrancas/padrao/`,
    {
      method: "PUT",
      body: JSON.stringify({ chave }),
    },
  );
}

export async function listClienteEmbarques(
  codigo: number,
): Promise<ClienteEmbarque[]> {
  return apiRequest<ClienteEmbarque[]>(
    `/administracao/clientes/${codigo}/embarques/`,
  );
}

export async function gravaClienteEmbarque(
  codigo: number,
  input: GravaEnderecoRefInput,
): Promise<void> {
  await apiRequest<void>(`/administracao/clientes/${codigo}/embarques/`, {
    method: "POST",
    body: JSON.stringify({
      chave_emb: input.chave,
      ativo: input.ativo,
      cli_codigo_ref: input.cli_codigo_ref,
      tipo_cadastro: input.tipo_cadastro,
    }),
  });
}

export async function setClienteEmbarquePadrao(
  codigo: number,
  chave: string,
): Promise<void> {
  await apiRequest<void>(
    `/administracao/clientes/${codigo}/embarques/padrao/`,
    {
      method: "PUT",
      body: JSON.stringify({ chave }),
    },
  );
}

export async function listClienteLogs(codigo: number): Promise<ClienteLog[]> {
  return apiRequest<ClienteLog[]>(`/administracao/clientes/${codigo}/logs/`);
}

export async function atualizaClienteObs(
  codigo: number,
  observa: string | null,
): Promise<void> {
  await apiRequest<void>(`/administracao/clientes/${codigo}/observa/`, {
    method: "PUT",
    body: JSON.stringify({ observa }),
  });
}
