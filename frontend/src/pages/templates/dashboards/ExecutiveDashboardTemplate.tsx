import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Goal,
  type LucideIcon,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface MetricItem {
  label: string;
  value: string;
  change: string;
  detail: string;
  tone: 'primary' | 'accent' | 'secondary' | 'tertiary';
}

interface SeriesPoint {
  label: string;
  current: number;
  target?: number;
}

interface BreakdownItem {
  label: string;
  value: number;
}

interface SpotlightItem {
  title: string;
  subtitle: string;
  meta: string;
  value: string;
}

interface RankingItem {
  name: string;
  role: string;
  value: string;
  progress: number;
}

interface AlertItem {
  title: string;
  description: string;
  tone: 'primary' | 'accent' | 'secondary';
}

interface ExecutiveDashboardTemplateProps {
  title: string;
  description: string;
  category: string;
  period: string;
  heroValue: string;
  heroLabel: string;
  icon: LucideIcon;
  metrics: MetricItem[];
  performanceSeries: SeriesPoint[];
  funnelSeries: SeriesPoint[];
  breakdown: BreakdownItem[];
  spotlight: SpotlightItem[];
  ranking: RankingItem[];
  alerts: AlertItem[];
}

const toneStyles: Record<MetricItem['tone'], string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  secondary: 'bg-secondary/10 text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary',
};

const pieColors = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--secondary))',
  'hsl(var(--tertiary))',
];

function DashboardSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-surface-container p-6 shadow-ambient">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function ExecutiveDashboardTemplate({
  title,
  description,
  category,
  period,
  heroValue,
  heroLabel,
  icon: Icon,
  metrics,
  performanceSeries,
  funnelSeries,
  breakdown,
  spotlight,
  ranking,
  alerts,
}: ExecutiveDashboardTemplateProps) {
  const headlineGrowth = metrics[0]?.change ?? '+0%';

  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors">Início</Link>
        <ChevronRight size={12} />
        <span>Templates</span>
        <ChevronRight size={12} />
        <span>Dashboards</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{category}</span>
      </nav>

      <section className="rounded-2xl bg-gradient-to-br from-primary to-primary-container text-primary-foreground shadow-ambient-lg">
        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.6fr_0.9fr] lg:px-8 lg:py-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
              <Icon size={14} />
              {period}
            </div>
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>
              <p className="max-w-2xl text-sm leading-6 text-primary-foreground/78 lg:text-base">{description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-primary-foreground/82">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 font-medium">
                <ArrowUpRight size={14} />
                {headlineGrowth} vs. período anterior
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 font-medium">
                <Goal size={14} />
                Meta monitorada em tempo real
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-primary-foreground/8 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/68">Indicador-chave</p>
            <p className="mt-4 font-display text-4xl font-bold tracking-tight">{heroValue}</p>
            <p className="mt-2 text-sm text-primary-foreground/76">{heroLabel}</p>
            <div className="mt-6 space-y-3">
              {metrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className="flex items-center justify-between rounded-xl bg-primary-foreground/8 px-4 py-3">
                  <div>
                    <p className="text-xs text-primary-foreground/64">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-primary-foreground">{metric.value}</p>
                  </div>
                  <span className="rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs font-semibold text-primary-foreground/78">
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const positive = !metric.change.trim().startsWith('-');
          return (
            <article key={metric.label} className="rounded-2xl bg-surface-container p-5 shadow-ambient">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">{metric.value}</p>
                </div>
                <div className={`rounded-xl px-3 py-2 text-xs font-semibold ${toneStyles[metric.tone]}`}>
                  {metric.change}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                {positive ? <ArrowUpRight size={15} className="text-primary" /> : <ArrowDownRight size={15} className="text-muted-foreground" />}
                <span>{metric.detail}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <DashboardSection title="Performance executiva" subtitle="Ritmo operacional comparado à meta do período.">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceSeries} margin={{ top: 12, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="executiveCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="executiveTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: 'none',
                    borderRadius: 16,
                    color: 'hsl(var(--popover-foreground))',
                    boxShadow: '0 16px 60px hsl(var(--foreground) / 0.08)',
                  }}
                />
                <Area type="monotone" dataKey="target" stroke="hsl(var(--accent))" fill="url(#executiveTarget)" strokeWidth={2} />
                <Area type="monotone" dataKey="current" stroke="hsl(var(--primary))" fill="url(#executiveCurrent)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardSection>

        <DashboardSection title="Mix do resultado" subtitle="Participação das frentes que mais impactam o período.">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-1">
            <div className="mx-auto h-[220px] w-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdown} dataKey="value" nameKey="label" innerRadius={58} outerRadius={84} paddingAngle={3} stroke="none">
                    {breakdown.map((entry, index) => (
                      <Cell key={entry.label} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: 'none',
                      borderRadius: 16,
                      color: 'hsl(var(--popover-foreground))',
                      boxShadow: '0 16px 60px hsl(var(--foreground) / 0.08)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {breakdown.map((item, index) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl bg-background/70 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardSection>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <DashboardSection title="Ritmo por frente" subtitle="Comparativo entre as principais frentes ativas no período.">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelSeries} margin={{ top: 10, right: 0, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: 'none',
                    borderRadius: 16,
                    color: 'hsl(var(--popover-foreground))',
                    boxShadow: '0 16px 60px hsl(var(--foreground) / 0.08)',
                  }}
                />
                <Bar dataKey="current" radius={[12, 12, 0, 0]} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardSection>

        <DashboardSection title="Atenções da gestão" subtitle="Sinais que exigem decisão rápida ou acompanhamento diário.">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-xl bg-background/80 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-2.5 w-2.5 rounded-full ${alert.tone === 'primary' ? 'bg-primary' : alert.tone === 'accent' ? 'bg-accent' : 'bg-secondary'}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardSection>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <DashboardSection title="Prioridades do período" subtitle="Itens mais relevantes para a liderança comercial nesta visão.">
          <div className="space-y-3">
            {spotlight.map((item) => (
              <div key={item.title} className="grid gap-3 rounded-2xl bg-background/75 px-4 py-4 md:grid-cols-[1.5fr_1fr_auto] md:items-center">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.meta}</p>
                <p className="text-sm font-semibold text-foreground md:text-right">{item.value}</p>
              </div>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection title="Ranking do time" subtitle="Contribuição dos responsáveis com maior impacto no fechamento.">
          <div className="space-y-4">
            {ranking.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DashboardSection>
      </section>
    </div>
  );
}
