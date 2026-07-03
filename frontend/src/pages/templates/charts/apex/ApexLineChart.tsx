import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { monthly, chartColors } from '../chartData';

export default function ApexLineChart() {
  return (
    <ChartsLayout title="Line Charts" description="Gráficos de linha para tendências temporais e séries contínuas.">
      <ChartSection title="Linha Simples">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Line type="monotone" dataKey="a" stroke={chartColors.primary} strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Múltiplas Séries">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="a" name="Vendas" stroke={chartColors.primary} strokeWidth={2.5} />
            <Line type="monotone" dataKey="b" name="Custo" stroke={chartColors.secondary} strokeWidth={2.5} />
            <Line type="monotone" dataKey="c" name="Lucro" stroke={chartColors.success} strokeWidth={2.5} />
            <Line type="monotone" dataKey="d" name="Meta" stroke={chartColors.warning} strokeWidth={2.5} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Linha Suavizada (Stepped)">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Line type="step" dataKey="a" stroke={chartColors.accent} strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
