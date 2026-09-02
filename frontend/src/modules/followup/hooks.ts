import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  appendClienteNotes,
  baixaFollowUp,
  createFollowUpSistema,
  getClienteNotes,
  getFollowUpStatus,
  gravaFollowUp,
  listFollowUpItems,
  listFollowUpMotivos,
  listFollowUpSistemas,
  listFollowUpTipos,
  updateFollowUpSistema,
} from "./api";
import type { FollowUpSistemaInput, GravaFollowUpInput } from "./types";

export function followUpItemsKey(
  sistema: number,
  filtro: string,
  tre?: number | null,
) {
  return ["followup", "items", sistema, filtro, tre ?? ""] as const;
}

export function useFollowUpItems(
  sistema: number,
  filtro: string,
  tre?: number | null,
) {
  return useQuery({
    queryKey: followUpItemsKey(sistema, filtro, tre),
    queryFn: () => listFollowUpItems(sistema, filtro, tre),
    enabled: Number.isFinite(sistema) && filtro.trim().length > 0,
  });
}

export function useFollowUpTipos(sistema: number) {
  return useQuery({
    queryKey: ["followup", "tipos", sistema],
    queryFn: () => listFollowUpTipos(sistema),
    enabled: Number.isFinite(sistema) && sistema > 0,
  });
}

export function useFollowUpMotivos(enabled: boolean) {
  return useQuery({
    queryKey: ["followup", "motivos"],
    queryFn: () => listFollowUpMotivos(),
    enabled,
  });
}

export function useFollowUpStatus(sistema: number, filtro: string) {
  return useQuery({
    queryKey: ["followup", "status", sistema, filtro],
    queryFn: () => getFollowUpStatus(sistema, filtro),
    enabled: Number.isFinite(sistema) && filtro.trim().length > 0,
  });
}

export function useClienteNotes(codigo: number, enabled: boolean) {
  return useQuery({
    queryKey: ["followup", "cliente-notes", codigo],
    queryFn: () => getClienteNotes(codigo),
    enabled: enabled && Number.isFinite(codigo) && codigo > 0,
  });
}

export function useFollowUpMutations(sistema: number, filtro: string) {
  const queryClient = useQueryClient();
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["followup", "items", sistema, filtro] });
    void queryClient.invalidateQueries({ queryKey: ["followup", "status", sistema, filtro] });
  };

  const save = useMutation({
    mutationFn: (input: Omit<GravaFollowUpInput, "sistema" | "filtro">) =>
      gravaFollowUp({ sistema, filtro, ...input }),
    onSuccess: invalidate,
  });

  const baixa = useMutation({
    mutationFn: (preCodigo: number) => baixaFollowUp(preCodigo, sistema, filtro),
    onSuccess: invalidate,
  });

  return { save, baixa, invalidate };
}

export function useFollowUpSistemas() {
  return useQuery({
    queryKey: ["followup", "sistemas"],
    queryFn: listFollowUpSistemas,
  });
}

export function useFollowUpSistemaMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["followup", "sistemas"] });
  return {
    createSistema: useMutation({
      mutationFn: createFollowUpSistema,
      onSuccess: invalidate,
    }),
    updateSistema: useMutation({
      mutationFn: ({
        codigo,
        input,
      }: {
        codigo: number;
        input: FollowUpSistemaInput;
      }) => updateFollowUpSistema(codigo, input),
      onSuccess: invalidate,
    }),
  };
}

export function useAppendClienteNotes(codigo: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (texto: string) => appendClienteNotes(codigo, texto),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["followup", "cliente-notes", codigo],
      });
      void queryClient.invalidateQueries({ queryKey: ["followup", "status"] });
    },
  });
}
