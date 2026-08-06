import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, Palette, LayoutDashboard } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useT } from '@/hooks/useT';
import { useVisibleErpGroups } from '@/config/erpNavigation';
import { SmarnetLogo, SmarnetMark } from '@/components/SmarnetLogo';
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
  const { user } = useApp();
  const t = useT();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const visibleErpGroups = useVisibleErpGroups();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Logo */}
      <div className="px-3 flex flex-col items-center justify-center overflow-hidden shrink-0 bg-transparent py-2">
        {collapsed ? <SmarnetMark size={40} /> : <SmarnetLogo size="xl" onDark />}
      </div>

      <SidebarContent className="px-2 pt-4 overflow-y-auto sidebar-scroll">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate('/app')}
                  isActive={currentPath === '/app'}
                  className="rounded-xl"
                >
                  <LayoutDashboard size={16} />
                  {!collapsed && <span>{t('nav.dashboard')}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate('/docs')}
                  isActive={currentPath.startsWith('/docs')}
                  className="rounded-xl"
                >
                  <BookOpen size={16} />
                  {!collapsed && <span>{t('nav.docs')}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {visibleErpGroups.map((group) => {
          const groupActive =
            currentPath.startsWith(group.path) ||
            group.sections.some((s) => s.items.some((item) => isActive(item.path)));
          return (
            <Collapsible key={group.key} defaultOpen={groupActive} className="mt-1">
              <SidebarGroup>
                <CollapsibleTrigger className="w-full">
                  <SidebarGroupLabel className="sidebar-group-label">
                    <span className="flex items-center gap-2">
                      <group.icon size={16} />
                      {!collapsed && t(`nav.${group.key}`)}
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
                              {!collapsed && <span>{t(`nav.${item.key}`)}</span>}
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
      </SidebarContent>

      {user?.is_superuser && (
        <SidebarFooter className="px-2 pb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => navigate('/design-system')}
                isActive={currentPath.startsWith('/design-system')}
                className="rounded-xl"
              >
                <Palette size={16} />
                {!collapsed && <span>{t('nav.design_system')}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
