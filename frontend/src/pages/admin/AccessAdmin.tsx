import { useEffect, useMemo, useState } from 'react';
import { KeyRound, Loader2, Search, Shield, UserMinus, UserPlus, Users as UsersIcon } from 'lucide-react';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useT } from '@/hooks/useT';
import { useViewMode, type DataViewMode } from '@/hooks/useViewMode';
import { useSetUserGroups, useSetUserProductPermissions, useUsers } from '@/modules/admin';
import { useGroups, useProductPermissions } from '@/modules/admin/hooks/useGroups';
import type { AdminProductPermission, AdminUser } from '@/modules/admin/types/adminUser';

type AccessTab = 'grupos' | 'perfis';

const VIEW_STORAGE_KEY = 'smarnet:view:settings-access-profiles';

const groupDescriptions: Record<string, string> = {
  branch_managers: 'Configurar devices e tokens',
  access_admins: 'Administrar usuários e acessos',
};

function displayName(user: AdminUser): string {
  const full = `${user.first_name} ${user.last_name}`.trim();
  return full || user.username;
}

function userInitials(user: AdminUser): string {
  return displayName(user)
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function groupTitle(groupName: string): string {
  return groupDescriptions[groupName] ?? groupName;
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
    commercial_infrastructure: 'Comercial',
    administration_infrastructure: 'Administração',
    files_infrastructure: 'Arquivos',
    production_infrastructure: 'Produção',
    portal_infrastructure: 'Portal',
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

export default function AccessAdmin() {
  const t = useT();
  const { data: usersData, isLoading: usersLoading } = useUsers({ page: 1, page_size: 500 });
  const { data: groups, isLoading: groupsLoading } = useGroups();
  const { data: productPermissions, isLoading: permissionsLoading } = useProductPermissions();
  const setUserGroups = useSetUserGroups();
  const setUserProductPermissions = useSetUserProductPermissions();

  const users = usersData?.items ?? [];
  const [accessTab, setAccessTab] = useState<AccessTab>('grupos');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<string | null>(null);
  const [groupSearch, setGroupSearch] = useState('');
  const [profileSearch, setProfileSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const selectedGroupInfo = groups?.find((group) => group.name === selectedGroup) ?? null;
  const selectedPermissionInfo = productPermissions?.find((permission) => permission.value === selectedPermission) ?? null;

  useEffect(() => {
    if (!groups || groups.length === 0) {
      return;
    }
    if (selectedGroup === null || !groups.some((group) => group.name === selectedGroup)) {
      setSelectedGroup(groups[0].name);
    }
  }, [groups, selectedGroup]);

  useEffect(() => {
    if (!productPermissions || productPermissions.length === 0) {
      return;
    }
    if (selectedPermission === null || !productPermissions.some((permission) => permission.value === selectedPermission)) {
      setSelectedPermission(productPermissions[0].value);
    }
  }, [productPermissions, selectedPermission]);

  const filteredGroups = useMemo(() => {
    const term = groupSearch.trim().toLowerCase();
    const allGroups = groups ?? [];
    if (!term) return allGroups;
    return allGroups.filter((group) => {
      const haystack = [group.name, groupTitle(group.name)].join(' ').toLowerCase();
      return haystack.includes(term);
    });
  }, [groupSearch, groups]);

  const filteredPermissions = useMemo(() => {
    const term = profileSearch.trim().toLowerCase();
    const allPermissions = productPermissions ?? [];
    if (!term) return allPermissions;
    return allPermissions.filter((permission) => {
      const haystack = [
        permissionTitle(permission),
        productAreaLabel(permission.app_label),
        permission.name,
        permission.codename,
        permission.value,
      ].join(' ').toLowerCase();
      return haystack.includes(term);
    });
  }, [profileSearch, productPermissions]);

  const filteredUsers = useMemo(() => {
    const term = userSearch.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) => {
      const haystack = [displayName(user), user.username, user.email].join(' ').toLowerCase();
      return haystack.includes(term);
    });
  }, [userSearch, users]);

  const usersInGroup = selectedGroup
    ? filteredUsers.filter((user) => user.groups.includes(selectedGroup))
    : [];
  const usersOutsideGroup = selectedGroup
    ? filteredUsers.filter((user) => !user.groups.includes(selectedGroup))
    : [];
  const usersWithPermission = selectedPermission
    ? filteredUsers.filter((user) => user.product_permissions.includes(selectedPermission))
    : [];
  const usersWithoutPermission = selectedPermission
    ? filteredUsers.filter((user) => !user.product_permissions.includes(selectedPermission))
    : [];

  const setUserGroupMembership = async (user: AdminUser, shouldBelong: boolean) => {
    if (!selectedGroup) return;
    const nextGroups = shouldBelong
      ? Array.from(new Set([...user.groups, selectedGroup]))
      : user.groups.filter((group) => group !== selectedGroup);
    await setUserGroups.mutateAsync({ id: user.id, groups: nextGroups });
  };

  const setUserPermissionMembership = async (user: AdminUser, shouldBelong: boolean) => {
    if (!selectedPermission) return;
    const nextPermissions = shouldBelong
      ? Array.from(new Set([...user.product_permissions, selectedPermission]))
      : user.product_permissions.filter((permission) => permission !== selectedPermission);
    await setUserProductPermissions.mutateAsync({ id: user.id, permissions: nextPermissions });
  };

  const loading = usersLoading || groupsLoading || permissionsLoading;
  const saving = setUserGroups.isPending || setUserProductPermissions.isPending;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
          <KeyRound size={22} className="text-amber-400" /> Controle de Acesso
        </h1>
        <p className="text-sm text-zinc-400">Selecione grupos ou perfis e adicione ou remova usuários.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-zinc-400 gap-2">
          <Loader2 size={18} className="animate-spin" /> {t('common.loading')}
        </div>
      ) : (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-zinc-100">
                {accessTab === 'grupos' && selectedGroupInfo
                  ? groupTitle(selectedGroupInfo.name)
                  : accessTab === 'perfis' && selectedPermissionInfo
                    ? permissionTitle(selectedPermissionInfo)
                    : 'Selecione um acesso'}
              </h3>
              <p className="text-xs text-zinc-500">
                {accessTab === 'grupos' && selectedGroupInfo
                  ? selectedGroupInfo.name
                  : accessTab === 'perfis' && selectedPermissionInfo
                    ? `${productAreaLabel(selectedPermissionInfo.app_label)} | ${selectedPermissionInfo.value}`
                    : 'Escolha um grupo ou perfil para gerenciar usuários'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-zinc-800 p-1">
              <TabButton active={accessTab === 'grupos'} onClick={() => setAccessTab('grupos')}>Grupos</TabButton>
              <TabButton active={accessTab === 'perfis'} onClick={() => setAccessTab('perfis')}>Perfis</TabButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(18rem,24rem)_1fr] gap-4 p-5">
            {accessTab === 'grupos' ? (
              <AccessItemGrid title="Grupos" search={groupSearch} onSearchChange={setGroupSearch} searchPlaceholder="Buscar grupo...">
                {filteredGroups.map((group) => (
                  <button
                    key={group.name}
                    onClick={() => setSelectedGroup(group.name)}
                    className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                      selectedGroup === group.name
                        ? 'bg-zinc-800 border-amber-500/40'
                        : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg border bg-sky-500/15 text-sky-300 border-sky-500/30">
                        <Shield size={12} />
                      </span>
                      <span className="font-semibold text-zinc-100 text-sm">{groupTitle(group.name)}</span>
                    </div>
                    <p className="text-xs text-zinc-500 ml-9">
                      {users.filter((user) => user.groups.includes(group.name)).length} usuário(s)
                    </p>
                  </button>
                ))}
                {(groups ?? []).length === 0 && (
                  <p className="text-sm text-zinc-500 p-4">Nenhum grupo cadastrado.</p>
                )}
                {(groups ?? []).length > 0 && filteredGroups.length === 0 && (
                  <p className="text-sm text-zinc-500 p-4">Nenhum grupo encontrado.</p>
                )}
              </AccessItemGrid>
            ) : (
              <AccessItemGrid title="Perfis" search={profileSearch} onSearchChange={setProfileSearch} searchPlaceholder="Buscar perfil...">
                {filteredPermissions.map((permission) => (
                  <button
                    key={permission.value}
                    onClick={() => setSelectedPermission(permission.value)}
                    className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                      selectedPermission === permission.value
                        ? 'bg-zinc-800 border-amber-500/40'
                        : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg border bg-amber-500/15 text-amber-300 border-amber-500/30">
                        <KeyRound size={12} />
                      </span>
                      <span className="font-semibold text-zinc-100 text-sm">{permissionTitle(permission)}</span>
                    </div>
                    <p className="text-xs text-zinc-500 ml-9">
                      {productAreaLabel(permission.app_label)} | {users.filter((user) => user.product_permissions.includes(permission.value)).length} usuário(s)
                    </p>
                  </button>
                ))}
                {(productPermissions ?? []).length === 0 && (
                  <p className="text-sm text-zinc-500 p-4">Nenhum perfil cadastrado.</p>
                )}
                {(productPermissions ?? []).length > 0 && filteredPermissions.length === 0 && (
                  <p className="text-sm text-zinc-500 p-4">Nenhum perfil encontrado.</p>
                )}
              </AccessItemGrid>
            )}

            {accessTab === 'grupos' && selectedGroupInfo ? (
              <OrderedUserGrid
                selectedTitle="No grupo"
                availableTitle="Fora do grupo"
                emptySelected="Nenhum usuário neste grupo."
                emptyAvailable="Nenhum usuário disponível para adicionar."
                selectedUsers={usersInGroup}
                availableUsers={usersOutsideGroup}
                search={userSearch}
                onSearchChange={setUserSearch}
                disabled={saving}
                onRemove={(user) => void setUserGroupMembership(user, false)}
                onAdd={(user) => void setUserGroupMembership(user, true)}
              />
            ) : accessTab === 'perfis' && selectedPermissionInfo ? (
              <OrderedUserGrid
                selectedTitle="Com perfil"
                availableTitle="Sem perfil"
                emptySelected="Nenhum usuário com este perfil."
                emptyAvailable="Nenhum usuário disponível para adicionar."
                selectedUsers={usersWithPermission}
                availableUsers={usersWithoutPermission}
                search={userSearch}
                onSearchChange={setUserSearch}
                disabled={saving}
                onRemove={(user) => void setUserPermissionMembership(user, false)}
                onAdd={(user) => void setUserPermissionMembership(user, true)}
              />
            ) : (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-8 text-center text-zinc-500 text-sm">
                Selecione {accessTab === 'grupos' ? 'um grupo' : 'um perfil'} para gerenciar usuários.
              </div>
            )}

            {saving && (
              <p className="lg:col-span-2 text-xs text-amber-200">Atualizando acesso...</p>
            )}
          </div>
        </div>
      )}
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
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? 'bg-zinc-800 text-amber-200 shadow-sm'
          : 'text-zinc-400 hover:text-zinc-200'
      }`}
    >
      {children}
    </button>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500/60"
      />
    </div>
  );
}

function AccessItemGrid({
  title,
  search,
  onSearchChange,
  searchPlaceholder,
  children,
}: {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">{title}</p>
        </div>
        <SearchBox value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
      </div>
      <div className="grid gap-2 p-3 max-h-[34rem] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function OrderedUserGrid({
  selectedTitle,
  availableTitle,
  emptySelected,
  emptyAvailable,
  selectedUsers,
  availableUsers,
  search,
  onSearchChange,
  disabled,
  onRemove,
  onAdd,
}: {
  selectedTitle: string;
  availableTitle: string;
  emptySelected: string;
  emptyAvailable: string;
  selectedUsers: AdminUser[];
  availableUsers: AdminUser[];
  search: string;
  onSearchChange: (value: string) => void;
  disabled: boolean;
  onRemove: (user: AdminUser) => void;
  onAdd: (user: AdminUser) => void;
}) {
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40">
      <div className="space-y-3 border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Usuários</p>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
            <UsersIcon size={12} /> {selectedUsers.length + availableUsers.length}
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <SearchBox value={search} onChange={onSearchChange} placeholder="Buscar usuário..." />
          </div>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>
      </div>
      <div className="max-h-[34rem] space-y-4 overflow-y-auto p-3">
        <UserSection
          title={selectedTitle}
          empty={emptySelected}
          users={selectedUsers}
          viewMode={viewMode}
          actionLabel="Remover"
          actionIcon="remove"
          disabled={disabled}
          onAction={onRemove}
        />
        <UserSection
          title={availableTitle}
          empty={emptyAvailable}
          users={availableUsers}
          viewMode={viewMode}
          actionLabel="Adicionar"
          actionIcon="add"
          disabled={disabled}
          onAction={onAdd}
        />
      </div>
    </div>
  );
}

function UserActionButton({
  actionIcon,
  actionLabel,
  disabled,
  onClick,
  fullWidth = false,
}: {
  actionIcon: 'add' | 'remove';
  actionLabel: string;
  disabled: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-50 ${
        fullWidth ? 'w-full justify-center' : ''
      } ${
        actionIcon === 'add'
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400/50'
          : 'border-rose-500/30 bg-rose-500/10 text-rose-200 hover:border-rose-400/50'
      }`}
    >
      {actionIcon === 'add' ? <UserPlus size={13} /> : <UserMinus size={13} />}
      {actionLabel}
    </button>
  );
}

function UserSection({
  title,
  empty,
  users,
  viewMode,
  actionLabel,
  actionIcon,
  disabled,
  onAction,
}: {
  title: string;
  empty: string;
  users: AdminUser[];
  viewMode: DataViewMode;
  actionLabel: string;
  actionIcon: 'add' | 'remove';
  disabled: boolean;
  onAction: (user: AdminUser) => void;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{title}</p>
        <span className="text-xs text-zinc-500">{users.length}</span>
      </div>

      {users.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-sm text-zinc-500">{empty}</p>
      ) : null}

      {users.length > 0 && viewMode === 'tabela' ? (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-800/60">
              <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
                <th className="px-4 py-3 font-semibold">Usuário</th>
                <th className="px-4 py-3 font-semibold">Login</th>
                <th className="w-36 px-4 py-3 text-right font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/40">
                  <td className="px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                        {userInitials(user)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-zinc-100">{displayName(user)}</p>
                        <p className="truncate text-xs text-zinc-500">{user.email || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-300">{user.username}</td>
                  <td className="px-4 py-3 text-right">
                    <UserActionButton
                      actionIcon={actionIcon}
                      actionLabel={actionLabel}
                      disabled={disabled}
                      onClick={() => onAction(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {users.length > 0 && viewMode === 'lista' ? (
        <div className="grid gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                  {userInitials(user)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-100">{displayName(user)}</p>
                  <p className="truncate text-xs text-zinc-500">{user.email || user.username}</p>
                </div>
              </div>
              <UserActionButton
                actionIcon={actionIcon}
                actionLabel={actionLabel}
                disabled={disabled}
                onClick={() => onAction(user)}
              />
            </div>
          ))}
        </div>
      ) : null}

      {users.length > 0 && viewMode === 'cards' ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                  {userInitials(user)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-zinc-100">{displayName(user)}</p>
                  <p className="truncate text-xs text-zinc-500">{user.username}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400">{user.email || 'Sem e-mail'}</p>
              <div className="mt-4 border-t border-zinc-800 pt-3">
                <UserActionButton
                  actionIcon={actionIcon}
                  actionLabel={actionLabel}
                  disabled={disabled}
                  onClick={() => onAction(user)}
                  fullWidth
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
