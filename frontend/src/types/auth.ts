export interface User {
  username: string;
  is_branch_manager: boolean;
  is_superuser?: boolean;
  can_manage_access?: boolean;
  must_change_password?: boolean;
  groups?: string[];
  permissions?: string[];
}

export interface UserProfile {
  username: string;
  is_superuser: boolean;
  can_manage_access: boolean;
  is_branch_manager: boolean;
  groups: string[];
  usu_chapa: number | null;
  display_name: string;
  email: string;
  usu_login: string;
  usu_loginweb: string;
  usu_sigla: string;
  usu_status: number | null;
  usu_status_label: string;
  cc_codigo: string;
  cc_nome: string;
  origem: string;
  pes_numero: number | null;
  emp_codigo: number | null;
  emp_nome: string;
  emp_reduzido: string;
  emp_cidade: string;
  emp_estado: string;
  is_funcionario: boolean;
  fun_chapa: number | null;
  fun_apelido: string;
  fun_cargo: string;
  fun_ativo: string;
  fun_ativo_label: string;
  fun_dt_adm: string | null;
  fun_ramal: number | null;
  fun_unidade: string;
  fun_filial: string;
  fun_endereco: string;
  fun_cidade: string;
  fun_uf: string;
  fun_bairro: string;
  fun_cep: string;
}

export interface ChangePasswordInput {
  new_password: string;
  current_password?: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface ApiDetailError {
  detail: string;
}

export type ApiFieldErrors = Record<string, string[]>;

export type ApiErrorBody = ApiDetailError | ApiFieldErrors;
