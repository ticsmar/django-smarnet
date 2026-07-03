import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { monthly, chartColors } from '../chartData';

export default function ApexColumnChart() {
  return (
    <ChartsLayout title="Column Charts" description="Gráficos de coluna verticais para comparação de categorias.">
      <ChartSection title="Coluna Simples">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Bar dataKey="a" fill={chartColors.primary} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Coluna Agrupada">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="a" name="2024" fill={chartColors.primary} radius={[6, 6, 0, 0]} />
            <Bar dataKey="b" name="2025" fill={chartColors.secondary} radius={[6, 6, 0, 0]} />
            <Bar dataKey="c" name="Meta" fill={chartColors.warning} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Coluna Empilhada">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="a" stackId="x" fill={chartColors.primary} />
            <Bar dataKey="b" stackId="x" fill={chartColors.secondary} />
            <Bar dataKey="c" stackId="x" fill={chartColors.accent} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
