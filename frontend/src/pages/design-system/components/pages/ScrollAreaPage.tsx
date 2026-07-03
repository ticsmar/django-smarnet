import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

const scrollAreaProps: PropDef[] = [
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS no container root.' },
  { name: 'type', type: '"auto" | "always" | "scroll" | "hover"', default: '"hover"', description: 'Visibilidade da scrollbar.' },
  { name: 'scrollHideDelay', type: 'number', default: '600', description: 'Delay em ms para ocultar a scrollbar após parar de rolar.' },
];

const scrollBarProps: PropDef[] = [
  { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Direção da scrollbar.' },
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais.' },
];

const tags = [
  'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Vite', 'Node.js',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'REST API',
  'CI/CD', 'Git', 'ESLint', 'Prettier', 'Jest', 'Playwright',
];

export default function ScrollAreaPage() {
  return (
    <ComponentDoc
      summary="Container com scrollbar estilizada, consistente entre browsers e plataformas. Substitui o scroll nativo por um thumb personalizado com suporte a vertical e horizontal."
      importPath="import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'"
    >
      <DocSection title="ScrollArea">
        <VariantSection
          title="Scroll Vertical"
          description="Lista longa com scrollbar vertical automática."
          preview={
            <ScrollArea className="h-60 w-full max-w-md rounded-xl border border-border/30 bg-surface-container">
              <div className="p-4 space-y-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground">Item #{i + 1}</span>
                      <span className="text-xs text-muted-foreground">Descrição breve</span>
                    </div>
                    {i < 29 && <Separator className="opacity-30" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          }
          code={`<ScrollArea className="h-60 w-full max-w-md rounded-xl border">
  <div className="p-4 space-y-1">
    {items.map((item, i) => (
      <div key={i} className="py-2 text-sm">{item.label}</div>
    ))}
  </div>
</ScrollArea>`}
        />

        <VariantSection
          title="Scroll Horizontal"
          description="Conteúdo horizontal com ScrollBar direction horizontal."
          preview={
            <ScrollArea className="w-full max-w-lg rounded-xl border border-border/30 bg-surface-container whitespace-nowrap">
              <div className="flex gap-3 p-4">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary shrink-0"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          }
          code={`<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex gap-3 p-4">
    {tags.map(tag => (
      <div key={tag} className="shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-xs">
        {tag}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
        />

        <VariantSection
          title="Bidirectional"
          description="Scroll tanto vertical quanto horizontal para tabelas ou conteúdo grande."
          preview={
            <ScrollArea className="h-48 w-full max-w-md rounded-xl border border-border/30 bg-surface-container">
              <div className="p-4" style={{ width: '800px' }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border/30">
                      {['ID', 'Nome', 'Email', 'Cargo', 'Departamento', 'Status', 'Data', 'Ações'].map(h => (
                        <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <tr key={i} className="border-b border-border/20">
                        <td className="px-3 py-2 text-foreground">{1000 + i}</td>
                        <td className="px-3 py-2 text-foreground whitespace-nowrap">Colaborador {i + 1}</td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">user{i + 1}@empresa.com</td>
                        <td className="px-3 py-2 text-foreground whitespace-nowrap">Analista Sr.</td>
                        <td className="px-3 py-2 text-foreground whitespace-nowrap">Engenharia</td>
                        <td className="px-3 py-2"><span className="text-success">Ativo</span></td>
                        <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">01/01/2025</td>
                        <td className="px-3 py-2 text-primary whitespace-nowrap">Editar</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          }
          code={`<ScrollArea className="h-48 w-full max-w-md">
  <div style={{ width: '800px' }}>
    <table>...</table>
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
        />

        <VariantSection
          title="Tamanhos Customizados"
          description="Controle a altura do container com className."
          preview={
            <div className="flex gap-4 flex-wrap">
              {[
                { label: 'Compacto (h-32)', cls: 'h-32 w-48' },
                { label: 'Médio (h-48)', cls: 'h-48 w-48' },
                { label: 'Grande (h-64)', cls: 'h-64 w-48' },
              ].map((size) => (
                <div key={size.label} className="space-y-1.5">
                  <p className="text-xs text-muted-foreground font-medium">{size.label}</p>
                  <ScrollArea className={`${size.cls} rounded-xl border border-border/30 bg-surface-container`}>
                    <div className="p-3 space-y-2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <p key={i} className="text-xs text-foreground/80">Linha {i + 1}</p>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ))}
            </div>
          }
          code={`<ScrollArea className="h-32 w-48 rounded-xl border">
  ...conteúdo longo...
</ScrollArea>`}
        />

        <PropsTable rows={scrollAreaProps} title="ScrollArea" />
        <PropsTable rows={scrollBarProps} title="ScrollBar" />

        <UsageNote type="tip">
          Adicione <code className="font-mono text-[11px]">{'<ScrollBar orientation="horizontal" />'}</code> como filho direto do <code className="font-mono text-[11px]">ScrollArea</code> para habilitar scroll horizontal.
        </UsageNote>

        <UsageNote type="info">
          O ScrollArea usa <code className="font-mono text-[11px]">overflow: hidden</code> no root e renderiza a scrollbar como overlay — o conteúdo não perde espaço para a barra.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
