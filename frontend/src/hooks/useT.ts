import { useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { t, type TranslationVars } from '@/lib/i18n';

/** Translate using the current app locale. Prefer this over `t(key, locale)`. */
export function useT() {
  const { locale } = useApp();

  return useCallback(
    (key: string, vars?: TranslationVars) => t(key, locale, vars),
    [locale],
  );
}
