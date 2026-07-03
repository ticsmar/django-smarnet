import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';
import { cn } from '@/lib/utils';

const breakpoints = [
  { name: 'sm', min: '640px', desc: 'Smartphones em paisagem' },
  { name: 'md', min: '768px', desc: 'Tablets em retrato' },
  { name: 'lg', min: '1024px', desc: 'Tablets em paisagem / laptops' },
  { name: 'xl', min: '1280px', desc: 'Desktops' },
  { name: '2xl', min: '1536px', desc: 'Monitores grandes' },
];

export default function BreakpointsShowcase() {
  return (
    <UtilitiesLayout title="Breakpoints" description="Referência de breakpoints responsivos do Tailwind CSS.">
      <ShowcaseSection title="Tabela de Breakpoints">
        <div className="overflow-hidden rounded-xl border border-border/40">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Prefixo</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Largura Mínima</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">CSS</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {breakpoints.map((bp, i) => (
                  <tr key={bp.name} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                    <td className="px-6 py-4 text-sm text-foreground"><code className="text-primary font-mono text-xs bg-primary/10 px-2 py-0.5 rounded">{bp.name}:</code></td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{bp.min}</td>
                    <td className="px-6 py-4 text-sm text-foreground"><code className="text-xs text-muted-foreground font-mono">@media (min-width: {bp.min})</code></td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{bp.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Demonstração Responsiva">
        <div className="space-y-3">
          <div className="bg-primary/10 text-primary text-center py-3 rounded-lg text-sm font-medium">
            Visível em todas as telas
          </div>
          <div className="hidden sm:block bg-primary/20 text-primary text-center py-3 rounded-lg text-sm font-medium">
            Visível a partir de <code className="font-mono">sm</code> (≥640px)
          </div>
          <div className="hidden md:block bg-primary/30 text-primary text-center py-3 rounded-lg text-sm font-medium">
            Visível a partir de <code className="font-mono">md</code> (≥768px)
          </div>
          <div className="hidden lg:block bg-primary/40 text-primary text-center py-3 rounded-lg text-sm font-medium">
            Visível a partir de <code className="font-mono">lg</code> (≥1024px)
          </div>
          <div className="hidden xl:block bg-primary/50 text-primary text-center py-3 rounded-lg text-sm font-medium">
            Visível a partir de <code className="font-mono">xl</code> (≥1280px)
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Grid Responsivo">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="bg-primary/10 text-primary text-center py-4 rounded-lg text-xs font-mono">
              Col {i + 1}
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
