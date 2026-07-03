import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';

export default function PositionShowcase() {
  return (
    <UtilitiesLayout title="Position" description="Utilitários de posicionamento CSS.">
      <ShowcaseSection title="Tipos de Position">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'static', desc: 'Posição padrão no fluxo do documento' },
            { name: 'relative', desc: 'Relativo à posição original' },
            { name: 'absolute', desc: 'Relativo ao pai posicionado' },
            { name: 'fixed', desc: 'Relativo ao viewport (demonstração limitada)' },
            { name: 'sticky', desc: 'Alterna entre relative e fixed' },
          ].map(p => (
            <div key={p.name} className="bg-muted/30 rounded-lg p-4">
              <code className="text-primary text-xs font-mono font-semibold">{p.name}</code>
              <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Relative + Absolute">
        <div className="relative bg-muted/30 rounded-lg h-48 p-4">
          <span className="text-xs text-muted-foreground">Container (relative)</span>
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">top-2 right-2</div>
          <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">bottom-2 left-2</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground text-xs px-3 py-1.5 rounded">Centralizado</div>
          <div className="absolute bottom-2 right-2 bg-success text-primary-foreground text-xs px-2 py-1 rounded">bottom-2 right-2</div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Inset">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { cls: 'inset-0', label: 'inset-0' },
            { cls: 'inset-x-0 top-0', label: 'inset-x-0 top-0' },
            { cls: 'inset-y-0 left-0', label: 'inset-y-0 left-0' },
            { cls: 'inset-x-0 bottom-0', label: 'inset-x-0 bottom-0' },
          ].map(item => (
            <div key={item.label} className="relative bg-muted/30 rounded-lg h-32 p-2">
              <div className={`absolute ${item.cls} bg-primary/20 rounded-lg flex items-center justify-center`}>
                <code className="text-[10px] text-primary font-mono">{item.label}</code>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Z-Index">
        <div className="relative h-40 flex items-center justify-center">
          {[
            { z: 'z-10', cls: 'bg-primary/80 left-[30%]', label: 'z-10' },
            { z: 'z-20', cls: 'bg-primary/60 left-[38%]', label: 'z-20' },
            { z: 'z-30', cls: 'bg-primary/40 left-[46%]', label: 'z-30' },
            { z: 'z-40', cls: 'bg-primary left-[54%]', label: 'z-40' },
          ].map(item => (
            <div key={item.label} className={`absolute ${item.z} ${item.cls} text-primary-foreground text-xs px-4 py-6 rounded-lg font-mono shadow-md top-1/2 -translate-y-1/2`}>
              {item.label}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sticky (Scroll)">
        <div className="h-48 overflow-auto rounded-lg border border-border/40">
          <div className="sticky top-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold z-10">
            Header Sticky — role para baixo ↓
          </div>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="px-4 py-3 border-b border-border/20 text-sm text-foreground">
              Linha {i + 1}
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
