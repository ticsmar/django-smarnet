import { Navigate, Outlet } from "react-router-dom";
import { useT } from "@/hooks/useT";
import { useComprasAccess } from "../hooks/useComprasAccess";

export function ComprasFornecedorRoute() {
  const t = useT();
  const { loading, canViewFornecedor } = useComprasAccess();

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
