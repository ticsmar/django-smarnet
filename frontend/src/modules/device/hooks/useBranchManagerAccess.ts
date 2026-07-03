import { useEffect, useState } from "react";
import { ApiError } from "@/api/client";
import { listTokens } from "../api/deviceApi";
import { useApp } from "@/contexts/AppContext";

interface BranchManagerAccess {
  isManager: boolean;
  loading: boolean;
  error: string | null;
}

export function useBranchManagerAccess(): BranchManagerAccess {
  const { isAuthenticated, authLoading } = useApp();
  const [isManager, setIsManager] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      setIsManager(false);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function probe() {
      setLoading(true);
      setError(null);

      try {
        await listTokens();
        if (!cancelled) {
          setIsManager(true);
        }
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (err instanceof ApiError && err.status === 403) {
          setIsManager(false);
        } else {
          setIsManager(false);
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
  }, [isAuthenticated, authLoading]);

  return { isManager, loading, error };
}
