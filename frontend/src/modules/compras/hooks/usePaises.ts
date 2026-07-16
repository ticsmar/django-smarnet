import { useQuery } from "@tanstack/react-query";
import { listPaises } from "../api/comprasApi";

const PAISES_KEY = ["compras", "paises"] as const;

export function usePaises(search = "") {
  return useQuery({
    queryKey: [...PAISES_KEY, search],
    queryFn: () => listPaises(search),
    staleTime: 1000 * 60 * 60,
  });
}
