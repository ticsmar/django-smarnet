import { Navigate, Outlet } from "react-router-dom";
import { useAccessAdminAccess } from "../hooks/useAccessAdminAccess";

export function AccessAdminRoute() {
  const { canManage, loading } = useAccessAdminAccess();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!canManage) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
