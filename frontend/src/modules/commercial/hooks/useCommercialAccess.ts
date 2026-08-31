import { useMemo } from "react";
import { useApp } from "@/contexts/AppContext";
import { hasPermission } from "@/lib/userPermissions";
import { COMMERCIAL_PERMS } from "../permissions";

export function useCommercialAccess() {
  const { user, authLoading } = useApp();

  return useMemo(
    () => ({
      loading: authLoading,
      canViewCliente: hasPermission(user, COMMERCIAL_PERMS.viewCliente),
      canAddCliente: hasPermission(user, COMMERCIAL_PERMS.addCliente),
      canChangeCliente: hasPermission(user, COMMERCIAL_PERMS.changeCliente),
      canChangeClienteLimite: hasPermission(
        user,
        COMMERCIAL_PERMS.changeClienteLimite,
      ),
      canChangeClienteRisco: hasPermission(
        user,
        COMMERCIAL_PERMS.changeClienteRisco,
      ),
      canViewContato: hasPermission(user, COMMERCIAL_PERMS.viewContato),
      canAddContato: hasPermission(user, COMMERCIAL_PERMS.addContato),
      canChangeContato: hasPermission(user, COMMERCIAL_PERMS.changeContato),
      canViewCobranca: hasPermission(user, COMMERCIAL_PERMS.viewCobranca),
      canAddCobranca: hasPermission(user, COMMERCIAL_PERMS.addCobranca),
      canChangeCobranca: hasPermission(user, COMMERCIAL_PERMS.changeCobranca),
      canViewEmbarque: hasPermission(user, COMMERCIAL_PERMS.viewEmbarque),
      canAddEmbarque: hasPermission(user, COMMERCIAL_PERMS.addEmbarque),
      canChangeEmbarque: hasPermission(user, COMMERCIAL_PERMS.changeEmbarque),
    }),
    [authLoading, user],
  );
}
