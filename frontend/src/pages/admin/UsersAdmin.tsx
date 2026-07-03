import { useMemo, useState } from 'react';
import {
  Plus, Search, Shield, Users as UsersIcon, X, Loader2, Pencil, KeyRound, Copy, Check,
} from 'lucide-react';
import {
  useCreateUser,
  useResetUserPassword,
  useSetUserGroups,
  useUpdateUser,
  useUsers,
} from '@/modules/admin';
import { useGroups } from '@/modules/admin/hooks/useGroups';
import type { AdminUser } from '@/modules/admin/types/adminUser';

const statusStyles = {
  active: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  inactive: 'bg-zinc-700/40 text-zinc-400 border border-zinc-600/40',
};

function displayName(user: AdminUser): string {
  const full = `${user.first_name} ${user.last_name}`.trim();
  return full || user.username;
}

function formatLastLogin(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('pt-BR');
}

function groupLabel(groups: string[]): string {
  if (groups.includes('access_admins')) return 'Admin';
  if (groups.includes('branch_managers')) return 'Gestor';
  if (groups.length === 0) return 'Operador';
  return groups[0];
}

export default function UsersAdmin() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
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
    is_active: true,
  });

  const { data, isLoading, error } = useUsers({ search, page, page_size: 20 });
  const { data: groups } = useGroups();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const setUserGroups = useSetUserGroups();
  const resetPassword = useResetUserPassword();

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.page_size));
  }, [data]);

  const openEdit = (user: AdminUser) => {
    setEditingUser(user);
    setEditForm({
      email: user.email,
      groups: [...user.groups],
      is_active: user.is_active,
    });
    setTempPassword(null);
    setCopied(false);
  };

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
    await updateUser.mutateAsync({
      id: editingUser.id,
      input: {
        email: editForm.email,
        is_active: editForm.is_active,
      },
    });
    await setUserGroups.mutateAsync({
      id: editingUser.id,
      groups: editForm.groups,
    });
    setEditingUser(null);
  };

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

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
            <UsersIcon size={22} className="text-amber-400" /> Gestão de Usuários
          </h1>
          <p className="text-sm text-zinc-400">
            Cadastre, edite e-mail, grupos e redefina senhas temporárias.
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-sm px-4 py-2 transition-colors"
        >
          <Plus size={16} /> Novo Usuário
        </button>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-3">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por usuário, nome ou e-mail..."
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500/60"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-zinc-400 gap-2">
            <Loader2 size={18} className="animate-spin" /> Carregando usuários...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-rose-300 text-sm">Falha ao carregar usuários.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-800/60">
              <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
                <th className="px-4 py-3 font-semibold">Usuário</th>
                <th className="px-4 py-3 font-semibold">Grupos</th>
                <th className="px-4 py-3 font-semibold">Perfil</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Último acesso</th>
                <th className="px-4 py-3 font-semibold w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {data?.items.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 text-xs font-bold">
                        {displayName(user).split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-100">{displayName(user)}</p>
                        <p className="text-xs text-zinc-500">{user.email || user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-300 text-xs">
                    {user.groups.length > 0 ? user.groups.join(', ') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold bg-sky-500/15 text-sky-300">
                      <Shield size={10} /> {user.is_superuser ? 'Superuser' : groupLabel(user.groups)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${user.is_active ? statusStyles.active : statusStyles.inactive}`}>
                      {user.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">{formatLastLogin(user.last_login)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEdit(user)}
                      className="p-1.5 rounded-md text-zinc-500 hover:text-amber-300 hover:bg-zinc-800"
                      title="Editar usuário"
                    >
                      <Pencil size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {data && data.items.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-zinc-500 text-sm">Nenhum usuário encontrado.</td></tr>
              )}
            </tbody>
          </table>
        )}
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
            <GroupPicker groups={groups ?? []} selected={createForm.groups} onToggle={toggleCreateGroup} />
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
        <Modal title={`Editar: ${editingUser.username}`} onClose={() => setEditingUser(null)}>
          <div className="space-y-3">
            <Field label="E-mail" value={editForm.email} onChange={(v) => setEditForm({ ...editForm, email: v })} type="email" />
            <GroupPicker groups={groups ?? []} selected={editForm.groups} onToggle={toggleEditGroup} />
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={editForm.is_active}
                onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                className="rounded border-zinc-600"
              />
              Usuário ativo
            </label>

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
          </div>
          <ModalActions
            onCancel={() => setEditingUser(null)}
            onConfirm={() => void handleSaveEdit()}
            confirmLabel={
              updateUser.isPending || setUserGroups.isPending ? 'Salvando...' : 'Salvar alterações'
            }
            disabled={updateUser.isPending || setUserGroups.isPending}
          />
        </Modal>
      )}
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
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60"
      />
    </div>
  );
}

function GroupPicker({
  groups,
  selected,
  onToggle,
}: {
  groups: { name: string }[];
  selected: string[];
  onToggle: (name: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Grupos</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {groups.map((group) => (
          <button
            key={group.name}
            type="button"
            onClick={() => onToggle(group.name)}
            className={`px-3 py-1 rounded-lg text-xs border ${
              selected.includes(group.name)
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400'
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
}
