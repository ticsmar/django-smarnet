import { useQuery } from "@tanstack/react-query";
import { listGroups } from "../api/adminApi";

const GROUPS_KEY = ["admin", "groups"] as const;

export function useGroups() {
  return useQuery({
    queryKey: GROUPS_KEY,
    queryFn: listGroups,
  });
}
