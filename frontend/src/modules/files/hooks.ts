import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArquivoFolder,
  createArquivoSistema,
  getArquivoTree,
  listArquivoHistorico,
  listArquivoSistemas,
  moveArquivoNode,
  trashArquivoNodes,
  updateArquivoSistema,
  uploadArquivoFile,
} from "./api";
import type { FileManagerSistemaInput } from "./types";

export function arquivoTreeQueryKey(sistema: number, filtro: string) {
  return ["arquivos", "tree", sistema, filtro] as const;
}

export function useArquivoTree(sistema: number, filtro: string) {
  return useQuery({
    queryKey: arquivoTreeQueryKey(sistema, filtro),
    queryFn: () => getArquivoTree(sistema, filtro),
    enabled: Number.isFinite(sistema) && filtro.trim().length > 0,
  });
}

export function useArquivoHistorico(
  sistema: number,
  filtro: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["arquivos", "historico", sistema, filtro],
    queryFn: () => listArquivoHistorico(sistema, filtro),
    enabled,
  });
}

export function useArquivoMutations(sistema: number, filtro: string) {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: arquivoTreeQueryKey(sistema, filtro) });

  const createFolder = useMutation({
    mutationFn: (input: {
      nome: string;
      descricao?: string;
      par_codigo_pai?: number | null;
    }) => createArquivoFolder({ sistema, filtro, ...input }),
    onSuccess: invalidate,
  });

  const uploadFile = useMutation({
    mutationFn: (input: {
      file: File;
      descricao?: string;
      par_codigo_pai?: number | null;
    }) => uploadArquivoFile({ sistema, filtro, ...input }),
    onSuccess: invalidate,
  });

  const moveNode = useMutation({
    mutationFn: (input: {
      par_codigo: number;
      par_codigo_pai?: number | null;
      nome?: string;
    }) => moveArquivoNode({ sistema, filtro, ...input }),
    onSuccess: invalidate,
  });

  const trashNodes = useMutation({
    mutationFn: (par_codigos: number[]) =>
      trashArquivoNodes({ sistema, filtro, par_codigos }),
    onSuccess: invalidate,
  });

  return { createFolder, uploadFile, moveNode, trashNodes };
}

export function useArquivoSistemas() {
  return useQuery({
    queryKey: ["arquivos", "sistemas"],
    queryFn: listArquivoSistemas,
  });
}

export function useArquivoSistemaMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["arquivos", "sistemas"] });

  const createSistema = useMutation({
    mutationFn: (input: FileManagerSistemaInput) => createArquivoSistema(input),
    onSuccess: invalidate,
  });

  const updateSistema = useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: FileManagerSistemaInput;
    }) => updateArquivoSistema(codigo, input),
    onSuccess: invalidate,
  });

  return { createSistema, updateSistema };
}
