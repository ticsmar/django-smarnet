import { Navigate, Outlet } from "react-router-dom";
import { useT } from "@/hooks/useT";
import { useBranchManagerAccess } from "../hooks/useBranchManagerAccess";

export function DeviceManagerRoute() {
  const t = useT();
  const { isManager, loading } = useBranchManagerAccess();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  if (!isManager) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
