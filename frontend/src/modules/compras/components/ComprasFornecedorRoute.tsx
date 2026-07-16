import { Navigate, Outlet } from "react-router-dom";
import { useComprasAccess } from "../hooks/useComprasAccess";

export function ComprasFornecedorRoute() {
  const { loading, canViewFornecedor } = useComprasAccess();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!canViewFornecedor) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
