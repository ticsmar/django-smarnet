import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, Users, Building2, KeyRound, ServerCog, Activity,
  Database, Bell, FileText, ArrowLeftCircle, LayoutDashboard,
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
      { key: 'overview', label: 'Painel Admin', icon: LayoutDashboard, path: '/settings' },
      { key: 'activity', label: 'Atividade', icon: Activity, path: '/settings/atividade' },
    ],
  },
  {
    label: 'Gestão de Acessos',
    items: [
      { key: 'usuarios', label: 'Usuários', icon: Users, path: '/settings/usuarios' },
      { key: 'empresas', label: 'Empresas', icon: Building2, path: '/settings/empresas' },
      { key: 'acessos', label: 'Perfis de Acesso', icon: KeyRound, path: '/settings/acessos' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { key: 'sistema', label: 'Configurações', icon: ServerCog, path: '/settings/sistema' },
      { key: 'integracoes', label: 'Integrações', icon: Database, path: '/settings/integracoes' },
      { key: 'notificacoes', label: 'Notificações', icon: Bell, path: '/settings/notificacoes' },
      { key: 'logs', label: 'Logs & Auditoria', icon: FileText, path: '/settings/logs' },
    ],
  },
];

export function AdminSidebar() {
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
    path === '/settings' ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 [&>div]:bg-zinc-900 [&_[data-sidebar=sidebar]]:bg-zinc-900"
    >
      {/* Brand / Header — dark gray */}
      <div className="px-4 py-5 flex items-center gap-3 bg-zinc-900 border-b border-zinc-800">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
          <Shield size={16} />
        </div>
        {!collapsed && (
          <div>
            <p className="font-display font-extrabold text-zinc-100 text-base leading-tight tracking-tight">
              Admin <span className="text-amber-400 font-extrabold">Console</span>
            </p>
            <p className="text-[9px] font-semibold text-zinc-500 tracking-[0.15em] uppercase">
              Configurações & Gestão
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
              onClick={() => navigate('/app')}
              className="rounded-xl text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
            >
              <ArrowLeftCircle size={16} />
              {!collapsed && <span>Voltar ao ERP</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
