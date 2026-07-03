import { apiRequest, ApiError } from "@/api/client";
import type {
  AdminGroup,
  AdminUser,
  CreateAdminUserInput,
  ListUsersParams,
  PaginatedUsers,
  ResetPasswordResult,
  UpdateAdminUserInput,
} from "../types/adminUser";

export { ApiError };

function buildQuery(params: ListUsersParams): string {
  const search = new URLSearchParams();
  if (params.search) {
    search.set("search", params.search);
  }
  if (params.page) {
    search.set("page", String(params.page));
  }
  if (params.page_size) {
    search.set("page_size", String(params.page_size));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function listUsers(params: ListUsersParams = {}): Promise<PaginatedUsers> {
  return apiRequest<PaginatedUsers>(`/admin/users/${buildQuery(params)}`);
}

export async function getUser(id: number): Promise<AdminUser> {
  return apiRequest<AdminUser>(`/admin/users/${id}/`);
}

export async function createUser(input: CreateAdminUserInput): Promise<AdminUser> {
  return apiRequest<AdminUser>("/admin/users/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateUser(
  id: number,
  input: UpdateAdminUserInput,
): Promise<AdminUser> {
  return apiRequest<AdminUser>(`/admin/users/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function setUserGroups(id: number, groups: string[]): Promise<AdminUser> {
  return apiRequest<AdminUser>(`/admin/users/${id}/groups/`, {
    method: "PUT",
    body: JSON.stringify({ groups }),
  });
}

export async function resetUserPassword(
  id: number,
  password?: string,
): Promise<ResetPasswordResult> {
  return apiRequest<ResetPasswordResult>(`/admin/users/${id}/set-password/`, {
    method: "POST",
    body: JSON.stringify(password ? { password } : {}),
  });
}

export async function listGroups(): Promise<AdminGroup[]> {
  return apiRequest<AdminGroup[]>("/admin/groups/");
}
