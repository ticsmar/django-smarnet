import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';

export default function HelpersShowcase() {
  return (
    <UtilitiesLayout title="Helpers" description="Classes utilitárias diversas para layout e visibilidade.">
      <ShowcaseSection title="Overflow">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['overflow-hidden', 'overflow-auto', 'overflow-scroll'].map(o => (
            <div key={o} className="space-y-1">
              <code className="text-xs text-muted-foreground">{o}</code>
              <div className={`h-24 bg-muted/30 rounded-lg p-3 ${o}`}>
                <p className="text-xs text-foreground whitespace-nowrap">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                </p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Visibilidade">
        <div className="flex gap-4 items-center">
          <div className="bg-primary/15 text-primary px-4 py-2 rounded text-sm">Visível</div>
          <div className="bg-primary/15 text-primary px-4 py-2 rounded text-sm invisible">Invisible</div>
          <div className="bg-primary/15 text-primary px-4 py-2 rounded text-sm opacity-50">Opacity 50%</div>
          <div className="bg-primary/15 text-primary px-4 py-2 rounded text-sm opacity-25">Opacity 25%</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">O segundo item tem <code>invisible</code> — mantém espaço no layout.</p>
      </ShowcaseSection>

      <ShowcaseSection title="Truncate / Line Clamp">
        <div className="space-y-4 max-w-lg">
          <div>
            <code className="text-xs text-muted-foreground">truncate</code>
            <p className="truncate text-sm text-foreground bg-muted/30 rounded p-2">
              Este texto será truncado com reticências quando exceder o tamanho do container. Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div>
            <code className="text-xs text-muted-foreground">line-clamp-2</code>
            <p className="line-clamp-2 text-sm text-foreground bg-muted/30 rounded p-2">
              Este texto será limitado a duas linhas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cursor">
        <div className="flex flex-wrap gap-3">
          {['cursor-pointer', 'cursor-default', 'cursor-wait', 'cursor-text', 'cursor-move', 'cursor-not-allowed', 'cursor-grab'].map(c => (
            <div key={c} className={`${c} bg-muted/30 px-4 py-3 rounded-lg text-xs text-foreground font-mono border border-border/40 hover:bg-muted/50 transition-colors`}>
              {c}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Select / Pointer Events">
        <div className="flex flex-wrap gap-4">
          <div className="select-none bg-muted/30 px-4 py-3 rounded-lg text-sm text-foreground">
            <code className="text-xs text-muted-foreground block mb-1">select-none</code>
            Não selecionável
          </div>
          <div className="select-all bg-muted/30 px-4 py-3 rounded-lg text-sm text-foreground">
            <code className="text-xs text-muted-foreground block mb-1">select-all</code>
            Seleciona tudo ao clicar
          </div>
          <div className="pointer-events-none opacity-50 bg-muted/30 px-4 py-3 rounded-lg text-sm text-foreground">
            <code className="text-xs text-muted-foreground block mb-1">pointer-events-none</code>
            Sem interação
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Screen Reader Only">
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-foreground">O botão abaixo tem um texto <code className="text-xs">sr-only</code> para leitores de tela:</p>
          <button className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">
            ★ <span className="sr-only">Adicionar aos favoritos</span>
          </button>
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
