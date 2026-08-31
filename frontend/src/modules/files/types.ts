export type ArquivoNodeTipo = 0 | 1;

export interface ArquivoNode {
  par_codigo: number;
  par_codigo_pai: number | null;
  tipo: ArquivoNodeTipo;
  nome: string;
  descricao: string | null;
  tamanho: number | null;
  data: string | null;
  ace_codigo: number | null;
  pasta_fixa: boolean;
  in_lixeira: boolean;
}

export interface ArquivoTree {
  sistema: number;
  filtro: string;
  root_label: string;
  nodes: ArquivoNode[];
}

export interface ArquivoHistoricoItem {
  usuario_nome: string | null;
  acao: string;
  nome: string;
  data: string | null;
}

export interface FileManagerSistema {
  codigo: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}

export interface FileManagerSistemaInput {
  codigo?: number | null;
  nome: string;
  descricao?: string;
  ativo?: boolean;
}
