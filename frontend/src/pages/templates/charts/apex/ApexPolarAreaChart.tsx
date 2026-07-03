import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { pieData, palette } from '../chartData';

export default function ApexPolarAreaChart() {
  // Polar area: equal angles, varying radius — emulated with multiple Pie layers.
  const max = Math.max(...pieData.map(p => p.value));
  const equalSlice = pieData.map(d => ({ name: d.name, value: 1 }));

  return (
    <ChartsLayout title="Polararea Charts" description="Áreas polares com ângulos iguais e raios variáveis.">
      <ChartSection title="Distribuição Polar">
        <ResponsiveContainer width="100%" height={420}>
          <PieChart>
            {pieData.map((d, i) => {
              const radius = 60 + (d.value / max) * 90;
              const slice = equalSlice.map((s, si) => ({ ...s, value: si === i ? 1 : 0 }));
              return (
                <Pie
                  key={d.name}
                  data={equalSlice}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={radius}
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={false}
                >
                  {equalSlice.map((_, si) => (
                    <Cell
                      key={si}
                      fill={si === i ? palette[i % palette.length] : 'transparent'}
                      fillOpacity={0.65}
                      stroke={si === i ? palette[i % palette.length] : 'transparent'}
                      strokeWidth={1.5}
                    />
                  ))}
                </Pie>
              );
            })}
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              payload={pieData.map((d, i) => ({ value: `${d.name} (${d.value})`, type: 'square', color: palette[i % palette.length] }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
