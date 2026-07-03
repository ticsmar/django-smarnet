import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { monthly, chartColors } from '../chartData';

export default function ApexBarChart() {
  return (
    <ChartsLayout title="Bar Charts" description="Gráficos de barra horizontais para ranking e comparação.">
      <ChartSection title="Barra Horizontal Simples">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthly} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Bar dataKey="a" fill={chartColors.secondary} radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Barra Agrupada">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthly} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="a" name="Q1" fill={chartColors.primary} radius={[0, 4, 4, 0]} />
            <Bar dataKey="b" name="Q2" fill={chartColors.secondary} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
