import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { pieData, palette } from '../chartData';

export default function ApexPieChart() {
  return (
    <ChartsLayout title="Pie Charts" description="Gráficos de pizza e donut para proporções.">
      <ChartSection title="Pizza Padrão">
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={130} label>
              {pieData.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Donut">
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={130} paddingAngle={2}>
              {pieData.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
