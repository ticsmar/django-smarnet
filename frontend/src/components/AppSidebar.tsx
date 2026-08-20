import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, Menu, Palette, LayoutDashboard } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useT } from '@/hooks/useT';
import { useVisibleErpGroups } from '@/config/erpNavigation';
import { canAccessAdminDevArea } from '@/lib/adminDevAccess';
import { SmarnetLogo, SmarnetMark } from '@/components/SmarnetLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const RAIL_ICON = 18;

export function AppSidebar() {
  let sidebar: ReturnType<typeof useSidebar> | null = null;
  try {
    sidebar = useSidebar();
  } catch {
    return null;
  }

  const { state, isMobile, setOpenMobile, setOpen } = sidebar;
  const showLabels = isMobile || state === 'expanded';
  const iconRail = !isMobile && state === 'collapsed';

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const t = useT();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path || currentPath.startsWith(`${path}/`);
  const visibleErpGroups = useVisibleErpGroups();
  const showAdminDevLinks = canAccessAdminDevArea(user);

  const goTo = (path: string) => {
    navigate(path);
    if (isMobile) setOpenMobile(false);
  };

  const expandAndGo = (path: string) => {
    if (iconRail) setOpen(true);
    goTo(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div
        className={cn(
          'flex shrink-0 flex-col items-center overflow-hidden bg-transparent',
          iconRail ? 'gap-2 px-1.5 py-3' : 'px-3 py-3',
        )}
      >
        {iconRail ? (
          <>
            <SidebarTrigger
              aria-label={t('nav.menu')}
              className="h-9 w-9 rounded-xl text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Menu size={20} />
            </SidebarTrigger>
            <button
              type="button"
              onClick={() => goTo('/app')}
              className="flex h-9 w-9 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              aria-label="Smarnet"
            >
              <SmarnetMark size={28} />
            </button>
          </>
        ) : (
          <button type="button" onClick={() => goTo('/app')} className="focus:outline-none" aria-label="Smarnet">
            {showLabels ? <SmarnetLogo size="xl" onDark /> : <SmarnetMark size={28} />}
          </button>
        )}
      </div>

      <SidebarContent className={cn('sidebar-scroll overflow-y-auto pt-1', iconRail ? 'px-1.5 gap-1' : 'px-2 gap-0.5')}>
        {iconRail ? (
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="items-center gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => goTo('/app')}
                    isActive={currentPath === '/app'}
                    tooltip={t('nav.dashboard')}
                    className="sidebar-rail-btn"
                  >
                    <LayoutDashboard size={RAIL_ICON} strokeWidth={1.75} />
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {visibleErpGroups.map((group) => {
                  const groupActive =
                    currentPath === group.path ||
                    currentPath.startsWith(`${group.path}/`) ||
                    group.sections.some((s) => s.items.some((item) => isActive(item.path)));
                  return (
                    <SidebarMenuItem key={group.key}>
                      <SidebarMenuButton
                        onClick={() => expandAndGo(group.path)}
                        isActive={groupActive}
                        tooltip={t(`nav.${group.key}`)}
                        className="sidebar-rail-btn"
                      >
                        <group.icon size={RAIL_ICON} strokeWidth={1.75} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup className="p-0 gap-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => goTo('/app')}
                    isActive={currentPath === '/app'}
                    tooltip={t('nav.dashboard')}
                    className="rounded-xl"
                  >
                    <LayoutDashboard size={16} />
                    {showLabels ? <span>{t('nav.dashboard')}</span> : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {visibleErpGroups.map((group) => {
                  const groupActive =
                    currentPath === group.path ||
                    currentPath.startsWith(`${group.path}/`) ||
                    group.sections.some((s) => s.items.some((item) => isActive(item.path)));
                  const groupLabel = t(`nav.${group.key}`);

                  return (
                    <Collapsible
                      key={group.key}
                      asChild
                      defaultOpen={groupActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={groupLabel}
                            className="rounded-xl"
                            isActive={groupActive && !group.sections.some((s) =>
                              s.items.some((item) => isActive(item.path)),
                            )}
                          >
                            <group.icon size={16} />
                            <span className="flex-1 truncate text-left uppercase tracking-wider text-[11px] font-bold">
                              {groupLabel}
                            </span>
                            <ChevronDown
                              size={14}
                              className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {group.sections.map((section, si) => (
                            <div key={si}>
                              {section.label ? (
                                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">
                                  {section.label}
                                </p>
                              ) : null}
                              <SidebarMenuSub>
                                {section.items.map((item) => (
                                  <SidebarMenuSubItem key={item.key}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={isActive(item.path)}
                                      size="md"
                                    >
                                      <button type="button" onClick={() => goTo(item.path)}>
                                        <item.icon size={16} />
                                        <span>{t(`nav.${item.key}`)}</span>
                                      </button>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {showAdminDevLinks ? (
        <SidebarFooter className={cn('pb-4', iconRail ? 'px-1.5' : 'px-2')}>
          <SidebarMenu className={iconRail ? 'items-center gap-1' : undefined}>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => goTo('/design-system')}
                isActive={currentPath.startsWith('/design-system')}
                tooltip={t('nav.design_system')}
                className={iconRail ? 'sidebar-rail-btn' : 'rounded-xl'}
              >
                <Palette size={iconRail ? RAIL_ICON : 16} strokeWidth={iconRail ? 1.75 : 2} />
                {showLabels ? <span>{t('nav.design_system')}</span> : null}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => goTo('/docs')}
                isActive={currentPath.startsWith('/docs')}
                tooltip={t('nav.docs')}
                className={iconRail ? 'sidebar-rail-btn' : 'rounded-xl'}
              >
                <BookOpen size={iconRail ? RAIL_ICON : 16} strokeWidth={iconRail ? 1.75 : 2} />
                {showLabels ? <span>{t('nav.docs')}</span> : null}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
