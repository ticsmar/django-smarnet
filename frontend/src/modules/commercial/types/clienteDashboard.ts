export type ClienteDashboardScope = "cliente" | "grupo";

export type ClienteDashboardResumo = {
  titulos_a_vencer: string;
  titulos_vencidos: string;
  valores_faturar_prazo: string;
  credito_concedido_prazo: string;
  limite_prazo: string;
  saldo_prazo: string;
  valores_faturar_antecipacao: string;
  valores_faturar_vista: string;
  saldo_antecipacoes: string;
  credito_concedido_vista: string;
  limite_vista: string;
  saldo_vista: string;
  saldo_geral: string;
  media_atraso_dias: number | null;
  media_antecipacao_dias: number | null;
};

export type ClienteDashboardTituloPendente = {
  os: string | null;
  nf: string | null;
  serie: string | null;
  parcela: string | null;
  vencimento: string | null;
  valor: string | null;
  dias: number | null;
};

export type ClienteDashboardOsPendente = {
  os: string | null;
  order_no: number | null;
  valor_faturado: string | null;
  antecipacao: string | null;
  avista: string | null;
  parcela: string | null;
  pg_antecipado: string | null;
  saldo_antecipacao: string | null;
};

export type ClienteDashboardSeriePonto = {
  periodo: string;
  valor: string;
  media: string;
};

export type ClienteDashboardPropostaPonto = {
  periodo: string;
  proposta: string;
  os: string;
};

export type ClienteDashboardCredito = {
  codigo: number;
  nome: string;
  grupo_cabeca: number;
  scope: ClienteDashboardScope;
  limitecr: string | null;
  cli_limite_crv: string | null;
  bloqueado: number;
  risco_letra: string | null;
  risco_descricao: string | null;
  risco_restricao: string | null;
  mensagem_bloqueio: string | null;
  total_os: number;
  os_abertas: number;
  membros_grupo: number;
  resumo: ClienteDashboardResumo;
  titulos_pendentes_disponivel: boolean;
  oss_pendentes_disponivel: boolean;
  series_disponivel: boolean;
  titulos_pendentes: ClienteDashboardTituloPendente[];
  oss_pendentes: ClienteDashboardOsPendente[];
  faturamento_mes: ClienteDashboardSeriePonto[];
  faturamento_ano: ClienteDashboardSeriePonto[];
  proposta_ano: ClienteDashboardPropostaPonto[];
};

export type ClienteDashboardOsItem = {
  order_no: number;
  cust_key: number;
  cliente_nome: string;
  order_date: string | null;
  origem: string | null;
  origem_descricao: string | null;
  order_status: string | null;
  os_encerrada: number | null;
};

export type ClienteDashboardTituloItem = {
  numero: string;
  parcela: string | null;
  valor: string | null;
  saldo: string | null;
  vencimento: string | null;
  emissao: string | null;
  status: string | null;
  cliente_codigo: number;
};

export type PaginatedDashboardOs = {
  items: ClienteDashboardOsItem[];
  total: number;
  page: number;
  page_size: number;
  scope: ClienteDashboardScope;
};

export type PaginatedDashboardTitulos = {
  items: ClienteDashboardTituloItem[];
  total: number;
  page: number;
  page_size: number;
  scope: ClienteDashboardScope;
  titulos_disponivel: boolean;
};

export type ClienteDashboardListParams = {
  scope?: ClienteDashboardScope;
  page?: number;
  page_size?: number;
};

export type GravaClienteDashboardLimitesInput = {
  limitecr: number | null;
  cli_limite_crv: number | null;
};
