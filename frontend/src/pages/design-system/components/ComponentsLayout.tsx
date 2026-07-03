import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  MousePointerClick,
  TextCursorInput,
  LayoutPanelLeft,
  Bell,
  Navigation,
  Database,
  Sparkles,
  Component as ComponentIcon,
} from 'lucide-react';

export const componentGroups = [
  {
    label: 'Visão geral',
    icon: ComponentIcon,
    items: [{ to: '/design-system/components', label: 'Todos componentes', end: true }],
  },
  {
    label: 'Ações',
    icon: MousePointerClick,
    items: [
      { to: '/design-system/components/buttons', label: 'Buttons' },
      { to: '/design-system/components/toggles', label: 'Toggles' },
      { to: '/design-system/components/dropdown-menu', label: 'Dropdown Menu' },
      { to: '/design-system/components/dropdowns', label: 'Dropdowns (Blocks)' },
      { to: '/design-system/components/context-menu', label: 'Context Menu' },
      { to: '/design-system/components/menubar', label: 'Menubar' },
      { to: '/design-system/components/command', label: 'Command' },
    ],
  },
  {
    label: 'Formulários',
    icon: TextCursorInput,
    items: [
      { to: '/design-system/components/inputs', label: 'Input & Textarea' },
      { to: '/design-system/components/select', label: 'Select' },
      { to: '/design-system/components/checkbox-radio', label: 'Checkbox & Radio' },
      { to: '/design-system/components/switch', label: 'Switch' },
      { to: '/design-system/components/slider', label: 'Slider' },
      { to: '/design-system/components/input-otp', label: 'Input OTP' },
      { to: '/design-system/components/calendar', label: 'Calendar & Date' },
      { to: '/design-system/components/form', label: 'Form (RHF + Zod)' },
    ],
  },
  {
    label: 'Display',
    icon: LayoutPanelLeft,
    items: [
      { to: '/design-system/components/cards', label: 'Cards' },
      { to: '/design-system/components/panels', label: 'Panels' },
      { to: '/design-system/components/list-groups', label: 'List Groups' },
      { to: '/design-system/components/badges', label: 'Badges' },
      { to: '/design-system/components/avatars', label: 'Avatars' },
      { to: '/design-system/components/separator', label: 'Separator' },
      { to: '/design-system/components/skeleton', label: 'Skeleton' },
      { to: '/design-system/components/aspect-ratio', label: 'Aspect Ratio' },
      { to: '/design-system/components/typography', label: 'Typography' },
    ],
  },
  {
    label: 'Feedback',
    icon: Bell,
    items: [
      { to: '/design-system/components/alerts', label: 'Alerts' },
      { to: '/design-system/components/progress', label: 'Progress' },
      { to: '/design-system/components/toasts', label: 'Toasts & Sonner' },
      { to: '/design-system/components/tooltip', label: 'Tooltip' },
      { to: '/design-system/components/hover-card', label: 'Hover Card' },
      { to: '/design-system/components/popover', label: 'Popover' },
    ],
  },
  {
    label: 'Sobreposições',
    icon: Sparkles,
    items: [
      { to: '/design-system/components/dialog', label: 'Dialog' },
      { to: '/design-system/components/alert-dialog', label: 'Alert Dialog' },
      { to: '/design-system/components/sheet', label: 'Sheet' },
      { to: '/design-system/components/drawer', label: 'Drawer' },
    ],
  },
  {
    label: 'Navegação',
    icon: Navigation,
    items: [
      { to: '/design-system/components/tabs', label: 'Tabs' },
      { to: '/design-system/components/accordion', label: 'Accordion' },
      { to: '/design-system/components/collapsible', label: 'Collapsible' },
      { to: '/design-system/components/breadcrumb', label: 'Breadcrumb' },
      { to: '/design-system/components/pagination', label: 'Pagination' },
      { to: '/design-system/components/navigation-menu', label: 'Navigation Menu' },
      { to: '/design-system/components/sidebar', label: 'Sidebar' },
    ],
  },
  {
    label: 'Dados',
    icon: Database,
    items: [
      { to: '/design-system/components/table', label: 'Table' },
      { to: '/design-system/components/carousel', label: 'Carousel' },
      { to: '/design-system/components/scroll-area', label: 'Scroll Area' },
      { to: '/design-system/components/resizable', label: 'Resizable' },
      { to: '/design-system/components/chart', label: 'Chart' },
      { to: '/design-system/components/file-manager', label: 'File Manager' },
    ],
  },
];

export default function ComponentsLayout() {
  const { pathname } = useLocation();

  // Find current label
  let currentLabel: string | null = null;
  for (const g of componentGroups) {
    for (const it of g.items) {
      const match = (it as any).end ? pathname === it.to : pathname === it.to;
      if (match) {
        currentLabel = it.label;
        break;
      }
    }
    if (currentLabel) break;
  }

  return (
    <div className="flex gap-8 -mt-2">
      {/* Inner sidebar */}
      <aside className="w-60 shrink-0 hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-5 sidebar-scroll">
          {componentGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.label}>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2 px-2">
                  <Icon size={12} className="text-accent" />
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((it) => (
                    <li key={it.to}>
                      <NavLink
                        to={it.to}
                        end={(it as any).end}
                        className={({ isActive }) =>
                          cn(
                            'block px-3 py-1.5 rounded-lg text-sm transition-colors',
                            isActive
                              ? 'bg-primary text-primary-foreground font-semibold'
                              : 'text-muted-foreground hover:bg-surface-container hover:text-foreground'
                          )
                        }
                      >
                        {it.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {currentLabel && currentLabel !== 'Todos componentes' && (
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-1">
            Componente
          </p>
        )}
        {currentLabel && currentLabel !== 'Todos componentes' && (
          <h2 className="font-display text-3xl font-extrabold tracking-tight mb-6">
            {currentLabel}
          </h2>
        )}
        <Outlet />
      </div>
    </div>
  );
}
