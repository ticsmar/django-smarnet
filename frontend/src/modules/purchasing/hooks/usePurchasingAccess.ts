import { useMemo } from "react";
import { useApp } from "@/contexts/AppContext";
import { hasPermission } from "@/lib/userPermissions";
import { PURCHASING_PERMS } from "../permissions";

export function usePurchasingAccess() {
  const { user, authLoading } = useApp();

  return useMemo(
    () => ({
      loading: authLoading,
      canViewFornecedor: hasPermission(user, PURCHASING_PERMS.viewFornecedor),
      canViewDashboard: hasPermission(user, PURCHASING_PERMS.viewDashboard),
      canAddFornecedor: hasPermission(user, PURCHASING_PERMS.addFornecedor),
      canChangeFornecedor: hasPermission(user, PURCHASING_PERMS.changeFornecedor),
      canDeleteFornecedor: hasPermission(user, PURCHASING_PERMS.deleteFornecedor),
      canViewFornecContato: hasPermission(user, PURCHASING_PERMS.viewFornecContato),
      canAddFornecContato: hasPermission(user, PURCHASING_PERMS.addFornecContato),
      canChangeFornecContato: hasPermission(user, PURCHASING_PERMS.changeFornecContato),
      canDeleteFornecContato: hasPermission(user, PURCHASING_PERMS.deleteFornecContato),
    }),
    [authLoading, user],
  );
}
