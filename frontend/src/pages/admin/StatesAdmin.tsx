import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Map, Plus, Search, X } from 'lucide-react';
import { apiRequest } from '@/api/client';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useViewMode } from '@/hooks/useViewMode';

interface CountryOption {
  pai_codigo: number;
  nome: string;
}

interface StateItem {
  id: string;
  est_codigo: number;
  pai_codigo: number;
  nome: string;
  pais_nome: string;
}

interface PaginatedStates {
  items: StateItem[];
  total: number;
  page: number;
  page_size: number;
}

type StateForm = Omit<StateItem, 'id'>;

interface ListStateParams {
  search?: string;
  pai_codigo?: string;
  page?: number;
  page_size?: number;
  language?: number;
}

const VIEW_STORAGE_KEY = 'smarnet:view:settings-estados';

function listCountries(language = 1): Promise<CountryOption[]> {
  return apiRequest<CountryOption[]>(`/admin/countries/?language=${language}`);
}

function buildQuery(params: ListStateParams): string {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.pai_codigo) query.set('pai_codigo', params.pai_codigo);
  if (params.page) query.set('page', String(params.page));
  if (params.page_size) query.set('page_size', String(params.page_size));
  if (params.language) query.set('language', String(params.language));
  const text = query.toString();
  return text ? `?${text}` : '';
}

function listStatesCatalog(params: ListStateParams): Promise<PaginatedStates> {
  return apiRequest<PaginatedStates>(`/admin/states-catalog/${buildQuery(params)}`);
}

function toForm(state: StateItem): StateForm {
  const { id: _id, ...form } = state;
  return form;
}

export default function StatesAdmin() {
  const [states, setStates] = useState<StateItem[]>([]);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<StateItem | null>(null);
  const [form, setForm] = useState<StateForm>({
    est_codigo: 0,
    pai_codigo: 0,
    nome: '',
    pais_nome: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');

  const countriesQuery = useQuery({
    queryKey: ['admin', 'countries', 1],
    queryFn: () => listCountries(1),
  });

  const statesQuery = useQuery({
    queryKey: ['admin', 'states-catalog', search, countryFilter, page],
    queryFn: () =>
      listStatesCatalog({
        search,
        pai_codigo: countryFilter === 'all' ? undefined : countryFilter,
        page,
        page_size: 20,
        language: 1,
      }),
  });

  useEffect(() => {
    if (statesQuery.data) {
      setStates(statesQuery.data.items);
    }
  }, [statesQuery.data]);

  const totalPages = useMemo(() => {
    if (!statesQuery.data) return 1;
    return Math.max(1, Math.ceil(statesQuery.data.total / statesQuery.data.page_size));
  }, [statesQuery.data]);

  const countryOptions = countriesQuery.data ?? [];

  const startCreate = () => {
    setSelected(null);
    setForm({
      est_codigo: 0,
      pai_codigo: 0,
      nome: '',
      pais_nome: '',
    });
    setFormMode('create');
    setIsFormOpen(true);
  };

  const startEdit = (state: StateItem) => {
    setSelected(state);
    setForm(toForm(state));
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const startView = (state: StateItem) => {
    setSelected(state);
    setForm(toForm(state));
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleDelete = (state: StateItem) => {
    const confirmed = window.confirm(
      `Apagar o estado ${state.nome || state.est_codigo}?`,
    );
    if (!confirmed) return;
    setStates((current) => current.filter((item) => item.id !== state.id));
    if (selected?.id === state.id) {
      setIsFormOpen(false);
      setSelected(null);
    }
    showColoredToast({
      color: 'warning',
      title: 'Estado apagado',
      description: `${state.nome || `#${state.est_codigo}`} removido nesta sessão. A gravação no cadastro ainda não está habilitada.`,
    });
  };

  const stateRowActions = (state: StateItem, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => startView(state)}
      onEdit={() => startEdit(state)}
      onDelete={() => handleDelete(state)}
      deleteLabel="Apagar"
    />
  );

  const handleSave = () => {
    if (!form.nome.trim() || !form.pai_codigo) return;

    const countryName =
      countryOptions.find((item) => item.pai_codigo === form.pai_codigo)?.nome || form.pais_nome;

    if (selected) {
      const updated: StateItem = {
        ...selected,
        ...form,
        nome: form.nome.trim(),
        pais_nome: countryName,
      };
      setStates((current) =>
        current.map((item) => (item.id === selected.id ? updated : item)),
      );
      setSelected(updated);
      setIsFormOpen(false);
      return;
    }

    const createdCode = Math.max(0, ...states.map((item) => item.est_codigo)) + 1;
    const created: StateItem = {
      id: String(createdCode),
      est_codigo: createdCode,
      pai_codigo: form.pai_codigo,
      nome: form.nome.trim(),
      pais_nome: countryName,
    };
    setStates((current) => [created, ...current]);
    setSelected(created);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-display font-bold text-zinc-100">
            <Map size={22} className="text-amber-400" /> Cadastro de Estados
          </h1>
          <p className="text-sm text-zinc-400">Base de estados do cadastro geral.</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
        >
          <Plus size={16} /> Novo Estado
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
              placeholder="Buscar por código ou nome..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <select
            value={countryFilter}
            onChange={(event) => {
              setCountryFilter(event.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-500/60 focus:outline-none sm:w-72"
          >
            <option value="all">Todos os países</option>
            {countryOptions.map((country) => (
              <option key={country.pai_codigo} value={String(country.pai_codigo)}>
                {country.nome}
              </option>
            ))}
          </select>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>

        <div className="p-5">
          {statesQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-zinc-400">
              <Loader2 size={18} className="animate-spin" /> Carregando estados...
            </div>
          ) : statesQuery.error ? (
            <div className="py-8 text-center text-sm text-rose-300">Não foi possível carregar os estados.</div>
          ) : states.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhum estado encontrado.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? (
                <StateTable items={states} rowActions={stateRowActions} />
              ) : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {states.map((state) => (
                    <StateListRow
                      key={state.id}
                      state={state}
                      actions={stateRowActions(state)}
                      onSelect={() => startView(state)}
                    />
                  ))}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {states.map((state) => (
                    <StateCard
                      key={state.id}
                      state={state}
                      actions={stateRowActions(state, 'buttons')}
                    />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-40"
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
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      ) : null}

      {isFormOpen ? (
        <StateFormModal
          state={selected}
          form={form}
          countries={countryOptions}
          readOnly={formMode === 'view'}
          onChange={setForm}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      ) : null}
    </div>
  );
}

function StateTable({
  items,
  rowActions,
}: {
  items: StateItem[];
  rowActions: (state: StateItem) => React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800/60">
          <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
            <th className="w-10 px-4 py-3" />
            <th className="px-4 py-3 font-semibold">Código</th>
            <th className="px-4 py-3 font-semibold">Estado</th>
            <th className="px-4 py-3 font-semibold">País</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {items.map((state) => (
            <tr key={state.id} className="hover:bg-zinc-800/40">
              <td className="px-4 py-3">
                {rowActions(state)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-400">{state.est_codigo}</td>
              <td className="px-4 py-3 font-medium text-zinc-100">{state.nome || '-'}</td>
              <td className="px-4 py-3 text-zinc-300">{state.pais_nome || state.pai_codigo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StateListRow({
  state,
  actions,
  onSelect,
}: {
  state: StateItem;
  actions: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700">
      <div className="flex items-start gap-3">
        {actions}
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
          <p className="font-semibold text-zinc-100">{state.nome || '-'}</p>
          <p className="text-xs text-zinc-500">{state.est_codigo} · {state.pais_nome || state.pai_codigo}</p>
        </button>
      </div>
    </div>
  );
}

function StateCard({
  state,
  actions,
}: {
  state: StateItem;
  actions: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 font-mono text-xs font-medium text-zinc-200">
          {state.est_codigo}
        </span>
      </div>
      <p className="font-bold text-zinc-100">{state.nome || '-'}</p>
      <p className="mt-1 text-xs text-zinc-500">{state.pais_nome || state.pai_codigo}</p>
      <div className="mt-4 border-t border-zinc-800 pt-3">
        {actions}
      </div>
    </div>
  );
}

function StateFormModal({
  state,
  form,
  countries,
  readOnly = false,
  onChange,
  onSave,
  onClose,
}: {
  state: StateItem | null;
  form: StateForm;
  countries: CountryOption[];
  readOnly?: boolean;
  onChange: (form: StateForm) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const title = state
    ? readOnly
      ? `Visualizar estado ${state.est_codigo}`
      : `Editar estado ${state.est_codigo}`
    : 'Novo estado';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h2 className="font-bold text-zinc-100">{title}</h2>
            <p className="text-xs text-zinc-500">
              {readOnly ? 'Consulta do cadastro de estado.' : 'Cadastro de estado vinculado ao país.'}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 p-5">
          {state ? <Field label="Código" value={String(state.est_codigo)} onChange={() => {}} readOnly /> : null}
          <Field
            label="Nome"
            value={form.nome}
            onChange={(value) => onChange({ ...form, nome: value })}
            readOnly={readOnly}
          />
          <SelectField
            label="País"
            value={form.pai_codigo ? String(form.pai_codigo) : ''}
            disabled={readOnly}
            onChange={(value) => {
              const paiCodigo = value ? Number(value) : 0;
              const countryName = countries.find((item) => item.pai_codigo === paiCodigo)?.nome || '';
              onChange({ ...form, pai_codigo: paiCodigo, pais_nome: countryName });
            }}
            options={countries.map((country) => [String(country.pai_codigo), country.nome])}
            placeholder="Selecione"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-800 px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900">
            {readOnly ? 'Fechar' : 'Cancelar'}
          </button>
          {readOnly ? null : (
            <button
              type="button"
              onClick={onSave}
              disabled={!form.nome.trim() || !form.pai_codigo}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar cadastro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-zinc-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        readOnly={readOnly}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:border-amber-500/60 focus:outline-none read-only:cursor-not-allowed read-only:text-zinc-400"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-zinc-400">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:border-amber-500/60 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-400"
      >
        <option value="">{placeholder}</option>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
