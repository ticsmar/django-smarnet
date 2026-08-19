export interface AdminGroup {
  name: string;
}

export interface AdminProductPermission {
  value: string;
  app_label: string;
  model: string;
  codename: string;
  name: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
  groups: string[];
  product_permissions: string[];
  usu_chapa?: number | null;
  emp_codigo?: number | null;
  pes_numero?: number | null;
  pais_nome?: string;
  emp_nome?: string;
  emp_endereco?: string;
  emp_bairro?: string;
  emp_cidade?: string;
  emp_estado?: string;
  emp_cep?: string;
  emp_pais_nome?: string;
  emp_homepage?: string;
  last_login: string | null;
  date_joined: string;
}

export interface PaginatedUsers {
  items: AdminUser[];
  total: number;
  page: number;
  page_size: number;
}

export interface ListUsersParams {
  search?: string;
  page?: number;
  page_size?: number;
}

export interface CreateAdminUserInput {
  username: string;
  password: string;
  email?: string;
  groups?: string[];
  require_password_change?: boolean;
}

export interface UpdateAdminUserInput {
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  emp_codigo?: number | null;
  pes_numero?: number | null;
}

export interface ResetPasswordResult {
  temporary_password: string;
}
