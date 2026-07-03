import { useEffect, useState } from 'react';
import { KeyRound, Loader2, Save, Shield, Users as UsersIcon } from 'lucide-react';
import { useSetUserGroups, useUsers } from '@/modules/admin';
import { useGroups } from '@/modules/admin/hooks/useGroups';

export default function AccessAdmin() {
  const { data: usersData, isLoading: usersLoading } = useUsers({ page: 1, page_size: 100 });
  const { data: groups, isLoading: groupsLoading } = useGroups();
  const setUserGroups = useSetUserGroups();

  const users = usersData?.items ?? [];
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [draftGroups, setDraftGroups] = useState<string[]>([]);

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  useEffect(() => {
    if (users.length === 0) {
      return;
    }
    if (selectedUserId === null || !users.some((user) => user.id === selectedUserId)) {
      setSelectedUserId(users[0].id);
      setDraftGroups(users[0].groups);
    }
  }, [users, selectedUserId]);

  const toggleGroup = (name: string) => {
    setDraftGroups((current) =>
      current.includes(name)
        ? current.filter((group) => group !== name)
        : [...current, name],
    );
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    await setUserGroups.mutateAsync({ id: selectedUser.id, groups: draftGroups });
  };

  const loading = usersLoading || groupsLoading;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
          <KeyRound size={22} className="text-amber-400" /> Controle de Acesso
        </h1>
        <p className="text-sm text-zinc-400">Atribua grupos Django aos usuários do sistema.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-zinc-400 gap-2">
          <Loader2 size={18} className="animate-spin" /> Carregando...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  setSelectedUserId(user.id);
                  setDraftGroups(user.groups);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                  selectedUser?.id === user.id
                    ? 'bg-zinc-800 border-amber-500/40'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg border bg-sky-500/15 text-sky-300 border-sky-500/30">
                    <UsersIcon size={12} />
                  </span>
                  <span className="font-semibold text-zinc-100 text-sm">{user.username}</span>
                </div>
                <p className="text-xs text-zinc-500 ml-9">
                  {user.groups.length > 0 ? user.groups.join(', ') : 'Sem grupos'}
                </p>
              </button>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-zinc-500 p-4">Nenhum usuário cadastrado.</p>
            )}
          </div>

          <div className="lg:col-span-3 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            {selectedUser ? (
              <>
                <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-100">{selectedUser.username}</h3>
                    <p className="text-xs text-zinc-500">
                      {selectedUser.is_superuser ? 'Superusuário' : 'Gerencie os grupos deste usuário'}
                    </p>
                  </div>
                  <button
                    onClick={() => void handleSave()}
                    disabled={setUserGroups.isPending}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-sm px-4 py-2 transition-colors disabled:opacity-60"
                  >
                    <Save size={14} />
                    {setUserGroups.isPending ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Grupos disponíveis</p>
                  <div className="flex flex-wrap gap-2">
                    {(groups ?? []).map((group) => (
                      <button
                        key={group.name}
                        type="button"
                        onClick={() => toggleGroup(group.name)}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border ${
                          draftGroups.includes(group.name)
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                        }`}
                      >
                        <Shield size={12} />
                        {group.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-zinc-500 text-sm">Selecione um usuário para editar grupos.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
