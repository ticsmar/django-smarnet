import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, UserCheck, Building2, Truck,
  ShoppingCart, Receipt, Warehouse, Settings, HelpCircle,
  ChevronDown, ChevronRight, Factory, Briefcase, UserCog, ClipboardList, Monitor,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { useBranchManagerAccess } from '@/modules/device';
import { templateMenuGroups, TemplateMenuItem } from '@/data/templateMenu';
import { SmarnetLogo, SmarnetMark } from '@/components/SmarnetLogo';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

/* ── ERP Module Groups ── */
type ErpMenuItem = {
  key: string;
  icon: React.ComponentType<{ size?: number | string }>;
  path: string;
  managerOnly?: boolean;
};

const erpGroups: {
  key: string;
  icon: React.ComponentType<{ size?: number | string }>;
  sections: { label: string | null; items: ErpMenuItem[] }[];
}[] = [
  {
    key: 'comercial',
    icon: Briefcase,
    sections: [
      {
        label: 'Cadastros',
        items: [
          { key: 'clientes', icon: Users, path: '/app/clientes' },
          { key: 'fornecedores', icon: Truck, path: '/app/fornecedores' },
        ],
      },
      {
        label: 'Movimentos',
        items: [
          { key: 'propostas', icon: ClipboardList, path: '/app/comercial/movimentos/propostas' },
          { key: 'pedidos', icon: ShoppingCart, path: '/app/pedidos' },
          { key: 'faturamento', icon: Receipt, path: '/app/faturamento' },
        ],
      },
    ],
  },
  {
    key: 'producao',
    icon: Factory,
    sections: [
      {
        label: null,
        items: [
          { key: 'estoque', icon: Warehouse, path: '/app/estoque' },
          { key: 'produtos', icon: Package, path: '/app/produtos' },
          { key: 'devices', icon: Monitor, path: '/app/devices', managerOnly: true },
        ],
      },
    ],
  },
  {
    key: 'rh',
    icon: UserCog,
    sections: [
      {
        label: null,
        items: [
          { key: 'funcionarios', icon: Building2, path: '/app/funcionarios' },
          { key: 'usuarios', icon: UserCheck, path: '/app/usuarios' },
        ],
      },
    ],
  },
];

const groupLabels: Record<string, string> = {
  comercial: 'Comercial',
  producao: 'Produção',
  rh: 'RH',
};

/* ── Badge colors ── */
const badgeColors: Record<string, string> = {
  warning: 'bg-amber-500/20 text-amber-400',
  secondary: 'bg-primary/20 text-primary',
  success: 'bg-emerald-500/20 text-emerald-400',
  destructive: 'bg-red-500/20 text-red-400',
};

/* ── Recursive menu item renderer ── */
function TemplateMenuItemRenderer({
  item,
  collapsed,
  currentPath,
  navigate,
  depth = 0,
}: {
  item: TemplateMenuItem;
  collapsed: boolean;
  currentPath: string;
  navigate: (p: string) => void;
  depth?: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === currentPath;

  // Check if any descendant is active
  const isDescendantActive = (i: TemplateMenuItem): boolean => {
    if (i.path === currentPath) return true;
    return i.children?.some(isDescendantActive) ?? false;
  };
  const childActive = hasChildren && item.children!.some(isDescendantActive);

  if (hasChildren) {
    return (
      <Collapsible defaultOpen={childActive}>
        <SidebarMenuItem>
          <CollapsibleTrigger className="w-full">
            <SidebarMenuButton className="rounded-xl justify-between w-full">
              <span className="flex items-center gap-2 truncate">
                <span className={`truncate ${depth > 0 ? 'text-xs' : 'text-sm'}`}>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${badgeColors[item.badgeColor || 'secondary']}`}>
                    {item.badge}
                  </span>
                )}
              </span>
              <ChevronRight size={12} className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenu className="pl-3 border-l border-border/30 ml-3 mt-0.5">
              {item.children!.map((child, i) => (
                <TemplateMenuItemRenderer
                  key={i}
                  item={child}
                  collapsed={collapsed}
                  currentPath={currentPath}
                  navigate={navigate}
                  depth={depth + 1}
                />
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => item.path && navigate(item.path)}
        isActive={isActive}
        className="rounded-xl"
      >
        <span className={`truncate ${depth > 0 ? 'text-xs' : 'text-sm'}`}>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/* ── Main Sidebar ── */
export function AppSidebar() {
  // Defensive: bail out if rendered outside SidebarProvider (e.g. during HMR)
  let sidebarState: 'expanded' | 'collapsed' = 'expanded';
  try {
    sidebarState = useSidebar().state;
  } catch {
    return null;
  }
  const collapsed = sidebarState === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, user } = useApp();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const { isManager: canAccessDevices } = useBranchManagerAccess();

  const visibleErpGroups = erpGroups.map((group) => ({
    ...group,
    sections: group.sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.managerOnly || canAccessDevices),
    })),
  }));

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Logo */}
      <div className="px-3 flex flex-col items-center justify-center overflow-hidden shrink-0 bg-transparent py-2">
        {collapsed ? <SmarnetMark size={40} /> : <SmarnetLogo size="xl" onDark />}
      </div>

      <SidebarContent className="px-2 pt-4 overflow-y-auto sidebar-scroll">
        {/* Dashboard */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate('/app')}
              isActive={currentPath === '/app'}
              className="rounded-xl"
            >
              <LayoutDashboard size={18} />
              {!collapsed && <span>{t('nav.dashboard', locale)}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* ── ERP Modules ── */}
        {visibleErpGroups.map((group) => {
          const groupActive = group.sections.some((s) =>
            s.items.some((item) => isActive(item.path))
          );
          return (
            <Collapsible key={group.key} defaultOpen={groupActive} className="mt-1">
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-sidebar-foreground/90">
                    <span className="flex items-center gap-2">
                      <group.icon size={16} />
                      {!collapsed && groupLabels[group.key]}
                    </span>
                    {!collapsed && <ChevronDown size={14} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {group.sections.map((section, si) => (
                    <SidebarGroupContent key={si} className="mt-1">
                      {section.label && !collapsed && (
                        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/60">
                          {section.label}
                        </p>
                      )}
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.key}>
                            <SidebarMenuButton
                              onClick={() => navigate(item.path)}
                              isActive={isActive(item.path)}
                              className="rounded-xl"
                            >
                              <item.icon size={16} />
                              {!collapsed && <span>{t(`nav.${item.key}`, locale)}</span>}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  ))}
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}

        {/* ── Separator ── */}
        <div className="my-3 mx-3 border-t border-border/20" />

        {/* ── Template Groups ── */}
        {templateMenuGroups.map((group) => (
          <div key={group.category} className="mt-1">
            {!collapsed && (
              <p className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/50">
                {group.category}
              </p>
            )}
            {group.items.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              // Check if any descendant is active
              const isDescendantActive = (i: TemplateMenuItem): boolean => {
                if (i.path === currentPath) return true;
                return i.children?.some(isDescendantActive) ?? false;
              };
              const childActive = hasChildren && item.children!.some(isDescendantActive);
              const itemActive = item.path === currentPath;

              if (!hasChildren) {
                return (
                  <SidebarMenu key={item.label}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => item.path && navigate(item.path)}
                        isActive={itemActive}
                        className="rounded-xl"
                      >
                        <item.icon size={16} />
                        {!collapsed && (
                          <span className="flex items-center gap-2">
                            {item.label}
                            {item.badge && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${badgeColors[item.badgeColor || 'secondary']}`}>
                                {item.badge}
                              </span>
                            )}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                );
              }

              return (
                <Collapsible key={item.label} defaultOpen={childActive}>
                  <SidebarGroup>
                    <CollapsibleTrigger className="w-full">
                      <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-sidebar-foreground/90">
                        <span className="flex items-center gap-2">
                          <item.icon size={16} />
                          {!collapsed && (
                            <>
                              {item.label}
                              {item.badge && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md normal-case ${badgeColors[item.badgeColor || 'secondary']}`}>
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </span>
                        {!collapsed && <ChevronDown size={14} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />}
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarGroupContent className="mt-0.5">
                        <SidebarMenu>
                          {item.children!.map((child, i) => (
                            <TemplateMenuItemRenderer
                              key={i}
                              item={child}
                              collapsed={collapsed}
                              currentPath={currentPath}
                              navigate={navigate}
                            />
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              );
            })}
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          {user?.is_branch_manager && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigate('/settings')}
                className="rounded-xl text-sidebar-foreground/80"
              >
                <Settings size={16} />
                {!collapsed && <span>Settings</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton className="rounded-xl text-sidebar-foreground/80">
              <HelpCircle size={16} />
              {!collapsed && <span>Support</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
