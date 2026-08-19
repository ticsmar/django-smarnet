import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  Bell,
  Building2,
  ChevronRight,
  Circle,
  ClipboardList,
  Database,
  FileText,
  KeyRound,
  Loader2,
  ServerCog,
  UserPlus,
  UserRound,
  Users,
} from 'lucide-react';
import { getCurrentUser } from '@/api/auth';
import { apiRequest } from '@/api/client';
import { useApp } from '@/contexts/AppContext';
import { listUsers } from '@/modules/admin/api/adminApi';
import type { AdminUser } from '@/modules/admin/types/adminUser';

/** Janela usada como proxy de “online” (presença via last_login atualizado no /me). */
const ONLINE_WINDOW_MS = 30 * 60 * 1000;

type CountPage = {
  items: unknown[];
  total: number;
  page: number;
  page_size: number;
};

type OnlineRow = {
  id: string | number;
  username: string;
  name: string;
  company: string;
  last_login: string | null;
  isCurrent: boolean;
};

const shortcuts = [
  { label: 'Solicitações', desc: 'Triagem de pedidos de acesso', icon: ClipboardList, path: '/settings/access-requests' },
  { label: 'Cadastrar usuário', desc: 'Novo acesso ao sistema', icon: Users, path: '/settings/users' },
  { label: 'Importar usuário', desc: 'Trazer usuário do cadastro corporativo', icon: UserPlus, path: '/settings/import-users' },
  { label: 'Gerir perfis', desc: 'Permissões e papéis', icon: KeyRound, path: '/settings/access-profiles' },
  { label: 'Cadastrar empresa', desc: 'Filial ou matriz', icon: Building2, path: '/settings/masters/companies' },
  { label: 'Cadastro de pessoas', desc: 'Pessoa e contatos', icon: UserRound, path: '/settings/masters/people' },
  { label: 'Configurações do sistema', desc: 'Parâmetros globais', icon: ServerCog, path: '/settings/system' },
  { label: 'Integrações', desc: 'APIs e conectores', icon: Database, path: '/settings/integrations' },
  { label: 'Notificações', desc: 'Templates e canais', icon: Bell, path: '/settings/notifications' },
  { label: 'Logs & auditoria', desc: 'Histórico de eventos', icon: FileText, path: '/settings/logs' },
];

function displayName(user: AdminUser): string {
  const full = `${user.first_name} ${user.last_name}`.trim();
  return full || user.username;
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';
}

function isRecentlyOnline(user: AdminUser, now: number): boolean {
  if (!user.is_active || !user.last_login) return false;
  const loginAt = new Date(user.last_login).getTime();
  if (Number.isNaN(loginAt)) return false;
  return now - loginAt <= ONLINE_WINDOW_MS;
}

function formatRelativeLogin(value: string | null): string {
  if (!value) return 'agora';
  const loginAt = new Date(value).getTime();
  if (Number.isNaN(loginAt)) return 'agora';
  const diffMs = Date.now() - loginAt;
  const minutes = Math.max(0, Math.floor(diffMs / 60000));
  if (minutes < 1) return 'agora';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  return new Date(value).toLocaleString('pt-BR');
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-zinc-100">{title}</h1>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-10 text-center text-sm text-zinc-500">
        Em breve.
      </div>
    </div>
  );
}

export default function SettingsOverview() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '') || '/settings';

  if (pathname.endsWith('/activity')) {
    return (
      <PlaceholderPage
        title="Atividade"
        description="Eventos recentes da área administrativa."
      />
    );
  }

  if (pathname.endsWith('/logs')) {
    return (
      <PlaceholderPage
        title="Logs & Auditoria"
        description="Histórico de eventos e trilhas de auditoria."
      />
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { user: currentUser } = useApp();
  const now = Date.now();

  // Heartbeat: /me atualiza last_login no backend (presença).
  useQuery({
    queryKey: ['auth', 'presence-heartbeat'],
    queryFn: getCurrentUser,
    refetchInterval: 60_000,
  });

  const usersQuery = useQuery({
    queryKey: ['admin', 'users', 'dashboard', { page: 1, page_size: 100 }],
    queryFn: () => listUsers({ page: 1, page_size: 100 }),
    refetchInterval: 60_000,
  });

  const companiesQuery = useQuery({
    queryKey: ['admin', 'companies', 'dashboard-count'],
    queryFn: () => apiRequest<CountPage>('/admin/companies/?page=1&page_size=1'),
    refetchInterval: 120_000,
  });

  const peopleQuery = useQuery({
    queryKey: ['admin', 'people', 'dashboard-count'],
    queryFn: () => apiRequest<CountPage>('/admin/people/?page=1&page_size=1'),
    refetchInterval: 120_000,
  });

  const users = usersQuery.data?.items ?? [];
  const currentUsername = (currentUser?.username || '').trim().toLowerCase();

  const onlineUsers = useMemo(() => {
    const rows = new Map<string, OnlineRow>();

    for (const user of users.filter((item) => isRecentlyOnline(item, now))) {
      const key = user.username.trim().toLowerCase();
      rows.set(key, {
        id: user.id,
        username: user.username,
        name: displayName(user),
        company: (user.emp_nome || '').trim(),
        last_login: user.last_login,
        isCurrent: Boolean(currentUsername && key === currentUsername),
      });
    }

    // Garante o usuário da sessão atual na lista, mesmo se last_login ainda estiver atrasado.
    if (currentUsername) {
      const existing = rows.get(currentUsername);
      const fromList = users.find(
        (item) => item.username.trim().toLowerCase() === currentUsername,
      );
      rows.set(currentUsername, {
        id: existing?.id ?? fromList?.id ?? `current-${currentUsername}`,
        username: fromList?.username || currentUser?.username || currentUsername,
        name: fromList ? displayName(fromList) : (currentUser?.username || currentUsername),
        company: existing?.company || (fromList?.emp_nome || '').trim(),
        last_login: fromList?.last_login ?? existing?.last_login ?? new Date().toISOString(),
        isCurrent: true,
      });
    }

    return Array.from(rows.values()).sort((a, b) => {
      if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
      const aTime = a.last_login ? new Date(a.last_login).getTime() : 0;
      const bTime = b.last_login ? new Date(b.last_login).getTime() : 0;
      return bTime - aTime;
    });
  }, [users, now, currentUsername, currentUser?.username]);

  const totalUsers = usersQuery.data?.total ?? users.length;
  const activeUsers = users.filter((user) => user.is_active).length;
  const totalCompanies = companiesQuery.data?.total ?? 0;
  const totalPeople = peopleQuery.data?.total ?? 0;

  const stats = [
    {
      label: 'Usuários cadastrados',
      value: usersQuery.isLoading ? '…' : String(totalUsers),
      hint: usersQuery.isLoading ? 'Carregando…' : `${activeUsers} ativos`,
      icon: Users,
      color: 'text-sky-400',
      path: '/settings/users',
    },
    {
      label: 'Usuários online',
      value: usersQuery.isLoading ? '…' : String(onlineUsers.length),
      hint: 'Presença recente',
      icon: Circle,
      color: 'text-emerald-400',
    },
    {
      label: 'Empresas',
      value: companiesQuery.isLoading ? '…' : String(totalCompanies),
      hint: 'Cadastro geral',
      icon: Building2,
      color: 'text-amber-400',
      path: '/settings/masters/companies',
    },
    {
      label: 'Pessoas',
      value: peopleQuery.isLoading ? '…' : String(totalPeople),
      hint: 'Cadastro geral',
      icon: UserRound,
      color: 'text-violet-400',
      path: '/settings/masters/people',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100">Painel Admin</h1>
          <p className="text-sm text-zinc-400">
            Visão geral de acessos, cadastros e usuários online no Smarnet.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/settings/activity')}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 hover:border-amber-500/40 hover:text-amber-200"
        >
          <Activity size={14} />
          Ver atividade
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const content = (
            <>
              <div className="mb-3 flex items-center justify-between">
                <stat.icon size={18} className={stat.color} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {stat.hint}
                </span>
              </div>
              <p className="text-2xl font-bold text-zinc-100">{stat.value}</p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </>
          );
          if (stat.path) {
            return (
              <button
                key={stat.label}
                type="button"
                onClick={() => navigate(stat.path)}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition-colors hover:border-amber-500/40"
              >
                {content}
              </button>
            );
          }
          return (
            <div key={stat.label} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              {content}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <section className="space-y-3 xl:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Ações rápidas</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {shortcuts.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left transition-colors hover:border-amber-500/40 hover:bg-zinc-900/60"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-colors group-hover:bg-amber-500/15 group-hover:text-amber-300">
                    <item.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-100">{item.label}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-zinc-600 group-hover:text-amber-400" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-100">Usuários online</h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                Sessão ativa / último acesso recente.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {onlineUsers.length}
            </span>
          </div>

          <div className="max-h-[28rem] overflow-y-auto p-3">
            {usersQuery.isLoading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-zinc-400">
                <Loader2 size={16} className="animate-spin" />
                Carregando…
              </div>
            ) : usersQuery.isError ? (
              <p className="px-2 py-10 text-center text-sm text-rose-300">
                Não foi possível carregar os usuários.
              </p>
            ) : onlineUsers.length === 0 ? (
              <p className="px-2 py-10 text-center text-sm text-zinc-500">
                Nenhum usuário online no momento.
              </p>
            ) : (
              <ul className="space-y-2">
                {onlineUsers.map((user) => (
                  <li key={user.id}>
                    <button
                      type="button"
                      onClick={() => navigate('/settings/users')}
                      className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-950/50"
                    >
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-[11px] font-bold text-zinc-300">
                          {initials(user.name)}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-900 bg-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-zinc-100">
                          {user.name}
                          {user.isCurrent ? (
                            <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                              você
                            </span>
                          ) : null}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {user.username}
                          {user.company ? ` · ${user.company}` : ''}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-zinc-500">
                        {formatRelativeLogin(user.last_login)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-zinc-800 px-5 py-3">
            <button
              type="button"
              onClick={() => navigate('/settings/users')}
              className="text-xs font-semibold text-amber-300 hover:text-amber-200"
            >
              Ir para gestão de usuários →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
