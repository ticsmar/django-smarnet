export type FollowUpAlarmNivel = "none" | "future" | "overdue";
export type FollowUpStatusNivel = "none" | "ok" | "warning";

export interface FollowUpItem {
  pre_codigo: number;
  tre_codigo: number | null;
  tre_descricao: string;
  tre_tipo_canc: boolean;
  usu_chapa: number;
  usu_nome: string | null;
  mensagem: string;
  pre_data: string | null;
  pre_dt_alarm: string | null;
  pre_dt_baixa: string | null;
  mot_codigo: number | null;
  mot_descricao: string | null;
  can_edit: boolean;
  alarm_nivel: FollowUpAlarmNivel;
}

export interface FollowUpList {
  sistema: number;
  filtro: string;
  items: FollowUpItem[];
}

export interface FollowUpTipo {
  tre_codigo: number;
  tre_descricao: string;
  tre_tipo_canc: boolean;
}

export interface FollowUpMotivo {
  mot_codigo: number;
  mot_descricao: string;
}

export interface FollowUpStatus {
  nivel: FollowUpStatusNivel;
  proximo_alarme: string | null;
  tre_descricao: string | null;
  has_legacy_notes: boolean;
}

export interface FollowUpClienteNotes {
  codigo: number;
  descricao: string;
  has_notes: boolean;
}

export interface FollowUpSistema {
  codigo: number;
  nome: string;
  descricao: string;
  ativo: boolean;
}

export interface FollowUpSistemaInput {
  codigo?: number | null;
  nome: string;
  descricao?: string;
  ativo?: boolean;
}

export interface GravaFollowUpInput {
  sistema: number;
  filtro: string;
  tre_codigo: number;
  mensagem: string;
  mot_codigo?: number | null;
  alarm_data?: string;
  alarm_hora?: string;
  pre_codigo?: number | null;
}
