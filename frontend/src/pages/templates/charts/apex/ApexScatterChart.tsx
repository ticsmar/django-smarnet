import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { scatterData, chartColors } from '../chartData';

const series2 = scatterData.map(d => ({ x: d.x + 15 + Math.random() * 10, y: d.y - 10 + Math.random() * 10 }));

export default function ApexScatterChart() {
  return (
    <ChartsLayout title="Scatter Charts" description="Diagrama de dispersão para correlações.">
      <ChartSection title="Dispersão Padrão">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" dataKey="x" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis type="number" dataKey="y" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Scatter name="Grupo X" data={scatterData} fill={chartColors.primary} />
            <Scatter name="Grupo Y" data={series2} fill={chartColors.warning} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
