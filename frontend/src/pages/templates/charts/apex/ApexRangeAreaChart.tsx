import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { monthly, chartColors } from '../chartData';

const rangeData = monthly.map(m => ({
  name: m.name,
  range: [m.c, m.a] as [number, number],
}));

export default function ApexRangeAreaChart() {
  return (
    <ChartsLayout title="Range Area Charts" description="Áreas que representam intervalos (mín–máx).">
      <ChartSection title="Faixa de Variação">
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={rangeData}>
            <defs>
              <linearGradient id="rangeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.accent} stopOpacity={0.5} />
                <stop offset="100%" stopColor={chartColors.accent} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }} />
            <Area type="monotone" dataKey="range" stroke={chartColors.accent} strokeWidth={2} fill="url(#rangeFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
