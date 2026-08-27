import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, Menu, Palette, LayoutDashboard } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useT } from '@/hooks/useT';
import {
  navChildIsActive,
  navRootIsActive,
  useVisibleErpNav,
  type ErpNavChild,
  type ErpNavFolder,
  type ErpNavGroup,
  type ErpNavLink,
} from '@/config/erpNavigation';
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

function NavLinkButton({
  link,
  isActive,
  onGo,
  t,
}: {
  link: ErpNavLink;
  isActive: boolean;
  onGo: (path: string) => void;
  t: (key: string) => string;
}) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild isActive={isActive} size="md">
        <button type="button" onClick={() => onGo(link.path)}>
          <span>{t(`nav.${link.key}`)}</span>
        </button>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function NavFolderBlock({
  folder,
  isPathActive,
  onGo,
  t,
}: {
  folder: ErpNavFolder;
  isPathActive: (path: string) => boolean;
  onGo: (path: string) => void;
  t: (key: string) => string;
}) {
  const folderActive = folder.children.some((link) => isPathActive(link.path));

  return (
    <Collapsible defaultOpen={folderActive} className="group/nav-folder">
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex h-7 w-full min-w-0 items-center rounded-md px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2"
          >
            <span className="flex-1 truncate text-left">{t(`nav.${folder.key}`)}</span>
            <ChevronDown
              size={12}
              className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/nav-folder:rotate-180"
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="mx-0 translate-x-0 border-l border-sidebar-border px-2 py-0.5">
            {folder.children.map((link) => (
              <NavLinkButton
                key={link.key}
                link={link}
                isActive={isPathActive(link.path)}
                onGo={onGo}
                t={t}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );
}

function NavChildList({
  nodes,
  isPathActive,
  onGo,
  t,
}: {
  nodes: ErpNavChild[];
  isPathActive: (path: string) => boolean;
  onGo: (path: string) => void;
  t: (key: string) => string;
}) {
  return (
    <SidebarMenuSub>
      {nodes.map((child) =>
        child.kind === 'folder' ? (
          <NavFolderBlock
            key={child.key}
            folder={child}
            isPathActive={isPathActive}
            onGo={onGo}
            t={t}
          />
        ) : (
          <NavLinkButton
            key={child.key}
            link={child}
            isActive={isPathActive(child.path)}
            onGo={onGo}
            t={t}
          />
        ),
      )}
    </SidebarMenuSub>
  );
}

function GroupMenuItem({
  group,
  isPathActive,
  onGo,
  t,
}: {
  group: ErpNavGroup;
  isPathActive: (path: string) => boolean;
  onGo: (path: string) => void;
  t: (key: string) => string;
}) {
  const childActive = group.children.some((child) => navChildIsActive(child, isPathActive));
  const groupActive = navRootIsActive(group, isPathActive);
  const groupLabel = t(`nav.${group.key}`);

  if (group.children.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={groupLabel}
          className="rounded-xl"
          isActive={isPathActive(group.path)}
          onClick={() => onGo(group.path)}
        >
          <group.icon size={16} />
          <span>{groupLabel}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen={groupActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={groupLabel}
            className="rounded-xl"
            isActive={groupActive && !childActive}
          >
            <group.icon size={16} />
            <span className="flex-1 truncate text-left text-[11px] font-bold uppercase tracking-wider">
              {groupLabel}
            </span>
            <ChevronDown
              size={14}
              className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NavChildList nodes={group.children} isPathActive={isPathActive} onGo={onGo} t={t} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

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
  const isPathActive = (path: string) => currentPath === path || currentPath.startsWith(`${path}/`);
  const visibleErpNav = useVisibleErpNav();
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

                {visibleErpNav.map((entry) => (
                  <SidebarMenuItem key={entry.key}>
                    <SidebarMenuButton
                      onClick={() => expandAndGo(entry.path)}
                      isActive={navRootIsActive(entry, isPathActive)}
                      tooltip={t(`nav.${entry.key}`)}
                      className="sidebar-rail-btn"
                    >
                      <entry.icon size={RAIL_ICON} strokeWidth={1.75} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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

                {visibleErpNav.map((entry) =>
                  entry.kind === 'link' ? (
                    <SidebarMenuItem key={entry.key}>
                      <SidebarMenuButton
                        onClick={() => goTo(entry.path)}
                        isActive={isPathActive(entry.path)}
                        tooltip={t(`nav.${entry.key}`)}
                        className="rounded-xl"
                      >
                        <entry.icon size={16} />
                        <span>{t(`nav.${entry.key}`)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <GroupMenuItem
                      key={entry.key}
                      group={entry}
                      isPathActive={isPathActive}
                      onGo={goTo}
                      t={t}
                    />
                  ),
                )}
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
