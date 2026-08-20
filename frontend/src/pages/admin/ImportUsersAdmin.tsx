import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2, Search, UserPlus, X } from 'lucide-react';
import { apiRequest } from '@/api/client';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useViewMode } from '@/hooks/useViewMode';

const VIEW_STORAGE_KEY = 'smarnet:view:settings-import-users';

interface OracleImportUser {
  usu_chapa: number;
  usu_login: string;
  usu_nome: string;
  usu_loginweb: string;
  usu_email: string;
  emp_codigo: number | null;
  pes_numero: number | null;
  imported: boolean;
  django_user_id: number | null;
  django_username: string | null;
}

interface PaginatedOracleUsers {
  items: OracleImportUser[];
  total: number;
  page: number;
  page_size: number;
}

interface ImportResult {
  usu_chapa: number;
  username: string;
  email: string;
  django_user_id: number;
  temporary_password: string;
  email_sent: boolean;
  detail?: string;
}

function listOracleUsers(search: string, page: number): Promise<PaginatedOracleUsers> {
  const query = new URLSearchParams({
    page: String(page),
    page_size: '25',
  });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedOracleUsers>(`/admin/oracle-users/?${query.toString()}`);
}

function importOracleUser(usuChapa: number): Promise<ImportResult> {
  return apiRequest<ImportResult>(`/admin/oracle-users/${usuChapa}/import/`, {
    method: 'POST',
  });
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

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 m-4 max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-zinc-200">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ImportUsersAdmin() {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');
  const [pendingImport, setPendingImport] = useState<OracleImportUser | null>(null);
  const [viewingUser, setViewingUser] = useState<OracleImportUser | null>(null);

  const listQuery = useQuery({
    queryKey: ['admin', 'oracle-users', search, page],
    queryFn: () => listOracleUsers(search, page),
  });

  const importMutation = useMutation({
    mutationFn: importOracleUser,
    onSuccess: (result) => {
      setPendingImport(null);
      void queryClient.invalidateQueries({ queryKey: ['admin', 'oracle-users'] });
      if (result.email_sent) {
        showColoredToast({
          color: 'success',
          title: 'Usuário importado',
          description: `Login ${result.username}. Senha enviada para ${result.email}.`,
        });
      } else {
        showColoredToast({
          color: 'warning',
          title: 'Importado (e-mail falhou)',
          description:
            result.detail
            || `Usuário ${result.username}. Senha provisória: ${result.temporary_password}`,
          duration: 12000,
        });
      }
    },
    onError: (error: Error) => {
      showColoredToast({
        color: 'destructive',
        title: 'Falha na importação',
        description: error.message || 'Não foi possível importar o usuário.',
      });
    },
  });

  const items = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;
  const pageSize = listQuery.data?.page_size ?? 25;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const subtitle = useMemo(() => {
    if (listQuery.isLoading) return 'Carregando usuários Oracle ativos…';
    return `${total} usuário(s) ativo(s)`;
  }, [listQuery.isLoading, total]);

  const pendingLogin = pendingImport
    ? (pendingImport.usu_loginweb || pendingImport.usu_login || String(pendingImport.usu_chapa))
    : '';
  const pendingName = pendingImport ? (pendingImport.usu_nome || pendingLogin) : '';

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function confirmImport() {
    if (!pendingImport || importMutation.isPending) return;
    importMutation.mutate(pendingImport.usu_chapa);
  }

  const importRowActions = (row: OracleImportUser, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => setViewingUser(row)}
      onEdit={!row.imported ? () => setPendingImport(row) : undefined}
      editLabel="Importar"
      editIcon={UserPlus}
    />
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
          <UserPlus size={22} className="text-amber-400" /> Importar Usuário
        </h1>
        <p className="text-sm text-zinc-400">
          Pesquisa usuários ativos no cadastro corporativo e importa para o Smarnet.
        </p>
        <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Buscar por chapa, login, nome ou e-mail..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
          >
            <Search size={16} />
            Buscar
          </button>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </form>

        <div className="p-5">
          {listQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-zinc-400">
              <Loader2 size={18} className="animate-spin" /> Carregando usuários...
            </div>
          ) : listQuery.isError ? (
            <div className="py-8 text-center text-sm text-rose-300">Falha ao carregar usuários.</div>
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhum usuário ativo encontrado.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? (
                <div className="overflow-hidden rounded-xl border border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-800/60">
                      <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
                        <th className="w-10 px-4 py-3" />
                        <th className="px-4 py-3 font-semibold">Usuário</th>
                        <th className="px-4 py-3 font-semibold">Chapa</th>
                        <th className="px-4 py-3 font-semibold">Login</th>
                        <th className="px-4 py-3 font-semibold">E-mail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {items.map((row) => {
                        const login = row.usu_loginweb || row.usu_login || '—';
                        const name = row.usu_nome || login;
                        return (
                          <tr key={row.usu_chapa} className="hover:bg-zinc-800/40">
                            <td className="px-4 py-3">
                              {importRowActions(row)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                                  {initials(name)}
                                </div>
                                <div>
                                  <p className="font-medium text-zinc-100">{name}</p>
                                  <p className="text-xs text-zinc-500">
                                    {row.django_username ? `Smarnet: ${row.django_username}` : 'Corporativo'}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-zinc-300">{row.usu_chapa}</td>
                            <td className="px-4 py-3 font-mono text-xs text-zinc-300">{login}</td>
                            <td className="px-4 py-3 text-xs text-zinc-400">{row.usu_email || '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {items.map((row) => {
                    const login = row.usu_loginweb || row.usu_login || '—';
                    const name = row.usu_nome || login;
                    return (
                      <div
                        key={row.usu_chapa}
                        className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4"
                      >
                        {importRowActions(row)}
                        <button
                          type="button"
                          onClick={() => setViewingUser(row)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-zinc-100">{name}</p>
                              <p className="text-xs text-zinc-500">
                                Chapa {row.usu_chapa} · {login}
                              </p>
                            </div>
                            {row.imported ? (
                              <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                                <Check size={11} /> Importado
                              </span>
                            ) : null}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((row) => {
                    const login = row.usu_loginweb || row.usu_login || '—';
                    const name = row.usu_nome || login;
                    return (
                      <div key={row.usu_chapa} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-bold text-zinc-300">
                            {initials(name)}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-100">{name}</p>
                            <p className="text-xs text-zinc-500">{login}</p>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400">Chapa {row.usu_chapa}</p>
                        <p className="mt-1 text-xs text-zinc-500">{row.usu_email || 'Sem e-mail'}</p>
                        {row.imported ? (
                          <span className="mt-3 inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                            <Check size={11} /> Importado
                          </span>
                        ) : null}
                        <div className="mt-4 border-t border-zinc-800 pt-3">
                          {importRowActions(row, 'buttons')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="px-3 py-1.5 rounded-lg text-sm bg-zinc-800 text-zinc-300 disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-sm text-zinc-400">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="px-3 py-1.5 rounded-lg text-sm bg-zinc-800 text-zinc-300 disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      )}

      {viewingUser ? (
        <Modal title={`Visualizar: ${viewingUser.usu_nome || viewingUser.usu_loginweb || viewingUser.usu_login || viewingUser.usu_chapa}`} onClose={() => setViewingUser(null)}>
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Nome</dt>
              <dd className="mt-1 text-zinc-100">{viewingUser.usu_nome || '—'}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Chapa</dt>
              <dd className="mt-1 font-mono text-zinc-200">{viewingUser.usu_chapa}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Login</dt>
              <dd className="mt-1 font-mono text-zinc-200">{viewingUser.usu_loginweb || viewingUser.usu_login || '—'}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">E-mail</dt>
              <dd className="mt-1 text-zinc-200">{viewingUser.usu_email || '—'}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Empresa</dt>
              <dd className="mt-1 font-mono text-zinc-200">{viewingUser.emp_codigo ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Pessoa</dt>
              <dd className="mt-1 font-mono text-zinc-200">{viewingUser.pes_numero ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Status</dt>
              <dd className="mt-1 text-zinc-200">
                {viewingUser.imported
                  ? `Importado${viewingUser.django_username ? ` (${viewingUser.django_username})` : ''}`
                  : 'Pendente de importação'}
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setViewingUser(null)}
              className="px-4 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Fechar
            </button>
            {!viewingUser.imported ? (
              <button
                type="button"
                onClick={() => {
                  setPendingImport(viewingUser);
                  setViewingUser(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-900"
              >
                <UserPlus size={14} /> Importar
              </button>
            ) : null}
          </div>
        </Modal>
      ) : null}

      {pendingImport && (
        <Modal title="Confirmar importação" onClose={() => !importMutation.isPending && setPendingImport(null)}>
          <p className="text-sm text-zinc-300">
            Importar o usuário{' '}
            <span className="font-semibold text-zinc-100">{pendingName}</span>
            {' '}(chapa <span className="font-mono text-amber-300">{pendingImport.usu_chapa}</span>)?
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-zinc-400 list-disc list-inside">
            <li>Login: <span className="font-mono text-zinc-200">{pendingLogin}</span></li>
            {pendingImport.usu_email ? (
              <li>E-mail: <span className="text-zinc-200">{pendingImport.usu_email}</span></li>
            ) : null}
            <li>Cria o usuário no Smarnet e vincula a chapa no perfil.</li>
            <li>Envia a senha provisória por e-mail.</li>
          </ul>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              disabled={importMutation.isPending}
              onClick={() => setPendingImport(null)}
              className="px-4 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={importMutation.isPending}
              onClick={confirmImport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-900 disabled:opacity-60"
            >
              {importMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
              {importMutation.isPending ? 'Importando…' : 'Confirmar importação'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
