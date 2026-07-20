import ptBR from '@/locales/pt-BR.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

export type Locale = 'pt-BR' | 'en' | 'es';

export type TranslationVars = Record<string, string | number>;

const DEFAULT_LOCALE: Locale = 'pt-BR';

const catalogs: Record<Locale, Record<string, string>> = {
  'pt-BR': ptBR,
  en,
  es,
};

export const LOCALES: Locale[] = ['pt-BR', 'en', 'es'];

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'pt-BR' || value === 'en' || value === 'es';
}

function interpolate(template: string, vars?: TranslationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : `{${key}}`,
  );
}

/** Translate a key. Falls back to pt-BR, then the key itself. */
export function t(key: string, locale: Locale = DEFAULT_LOCALE, vars?: TranslationVars): string {
  const raw = catalogs[locale]?.[key] ?? catalogs[DEFAULT_LOCALE][key] ?? key;
  return interpolate(raw, vars);
}

export const localeNames: Record<Locale, string> = {
  'pt-BR': 'Português',
  en: 'English',
  es: 'Español',
};

/** BCP 47 tag for <html lang> and Intl APIs. */
export function localeToHtmlLang(locale: Locale): string {
  return locale;
}
