import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';

const borderWidths = ['border', 'border-2', 'border-4', 'border-8'];
const borderStyles = ['border-solid', 'border-dashed', 'border-dotted', 'border-double'];
const borderRadii = ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full'];

export default function BordersShowcase() {
  return (
    <UtilitiesLayout title="Borders" description="Utilitários de borda: largura, estilo, raio e cores.">
      <ShowcaseSection title="Largura da Borda">
        <div className="flex flex-wrap gap-6">
          {borderWidths.map(b => (
            <div key={b} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 ${b} border-primary bg-surface-container rounded-md`} />
              <code className="text-xs text-muted-foreground">{b}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estilo da Borda">
        <div className="flex flex-wrap gap-6">
          {borderStyles.map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 border-2 ${s} border-primary bg-surface-container rounded-md`} />
              <code className="text-xs text-muted-foreground">{s}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Border Radius">
        <div className="flex flex-wrap gap-6">
          {borderRadii.map(r => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 border-2 border-primary bg-primary/10 ${r}`} />
              <code className="text-xs text-muted-foreground">{r}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cores de Borda">
        <div className="flex flex-wrap gap-6">
          {['border-primary', 'border-secondary', 'border-destructive', 'border-muted', 'border-accent'].map(c => (
            <div key={c} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 border-2 ${c} bg-surface-container rounded-md`} />
              <code className="text-xs text-muted-foreground">{c}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Borda Parcial">
        <div className="flex flex-wrap gap-6">
          {['border-t-2', 'border-r-2', 'border-b-2', 'border-l-2'].map(b => (
            <div key={b} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 ${b} border-primary bg-surface-container rounded-md`} />
              <code className="text-xs text-muted-foreground">{b}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Divide">
        <div className="divide-y divide-border rounded-lg border border-border/40 overflow-hidden">
          {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map(item => (
            <div key={item} className="px-4 py-3 text-sm text-foreground">{item}</div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
