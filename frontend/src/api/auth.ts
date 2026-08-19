import { apiRequest } from "./client";
import type { ChangePasswordInput, Credentials, User, UserProfile } from "@/types/auth";

export function login(credentials: Credentials): Promise<User> {
  return apiRequest<User>("/users/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function logout(): Promise<void> {
  return apiRequest<void>("/users/logout/", {
    method: "POST",
  });
}

export function getCurrentUser(): Promise<User> {
  return apiRequest<User>("/users/me/");
}

export function getUserProfile(): Promise<UserProfile> {
  return apiRequest<UserProfile>("/users/me/profile/");
}

export function changePassword(input: ChangePasswordInput): Promise<void> {
  return apiRequest<void>("/users/change-password/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
