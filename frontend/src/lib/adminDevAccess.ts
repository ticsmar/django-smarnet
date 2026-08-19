import type { User } from "@/types/auth";

export function isDevelopmentRuntime(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_APP_RUNTIME_ENV === "development";
}

export function canAccessAdminDevArea(user: User | null | undefined): boolean {
  return !!user?.is_superuser && isDevelopmentRuntime();
}