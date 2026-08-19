export type ClienteTipoCadastro = "J" | "F" | "FUNC" | "I";

export type ClienteListItem = {
  codigo: number;
  cliente: string | null;
  reduzido: string | null;
  cgc: string | null;
  cidade: string | null;
  estado: string | null;
  emp_codigo: number;
  bloqueado: number;
  tipo: string | null;
  can_edit: boolean;
  crs_cod_letra?: string | null;
  crs_desc_longa?: string | null;
  crs_restricao?: number | null;
  crs_cores?: string | null;
  cadastro_checagem?: number | null;
};

export type ClienteDetail = {
  codigo: number;
  origem: string | null;
  cliente: string | null;
  reduzido: string | null;
  tipo: string | null;
  endereco1: string | null;
  endereco2: string | null;
  endereco3: string | null;
  cli_bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  pais: string | null;
  pai_codigo: number | null;
  est_codigo: number | null;
  telefone1: string | null;
  telefone2: string | null;
  fax: string | null;
  email: string | null;
  homepage: string | null;
  cgc: string | null;
  inscr_est: string | null;
  cli_inscr_mun: string | null;
  cli_tipo: string | null;
  cli_pes_tipo: string | null;
  cli_contribuinte: number | null;
  cli_ie_isento: number | null;
  cli_cnae: string | null;
  cli_cod_mun_ibge: string | null;
  cli_inscr_suframa: string | null;
  cli_nif: string | null;
  contato: string | null;
  contatotec: string | null;
  contatofin: string | null;
  observa: string | null;
  emp_codigo: number;
  bloqueado: number;
  dt_atual: string | null;
  dt_cad: string | null;
  can_edit: boolean;
};

export type Pais = {
  pai_codigo: number;
  pai_nome: string | null;
};

export type Estado = {
  est_codigo: number;
  pai_codigo: number;
  est_nome: string | null;
};

export type Origem = {
  origem: string;
  descricao: string | null;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
};

export type ListClientesParams = {
  search?: string;
  page?: number;
  page_size?: number;
};

export type DocumentoMatch = {
  codigo: number;
  cliente: string | null;
  cgc: string | null;
  cidade: string | null;
  estado: string | null;
  emp_codigo: number;
};

export type DocumentoCopyFields = {
  cliente: string | null;
  reduzido: string | null;
  endereco1: string | null;
  endereco2: string | null;
  endereco3: string | null;
  cli_bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  pais: string | null;
  pai_codigo: number | null;
  est_codigo: number | null;
  telefone1: string | null;
  telefone2: string | null;
  fax: string | null;
  email: string | null;
  homepage: string | null;
  cgc: string | null;
  inscr_est: string | null;
  cli_inscr_mun: string | null;
  cli_ie_isento: number | null;
  cli_contribuinte: number | null;
  cli_cnae: string | null;
  cli_cod_mun_ibge: string | null;
  cli_inscr_suframa: string | null;
  cli_nif: string | null;
  cli_pes_tipo: string | null;
  tipo: string | null;
  origem: string | null;
};

export type LookupDocumentoResult = {
  matches: DocumentoMatch[];
  copy_fields: DocumentoCopyFields | null;
};

export type CnpjReceita = {
  nome: string | null;
  fantasia: string | null;
  cnpj: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  uf: string | null;
  est_codigo: number | null;
  municipio: string | null;
  municipio_ibge: string | null;
  cep: string | null;
  situacao: string | null;
  data_situacao: string | null;
  telefone: string | null;
  telefone2: string | null;
  email: string | null;
  natureza_juridica: string | null;
  abertura: string | null;
  ultima_atualizacao: string | null;
  tipo: string | null;
  status: string | null;
  efr: string | null;
  motivo_situacao: string | null;
  situacao_especial: string | null;
  data_situacao_especial: string | null;
  capital_social: string | null;
  atividade_principal: string[];
  atividades_secundarias: string[];
  qsa: string[];
  fonte: string;
};

export type ConsultaCnpjResult = {
  cnpj: string;
  already_registered: boolean;
  can_discard: boolean;
  can_copy: boolean;
  matches: DocumentoMatch[];
  copy_fields: DocumentoCopyFields | null;
  receita: CnpjReceita | null;
  message: string | null;
};

export type FuncionarioRh = {
  nome: string | null;
  chapa: string | null;
  cpf: string | null;
  rg: string | null;
  endereco: string | null;
  municipio: string | null;
  bairro: string | null;
  uf: string | null;
  cep: string | null;
  telefone: string | null;
  email: string | null;
};

export type ConsultaFuncionarioResult = {
  cpf: string;
  already_registered: boolean;
  can_copy: boolean;
  matches: DocumentoMatch[];
  funcionario: FuncionarioRh | null;
  message: string | null;
};

export type GravaClienteInput = {
  tipo_cadastro: ClienteTipoCadastro;
  cliente: string;
  reduzido?: string | null;
  endereco1?: string | null;
  endereco2?: string | null;
  endereco3?: string | null;
  cli_bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
  pais?: string | null;
  pai_codigo?: number | null;
  est_codigo?: number | null;
  telefone1?: string | null;
  telefone2?: string | null;
  fax?: string | null;
  email?: string | null;
  homepage?: string | null;
  cgc?: string | null;
  inscr_est?: string | null;
  cli_inscr_mun?: string | null;
  cli_ie_isento?: number;
  cli_contribuinte?: number;
  cli_cnae?: string | null;
  cli_cod_mun_ibge?: string | null;
  cli_inscr_suframa?: string | null;
  cli_nif?: string | null;
  cli_pes_tipo?: string | null;
  origem?: string | null;
  contato?: string | null;
  contatotec?: string | null;
  contatofin?: string | null;
  observa?: string | null;
  idioma_msg?: "P" | "I";
};

export type GravaClienteResult = {
  codigo: number;
  tipo_msg: string | null;
  msg: string | null;
  acao: string | null;
};

export type CreateFromFuncionarioResult = {
  codigo: number;
};
