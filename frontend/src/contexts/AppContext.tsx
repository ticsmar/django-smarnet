import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Locale, isLocale, localeToHtmlLang } from '@/lib/i18n';
import { getCurrentUser } from '@/api/auth';
import { ApiError } from '@/api/client';
import type { User } from '@/types/auth';

type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  isAuthenticated: boolean;
  authLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const THEME_KEY = 'smarnet:theme';
const LOCALE_KEY = 'smarnet:locale';
const DEFAULT_LOCALE: Locale = 'pt-BR';

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const v = window.localStorage.getItem(THEME_KEY);
  return v === 'dark' || v === 'light' || v === 'system' ? v : 'light';
}

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const v = window.localStorage.getItem(LOCALE_KEY);
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  const resolved =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme());
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(LOCALE_KEY, l);
    } catch {
      // ignore
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(THEME_KEY, t);
    } catch {
      // ignore
    }
  };

  const bootstrapSession = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      if (!(err instanceof ApiError) || err.status !== 401) {
        console.error('Session bootstrap failed:', err);
      }
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    void bootstrapSession();
  }, [bootstrapSession]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === THEME_KEY && e.newValue) {
        const v = e.newValue as Theme;
        if (v === 'light' || v === 'dark' || v === 'system') setThemeState(v);
      }
      if (e.key === LOCALE_KEY && isLocale(e.newValue)) {
        setLocaleState(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <AppContext.Provider value={{
      locale, setLocale,
      theme, setTheme,
      user, setUser,
      isAuthenticated: !!user,
      authLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
