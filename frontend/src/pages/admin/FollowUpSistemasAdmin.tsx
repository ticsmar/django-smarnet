import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Loader2, Plus, Search, X } from 'lucide-react';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useViewMode } from '@/hooks/useViewMode';
import { useT } from '@/hooks/useT';
import { ApiError } from '@/modules/followup/api';
import { useFollowUpSistemaMutations, useFollowUpSistemas } from '@/modules/followup/hooks';
import { hostEmbedFor } from '@/modules/followup/sistemas';
import type { FollowUpSistema } from '@/modules/followup/types';

type SistemaForm = {
  codigo: string;
  nome: string;
  descricao: string;
  ativo: boolean;
};

const PAGE_SIZE = 20;
const VIEW_STORAGE_KEY = 'smarnet:view:settings-follow-up';

const emptyForm: SistemaForm = { codigo: '', nome: '', descricao: '', ativo: true };

export default function FollowUpSistemasAdmin() {
  const t = useT();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<FollowUpSistema | null>(null);
  const [form, setForm] = useState<SistemaForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');
  const sistemasQuery = useFollowUpSistemas();
  const mutations = useFollowUpSistemaMutations();
  const sistemas = sistemasQuery.data;

  const filtered = useMemo(() => {
    const items = sistemas ?? [];
    if (!search.trim()) return items;
    const terms = search.trim().toLowerCase().split(/\s+/);
    return items.filter((item) => {
      const host = hostEmbedFor(item.codigo);
      const haystack = [
        item.codigo,
        item.nome,
        item.descricao,
        host?.filtroKey,
        host?.routeLabel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [sistemas, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startCreate = () => {
    setSelected(null);
    setForm(emptyForm);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const startEdit = (item: FollowUpSistema) => {
    setSelected(item);
    setForm({
      codigo: String(item.codigo),
      nome: item.nome,
      descricao: item.descricao,
      ativo: item.ativo,
    });
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const startView = (item: FollowUpSistema) => {
    startEdit(item);
    setFormMode('view');
  };

  const handleSave = async () => {
    if (!form.nome.trim()) return;
    try {
      if (selected) {
        await mutations.updateSistema.mutateAsync({
          codigo: selected.codigo,
          input: { nome: form.nome.trim(), descricao: form.descricao, ativo: form.ativo },
        });
      } else {
        const codigo = form.codigo.trim() ? Number(form.codigo) : undefined;
        await mutations.createSistema.mutateAsync({
          codigo: Number.isFinite(codigo) ? codigo : undefined,
          nome: form.nome.trim(),
          descricao: form.descricao,
          ativo: form.ativo,
        });
      }
      setIsFormOpen(false);
      showColoredToast({ color: 'success', title: t('settings.followUp.title') });
    } catch (error) {
      showColoredToast({
        color: 'destructive',
        title: error instanceof ApiError ? error.message : t('settings.followUp.error'),
      });
    }
  };

  const rowActions = (item: FollowUpSistema, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => startView(item)}
      onEdit={() => startEdit(item)}
    />
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-display font-bold text-zinc-100">
            <MessageSquare size={22} className="text-amber-400" /> {t('settings.followUp.title')}
          </h1>
          <p className="text-sm text-zinc-400">{t('settings.followUp.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
        >
          <Plus size={16} /> {t('settings.followUp.new')}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder={t('settings.followUp.search')}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>
        <div className="p-5">
          {sistemasQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-zinc-400">
              <Loader2 size={18} className="animate-spin" /> {t('settings.followUp.loading')}
            </div>
          ) : sistemasQuery.error ? (
            <div className="py-8 text-center text-sm text-rose-300">{t('settings.followUp.load_error')}</div>
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhum sistema encontrado.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? <SistemaTable items={paginated} rowActions={rowActions} /> : null}
              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {paginated.map((item) => (
                    <div key={item.codigo} className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                      <div className="flex items-start gap-3">
                        {rowActions(item)}
                        <div className="min-w-0 flex-1">
                          <button type="button" onClick={() => startView(item)} className="w-full text-left">
                            <p className="font-semibold text-zinc-100">{item.nome}</p>
                            <p className="mt-0.5 font-mono text-xs text-zinc-500">
                              {t('settings.followUp.codigo')}: {item.codigo}
                              {' · '}
                              {filtroLabel(item)}
                            </p>
                          </button>
                          <p className="mt-1 text-xs text-zinc-400">
                            <HostUsage item={item} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {paginated.map((item) => (
                    <div key={item.codigo} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
                      <p className="font-bold text-zinc-100">{item.nome}</p>
                      <p className="mt-1 font-mono text-xs text-zinc-400">
                        {t('settings.followUp.codigo')}: {item.codigo}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">{filtroLabel(item)}</p>
                      <p className="mt-1 text-sm text-zinc-400">
                        <HostUsage item={item} />
                      </p>
                      <div className="mt-4 border-t border-zinc-800 pt-3">{rowActions(item, 'buttons')}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-end gap-2">
          <button type="button" disabled={page <= 1} onClick={() => setPage((n) => n - 1)} className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-40">
            Anterior
          </button>
          <span className="text-sm text-zinc-400">{page} / {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((n) => n + 1)} className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-40">
            Próxima
          </button>
        </div>
      ) : null}

      {isFormOpen ? (
        <SistemaFormModal
          selected={selected}
          form={form}
          readOnly={formMode === 'view'}
          onChange={setForm}
          onSave={() => void handleSave()}
          onClose={() => setIsFormOpen(false)}
        />
      ) : null}
    </div>
  );
}

function filtroLabel(item: FollowUpSistema): string {
  return hostEmbedFor(item.codigo)?.filtroKey ?? item.descricao ?? '—';
}

function HostUsage({ item }: { item: FollowUpSistema }) {
  const t = useT();
  const host = hostEmbedFor(item.codigo);
  if (host?.route && host.routeLabel) {
    return (
      <Link
        to={host.route}
        className="text-amber-400 hover:underline"
        onClick={(event) => event.stopPropagation()}
      >
        {host.routeLabel}
      </Link>
    );
  }
  return <span>{t('settings.followUp.reserved')}</span>;
}

function SistemaTable({
  items,
  rowActions,
}: {
  items: FollowUpSistema[];
  rowActions: (item: FollowUpSistema) => React.ReactNode;
}) {
  const t = useT();
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800/60">
          <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
            <th className="w-10 px-4 py-3" />
            <th className="px-4 py-3 font-semibold">{t('settings.followUp.col.sistema')}</th>
            <th className="px-4 py-3 font-semibold">{t('settings.followUp.col.codigo')}</th>
            <th className="px-4 py-3 font-semibold">{t('settings.followUp.col.filtro')}</th>
            <th className="px-4 py-3 font-semibold">{t('settings.followUp.col.host')}</th>
            <th className="px-4 py-3 font-semibold">{t('settings.followUp.col.ativo')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {items.map((item) => (
            <tr key={item.codigo} className="hover:bg-zinc-800/40">
              <td className="px-4 py-3">{rowActions(item)}</td>
              <td className="px-4 py-3 font-medium text-zinc-100">{item.nome}</td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-400">{item.codigo}</td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-400">{filtroLabel(item)}</td>
              <td className="px-4 py-3 text-zinc-300">
                <HostUsage item={item} />
              </td>
              <td className="px-4 py-3 text-zinc-400">{item.ativo ? t('settings.followUp.yes') : t('settings.followUp.no')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SistemaFormModal({
  selected,
  form,
  readOnly,
  onChange,
  onSave,
  onClose,
}: {
  selected: FollowUpSistema | null;
  form: SistemaForm;
  readOnly: boolean;
  onChange: (form: SistemaForm) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const t = useT();
  const host = selected ? hostEmbedFor(selected.codigo) : undefined;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h2 className="font-bold text-zinc-100">
            {selected ? selected.nome : t('settings.followUp.new')}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900">
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-4 p-5">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">{t('settings.followUp.col.codigo')}</span>
            <input
              value={form.codigo}
              onChange={(event) => onChange({ ...form, codigo: event.target.value })}
              readOnly={readOnly || selected != null}
              placeholder={selected ? undefined : t('settings.followUp.codigoHint')}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 read-only:text-zinc-400"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">{t('settings.followUp.col.sistema')}</span>
            <input
              value={form.nome}
              onChange={(event) => onChange({ ...form, nome: event.target.value })}
              readOnly={readOnly}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">{t('settings.followUp.col.descricao')}</span>
            <input
              value={form.descricao}
              onChange={(event) => onChange({ ...form, descricao: event.target.value })}
              readOnly={readOnly}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
            />
          </label>
          {selected ? (
            <div className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-sm">
              <div className="grid gap-1">
                <span className="text-zinc-400">{t('settings.followUp.col.filtro')}</span>
                <p className="font-mono text-zinc-200">{host?.filtroKey ?? filtroLabel(selected)}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-zinc-400">{t('settings.followUp.col.host')}</span>
                <p className="text-zinc-200">
                  <HostUsage item={selected} />
                </p>
              </div>
            </div>
          ) : null}
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={form.ativo}
              disabled={readOnly}
              onChange={(event) => onChange({ ...form, ativo: event.target.checked })}
            />
            {t('settings.followUp.col.ativo')}
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-zinc-800 px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
            {readOnly ? 'Fechar' : 'Cancelar'}
          </button>
          {readOnly ? null : (
            <button
              type="button"
              onClick={onSave}
              disabled={!form.nome.trim()}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 disabled:opacity-50"
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
