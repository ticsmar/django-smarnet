import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { timelineData } from '../chartData';

export default function ApexTimelineChart() {
  return (
    <ChartsLayout title="Timeline Charts" description="Gráficos Gantt-style para cronogramas e fases de projeto.">
      <ChartSection title="Cronograma de Projeto">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={timelineData} layout="vertical" barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
            <YAxis type="category" dataKey="task" stroke="hsl(var(--muted-foreground))" fontSize={12} width={140} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }}
              formatter={(_v, _n, p) => [`Sem ${p.payload.start} → ${p.payload.end}`, p.payload.task]}
            />
            <Bar dataKey={(d) => d.end - d.start} stackId="a" fill="transparent" />
            <Bar
              dataKey={(d) => d.end - d.start}
              radius={[8, 8, 8, 8]}
              background={{ fill: 'hsl(var(--muted))' }}
            >
              {timelineData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
