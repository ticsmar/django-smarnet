import { Navigate, Outlet } from "react-router-dom";
import { useT } from "@/hooks/useT";
import { usePurchasingAccess } from "../hooks/usePurchasingAccess";

export function PurchasingFornecedorRoute() {
  const t = useT();
  const { loading, canViewFornecedor } = usePurchasingAccess();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  if (!canViewFornecedor) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
