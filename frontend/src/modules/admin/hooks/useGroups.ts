import { useQuery } from "@tanstack/react-query";
import { listGroups, listProductPermissions } from "../api/adminApi";

const GROUPS_KEY = ["admin", "groups"] as const;
const PRODUCT_PERMISSIONS_KEY = ["admin", "product-permissions"] as const;

export function useGroups() {
  return useQuery({
    queryKey: GROUPS_KEY,
    queryFn: listGroups,
  });
}

export function useProductPermissions() {
  return useQuery({
    queryKey: PRODUCT_PERMISSIONS_KEY,
    queryFn: listProductPermissions,
  });
}
