import {
  TrendingUp, TrendingDown, Package, Factory, Users, DollarSign, Activity,
} from 'lucide-react';
import { DSSection, DSCard } from './_components';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid,
} from 'recharts';

const trendData = [
  { m: 'Jan', v: 280 }, { m: 'Fev', v: 320 }, { m: 'Mar', v: 305 },
  { m: 'Abr', v: 380 }, { m: 'Mai', v: 420 }, { m: 'Jun', v: 482 },
];
const prodData = [
  { d: 'Seg', a: 120, b: 90 }, { d: 'Ter', a: 145, b: 110 },
  { d: 'Qua', a: 132, b: 95 }, { d: 'Qui', a: 168, b: 124 },
  { d: 'Sex', a: 155, b: 130 }, { d: 'Sáb', a: 90, b: 60 },
];
const segData = [
  { name: 'Industrial', v: 48 },
  { name: 'Mineração', v: 24 },
  { name: 'Papel', v: 18 },
  { name: 'Outros', v: 10 },
];
const segColors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--tertiary))', 'hsl(var(--muted-foreground))'];

const kpis = [
  { label: 'Faturamento', value: 'R$ 482k', delta: '+12,4%', up: true, icon: DollarSign, color: 'success' },
  { label: 'Pedidos', value: '1.284', delta: '+8,2%', up: true, icon: Package, color: 'info' },
  { label: 'Produção', value: '92,3%', delta: '+3,1%', up: true, icon: Factory, color: 'accent' },
  { label: 'Clientes ativos', value: '348', delta: '-2,4%', up: false, icon: Users, color: 'warning' },
];

export default function DashboardsPage() {
  return (
    <>
      <DSSection
        title="KPI Row"
        description="Linha de KPIs do topo do dashboard. Sempre 4 colunas em desktop, 2 em tablet, 1 em mobile."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl bg-surface-container p-5 shadow-ambient">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `hsl(var(--${k.color}) / 0.15)`,
                      color: `hsl(var(--${k.color}))`,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className="text-xs font-bold flex items-center gap-1"
                    style={{ color: `hsl(var(--${k.up ? 'success' : 'destructive'}))` }}
                  >
                    {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {k.delta}
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {k.label}
                </p>
                <p className="font-display text-2xl font-extrabold mt-1">{k.value}</p>
              </div>
            );
          })}
        </div>
      </DSSection>

      <DSSection
        title="Composição: Tendência + Distribuição"
        description="Gráfico de tendência (2/3) + distribuição por segmento (1/3)."
      >
        <div className="grid lg:grid-cols-3 gap-4">
          <DSCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-lg">Faturamento mensal</h3>
                <p className="text-xs text-muted-foreground">Últimos 6 meses · em R$ mil</p>
              </div>
              <Activity size={18} className="text-accent" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="ds-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    fill="url(#ds-grad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DSCard>

          <DSCard>
            <h3 className="font-display font-bold text-lg mb-1">Por segmento</h3>
            <p className="text-xs text-muted-foreground mb-4">Mix de receita</p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segData}
                    dataKey="v"
                    innerRadius={42}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {segData.map((_, i) => (
                      <Cell key={i} fill={segColors[i]} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1.5 mt-2">
              {segData.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: segColors[i] }} />
                    {s.name}
                  </span>
                  <span className="font-semibold">{s.v}%</span>
                </li>
              ))}
            </ul>
          </DSCard>
        </div>
      </DSSection>

      <DSSection title="Comparativo de produção" description="Barras agrupadas comparando linhas A vs B.">
        <DSCard>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="a" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="b" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Linha A
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Linha B
            </span>
          </div>
        </DSCard>
      </DSSection>
    </>
  );
}
