import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Loader2, Mail, MapPin, User } from 'lucide-react';
import { apiRequest } from '@/api/client';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

type TepCodigo = 'C' | 'F';

interface CountryOption {
  pai_codigo: number;
  nome: string;
}

interface StateOption {
  est_codigo: number;
  pai_codigo: number;
  nome: string;
}

interface AccessRequestPayload {
  tep_codigo: TepCodigo;
  nome: string;
  email: string;
  pai_codigo: number;
  motivo: string;
  emp_nome: string;
  emp_endereco: string;
  emp_bairro: string;
  emp_cidade: string;
  emp_pai_codigo: number;
  emp_est_codigo: number;
  emp_estado: string;
  emp_cep: string;
  emp_homepage: string;
}

interface AccessRequestResult {
  ppe_codigo: number;
  tep_codigo: string;
  email: string;
}

const inputClass =
  'w-full rounded-xl bg-surface-container-highest px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground';

const emptyForm = {
  tep_codigo: 'C' as TepCodigo,
  nome: '',
  email: '',
  pai_codigo: '',
  motivo: '',
  emp_nome: '',
  emp_endereco: '',
  emp_bairro: '',
  emp_cidade: '',
  emp_pai_codigo: '',
  emp_est_codigo: '',
  emp_estado: '',
  emp_cep: '',
  emp_homepage: '',
};

function listCountries(): Promise<CountryOption[]> {
  return apiRequest<CountryOption[]>('/users/catalog/countries/?language=1');
}

function listStates(paiCodigo: number): Promise<StateOption[]> {
  if (!paiCodigo) return Promise.resolve([]);
  return apiRequest<StateOption[]>(`/users/catalog/states/?pai_codigo=${paiCodigo}`);
}

function createAccessRequest(payload: AccessRequestPayload): Promise<AccessRequestResult> {
  return apiRequest<AccessRequestResult>('/users/access-requests/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export default function RequestAccess() {
  const { locale } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countriesQuery = useQuery({
    queryKey: ['public', 'catalog', 'countries'],
    queryFn: listCountries,
  });

  const empPai = Number(form.emp_pai_codigo) || 0;

  const companyStatesQuery = useQuery({
    queryKey: ['public', 'catalog', 'states', empPai],
    queryFn: () => listStates(empPai),
    enabled: empPai > 0,
  });

  const countries = countriesQuery.data ?? [];
  const companyStates = companyStatesQuery.data ?? [];

  const brazilCode = useMemo(
    () => countries.find((item) => /brasil|brazil/i.test(item.nome))?.pai_codigo,
    [countries],
  );

  useEffect(() => {
    if (!brazilCode) return;
    setForm((current) => ({
      ...current,
      pai_codigo: current.pai_codigo || String(brazilCode),
      emp_pai_codigo: current.emp_pai_codigo || String(brazilCode),
    }));
  }, [brazilCode]);

  const mutation = useMutation({
    mutationFn: createAccessRequest,
    onSuccess: () => {
      setError(null);
      setSent(true);
    },
    onError: (err: Error) => {
      setError(err.message || t('request.error', locale));
    },
  });

  function updateField<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleCompanyCountryChange(value: string) {
    setForm((current) => ({
      ...current,
      emp_pai_codigo: value,
      emp_est_codigo: '',
      emp_estado: '',
    }));
  }

  function handleCompanyStateChange(value: string) {
    const selected = companyStates.find((item) => String(item.est_codigo) === value);
    setForm((current) => ({
      ...current,
      emp_est_codigo: value,
      emp_estado: selected?.nome ?? '',
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    mutation.mutate({
      tep_codigo: form.tep_codigo,
      nome: form.nome.trim(),
      email: form.email.trim(),
      pai_codigo: Number(form.pai_codigo),
      motivo: form.motivo.trim(),
      emp_nome: form.emp_nome.trim(),
      emp_endereco: form.emp_endereco.trim(),
      emp_bairro: form.emp_bairro.trim(),
      emp_cidade: form.emp_cidade.trim(),
      emp_pai_codigo: Number(form.emp_pai_codigo),
      emp_est_codigo: Number(form.emp_est_codigo),
      emp_estado: form.emp_estado.trim(),
      emp_cep: form.emp_cep.trim(),
      emp_homepage: form.emp_homepage.trim(),
    });
  }

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-background rounded-2xl shadow-ambient-lg p-8"
      >
        <h2 className="text-2xl font-display font-bold text-foreground">
          {t('request.title', locale)}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{t('request.subtitle', locale)}</p>

        {sent ? (
          <div className="mt-6 p-4 rounded-xl bg-status-success/10 text-status-success text-sm font-medium">
            {t('request.success', locale)}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className={labelClass}>{t('request.type', locale)}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('tep_codigo', 'C')}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    form.tep_codigo === 'C'
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-border bg-surface-container-highest text-foreground'
                  }`}
                >
                  {t('request.type.client', locale)}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('tep_codigo', 'F')}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    form.tep_codigo === 'F'
                      ? 'border-secondary bg-secondary/10 text-secondary'
                      : 'border-border bg-surface-container-highest text-foreground'
                  }`}
                >
                  {t('request.type.supplier', locale)}
                </button>
              </div>
            </div>

            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User size={16} className="text-secondary" />
                {t('request.section.person', locale)}
              </h3>
              <div>
                <label className={labelClass}>{t('request.name', locale)}</label>
                <input
                  required
                  value={form.nome}
                  onChange={(event) => updateField('nome', event.target.value)}
                  className={inputClass}
                  placeholder={t('request.name', locale)}
                />
              </div>
              <div>
                <label className={labelClass}>{t('request.email', locale)}</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className={`${inputClass} pl-10`}
                    placeholder={t('request.email', locale)}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t('request.country', locale)}</label>
                <select
                  required
                  value={form.pai_codigo}
                  onChange={(event) => updateField('pai_codigo', event.target.value)}
                  className={inputClass}
                  disabled={countriesQuery.isLoading}
                >
                  <option value="">{t('request.country.placeholder', locale)}</option>
                  {countries.map((country) => (
                    <option key={country.pai_codigo} value={country.pai_codigo}>
                      {country.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t('request.reason', locale)}</label>
                <textarea
                  required
                  rows={3}
                  value={form.motivo}
                  onChange={(event) => updateField('motivo', event.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder={t('request.reason.placeholder', locale)}
                />
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Building2 size={16} className="text-secondary" />
                {t('request.section.company', locale)}
              </h3>
              <div>
                <label className={labelClass}>{t('request.company.name', locale)}</label>
                <input
                  required
                  value={form.emp_nome}
                  onChange={(event) => updateField('emp_nome', event.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t('request.company.address', locale)}</label>
                <input
                  required
                  value={form.emp_endereco}
                  onChange={(event) => updateField('emp_endereco', event.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>{t('request.company.district', locale)}</label>
                  <input
                    required
                    value={form.emp_bairro}
                    onChange={(event) => updateField('emp_bairro', event.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t('request.company.city', locale)}</label>
                  <input
                    required
                    value={form.emp_cidade}
                    onChange={(event) => updateField('emp_cidade', event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>{t('request.company.country', locale)}</label>
                  <select
                    required
                    value={form.emp_pai_codigo}
                    onChange={(event) => handleCompanyCountryChange(event.target.value)}
                    className={inputClass}
                    disabled={countriesQuery.isLoading}
                  >
                    <option value="">{t('request.country.placeholder', locale)}</option>
                    {countries.map((country) => (
                      <option key={country.pai_codigo} value={country.pai_codigo}>
                        {country.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{t('request.company.state', locale)}</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <select
                      required
                      value={form.emp_est_codigo}
                      onChange={(event) => handleCompanyStateChange(event.target.value)}
                      className={`${inputClass} pl-10`}
                      disabled={!empPai || companyStatesQuery.isLoading}
                    >
                      <option value="">{t('request.company.state.placeholder', locale)}</option>
                      {companyStates.map((state) => (
                        <option key={state.est_codigo} value={state.est_codigo}>
                          {state.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>{t('request.company.zip', locale)}</label>
                  <input
                    required
                    value={form.emp_cep}
                    onChange={(event) => updateField('emp_cep', event.target.value)}
                    className={inputClass}
                    maxLength={11}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t('request.company.homepage', locale)}</label>
                  <input
                    value={form.emp_homepage}
                    onChange={(event) => updateField('emp_homepage', event.target.value)}
                    className={inputClass}
                    placeholder="https://"
                  />
                </div>
              </div>
            </section>

            {error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-primary-foreground gradient-primary hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
              {mutation.isPending ? t('request.submitting', locale) : t('request.submit', locale)}
            </button>
          </form>
        )}

        <a href="/" className="mt-6 flex items-center gap-2 text-sm text-secondary hover:underline">
          <ArrowLeft size={14} /> {t('request.back', locale)}
        </a>
      </motion.div>
    </div>
  );
}
