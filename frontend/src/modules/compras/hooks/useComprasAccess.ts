import { useMemo } from "react";
import { useApp } from "@/contexts/AppContext";
import { COMPRAS_PERMS, hasPermission } from "../permissions";

export function useComprasAccess() {
  const { user, authLoading } = useApp();

  return useMemo(
    () => ({
      loading: authLoading,
      canViewFornecedor: hasPermission(user, COMPRAS_PERMS.viewFornecedor),
      canAddFornecedor: hasPermission(user, COMPRAS_PERMS.addFornecedor),
      canChangeFornecedor: hasPermission(user, COMPRAS_PERMS.changeFornecedor),
      canViewFornecContato: hasPermission(user, COMPRAS_PERMS.viewFornecContato),
      canAddFornecContato: hasPermission(user, COMPRAS_PERMS.addFornecContato),
      canChangeFornecContato: hasPermission(user, COMPRAS_PERMS.changeFornecContato),
      canDeleteFornecContato: hasPermission(user, COMPRAS_PERMS.deleteFornecContato),
    }),
    [authLoading, user],
  );
}
