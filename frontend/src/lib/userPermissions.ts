import type { User } from "@/types/auth";

export function hasPermission(
  user: Pick<User, "is_superuser" | "permissions"> | null | undefined,
  permission: string,
): boolean {
  if (!user) return false;
  if (user.is_superuser) return true;
  return user.permissions?.includes(permission) ?? false;
}