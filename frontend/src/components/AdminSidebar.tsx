import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, Users, Building2, KeyRound, ServerCog, Activity,
  Database, Bell, FileText, ArrowLeftCircle, LayoutDashboard,
  UserRound, Globe2, Map, UserPlus, FolderOpen,
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
      { key: 'activity', label: 'Atividade', icon: Activity, path: '/settings/activity' },
    ],
  },
  {
    label: 'Gestão de Acessos',
    items: [
      { key: 'solicitacoes', label: 'Solicitações', icon: FileText, path: '/settings/access-requests' },
      { key: 'usuarios', label: 'Usuários', icon: Users, path: '/settings/users' },
      { key: 'importar', label: 'Importar Usuário', icon: UserPlus, path: '/settings/import-users' },
      { key: 'acessos', label: 'Perfis de Acesso', icon: KeyRound, path: '/settings/access-profiles' },
    ],
  },
  {
    label: 'Cadastros',
    items: [
      { key: 'empresas', label: 'Empresas', icon: Building2, path: '/settings/masters/companies' },
      { key: 'pessoa', label: 'Pessoa', icon: UserRound, path: '/settings/masters/people' },
      { key: 'pais', label: 'País', icon: Globe2, path: '/settings/masters/countries' },
      { key: 'estado', label: 'Estado', icon: Map, path: '/settings/masters/states' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { key: 'sistema', label: 'Configurações', icon: ServerCog, path: '/settings/system' },
      { key: 'integracoes', label: 'Integrações', icon: Database, path: '/settings/integrations' },
      { key: 'notificacoes', label: 'Notificações', icon: Bell, path: '/settings/notifications' },
      { key: 'logs', label: 'Logs & Auditoria', icon: FileText, path: '/settings/logs' },
      { key: 'file-manager', label: 'Gerenciador de Arquivos', icon: FolderOpen, path: '/settings/file-manager' },
    ],
  },
];

export function AdminSidebar() {
  let sidebar: ReturnType<typeof useSidebar> | null = null;
  try {
    sidebar = useSidebar();
  } catch {
    return null;
  }
  const { state, isMobile, setOpenMobile } = sidebar;
  const showLabels = isMobile || state === 'expanded';
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) =>
    path === '/settings' ? location.pathname === path : location.pathname.startsWith(path);

  const goTo = (path: string) => {
    navigate(path);
    if (isMobile) setOpenMobile(false);
  };

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
        {showLabels ? (
          <div>
            <p className="font-display font-extrabold text-zinc-100 text-base leading-tight tracking-tight">
              Admin <span className="text-amber-400 font-extrabold">Console</span>
            </p>
            <p className="text-[9px] font-semibold text-zinc-500 tracking-[0.15em] uppercase">
              Configurações & Gestão
            </p>
          </div>
        ) : null}
      </div>

      <SidebarContent className="px-2 overflow-y-auto sidebar-scroll bg-zinc-900">
        {adminGroups.map((group) => (
          <SidebarGroup key={group.label} className="mt-2">
            {showLabels ? (
              <SidebarGroupLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                {group.label}
              </SidebarGroupLabel>
            ) : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        onClick={() => goTo(item.path)}
                        isActive={active}
                        tooltip={item.label}
                        className={`rounded-xl text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-300 data-[active=true]:font-medium`}
                      >
                        <item.icon size={16} />
                        {showLabels ? <span>{item.label}</span> : null}
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
              onClick={() => goTo('/app')}
              tooltip="Voltar ao ERP"
              className="rounded-xl text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
            >
              <ArrowLeftCircle size={16} />
              {showLabels ? <span>Voltar ao ERP</span> : null}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
