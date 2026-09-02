import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DASHBOARD_KEY } from "./useClienteDashboard";
import {
  atualizaCliente,
  atualizaClienteFinanceiro,
  atualizaClienteObs,
  consultaCnpj,
  consultaFuncionario,
  createClienteFromFuncionario,
  getCliente,
  gravaCliente,
  gravaClienteBloqueio,
  gravaClienteCobranca,
  gravaClienteContato,
  gravaClienteDashboardLimites,
  gravaClienteEmbarque,
  listClienteAreasOs,
  listClienteArclasses,
  listClienteArlevels,
  listClienteArsalesps,
  listClienteCidades,
  listClienteCobrancas,
  listClienteContatos,
  listClienteEmbarques,
  listClienteEstados,
  listClienteGruposTributarios,
  listClienteLogs,
  listClienteModelosPagto,
  listClienteOrigens,
  listClientePaises,
  listClienteRiscos,
  listClientes,
  lookupClienteDocumento,
  setClienteCobrancaPadrao,
  setClienteContatoPadrao,
  setClienteEmbarquePadrao,
} from "../api/commercialApi";
import type {
  GravaBloqueioInput,
  GravaClienteFinanInput,
  GravaClienteInput,
  GravaContatoInput,
  GravaEnderecoRefInput,
  ListClientesParams,
} from "../types/cliente";
import type { GravaClienteDashboardLimitesInput } from "../types/clienteDashboard";

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

export function useClienteArclasses() {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "arclasses"],
    queryFn: () => listClienteArclasses(),
  });
}

export function useClienteRiscos(enabled = true) {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "riscos-cliente"],
    queryFn: () => listClienteRiscos(),
    enabled,
  });
}

export function useClienteArlevels() {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "arlevels"],
    queryFn: () => listClienteArlevels(),
  });
}

export function useClienteArsalesps() {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "arsalesps"],
    queryFn: () => listClienteArsalesps(),
  });
}

export function useClienteCidades(
  paiCodigo: number | null,
  estCodigo: number | null,
) {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "cidades", paiCodigo, estCodigo],
    queryFn: () =>
      listClienteCidades({ pai_codigo: paiCodigo, est_codigo: estCodigo }),
    enabled: paiCodigo !== null && estCodigo !== null,
  });
}

export function useClienteGruposTributarios(
  estCodigo: number | null,
  cliTipo: string | null,
) {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "grupos", estCodigo, cliTipo],
    queryFn: () =>
      listClienteGruposTributarios({
        est_codigo: estCodigo,
        cli_tipo: cliTipo,
      }),
    enabled: estCodigo !== null,
  });
}

export function useClienteAreasOs(params: {
  tipo: "C" | "E";
  munIbge: string | null;
  estCodigo: number | null;
  paiCodigo: number | null;
  current: number | null;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "areas-os", params],
    queryFn: () =>
      listClienteAreasOs({
        tipo: params.tipo,
        mun_ibge: params.munIbge,
        est_codigo: params.estCodigo,
        pai_codigo: params.paiCodigo,
        current: params.current,
      }),
    enabled: params.enabled !== false,
  });
}

export function useClienteModelosPagto(params: {
  origem: string | null;
  mpgCodigo: number | null;
  riscoProtheus: string | null;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [...CATALOGOS_KEY, "modelos-pagto", params],
    queryFn: () =>
      listClienteModelosPagto({
        origem: params.origem,
        mpg_codigo: params.mpgCodigo,
        risco_protheus: params.riscoProtheus,
      }),
    enabled: params.enabled !== false,
  });
}

export function useClienteContatos(codigo: number | null, search = "") {
  return useQuery({
    queryKey: [...CLIENTES_KEY, "contatos", codigo, search],
    queryFn: () => listClienteContatos(codigo as number, search),
    enabled: codigo !== null && Number.isFinite(codigo),
  });
}

export function useClienteCobrancas(codigo: number | null) {
  return useQuery({
    queryKey: [...CLIENTES_KEY, "cobrancas", codigo],
    queryFn: () => listClienteCobrancas(codigo as number),
    enabled: codigo !== null && Number.isFinite(codigo),
  });
}

export function useClienteEmbarques(codigo: number | null) {
  return useQuery({
    queryKey: [...CLIENTES_KEY, "embarques", codigo],
    queryFn: () => listClienteEmbarques(codigo as number),
    enabled: codigo !== null && Number.isFinite(codigo),
  });
}

export function useClienteLogs(codigo: number | null) {
  return useQuery({
    queryKey: [...CLIENTES_KEY, "logs", codigo],
    queryFn: () => listClienteLogs(codigo as number),
    enabled: codigo !== null && Number.isFinite(codigo),
  });
}

export function useAtualizaClienteFinanceiro() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaClienteFinanInput;
    }) => atualizaClienteFinanceiro(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useGravaClienteBloqueio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaBloqueioInput;
    }) => gravaClienteBloqueio(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
      void queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY });
    },
  });
}

export function useGravaClienteDashboardLimites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaClienteDashboardLimitesInput;
    }) => gravaClienteDashboardLimites(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
      void queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY });
    },
  });
}

export function useGravaClienteContato() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaContatoInput;
    }) => gravaClienteContato(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useSetClienteContatoPadrao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: {
        con_codigo_com?: number | null;
        con_codigo_tec?: number | null;
        con_codigo_fin?: number | null;
      };
    }) => setClienteContatoPadrao(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useGravaClienteCobranca() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaEnderecoRefInput;
    }) => gravaClienteCobranca(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useSetClienteCobrancaPadrao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ codigo, chave }: { codigo: number; chave: string }) =>
      setClienteCobrancaPadrao(codigo, chave),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useGravaClienteEmbarque() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      input,
    }: {
      codigo: number;
      input: GravaEnderecoRefInput;
    }) => gravaClienteEmbarque(codigo, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useSetClienteEmbarquePadrao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ codigo, chave }: { codigo: number; chave: string }) =>
      setClienteEmbarquePadrao(codigo, chave),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}

export function useAtualizaClienteObs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      codigo,
      observa,
    }: {
      codigo: number;
      observa: string | null;
    }) => atualizaClienteObs(codigo, observa),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CLIENTES_KEY });
    },
  });
}
