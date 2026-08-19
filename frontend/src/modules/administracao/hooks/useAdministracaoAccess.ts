import { useMemo } from "react";
import { useApp } from "@/contexts/AppContext";
import { hasPermission } from "@/lib/userPermissions";
import { ADMINISTRACAO_PERMS } from "../permissions";

export function useAdministracaoAccess() {
  const { user, authLoading } = useApp();

  return useMemo(
    () => ({
      loading: authLoading,
      canViewCliente: hasPermission(user, ADMINISTRACAO_PERMS.viewCliente),
      canAddCliente: hasPermission(user, ADMINISTRACAO_PERMS.addCliente),
      canChangeCliente: hasPermission(user, ADMINISTRACAO_PERMS.changeCliente),
    }),
    [authLoading, user],
  );
}
