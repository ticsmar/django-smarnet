import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  Check,
  Copy,
  KeyRound,
  Loader2,
  Plus,
  Search,
  UserRound,
  Users as UsersIcon,
  X,
} from 'lucide-react';
import { apiRequest } from '@/api/client';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useT } from '@/hooks/useT';
import { useViewMode } from '@/hooks/useViewMode';
import {
  useCreateUser,
  useResetUserPassword,
  useSetUserGroups,
  useSetUserProductPermissions,
  useUpdateUser,
  useUsers,
} from '@/modules/admin';
import { useGroups, useProductPermissions } from '@/modules/admin/hooks/useGroups';
import type { AdminProductPermission, AdminUser } from '@/modules/admin/types/adminUser';

const VIEW_STORAGE_KEY = 'smarnet:view:settings-users';

interface CompanyLookupItem {
  id: string;
  codigo: number;
  nome: string;
  reduzido: string;
  cidade: string;
  uf: string;
  tipo: string;
  status: string;
}

interface PersonLookupItem {
  id: string;
  numero: number;
  nome: string;
  email: string;
  cidade: string;
  uf: string;
  status: string;
}

interface PaginatedLookup<TItem> {
  items: TItem[];
  total: number;
  page: number;
  page_size: number;
}

function listCompanyLookup(search: string): Promise<PaginatedLookup<CompanyLookupItem>> {
  const query = new URLSearchParams({ page: '1', page_size: '30' });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedLookup<CompanyLookupItem>>(`/admin/companies/?${query.toString()}`);
}

function listPersonLookup(search: string): Promise<PaginatedLookup<PersonLookupItem>> {
  const query = new URLSearchParams({ page: '1', page_size: '30' });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedLookup<PersonLookupItem>>(`/admin/people/?${query.toString()}`);
}

const statusStyles = {
  active: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  inactive: 'bg-zinc-700/40 text-zinc-400 border border-zinc-600/40',
};

const productAccessProfiles = [
  {
    group: 'branch_managers',
    title: 'Configurar devices e tokens',
    description: 'Permite gerenciar devices e emitir tokens de filial em Configurar.',
  },
  {
    group: 'access_admins',
    title: 'Administrar usuários e acessos',
    description: 'Permite acessar Settings para gerir usuários, acessos e parâmetros do produto.',
  },
] as const;

function displayName(user: AdminUser): string {
  const full = `${user.first_name} ${user.last_name}`.trim();
  return full || user.username;
}

function formatLastLogin(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('pt-BR');
}

function productAccessSummary(groups: string[]): string {
  const labels = productAccessProfiles
    .filter((profile) => groups.includes(profile.group))
    .map((profile) => profile.title);

  if (labels.length > 0) return labels.join(', ');
  if (groups.length > 0) return 'Perfil personalizado';
  return 'Operador';
}

function displayText(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  const text = String(value).trim();
  return text || '-';
}

function userCompanyLabel(user: AdminUser): string {
  const name = (user.emp_nome || '').trim();
  if (name && user.emp_codigo != null) return `${name} (#${user.emp_codigo})`;
  if (name) return name;
  if (user.emp_codigo != null) return `#${user.emp_codigo}`;
  return 'Sem empresa';
}

function userCompanyLocation(user: AdminUser): string {
  const city = (user.emp_cidade || '').trim();
  const state = (user.emp_estado || '').trim();
  const country = (user.emp_pais_nome || '').trim();
  const local = [city, state].filter(Boolean).join(', ');
  if (local && country) return `${local} · ${country}`;
  return local || country || '-';
}

function userCompanyAddress(user: AdminUser): string {
  const parts = [user.emp_endereco, user.emp_bairro, user.emp_cep]
    .map((part) => (part || '').trim())
    .filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : '-';
}

function UserMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="truncate text-xs text-zinc-300" title={value}>
        {value}
      </p>
    </div>
  );
}

function UserCompanyBlocks({ user }: { user: AdminUser }) {
  return (
    <div className="mt-3 space-y-3">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Usuário</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <UserMetaItem label="Nome" value={displayName(user)} />
          <UserMetaItem label="E-mail" value={displayText(user.email)} />
          <UserMetaItem label="Login" value={displayText(user.username)} />
          <UserMetaItem label="País" value={displayText(user.pais_nome)} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Empresa</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <UserMetaItem label="Nome" value={userCompanyLabel(user)} />
          <UserMetaItem label="Endereço" value={userCompanyAddress(user)} />
          <UserMetaItem label="Local" value={userCompanyLocation(user)} />
          <UserMetaItem label="País" value={displayText(user.emp_pais_nome)} />
          <UserMetaItem label="Homepage" value={displayText(user.emp_homepage)} />
          <UserMetaItem
            label="Código"
            value={user.emp_codigo != null ? String(user.emp_codigo) : '-'}
          />
        </div>
      </div>
    </div>
  );
}

export default function UsersAdmin() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');
  const [createOpen, setCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formMode, setFormMode] = useState<'edit' | 'view'>('edit');
  const [editTab, setEditTab] = useState<'dados' | 'grupos' | 'acessos'>('dados');
  const [groupSearch, setGroupSearch] = useState('');
  const [permissionSearch, setPermissionSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [personSearch, setPersonSearch] = useState('');
  const [companyLookupOpen, setCompanyLookupOpen] = useState(false);
  const [personLookupOpen, setPersonLookupOpen] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [createForm, setCreateForm] = useState({
    username: '',
    password: '',
    email: '',
    groups: [] as string[],
    require_password_change: true,
  });

  const [editForm, setEditForm] = useState({
    email: '',
    groups: [] as string[],
    product_permissions: [] as string[],
    is_active: true,
    emp_codigo: '',
    pes_numero: '',
  });

  const companyLookupQuery = useQuery({
    queryKey: ['admin', 'users', 'company-lookup', companySearch],
    queryFn: () => listCompanyLookup(companySearch),
    enabled: companyLookupOpen,
  });

  const personLookupQuery = useQuery({
    queryKey: ['admin', 'users', 'person-lookup', personSearch],
    queryFn: () => listPersonLookup(personSearch),
    enabled: personLookupOpen,
  });

  const selectedCompanyQuery = useQuery({
    queryKey: ['admin', 'users', 'company-selected', editForm.emp_codigo],
    queryFn: async () => {
      const result = await listCompanyLookup(editForm.emp_codigo);
      return result.items.find((item) => String(item.codigo) === editForm.emp_codigo) ?? null;
    },
    enabled: Boolean(editForm.emp_codigo),
  });

  const selectedPersonQuery = useQuery({
    queryKey: ['admin', 'users', 'person-selected', editForm.pes_numero],
    queryFn: async () => {
      const result = await listPersonLookup(editForm.pes_numero);
      return result.items.find((item) => String(item.numero) === editForm.pes_numero) ?? null;
    },
    enabled: Boolean(editForm.pes_numero),
  });

  const { data, isLoading, error } = useUsers({ search, page, page_size: 20 });
  const { data: groups } = useGroups();
  const { data: productPermissions } = useProductPermissions();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const setUserGroups = useSetUserGroups();
  const setUserProductPermissions = useSetUserProductPermissions();
  const resetPassword = useResetUserPassword();

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.page_size));
  }, [data]);

  const fillUserForm = (user: AdminUser) => {
    setEditingUser(user);
    setEditTab('dados');
    setGroupSearch('');
    setPermissionSearch('');
    setCompanySearch('');
    setPersonSearch('');
    setEditForm({
      email: user.email,
      groups: [...user.groups],
      product_permissions: [...user.product_permissions],
      is_active: user.is_active,
      emp_codigo: user.emp_codigo ? String(user.emp_codigo) : '',
      pes_numero: user.pes_numero ? String(user.pes_numero) : '',
    });
    setTempPassword(null);
    setCopied(false);
  };

  const openEdit = (user: AdminUser) => {
    setFormMode('edit');
    fillUserForm(user);
  };

  const openView = (user: AdminUser) => {
    setFormMode('view');
    fillUserForm(user);
  };

  const isViewingUser = formMode === 'view';

  const toggleCreateGroup = (name: string) => {
    setCreateForm((current) => ({
      ...current,
      groups: current.groups.includes(name)
        ? current.groups.filter((group) => group !== name)
        : [...current.groups, name],
    }));
  };

  const toggleEditGroup = (name: string) => {
    setEditForm((current) => ({
      ...current,
      groups: current.groups.includes(name)
        ? current.groups.filter((group) => group !== name)
        : [...current.groups, name],
    }));
  };

  const toggleEditProductPermission = (value: string) => {
    setEditForm((current) => ({
      ...current,
      product_permissions: current.product_permissions.includes(value)
        ? current.product_permissions.filter((permission) => permission !== value)
        : [...current.product_permissions, value],
    }));
  };

  const handleCreate = async () => {
    if (!createForm.username || !createForm.password) return;
    await createUser.mutateAsync({
      username: createForm.username,
      password: createForm.password,
      email: createForm.email,
      groups: createForm.groups,
      require_password_change: createForm.require_password_change,
    });
    setCreateForm({
      username: '',
      password: '',
      email: '',
      groups: [],
      require_password_change: true,
    });
    setCreateOpen(false);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    const empCodigo = editForm.emp_codigo.trim();
    const pesNumero = editForm.pes_numero.trim();
    await updateUser.mutateAsync({
      id: editingUser.id,
      input: {
        email: editForm.email,
        is_active: editForm.is_active,
        emp_codigo: empCodigo ? Number(empCodigo) : null,
        pes_numero: pesNumero ? Number(pesNumero) : null,
      },
    });
    await setUserGroups.mutateAsync({
      id: editingUser.id,
      groups: editForm.groups,
    });
    await setUserProductPermissions.mutateAsync({
      id: editingUser.id,
      permissions: editForm.product_permissions,
    });
    setEditingUser(null);
  };

  const toggleUserActive = async (user: AdminUser) => {
    const nextActive = !user.is_active;
    const confirmed = window.confirm(
      nextActive
        ? `Ativar o usuário ${displayName(user)}?`
        : `Inativar o usuário ${displayName(user)}?`,
    );
    if (!confirmed) return;
    await updateUser.mutateAsync({
      id: user.id,
      input: { is_active: nextActive },
    });
  };

  const userRowActions = (user: AdminUser, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => openView(user)}
      onEdit={() => openEdit(user)}
      onInactivate={user.is_active ? () => void toggleUserActive(user) : undefined}
      onActivate={!user.is_active ? () => void toggleUserActive(user) : undefined}
    />
  );

  const handleResetPassword = async () => {
    if (!editingUser) return;
    const result = await resetPassword.mutateAsync({ id: editingUser.id });
    setTempPassword(result.temporary_password);
    setCopied(false);
  };

  const copyTempPassword = async () => {
    if (!tempPassword) return;
    await navigator.clipboard.writeText(tempPassword);
    setCopied(true);
  };

  const selectedCompany = selectedCompanyQuery.data ?? null;
  const selectedPerson = selectedPersonQuery.data ?? null;

  const applyCompanySelection = (company: CompanyLookupItem) => {
    setEditForm((current) => ({ ...current, emp_codigo: String(company.codigo) }));
    setCompanyLookupOpen(false);
  };

  const applyPersonSelection = (person: PersonLookupItem) => {
    setEditForm((current) => ({ ...current, pes_numero: String(person.numero) }));
    setPersonLookupOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
            <UsersIcon size={22} className="text-amber-400" /> Gestão de Usuários
          </h1>
          <p className="text-sm text-zinc-400">
            Cadastre, edite e-mail, perfis de acesso do produto e redefina senhas temporárias.
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-sm px-4 py-2 transition-colors"
        >
          <Plus size={16} /> Novo Usuário
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por usuário, nome ou e-mail..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>

        <div className="p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-zinc-400 gap-2">
              <Loader2 size={18} className="animate-spin" /> Carregando usuários...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-rose-300 text-sm">Falha ao carregar usuários.</div>
          ) : !data || data.items.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhum usuário encontrado.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? (
                <div className="overflow-hidden rounded-xl border border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-800/60">
                      <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
                        <th className="w-10 px-4 py-3" />
                        <th className="px-4 py-3 font-semibold">Nome</th>
                        <th className="px-4 py-3 font-semibold">E-mail</th>
                        <th className="px-4 py-3 font-semibold">Login</th>
                        <th className="px-4 py-3 font-semibold">País</th>
                        <th className="px-4 py-3 font-semibold">Empresa</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {data.items.map((user) => (
                        <tr key={user.id} className="hover:bg-zinc-800/40">
                          <td className="px-4 py-3">{userRowActions(user)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-bold">
                                {displayName(user).split(' ').map((part) => part[0]).slice(0, 2).join('')}
                              </div>
                              <p className="font-medium text-zinc-100">{displayName(user)}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-zinc-300 text-xs">{user.email || '-'}</td>
                          <td className="px-4 py-3 font-mono text-xs text-zinc-300">{user.username}</td>
                          <td className="px-4 py-3 text-zinc-300 text-xs">{user.pais_nome || '-'}</td>
                          <td className="px-4 py-3 text-zinc-300">
                            <p className="text-zinc-100">{userCompanyLabel(user)}</p>
                            <p className="text-xs text-zinc-500">{userCompanyLocation(user)}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${user.is_active ? statusStyles.active : statusStyles.inactive}`}>
                              {user.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {data.items.map((user) => (
                    <div
                      key={user.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700"
                    >
                      <div className="flex items-start gap-3">
                        {userRowActions(user)}
                        <button
                          type="button"
                          onClick={() => openView(user)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-zinc-100">{displayName(user)}</p>
                              <p className="text-xs text-zinc-500">{user.email || 'Sem e-mail'}</p>
                            </div>
                            <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${user.is_active ? statusStyles.active : statusStyles.inactive}`}>
                              {user.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                          <UserCompanyBlocks user={user} />
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                            <span>{productAccessSummary(user.groups)}</span>
                            <span>{formatLastLogin(user.last_login)}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {data.items.map((user) => (
                    <div key={user.id} className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-bold">
                          {displayName(user).split(' ').map((part) => part[0]).slice(0, 2).join('')}
                        </div>
                        <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${user.is_active ? statusStyles.active : statusStyles.inactive}`}>
                          {user.is_active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <UserCompanyBlocks user={user} />
                      <p className="mt-3 text-xs text-zinc-400">{productAccessSummary(user.groups)}</p>
                      <div className="mt-auto border-t border-zinc-800 pt-3">
                        {userRowActions(user, 'buttons')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {data && totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <button disabled={page <= 1} onClick={() => setPage((current) => current - 1)}
            className="px-3 py-1.5 rounded-lg text-sm bg-zinc-800 text-zinc-300 disabled:opacity-40">Anterior</button>
          <span className="text-sm text-zinc-400">{page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}
            className="px-3 py-1.5 rounded-lg text-sm bg-zinc-800 text-zinc-300 disabled:opacity-40">Próxima</button>
        </div>
      )}

      {createOpen && (
        <Modal title="Cadastrar Usuário" onClose={() => setCreateOpen(false)}>
          <div className="space-y-3">
            <Field label="Usuário" value={createForm.username} onChange={(v) => setCreateForm({ ...createForm, username: v })} />
            <Field label="E-mail" value={createForm.email} onChange={(v) => setCreateForm({ ...createForm, email: v })} type="email" />
            <Field label="Senha" value={createForm.password} onChange={(v) => setCreateForm({ ...createForm, password: v })} type="password" />
            <ProductAccessPicker groups={groups ?? []} selected={createForm.groups} onToggle={toggleCreateGroup} />
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={createForm.require_password_change}
                onChange={(e) => setCreateForm({ ...createForm, require_password_change: e.target.checked })}
                className="rounded border-zinc-600"
              />
              Exigir troca de senha no primeiro acesso
            </label>
          </div>
          <ModalActions
            onCancel={() => setCreateOpen(false)}
            onConfirm={() => void handleCreate()}
            confirmLabel={createUser.isPending ? 'Salvando...' : 'Cadastrar'}
            disabled={createUser.isPending}
          />
        </Modal>
      )}

      {editingUser && (
        <Modal
          title={isViewingUser ? `Visualizar: ${editingUser.username}` : `Editar: ${editingUser.username}`}
          onClose={() => setEditingUser(null)}
        >
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-zinc-800 p-1">
            <TabButton active={editTab === 'dados'} onClick={() => setEditTab('dados')}>Dados</TabButton>
            <TabButton active={editTab === 'grupos'} onClick={() => setEditTab('grupos')}>Grupos</TabButton>
            <TabButton active={editTab === 'acessos'} onClick={() => setEditTab('acessos')}>Perfil de acesso</TabButton>
          </div>

          <div className="space-y-3">
            {editTab === 'dados' ? (
              <>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Vínculo corporativo</p>
                  <p className="mt-1 text-sm text-zinc-200">
                    Chapa: <span className="font-mono">{editingUser.usu_chapa ?? '--'}</span>
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Empresa e pessoa são lidas e gravadas a partir da chapa vinculada.
                  </p>
                </div>
                <Field
                  label="E-mail"
                  value={editForm.email}
                  onChange={(v) => setEditForm({ ...editForm, email: v })}
                  type="email"
                  readOnly={isViewingUser}
                />
                <LookupField
                  label="Empresa"
                  codeLabel="Código"
                  value={editForm.emp_codigo}
                  description={selectedCompany ? `${selectedCompany.nome || selectedCompany.reduzido || '-'}${selectedCompany.cidade ? ` | ${selectedCompany.cidade}${selectedCompany.uf ? `, ${selectedCompany.uf}` : ''}` : ''}` : 'Nenhuma empresa vinculada.'}
                  loading={selectedCompanyQuery.isLoading}
                  icon={<Building2 size={14} />}
                  readOnly={isViewingUser}
                  onChange={(value) => setEditForm({ ...editForm, emp_codigo: value.replace(/\D/g, '') })}
                  onSearch={() => setCompanyLookupOpen(true)}
                  onClear={() => setEditForm({ ...editForm, emp_codigo: '' })}
                />
                <LookupField
                  label="Pessoa"
                  codeLabel="Número"
                  value={editForm.pes_numero}
                  description={selectedPerson ? `${selectedPerson.nome || '-'}${selectedPerson.email ? ` | ${selectedPerson.email}` : ''}` : 'Nenhuma pessoa vinculada.'}
                  loading={selectedPersonQuery.isLoading}
                  icon={<UserRound size={14} />}
                  readOnly={isViewingUser}
                  onChange={(value) => setEditForm({ ...editForm, pes_numero: value.replace(/\D/g, '') })}
                  onSearch={() => setPersonLookupOpen(true)}
                  onClear={() => setEditForm({ ...editForm, pes_numero: '' })}
                />
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={editForm.is_active}
                    disabled={isViewingUser}
                    onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                    className="rounded border-zinc-600 disabled:cursor-not-allowed"
                  />
                  Usuário ativo
                </label>

                {isViewingUser ? null : (
                <div className="pt-2 border-t border-zinc-800">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Redefinir senha</p>
                  <p className="text-xs text-zinc-400 mb-3">
                    Gera uma senha temporária. O usuário será obrigado a trocá-la no próximo login.
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleResetPassword()}
                    disabled={resetPassword.isPending}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 hover:border-amber-500/40"
                  >
                    <KeyRound size={14} />
                    {resetPassword.isPending ? 'Gerando...' : 'Gerar senha temporária'}
                  </button>

                  {tempPassword && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                      <p className="text-xs text-amber-200 mb-1">Senha temporária (copie e envie ao usuário):</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono text-amber-100 flex-1">{tempPassword}</code>
                        <button onClick={() => void copyTempPassword()} className="p-1.5 rounded-lg hover:bg-zinc-800 text-amber-200">
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                )}
              </>
            ) : editTab === 'grupos' ? (
              <ProductAccessPicker
                groups={groups ?? []}
                selected={editForm.groups}
                search={groupSearch}
                onSearchChange={setGroupSearch}
                onToggle={toggleEditGroup}
                disabled={isViewingUser}
              />
            ) : (
              <ProductPermissionPicker
                permissions={productPermissions ?? []}
                selected={editForm.product_permissions}
                search={permissionSearch}
                onSearchChange={setPermissionSearch}
                onToggle={toggleEditProductPermission}
                disabled={isViewingUser}
              />
            )}
          </div>
          {isViewingUser ? (
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800"
              >
                Fechar
              </button>
            </div>
          ) : (
            <ModalActions
              onCancel={() => setEditingUser(null)}
              onConfirm={() => void handleSaveEdit()}
              confirmLabel={
                updateUser.isPending || setUserGroups.isPending || setUserProductPermissions.isPending ? 'Salvando...' : 'Salvar alterações'
              }
              disabled={updateUser.isPending || setUserGroups.isPending || setUserProductPermissions.isPending}
            />
          )}
        </Modal>
      )}

      {companyLookupOpen ? (
        <LookupModal
          title="Selecionar empresa"
          search={companySearch}
          onSearchChange={setCompanySearch}
          onClose={() => setCompanyLookupOpen(false)}
        >
          <LookupList
            loading={companyLookupQuery.isLoading}
            emptyMessage="Nenhuma empresa encontrada."
            items={companyLookupQuery.data?.items ?? []}
            getKey={(item) => item.id}
            renderItem={(item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => applyCompanySelection(item)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-left transition-colors hover:border-amber-500/40 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-100">{item.nome || item.reduzido || '-'}</p>
                    <p className="text-xs font-mono text-zinc-500">{item.codigo} | {item.tipo}</p>
                  </div>
                  <span className="rounded-md border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-400">{item.status}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-400">{item.cidade || '-'}{item.uf ? `, ${item.uf}` : ''}</p>
              </button>
            )}
          />
        </LookupModal>
      ) : null}

      {personLookupOpen ? (
        <LookupModal
          title="Selecionar pessoa"
          search={personSearch}
          onSearchChange={setPersonSearch}
          onClose={() => setPersonLookupOpen(false)}
        >
          <LookupList
            loading={personLookupQuery.isLoading}
            emptyMessage="Nenhuma pessoa encontrada."
            items={personLookupQuery.data?.items ?? []}
            getKey={(item) => item.id}
            renderItem={(item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => applyPersonSelection(item)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-left transition-colors hover:border-amber-500/40 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-100">{item.nome || '-'}</p>
                    <p className="text-xs font-mono text-zinc-500">{item.numero}</p>
                  </div>
                  <span className="rounded-md border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-400">{item.status}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-400">{item.email || 'Sem e-mail'}{item.cidade ? ` | ${item.cidade}${item.uf ? `, ${item.uf}` : ''}` : ''}</p>
              </button>
            )}
          />
        </LookupModal>
      ) : null}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        active
          ? 'bg-zinc-900 text-amber-200 shadow-sm'
          : 'text-zinc-400 hover:text-zinc-200'
      }`}
    >
      {children}
    </button>
  );
}

function ModalActions({
  onCancel,
  onConfirm,
  confirmLabel,
  disabled,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800">Cancelar</button>
      <button onClick={onConfirm} disabled={disabled}
        className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-900 disabled:opacity-60">
        {confirmLabel}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60 read-only:cursor-not-allowed read-only:text-zinc-400"
      />
    </div>
  );
}

function LookupField({
  label,
  codeLabel,
  value,
  description,
  loading,
  icon,
  readOnly = false,
  onChange,
  onSearch,
  onClear,
}: {
  label: string;
  codeLabel: string;
  value: string;
  description: string;
  loading?: boolean;
  icon?: React.ReactNode;
  readOnly?: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{label}</p>
          <p className="text-[11px] text-zinc-500">{codeLabel}</p>
        </div>
        {readOnly ? null : (
          <div className="flex items-center gap-2">
            <button type="button" onClick={onSearch} className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/20">
              Pesquisar
            </button>
            <button type="button" onClick={onClear} className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800">
              Limpar
            </button>
          </div>
        )}
      </div>
      <div className="relative">
        {icon ? <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span> : null}
        <input
          type="text"
          value={value}
          readOnly={readOnly}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60 read-only:cursor-not-allowed read-only:text-zinc-400 ${icon ? 'pl-9' : ''}`}
        />
      </div>
      <div className="min-h-5 text-xs text-zinc-400">
        {loading ? 'Carregando dados vinculados...' : description}
      </div>
    </div>
  );
}

function LookupModal({
  title,
  search,
  onSearchChange,
  onClose,
  children,
}: {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"><X size={18} /></button>
        </div>
        <div className="border-b border-zinc-800 px-5 py-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar por c�digo, nome, e-mail ou cidade..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

function LookupList<TItem>({
  loading,
  emptyMessage,
  items,
  getKey,
  renderItem,
}: {
  loading: boolean;
  emptyMessage: string;
  items: TItem[];
  getKey: (item: TItem) => string;
  renderItem: (item: TItem) => React.ReactNode;
}) {
  const t = useT();
  if (loading) {
    return <div className="flex items-center justify-center py-12 text-sm text-zinc-400">{t('common.loading')}</div>;
  }

  if (items.length === 0) {
    return <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-8 text-center text-sm text-zinc-500">{emptyMessage}</div>;
  }

  return <div className="space-y-2">{items.map((item) => <div key={getKey(item)}>{renderItem(item)}</div>)}</div>;
}

const permissionActionLabels: Record<string, string> = {
  add: 'Adicionar',
  change: 'Alterar',
  delete: 'Excluir',
  view: 'Visualizar',
};

function productAreaLabel(appLabel: string): string {
  const labels: Record<string, string> = {
    purchasing_infrastructure: 'Compras',
    branch_auth_infrastructure: 'Configurar',
    commercial_infrastructure: 'Administração',
  };
  return labels[appLabel] ?? appLabel;
}

function formatModelName(model: string): string {
  return model
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function permissionTitle(permission: AdminProductPermission): string {
  const [action] = permission.codename.split('_');
  return `${permissionActionLabels[action] ?? permission.name} ${formatModelName(permission.model)}`;
}

function ProductPermissionPicker({
  permissions,
  selected,
  search,
  onSearchChange,
  onToggle,
  disabled = false,
}: {
  permissions: AdminProductPermission[];
  selected: string[];
  search: string;
  onSearchChange: (value: string) => void;
  onToggle: (value: string) => void;
  disabled?: boolean;
}) {
  const filteredPermissions = permissions.filter((permission) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    const haystack = [
      permissionTitle(permission),
      productAreaLabel(permission.app_label),
      permission.name,
      permission.codename,
      permission.value,
    ].join(' ').toLowerCase();
    return haystack.includes(term);
  });

  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Permissões do produto</label>
      <p className="mt-1 text-xs text-zinc-500">
        Mostra apenas permissões das áreas do produto. Acessos técnicos do Django continuam no admin.
      </p>
      <div className="relative mt-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por área, recurso ou permissão..."
          className="w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500/60"
        />
      </div>
      <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
        {filteredPermissions.map((permission) => (
          <button
            key={permission.value}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(permission.value)}
            className={`w-full rounded-xl border px-3 py-3 text-left transition-colors disabled:cursor-default ${
              selected.includes(permission.value)
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-100'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600'
            }`}
          >
            <span className="flex items-start gap-3">
              <span className={`mt-0.5 h-4 w-4 rounded border ${selected.includes(permission.value) ? 'border-amber-400 bg-amber-400' : 'border-zinc-500'}`} />
              <span>
                <span className="block text-sm font-semibold">{permissionTitle(permission)}</span>
                <span className="mt-0.5 block text-xs text-zinc-400">
                  {productAreaLabel(permission.app_label)} | {permission.name}
                </span>
              </span>
            </span>
          </button>
        ))}
        {permissions.length === 0 && (
          <p className="rounded-xl border border-zinc-800 bg-zinc-800/60 px-3 py-3 text-sm text-zinc-400">
            Nenhuma permissão de produto está disponível neste ambiente.
          </p>
        )}
        {permissions.length > 0 && filteredPermissions.length === 0 && (
          <p className="rounded-xl border border-zinc-800 bg-zinc-800/60 px-3 py-3 text-sm text-zinc-400">
            Nenhuma permissão encontrada para a busca.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductAccessPicker({
  groups,
  selected,
  search = '',
  onSearchChange,
  onToggle,
  disabled = false,
}: {
  groups: { name: string }[];
  selected: string[];
  search?: string;
  onSearchChange?: (value: string) => void;
  onToggle: (name: string) => void;
  disabled?: boolean;
}) {
  const availableProfiles = productAccessProfiles.filter((profile) =>
    groups.some((group) => group.name === profile.group),
  );
  const filteredProfiles = availableProfiles.filter((profile) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    const haystack = [profile.group, profile.title, profile.description].join(' ').toLowerCase();
    return haystack.includes(term);
  });

  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Acessos do produto</label>
      <p className="mt-1 text-xs text-zinc-500">
        Estes perfis controlam recursos do Smarnet. Permissões técnicas do Django continuam no admin.
      </p>
      {onSearchChange && (
        <div className="relative mt-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar grupo..."
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500/60"
          />
        </div>
      )}
      <div className="mt-3 space-y-2">
        {filteredProfiles.map((profile) => (
          <button
            key={profile.group}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(profile.group)}
            className={`w-full rounded-xl border px-3 py-3 text-left transition-colors disabled:cursor-default ${
              selected.includes(profile.group)
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-100'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600'
            }`}
          >
            <span className="flex items-start gap-3">
              <span className={`mt-0.5 h-4 w-4 rounded border ${selected.includes(profile.group) ? 'border-amber-400 bg-amber-400' : 'border-zinc-500'}`} />
              <span>
                <span className="block text-sm font-semibold">{profile.title}</span>
                <span className="mt-0.5 block text-xs text-zinc-400">{profile.description}</span>
              </span>
            </span>
          </button>
        ))}
        {availableProfiles.length === 0 && (
          <p className="rounded-xl border border-zinc-800 bg-zinc-800/60 px-3 py-3 text-sm text-zinc-400">
            Nenhum perfil de acesso do produto está disponível neste ambiente.
          </p>
        )}
        {availableProfiles.length > 0 && filteredProfiles.length === 0 && (
          <p className="rounded-xl border border-zinc-800 bg-zinc-800/60 px-3 py-3 text-sm text-zinc-400">
            Nenhum grupo encontrado para a busca.
          </p>
        )}
      </div>
    </div>
  );
}
