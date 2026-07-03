import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { scatterData, chartColors } from '../chartData';

const series2 = scatterData.map(d => ({ x: d.x + Math.random() * 20 - 10, y: d.y + Math.random() * 20 - 10, z: d.z }));

export default function ApexBubbleChart() {
  return (
    <ChartsLayout title="Bubble Charts" description="Dispersão com terceira dimensão representada pelo tamanho.">
      <ChartSection title="Dispersão de Bolhas">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" dataKey="x" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis type="number" dataKey="y" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <ZAxis type="number" dataKey="z" range={[60, 600]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Scatter name="Série A" data={scatterData} fill={chartColors.primary} fillOpacity={0.6} />
            <Scatter name="Série B" data={series2} fill={chartColors.accent} fillOpacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
