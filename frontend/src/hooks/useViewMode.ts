import { useCallback, useState } from 'react';
import { allowsFunctionalStorage } from '@/lib/lgpdConsent';

export type DataViewMode = 'tabela' | 'lista' | 'cards';

const VALID: readonly DataViewMode[] = ['tabela', 'lista', 'cards'];

function readStored(key: string, fallback: DataViewMode): DataViewMode {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw && (VALID as readonly string[]).includes(raw)) {
      return raw as DataViewMode;
    }
  } catch {
    /* ignore quota / privacy mode */
  }
  return fallback;
}

/**
 * Alternador de visualização (tabela | lista | cards) com persistência em localStorage.
 */
export function useViewMode(
  storageKey: string,
  defaultMode: DataViewMode = 'tabela',
): [DataViewMode, (mode: DataViewMode) => void] {
  const [mode, setModeState] = useState<DataViewMode>(() =>
    readStored(storageKey, defaultMode),
  );

  const setMode = useCallback(
    (next: DataViewMode) => {
      setModeState(next);
      if (!allowsFunctionalStorage()) return;
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  return [mode, setMode];
}
