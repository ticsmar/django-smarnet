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
  mensagem_bloqueio?: string | null;
  dt_atual: string | null;
  dt_cad: string | null;
  can_edit: boolean;
  show_financeiro?: boolean;
  cli_grupo_trib?: string | null;
  aos_codigo_com?: number | null;
  aos_codigo_tec?: number | null;
  classe?: string | null;
  territorio?: string | null;
  vendedor?: string | null;
  cli_email_nfse?: string | null;
  limitecr?: number | null;
  cli_limite_crv?: number | null;
  ccontabil?: string | null;
  cli_fome_zero?: number | null;
  cli_montador?: number | null;
  flagmulta?: number | null;
  flagsuspen?: number | null;
  flagcobra?: number | null;
  vencprog?: number | null;
  zona_franca?: number | null;
  iss?: number | null;
  exportacao?: number | null;
  taxamulta?: number | null;
  desc_max?: number | null;
  obsvenc?: string | null;
  cli_reccof?: string | null;
  cli_reccsll?: string | null;
  cli_recpis?: string | null;
  mpg_codigo?: number | null;
  cli_mod_pagt?: string | null;
  cobranca?: string | null;
  entrega?: string | null;
  con_codigo_com?: number | null;
  con_codigo_tec?: number | null;
  con_codigo_fin?: number | null;
  crs_cod_protheus?: string | null;
  crs_cod_letra?: string | null;
  crs_desc?: string | null;
  crs_desc_longa?: string | null;
  crs_restricao?: number | null;
};

export type Pais = {
  pai_codigo: number;
  pai_nome: string | null;
};

export type Estado = {
  est_codigo: number;
  pai_codigo: number;
  est_nome: string | null;
  est_sigla?: string | null;
};

export type Cidade = {
  codigo: string;
  descricao: string | null;
  uf: string | null;
};

export type GrupoTributario = {
  codigo: string;
  descricao: string | null;
  uf: string | null;
  is_default: boolean;
};

export type AreaOs = {
  aos_codigo: number;
  aos_nome: string | null;
  usu_chapa: number | null;
  usu_nome: string | null;
  qtd: number;
  is_default: boolean;
};

export type ModeloPagt = {
  mpg_codigo: number;
  descricao: string | null;
  mpg_area: string | null;
  mpg_status: number | null;
};

export type ClienteContato = {
  con_codigo: number;
  codcliente: number;
  nome: string | null;
  depto: string | null;
  cargo: string | null;
  telefone: string | null;
  fax: string | null;
  celular: string | null;
  email: string | null;
  con_ativo: number | null;
  is_comercial: boolean;
  is_tecnico: boolean;
  is_financeiro: boolean;
};

export type ClienteCobranca = {
  codigo: number;
  chavecobra: string;
  nome: string | null;
  endereco1: string | null;
  endereco2: string | null;
  endereco3: string | null;
  cob_bairro: string | null;
  cidade: string | null;
  estado: string | null;
  est_nome?: string | null;
  cep: string | null;
  pais: string | null;
  pais_nome?: string | null;
  contato: string | null;
  telefone1: string | null;
  telefone2: string | null;
  e_mail: string | null;
  ativo: number | null;
  cli_codigo_ref: number | null;
  is_padrao: boolean;
};

export type ClienteEmbarque = {
  codigo: number;
  chave_emb: string;
  nome: string | null;
  endereco1: string | null;
  endereco2: string | null;
  endereco3: string | null;
  emb_bairro: string | null;
  cidade: string | null;
  estado: string | null;
  est_nome?: string | null;
  cep: string | null;
  pais: string | null;
  pais_nome?: string | null;
  contato: string | null;
  telefone1: string | null;
  telefone2: string | null;
  e_mail: string | null;
  ativo: number | null;
  cli_codigo_ref: number | null;
  is_padrao: boolean;
};

export type ClienteLog = {
  codigo: number;
  lcl_data: string | null;
  data_txt: string | null;
  usu_chapa: number | null;
  usu_nome: string | null;
  lcl_texto: string | null;
};

export type Origem = {
  origem: string;
  descricao: string | null;
};

export type Arclass = {
  class_key: string;
  descr: string | null;
};

export type Arlevel = {
  terr_key: string;
  description: string | null;
};

export type Arsalesp = {
  salesp_key: string;
  nome: string | null;
  emp_nome: string | null;
};

export type ClienteRisco = {
  codigo: number; // CRS_COD_SIAOS (= CLIENTE.BLOQUEADO)
  letra: string | null;
  desc: string | null;
  desc_longa: string | null;
  restricao: number | null;
};

export type GravaBloqueioInput = {
  bloqueado: number;
  mensagem_bloqueio?: string | null;
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
  cli_tipo?: string | null;
  aos_codigo_com?: number | null;
  aos_codigo_tec?: number | null;
  classe?: string | null;
  mpg_codigo?: number | null;
  cli_mod_pagt?: string | null;
  cli_email_nfse?: string | null;
  territorio?: string | null;
  vendedor?: string | null;
};

export type GravaClienteFinanInput = {
  flagsuspen?: number;
  flagcobra?: number;
  flagmulta?: number;
  vencprog?: number;
  zona_franca?: number;
  iss?: number;
  exportacao?: number;
  limitecr?: number | null;
  taxamulta?: number | null;
  desc_max?: number | null;
  ccontabil?: string | null;
  obsvenc?: string | null;
  cli_limite_crv?: number | null;
  cli_fome_zero?: number | null;
  cli_montador?: number | null;
  cli_reccof?: string | null;
  cli_reccsll?: string | null;
  cli_recpis?: string | null;
  mpg_codigo?: number | null;
  cli_mod_pagt?: string | null;
  cli_inscr_suframa?: string | null;
  cli_cnae?: string | null;
  cli_nif?: string | null;
  cli_pes_tipo?: string | null;
  cli_grupo_trib?: string | null;
};

export type GravaContatoInput = {
  con_codigo?: number | null;
  nome: string;
  nome_old?: string | null;
  depto?: string | null;
  cargo?: string | null;
  telefone?: string | null;
  fax?: string | null;
  celular?: string | null;
  email?: string | null;
  con_ativo?: number;
};

export type GravaEnderecoRefInput = {
  chave?: string | null;
  ativo?: number;
  cli_codigo_ref: number;
  tipo_cadastro?: "I" | "A" | "E";
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
