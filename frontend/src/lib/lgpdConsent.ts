export const LGPD_CONSENT_KEY = 'smarnet:lgpd-consent';
export const LGPD_CONSENT_VERSION = 1 as const;
export const LGPD_OPEN_PREFERENCES_EVENT = 'smarnet:lgpd-open-preferences';
export const LGPD_CONSENT_CHANGED_EVENT = 'smarnet:lgpd-consent-changed';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';

export type LgpdConsent = {
  version: typeof LGPD_CONSENT_VERSION;
  necessary: true;
  functional: boolean;
  decidedAt: string;
};

export function readLgpdConsent(): LgpdConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    return parseConsent(window.localStorage.getItem(LGPD_CONSENT_KEY));
  } catch {
    return null;
  }
}

export function hasLgpdDecision(): boolean {
  return readLgpdConsent() !== null;
}

export function allowsFunctionalStorage(): boolean {
  return readLgpdConsent()?.functional === true;
}

export function saveLgpdConsent(input: { functional: boolean }): LgpdConsent {
  const consent: LgpdConsent = {
    version: LGPD_CONSENT_VERSION,
    necessary: true,
    functional: input.functional,
    decidedAt: new Date().toISOString(),
  };
  persistConsent(consent);
  if (!consent.functional) {
    clearFunctionalStorage();
  }
  notifyConsentChanged(consent);
  return consent;
}

export function acceptAllLgpdConsent(): LgpdConsent {
  return saveLgpdConsent({ functional: true });
}

export function openLgpdPreferences(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(LGPD_OPEN_PREFERENCES_EVENT));
}

function persistConsent(consent: LgpdConsent): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LGPD_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* quota / privacy mode */
  }
}

function notifyConsentChanged(consent: LgpdConsent): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<LgpdConsent>(LGPD_CONSENT_CHANGED_EVENT, { detail: consent }));
}

function parseConsent(raw: string | null): LgpdConsent | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isConsent(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isConsent(value: unknown): value is LgpdConsent {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return (
    record.version === LGPD_CONSENT_VERSION &&
    record.necessary === true &&
    typeof record.functional === 'boolean' &&
    typeof record.decidedAt === 'string'
  );
}

function clearFunctionalStorage(): void {
  if (typeof window === 'undefined') return;
  const toRemove: string[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key && key.startsWith('smarnet:') && key !== LGPD_CONSENT_KEY) {
      toRemove.push(key);
    }
  }
  toRemove.forEach((key) => window.localStorage.removeItem(key));
  document.cookie = `${SIDEBAR_COOKIE_NAME}=; path=/; max-age=0`;
}
