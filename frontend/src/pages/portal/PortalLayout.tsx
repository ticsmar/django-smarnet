import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Home, X } from 'lucide-react';
import { getMenus } from '@/services/portal';
import novasmarLogo from '@/assets/novasmar-logo.png';
import type { Menu } from '@/types/portal';
import { cn } from '@/lib/utils';

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const data = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="flex items-center gap-3 text-white">
      <div className="text-right leading-tight">
        <div className="text-[11px] uppercase tracking-wider text-white/70 capitalize">
          {data}
        </div>
        <div className="text-portal-gold text-lg font-semibold tabular-nums">
          {hh}:{mm}
          <span className="text-sm text-white/60 ml-1">:{ss}</span>
        </div>
      </div>
    </div>
  );
}

function hrefFor(m: Menu): string {
  if (m.tipo === 'url') return m.urlExterna ?? '#';
  if (m.tipo === 'noticia') return `/portal/noticias/${m.slug}`;
  if (m.tipo === 'grupo') return `/portal/grupo/${m.slug}`;
  return `/portal/${m.slug}`;
}

function MenuItem({
  item,
  children,
  active,
  open,
  onToggle,
  onClose,
}: {
  item: Menu;
  children: Menu[];
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const hasChildren = children.length > 0;
  const href = hrefFor(item);
  const isExternal = item.tipo === 'url';

  const baseCls = cn(
    'min-h-12 px-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide transition-colors whitespace-nowrap',
    active || open
      ? 'bg-[#0F4C81] text-white'
      : 'text-white/85 hover:bg-[#0F4C81] hover:text-white',
  );

  const content = (
    <>
      {item.label}
      {hasChildren && (
        <ChevronDown
          className={cn('w-3.5 h-3.5 opacity-80 transition-transform', open && 'rotate-180')}
        />
      )}
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="relative">
      {isExternal ? (
        <a href={href} target="_blank" rel="noreferrer" className={baseCls} onClick={handleClick}>
          {content}
        </a>
      ) : (
        <Link to={href} className={baseCls} onClick={handleClick}>
          {content}
        </Link>
      )}
    </div>
  );
}

export default function PortalLayout() {
  const { data: menus = [] } = useQuery({
    queryKey: ['portal', 'menus'],
    queryFn: getMenus,
    refetchInterval: 5 * 60 * 1000,
  });
  const { pathname } = useLocation();

  const { roots, childrenByParent } = useMemo(() => {
    const active = menus.filter((m) => m.ativo);
    const roots = active
      .filter((m) => !m.menuPaiId)
      .sort((a, b) => a.ordem - b.ordem);
    const childrenByParent: Record<string, Menu[]> = {};
    active.forEach((m) => {
      if (m.menuPaiId) {
        (childrenByParent[m.menuPaiId] ||= []).push(m);
      }
    });
    return { roots, childrenByParent };
  }, [menus]);

  const isHome = pathname === '/portal' || pathname === '/portal/';
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    setOpenMenuId(null);
  }, [pathname]);

  return (
    <div className="h-screen overflow-hidden bg-[#0A0E1A] text-portal-fg flex flex-col">
      {/* Main bar */}
      <header className="h-16 shrink-0 bg-[#0A0E1A] border-b border-white/10 px-4 flex items-center gap-1 sticky top-0 z-50">
        {/* Home icon */}
        <Link
          to="/portal"
          className={cn(
            'min-h-12 w-14 grid place-items-center transition-colors',
            isHome ? 'bg-[#0F4C81] text-white' : 'bg-[#0F4C81]/80 text-white hover:bg-[#0F4C81]',
          )}
          aria-label="Início"
        >
          <Home className="w-6 h-6" />
        </Link>

        <nav className="flex-1 flex items-center flex-wrap">
          {roots.map((m) => {
            const children = childrenByParent[m.id] ?? [];
            const href = hrefFor(m);
            const active = !isHome && pathname.startsWith(href);
            return (
              <MenuItem
                key={m.id}
                item={m}
                children={children}
                active={active}
                open={openMenuId === m.id}
                onToggle={() => setOpenMenuId((id) => (id === m.id ? null : m.id))}
                onClose={() => setOpenMenuId(null)}
              />
            );
          })}
        </nav>

        {/* NOVASMAR logo */}
        <div className="flex items-center pl-4 pr-2">
          <img
            src={novasmarLogo}
            alt="Nova Smar S/A"
            className="h-10 w-auto object-contain"
          />
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-hidden relative">
        {openMenuId && (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpenMenuId(null)}
              className="absolute inset-0 z-40 bg-[#0A0E1A]/40 backdrop-blur-[2px] animate-fade-in"
            />
            <div className="absolute inset-0 z-50 px-6 flex items-center justify-center pointer-events-none">
              <div className="max-w-md w-full flex flex-col items-stretch justify-center gap-8 pointer-events-auto">
                {(childrenByParent[openMenuId] ?? [])
                  .sort((a, b) => a.ordem - b.ordem)
                  .map((c) => {
                    const ch = hrefFor(c);
                    const isExt = c.tipo === 'url';
                    const cls =
                      'inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#0F4C81] text-white text-lg font-semibold uppercase tracking-wide hover:bg-[#1565a8] shadow-lg transition-colors whitespace-nowrap';
                    return isExt ? (
                      <a
                        key={c.id}
                        href={ch}
                        target="_blank"
                        rel="noreferrer"
                        className={cls}
                        onClick={() => setOpenMenuId(null)}
                      >
                        {c.label}
                      </a>
                    ) : (
                      <Link
                        key={c.id}
                        to={ch}
                        className={cls}
                        onClick={() => setOpenMenuId(null)}
                      >
                        {c.label}
                      </Link>
                    );
                  })}
                <button
                  type="button"
                  onClick={() => setOpenMenuId(null)}
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white/10 text-white text-lg font-semibold uppercase tracking-wide hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" /> Sair
                </button>
              </div>
            </div>
          </>
        )}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="h-12 shrink-0 bg-[#070B14] border-t border-white/5 px-6 flex items-center justify-between z-50">
        <div className="text-white/70 text-xs uppercase tracking-[0.2em]">
          Portal da Transparência · Nova Smar S/A
        </div>
        <Clock />
      </footer>
    </div>
  );
}
