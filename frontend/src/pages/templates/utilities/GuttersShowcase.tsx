import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';

export default function GuttersShowcase() {
  return (
    <UtilitiesLayout title="Gutters" description="Espaçamentos entre colunas e linhas no grid.">
      <ShowcaseSection title="Gap Horizontal (gap-x)">
        <div className="space-y-4">
          {[0, 1, 2, 4, 6, 8].map(g => (
            <div key={g}>
              <code className="text-xs text-muted-foreground mb-1 block">gap-x-{g}</code>
              <div className={`grid grid-cols-4 gap-x-${g} gap-y-2`}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-primary/15 text-primary text-center py-2 rounded text-xs font-mono">Col</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Gap Vertical (gap-y)">
        <div className="space-y-4">
          {[0, 1, 2, 4, 6, 8].map(g => (
            <div key={g}>
              <code className="text-xs text-muted-foreground mb-1 block">gap-y-{g}</code>
              <div className={`grid grid-cols-4 gap-y-${g} gap-x-2`}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-primary/15 text-primary text-center py-2 rounded text-xs font-mono">Item</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Gap Uniforme">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-primary/10 text-primary text-center py-6 rounded-lg text-sm font-medium">
              Card {i}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          <code>gap-4 sm:gap-6 lg:gap-8</code> — Gutter responsivo
        </p>
      </ShowcaseSection>

      <ShowcaseSection title="Spacing Scale">
        <div className="space-y-2">
          {[
            { val: '0', px: '0px' }, { val: '0.5', px: '2px' }, { val: '1', px: '4px' },
            { val: '2', px: '8px' }, { val: '3', px: '12px' }, { val: '4', px: '16px' },
            { val: '6', px: '24px' }, { val: '8', px: '32px' }, { val: '12', px: '48px' },
            { val: '16', px: '64px' },
          ].map(s => (
            <div key={s.val} className="flex items-center gap-3">
              <code className="text-xs text-muted-foreground w-8 text-right">{s.val}</code>
              <div className="bg-primary rounded-sm h-3" style={{ width: s.px }} />
              <span className="text-xs text-muted-foreground">{s.px}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
