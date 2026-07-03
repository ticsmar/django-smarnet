import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';

export default function ColumnsShowcase() {
  return (
    <UtilitiesLayout title="Columns" description="Sistema de grid e colunas com Tailwind CSS.">
      <ShowcaseSection title="Grid de 12 Colunas">
        <div className="space-y-3">
          {[
            [12], [6, 6], [4, 4, 4], [3, 3, 3, 3], [2, 2, 2, 2, 2, 2],
            [8, 4], [3, 6, 3], [4, 8], [9, 3],
          ].map((row, ri) => (
            <div key={ri} className="grid grid-cols-12 gap-2">
              {row.map((span, ci) => (
                <div key={ci} className={`col-span-${span} bg-primary/15 text-primary text-center py-2 rounded text-xs font-mono`}>
                  {span}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Auto-fit Grid">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bg-primary/10 text-primary text-center py-6 rounded-lg text-sm font-medium">
              Auto {i + 1}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Offset / Start">
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4 col-start-1 bg-primary/15 text-primary text-center py-2 rounded text-xs font-mono">start-1 span-4</div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4 col-start-5 bg-primary/15 text-primary text-center py-2 rounded text-xs font-mono">start-5 span-4</div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4 col-start-9 bg-primary/15 text-primary text-center py-2 rounded text-xs font-mono">start-9 span-4</div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="CSS Columns">
        <div className="columns-3 gap-4 space-y-4">
          {[120, 80, 160, 100, 140, 60, 180, 90].map((h, i) => (
            <div key={i} className="bg-primary/10 rounded-lg break-inside-avoid text-primary text-center text-xs font-mono flex items-center justify-center" style={{ height: h }}>
              {h}px
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
