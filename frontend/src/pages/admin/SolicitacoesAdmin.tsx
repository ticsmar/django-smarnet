import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClipboardList, Loader2, Search } from 'lucide-react';
import { apiRequest, ApiError } from '@/api/client';
import { SettingsRowActions } from '@/components/admin/SettingsRowActions';
import { showColoredToast } from '@/components/ui/toasts/showColoredToast';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useViewMode } from '@/hooks/useViewMode';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const VIEW_STORAGE_KEY = 'smarnet:view:settings-access-requests';

type WizardStep = 'triagem' | 'pessoa' | 'empresa' | 'usuario';

type PendingRequest = {
  id: string;
  fun_chapa: number | null;
  tep_codigo: string;
  tipo_empresa_nome: string;
  tipo: string;
  cliente: boolean;
  fornecedor: boolean;
  smar: boolean;
  nome: string;
  email: string;
  sexo: string;
  endereco: string;
  cidade: string;
  bairro: string;
  estado: string;
  cep: string;
  est_codigo: number | null;
  est_nome: string;
  pai_codigo: number | null;
  pais_nome: string;
  lin_cod: number | null;
  emp_codigo: number | null;
  emp_lpr_codigo: number | null;
  pes_numero: number | null;
  ppe_motivo: string;
  ppe_dt_solic: string;
  emp_nome: string;
  emp_endereco: string;
  emp_bairro: string;
  emp_cidade: string;
  emp_estado: string;
  emp_cep: string;
  emp_est_codigo: number | null;
  emp_est_nome: string;
  emp_pai_codigo: number | null;
  emp_pais_nome: string;
  emp_homepage: string;
};

function displayValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  const text = String(value).trim();
  return text || '-';
}

function sexoLabel(sexo: string): string {
  const code = sexo.trim().toUpperCase();
  if (code === 'M') return 'Masculino';
  if (code === 'F') return 'Feminino';
  return displayValue(sexo);
}

function formatRequestDate(value: string): string {
  const raw = value.trim();
  if (!raw) return '-';
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function requestCompanyLabel(item: PendingRequest): string {
  const name = item.emp_nome.trim() || item.tipo_empresa_nome.trim();
  if (name && item.emp_codigo) return `${name} (#${item.emp_codigo})`;
  if (name) return name;
  if (item.emp_codigo) return `#${item.emp_codigo}`;
  return 'Sem empresa';
}

function formatCompanyLocation(item: PendingRequest): string {
  const city = item.emp_cidade.trim();
  const state = (item.emp_est_nome || item.emp_estado).trim();
  const country = item.emp_pais_nome.trim();
  const local = [city, state].filter(Boolean).join(', ');
  if (local && country) return `${local} · ${country}`;
  return local || country || '-';
}

function companyAddressLine(item: PendingRequest): string {
  const parts = [item.emp_endereco, item.emp_bairro, item.emp_cep]
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : '-';
}

function requestLoginLabel(): string {
  // Login só é definido na aprovação; até lá permanece pendente.
  return 'A definir';
}

function RequestFlagBadges({ item }: { item: PendingRequest }) {
  const flags: string[] = [];
  if (item.cliente) flags.push('Cliente');
  if (item.fornecedor) flags.push('Fornecedor');
  if (item.smar) flags.push('Smar');
  if (flags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {flags.map((flag) => (
        <span
          key={flag}
          className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300"
        >
          {flag}
        </span>
      ))}
    </div>
  );
}

function RequestMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="truncate text-xs text-zinc-300" title={value}>
        {value}
      </p>
    </div>
  );
}

function RequestUserCompanyBlocks({ item }: { item: PendingRequest }) {
  return (
    <div className="mt-3 space-y-3">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Usuário</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RequestMetaItem label="Nome" value={displayValue(item.nome)} />
          <RequestMetaItem label="E-mail" value={displayValue(item.email)} />
          <RequestMetaItem label="Login" value={requestLoginLabel()} />
          <RequestMetaItem label="País" value={displayValue(item.pais_nome)} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Empresa</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RequestMetaItem label="Nome" value={requestCompanyLabel(item)} />
          <RequestMetaItem label="Endereço" value={companyAddressLine(item)} />
          <RequestMetaItem label="Local" value={formatCompanyLocation(item)} />
          <RequestMetaItem label="País" value={displayValue(item.emp_pais_nome)} />
          <RequestMetaItem label="Homepage" value={displayValue(item.emp_homepage)} />
          <RequestMetaItem
            label="Código"
            value={item.emp_codigo != null ? String(item.emp_codigo) : '-'}
          />
          <RequestMetaItem label="Solicitado em" value={formatRequestDate(item.ppe_dt_solic)} />
          <RequestMetaItem
            label="Motivo"
            value={item.ppe_motivo.trim() || 'Sem motivo informado'}
          />
        </div>
      </div>
    </div>
  );
}

type WizardProgressStep = {
  key: WizardStep;
  label: string;
  shortLabel: string;
  done: boolean;
  current: boolean;
  skipped: boolean;
};

function getWizardProgress(item: PendingRequest): {
  steps: WizardProgressStep[];
  currentKey: WizardStep;
  currentLabel: string;
} {
  const tep = (item.tep_codigo || '').toUpperCase();
  const needsEmpresa = tep === 'C' || tep === 'F';
  const hasPessoa = Boolean(item.pes_numero);
  const hasEmpresa = Boolean(item.emp_codigo);

  let currentKey: WizardStep = 'triagem';
  if (!hasPessoa) {
    currentKey = 'triagem';
  } else if (needsEmpresa && !hasEmpresa) {
    currentKey = 'empresa';
  } else {
    currentKey = 'usuario';
  }

  const steps: WizardProgressStep[] = [
    {
      key: 'triagem',
      label: 'Triagem',
      shortLabel: '1',
      done: hasPessoa,
      current: currentKey === 'triagem',
      skipped: false,
    },
    {
      key: 'pessoa',
      label: 'Pessoa',
      shortLabel: '2',
      done: hasPessoa,
      current: currentKey === 'pessoa',
      skipped: false,
    },
    {
      key: 'empresa',
      label: 'Empresa',
      shortLabel: '3',
      done: needsEmpresa ? hasEmpresa : false,
      current: currentKey === 'empresa',
      skipped: !needsEmpresa,
    },
    {
      key: 'usuario',
      label: 'Usuário',
      shortLabel: needsEmpresa ? '4' : '3',
      done: false,
      current: currentKey === 'usuario',
      skipped: false,
    },
  ];

  // When pessoa is missing, highlight Pessoa as the next actionable after triagem read.
  if (!hasPessoa) {
    steps[0].current = true;
    steps[1].current = false;
  }

  const current = steps.find((step) => step.current && !step.skipped);
  return {
    steps: steps.filter((step) => !step.skipped),
    currentKey: current?.key ?? 'triagem',
    currentLabel: current?.label ?? 'Triagem',
  };
}

function WizardProgressBadge({ item }: { item: PendingRequest }) {
  const progress = getWizardProgress(item);
  return (
    <div className="flex flex-col gap-1.5 min-w-[140px]">
      <div className="flex items-center gap-1">
        {progress.steps.map((step, index) => (
          <div key={step.key} className="flex items-center gap-1">
            {index > 0 ? (
              <span
                className={`h-px w-2 ${
                  step.done || progress.steps[index - 1]?.done ? 'bg-emerald-600' : 'bg-zinc-700'
                }`}
              />
            ) : null}
            <span
              title={step.label}
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full border px-1 text-[10px] font-semibold ${
                step.done
                  ? 'border-emerald-600 bg-emerald-950/50 text-emerald-300'
                  : step.current
                    ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-500'
              }`}
            >
              {step.shortLabel}
            </span>
          </div>
        ))}
      </div>
      <span
        className={`text-[11px] ${
          progress.currentKey === 'usuario' ? 'text-amber-300' : 'text-zinc-400'
        }`}
      >
        {progress.currentLabel}
        {item.pes_numero ? ` · P#${item.pes_numero}` : ''}
        {item.emp_codigo ? ` · E#${item.emp_codigo}` : ''}
      </span>
    </div>
  );
}

function DetailField({
  label,
  value,
  preWrap = false,
}: {
  label: string;
  value: string | number | null | undefined;
  preWrap?: boolean;
}) {
  return (
    <p className={preWrap ? 'whitespace-pre-wrap break-words' : undefined}>
      <strong>{label}:</strong> {displayValue(value)}
    </p>
  );
}

type PaginatedPendingRequests = {
  items: PendingRequest[];
  total: number;
  page: number;
  page_size: number;
};

type ApprovalResult = {
  ppe_codigo: number;
  user_id: number;
  username: string;
  temporary_password: string;
  usu_chapa: number;
  detail: string;
};

type DiscardResult = {
  ppe_codigo: number;
  detail: string;
};

type RegisterFieldsResult = {
  ppe_codigo: number;
  fun_chapa: number | null;
  pes_numero: number | null;
  emp_codigo: number | null;
  tep_codigo?: string;
  tipo?: string;
  cliente?: boolean;
  fornecedor?: boolean;
  smar?: boolean;
  detail: string;
  closed?: boolean;
  resolved_existing_user?: boolean;
};

type CompanyLookupItem = {
  id: string;
  codigo: number;
  nome: string;
  cidade: string;
  uf: string;
  listaPreco?: string;
};

type LoginOption = {
  login: string;
  used: boolean;
};

type LanguageOption = {
  lin_cod: number;
  nome: string;
};

type PriceListOption = {
  lpr_codigo: number;
  nome: string;
  emp_nome: string;
};

type LoginCheckResult = {
  login: string;
  available: boolean;
  detail?: string;
};

type PersonLookupItem = {
  id: string;
  numero: number;
  nome: string;
  email: string;
  tem_usuario?: boolean;
};

type UserLookupItem = {
  usu_chapa: number;
  usu_login: string;
  usu_nome: string;
  usu_loginweb: string;
  usu_email: string;
  emp_codigo: number | null;
  pes_numero: number | null;
};

type PaginatedLookup<TItem> = {
  items: TItem[];
  total: number;
  page: number;
  page_size: number;
};

type CreatePersonPayload = {
  nome: string;
  email?: string;
  sexo?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  est_codigo?: number | null;
  pai_codigo?: number | null;
};

type PartnerLookupItem = {
  id: string;
  codigo: string;
  nome: string;
  reduzido: string;
  email: string;
  cidade: string;
  pais: string;
  tem_empresa: boolean;
  origem: string;
};

type CreateEmpresaFromPartnerResult = {
  ppe_codigo: number;
  emp_codigo: number;
  emp_nome: string;
  emp_tipo: string;
  detail: string;
};

function buildQuery(search: string, page: number, pageSize: number): string {
  const params = new URLSearchParams();
  if (search.trim()) {
    params.set('search', search.trim());
  }
  params.set('page', String(page));
  params.set('page_size', String(pageSize));
  return `?${params.toString()}`;
}

async function listPendingRequests(search: string, page: number): Promise<PaginatedPendingRequests> {
  return apiRequest<PaginatedPendingRequests>(`/admin/requests/${buildQuery(search, page, 20)}`);
}

async function approvePendingRequest(
  id: string,
  payload: {
    username: string;
    email?: string;
    fun_chapa?: number | null;
    create_new_chapa?: boolean;
    lin_cod?: number | null;
    lpr_codigo?: number | null;
  },
): Promise<ApprovalResult> {
  return apiRequest<ApprovalResult>(`/admin/requests/${id}/approve/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function discardPendingRequest(id: string): Promise<DiscardResult> {
  return apiRequest<DiscardResult>(`/admin/requests/${id}/discard/`, {
    method: 'POST',
  });
}

async function registerPendingRequestFields(
  id: string,
  payload: {
    fun_chapa?: number | null;
    pes_numero?: number | null;
    emp_codigo?: number | null;
    tep_codigo?: 'C' | 'F';
  },
): Promise<RegisterFieldsResult> {
  return apiRequest<RegisterFieldsResult>(`/admin/requests/${id}/register-fields/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function listLoginOptions(requestId: string): Promise<LoginOption[]> {
  return apiRequest<LoginOption[]>(`/admin/requests/${requestId}/login-options/`);
}

async function checkLoginAvailable(login: string): Promise<LoginCheckResult> {
  const query = new URLSearchParams({ login });
  return apiRequest<LoginCheckResult>(`/admin/logins/check/?${query.toString()}`);
}

async function listLanguages(): Promise<LanguageOption[]> {
  return apiRequest<LanguageOption[]>('/admin/catalog/languages/');
}

async function listPriceLists(): Promise<PriceListOption[]> {
  return apiRequest<PriceListOption[]>('/admin/catalog/price-lists/');
}

async function listCompanyLookup(search: string, page: number): Promise<PaginatedLookup<CompanyLookupItem>> {
  const query = new URLSearchParams({ page: String(page), page_size: '25' });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedLookup<CompanyLookupItem>>(`/admin/companies/?${query.toString()}`);
}

async function listPersonLookup(search: string, page: number): Promise<PaginatedLookup<PersonLookupItem>> {
  const query = new URLSearchParams({ page: String(page), page_size: '25' });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedLookup<PersonLookupItem>>(`/admin/people/?${query.toString()}`);
}

async function listChapaLookup(search: string, page: number): Promise<PaginatedLookup<UserLookupItem>> {
  const query = new URLSearchParams({ page: String(page), page_size: '25' });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedLookup<UserLookupItem>>(`/admin/chapas/?${query.toString()}`);
}

async function createPerson(payload: CreatePersonPayload): Promise<PersonLookupItem> {
  return apiRequest<PersonLookupItem>('/admin/people/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function listPartnerLookup(
  tep: string,
  search: string,
  page: number,
): Promise<PaginatedLookup<PartnerLookupItem>> {
  const query = new URLSearchParams({
    tep: tep.toUpperCase(),
    page: String(page),
    page_size: '25',
  });
  if (search.trim()) {
    query.set('search', search.trim());
  }
  return apiRequest<PaginatedLookup<PartnerLookupItem>>(`/admin/partners/?${query.toString()}`);
}

async function createEmpresaFromPartner(
  requestId: string,
  partnerCodigo: string,
): Promise<CreateEmpresaFromPartnerResult> {
  return apiRequest<CreateEmpresaFromPartnerResult>(`/admin/requests/${requestId}/create-empresa/`, {
    method: 'POST',
    body: JSON.stringify({ partner_codigo: partnerCodigo }),
  });
}

function suggestUsername(request: PendingRequest): string {
  const emailLocal = (request.email || '').split('@')[0]?.trim() || '';
  const nameSeed = (request.nome || '').trim().replace(/\s+/g, '.');
  const seed = emailLocal || nameSeed || `u${request.id}`;
  return seed.replace(/[^A-Za-z0-9_.]+/g, '.').replace(/^\.+|\.+$/g, '').slice(0, 20);
}

export default function SolicitacoesAdmin() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, 'tabela');
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [wizardStep, setWizardStep] = useState<WizardStep>('triagem');
  const [confirmReproveOpen, setConfirmReproveOpen] = useState(false);
  const [confirmTepChange, setConfirmTepChange] = useState<'C' | 'F' | null>(null);
  const [createPersonOpen, setCreatePersonOpen] = useState(false);
  const [personSearch, setPersonSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [partnerSearch, setPartnerSearch] = useState('');
  const [chapaSearch, setChapaSearch] = useState('');
  const [personPage, setPersonPage] = useState(1);
  const [companyPage, setCompanyPage] = useState(1);
  const [partnerPage, setPartnerPage] = useState(1);
  const [chapaPage, setChapaPage] = useState(1);
  const [createNewChapa, setCreateNewChapa] = useState(true);
  const [selectedUsuChapa, setSelectedUsuChapa] = useState<number | null>(null);
  const [userForm, setUserForm] = useState({ username: '', email: '' });
  const [selectedLinCod, setSelectedLinCod] = useState<number>(1);
  const [selectedLprCodigo, setSelectedLprCodigo] = useState<number | null>(null);
  const [loginCheck, setLoginCheck] = useState<LoginCheckResult | null>(null);
  const [loginCheckPending, setLoginCheckPending] = useState(false);
  const [personForm, setPersonForm] = useState({
    nome: '',
    email: '',
    sexo: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [createPersonError, setCreatePersonError] = useState<string | null>(null);
  const [empresaStepError, setEmpresaStepError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const isCompanyPending = useMemo(() => {
    const code = (selectedRequest?.tep_codigo || '').toUpperCase();
    return code === 'C' || code === 'F';
  }, [selectedRequest?.tep_codigo]);

  const isSmarPending = useMemo(() => {
    return (selectedRequest?.tep_codigo || '').toUpperCase() === 'S';
  }, [selectedRequest?.tep_codigo]);

  const wizardSteps = useMemo((): WizardStep[] => {
    if (isCompanyPending) {
      return ['triagem', 'pessoa', 'empresa', 'usuario'];
    }
    return ['triagem', 'pessoa', 'usuario'];
  }, [isCompanyPending]);

  const stepLabels: Record<WizardStep, string> = {
    triagem: 'Triagem',
    pessoa: 'Pessoa',
    empresa: 'Empresa',
    usuario: 'Usuário',
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'requests', search, page],
    queryFn: () => listPendingRequests(search, page),
  });

  const personLookupQuery = useQuery({
    queryKey: ['admin', 'solicitacoes', 'person-lookup', personSearch, personPage],
    queryFn: () => listPersonLookup(personSearch, personPage),
    enabled: Boolean(selectedRequest) && wizardStep === 'pessoa',
  });

  const companyLookupQuery = useQuery({
    queryKey: ['admin', 'solicitacoes', 'company-lookup', companySearch, companyPage],
    queryFn: () => listCompanyLookup(companySearch, companyPage),
    enabled: Boolean(selectedRequest) && wizardStep === 'empresa',
  });

  const partnerLookupQuery = useQuery({
    queryKey: [
      'admin',
      'solicitacoes',
      'partner-lookup',
      selectedRequest?.tep_codigo,
      partnerSearch,
      partnerPage,
    ],
    queryFn: () =>
      listPartnerLookup(
        (selectedRequest?.tep_codigo || 'C').toUpperCase(),
        partnerSearch,
        partnerPage,
      ),
    enabled: Boolean(selectedRequest) && wizardStep === 'empresa' && isCompanyPending,
  });

  const chapaLookupQuery = useQuery({
    queryKey: ['admin', 'solicitacoes', 'chapa-lookup', chapaSearch, chapaPage],
    queryFn: () => listChapaLookup(chapaSearch, chapaPage),
    enabled: Boolean(selectedRequest) && wizardStep === 'usuario',
  });

  const loginOptionsQuery = useQuery({
    queryKey: ['admin', 'solicitacoes', 'login-options', selectedRequest?.id],
    queryFn: () => listLoginOptions(selectedRequest!.id),
    enabled: Boolean(selectedRequest) && wizardStep === 'usuario',
  });

  const languagesQuery = useQuery({
    queryKey: ['admin', 'catalog', 'languages'],
    queryFn: () => listLanguages(),
    enabled: Boolean(selectedRequest) && wizardStep === 'usuario',
  });

  const priceListsQuery = useQuery({
    queryKey: ['admin', 'catalog', 'price-lists'],
    queryFn: () => listPriceLists(),
    enabled: Boolean(selectedRequest) && wizardStep === 'usuario',
  });

  const personTotalPages = useMemo(() => {
    if (!personLookupQuery.data) return 1;
    return Math.max(1, Math.ceil(personLookupQuery.data.total / personLookupQuery.data.page_size));
  }, [personLookupQuery.data]);

  const companyTotalPages = useMemo(() => {
    if (!companyLookupQuery.data) return 1;
    return Math.max(1, Math.ceil(companyLookupQuery.data.total / companyLookupQuery.data.page_size));
  }, [companyLookupQuery.data]);

  const partnerTotalPages = useMemo(() => {
    if (!partnerLookupQuery.data) return 1;
    return Math.max(1, Math.ceil(partnerLookupQuery.data.total / partnerLookupQuery.data.page_size));
  }, [partnerLookupQuery.data]);

  const chapaTotalPages = useMemo(() => {
    if (!chapaLookupQuery.data) return 1;
    return Math.max(1, Math.ceil(chapaLookupQuery.data.total / chapaLookupQuery.data.page_size));
  }, [chapaLookupQuery.data]);

  const errorMessage = useMemo(() => {
    if (!error) return '';
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return 'Sessao expirada ou sem permissao. Faca login novamente.';
      }
      if (error.status === 404) {
        return 'Endpoint de solicitações não encontrado no backend.';
      }
      return error.message || 'Falha ao carregar solicitacoes pendentes.';
    }
    return 'Falha ao carregar solicitacoes pendentes.';
  }, [error]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.page_size));
  }, [data]);

  const pendingTypeLabel = useMemo(() => {
    const code = (selectedRequest?.tep_codigo || '').toUpperCase();
    if (code === 'S') return 'Smar';
    if (code === 'F') return 'Fornecedor';
    if (code === 'C') return 'Cliente';
    return 'Nao informado';
  }, [selectedRequest?.tep_codigo]);

  const openWizard = (item: PendingRequest) => {
    setSelectedRequest(item);
    setWizardStep(getWizardProgress(item).currentKey);
    setConfirmReproveOpen(false);
    setConfirmTepChange(null);
    setCreatePersonOpen(false);
    setCreatePersonError(null);
    setEmpresaStepError(null);
    setPersonSearch(item.nome || '');
    setCompanySearch(item.emp_nome || item.tipo_empresa_nome || '');
    setPartnerSearch(item.emp_nome || item.tipo_empresa_nome || '');
    setChapaSearch('');
    setPersonPage(1);
    setCompanyPage(1);
    setPartnerPage(1);
    setChapaPage(1);
    setCreateNewChapa(true);
    setSelectedUsuChapa(null);
    setUserForm({
      username: suggestUsername(item),
      email: item.email || '',
    });
    setSelectedLinCod(item.lin_cod || 1);
    setSelectedLprCodigo(item.emp_lpr_codigo ?? null);
    setLoginCheck(null);
    setLoginCheckPending(false);
    setPersonForm({
      nome: item.nome || '',
      email: item.email || '',
      sexo: (item.sexo || '').toUpperCase().slice(0, 1),
      endereco: item.endereco || '',
      bairro: item.bairro || '',
      cidade: item.cidade || '',
      estado: item.estado || '',
      cep: item.cep || '',
    });
  };

  const closeWizard = () => {
    setSelectedRequest(null);
    setWizardStep('triagem');
    setConfirmReproveOpen(false);
    setConfirmTepChange(null);
    setCreatePersonOpen(false);
    setCreatePersonError(null);
    setEmpresaStepError(null);
  };

  useEffect(() => {
    if (!selectedRequest) return;
    if (wizardStep === 'empresa' && !isCompanyPending) {
      setWizardStep('usuario');
      return;
    }
    // Nao permitir estar em fase posterior sem vinculos obrigatorios.
    if (!selectedRequest.pes_numero && (wizardStep === 'empresa' || wizardStep === 'usuario')) {
      setWizardStep('pessoa');
      return;
    }
    if (
      isCompanyPending &&
      !selectedRequest.emp_codigo &&
      wizardStep === 'usuario'
    ) {
      setWizardStep('empresa');
    }
  }, [selectedRequest, wizardStep, isCompanyPending]);

  useEffect(() => {
    if (wizardStep !== 'usuario') return;
    const login = userForm.username.trim();
    if (!login) {
      setLoginCheck(null);
      setLoginCheckPending(false);
      return;
    }
    setLoginCheckPending(true);
    const timer = window.setTimeout(() => {
      checkLoginAvailable(login)
        .then((result) => {
          setLoginCheck(result);
        })
        .catch(() => {
          setLoginCheck({ login, available: false, detail: 'Falha ao validar login.' });
        })
        .finally(() => {
          setLoginCheckPending(false);
        });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [userForm.username, wizardStep]);

  const applyRegisterResult = (result: RegisterFieldsResult) => {
    setSelectedRequest((current) => {
      if (!current || Number(current.id) !== result.ppe_codigo) {
        return current;
      }
      const nextTep = (result.tep_codigo || current.tep_codigo || '').toUpperCase();
      const typeFlags = {
        tipo: result.tipo ?? current.tipo,
        cliente: result.cliente ?? current.cliente,
        fornecedor: result.fornecedor ?? current.fornecedor,
        smar: result.smar ?? current.smar,
      };
      return {
        ...current,
        fun_chapa: result.fun_chapa,
        pes_numero: result.pes_numero,
        emp_codigo: result.emp_codigo,
        tep_codigo: nextTep,
        ...typeFlags,
        emp_lpr_codigo: result.emp_codigo ? current.emp_lpr_codigo : null,
      };
    });
    if (!result.emp_codigo) {
      setSelectedLprCodigo(null);
    }
    if (result.fun_chapa && !isSmarPending) {
      setCreateNewChapa(false);
      setSelectedUsuChapa(result.fun_chapa);
    }
  };

  const approveMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      username: string;
      email?: string;
      fun_chapa?: number | null;
      create_new_chapa?: boolean;
      lin_cod?: number | null;
      lpr_codigo?: number | null;
    }) =>
      approvePendingRequest(payload.id, {
        username: payload.username,
        email: payload.email,
        fun_chapa: payload.fun_chapa,
        create_new_chapa: payload.create_new_chapa,
        lin_cod: payload.lin_cod,
        lpr_codigo: payload.lpr_codigo,
      }),
    onSuccess: (result) => {
      showColoredToast({
        color: 'success',
        title: 'Solicitação aprovada',
        description: `Solicitação ${result.ppe_codigo}. Login: ${result.username} | Senha temporária: ${result.temporary_password}`,
        duration: 12000,
      });
      closeWizard();
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
    },
    onError: (mutationError) => {
      showColoredToast({
        color: 'destructive',
        title: 'Falha ao aprovar',
        description:
          mutationError instanceof ApiError
            ? mutationError.message || 'Falha ao aprovar solicitação.'
            : 'Falha ao aprovar solicitação.',
      });
    },
  });

  const discardMutation = useMutation({
    mutationFn: (id: string) => discardPendingRequest(id),
    onSuccess: (result) => {
      showColoredToast({
        color: 'success',
        title: 'Solicitação reprovada',
        description: `Solicitação ${result.ppe_codigo} reprovada com sucesso.`,
      });
      setConfirmReproveOpen(false);
      closeWizard();
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
    },
    onError: (mutationError) => {
      showColoredToast({
        color: 'destructive',
        title: 'Falha ao reprovar',
        description:
          mutationError instanceof ApiError
            ? mutationError.message || 'Falha ao reprovar solicitação.'
            : 'Falha ao reprovar solicitação.',
      });
    },
  });

  const registerFieldsMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      fun_chapa?: number | null;
      pes_numero?: number | null;
      emp_codigo?: number | null;
      tep_codigo?: 'C' | 'F';
    }) =>
      registerPendingRequestFields(payload.id, {
        fun_chapa: payload.fun_chapa,
        pes_numero: payload.pes_numero,
        emp_codigo: payload.emp_codigo,
        tep_codigo: payload.tep_codigo,
      }),
    onSuccess: (result) => {
      showColoredToast({
        color: 'success',
        title: 'Campos atualizados',
        description: result.detail,
      });
      if (result.closed || result.resolved_existing_user) {
        closeWizard();
        queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
        return;
      }
      applyRegisterResult(result);
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'solicitacoes', 'partner-lookup'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'solicitacoes', 'login-options'] });
    },
    onError: (mutationError) => {
      showColoredToast({
        color: 'destructive',
        title: 'Falha ao cadastrar',
        description:
          mutationError instanceof ApiError
            ? mutationError.message || 'Falha ao cadastrar campos.'
            : 'Falha ao cadastrar campos.',
      });
    },
  });

  const createPersonMutation = useMutation({
    mutationFn: async (payload: CreatePersonPayload & { requestId: string }) => {
      const created = await createPerson(payload);
      if (!created?.numero) {
        throw new Error('API não retornou o número da pessoa após gravar.');
      }
      const registered = await registerPendingRequestFields(payload.requestId, {
        pes_numero: created.numero,
      });
      return { created, registered };
    },
    onSuccess: ({ created, registered }) => {
      setCreatePersonError(null);
      showColoredToast({
        color: 'success',
        title: 'Pessoa vinculada',
        description: `Pessoa ${created.numero} criada e vinculada.`,
      });
      applyRegisterResult(registered);
      setCreatePersonOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'solicitacoes', 'person-lookup'] });
    },
    onError: (mutationError) => {
      const message =
        mutationError instanceof ApiError
          ? mutationError.message || 'Falha ao criar pessoa.'
          : mutationError instanceof Error && mutationError.message
            ? mutationError.message
            : 'Falha ao criar pessoa.';
      setCreatePersonError(message);
      showColoredToast({
        color: 'destructive',
        title: 'Falha ao criar pessoa',
        description: message,
      });
    },
  });

  const createEmpresaFromPartnerMutation = useMutation({
    mutationFn: async (payload: { requestId: string; partnerCodigo: string }) =>
      createEmpresaFromPartner(payload.requestId, payload.partnerCodigo),
    onSuccess: (result) => {
      setEmpresaStepError(null);
      showColoredToast({
        color: 'success',
        title: 'Empresa vinculada',
        description: result.detail || `Empresa ${result.emp_codigo} criada/vinculada.`,
      });
      setSelectedRequest((current) => {
        if (!current || Number(current.id) !== result.ppe_codigo) {
          return current;
        }
        return {
          ...current,
          emp_codigo: result.emp_codigo,
          emp_nome: result.emp_nome || current.emp_nome,
        };
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'solicitacoes', 'partner-lookup'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'solicitacoes', 'company-lookup'] });
    },
    onError: (mutationError) => {
      const message =
        mutationError instanceof ApiError
          ? mutationError.message || 'Falha ao criar empresa a partir do parceiro.'
          : mutationError instanceof Error && mutationError.message
            ? mutationError.message
            : 'Falha ao criar empresa a partir do parceiro.';
      setEmpresaStepError(message);
      showColoredToast({
        color: 'destructive',
        title: 'Falha ao criar empresa',
        description: message,
      });
    },
  });

  const isActionLoading =
    approveMutation.isPending ||
    discardMutation.isPending ||
    registerFieldsMutation.isPending ||
    createPersonMutation.isPending ||
    createEmpresaFromPartnerMutation.isPending;

  const canGoNext = useMemo(() => {
    if (!selectedRequest) return false;
    if (wizardStep === 'triagem') return true;
    if (wizardStep === 'pessoa') return Boolean(selectedRequest.pes_numero);
    if (wizardStep === 'empresa') {
      return isCompanyPending ? Boolean(selectedRequest.emp_codigo) : true;
    }
    return false;
  }, [selectedRequest, wizardStep, isCompanyPending]);

  const nextBlockedReason = useMemo(() => {
    if (!selectedRequest) return 'Selecione uma solicitação.';
    if (wizardStep === 'pessoa' && !selectedRequest.pes_numero) {
      return 'Vincule uma pessoa antes de continuar.';
    }
    if (wizardStep === 'empresa' && isCompanyPending && !selectedRequest.emp_codigo) {
      return 'Vincule uma empresa antes de continuar.';
    }
    return '';
  }, [selectedRequest, wizardStep, isCompanyPending]);

  const canApprove = useMemo(() => {
    if (!selectedRequest) return false;
    if (!selectedRequest.pes_numero) return false;
    if (isCompanyPending && !selectedRequest.emp_codigo) return false;
    if (!createNewChapa && !selectedUsuChapa) return false;
    const username = userForm.username.trim();
    if (!username) return false;
    if (loginCheckPending) return false;
    if (!loginCheck || !loginCheck.available) return false;
    if (!selectedLinCod) return false;
    return true;
  }, [
    selectedRequest,
    isCompanyPending,
    createNewChapa,
    selectedUsuChapa,
    userForm.username,
    loginCheckPending,
    loginCheck,
    selectedLinCod,
  ]);

  const approveBlockedReason = useMemo(() => {
    if (!selectedRequest) return 'Selecione uma solicitação.';
    if (!selectedRequest.pes_numero) return 'Vincule uma pessoa antes de aprovar.';
    if (isCompanyPending && !selectedRequest.emp_codigo) {
      return 'Vincule uma empresa antes de aprovar.';
    }
    if (!createNewChapa && !selectedUsuChapa) {
      return 'Selecione uma chapa existente ou marque Criar nova.';
    }
    if (!userForm.username.trim()) return 'Informe o login.';
    if (loginCheckPending) return 'Aguarde a validacao do login.';
    if (!loginCheck || !loginCheck.available) {
      return loginCheck?.detail || 'Informe um login disponivel.';
    }
    if (!selectedLinCod) return 'Selecione o idioma.';
    return '';
  }, [
    selectedRequest,
    isCompanyPending,
    createNewChapa,
    selectedUsuChapa,
    userForm.username,
    loginCheckPending,
    loginCheck,
    selectedLinCod,
  ]);

  const goNext = () => {
    const index = wizardSteps.indexOf(wizardStep);
    if (index < 0 || index >= wizardSteps.length - 1) return;
    if (!canGoNext) {
      if (nextBlockedReason) {
        showColoredToast({
          color: 'warning',
          title: 'Etapa incompleta',
          description: nextBlockedReason,
        });
      }
      return;
    }
    setWizardStep(wizardSteps[index + 1]);
  };

  const goBack = () => {
    const index = wizardSteps.indexOf(wizardStep);
    if (index <= 0) return;
    setWizardStep(wizardSteps[index - 1]);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    if (!canApprove) {
      showColoredToast({
        color: 'destructive',
        title: 'Nao e possivel aprovar',
        description: approveBlockedReason || 'Complete os campos obrigatórios.',
      });
      return;
    }
    approveMutation.mutate({
      id: selectedRequest.id,
      username: userForm.username.trim(),
      email: isSmarPending ? userForm.email.trim() : selectedRequest.email,
      fun_chapa: createNewChapa ? null : selectedUsuChapa,
      create_new_chapa: createNewChapa,
      lin_cod: selectedLinCod,
      lpr_codigo: selectedLprCodigo,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
            <ClipboardList size={22} className="text-amber-400" /> Solicitações
          </h1>
          <p className="text-sm text-zinc-400">Pendências de solicitação aguardando análise administrativa.</p>
        </div>
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
              placeholder="Buscar por nome, e-mail ou chapa..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/60 focus:outline-none"
            />
          </div>
          <ViewToggle className="sm:ml-auto" value={viewMode} onChange={setViewMode} />
        </div>

        <div className="p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-zinc-400 gap-2">
              <Loader2 size={18} className="animate-spin" /> Carregando solicitações...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-rose-300 text-sm">{errorMessage}</div>
          ) : !data || data.items.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">Nenhuma solicitação pendente.</p>
          ) : (
            <>
              {viewMode === 'tabela' ? (
                <div className="overflow-hidden rounded-xl border border-zinc-800">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-800/60">
                      <tr className="text-left text-[11px] uppercase tracking-wider text-zinc-400">
                        <th className="w-10 px-4 py-3" />
                        <th className="px-4 py-3 font-semibold">Tipo</th>
                        <th className="px-4 py-3 font-semibold">Nome</th>
                        <th className="px-4 py-3 font-semibold">E-mail</th>
                        <th className="px-4 py-3 font-semibold">Empresa</th>
                        <th className="px-4 py-3 font-semibold">Andamento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {data.items.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-800/40">
                          <td className="px-4 py-3">
                            <SettingsRowActions
                              editLabel="Analisar"
                              editIcon={ClipboardList}
                              onEdit={() => openWizard(item)}
                            />
                          </td>
                          <td className="px-4 py-3 text-zinc-100">
                            <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200">
                              {item.tipo}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-zinc-100">{item.nome || '-'}</td>
                          <td className="px-4 py-3 text-zinc-300">{item.email || '-'}</td>
                          <td className="px-4 py-3 text-zinc-300">{requestCompanyLabel(item)}</td>
                          <td className="px-4 py-3">
                            <WizardProgressBadge item={item} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {viewMode === 'lista' ? (
                <div className="grid gap-2">
                  {data.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700"
                    >
                      <div className="flex items-start gap-3">
                        <SettingsRowActions
                          editLabel="Analisar"
                          editIcon={ClipboardList}
                          onEdit={() => openWizard(item)}
                        />
                        <button
                          type="button"
                          onClick={() => openWizard(item)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-zinc-100">{item.nome || '-'}</p>
                              <p className="text-xs text-zinc-500">{item.email || 'Sem e-mail'}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200">
                                {item.tipo}
                              </span>
                              <WizardProgressBadge item={item} />
                            </div>
                          </div>
                          <RequestUserCompanyBlocks item={item} />
                          <div className="mt-3">
                            <RequestFlagBadges item={item} />
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {data.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5"
                    >
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200">
                          {item.tipo}
                        </span>
                        <WizardProgressBadge item={item} />
                      </div>

                      <RequestUserCompanyBlocks item={item} />

                      <div className="mt-3">
                        <RequestFlagBadges item={item} />
                      </div>

                      <div className="mt-auto border-t border-zinc-800 pt-3">
                        <SettingsRowActions
                          variant="buttons"
                          editLabel="Analisar"
                          editIcon={ClipboardList}
                          onEdit={() => openWizard(item)}
                        />
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
          <button
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
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="px-3 py-1.5 rounded-lg text-sm bg-zinc-800 text-zinc-300 disabled:opacity-40"
          >
            Proxima
          </button>
        </div>
      )}

      <Dialog
        open={Boolean(selectedRequest)}
        onOpenChange={(open) => {
          if (!open) {
            closeWizard();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-900 text-zinc-100 sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Aprovação de Solicitação</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Wizard de triagem, vínculos e criação de usuário.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-2">
                {wizardSteps.map((step, index) => {
                  const active = step === wizardStep;
                  const done = wizardSteps.indexOf(wizardStep) > index;
                  return (
                    <div
                      key={step}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        active
                          ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                          : done
                            ? 'border-emerald-700 bg-emerald-950/30 text-emerald-200'
                            : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {index + 1}. {stepLabels[step]}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedRequest.pes_numero ? (
                  <span className="rounded-full border border-sky-700 bg-sky-950/30 px-2.5 py-1 text-xs text-sky-200">
                    Pessoa #{selectedRequest.pes_numero}
                  </span>
                ) : null}
                {selectedRequest.emp_codigo ? (
                  <span className="rounded-full border border-violet-700 bg-violet-950/30 px-2.5 py-1 text-xs text-violet-200">
                    Empresa #{selectedRequest.emp_codigo}
                  </span>
                ) : null}
                {selectedRequest.fun_chapa ? (
                  <span className="rounded-full border border-amber-700 bg-amber-950/30 px-2.5 py-1 text-xs text-amber-200">
                    Chapa #{selectedRequest.fun_chapa}
                  </span>
                ) : null}
              </div>

              {wizardStep === 'triagem' && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-sky-800/50 bg-sky-950/20 px-3 py-3">
                    <p className="text-xs uppercase tracking-wider text-sky-300">Relatorio da Pendencia</p>
                    <p className="mt-1 text-zinc-100">
                      Há uma pendência do tipo{' '}
                      <span className="font-semibold text-sky-200">{pendingTypeLabel}</span> para esta
                      solicitação.
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Código da solicitação: {selectedRequest.id}</p>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Dados do Solicitante</p>
                    <div className="mt-2 space-y-1 text-zinc-100">
                      <DetailField label="Código" value={selectedRequest.id} />
                      <DetailField label="Nome" value={selectedRequest.nome} />
                      <DetailField label="E-mail" value={selectedRequest.email} />
                      <DetailField label="Sexo" value={sexoLabel(selectedRequest.sexo || '')} />
                      <DetailField label="Endereço" value={selectedRequest.endereco} />
                      <DetailField label="Bairro" value={selectedRequest.bairro} />
                      <DetailField label="Cidade" value={selectedRequest.cidade} />
                      <DetailField
                        label="Estado"
                        value={selectedRequest.est_nome || selectedRequest.estado || selectedRequest.est_codigo}
                      />
                      <DetailField label="CEP" value={selectedRequest.cep} />
                      <DetailField label="País" value={selectedRequest.pais_nome || selectedRequest.pai_codigo} />
                      <DetailField label="Data da solicitação" value={selectedRequest.ppe_dt_solic} />
                      <DetailField label="Motivo" value={selectedRequest.ppe_motivo} preWrap />
                    </div>
                  </div>

                  {(isCompanyPending ||
                    Boolean(
                      selectedRequest.emp_nome ||
                        selectedRequest.tipo_empresa_nome ||
                        selectedRequest.emp_endereco ||
                        selectedRequest.emp_cidade,
                    )) && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3">
                      <p className="text-xs uppercase tracking-wider text-zinc-500">Dados da Empresa</p>
                      <div className="mt-2 space-y-1 text-zinc-100">
                        <DetailField
                          label="Nome"
                          value={selectedRequest.emp_nome || selectedRequest.tipo_empresa_nome}
                        />
                        <DetailField label="Endereço" value={selectedRequest.emp_endereco} />
                        <DetailField label="Bairro" value={selectedRequest.emp_bairro} />
                        <DetailField label="Cidade" value={selectedRequest.emp_cidade} />
                        <DetailField
                          label="Estado"
                          value={
                            selectedRequest.emp_est_nome ||
                            selectedRequest.emp_estado ||
                            selectedRequest.emp_est_codigo
                          }
                        />
                        <DetailField label="CEP" value={selectedRequest.emp_cep} />
                        <DetailField
                          label="País"
                          value={selectedRequest.emp_pais_nome || selectedRequest.emp_pai_codigo}
                        />
                        <DetailField label="Homepage" value={selectedRequest.emp_homepage} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {wizardStep === 'pessoa' && (
                <div className="space-y-3">
                  {selectedRequest.fun_chapa ? (
                    <p className="rounded-lg border border-sky-800/50 bg-sky-950/20 px-3 py-2 text-xs text-sky-200">
                      Funcionário RH (chapa {selectedRequest.fun_chapa}). Se a pessoa já tiver usuário
                      web, ao vincular a rotina coloca a pessoa no funcionario novo e encerra a
                      solicitação.
                    </p>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      value={personSearch}
                      onChange={(event) => {
                        setPersonSearch(event.target.value);
                        setPersonPage(1);
                      }}
                      placeholder="Buscar pessoa por nome, email ou numero..."
                      className="min-w-[240px] flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCreatePersonError(null);
                        setCreatePersonOpen(true);
                      }}
                      className="rounded-lg border border-amber-700 bg-amber-950/40 px-3 py-2 text-xs font-medium text-amber-200 hover:bg-amber-900/50"
                    >
                      Nova pessoa
                    </button>
                  </div>
                  <div className="max-h-80 overflow-auto rounded-lg border border-zinc-800">
                    {personLookupQuery.isLoading ? (
                      <p className="p-3 text-sm text-zinc-400">Carregando pessoas...</p>
                    ) : (
                      <table className="w-full text-sm">
                        <tbody>
                          {personLookupQuery.data?.items.map((item) => {
                            const selected = selectedRequest.pes_numero === item.numero;
                            return (
                              <tr
                                key={item.id}
                                className={`border-b border-zinc-800 last:border-b-0 ${
                                  selected ? 'bg-amber-950/30' : 'hover:bg-zinc-800/50'
                                }`}
                              >
                                <td className="px-3 py-2 text-zinc-300">{item.numero}</td>
                                <td className="px-3 py-2 text-zinc-100">
                                  {item.nome || '-'}
                                  {item.tem_usuario ? (
                                    <span className="ml-2 rounded border border-emerald-700 bg-emerald-950/40 px-1.5 py-0.5 text-[10px] uppercase text-emerald-300">
                                      Tem usuario
                                    </span>
                                  ) : null}
                                </td>
                                <td className="px-3 py-2 text-zinc-400">{item.email || '-'}</td>
                                <td className="px-3 py-2 text-right">
                                  <button
                                    type="button"
                                    disabled={isActionLoading}
                                    onClick={() =>
                                      registerFieldsMutation.mutate({
                                        id: selectedRequest.id,
                                        pes_numero: item.numero,
                                      })
                                    }
                                    className="rounded-md bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-500 disabled:opacity-50"
                                  >
                                    {selected ? 'Vinculada' : 'Vincular'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                          {personLookupQuery.data && personLookupQuery.data.items.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">
                                Nenhuma pessoa encontrada.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      disabled={personPage <= 1}
                      onClick={() => setPersonPage((current) => current - 1)}
                      className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                    >
                      Anterior
                    </button>
                    <span className="text-xs text-zinc-400">
                      {personPage} / {personTotalPages}
                    </span>
                    <button
                      type="button"
                      disabled={personPage >= personTotalPages}
                      onClick={() => setPersonPage((current) => current + 1)}
                      className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                    >
                      Proxima
                    </button>
                  </div>
                </div>
              )}

              {wizardStep === 'empresa' && (
                <div className="space-y-4">
                  {empresaStepError && (
                    <div className="rounded-lg border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
                      {empresaStepError}
                    </div>
                  )}

                  <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Tipo da empresa</p>
                    <p className="text-xs text-zinc-500">
                      Corrige se o solicitante marcou o tipo errado. Se ja houver empresa vinculada, o
                      vínculo será removido ao trocar.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(['C', 'F'] as const).map((tep) => {
                        const active = (selectedRequest.tep_codigo || '').toUpperCase() === tep;
                        return (
                          <button
                            key={tep}
                            type="button"
                            disabled={isActionLoading}
                            onClick={() => {
                              setEmpresaStepError(null);
                              const current = (selectedRequest.tep_codigo || '').toUpperCase();
                              if (tep === current) {
                                return;
                              }
                              if (selectedRequest.emp_codigo) {
                                setConfirmTepChange(tep);
                                return;
                              }
                              registerFieldsMutation.mutate({
                                id: selectedRequest.id,
                                tep_codigo: tep,
                              });
                            }}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium disabled:opacity-50 ${
                              active
                                ? 'bg-amber-600 text-white'
                                : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                            }`}
                          >
                            {tep === 'C' ? 'Cliente' : 'Fornecedor'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      {selectedRequest.tep_codigo?.toUpperCase() === 'F'
                        ? 'Fornecedores (gerar empresa a partir do cadastro)'
                        : 'Clientes (gerar empresa a partir do cadastro)'}
                    </p>
                    <p className="text-xs text-zinc-500">
                      A empresa é gerada a partir do código do cliente/fornecedor, não cadastrada
                      manualmente.
                    </p>
                    <input
                      value={partnerSearch}
                      onChange={(event) => {
                        setPartnerSearch(event.target.value);
                        setPartnerPage(1);
                      }}
                      placeholder={
                        selectedRequest.tep_codigo?.toUpperCase() === 'F'
                          ? 'Buscar fornecedor por codigo ou razao social...'
                          : 'Buscar cliente por codigo ou nome...'
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
                    />
                    <div className="max-h-56 overflow-auto rounded-lg border border-zinc-800">
                      {partnerLookupQuery.isLoading ? (
                        <p className="p-3 text-sm text-zinc-400">Carregando parceiros...</p>
                      ) : (
                        <table className="w-full text-sm">
                          <tbody>
                            {partnerLookupQuery.data?.items.map((item) => (
                              <tr
                                key={item.id}
                                className="border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50"
                              >
                                <td className="px-3 py-2 text-zinc-300">{item.codigo}</td>
                                <td className="px-3 py-2 text-zinc-100">{item.nome || '-'}</td>
                                <td className="px-3 py-2 text-zinc-400">{item.cidade || '-'}</td>
                                <td className="px-3 py-2 text-right">
                                  {item.tem_empresa ? (
                                    <span className="text-xs text-amber-300" title="Já existe empresa vinculada">
                                      Já tem empresa
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      disabled={isActionLoading}
                                      onClick={() => {
                                        setEmpresaStepError(null);
                                        createEmpresaFromPartnerMutation.mutate({
                                          requestId: selectedRequest.id,
                                          partnerCodigo: item.codigo,
                                        });
                                      }}
                                      className="rounded-md bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-500 disabled:opacity-50"
                                    >
                                      Criar empresa
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {partnerLookupQuery.data && partnerLookupQuery.data.items.length === 0 && (
                              <tr>
                                <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">
                                  Nenhum parceiro encontrado.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={partnerPage <= 1}
                        onClick={() => setPartnerPage((current) => current - 1)}
                        className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                      >
                        Anterior
                      </button>
                      <span className="text-xs text-zinc-400">
                        {partnerPage} / {partnerTotalPages}
                      </span>
                      <button
                        type="button"
                        disabled={partnerPage >= partnerTotalPages}
                        onClick={() => setPartnerPage((current) => current + 1)}
                        className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                      >
                        Proxima
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Empresas já cadastradas
                    </p>
                    <input
                      value={companySearch}
                      onChange={(event) => {
                        setCompanySearch(event.target.value);
                        setCompanyPage(1);
                      }}
                      placeholder="Buscar empresa por codigo, nome ou cidade..."
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
                    />
                    <div className="max-h-56 overflow-auto rounded-lg border border-zinc-800">
                      {companyLookupQuery.isLoading ? (
                        <p className="p-3 text-sm text-zinc-400">Carregando empresas...</p>
                      ) : (
                        <table className="w-full text-sm">
                          <tbody>
                            {companyLookupQuery.data?.items.map((item) => {
                              const selected = selectedRequest.emp_codigo === item.codigo;
                              return (
                                <tr
                                  key={item.id}
                                  className={`border-b border-zinc-800 last:border-b-0 ${
                                    selected ? 'bg-amber-950/30' : 'hover:bg-zinc-800/50'
                                  }`}
                                >
                                  <td className="px-3 py-2 text-zinc-300">{item.codigo}</td>
                                  <td className="px-3 py-2 text-zinc-100">{item.nome || '-'}</td>
                                  <td className="px-3 py-2 text-zinc-400">
                                    {item.cidade || '-'}
                                    {item.uf ? `/${item.uf}` : ''}
                                  </td>
                                  <td className="px-3 py-2 text-right">
                                    <button
                                      type="button"
                                      disabled={isActionLoading}
                                      onClick={() => {
                                        const lprRaw = item.listaPreco?.trim();
                                        const lpr = lprRaw ? Number(lprRaw) : null;
                                        setSelectedLprCodigo(
                                          lpr !== null && !Number.isNaN(lpr) ? lpr : null,
                                        );
                                        setSelectedRequest((current) =>
                                          current
                                            ? {
                                                ...current,
                                                emp_lpr_codigo:
                                                  lpr !== null && !Number.isNaN(lpr) ? lpr : null,
                                              }
                                            : current,
                                        );
                                        registerFieldsMutation.mutate({
                                          id: selectedRequest.id,
                                          emp_codigo: item.codigo,
                                        });
                                      }}
                                      className="rounded-md bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-500 disabled:opacity-50"
                                    >
                                      {selected ? 'Vinculada' : 'Vincular'}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                            {companyLookupQuery.data && companyLookupQuery.data.items.length === 0 && (
                              <tr>
                                <td colSpan={4} className="px-3 py-6 text-center text-zinc-500">
                                  Nenhuma empresa encontrada.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={companyPage <= 1}
                        onClick={() => setCompanyPage((current) => current - 1)}
                        className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                      >
                        Anterior
                      </button>
                      <span className="text-xs text-zinc-400">
                        {companyPage} / {companyTotalPages}
                      </span>
                      <button
                        type="button"
                        disabled={companyPage >= companyTotalPages}
                        onClick={() => setCompanyPage((current) => current + 1)}
                        className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                      >
                        Proxima
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 'usuario' && (
                <div className="space-y-3">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Sugestoes de login</p>
                    {loginOptionsQuery.isLoading ? (
                      <p className="text-sm text-zinc-400">Carregando sugestoes...</p>
                    ) : loginOptionsQuery.isError ? (
                      <p className="text-sm text-rose-300">
                        {loginOptionsQuery.error instanceof ApiError
                          ? loginOptionsQuery.error.message || 'Falha ao carregar sugestoes.'
                          : 'Falha ao carregar sugestoes.'}
                      </p>
                    ) : (
                      <div className="space-y-1">
                        {(loginOptionsQuery.data || []).map((option) => (
                          <label
                            key={option.login}
                            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                              option.used
                                ? 'cursor-not-allowed text-zinc-500'
                                : 'cursor-pointer text-zinc-200 hover:bg-zinc-800/60'
                            }`}
                          >
                            <input
                              type="radio"
                              name="login-option"
                              disabled={option.used}
                              checked={userForm.username === option.login}
                              onChange={() => {
                                setUserForm((current) => ({ ...current, username: option.login }));
                              }}
                            />
                            <span>{option.login}</span>
                            {option.used ? (
                              <span className="text-xs font-medium text-rose-400">Já existe</span>
                            ) : null}
                          </label>
                        ))}
                        {(loginOptionsQuery.data || []).length === 0 && (
                          <p className="text-xs text-zinc-500">Nenhuma sugestao gerada.</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Login e e-mail</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <label className="space-y-1">
                        <span className="text-xs text-zinc-400">Login</span>
                        <input
                          value={userForm.username}
                          onChange={(event) =>
                            setUserForm((current) => ({ ...current, username: event.target.value }))
                          }
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                        />
                        <p
                          className={`text-xs ${
                            loginCheckPending
                              ? 'text-zinc-500'
                              : loginCheck?.available
                                ? 'text-emerald-400'
                                : loginCheck
                                  ? 'text-rose-400'
                                  : 'text-zinc-500'
                          }`}
                        >
                          {loginCheckPending
                            ? 'Validando...'
                            : loginCheck
                              ? loginCheck.available
                                ? `"${loginCheck.login}" Valido`
                                : loginCheck.detail || 'Já existe'
                              : 'Digite ou escolha uma sugestao'}
                        </p>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs text-zinc-400">E-mail</span>
                        <input
                          value={userForm.email}
                          readOnly={!isSmarPending}
                          onChange={(event) =>
                            setUserForm((current) => ({ ...current, email: event.target.value }))
                          }
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 read-only:opacity-70"
                        />
                      </label>
                    </div>
                    {!isSmarPending && (
                      <p className="text-xs text-zinc-500">
                        Para Cliente/Fornecedor, o e-mail permanece o da solicitação; o login é escolhido
                        aqui.
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">Idioma e lista de preco</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <label className="space-y-1">
                        <span className="text-xs text-zinc-400">Idioma</span>
                        <select
                          value={selectedLinCod}
                          onChange={(event) => setSelectedLinCod(Number(event.target.value))}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                        >
                          {(languagesQuery.data || []).map((lang) => (
                            <option key={lang.lin_cod} value={lang.lin_cod}>
                              {lang.nome || `Idioma ${lang.lin_cod}`}
                            </option>
                          ))}
                          {(languagesQuery.data || []).length === 0 ? (
                            <option value={1}>Padrao (1)</option>
                          ) : null}
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs text-zinc-400">Lista de preco</span>
                        <select
                          value={selectedLprCodigo ?? ''}
                          onChange={(event) => {
                            const raw = event.target.value;
                            setSelectedLprCodigo(raw ? Number(raw) : null);
                          }}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                        >
                          <option value="">Padrao Smar</option>
                          {(priceListsQuery.data || []).map((item) => (
                            <option key={item.lpr_codigo} value={item.lpr_codigo}>
                              {item.nome}
                              {item.emp_nome ? `-${item.emp_nome}` : ''}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-3 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-wider text-zinc-500">Chapa de acesso</p>
                      <label className="inline-flex items-center gap-2 text-xs text-zinc-300">
                        <input
                          type="checkbox"
                          checked={createNewChapa}
                          onChange={(event) => {
                            setCreateNewChapa(event.target.checked);
                            if (event.target.checked) {
                              setSelectedUsuChapa(null);
                            }
                          }}
                        />
                        Criar nova chapa
                      </label>
                    </div>
                    {isSmarPending && selectedRequest.fun_chapa ? (
                      <p className="text-xs text-zinc-500">
                        A chapa RH {selectedRequest.fun_chapa} será usada como chapa de acesso se estiver
                        livre ao criar nova chapa de acesso.
                      </p>
                    ) : null}
                    {selectedUsuChapa ? (
                      <span className="inline-flex rounded-full border border-amber-700 bg-amber-950/30 px-2.5 py-1 text-xs text-amber-200">
                        Chapa selecionada #{selectedUsuChapa}
                      </span>
                    ) : null}

                    {!createNewChapa && (
                      <>
                        <input
                          value={chapaSearch}
                          onChange={(event) => {
                            setChapaSearch(event.target.value);
                            setChapaPage(1);
                          }}
                          placeholder="Buscar chapa por login ou numero..."
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500"
                        />
                        <div className="max-h-56 overflow-auto rounded-lg border border-zinc-800">
                          {chapaLookupQuery.isLoading ? (
                            <p className="p-3 text-sm text-zinc-400">Carregando chapas...</p>
                          ) : (
                            <table className="w-full text-sm">
                              <tbody>
                                {chapaLookupQuery.data?.items.map((item) => {
                                  const selected = selectedUsuChapa === item.usu_chapa;
                                  return (
                                    <tr
                                      key={item.usu_chapa}
                                      className={`border-b border-zinc-800 last:border-b-0 ${
                                        selected ? 'bg-amber-950/30' : 'hover:bg-zinc-800/50'
                                      }`}
                                    >
                                      <td className="px-3 py-2 text-zinc-300">{item.usu_chapa}</td>
                                      <td className="px-3 py-2 text-zinc-100">
                                        {item.usu_nome || item.usu_loginweb || item.usu_login || '-'}
                                      </td>
                                      <td className="px-3 py-2 text-right">
                                        <button
                                          type="button"
                                          disabled={isActionLoading}
                                          onClick={() => {
                                            setSelectedUsuChapa(item.usu_chapa);
                                            setCreateNewChapa(false);
                                            if (!isSmarPending) {
                                              registerFieldsMutation.mutate({
                                                id: selectedRequest.id,
                                                fun_chapa: item.usu_chapa,
                                              });
                                            }
                                          }}
                                          className="rounded-md bg-amber-600 px-2 py-1 text-xs text-white hover:bg-amber-500 disabled:opacity-50"
                                        >
                                          {selected ? 'Selecionada' : 'Selecionar'}
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            disabled={chapaPage <= 1}
                            onClick={() => setChapaPage((current) => current - 1)}
                            className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                          >
                            Anterior
                          </button>
                          <span className="text-xs text-zinc-400">
                            {chapaPage} / {chapaTotalPages}
                          </span>
                          <button
                            type="button"
                            disabled={chapaPage >= chapaTotalPages}
                            onClick={() => setChapaPage((current) => current + 1)}
                            className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 disabled:opacity-40"
                          >
                            Proxima
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="pt-2 flex-wrap gap-2">
            <button
              type="button"
              onClick={closeWizard}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
            >
              Cancelar
            </button>
            {wizardStep === 'triagem' && (
              <button
                type="button"
                disabled={!selectedRequest || isActionLoading}
                onClick={() => setConfirmReproveOpen(true)}
                className="rounded-lg bg-rose-600/90 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
              >
                Reprovar
              </button>
            )}
            {wizardStep !== 'triagem' && (
              <button
                type="button"
                onClick={goBack}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                Voltar
              </button>
            )}
            {wizardStep !== 'usuario' ? (
              <button
                type="button"
                disabled={!canGoNext || isActionLoading}
                title={!canGoNext ? nextBlockedReason : undefined}
                onClick={goNext}
                className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500 disabled:opacity-50"
              >
                Proximo
              </button>
            ) : (
              <button
                type="button"
                disabled={!canApprove || isActionLoading}
                title={!canApprove ? approveBlockedReason : undefined}
                onClick={handleApprove}
                className="rounded-lg bg-emerald-600/90 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
              >
                Aprovar
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={confirmReproveOpen}
        onOpenChange={(open) => {
          if (!isActionLoading) {
            setConfirmReproveOpen(open);
          }
        }}
      >
        <AlertDialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar reprovacao</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Esta ação vai reprovar a solicitação e dar baixa no registro pendente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isActionLoading}
              className="border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!selectedRequest || isActionLoading}
              onClick={(event) => {
                event.preventDefault();
                if (selectedRequest) {
                  discardMutation.mutate(selectedRequest.id);
                }
              }}
              className="bg-rose-600 text-white hover:bg-rose-500"
            >
              Confirmar reprovacao
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={confirmTepChange !== null}
        onOpenChange={(open) => {
          if (!isActionLoading && !open) {
            setConfirmTepChange(null);
          }
        }}
      >
        <AlertDialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Trocar tipo da empresa</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Já existe empresa vinculada (#{selectedRequest?.emp_codigo ?? '-'}). Ao
              trocar para{' '}
              {confirmTepChange === 'F' ? 'Fornecedor' : 'Cliente'}, esse vínculo será removido e será
              preciso selecionar/criar a empresa novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isActionLoading}
              className="border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!selectedRequest || !confirmTepChange || isActionLoading}
              onClick={(event) => {
                event.preventDefault();
                if (!selectedRequest || !confirmTepChange) return;
                const nextTep = confirmTepChange;
                setConfirmTepChange(null);
                registerFieldsMutation.mutate({
                  id: selectedRequest.id,
                  tep_codigo: nextTep,
                });
              }}
              className="bg-amber-600 text-white hover:bg-amber-500"
            >
              Trocar e limpar vínculo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={createPersonOpen}
        onOpenChange={(open) => {
          setCreatePersonOpen(open);
          if (!open) {
            setCreatePersonError(null);
          }
        }}
      >
        <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova pessoa</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Dados pré-preenchidos a partir da solicitação. Contatos ficam fora do escopo desta entrega.
            </DialogDescription>
          </DialogHeader>
          {createPersonError && (
            <div className="rounded-lg border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
              {createPersonError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(
              [
                ['nome', 'Nome'],
                ['email', 'E-mail'],
                ['sexo', 'Sexo (M/F)'],
                ['endereco', 'Endereço'],
                ['bairro', 'Bairro'],
                ['cidade', 'Cidade'],
                ['estado', 'Estado'],
                ['cep', 'CEP'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className={`space-y-1 ${key === 'nome' || key === 'endereco' ? 'sm:col-span-2' : ''}`}>
                <span className="text-xs text-zinc-400">{label}</span>
                <input
                  value={personForm[key]}
                  onChange={(event) =>
                    setPersonForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
                />
              </label>
            ))}
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setCreatePersonOpen(false)}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!selectedRequest || !personForm.nome.trim() || createPersonMutation.isPending}
              onClick={() => {
                if (!selectedRequest) return;
                createPersonMutation.mutate({
                  requestId: selectedRequest.id,
                  nome: personForm.nome.trim(),
                  email: personForm.email.trim(),
                  sexo: personForm.sexo.trim().toUpperCase().slice(0, 1),
                  endereco: personForm.endereco.trim(),
                  bairro: personForm.bairro.trim(),
                  cidade: personForm.cidade.trim(),
                  estado: personForm.estado.trim(),
                  cep: personForm.cep.trim(),
                  est_codigo: selectedRequest.est_codigo,
                  pai_codigo: selectedRequest.pai_codigo,
                });
              }}
              className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500 disabled:opacity-50"
            >
              Criar e vincular
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
