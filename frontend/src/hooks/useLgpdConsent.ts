import { useCallback, useEffect, useState } from 'react';
import {
  acceptAllLgpdConsent,
  LGPD_CONSENT_CHANGED_EVENT,
  LGPD_CONSENT_KEY,
  LGPD_OPEN_PREFERENCES_EVENT,
  readLgpdConsent,
  saveLgpdConsent,
  type LgpdConsent,
} from '@/lib/lgpdConsent';

export function useLgpdConsent() {
  const [consent, setConsent] = useState<LgpdConsent | null>(() => readLgpdConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === LGPD_CONSENT_KEY) {
        setConsent(readLgpdConsent());
      }
    };
    const onChanged = (event: Event) => {
      const detail = (event as CustomEvent<LgpdConsent>).detail;
      setConsent(detail ?? readLgpdConsent());
    };
    const onOpenPreferences = () => setPreferencesOpen(true);

    window.addEventListener('storage', onStorage);
    window.addEventListener(LGPD_CONSENT_CHANGED_EVENT, onChanged);
    window.addEventListener(LGPD_OPEN_PREFERENCES_EVENT, onOpenPreferences);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(LGPD_CONSENT_CHANGED_EVENT, onChanged);
      window.removeEventListener(LGPD_OPEN_PREFERENCES_EVENT, onOpenPreferences);
    };
  }, []);

  const acceptAll = useCallback(() => {
    setConsent(acceptAllLgpdConsent());
    setPreferencesOpen(false);
  }, []);

  const savePreferences = useCallback((functional: boolean) => {
    setConsent(saveLgpdConsent({ functional }));
    setPreferencesOpen(false);
  }, []);

  return {
    consent,
    decided: consent !== null,
    preferencesOpen,
    setPreferencesOpen,
    acceptAll,
    savePreferences,
  };
}
