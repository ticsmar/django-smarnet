import { Navigate, Outlet } from "react-router-dom";
import { useBranchManagerAccess } from "../hooks/useBranchManagerAccess";

export function DeviceManagerRoute() {
  const { isManager, loading } = useBranchManagerAccess();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!isManager) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
