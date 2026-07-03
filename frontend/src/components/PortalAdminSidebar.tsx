import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, FolderTree, Layers, Newspaper, LayoutDashboard, ArrowLeftCircle,
} from 'lucide-react';
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

const adminGroups = [
  {
    label: 'Visão Geral',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/portal/admin' },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { key: 'noticias', label: 'Notícias', icon: Newspaper, path: '/portal/admin/noticias' },
      { key: 'grupos', label: 'Grupos', icon: Layers, path: '/portal/admin/grupos' },
      { key: 'menus', label: 'Menus', icon: FolderTree, path: '/portal/admin/menus' },
    ],
  },
];

export function PortalAdminSidebar() {
  let sidebarState: 'expanded' | 'collapsed' = 'expanded';
  try {
    sidebarState = useSidebar().state;
  } catch {
    return null;
  }
  const collapsed = sidebarState === 'collapsed';
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) =>
    path === '/portal/admin' ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 [&>div]:bg-zinc-900 [&_[data-sidebar=sidebar]]:bg-zinc-900"
    >
      <div className="px-4 py-5 flex items-center gap-3 bg-zinc-900 border-b border-zinc-800">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
          <Shield size={16} />
        </div>
        {!collapsed && (
          <div>
            <p className="font-display font-extrabold text-zinc-100 text-base leading-tight tracking-tight">
              Portal <span className="text-amber-400 font-extrabold">Admin</span>
            </p>
            <p className="text-[9px] font-semibold text-zinc-500 tracking-[0.15em] uppercase">
              Transparência · Nova Smar
            </p>
          </div>
        )}
      </div>

      <SidebarContent className="px-2 overflow-y-auto sidebar-scroll bg-zinc-900">
        {adminGroups.map((group) => (
          <SidebarGroup key={group.label} className="mt-2">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={active}
                        className={`rounded-xl text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-300 data-[active=true]:font-medium`}
                      >
                        <item.icon size={16} />
                        {!collapsed && <span>{item.label}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4 bg-zinc-900 border-t border-zinc-800 pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate('/portal')}
              className="rounded-xl text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
            >
              <ArrowLeftCircle size={16} />
              {!collapsed && <span>Ver portal público</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
