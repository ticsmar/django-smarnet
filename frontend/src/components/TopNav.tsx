import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, User, Settings, Globe, Moon, Sun, Monitor, Shield, LogOut, ChevronDown, Menu,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t, Locale, localeNames } from '@/lib/i18n';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { logout } from '@/api/auth';
import { DJANGO_ADMIN_URL } from '@/api/client';

export function TopNav() {
  const { locale, setLocale, theme, setTheme, user, setUser } = useApp();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  let isMobile = false;
  let sidebarOpen = true;
  try {
    const sidebar = useSidebar();
    isMobile = sidebar.isMobile;
    sidebarOpen = sidebar.isMobile ? sidebar.openMobile : sidebar.open;
  } catch {
    // TopNav pode montar fora do provider em HMR
  }

  const toggle = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);
  const close = () => setOpenMenu(null);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Session may already be expired
    }
    setUser(null);
    navigate('/');
    close();
  }

  const themeIcons = { light: Sun, dark: Moon, system: Monitor, admin: Shield };
  const themeLabels = { light: 'Light', dark: 'Dark', system: 'System', admin: 'Admin' };
  const ThemeIcon = themeIcons[theme];

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]"
      style={{ borderBottom: '1px solid hsl(var(--border) / 0.5)' }}
    >
      <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-4">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* No desktop colapsado o hambúrguer fica no rail escuro; aqui só mobile ou menu expandido. */}
          {(isMobile || sidebarOpen) ? (
            <SidebarTrigger
              aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
              className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-surface-container-low"
            >
              <Menu size={20} />
            </SidebarTrigger>
          ) : null}
          {isMobile ? (
            <span className="text-sm font-semibold text-foreground truncate">
              {sidebarOpen ? t('nav.close_menu', locale) : t('nav.menu', locale)}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="relative">
            <button
              type="button"
              onClick={() => toggle('notif')}
              className="p-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground relative"
              aria-label={t('nav.notifications', locale)}
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            {openMenu === 'notif' ? (
              <div className="absolute right-0 top-full mt-1 bg-background rounded-xl shadow-ambient-lg py-3 px-4 min-w-[min(280px,calc(100vw-1.5rem))] border border-border/40">
                <h4 className="font-display font-semibold text-sm text-foreground mb-3">{t('nav.notifications', locale)}</h4>
                <div className="space-y-3">
                  {['Novo pedido #88421 recebido', 'Estoque baixo: Sensor XK-200', 'Manutenção programada amanhã'].map((msg, i) => (
                    <div key={i} className="text-sm text-muted-foreground py-2 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => toggle('lang')}
              className="p-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground"
              aria-label={t('nav.language', locale)}
            >
              <Globe size={18} />
            </button>
            {openMenu === 'lang' ? (
              <div className="absolute right-0 top-full mt-1 bg-background rounded-xl shadow-ambient-lg py-2 min-w-[140px] border border-border/40">
                {(Object.keys(localeNames) as Locale[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => { setLocale(l); close(); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-low transition-colors ${locale === l ? 'text-secondary font-semibold' : 'text-foreground'}`}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggle('theme')}
              className="p-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-muted-foreground hover:text-foreground"
              aria-label={t('nav.theme', locale)}
            >
              <ThemeIcon size={18} />
            </button>
            {openMenu === 'theme' ? (
              <div className="absolute right-0 top-full mt-1 bg-background rounded-xl shadow-ambient-lg py-2 min-w-[140px] border border-border/40">
                {(['light', 'dark', 'system', 'admin'] as const).map((th) => {
                  const Icon = themeIcons[th];
                  return (
                    <button
                      key={th}
                      type="button"
                      onClick={() => { setTheme(th); close(); }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-surface-container-low transition-colors ${theme === th ? 'text-secondary font-semibold' : 'text-foreground'}`}
                    >
                      <Icon size={14} /> {themeLabels[th]}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="relative ml-1 sm:ml-2">
            <button
              type="button"
              onClick={() => toggle('profile')}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-surface-container-low transition-colors"
            >
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-foreground leading-tight">{user?.username}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.is_branch_manager
                    ? t('profile.role.branch_manager', locale)
                    : t('profile.role.user', locale)}
                </p>
              </div>
              <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
            </button>
            {openMenu === 'profile' ? (
              <div className="absolute right-0 top-full mt-1 bg-background rounded-xl shadow-ambient-lg py-2 min-w-[180px] border border-border/40">
                <button
                  type="button"
                  onClick={() => { navigate('/app/profile'); close(); }}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-surface-container-low transition-colors text-foreground"
                >
                  <User size={16} className="text-muted-foreground" /> {t('nav.profile', locale)}
                </button>
                {user?.can_manage_access || user?.is_superuser ? (
                  <button
                    type="button"
                    onClick={() => { navigate('/settings'); close(); }}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-surface-container-low transition-colors text-foreground"
                  >
                    <Settings size={16} className="text-muted-foreground" /> {t('nav.settings', locale)}
                  </button>
                ) : null}
                <div className="sm:hidden border-t border-border/40 my-1 pt-1">
                  <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('nav.language', locale)}
                  </p>
                  {(Object.keys(localeNames) as Locale[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => { setLocale(l); close(); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container-low transition-colors ${locale === l ? 'text-secondary font-semibold' : 'text-foreground'}`}
                    >
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
                {user?.can_manage_access ? (
                  <button
                    type="button"
                    onClick={() => { window.open(DJANGO_ADMIN_URL, '_blank', 'noopener'); close(); }}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-surface-container-low transition-colors text-foreground"
                  >
                    <Settings size={16} className="text-muted-foreground" /> App Admin
                  </button>
                ) : null}
                {user?.is_branch_manager ? (
                  <button
                    type="button"
                    onClick={() => { navigate('/portal/admin'); close(); }}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-surface-container-low transition-colors text-foreground"
                  >
                    <Settings size={16} className="text-muted-foreground" /> Portal Admin
                  </button>
                ) : null}
                <div className="my-1 mx-4 h-px bg-surface-container" />
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-surface-container-low transition-colors text-destructive"
                >
                  <LogOut size={16} /> {t('nav.logout', locale)}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
