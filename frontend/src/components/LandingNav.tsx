import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Moon, Sun, Monitor, Lock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t, Locale, localeNames } from '@/lib/i18n';
import { LoginModal } from '@/components/LoginModal';
import { SmarnetLogo } from '@/components/SmarnetLogo';

export function LandingNav() {
  const navigate = useNavigate();
  const { locale, setLocale, theme, setTheme } = useApp();
  const [loginOpen, setLoginOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const themeIcons = { light: Sun, dark: Moon, system: Monitor };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/30 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <SmarnetLogo size="lg" onDark className="!items-start" />


          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="relative">
              <button onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); }}
                className="p-2.5 rounded-xl hover:bg-sidebar-foreground/10 transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <Globe size={18} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-xl shadow-ambient-lg py-2 min-w-[140px]">
                  {(Object.keys(localeNames) as Locale[]).map((l) => (
                    <button key={l} onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-low transition-colors ${locale === l ? 'text-secondary font-semibold' : 'text-foreground'}`}>
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <div className="relative">
              <button onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); }}
                className="p-2.5 rounded-xl hover:bg-sidebar-foreground/10 transition-colors text-sidebar-foreground/70 hover:text-sidebar-foreground">
                {(() => { const Icon = themeIcons[theme]; return <Icon size={18} />; })()}
              </button>
              {themeOpen && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-xl shadow-ambient-lg py-2 min-w-[140px]">
                  {(['light', 'dark', 'system'] as const).map((th) => {
                    const Icon = themeIcons[th];
                    return (
                      <button key={th} onClick={() => { setTheme(th); setThemeOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-surface-container-low transition-colors ${theme === th ? 'text-secondary font-semibold' : 'text-foreground'}`}>
                        <Icon size={14} /> {th.charAt(0).toUpperCase() + th.slice(1)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Login */}
            <button onClick={() => setLoginOpen(true)}
              className="ml-2 px-5 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-semibold flex items-center gap-2 hover:bg-accent/90 transition-colors shadow-sm">
              <Lock size={14} /> {t('nav.login', locale)}
            </button>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onForgot={() => { setLoginOpen(false); navigate('/forgot-password'); }}
        onRequestAccess={() => { setLoginOpen(false); navigate('/request-access'); }}
      />
    </>
  );
}
