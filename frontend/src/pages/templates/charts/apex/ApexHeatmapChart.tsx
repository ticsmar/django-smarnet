import { ChartsLayout, ChartSection } from '../ChartsLayout';
import { heatmapData } from '../chartData';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

export default function ApexHeatmapChart() {
  const colorFor = (v: number) => {
    const opacity = 0.1 + (v / 100) * 0.9;
    return `hsl(var(--primary) / ${opacity})`;
  };

  return (
    <ChartsLayout title="Heatmap Charts" description="Mapa de calor para densidade temporal (dia × hora).">
      <ChartSection title="Atividade por Hora da Semana">
        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-1 min-w-full">
            <div className="flex gap-1 pl-10">
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} className="w-7 text-center text-[10px] text-muted-foreground">{h}</div>
              ))}
            </div>
            {days.map((day, row) => (
              <div key={day} className="flex items-center gap-1">
                <div className="w-9 text-xs font-semibold text-muted-foreground">{day}</div>
                {Array.from({ length: 24 }, (_, col) => {
                  const cell = heatmapData.find(d => d.row === row && d.col === col);
                  return (
                    <div
                      key={col}
                      title={`${day} ${col}h: ${cell?.value ?? 0}`}
                      className="w-7 h-7 rounded transition-transform hover:scale-110"
                      style={{ background: colorFor(cell?.value ?? 0) }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 text-xs text-muted-foreground">
          <span>Menos</span>
          {[10, 30, 50, 70, 90].map(v => (
            <div key={v} className="w-6 h-4 rounded" style={{ background: colorFor(v) }} />
          ))}
          <span>Mais</span>
        </div>
      </ChartSection>
    </ChartsLayout>
  );
}
