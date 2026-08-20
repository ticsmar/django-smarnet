import { Navigate, Outlet } from "react-router-dom";
import { useT } from "@/hooks/useT";
import { useAdministracaoAccess } from "../hooks/useAdministracaoAccess";

export function AdministracaoClienteRoute() {
  const t = useT();
  const { loading, canViewCliente } = useAdministracaoAccess();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  if (!canViewCliente) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
