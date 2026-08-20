import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizaCliente,
  consultaCnpj,
  consultaFuncionario,
  createClienteFromFuncionario,
  getCliente,
  gravaCliente,
  listClienteEstados,
  listClienteOrigens,
  listClientePaises,
  listClientes,
  lookupClienteDocumento,
} from "../api/administracaoApi";
import type { GravaClienteInput, ListClientesParams } from "../types/cliente";

const CLIENTES_KEY = ["administracao", "clientes"] as const;
const CATALOGOS_KEY = ["administracao", "catalogos"] as const;

export function useClientes(params: ListClientesParams) {
  return useQuery({
    queryKey: [...CLIENTES_KEY, params],
    queryFn: () => listClientes(params),
  });
}

export function useCliente(codigo: number | null) {
  return useQuery({
    queryKey: [...CLIENTES_KEY, "detail", codigo],
    queryFn: () => getCliente(codigo as number),
    enabled: codigo !== null && Number.isFinite(codigo),
  });
}

export function useGravaCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: GravaClienteInput) => gravaCliente(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useAtualizaCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaClienteInput;
    }) => atualizaCliente(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useLookupClienteDocumento(documento: string, enabled: boolean) {
  return useQuery({
    queryKey: [...CLIENTES_KEY, "documento", documento],
    queryFn: () => lookupClienteDocumento(documento),
    enabled,
  });
}

export function useConsultaCnpj() {
  return useMutation({
    mutationFn: (cnpj: string) => consultaCnpj(cnpj),
  });
}

export function useConsultaFuncionario() {
  return useMutation({
    mutationFn: (cpf: string) => consultaFuncionario(cpf),
  });
}

export function useCreateClienteFromFuncionario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cpf: string) => createClienteFromFuncionario(cpf),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useClientePaises() {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "paises"],
    queryFn: () => listClientePaises(),
  });
}

export function useClienteEstados(paiCodigo: number | null) {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "estados", paiCodigo],
    queryFn: () => listClienteEstados(paiCodigo as number),
    enabled: paiCodigo !== null && Number.isFinite(paiCodigo),
  });
}

export function useClienteOrigens() {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "origens"],
    queryFn: () => listClienteOrigens(),
  });
}
