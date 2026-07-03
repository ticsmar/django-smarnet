import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartsLayout, ChartSection } from './ChartsLayout';
import { monthly, pieData, radarData, palette, chartColors } from './chartData';

export default function EchartShowcase() {
  return (
    <ChartsLayout title="Echart Charts" description="Estilo ECharts — visualizações ricas e interativas." category="Echart">
      <ChartSection title="Smooth Line">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="basis" dataKey="a" name="Atual" stroke={chartColors.primary} strokeWidth={3} dot={false} />
            <Line type="basis" dataKey="d" name="Anterior" stroke={chartColors.accent} strokeWidth={3} strokeDasharray="6 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Stacked Bar">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly.slice(0, 8)}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="a" stackId="x" fill={chartColors.primary} />
            <Bar dataKey="b" stackId="x" fill={chartColors.secondary} />
            <Bar dataKey="c" stackId="x" fill={chartColors.accent} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Pie Rose">
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={130} label>
              {pieData.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartSection>

      <ChartSection title="Radar">
        <ResponsiveContainer width="100%" height={340}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <Radar name="A" dataKey="A" stroke={chartColors.primary} fill={chartColors.primary} fillOpacity={0.3} />
            <Radar name="B" dataKey="B" stroke={chartColors.warning} fill={chartColors.warning} fillOpacity={0.3} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
