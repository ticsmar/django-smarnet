import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { funnelData } from '../chartData';

export default function ApexFunnelChart() {
  const max = Math.max(...funnelData.map(d => d.value));
  return (
    <ChartsLayout title="Funnel Charts" description="Visualização de funis de conversão.">
      <ChartSection title="Funil de Conversão">
        <div className="space-y-2 max-w-2xl mx-auto py-6">
          {funnelData.map((d, i) => {
            const widthPct = (d.value / max) * 100;
            const indent = (100 - widthPct) / 2;
            return (
              <div key={d.stage} className="relative" style={{ paddingLeft: `${indent}%`, paddingRight: `${indent}%` }}>
                <div
                  className="rounded-lg flex items-center justify-between px-5 py-4 text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={{ background: d.color, color: 'white' }}
                >
                  <span>{d.stage}</span>
                  <span className="font-display text-base">{d.value.toLocaleString('pt-BR')}</span>
                </div>
                {i < funnelData.length - 1 && (
                  <div className="text-center text-[10px] text-muted-foreground mt-1">
                    Conversão: {((funnelData[i + 1].value / d.value) * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ChartSection>
    </ChartsLayout>
  );
}
