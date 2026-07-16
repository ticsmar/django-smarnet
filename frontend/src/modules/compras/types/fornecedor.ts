export type Fornecedor = {
  for_codigo: number;
  emp_codigo: number | null;
  for_razao_soc: string | null;
  for_nome_reduz: string | null;
  for_endereco: string | null;
  for_bairro: string | null;
  for_munic: string | null;
  for_cep: string | null;
  for_estado: string | null;
  pai_codigo: number | null;
  pai_nome: string | null;
  for_dt_cad: string | null;
  for_dt_atual: string | null;
  for_ativo: number | null;
};

export type Pais = {
  pai_codigo: number;
  pai_nome: string | null;
  eti_codigo: number | null;
};

export type FornecContato = {
  fco_codigo: number;
  for_codigo: number | null;
  fco_nome: string | null;
  fco_cargo: string | null;
  fco_email: string | null;
  fco_telefone: string | null;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
};

export type ListFornecedoresParams = {
  search?: string;
  ativo?: number | null;
  page?: number;
  page_size?: number;
};

export type ListFornecContatosParams = {
  for_codigo?: number | null;
  search?: string;
  page?: number;
  page_size?: number;
};

export type GravaFornecedorInput = {
  cod_fornec?: number | null;
  razao_soc: string;
  nome_reduz: string;
  endereco: string;
  bairro: string;
  munic: string;
  cep: string;
  estado: string;
  cod_pais: number;
  idioma_msg?: "P" | "I";
};

export type GravaFornecedorResult = {
  cod_fornec: number;
  tipo_msg: string | null;
  msg: string | null;
  acao: string | null;
};

export type GravaFornecContatoInput = {
  cod_contato?: number | null;
  cod_fornec: number;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  idioma_msg?: "P" | "I";
};

export type GravaFornecContatoResult = {
  cod_contato: number;
  tipo_msg: string | null;
  msg: string | null;
  acao: string | null;
};

export type OkResult = {
  ok: boolean;
};
