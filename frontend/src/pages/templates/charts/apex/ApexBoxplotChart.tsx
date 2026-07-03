import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Scatter } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { chartColors } from '../chartData';

const boxData = ['A', 'B', 'C', 'D', 'E'].map(name => {
  const min = 20 + Math.random() * 20;
  const q1 = min + 10 + Math.random() * 10;
  const median = q1 + 5 + Math.random() * 10;
  const q3 = median + 5 + Math.random() * 10;
  const max = q3 + 5 + Math.random() * 15;
  return { name, range: [min, max] as [number, number], box: [q1, q3] as [number, number], median };
});

export default function ApexBoxplotChart() {
  return (
    <ChartsLayout title="Boxplot Charts" description="Distribuição estatística (mínimo, Q1, mediana, Q3, máximo).">
      <ChartSection title="Distribuição por Categoria">
        <ResponsiveContainer width="100%" height={360}>
          <ComposedChart data={boxData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Bar dataKey="range" fill="hsl(var(--muted-foreground))" barSize={2} />
            <Bar dataKey="box" fill={chartColors.primary} fillOpacity={0.7} stroke={chartColors.primary} strokeWidth={2} barSize={50} />
            <Scatter dataKey="median" fill={chartColors.warning} shape="circle" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
