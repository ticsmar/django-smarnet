import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  listUsers,
  resetUserPassword,
  setUserGroups,
  updateUser,
} from "../api/adminApi";
import type {
  CreateAdminUserInput,
  ListUsersParams,
  UpdateAdminUserInput,
} from "../types/adminUser";

const USERS_KEY = ["admin", "users"] as const;

export function useUsers(params: ListUsersParams) {
  return useQuery({
    queryKey: [...USERS_KEY, params],
    queryFn: () => listUsers(params),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateAdminUserInput) => createUser(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateAdminUserInput }) =>
      updateUser(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useSetUserGroups() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, groups }: { id: number; groups: string[] }) =>
      setUserGroups(id, groups),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useResetUserPassword() {
  return useMutation({
    mutationFn: ({ id, password }: { id: number; password?: string }) =>
      resetUserPassword(id, password),
  });
}
