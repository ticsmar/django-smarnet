import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Mail, MapPin, Phone, Plus, Search, UserRound, X } from 'lucide-react';
import { apiRequest } from '@/api/client';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useT } from '@/hooks/useT';
import { useViewMode } from '@/hooks/useViewMode';

interface PersonContact {
  codigo: number;
  tipo_codigo: number;
  tipo_nome: string;
  meio: string;
  referencia: string;
}

interface PersonContactType {
  codigo: number;
  nome: string;
  meio: string;
}

interface Person {
  id: string;
  numero: number;
  nome: string;
  email: string;
  status: 'Ativa' | 'Inativa';
  sexo: string;
  cidade: string;
  uf: string;
  estCodigo: string;
  pais: string;
  cep: string;
  endereco: string;
  bairro: string;
  contatos: PersonContact[];
}

type PersonForm = Omit<Person, 'id' | 'numero' | 'contatos'> & { contatos: PersonContact[] };
type PersonFormTab = 'pessoa' | 'contatos';

interface CountryOption {
  pai_codigo: number;
  nome: string;
}

interface StateOption {
  est_codigo: number;
  pai_codigo: number;
  nome: string;
}

interface PaginatedPeople {
  items: Person[];
  total: number;
  page: number;
  page_size: number;
}

interface ListPeopleParams {
  search?: string;
  status?: 'Ativa' | 'Inativa';
  page?: number;
  page_size?: number;
}

const VIEW_STORAGE_KEY = 'smarnet:view:settings-pessoas';

const emptyForm: PersonForm = {
  nome: '',
  email: '',
  status: 'Ativa',
  sexo: '',
  cidade: '',
  uf: 'SP',
  estCodigo: '',
  pais: '76',
  cep: '',
  endereco: '',
  bairro: '',
  contatos: [],
};

function buildQuery(params: ListPeopleParams): string {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);
  if (params.page) query.set('page', String(params.page));
  if (params.page_size) query.set('page_size', String(params.page_size));
  const text = query.toString();
  return text ? `?${text}` : '';
}

function listPeople(params: ListPeopleParams): Promise<PaginatedPeople> {
  return apiRequest<PaginatedPeople>(`/admin/people/${buildQuery(params)}`);
}

function listCountries(language = 1): Promise<CountryOption[]> {
  return apiRequest<CountryOption[]>(`/admin/countries/?language=${language}`);
}

function listStates(paiCodigo: string): Promise<StateOption[]> {
  if (!paiCodigo) return Promise.resolve([]);
  return apiRequest<StateOption[]>(`/admin/states/?pai_codigo=${paiCodigo}`);
}

function listContactTypes(): Promise<PersonContactType[]> {
  return apiRequest<PersonContactType[]>('/admin/person-contact-types/');
}

function toForm(person: Person): PersonForm {
  const { id: _id, numero: _numero, ...form } = person;
  return form;
}

function sexLabel(value: string): string {
  if (value === 'F') return 'Feminino';
  if (value === 'M') return 'Masculino';
  return 'Nao informado';
}

export default function PeopleAdmin() {
  const [people, setPeople] = useState<Person[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Ativa' | 'Inativa'>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Person | null>(null);
  const [form, setForm] = useState<PersonForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');

  const peopleQuery = useQuery({
    queryKey: ['admin', 'people', search, statusFilter, page],
    queryFn: () =>
      listPeople({
        search,
        status: statusFilter === 'all' ? undefined : statusFilter,
        page,
        page_size: 20,
      }),
  });

  useEffect(() => {
    if (peopleQuery.data) {
      setPeople(peopleQuery.data.items);
    }
  }, [peopleQuery.data]);

  const totalPages = useMemo(() => {
    if (!peopleQuery.data) return 1;
    return Math.max(1, Math.ceil(peopleQuery.data.total / peopleQuery.data.page_size));
  }, [peopleQuery.data]);

  const startCreate = () => {
    setSelected(null);
    setForm(emptyForm);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const startEdit = (person: Person) => {
    setSelected(person);
    setForm(toForm(person));
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const startView = (person: Person) => {
    setSelected(person);
    setForm(toForm(person));
    setFormMode('view');
    setIsFormOpen(true);
  };

  const handleInactivate = (person: Person) => {
    if (person.status !== 'Ativa') return;
    const confirmed = window.confirm(
      `Inativar a pessoa ${person.nome || person.numero}?`,
    );
    if (!confirmed) return;
    setPeople((current) =>
      current.map((item) =>
        item.id === person.id ? { ...item, status: 'Inativa' } : item,
      ),
    );
    showColoredToast({
      color: 'warning',
      title: 'Pessoa inativada',
      description: `${person.nome || `#${person.numero}`} marcada como inativa nesta sessão. A gravação no cadastro ainda não está habilitada.`,
    });
  };

  const personRowActions = (person: Person, variant: 'menu' | 'buttons' = 'menu') => (
    <SettingsRowActions
      variant={variant}
      onView={() => startView(person)}
      onEdit={() => startEdit(person)}
      onInactivate={
        person.status === 'Ativa' ? () => handleInactivate(person) : undefined
      }
    />
  );

  const handleSave = () => {
    if (!form.nome.trim()) return;
    if (selected) {
      const updated = { ...selected, ...form };
      setPeople((current) => current.map((person) => (person.id === selected.id ? updated : person)));
      setSelected(updated);
      setIsFormOpen(false);
      return;
    }
    const created: Person = {
      id: String(Date.now()),
      numero: Math.max(...people.map((person) => person.numero), 1000) + 1,
      ...form,
    };
    setPeople((current) => [created, ...current]);
    setSelected(created);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-display font-bold text-zinc-100">
            <UserRound size={22} className="text-amber-400" /> Cadastro de Pessoas
          </h1>
          <p className="text-sm text-zinc-400">
            Pessoa, endereço e meios de contato.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
        >
          <Plus size={16} /> Nova Pessoa
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
              placeholder="Buscar por código, nome, e-mail ou cidade..."
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
          {peopleQuery.isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-zinc-400">
              <Loader2 size={18} className="animate-spin" /> Carregando pessoas...
            </div>
          ) : peopleQuery.error ? (
            <div className="py-8 text-center text-sm text-rose-300">
              Não foi possível carregar as pessoas.
            </div>
          ) : people.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhuma pessoa encontrada.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? <PersonTable items={people} rowActions={personRowActions} /> : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {people.map((person) => (
                    <PersonListRow
                      key={person.id}
                      person={person}
                      actions={personRowActions(person)}
                      onSelect={() => startView(person)}
                    />
                  ))}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {people.map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      actions={personRowActions(person, 'buttons')}
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
        <PersonFormModal
          person={selected}
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

function PersonTable({
  items,
  rowActions,
}: {
  items: Person[];
  rowActions: (person: Person) => React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800/60">
          <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
            <th className="w-10 px-4 py-3" />
            <th className="px-4 py-3 font-semibold">Número</th>
            <th className="px-4 py-3 font-semibold">Pessoa</th>
            <th className="px-4 py-3 font-semibold">E-mail</th>
            <th className="px-4 py-3 font-semibold">Sexo</th>
            <th className="px-4 py-3 font-semibold">Cidade</th>
            <th className="px-4 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {items.map((person) => (
            <tr key={person.id} className="hover:bg-zinc-800/40">
              <td className="px-4 py-3">
                {rowActions(person)}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-400">{person.numero}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-zinc-100">{person.nome || '-'}</p>
                <p className="text-xs text-zinc-500">{person.endereco || 'Sem endereço'}</p>
              </td>
              <td className="px-4 py-3 text-zinc-300">{person.email || '-'}</td>
              <td className="px-4 py-3 text-zinc-300">{sexLabel(person.sexo)}</td>
              <td className="px-4 py-3 text-zinc-300">
                {person.cidade || '-'}{person.uf ? `, ${person.uf}` : ''}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={person.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PersonListRow({
  person,
  actions,
  onSelect,
}: {
  person: Person;
  actions: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700">
      <div className="flex items-start gap-3">
        {actions}
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-zinc-100">{person.nome || '-'}</p>
          <p className="text-xs text-zinc-500">{person.numero} · {person.email || 'Sem e-mail'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={person.status} />
          <SmallBadge>{sexLabel(person.sexo)}</SmallBadge>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-400">
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {person.cidade || '-'}{person.uf ? `, ${person.uf}` : ''}
        </span>
        <span className="inline-flex items-center gap-1">
          <Phone size={12} /> {person.contatos.length} contatos
        </span>
      </div>
        </button>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  actions,
}: {
  person: Person;
  actions: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200">
          {person.numero}
        </span>
        <StatusBadge status={person.status} />
      </div>
      <p className="font-bold text-zinc-100">{person.nome || '-'}</p>
      <p className="mt-1 text-xs text-zinc-500">{person.email || 'Sem e-mail'}</p>
      <p className="mt-3 text-xs text-zinc-400">
        {person.cidade || '-'}{person.uf ? `, ${person.uf}` : ''} · {sexLabel(person.sexo)}
      </p>
      <div className="mt-4 border-t border-zinc-800 pt-3">
        {actions}
      </div>
    </div>
  );
}

function PersonFormModal({
  person,
  form,
  readOnly = false,
  onChange,
  onSave,
  onClose,
}: {
  person: Person | null;
  form: PersonForm;
  readOnly?: boolean;
  onChange: (form: PersonForm) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const title = person
    ? readOnly
      ? `Visualizar pessoa ${person.numero}`
      : `Editar pessoa ${person.numero}`
    : 'Nova pessoa';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h2 className="font-bold text-zinc-100">{title}</h2>
            <p className="text-xs text-zinc-500">
              {readOnly ? 'Consulta do cadastro de pessoa e meios de contato.' : 'Dados da pessoa e meios de contato.'}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
            <X size={18} />
          </button>
        </div>
        <PersonFormPanel person={person} form={form} readOnly={readOnly} onChange={onChange} onSave={onSave} />
      </div>
    </div>
  );
}

function PersonFormPanel({
  person,
  form,
  readOnly = false,
  onChange,
  onSave,
}: {
  person: Person | null;
  form: PersonForm;
  readOnly?: boolean;
  onChange: (form: PersonForm) => void;
  onSave: () => void;
}) {
  const t = useT();
  const [activeTab, setActiveTab] = useState<PersonFormTab>('pessoa');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

  const contactTypesQuery = useQuery({
    queryKey: ['admin', 'person-contact-types'],
    queryFn: listContactTypes,
    enabled: activeTab === 'contatos' || isContactModalOpen,
  });

  const addContact = (contact: PersonContact) => {
    onChange({ ...form, contatos: [...form.contatos, contact] });
    setIsContactModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-5 py-4">
        <div className="flex flex-wrap gap-2">
          <TabButton active={activeTab === 'pessoa'} onClick={() => setActiveTab('pessoa')}>Pessoa</TabButton>
          <TabButton active={activeTab === 'contatos'} onClick={() => setActiveTab('contatos')}>Meios de contato</TabButton>
        </div>
        {readOnly ? null : (
          <button type="button" onClick={onSave} className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400">
            Salvar cadastro
          </button>
        )}
      </div>

      {activeTab === 'pessoa' ? (
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <Field label="Nome" value={form.nome} onChange={(value) => onChange({ ...form, nome: value })} className="md:col-span-2" readOnly={readOnly} />
          <Field label="Email" value={form.email} onChange={(value) => onChange({ ...form, email: value })} icon={<Mail size={14} />} readOnly={readOnly} />
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Status</span>
            <select
              value={form.status}
              disabled={readOnly}
              onChange={(event) => onChange({ ...form, status: event.target.value as PersonForm['status'] })}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:border-amber-500/60 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-400"
            >
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-400">Sexo</span>
            <select
              value={form.sexo}
              disabled={readOnly}
              onChange={(event) => onChange({ ...form, sexo: event.target.value })}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:border-amber-500/60 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-400"
            >
              <option value="">Nao informado</option>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
            </select>
          </label>
          <Field label="CEP" value={form.cep} onChange={(value) => onChange({ ...form, cep: value })} readOnly={readOnly} />
          <Field label="Endereço" value={form.endereco} onChange={(value) => onChange({ ...form, endereco: value })} className="md:col-span-2" readOnly={readOnly} />
          <Field label="Bairro" value={form.bairro} onChange={(value) => onChange({ ...form, bairro: value })} readOnly={readOnly} />
          <Field label="Cidade" value={form.cidade} onChange={(value) => onChange({ ...form, cidade: value })} readOnly={readOnly} />
          <SelectField
            label="Estado"
            value={form.estCodigo}
            disabled={readOnly}
            onChange={(value) => {
              const selectedState = stateOptions.find((state) => String(state.est_codigo) === value);
              onChange({ ...form, estCodigo: value, uf: selectedState?.nome ?? form.uf });
            }}
            options={stateOptions.map((state) => [String(state.est_codigo), state.nome])}
            placeholder={statesQuery.isLoading ? t('common.loading') : 'Selecione'}
          />
          <SelectField
            label="País"
            value={form.pais}
            disabled={readOnly}
            onChange={(value) => onChange({ ...form, pais: value, estCodigo: '', uf: '' })}
            options={(countriesQuery.data ?? []).map((country) => [String(country.pai_codigo), country.nome])}
            placeholder={countriesQuery.isLoading ? t('common.loading') : 'Selecione'}
          />
        </div>
      ) : (
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Meios de contato</h3>
              <p className="text-xs text-zinc-500">Meios de contato vinculados à pessoa.</p>
            </div>
            {readOnly ? null : (
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
              >
                <Plus size={15} /> Novo contato
              </button>
            )}
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-800/60">
                <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Meio</th>
                  <th className="px-4 py-3 font-semibold">Referência</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {form.contatos.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-sm text-zinc-500">
                      Nenhum meio de contato cadastrado para esta pessoa.
                    </td>
                  </tr>
                ) : (
                  form.contatos.map((contact) => (
                    <tr key={`${contact.tipo_codigo}-${contact.codigo}-${contact.referencia}`} className="hover:bg-zinc-800/40">
                      <td className="px-4 py-3 text-zinc-100">{contact.tipo_nome || contact.tipo_codigo}</td>
                      <td className="px-4 py-3 text-zinc-300">{contact.meio || '-'}</td>
                      <td className="px-4 py-3 text-zinc-300">{contact.referencia || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Inclusão e edição de contatos serão ligadas depois de confirmar a regra de numeração.
          </p>
          {isContactModalOpen ? (
            <ContactFormModal
              contactTypes={contactTypesQuery.data ?? []}
              isLoading={contactTypesQuery.isLoading}
              nextCode={Math.max(0, ...form.contatos.map((contact) => contact.codigo)) + 1}
              onSave={addContact}
              onClose={() => setIsContactModalOpen(false)}
            />
          ) : null}
        </div>
      )}

      {person ? null : (
        <p className="border-t border-zinc-800 px-5 py-3 text-xs text-zinc-500">
          Novo cadastro fica local nesta primeira versao ate confirmarmos a rotina Oracle de gravacao.
        </p>
      )}
    </div>
  );
}

function ContactFormModal({
  contactTypes,
  isLoading,
  nextCode,
  onSave,
  onClose,
}: {
  contactTypes: PersonContactType[];
  isLoading: boolean;
  nextCode: number;
  onSave: (contact: PersonContact) => void;
  onClose: () => void;
}) {
  const t = useT();
  const [typeCode, setTypeCode] = useState('');
  const [reference, setReference] = useState('');
  const selectedType = contactTypes.find((type) => String(type.codigo) === typeCode);

  const handleSave = () => {
    if (!selectedType || !reference.trim()) return;
    onSave({
      codigo: nextCode,
      tipo_codigo: selectedType.codigo,
      tipo_nome: selectedType.nome,
      meio: selectedType.meio,
      referencia: reference.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div>
            <h3 className="font-bold text-zinc-100">Novo meio de contato</h3>
            <p className="text-xs text-zinc-500">Selecione o tipo de contato cadastrado.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 p-5">
          <SelectField
            label="Tipo de contato"
            value={typeCode}
            onChange={setTypeCode}
            options={contactTypes.map((type) => [String(type.codigo), type.nome || String(type.codigo)])}
            placeholder={isLoading ? t('common.loading') : 'Selecione'}
          />
          <Field
            label="Referencia"
            value={reference}
            onChange={setReference}
            icon={selectedType?.meio === 'E' ? <Mail size={14} /> : <Phone size={14} />}
          />
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 text-xs text-zinc-400">
            Meio: <span className="text-zinc-200">{selectedType?.meio || '-'}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-800 px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900">
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedType || !reference.trim()}
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Adicionar contato
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className = '',
  icon,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
}) {
  return (
    <label className={`grid gap-1 text-sm ${className}`}>
      <span className="text-zinc-400">{label}</span>
      <span className="relative">
        {icon ? <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span> : null}
        <input
          value={value}
          readOnly={readOnly}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:border-amber-500/60 focus:outline-none read-only:cursor-not-allowed read-only:text-zinc-400 ${icon ? 'pl-9' : ''}`}
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecione',
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
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

function StatusBadge({ status }: { status: Person['status'] }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
      status === 'Ativa' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-zinc-700 text-zinc-300'
    }`}
    >
      {status}
    </span>
  );
}

function SmallBadge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">{children}</span>;
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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