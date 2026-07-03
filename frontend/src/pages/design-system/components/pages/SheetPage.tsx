import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ComponentDoc, VariantSection, PropsTable, UsageNote } from '../_docs';
import { Filter, PanelRight, PanelLeft, PanelTop, PanelBottom } from 'lucide-react';

export default function SheetPage() {
  return (
    <ComponentDoc
      summary="Painel deslizante (slide-over) ancorado a uma borda da tela. Ideal para filtros, detalhes ou formulários auxiliares que não justificam navegação de página. Baseado em Radix Dialog com variantes de posição."
      importPath="import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet'"
    >
      {/* Direita — filtros */}
      <VariantSection
        title="Sheet Lateral Direita (Filtros)"
        description="Posição padrão — slide-in da direita com formulário de filtros."
        preview={
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filtros</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filtros avançados</SheetTitle>
                <SheetDescription>Refine a listagem por campos específicos.</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="s-status">Status</Label>
                  <Input id="s-status" placeholder="Ativo, Inativo..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-date">Data início</Label>
                  <Input id="s-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-region">Região</Label>
                  <Input id="s-region" placeholder="Sul, Sudeste..." />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild><Button variant="outline">Limpar</Button></SheetClose>
                <Button>Aplicar filtros</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        }
        code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filtros</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filtros avançados</SheetTitle>
      <SheetDescription>Refine a listagem por campos.</SheetDescription>
    </SheetHeader>
    <div className="space-y-4 py-4">
      {/* campos de filtro */}
    </div>
    <SheetFooter>
      <SheetClose asChild><Button variant="outline">Limpar</Button></SheetClose>
      <Button>Aplicar filtros</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
      />

      {/* Todas as direções */}
      <VariantSection
        title="Posições (4 lados)"
        description="O Sheet pode deslizar de qualquer borda da tela via a prop side."
        preview={
          <div className="flex flex-wrap gap-3">
            {([
              { side: 'right' as const, icon: PanelRight, label: 'Direita' },
              { side: 'left' as const, icon: PanelLeft, label: 'Esquerda' },
              { side: 'top' as const, icon: PanelTop, label: 'Topo' },
              { side: 'bottom' as const, icon: PanelBottom, label: 'Base' },
            ]).map(({ side, icon: Icon, label }) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm"><Icon className="mr-2 h-4 w-4" />{label}</Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Painel — {label}</SheetTitle>
                    <SheetDescription>Sheet deslizando da borda {label.toLowerCase()}.</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 text-sm text-muted-foreground">
                    Conteúdo do painel lateral. Filtros, ações ou formulários aqui.
                  </div>
                  <SheetFooter>
                    <SheetClose asChild><Button size="sm">Fechar</Button></SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        }
        code={`{(['right', 'left', 'top', 'bottom'] as const).map((side) => (
  <Sheet key={side}>
    <SheetTrigger asChild>
      <Button variant="outline">{side}</Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Painel {side}</SheetTitle>
        <SheetDescription>Conteúdo do painel.</SheetDescription>
      </SheetHeader>
      <div className="py-4">Conteúdo aqui.</div>
      <SheetFooter><Button>Aplicar</Button></SheetFooter>
    </SheetContent>
  </Sheet>
))}`}
      />

      <PropsTable
        title="Componentes & Props"
        rows={[
          { name: 'Sheet', type: 'Root', description: 'Container raiz — gerencia estado open/closed.' },
          { name: 'open', type: 'boolean', description: 'Controle externo do estado (controlled mode).', default: '—' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback quando o estado muda.' },
          { name: 'SheetTrigger', type: 'Component', description: 'Elemento que abre o sheet. Use asChild.' },
          { name: 'SheetContent', type: 'Component', description: 'Painel deslizante com overlay, foco preso e animações.' },
          { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", description: 'Borda de ancoragem do painel.', default: "'right'" },
          { name: 'SheetHeader', type: 'div', description: 'Wrapper para título + descrição.' },
          { name: 'SheetTitle', type: 'Component', description: 'Título — obrigatório para acessibilidade.' },
          { name: 'SheetDescription', type: 'Component', description: 'Descrição opcional.' },
          { name: 'SheetFooter', type: 'div', description: 'Container de ações.' },
          { name: 'SheetClose', type: 'Component', description: 'Elemento que fecha o sheet. Use asChild.' },
        ]}
      />

      <UsageNote type="tip">
        Use <strong>Sheet</strong> para filtros, detalhes de registro ou navegação auxiliar.
        Prefira <code>side="right"</code> para fluxos de leitura LTR e <code>side="left"</code> para navegação.
      </UsageNote>

      <UsageNote type="warning">
        Em mobile, sheets laterais ocupam 75% da largura (<code>w-3/4</code>). Para conteúdo 
        extenso em mobile, considere usar <code>Drawer</code> (bottom sheet) ao invés de Sheet lateral.
      </UsageNote>
    </ComponentDoc>
  );
}
