import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ativaFornecedor,
  excluiFornecContato,
  getFornecedor,
  gravaFornecContato,
  gravaFornecedor,
  inativaFornecedor,
  listFornecContatos,
  listFornecedores,
} from "../api/comprasApi";
import type {
  GravaFornecContatoInput,
  GravaFornecedorInput,
  ListFornecContatosParams,
  ListFornecedoresParams,
} from "../types/fornecedor";

const FORNECEDORES_KEY = ["compras", "fornecedores"] as const;
const CONTATOS_KEY = ["compras", "fornecedor-contatos"] as const;

export function useFornecedores(params: ListFornecedoresParams) {
  return useQuery({
    queryKey: [...FORNECEDORES_KEY, params],
    queryFn: () => listFornecedores(params),
  });
}

export function useFornecedor(codFornec: number | null) {
  return useQuery({
    queryKey: [...FORNECEDORES_KEY, "detail", codFornec],
    queryFn: () => getFornecedor(codFornec as number),
    enabled: codFornec !== null && Number.isFinite(codFornec),
  });
}

export function useGravaFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: GravaFornecedorInput) => gravaFornecedor(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORNECEDORES_KEY });
    },
  });
}

export function useAtivaFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (codFornec: number) => ativaFornecedor(codFornec),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORNECEDORES_KEY });
    },
  });
}

export function useInativaFornecedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (codFornec: number) => inativaFornecedor(codFornec),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORNECEDORES_KEY });
    },
  });
}

export function useFornecContatos(params: ListFornecContatosParams) {
  return useQuery({
    queryKey: [...CONTATOS_KEY, params],
    queryFn: () => listFornecContatos(params),
    enabled: params.for_codigo != null,
  });
}

export function useGravaFornecContato() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: GravaFornecContatoInput) => gravaFornecContato(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CONTATOS_KEY });
    },
  });
}

export function useExcluiFornecContato() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (codContato: number) => excluiFornecContato(codContato),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CONTATOS_KEY });
    },
  });
}
