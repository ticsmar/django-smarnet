import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Loader2, MapPin, Plus, Search, X } from 'lucide-react';
import { apiRequest } from '@/api/client';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useT } from '@/hooks/useT';
import { useViewMode } from '@/hooks/useViewMode';

interface Company {
  id: string;
  codigo: number;
  nome: string;
  reduzido: string;
  acesso: 'T' | 'P';
  tipo: 'S' | 'C' | 'F';
  endereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  estCodigo: string;
  pais: string;
  homepage: string;
  fabricaPadrao: string;
  listaPreco: string;
  descontoPadrao: string;
  status: 'Ativa' | 'Inativa';
  cliente: boolean;
  fornecedor: boolean;
}

interface CountryOption {
  pai_codigo: number;
  nome: string;
}

interface StateOption {
  est_codigo: number;
  pai_codigo: number;
  nome: string;
}
type CompanyForm = Omit<Company, 'id' | 'codigo'>;
type CompanyFormTab = 'empresa' | 'relacionadas';
type RelatedCompanyKind = 'EMP_CLI' | 'EMP_FOR';

interface RelatedCompany {
  codigo: number;
  nome: string;
  tipo: RelatedCompanyKind;
  isDefault: boolean;
}

interface PaginatedCompanies {
  items: Company[];
  total: number;
  page: number;
  page_size: number;
}

interface ListCompaniesParams {
  search?: string;
  status?: 'Ativa' | 'Inativa';
  page?: number;
  page_size?: number;
}

const VIEW_STORAGE_KEY = 'smarnet:view:settings-empresas';

const emptyForm: CompanyForm = {
  nome: '',
  reduzido: '',
  acesso: 'P',
  tipo: 'C',
  endereco: '',
  bairro: '',
  cep: '',
  cidade: '',
  uf: 'SP',
  estCodigo: '',
  pais: '76',
  homepage: '',
  fabricaPadrao: '',
  listaPreco: '',
  descontoPadrao: '0',
  status: 'Ativa',
  cliente: true,
  fornecedor: false,
};

function buildQuery(params: ListCompaniesParams): string {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);
  if (params.page) query.set('page', String(params.page));
  if (params.page_size) query.set('page_size', String(params.page_size));
  const text = query.toString();
  return text ? `?${text}` : '';
}

function listCompanies(params: ListCompaniesParams): Promise<PaginatedCompanies> {
  return apiRequest<PaginatedCompanies>(`/admin/companies/${buildQuery(params)}`);
}

function listCountries(language = 1): Promise<CountryOption[]> {
  return apiRequest<CountryOption[]>(`/admin/countries/?language=${language}`);
}

function listStates(paiCodigo: string): Promise<StateOption[]> {
  if (!paiCodigo) return Promise.resolve([]);
  return apiRequest<StateOption[]>(`/admin/states/?pai_codigo=${paiCodigo}`);
}

function acessoLabel(value: Company['acesso']): string {
  return value === 'T' ? 'Total' : 'Parcial';
}

function tipoLabel(value: Company['tipo']): string {
  if (value === 'S') return 'Smar';
  if (value === 'C') return 'Cliente';
  return 'Fornecedor';
}

function toForm(company: Company): CompanyForm {
  const { id: _id, codigo: _codigo, ...form } = company;
  return form;
}

export default function CompaniesAdmin() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Ativa' | 'Inativa'>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Company | null>(null);
  const [form, setForm] = useState<CompanyForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');

  const companiesQuery = useQuery({
    queryKey: ['admin', 'companies', search, statusFilter, page],
    queryFn: () =>
      listCompanies({
        search,
        status: statusFilter === 'all' ? undefined : statusFilter,
        page,
        page_size: 20,
      }),
  });

  useEffect(() => {
    if (companiesQuery.data) {
      setCompanies(companiesQuery.data.items);
    }
  }, [companiesQuery.data]);

  const totalPages = useMemo(() => {
    if (!companiesQuery.data) return 1;
    return Math.max(1, Math.ceil(companiesQuery.data.total / companiesQuery.data.page_size));
  }, [companiesQuery.data]);

  const startCreate = () => {
    setSelected(null);
    setForm(emptyForm);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const startEdit = (company: Company) => {
    setSelected(company);
    setForm(toForm(company));
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const startView = (company: Company) => {
    setSelected(company);
    setForm(toForm(company));
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleInactivate = (company: Company) => {
    if (company.status !== 'Ativa') return;
    const confirmed = window.confirm(
      `Inativar a empresa ${company.nome || company.codigo}?`,
    );
    if (!confirmed) return;
    setCompanies((current) =>
      current.map((item) =>
        item.id === company.id ? { ...item, status: 'Inativa' } : item,
      ),
    );
    showColoredToast({
      color: 'warning',
      title: 'Empresa inativada',
      description: `${company.nome || `#${company.codigo}`} marcada como inativa nesta sessão. A gravação no cadastro ainda não está habilitada.`,
    });
  };

  const companyRowActions = (company: Company, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => startView(company)}
      onEdit={() => startEdit(company)}
      onInactivate={
        company.status === 'Ativa' ? () => handleInactivate(company) : undefined
      }
    />
  );

  const handleSave = () => {
    if (!form.nome.trim()) return;
    if (selected) {
      const updated = { ...selected, ...form };
      setCompanies((current) =>
        current.map((company) => (company.id === selected.id ? updated : company)),
      );
      setSelected(updated);
      setIsFormOpen(false);
      return;
    }
    const created: Company = {
      id: String(Date.now()),
      codigo: Math.max(...companies.map((company) => company.codigo), 1000) + 1,
      ...form,
    };
    setCompanies((current) => [created, ...current]);
    setSelected(created);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-display font-bold text-zinc-100">
            <Building2 size={22} className="text-amber-400" /> Cadastro de Empresas
          </h1>
          <p className="text-sm text-zinc-400">
            Empresa, cliente e fornecedor no mesmo cadastro operacional.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
        >
          <Plus size={16} /> Nova Empresa
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Buscar por código, nome, cidade ou tipo..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as 'all' | 'Ativa' | 'Inativa');
              setPage(1);
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-500/60 focus:outline-none sm:w-40"
          >
            <option value="all">Todos</option>
            <option value="Ativa">Ativas</option>
            <option value="Inativa">Inativas</option>
          </select>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>

        <div className="p-5">
          {companiesQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-zinc-400">
              <Loader2 size={18} className="animate-spin" /> Carregando empresas...
            </div>
          ) : companiesQuery.error ? (
            <div className="py-8 text-center text-sm text-rose-300">
              Não foi possível carregar as empresas.
            </div>
          ) : companies.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhuma empresa encontrada.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? (
                <CompanyTable items={companies} rowActions={companyRowActions} />
              ) : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {companies.map((company) => (
                    <CompanyListRow
                      key={company.id}
                      company={company}
                      actions={companyRowActions(company)}
                      onSelect={() => startView(company)}
                    />
                  ))}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {companies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      actions={companyRowActions(company, 'buttons')}
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
        <CompanyFormModal
          company={selected}
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

function CompanyTable({
  items,
  rowActions,
}: {
  items: Company[];
  rowActions: (company: Company) => React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800/60">
          <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
            <th className="w-10 px-4 py-3" />
            <th className="px-4 py-3 font-semibold">Código</th>
            <th className="px-4 py-3 font-semibold">Empresa</th>
            <th className="px-4 py-3 font-semibold">Tipo</th>
            <th className="px-4 py-3 font-semibold">Acesso</th>
            <th className="px-4 py-3 font-semibold">Cidade</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {items.map((company) => (
            <tr key={company.id} className="hover:bg-zinc-800/40">
              <td className="px-4 py-3">
                {rowActions(company)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-400">{company.codigo}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-zinc-100">{company.nome || '-'}</p>
                <p className="text-xs text-zinc-500">{company.reduzido || 'Sem nome reduzido'}</p>
              </td>
              <td className="px-4 py-3 text-zinc-300">{tipoLabel(company.tipo)}</td>
              <td className="px-4 py-3 text-zinc-300">{acessoLabel(company.acesso)}</td>
              <td className="px-4 py-3 text-zinc-300">
                {company.cidade || '-'}{company.uf ? `, ${company.uf}` : ''}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={company.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompanyListRow({
  company,
  actions,
  onSelect,
}: {
  company: Company;
  actions: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700">
      <div className="flex items-start gap-3">
        {actions}
        <button
          type="button"
          onClick={onSelect}
          className="min-w-0 flex-1 text-left"
        >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-zinc-100">{company.nome || '-'}</p>
          <p className="text-xs text-zinc-500">
            {company.codigo} · {company.reduzido || 'Sem nome reduzido'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={company.status} />
          <SmallBadge>{tipoLabel(company.tipo)}</SmallBadge>
          {company.cliente ? <SmallBadge>Cliente</SmallBadge> : null}
          {company.fornecedor ? <SmallBadge>Fornecedor</SmallBadge> : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {company.cidade || '-'}{company.uf ? `, ${company.uf}` : ''}
        </span>
        <span>Acesso {acessoLabel(company.acesso)}</span>
      </div>
        </button>
      </div>
    </div>
  );
}

function CompanyCard({
  company,
  actions,
}: {
  company: Company;
  actions: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200">
          {tipoLabel(company.tipo)}
        </span>
        <StatusBadge status={company.status} />
      </div>
      <p className="font-bold text-zinc-100">{company.nome || '-'}</p>
      <p className="mt-1 text-xs text-zinc-500">
        #{company.codigo} · {company.reduzido || 'Sem nome reduzido'}
      </p>
      <p className="mt-3 text-xs text-zinc-400">
        {company.cidade || '-'}{company.uf ? `, ${company.uf}` : ''} · Acesso {acessoLabel(company.acesso)}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {company.cliente ? <SmallBadge>Cliente</SmallBadge> : null}
        {company.fornecedor ? <SmallBadge>Fornecedor</SmallBadge> : null}
      </div>
      <div className="mt-4 border-t border-zinc-800 pt-3">
        {actions}
      </div>
    </div>
  );
}

function CompanyFormPanel({
  company,
  form,
  readOnly = false,
  onChange,
  onSave,
}: {
  company: Company | null;
  form: CompanyForm;
  readOnly?: boolean;
  onChange: (form: CompanyForm) => void;
  onSave: () => void;
}) {
  const t = useT();
  const [activeTab, setActiveTab] = useState<CompanyFormTab>('empresa');
  const [relatedCompanies, setRelatedCompanies] = useState<RelatedCompany[]>(() => {
    if (!company) return [];
    return [
      {
        codigo: company.codigo,
        nome: company.nome || company.reduzido || String(company.codigo),
        tipo: company.tipo === 'F' ? 'EMP_FOR' : 'EMP_CLI',
        isDefault: true,
      },
    ];
  });
  const [relatedSearchOpen, setRelatedSearchOpen] = useState(false);
  const [relatedSearch, setRelatedSearch] = useState('');
  const [relatedKind, setRelatedKind] = useState<RelatedCompanyKind>('EMP_CLI');

  const relatedSearchQuery = useQuery({
    queryKey: ['admin', 'companies', 'related-search', relatedSearch, relatedKind],
    queryFn: () => listCompanies({ search: relatedSearch, page: 1, page_size: 100 }),
    enabled: relatedSearchOpen,
  });

  const relatedSearchItems = (relatedSearchQuery.data?.items ?? []).filter((item) =>
    relatedKind === 'EMP_CLI' ? item.tipo === 'C' : item.tipo === 'F',
  );

  const countriesQuery = useQuery({
    queryKey: ['admin', 'countries', 1],
    queryFn: () => listCountries(1),
  });

  const statesQuery = useQuery({
    queryKey: ['admin', 'states', form.pais],
    queryFn: () => listStates(form.pais),
    enabled: Boolean(form.pais),
  });

  const stateOptions = statesQuery.data ?? [];

  const applyDefaultRelated = (tipo: RelatedCompanyKind) => {
    onChange({
      ...form,
      tipo: tipo === 'EMP_FOR' ? 'F' : 'C',
      cliente: tipo === 'EMP_CLI',
      fornecedor: tipo === 'EMP_FOR',
    });
  };

  const setDefaultRelated = (codigo: number) => {
    const selectedRelated = relatedCompanies.find((item) => item.codigo === codigo);
    setRelatedCompanies((current) =>
      current.map((item) => ({ ...item, isDefault: item.codigo === codigo })),
    );
    if (selectedRelated) {
      applyDefaultRelated(selectedRelated.tipo);
    }
  };

  const addRelatedCompany = (item: Company) => {
    const exists = relatedCompanies.some(
      (related) => related.codigo === item.codigo && related.tipo === relatedKind,
    );
    const isDefault = relatedCompanies.length === 0;
    if (!exists) {
      setRelatedCompanies((current) => [
        ...current,
        { codigo: item.codigo, nome: item.nome || item.reduzido || String(item.codigo), tipo: relatedKind, isDefault },
      ]);
      if (isDefault) {
        applyDefaultRelated(relatedKind);
      }
    }
    setRelatedSearchOpen(false);
  };

  const removeRelatedCompany = (index: number) => {
    setRelatedCompanies((current) => {
      const removedDefault = current[index]?.isDefault ?? false;
      const next = current.filter((_, currentIndex) => currentIndex !== index);
      if (removedDefault && next.length > 0) {
        const [first, ...rest] = next;
        applyDefaultRelated(first.tipo);
        return [{ ...first, isDefault: true }, ...rest.map((item) => ({ ...item, isDefault: false }))];
      }
      return next;
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <TabButton active={activeTab === 'empresa'} onClick={() => setActiveTab('empresa')}>Empresa</TabButton>
          <TabButton active={activeTab === 'relacionadas'} onClick={() => setActiveTab('relacionadas')}>Empresas Relacionadas</TabButton>
        </div>
        {readOnly ? null : (
          <button type="button" onClick={onSave} className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400">
            Salvar cadastro
          </button>
        )}
      </div>

      <div className="p-5">
        {activeTab === 'empresa' ? (
          <FormSection title="Empresa" description="Campos principais do cadastro de empresa.">
            <Field label="Nome" value={form.nome} onChange={(value) => onChange({ ...form, nome: value })} readOnly={readOnly} />
            <Field label="Nome reduzido" value={form.reduzido} onChange={(value) => onChange({ ...form, reduzido: value })} readOnly={readOnly} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SelectField
                label="Acesso"
                value={form.acesso}
                onChange={(value) => onChange({ ...form, acesso: value as Company['acesso'] })}
                options={[["T", "Total"], ["P", "Parcial"]]}
                disabled={readOnly}
              />
              <SelectField
                label="Tipo"
                value={form.tipo}
                onChange={(value) => onChange({ ...form, tipo: value as Company['tipo'] })}
                options={[["S", "Smar"], ["C", "Cliente"], ["F", "Fornecedor"]]}
                disabled={readOnly}
              />
            </div>
            <Field label="Endereço" value={form.endereco} onChange={(value) => onChange({ ...form, endereco: value })} readOnly={readOnly} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Bairro" value={form.bairro} onChange={(value) => onChange({ ...form, bairro: value })} readOnly={readOnly} />
              <Field label="CEP" value={form.cep} onChange={(value) => onChange({ ...form, cep: value })} readOnly={readOnly} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Field label="Cidade" value={form.cidade} onChange={(value) => onChange({ ...form, cidade: value })} readOnly={readOnly} />
              </div>
              <SelectField
                label="Estado"
                value={form.estCodigo}
                onChange={(value) => {
                  const selectedState = stateOptions.find((state) => String(state.est_codigo) === value);
                  onChange({ ...form, estCodigo: value, uf: selectedState?.nome ?? form.uf });
                }}
                options={stateOptions.map((state) => [String(state.est_codigo), state.nome])}
                placeholder={statesQuery.isLoading ? t('common.loading') : 'Selecione'}
                disabled={readOnly}
              />
            </div>
            <SelectField
              label="País"
              value={form.pais}
              onChange={(value) => onChange({ ...form, pais: value, estCodigo: '', uf: '' })}
              options={(countriesQuery.data ?? []).map((country) => [String(country.pai_codigo), country.nome])}
              placeholder={countriesQuery.isLoading ? t('common.loading') : 'Selecione'}
              disabled={readOnly}
            />
            <Field label="Website" value={form.homepage} onChange={(value) => onChange({ ...form, homepage: value })} readOnly={readOnly} />
            {form.tipo === 'F' ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 space-y-3">
                <h4 className="text-sm font-semibold text-zinc-100">Campos do Fornecedor</h4>
                <Field label="Nome para fornecedor" value={form.reduzido} onChange={(value) => onChange({ ...form, reduzido: value })} readOnly={readOnly} />
                <SelectField
                  label="Status"
                  value={form.status}
                  onChange={(value) => onChange({ ...form, status: value as Company['status'] })}
                  options={[["Ativa", "Ativa"], ["Inativa", "Inativa"]]}
                  disabled={readOnly}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 space-y-3">
                <h4 className="text-sm font-semibold text-zinc-100">Campos do Cliente</h4>
                <Field label="Lista de preço" value={form.listaPreco} onChange={(value) => onChange({ ...form, listaPreco: value })} readOnly={readOnly} />
                <Field label="Desconto padrão" value={form.descontoPadrao} onChange={(value) => onChange({ ...form, descontoPadrao: value })} readOnly={readOnly} />
                <Field label="Fábrica padrão" value={form.fabricaPadrao} onChange={(value) => onChange({ ...form, fabricaPadrao: value })} readOnly={readOnly} />
              </div>
            )}
          </FormSection>
        ) : null}

        {activeTab === 'relacionadas' ? (
          <FormSection title="Empresas Relacionadas" description="Lista de vínculos como cliente ou fornecedor; uma relação marcada como padrão define o tipo principal.">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                <SmallBadge>{form.tipo === 'F' ? 'Padrão: Fornecedor' : 'Padrão: Cliente'}</SmallBadge>
                <SmallBadge>{form.tipo === 'F' ? 'Fornecedor' : 'Cliente'}</SmallBadge>
              </div>
              {readOnly ? null : (
                <button
                  type="button"
                  onClick={() => setRelatedSearchOpen(true)}
                  className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-500/20"
                >
                  Buscar empresa
                </button>
              )}
            </div>
            <div className="max-h-52 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/60">
              {relatedCompanies.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-zinc-500">Nenhuma empresa relacionada.</p>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {relatedCompanies.map((item, index) => (
                    <div key={`${item.codigo}-${item.tipo}`} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-zinc-100">{item.nome}</p>
                        <p className="font-mono text-xs text-zinc-500">{item.codigo} | {item.tipo}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <label className="flex items-center gap-1 text-xs text-zinc-300">
                          <input
                            type="radio"
                            name="related-default"
                            checked={item.isDefault}
                            onChange={() => setDefaultRelated(item.codigo)}
                            disabled={readOnly}
                          />
                          Default
                        </label>
                        {readOnly ? null : (
                          <button
                            type="button"
                            onClick={() => removeRelatedCompany(index)}
                            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {relatedSearchOpen ? (
              <RelatedCompanySearchModal
                search={relatedSearch}
                kind={relatedKind}
                items={relatedSearchItems}
                loading={relatedSearchQuery.isLoading}
                onSearchChange={setRelatedSearch}
                onKindChange={setRelatedKind}
                onSelect={addRelatedCompany}
                onClose={() => setRelatedSearchOpen(false)}
              />
            ) : null}
          </FormSection>
        ) : null}
      </div>
    </div>
  );
}

function RelatedCompanySearchModal({
  search,
  kind,
  items,
  loading,
  onSearchChange,
  onKindChange,
  onSelect,
  onClose,
}: {
  search: string;
  kind: RelatedCompanyKind;
  items: Company[];
  loading: boolean;
  onSearchChange: (value: string) => void;
  onKindChange: (value: RelatedCompanyKind) => void;
  onSelect: (company: Company) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/75 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-5 py-4">
          <div>
            <h3 className="font-bold text-zinc-100">Buscar empresa relacionada</h3>
            <p className="text-xs text-zinc-500">Selecione uma empresa para incluir como cliente ou fornecedor.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700 p-2 text-zinc-400 hover:text-zinc-100"
            title="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3 border-b border-zinc-800 px-5 py-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar por código, nome ou cidade..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <select
            value={kind}
            onChange={(event) => onKindChange(event.target.value as RelatedCompanyKind)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-amber-500/60 focus:outline-none sm:w-44"
          >
            <option value="EMP_CLI">Cliente</option>
            <option value="EMP_FOR">Fornecedor</option>
          </select>
        </div>

        <div className="max-h-96 overflow-y-auto p-5">
          {loading ? (
            <p className="py-8 text-center text-sm text-zinc-500">Carregando empresas...</p>
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhuma empresa encontrada para o filtro.</p>
          ) : (
            <div className="divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800">
              {items.map((item) => (
                <button
                  key={`${kind}-${item.codigo}`}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-zinc-800/70"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-zinc-100">{item.nome || item.reduzido || '-'}</p>
                    <p className="font-mono text-xs text-zinc-500">{item.codigo}</p>
                  </div>
                  <SmallBadge>{kind}</SmallBadge>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompanyFormModal({
  company,
  form,
  readOnly = false,
  onChange,
  onSave,
  onClose,
}: {
  company: Company | null;
  form: CompanyForm;
  readOnly?: boolean;
  onChange: (form: CompanyForm) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const title = company
    ? readOnly
      ? `Visualizar empresa ${company.codigo}`
      : `Editar empresa ${company.codigo}`
    : 'Nova empresa';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h2 className="font-bold text-zinc-100">{title}</h2>
            <p className="text-xs text-zinc-500">
              {readOnly
                ? 'Consulta do cadastro de empresa, clientes e fornecedores.'
                : 'Cadastro composto de empresa, clientes e fornecedores.'}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
            <X size={18} />
          </button>
        </div>
        <CompanyFormPanel company={company} form={form} readOnly={readOnly} onChange={onChange} onSave={onSave} />
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
      className={`rounded-t-xl border-x border-t px-4 py-2 text-sm font-semibold ${
        active
          ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100'
      }`}
    >
      {children}
    </button>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-semibold text-zinc-100">{title}</h3>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  maxLength,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  readOnly?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-zinc-400">{label}</span>
      <input
        value={value}
        maxLength={maxLength}
        readOnly={readOnly}
        onChange={(event) => onChange(event.target.value)}
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
  options: [string, string][];
  placeholder?: string;
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
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function StatusBadge({ status }: { status: Company['status'] }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${status === 'Ativa' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-zinc-700/40 text-zinc-400'}`}>
      {status}
    </span>
  );
}

function SmallBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-zinc-400">
      {children}
    </span>
  );
}