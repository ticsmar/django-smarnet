import { useEffect, useState } from "react";
import { ApiError } from "@/api/client";
import { useApp } from "@/contexts/AppContext";
import { listUsers } from "../api/adminApi";

interface AccessAdminAccess {
  canManage: boolean;
  loading: boolean;
  error: string | null;
}

export function useAccessAdminAccess(): AccessAdminAccess {
  const { user, isAuthenticated, authLoading } = useApp();
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      setCanManage(false);
      setLoading(false);
      setError(null);
      return;
    }

    if (user?.can_manage_access) {
      setCanManage(true);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function probe() {
      setLoading(true);
      setError(null);

      try {
        await listUsers({ page: 1, page_size: 1 });
        if (!cancelled) {
          setCanManage(true);
        }
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (err instanceof ApiError && err.status === 403) {
          setCanManage(false);
        } else {
          setCanManage(false);
          setError(
            err instanceof ApiError ? err.message : "Falha ao verificar permissões.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void probe();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated, user?.can_manage_access]);

  return { canManage, loading, error };
}
