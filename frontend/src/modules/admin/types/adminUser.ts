export interface AdminGroup {
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
}

export interface ResetPasswordResult {
  temporary_password: string;
}
