import { ComposedChart, Bar, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { monthly, chartColors } from '../chartData';

export default function ApexMixedChart() {
  return (
    <ChartsLayout title="Mixed Charts" description="Combinação de tipos de gráfico no mesmo eixo.">
      <ChartSection title="Coluna + Linha">
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="a" name="Vendas" fill={chartColors.primary} radius={[6, 6, 0, 0]} />
            <Line type="monotone" dataKey="b" name="Tendência" stroke={chartColors.warning} strokeWidth={3} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Coluna + Área + Linha">
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="c" name="Base" fill={chartColors.secondary} stroke={chartColors.secondary} fillOpacity={0.3} />
            <Bar dataKey="a" name="Atual" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="b" name="Meta" stroke={chartColors.warning} strokeWidth={2.5} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
