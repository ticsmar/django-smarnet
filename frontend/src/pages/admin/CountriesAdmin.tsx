import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Globe2, Loader2, Plus, Search, X } from 'lucide-react';
import { apiRequest } from '@/api/client';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useViewMode } from '@/hooks/useViewMode';

interface Country {
  id: string;
  pai_codigo: number;
  nome: string;
}

interface CountryOption {
  pai_codigo: number;
  nome: string;
}

type CountryForm = Omit<Country, 'id'>;

const PAGE_SIZE = 20;
const VIEW_STORAGE_KEY = 'smarnet:view:settings-paises';

function listCountries(language = 1): Promise<CountryOption[]> {
  return apiRequest<CountryOption[]>(`/admin/countries/?language=${language}`);
}

function toForm(country: Country): CountryForm {
  const { id: _id, ...form } = country;
  return form;
}

export default function CountriesAdmin() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Country | null>(null);
  const [form, setForm] = useState<CountryForm>({ pai_codigo: 0, nome: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');

  const countriesQuery = useQuery({
    queryKey: ['admin', 'countries', 1],
    queryFn: () => listCountries(1),
  });

  useEffect(() => {
    if (!countriesQuery.data) return;
    setCountries(
      countriesQuery.data.map((item) => ({
        id: String(item.pai_codigo),
        pai_codigo: item.pai_codigo,
        nome: item.nome,
      })),
    );
  }, [countriesQuery.data]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    const terms = search.trim().toLowerCase().split(/\s+/);
    return countries.filter((country) => {
      const haystack = `${country.pai_codigo} ${country.nome}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [countries, search]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredCountries.length / PAGE_SIZE)),
    [filteredCountries.length],
  );

  const paginatedCountries = useMemo(() => {
    const offset = (page - 1) * PAGE_SIZE;
    return filteredCountries.slice(offset, offset + PAGE_SIZE);
  }, [filteredCountries, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startCreate = () => {
    setSelected(null);
    setForm({ pai_codigo: 0, nome: '' });
    setFormMode('create');
    setIsFormOpen(true);
  };

  const startEdit = (country: Country) => {
    setSelected(country);
    setForm(toForm(country));
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const startView = (country: Country) => {
    setSelected(country);
    setForm(toForm(country));
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleDelete = (country: Country) => {
    const confirmed = window.confirm(
      `Apagar o país ${country.nome || country.pai_codigo}?`,
    );
    if (!confirmed) return;
    setCountries((current) => current.filter((item) => item.id !== country.id));
    if (selected?.id === country.id) {
      setIsFormOpen(false);
      setSelected(null);
    }
    showColoredToast({
      color: 'warning',
      title: 'País apagado',
      description: `${country.nome || `#${country.pai_codigo}`} removido nesta sessão. A gravação no cadastro ainda não está habilitada.`,
    });
  };

  const countryRowActions = (country: Country, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => startView(country)}
      onEdit={() => startEdit(country)}
      onDelete={() => handleDelete(country)}
      deleteLabel="Apagar"
    />
  );

  const handleSave = () => {
    if (!form.nome.trim()) return;
    if (selected) {
      const updated: Country = { ...selected, ...form, nome: form.nome.trim() };
      setCountries((current) =>
        current.map((item) => (item.id === selected.id ? updated : item)),
      );
      setSelected(updated);
      setIsFormOpen(false);
      return;
    }

    const createdCode = Math.max(0, ...countries.map((item) => item.pai_codigo)) + 1;
    const created: Country = {
      id: String(createdCode),
      pai_codigo: createdCode,
      nome: form.nome.trim(),
    };
    setCountries((current) => [created, ...current]);
    setSelected(created);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-display font-bold text-zinc-100">
            <Globe2 size={22} className="text-amber-400" /> Cadastro de Países
          </h1>
          <p className="text-sm text-zinc-400">Base de países do cadastro geral.</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
        >
          <Plus size={16} /> Novo País
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
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>

        <div className="p-5">
          {countriesQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-zinc-400">
              <Loader2 size={18} className="animate-spin" /> Carregando países...
            </div>
          ) : countriesQuery.error ? (
            <div className="py-8 text-center text-sm text-rose-300">Não foi possível carregar os países.</div>
          ) : filteredCountries.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhum país encontrado.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? (
                <CountryTable items={paginatedCountries} rowActions={countryRowActions} />
              ) : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {paginatedCountries.map((country) => (
                    <CountryListRow
                      key={country.id}
                      country={country}
                      actions={countryRowActions(country)}
                      onSelect={() => startView(country)}
                    />
                  ))}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {paginatedCountries.map((country) => (
                    <CountryCard
                      key={country.id}
                      country={country}
                      actions={countryRowActions(country, 'buttons')}
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
        <CountryFormModal
          country={selected}
          form={form}
          readOnly={formMode === 'view'}
          onChange={setForm}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      ) : null}
    </div>
  );
}

function CountryTable({
  items,
  rowActions,
}: {
  items: Country[];
  rowActions: (country: Country) => React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800/60">
          <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
            <th className="w-10 px-4 py-3" />
            <th className="px-4 py-3 font-semibold">Código</th>
            <th className="px-4 py-3 font-semibold">Nome do país</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {items.map((country) => (
            <tr key={country.id} className="hover:bg-zinc-800/40">
              <td className="px-4 py-3">
                {rowActions(country)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-400">{country.pai_codigo}</td>
              <td className="px-4 py-3 font-medium text-zinc-100">{country.nome || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CountryListRow({
  country,
  actions,
  onSelect,
}: {
  country: Country;
  actions: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700">
      <div className="flex items-start gap-3">
        {actions}
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
          <p className="font-semibold text-zinc-100">{country.nome || '-'}</p>
          <p className="font-mono text-xs text-zinc-500">{country.pai_codigo}</p>
        </button>
      </div>
    </div>
  );
}

function CountryCard({
  country,
  actions,
}: {
  country: Country;
  actions: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 font-mono text-xs font-medium text-zinc-200">
          {country.pai_codigo}
        </span>
      </div>
      <p className="font-bold text-zinc-100">{country.nome || '-'}</p>
      <div className="mt-4 border-t border-zinc-800 pt-3">
        {actions}
      </div>
    </div>
  );
}

function CountryFormModal({
  country,
  form,
  readOnly = false,
  onChange,
  onSave,
  onClose,
}: {
  country: Country | null;
  form: CountryForm;
  readOnly?: boolean;
  onChange: (form: CountryForm) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const title = country
    ? readOnly
      ? `Visualizar país ${country.pai_codigo}`
      : `Editar país ${country.pai_codigo}`
    : 'Novo país';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h2 className="font-bold text-zinc-100">{title}</h2>
            <p className="text-xs text-zinc-500">
              {readOnly ? 'Consulta do cadastro de país.' : 'Cadastro de país e nome exibido.'}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 p-5">
          {country ? (
            <Field label="Código" value={String(country.pai_codigo)} onChange={() => {}} readOnly />
          ) : null}
          <Field
            label="Nome"
            value={form.nome}
            onChange={(value) => onChange({ ...form, nome: value })}
            readOnly={readOnly}
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
              disabled={!form.nome.trim()}
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
