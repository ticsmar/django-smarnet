import { useState } from 'react';
import { PagesLayout, PageSection } from './PagesLayout';
import {
  Mail, Phone, MapPin, Calendar, Briefcase, Camera, Save, X,
  Pencil, Building2, Globe, Linkedin, Shield, Bell, Lock, KeyRound,
  CheckCircle2, AlertCircle, Smartphone, Monitor, Tablet, LogOut,
  User, Eye, EyeOff,
  type LucideIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Mode = 'view' | 'edit';

const initialProfile = {
  firstName: 'Ana Paula',
  lastName: 'Ribeiro',
  email: 'ana.ribeiro@smarnet.com',
  phone: '+55 11 98765-4321',
  role: 'Gerente Comercial',
  department: 'Comercial',
  company: 'Nova Smar S/A',
  city: 'São Paulo, SP',
  since: '03/2019',
  website: 'smarnet.com.br',
  linkedin: 'in/anaribeiro',
  bio: 'Profissional com mais de 10 anos atuando em vendas industriais B2B, especializada em automação e instrumentação para o setor de Óleo & Gás.',
};

type Profile = typeof initialProfile;

const tabs = [
  { id: 'personal', label: 'Dados Pessoais', icon: User },
  { id: 'security', label: 'Segurança', icon: Shield },
  { id: 'notifications', label: 'Notificações', icon: Bell },
];

const sessions = [
  { device: 'MacBook Pro · Chrome', location: 'São Paulo, BR', when: 'Agora', current: true, icon: Monitor },
  { device: 'iPhone 15 · Safari', location: 'São Paulo, BR', when: 'há 2 horas', current: false, icon: Smartphone },
  { device: 'iPad Air · Safari', location: 'Campinas, BR', when: 'há 3 dias', current: false, icon: Tablet },
];

export default function ProfileEditShowcase() {
  const [mode, setMode] = useState<Mode>('view');
  const [tab, setTab] = useState<string>('personal');
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [draft, setDraft] = useState<Profile>(initialProfile);
  const [showPwd, setShowPwd] = useState(false);

  const startEdit = () => { setDraft(profile); setMode('edit'); };
  const cancel = () => { setDraft(profile); setMode('view'); };
  const save = () => { setProfile(draft); setMode('view'); };
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const isEdit = mode === 'edit';

  return (
    <PagesLayout title="Perfil — Consulta e Edição" description="Visualize e edite os dados do perfil de usuário." category="Páginas">
      {/* Header */}
      <PageSection className="!p-0 overflow-hidden">
        <div className="relative h-36 bg-gradient-to-br from-primary via-primary/80 to-secondary">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, hsl(var(--primary-foreground) / 0.25) 0, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--secondary-foreground) / 0.2) 0, transparent 35%)',
            }}
          />
          {isEdit && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/20 backdrop-blur text-warning-foreground border border-warning/30">
              <Pencil size={11} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Modo edição</span>
            </div>
          )}
        </div>

        <div className="px-4 sm:px-6 pb-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 sm:gap-5">
            <div className="relative -mt-14 shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center font-display text-2xl sm:text-3xl font-bold border-4 border-surface-container shadow-xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-success border-2 border-surface-container" />
              {isEdit && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-foreground text-background hover:scale-105 transition-transform flex items-center justify-center shadow-lg">
                  <Camera size={14} />
                </button>
              )}
            </div>
            <div className="flex-1 min-w-0 w-full sm:pt-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground sm:truncate">{fullName}</h2>
              <p className="text-sm text-muted-foreground mt-0.5 sm:truncate">
                {profile.role} · {profile.company}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 min-w-0"><Mail size={12} className="shrink-0" /> <span className="truncate">{profile.email}</span></span>
                <span className="flex items-center gap-1.5"><MapPin size={12} /> {profile.city}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:pt-4">
              {!isEdit ? (
                <button
                  onClick={startEdit}
                  className="flex items-center justify-center gap-2 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 shadow-sm"
                >
                  <Pencil size={13} /> Editar perfil
                </button>
              ) : (
                <>
                  <button
                    onClick={cancel}
                    className="flex items-center justify-center gap-2 px-4 h-9 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-muted/80"
                  >
                    <X size={13} /> Cancelar
                  </button>
                  <button
                    onClick={save}
                    className="flex items-center justify-center gap-2 px-4 h-9 rounded-lg bg-success text-success-foreground text-xs font-semibold hover:bg-success/90 shadow-sm"
                  >
                    <Save size={13} /> Salvar alterações
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </PageSection>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <PageSection title="Resumo">
            <ul className="space-y-2.5 text-sm">
              {[
                { icon: Mail, value: profile.email },
                { icon: Phone, value: profile.phone },
                { icon: Briefcase, value: profile.department },
                { icon: Building2, value: profile.company },
                { icon: MapPin, value: profile.city },
                { icon: Calendar, value: `Desde ${profile.since}` },
                { icon: Globe, value: profile.website },
                { icon: Linkedin, value: profile.linkedin },
              ].map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-center gap-3 text-foreground">
                  <span className="w-8 h-8 rounded-lg bg-surface-container-low text-muted-foreground flex items-center justify-center shrink-0">
                    <Icon size={14} />
                  </span>
                  <span className="truncate text-sm">{value}</span>
                </li>
              ))}
            </ul>
          </PageSection>

          <PageSection title="Status da conta">
            <ul className="space-y-3">
              {[
                { label: 'E-mail verificado', ok: true },
                { label: 'Telefone confirmado', ok: true },
                { label: 'Documentos enviados', ok: false },
                { label: 'MFA ativo', ok: true },
              ].map((s) => (
                <li key={s.label} className="flex items-center gap-2.5 text-sm">
                  {s.ok ? (
                    <CheckCircle2 size={15} className="text-success shrink-0" />
                  ) : (
                    <AlertCircle size={15} className="text-warning shrink-0" />
                  )}
                  <span className={cn(s.ok ? 'text-foreground' : 'text-muted-foreground')}>{s.label}</span>
                </li>
              ))}
            </ul>
          </PageSection>
        </div>

        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <PageSection className="!p-0 overflow-hidden">
            <div className="flex border-b border-border/40 px-2 bg-surface-container-low/40">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                      active
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6">
              {tab === 'personal' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Identificação</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Nome" value={isEdit ? draft.firstName : profile.firstName} mode={mode} onChange={(v) => set('firstName', v)} />
                      <Field label="Sobrenome" value={isEdit ? draft.lastName : profile.lastName} mode={mode} onChange={(v) => set('lastName', v)} />
                      <Field label="E-mail" type="email" value={isEdit ? draft.email : profile.email} mode={mode} onChange={(v) => set('email', v)} icon={Mail} />
                      <Field label="Telefone" value={isEdit ? draft.phone : profile.phone} mode={mode} onChange={(v) => set('phone', v)} icon={Phone} />
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Profissional</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Cargo" value={isEdit ? draft.role : profile.role} mode={mode} onChange={(v) => set('role', v)} />
                      <Field label="Departamento" value={isEdit ? draft.department : profile.department} mode={mode} onChange={(v) => set('department', v)} />
                      <Field label="Empresa" value={isEdit ? draft.company : profile.company} mode={mode} onChange={(v) => set('company', v)} icon={Building2} />
                      <Field label="Cidade" value={isEdit ? draft.city : profile.city} mode={mode} onChange={(v) => set('city', v)} icon={MapPin} />
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Redes</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Website" value={isEdit ? draft.website : profile.website} mode={mode} onChange={(v) => set('website', v)} icon={Globe} />
                      <Field label="LinkedIn" value={isEdit ? draft.linkedin : profile.linkedin} mode={mode} onChange={(v) => set('linkedin', v)} icon={Linkedin} />
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-6">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bio</Label>
                    {isEdit ? (
                      <textarea
                        value={draft.bio}
                        onChange={(e) => set('bio', e.target.value)}
                        rows={4}
                        className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      />
                    ) : (
                      <p className="mt-3 text-sm text-foreground leading-relaxed">{profile.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {tab === 'security' && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <SecurityCard icon={Lock} title="Senha" desc="Alterada há 3 meses" badge={{ label: 'Atualize', tone: 'warning' }} />
                    <SecurityCard icon={KeyRound} title="MFA" desc="Aplicativo autenticador" badge={{ label: 'Ativo', tone: 'success' }} />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Alterar senha</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <PwdField label="Senha atual" show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
                      <PwdField label="Nova senha" show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
                    </div>
                    <button className="mt-4 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90">
                      Atualizar senha
                    </button>
                  </div>

                  <div className="border-t border-border/40 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Sessões ativas</h4>
                    <ul className="space-y-2">
                      {sessions.map((s) => {
                        const Icon = s.icon;
                        return (
                          <li key={s.device} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-border/40">
                            <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Icon size={16} />
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-foreground truncate">{s.device}</p>
                                {s.current && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-success/10 text-success uppercase">
                                    Atual
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{s.location} · {s.when}</p>
                            </div>
                            {!s.current && (
                              <button className="flex items-center gap-1.5 px-2.5 h-8 rounded-md text-xs font-semibold text-destructive hover:bg-destructive/10">
                                <LogOut size={12} /> Encerrar
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}

              {tab === 'notifications' && (
                <div className="space-y-6">
                  {[
                    {
                      group: 'E-mail',
                      items: [
                        { label: 'Novos pedidos', desc: 'Receba quando um novo pedido chegar', enabled: true },
                        { label: 'Aprovação de orçamentos', desc: 'Alerta quando orçamentos forem aprovados', enabled: true },
                        { label: 'Resumo diário', desc: 'Indicadores do dia anterior por e-mail', enabled: false },
                      ],
                    },
                    {
                      group: 'Sistema',
                      items: [
                        { label: 'Avisos do sistema', desc: 'Manutenções e atualizações', enabled: true },
                        { label: 'Newsletter mensal', desc: 'Novidades e dicas do produto', enabled: false },
                      ],
                    },
                  ].map((g) => (
                    <div key={g.group}>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{g.group}</h4>
                      <ul className="space-y-2">
                        {g.items.map((n) => (
                          <li key={n.label} className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low border border-border/40 hover:border-primary/30 transition-colors">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground">{n.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked={n.enabled} className="sr-only peer" />
                              <div className="w-10 h-5 bg-muted peer-checked:bg-primary rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PageSection>
        </div>
      </div>
    </PagesLayout>
  );
}

function Field({
  label, value, mode, onChange, type = 'text', icon: Icon,
}: {
  label: string;
  value: string;
  mode: Mode;
  onChange: (v: string) => void;
  type?: string;
  icon?: LucideIcon;
}) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {mode === 'edit' ? (
        <div className="relative mt-1">
          {Icon && (
            <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn('h-9 text-sm', Icon && 'pl-9')}
          />
        </div>
      ) : (
        <div className="mt-1 h-9 flex items-center gap-2 text-sm text-foreground">
          {Icon && <Icon size={14} className="text-muted-foreground" />}
          {value}
        </div>
      )}
    </div>
  );
}

function PwdField({ label, show, onToggle }: { label: string; show: boolean; onToggle: () => void }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="relative mt-1">
        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input type={show ? 'text' : 'password'} placeholder="••••••••" className="h-9 text-sm pl-9 pr-9" />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center"
        >
          {show ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
      </div>
    </div>
  );
}

function SecurityCard({
  icon: Icon, title, desc, badge,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge: { label: string; tone: 'success' | 'warning' };
}) {
  const toneCls = badge.tone === 'success' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning';
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-low border border-border/40">
      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider', toneCls)}>
        {badge.label}
      </span>
    </div>
  );
}
