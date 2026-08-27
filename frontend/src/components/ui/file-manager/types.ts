export type FileManagerNodeTipo = 0 | 1;

export interface FileManagerNode {
  par_codigo: number;
  par_codigo_pai: number | null;
  tipo: FileManagerNodeTipo;
  nome: string;
  descricao: string | null;
  tamanho: number | null;
  data: string | null;
  ace_codigo: number | null;
  pasta_fixa: boolean;
  in_lixeira: boolean;
}

export interface FileManagerHistoricoItem {
  usuario_nome: string | null;
  acao: string;
  nome: string;
  data: string | null;
}
