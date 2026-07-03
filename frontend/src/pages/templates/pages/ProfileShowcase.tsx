import { useNavigate } from 'react-router-dom';
import { PagesLayout, PageSection } from './PagesLayout';
import {
  Mail, Phone, MapPin, Calendar, Briefcase, Edit, Camera, Building2,
  Globe, Linkedin, Award, TrendingUp, CheckCircle2, MessageSquare,
  Share2, MoreHorizontal, Star, Activity,
} from 'lucide-react';

const activities = [
  { date: '15/04', time: '14:32', text: 'Aprovou pedido #PED-2401', tag: 'Comercial', tone: 'success' as const },
  { date: '14/04', time: '11:08', text: 'Atualizou cadastro de Petrobras', tag: 'Cadastros', tone: 'info' as const },
  { date: '13/04', time: '09:45', text: 'Gerou relatório mensal de faturamento', tag: 'Financeiro', tone: 'warning' as const },
  { date: '12/04', time: '16:21', text: 'Cadastrou 5 novos produtos', tag: 'Produção', tone: 'info' as const },
  { date: '11/04', time: '08:15', text: 'Concluiu treinamento de compliance', tag: 'RH', tone: 'success' as const },
];

const stats = [
  { value: '128', label: 'Pedidos aprovados', icon: CheckCircle2, trend: '+12%' },
  { value: '45', label: 'Clientes ativos', icon: Briefcase, trend: '+5' },
  { value: '92%', label: 'Taxa aprovação', icon: TrendingUp, trend: '+3%' },
  { value: '4.8', label: 'Avaliação média', icon: Star, trend: '★' },
];

const skills = ['Vendas B2B', 'Automação Industrial', 'Óleo & Gás', 'Negociação', 'CRM', 'Forecasting', 'Liderança'];

const projects = [
  { name: 'Expansão Sudeste 2025', progress: 78, status: 'Em andamento', tone: 'primary' as const },
  { name: 'Migração ERP', progress: 100, status: 'Concluído', tone: 'success' as const },
  { name: 'Novo catálogo digital', progress: 42, status: 'Em andamento', tone: 'warning' as const },
];

const toneMap = {
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  primary: 'bg-primary/10 text-primary',
};

export default function ProfileShowcase() {
  const navigate = useNavigate();
  return (
    <PagesLayout title="Perfil do Usuário" description="Suas informações pessoais e atividade recente." category="Páginas">
      {/* Header / Cover */}
      <PageSection className="!p-0 overflow-hidden">
        <div className="relative h-40 bg-gradient-to-br from-primary via-primary/80 to-secondary">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, hsl(var(--primary-foreground) / 0.25) 0, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--secondary-foreground) / 0.2) 0, transparent 35%)',
            }}
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg bg-background/20 backdrop-blur text-primary-foreground hover:bg-background/30 flex items-center justify-center">
              <Share2 size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-background/20 backdrop-blur text-primary-foreground hover:bg-background/30 flex items-center justify-center">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 sm:gap-5">
            <div className="relative -mt-14 shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center font-display text-2xl sm:text-3xl font-bold border-4 border-surface-container shadow-xl">
                AR
              </div>
              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-success border-2 border-surface-container" />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-foreground text-background hover:scale-105 transition-transform flex items-center justify-center shadow-lg">
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1 min-w-0 w-full sm:pt-4">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Ana Paula Ribeiro</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">Pro</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Gerente Comercial · Nova Smar S/A
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin size={12} /> São Paulo, SP</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> Desde mar/2019</span>
                <span className="flex items-center gap-1.5"><Award size={12} /> Top performer 2024</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:pt-4">
              <button className="flex items-center justify-center gap-2 px-4 h-9 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-muted/80">
                <MessageSquare size={13} /> Mensagem
              </button>
              <button onClick={() => navigate('/app/profile/edit')} className="flex items-center justify-center gap-2 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 shadow-sm">
                <Edit size={13} /> Editar perfil
              </button>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-surface-container rounded-2xl border border-border/40 p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                  {s.trend}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground mt-3">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <PageSection title="Sobre">
            <p className="text-sm text-foreground leading-relaxed">
              Profissional com mais de <strong className="text-primary">10 anos</strong> em vendas industriais B2B,
              especializada em automação e instrumentação para o setor de Óleo &amp; Gás.
            </p>
          </PageSection>

          <PageSection title="Contato">
            <ul className="space-y-3 text-sm">
              {[
                { icon: Mail, value: 'ana.ribeiro@smarnet.com' },
                { icon: Phone, value: '+55 11 98765-4321' },
                { icon: Building2, value: 'Nova Smar S/A' },
                { icon: Globe, value: 'smarnet.com.br' },
                { icon: Linkedin, value: 'in/anaribeiro' },
              ].map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-center gap-3 text-foreground">
                  <span className="w-8 h-8 rounded-lg bg-surface-container-low text-muted-foreground flex items-center justify-center shrink-0">
                    <Icon size={14} />
                  </span>
                  <span className="truncate">{value}</span>
                </li>
              ))}
            </ul>
          </PageSection>

          <PageSection title="Especialidades">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-low text-foreground border border-border/40 hover:border-primary/40 hover:text-primary transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </PageSection>

          <PageSection title="Perfil completo">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">85%</span>
              <span className="text-xs text-muted-foreground">17 de 20 itens</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container-low overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-3">Adicione documentos e certificações para completar.</p>
          </PageSection>
        </div>

        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <PageSection title="Projetos em Destaque">
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.name} className="p-4 rounded-xl bg-surface-container-low border border-border/40 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${toneMap[p.tone]}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-background overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          p.tone === 'success' ? 'bg-success' : p.tone === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-10 text-right">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection title="Atividade Recente">
            <ul className="relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border/60">
              {activities.map((a, i) => (
                <li key={i} className="relative flex items-start gap-4">
                  <span className={`relative z-10 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${toneMap[a.tone]}`}>
                    <Activity size={12} />
                  </span>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <p className="text-sm text-foreground">{a.text}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${toneMap[a.tone]}`}>
                        {a.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">{a.date} · {a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </PageSection>
        </div>
      </div>
    </PagesLayout>
  );
}
