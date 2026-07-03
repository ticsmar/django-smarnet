import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { palette } from '../chartData';

const radialData = [
  { name: 'Servidor 1', value: 78, fill: palette[0] },
  { name: 'Servidor 2', value: 65, fill: palette[1] },
  { name: 'Servidor 3', value: 92, fill: palette[2] },
  { name: 'Servidor 4', value: 45, fill: palette[3] },
  { name: 'Servidor 5', value: 88, fill: palette[4] },
];

export default function ApexRadialBarChart() {
  return (
    <ChartsLayout title="Radialbar Charts" description="Barras radiais para indicadores de progresso/percentual.">
      <ChartSection title="Uso de Recursos">
        <ResponsiveContainer width="100%" height={420}>
          <RadialBarChart innerRadius="20%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
            <RadialBar background dataKey="value" cornerRadius={10} />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
