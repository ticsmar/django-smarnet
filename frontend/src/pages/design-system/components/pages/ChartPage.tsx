import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Area, AreaChart, Pie, PieChart, Cell } from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
} from 'chart.js';
import { Line as CJLine, Bar as CJBar, Doughnut as CJDoughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, ChartJSTooltip, ChartJSLegend);

const data = [
  { mes: 'Jan', valor: 320, meta: 400 },
  { mes: 'Fev', valor: 410, meta: 400 },
  { mes: 'Mar', valor: 380, meta: 420 },
  { mes: 'Abr', valor: 520, meta: 450 },
  { mes: 'Mai', valor: 480, meta: 480 },
  { mes: 'Jun', valor: 610, meta: 500 },
];

const pieData = [
  { name: 'Aprovados', value: 412, fill: 'hsl(var(--success))' },
  { name: 'Pendentes', value: 128, fill: 'hsl(var(--warning))' },
  { name: 'Cancelados', value: 38, fill: 'hsl(var(--destructive))' },
];

const barConfig = { valor: { label: 'Faturamento', color: 'hsl(var(--primary))' } };
const comboConfig = {
  valor: { label: 'Realizado', color: 'hsl(var(--primary))' },
  meta: { label: 'Meta', color: 'hsl(var(--secondary))' },
};
const areaConfig = { valor: { label: 'Faturamento', color: 'hsl(var(--secondary))' } };
const sparkConfig = { valor: { label: 'Valor', color: 'hsl(var(--primary))' } };

const containerProps: PropDef[] = [
  { name: 'config', type: 'ChartConfig', required: true, description: 'Mapeamento dataKey → { label, color, icon } usado por tooltip e legenda.' },
  { name: 'className', type: 'string', description: 'Geralmente define h-* (altura) e max-w-* (largura).' },
];

/* ===================== Chart.js shared options ===================== */
const cjCommon = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: 'hsl(var(--muted-foreground))',
        font: { size: 12, family: 'Inter, sans-serif' },
        usePointStyle: true,
        pointStyle: 'circle' as const,
      },
    },
    tooltip: {
      backgroundColor: 'hsl(var(--popover))',
      titleColor: 'hsl(var(--foreground))',
      bodyColor: 'hsl(var(--foreground))',
      borderColor: 'hsl(var(--border))',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
    },
  },
  scales: {
    x: { grid: { color: 'hsl(var(--border) / 0.4)' }, ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } }, border: { display: false } },
    y: { grid: { color: 'hsl(var(--border) / 0.4)' }, ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } }, border: { display: false } },
  },
};

const cjLineData = {
  labels: data.map((d) => d.mes),
  datasets: [
    { label: 'Realizado', data: data.map((d) => d.valor), borderColor: 'hsl(var(--primary))', backgroundColor: 'hsl(var(--primary))', tension: 0.4, pointRadius: 3, pointHoverRadius: 6 },
    { label: 'Meta', data: data.map((d) => d.meta), borderColor: 'hsl(var(--secondary))', backgroundColor: 'hsl(var(--secondary))', tension: 0.4, pointRadius: 3, pointHoverRadius: 6, borderDash: [6, 4] },
  ],
};

const cjBarData = {
  labels: data.map((d) => d.mes),
  datasets: [
    { label: 'Faturamento', data: data.map((d) => d.valor), backgroundColor: 'hsl(var(--primary))', borderRadius: 8, barPercentage: 0.6 },
  ],
};

const resolveHsl = (token: string, alpha = 1) => {
  if (typeof window === 'undefined') return `hsla(0, 0%, 0%, ${alpha})`;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return raw ? `hsla(${raw.replace(/\s+/g, ', ')}, ${alpha})` : `hsla(0, 0%, 0%, ${alpha})`;
};

const cjAreaData = {
  labels: data.map((d) => d.mes),
  datasets: [
    {
      label: 'Faturamento',
      data: data.map((d) => d.valor),
      borderColor: 'hsl(var(--secondary))',
      backgroundColor: (ctx: any) => {
        const c = ctx.chart.ctx;
        const g = c.createLinearGradient(0, 0, 0, 280);
        g.addColorStop(0, resolveHsl('--secondary', 0.5));
        g.addColorStop(1, resolveHsl('--secondary', 0));
        return g;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const cjDoughnutData = {
  labels: pieData.map((d) => d.name),
  datasets: [
    {
      data: pieData.map((d) => d.value),
      backgroundColor: ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};

const cjDoughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: { position: 'right' as const, labels: { color: 'hsl(var(--muted-foreground))', font: { size: 12 }, usePointStyle: true, pointStyle: 'circle' as const } },
    tooltip: cjCommon.plugins.tooltip,
  },
};

/* ===================== KPI Cards with sparklines ===================== */
const sparkData = [
  { i: 1, v: 22 }, { i: 2, v: 31 }, { i: 3, v: 28 }, { i: 4, v: 40 },
  { i: 5, v: 36 }, { i: 6, v: 52 }, { i: 7, v: 48 }, { i: 8, v: 64 },
];

function KpiSparkCard({
  label, value, delta, trend, icon: Icon, color, type = 'area',
}: {
  label: string; value: string; delta: string; trend: 'up' | 'down';
  icon: any; color: string; type?: 'area' | 'bar' | 'line';
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl bg-surface-container border border-border/40 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="rounded-xl p-2.5" style={{ background: `hsl(var(--${color}) / 0.12)`, color: `hsl(var(--${color}))` }}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="h-14 -mx-1">
        <ChartContainer config={{ v: { label, color: `hsl(var(--${color}))` } }} className="h-full w-full">
          {type === 'area' ? (
            <AreaChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`fill-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={`hsl(var(--${color}))`} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={`hsl(var(--${color}))`} strokeWidth={2} fill={`url(#fill-${color})`} />
            </AreaChart>
          ) : type === 'bar' ? (
            <BarChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <Bar dataKey="v" fill={`hsl(var(--${color}))`} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="v" stroke={`hsl(var(--${color}))`} strokeWidth={2} dot={false} />
            </LineChart>
          )}
        </ChartContainer>
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        <TrendIcon className={`h-3.5 w-3.5 ${trend === 'up' ? 'text-success' : 'text-destructive'}`} />
        <span className={trend === 'up' ? 'text-success font-semibold' : 'text-destructive font-semibold'}>{delta}</span>
        <span className="text-muted-foreground">vs. mês anterior</span>
      </div>
    </div>
  );
}

export default function ChartPage() {
  return (
    <ComponentDoc
      summary="Wrapper oficial shadcn sobre Recharts — integra tema (cores, fonte, tooltip) automaticamente via tokens semânticos. Suporta também Chart.js (Canvas) como alternativa para gráficos em cards e dashboards mais densos."
      importPath="import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'"
    >
      <DocSection title="Chart (Recharts)">
        <VariantSection
          title="Bar Chart simples"
          description="Comparativo mensal — barras com gradiente de cantos arredondados e grid sutil."
          preview={
            <ChartContainer config={barConfig} className="h-72 w-full max-w-2xl">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="valor" fill="var(--color-valor)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          }
          code={`<ChartContainer config={{ valor: { label: 'Faturamento', color: 'hsl(var(--primary))' } }}>
  <BarChart data={data}>
    <CartesianGrid stroke="hsl(var(--border))" />
    <XAxis dataKey="mes" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="valor" fill="var(--color-valor)" radius={[8, 8, 0, 0]} />
  </BarChart>
</ChartContainer>`}
        />

        <VariantSection
          title="Combo Bar + Line (realizado vs meta)"
          description="Compare execução contra meta. As cores vêm dos tokens primary/secondary — adaptam ao tema."
          preview={
            <ChartContainer config={comboConfig} className="h-72 w-full max-w-2xl">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="valor" fill="var(--color-valor)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="meta" fill="var(--color-meta)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          }
          code={`<ChartContainer config={comboConfig}>
  <BarChart data={data}>
    <Bar dataKey="valor" fill="var(--color-valor)" />
    <Bar dataKey="meta" fill="var(--color-meta)" />
    <ChartLegend content={<ChartLegendContent />} />
  </BarChart>
</ChartContainer>`}
        />

        <VariantSection
          title="Area Chart"
          description="Visualização de tendência ao longo do tempo, com gradiente sutil."
          preview={
            <ChartContainer config={areaConfig} className="h-72 w-full max-w-2xl">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="fillValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="valor" stroke="hsl(var(--secondary))" strokeWidth={2} fill="url(#fillValor)" />
              </AreaChart>
            </ChartContainer>
          }
          code={`<AreaChart data={data}>
  <defs>
    <linearGradient id="fillValor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.6} />
      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.05} />
    </linearGradient>
  </defs>
  <Area type="monotone" dataKey="valor" stroke="hsl(var(--secondary))" fill="url(#fillValor)" />
</AreaChart>`}
        />

        <VariantSection
          title="Line Chart"
          description="Para séries com pontos discretos — destaque variações sutis."
          preview={
            <ChartContainer config={barConfig} className="h-72 w-full max-w-2xl">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="valor" stroke="var(--color-valor)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          }
          code={`<LineChart data={data}>
  <Line type="monotone" dataKey="valor" stroke="var(--color-valor)" strokeWidth={2.5} />
</LineChart>`}
        />

        <VariantSection
          title="Pie Chart com cores semânticas"
          description="Distribuição categórica — usa tokens success/warning/destructive para significado imediato."
          preview={
            <ChartContainer
              config={{
                Aprovados: { label: 'Aprovados', color: 'hsl(var(--success))' },
                Pendentes: { label: 'Pendentes', color: 'hsl(var(--warning))' },
                Cancelados: { label: 'Cancelados', color: 'hsl(var(--destructive))' },
              }}
              className="h-72 w-full max-w-md mx-auto"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} strokeWidth={2}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          }
          code={`<PieChart>
  <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
    {data.map((e, i) => <Cell key={i} fill={e.fill} />)}
  </Pie>
  <ChartLegend content={<ChartLegendContent />} />
</PieChart>`}
        />

        <PropsTable rows={containerProps} title="ChartContainer" />

        <UsageNote type="tip">
          Sempre defina cores via <code className="font-mono text-[11px]">hsl(var(--token))</code>. O wrapper injeta variáveis CSS <code className="font-mono text-[11px]">--color-{'{'}dataKey{'}'}</code> automaticamente — use-as em <code className="font-mono text-[11px]">fill</code>/<code className="font-mono text-[11px]">stroke</code>.
        </UsageNote>

        <UsageNote type="info">
          O tooltip e a legenda do shadcn já lidam com modo escuro, formatação de número e ícones. Evite reimplementar versões customizadas.
        </UsageNote>

        <UsageNote type="warning">
          Para datasets grandes (&gt;500 pontos), prefira amostragem ou virtualização. Recharts re-renderiza todos os elementos SVG a cada mudança.
        </UsageNote>
      </DocSection>

      {/* ===================== CHARTS PARA CARDS ===================== */}
      <DocSection
        title="Charts para Cards (Sparklines / KPIs)"
        description="Gráficos compactos embarcados em cards de KPI. Sem eixos, sem legenda — apenas a forma da tendência. Usam Recharts dentro do wrapper para herdar tema."
      >
        <VariantSection
          title="KPI Cards com sparkline"
          description="Grid responsivo de cards. Cada card combina indicador, delta e mini-gráfico (area, bar ou line)."
          preview={
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
              <KpiSparkCard label="Receita" value="R$ 482k" delta="+12,4%" trend="up" icon={DollarSign} color="primary" type="area" />
              <KpiSparkCard label="Pedidos" value="1.284" delta="+5,1%" trend="up" icon={TrendingUp} color="secondary" type="bar" />
              <KpiSparkCard label="Novos clientes" value="312" delta="-2,3%" trend="down" icon={Users} color="accent" type="line" />
              <KpiSparkCard label="Ticket médio" value="R$ 376" delta="+8,9%" trend="up" icon={DollarSign} color="success" type="area" />
            </div>
          }
          code={`<ChartContainer config={{ v: { label: 'Receita', color: 'hsl(var(--primary))' } }} className="h-14 w-full">
  <AreaChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
    <defs>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
      </linearGradient>
    </defs>
    <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#fill)" />
  </AreaChart>
</ChartContainer>`}
        />

        <VariantSection
          title="Sparkline isolado (linha pura)"
          description="Quando precisar apenas da silhueta de tendência — sem eixos, sem pontos, sem grid."
          preview={
            <div className="flex items-center gap-6 flex-wrap">
              {(['primary', 'secondary', 'accent', 'success', 'warning', 'destructive'] as const).map((c) => (
                <div key={c} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{c}</span>
                  <div className="w-36 h-10">
                    <ChartContainer config={{ v: { label: c, color: `hsl(var(--${c}))` } }} className="h-full w-full">
                      <LineChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                        <Line type="monotone" dataKey="v" stroke={`hsl(var(--${c}))`} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </div>
              ))}
            </div>
          }
          code={`<ChartContainer config={sparkConfig} className="h-10 w-36">
  <LineChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
    <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`}
        />

        <UsageNote type="tip">
          Em sparklines, remova grid, eixos e tooltip. A altura típica é entre <code className="font-mono text-[11px]">h-10</code> e <code className="font-mono text-[11px]">h-16</code>. Use <code className="font-mono text-[11px]">dot={'{false}'}</code> em séries longas.
        </UsageNote>
      </DocSection>

      {/* ===================== CHART.JS ===================== */}
      <DocSection
        title="Chart.js (alternativa Canvas)"
        description="Para dashboards densos com muitas séries ou animações suaves, use Chart.js via react-chartjs-2. Renderização em Canvas (mais performática para 500+ pontos) e tema integrado pelos mesmos tokens hsl(var(--*))."
      >
        <VariantSection
          title="Line Chart (Chart.js)"
          description="Realizado vs meta — meta como linha tracejada."
          preview={
            <div className="h-72 w-full max-w-2xl">
              <CJLine data={cjLineData} options={cjCommon} />
            </div>
          }
          code={`import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
  datasets: [
    { label: 'Realizado', data: [320,410,380,520,480,610], borderColor: 'hsl(var(--primary))', tension: 0.4 },
    { label: 'Meta', data: [400,400,420,450,480,500], borderColor: 'hsl(var(--secondary))', borderDash: [6,4], tension: 0.4 },
  ],
};

<Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />`}
        />

        <VariantSection
          title="Bar Chart (Chart.js)"
          description="Barras com cantos arredondados e grid sutil — tema herdado dos tokens."
          preview={
            <div className="h-72 w-full max-w-2xl">
              <CJBar data={cjBarData} options={cjCommon} />
            </div>
          }
          code={`<Bar data={{
  labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
  datasets: [{
    label: 'Faturamento',
    data: [320,410,380,520,480,610],
    backgroundColor: 'hsl(var(--primary))',
    borderRadius: 8,
    barPercentage: 0.6,
  }],
}} options={commonOptions} />`}
        />

        <VariantSection
          title="Area Chart com gradiente (Chart.js)"
          description="Gradiente gerado em runtime via canvas.createLinearGradient — adapta ao token primary/secondary."
          preview={
            <div className="h-72 w-full max-w-2xl">
              <CJLine data={cjAreaData} options={cjCommon} />
            </div>
          }
          code={`const areaData = {
  labels,
  datasets: [{
    label: 'Faturamento',
    data: values,
    borderColor: 'hsl(var(--secondary))',
    backgroundColor: (ctx) => {
      const c = ctx.chart.ctx;
      const g = c.createLinearGradient(0, 0, 0, 280);
      g.addColorStop(0, 'hsl(var(--secondary) / 0.5)');
      g.addColorStop(1, 'hsl(var(--secondary) / 0)');
      return g;
    },
    fill: true,
    tension: 0.4,
    pointRadius: 0,
  }],
};`}
        />

        <VariantSection
          title="Doughnut (Chart.js)"
          description="Distribuição categórica — legend lateral com pointStyle 'circle'."
          preview={
            <div className="h-72 w-full max-w-md mx-auto">
              <CJDoughnut data={cjDoughnutData} options={cjDoughnutOptions} />
            </div>
          }
          code={`<Doughnut
  data={{
    labels: ['Aprovados','Pendentes','Cancelados'],
    datasets: [{
      data: [412,128,38],
      backgroundColor: ['hsl(var(--success))','hsl(var(--warning))','hsl(var(--destructive))'],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  }}
  options={{ cutout: '65%', plugins: { legend: { position: 'right' } } }}
/>`}
        />

        <UsageNote type="info">
          Instalação: <code className="font-mono text-[11px]">bun add chart.js react-chartjs-2</code>. Registre apenas os componentes que usar (tree-shaking).
        </UsageNote>

        <UsageNote type="tip">
          <strong>Quando usar cada um?</strong> Use <strong>Recharts</strong> (padrão) para dashboards com até ~500 pontos, máxima integração com o tema shadcn e tooltips ricos. Use <strong>Chart.js</strong> quando precisar de performance Canvas (muitos pontos), animações fluidas ou tipos específicos (radar, polar, mixed types nativos).
        </UsageNote>

        <UsageNote type="warning">
          Em Chart.js, o container precisa ter altura definida (ex.: <code className="font-mono text-[11px]">h-72</code> ou <code className="font-mono text-[11px]">h-[300px]</code>) com <code className="font-mono text-[11px]">maintainAspectRatio: false</code>. Caso contrário o canvas cresce indefinidamente.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
