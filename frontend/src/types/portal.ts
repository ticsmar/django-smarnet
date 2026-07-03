export type MenuTipo = 'grupo' | 'noticia' | 'url' | 'vazio';

export interface Menu {
  id: string;
  label: string;
  slug: string;
  icone?: string;
  ordem: number;
  menuPaiId?: string | null;
  ativo: boolean;
  tipo: MenuTipo;
  grupoNoticiaId?: string;
  noticiaId?: string;
  urlExterna?: string;
}

export type NoticiaStatus =
  | 'rascunho'
  | 'agendada'
  | 'publicada'
  | 'expirada'
  | 'arquivada';

export interface Noticia {
  id: string;
  slug: string;
  manchete: string;
  resumo: string;
  corpo: string;
  imagem: string;
  imagemAlt: string;
  categoria: string;
  destaque: boolean;
  autorNome: string;
  autorCargo: string;
  status: NoticiaStatus;
  dataPublicacao: string;
  dataExpiracao: string | null;
  naoExpira: boolean;
  publicadoEm: string | null;
  criadoEm: string;
  atualizadoEm: string;
  grupoId?: string;
  menuId?: string;
  videoUrl?: string;
}

export interface GrupoNoticias {
  id: string;
  nome: string;
  descricao?: string;
  menuId?: string;
  ativo: boolean;
}

export const CATEGORIAS_NOTICIA = [
  'Institucional',
  'Comunicados',
  'Obras',
  'Sustentabilidade',
  'RH',
  'Segurança',
  'Eventos',
] as const;
