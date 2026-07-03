import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { monthly, chartColors } from '../chartData';

export default function ApexAreaChart() {
  return (
    <ChartsLayout title="Area Charts" description="Gráficos de área para volumes acumulados e proporções ao longo do tempo.">
      <ChartSection title="Área com Gradiente">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.6} />
                <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Area type="monotone" dataKey="a" stroke={chartColors.primary} strokeWidth={2} fill="url(#fillA)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Área Empilhada">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="a" stackId="1" stroke={chartColors.primary} fill={chartColors.primary} fillOpacity={0.8} />
            <Area type="monotone" dataKey="b" stackId="1" stroke={chartColors.secondary} fill={chartColors.secondary} fillOpacity={0.8} />
            <Area type="monotone" dataKey="c" stackId="1" stroke={chartColors.accent} fill={chartColors.accent} fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
