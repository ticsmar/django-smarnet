import { useQuery } from "@tanstack/react-query";
import {
  getClienteDashboardCredito,
  listClienteDashboardOs,
  listClienteDashboardTitulos,
} from "../api/commercialApi";
import type {
  ClienteDashboardListParams,
  ClienteDashboardScope,
} from "../types/clienteDashboard";

export const DASHBOARD_KEY = ["administracao", "cliente-dashboard"] as const;

export function useClienteDashboardCredito(
  codigo: number | null,
  scope: ClienteDashboardScope,
  enabled = true,
) {
    return useQuery({
      queryKey: [...DASHBOARD_KEY, "credito", codigo, scope],
      queryFn: () => getClienteDashboardCredito(codigo as number, { scope }),
      enabled: enabled && codigo !== null && Number.isFinite(codigo),
      retry: 1,
    });
}

export function useClienteDashboardOs(
  codigo: number | null,
  params: ClienteDashboardListParams,
  enabled = true,
) {
  return useQuery({
    queryKey: [...DASHBOARD_KEY, "os", codigo, params],
    queryFn: () => listClienteDashboardOs(codigo as number, params),
    enabled: enabled && codigo !== null && Number.isFinite(codigo),
  });
}

export function useClienteDashboardTitulos(
  codigo: number | null,
  params: ClienteDashboardListParams,
  enabled = true,
) {
  return useQuery({
    queryKey: [...DASHBOARD_KEY, "titulos", codigo, params],
    queryFn: () => listClienteDashboardTitulos(codigo as number, params),
    enabled: enabled && codigo !== null && Number.isFinite(codigo),
  });
}
