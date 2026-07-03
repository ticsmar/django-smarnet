import { Separator } from '@/components/ui/separator';
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

const separatorProps: PropDef[] = [
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Direção do separador.' },
  { name: 'decorative', type: 'boolean', default: 'true', description: 'Se true, é puramente visual e ignorado por leitores de tela.' },
  { name: 'className', type: 'string', description: 'Classes adicionais para estilização.' },
];

export default function SeparatorPage() {
  return (
    <ComponentDoc
      summary="Linha divisória visual entre seções de conteúdo. Baseado em Radix UI Separator."
      importPath="@/components/ui/separator"
    >
      <DocSection title="Separator" description="Pode ser horizontal ou vertical.">
        <VariantSection
          title="Horizontal"
          description="Separador padrão entre blocos de conteúdo."
          preview={
            <div className="space-y-0">
              <h4 className="font-bold text-sm">SmarNet ERP</h4>
              <p className="text-xs text-muted-foreground">Plataforma industrial integrada.</p>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">Conteúdo abaixo do separador.</p>
            </div>
          }
          code={`<Separator className="my-4" />`}
        />

        <VariantSection
          title="Vertical"
          description="Separador entre itens inline, como links de navegação."
          preview={
            <div className="flex items-center gap-3 text-sm">
              <span>Blog</span>
              <Separator orientation="vertical" className="h-5" />
              <span>Docs</span>
              <Separator orientation="vertical" className="h-5" />
              <span>Contato</span>
            </div>
          }
          code={`<div className="flex items-center gap-3">
  <span>Blog</span>
  <Separator orientation="vertical" className="h-5" />
  <span>Docs</span>
  <Separator orientation="vertical" className="h-5" />
  <span>Contato</span>
</div>`}
        />

        <VariantSection
          title="Personalizado"
          description="Use className para alterar espessura e cor."
          preview={
            <div className="space-y-4">
              <Separator className="bg-muted-foreground/30" />
              <Separator className="h-[2px] bg-primary/40" />
              <Separator className="h-[1px] bg-border/60 border-dashed" />
            </div>
          }
          code={`<Separator className="h-[2px] bg-primary/40" />`}
        />
      </DocSection>

      <DocSection title="API">
        <PropsTable rows={separatorProps} />
      </DocSection>

      <UsageNote type="info">
        Para separadores semânticos (que transmitem significado), defina <code>decorative=false</code> para que leitores de tela reconheçam o elemento como <code>role="separator"</code>.
      </UsageNote>
    </ComponentDoc>
  );
}
