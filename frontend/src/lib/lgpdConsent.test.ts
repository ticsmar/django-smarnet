import { beforeEach, describe, expect, it } from 'vitest';
import {
  acceptAllLgpdConsent,
  allowsFunctionalStorage,
  hasLgpdDecision,
  LGPD_CONSENT_KEY,
  readLgpdConsent,
  saveLgpdConsent,
} from '@/lib/lgpdConsent';

describe('lgpdConsent', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.cookie = 'sidebar:state=; path=/; max-age=0';
  });

  it('starts without a decision', () => {
    expect(readLgpdConsent()).toBeNull();
    expect(hasLgpdDecision()).toBe(false);
    expect(allowsFunctionalStorage()).toBe(false);
  });

  it('accepts all optional cookies', () => {
    const consent = acceptAllLgpdConsent();
    expect(consent.necessary).toBe(true);
    expect(consent.functional).toBe(true);
    expect(hasLgpdDecision()).toBe(true);
    expect(allowsFunctionalStorage()).toBe(true);
    expect(readLgpdConsent()).toEqual(consent);
  });

  it('clears functional storage when optional cookies are declined', () => {
    window.localStorage.setItem('smarnet:theme', 'dark');
    window.localStorage.setItem('smarnet:locale', 'en');
    document.cookie = 'sidebar:state=true; path=/; max-age=3600';

    saveLgpdConsent({ functional: false });

    expect(allowsFunctionalStorage()).toBe(false);
    expect(window.localStorage.getItem('smarnet:theme')).toBeNull();
    expect(window.localStorage.getItem('smarnet:locale')).toBeNull();
    expect(window.localStorage.getItem(LGPD_CONSENT_KEY)).toBeTruthy();
    expect(document.cookie).not.toContain('sidebar:state=true');
  });

  it('ignores invalid stored payloads', () => {
    window.localStorage.setItem(LGPD_CONSENT_KEY, '{not-json');
    expect(readLgpdConsent()).toBeNull();
    window.localStorage.setItem(LGPD_CONSENT_KEY, JSON.stringify({ version: 2, functional: true }));
    expect(readLgpdConsent()).toBeNull();
  });
});
