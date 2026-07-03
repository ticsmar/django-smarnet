import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { candleData, chartColors } from '../chartData';

export default function ApexCandleStickChart() {
  return (
    <ChartsLayout title="CandleStick Charts" description="Gráficos de velas para análise financeira (OHLC).">
      <ChartSection title="OHLC Diário">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={candleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12 }}
              formatter={(value: any, name) => {
                if (Array.isArray(value)) return [`${value[0].toFixed(2)} – ${value[1].toFixed(2)}`, name];
                return [value, name];
              }}
            />
            {/* Wick (high-low) */}
            <Bar dataKey="range" fill="hsl(var(--muted-foreground))" barSize={2} />
            {/* Body (open-close) */}
            <Bar dataKey="body" barSize={10}>
              {candleData.map((d, i) => (
                <Bar key={i} dataKey="body" fill={d.close >= d.open ? chartColors.success : chartColors.destructive} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="close" stroke={chartColors.primary} strokeWidth={1.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartSection>
    </ChartsLayout>
  );
}
