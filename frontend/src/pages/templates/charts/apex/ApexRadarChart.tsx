import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { radarData, chartColors } from '../chartData';

export default function ApexRadarChart() {
  return (
    <ChartsLayout title="Radar Charts" description="Gráficos de radar para avaliação multidimensional.">
      <ChartSection title="Comparativo Operacional">
        <ResponsiveContainer width="100%" height={420}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <PolarRadiusAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
            <Radar name="Linha A" dataKey="A" stroke={chartColors.primary} fill={chartColors.primary} fillOpacity={0.3} />
            <Radar name="Linha B" dataKey="B" stroke={chartColors.accent} fill={chartColors.accent} fillOpacity={0.3} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
