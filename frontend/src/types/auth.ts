export interface User {
  username: string;
  is_branch_manager: boolean;
  is_superuser?: boolean;
  can_manage_access?: boolean;
  must_change_password?: boolean;
  groups?: string[];
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
