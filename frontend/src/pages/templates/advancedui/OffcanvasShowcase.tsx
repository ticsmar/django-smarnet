import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function OffcanvasShowcase() {
  return (
    <AdvancedUILayout title="Offcanvas" description="Painéis laterais deslizantes para menus, filtros e formulários.">
      <ShowcaseSection title="Direções">
        <div className="flex flex-wrap gap-3">
          {(['left', 'right', 'top', 'bottom'] as const).map(side => (
            <Sheet key={side}>
              <SheetTrigger asChild><Button variant="outline" className="capitalize">{side}</Button></SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Painel — {side}</SheetTitle>
                  <SheetDescription>Conteúdo lateral deslizante para a direção {side}.</SheetDescription>
                </SheetHeader>
                <div className="py-6 text-sm text-muted-foreground">
                  Este painel abre pela direção <strong>{side}</strong>.
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Filtros Avançados">
        <Sheet>
          <SheetTrigger asChild><Button>Abrir Filtros</Button></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros de Pesquisa</SheetTitle>
              <SheetDescription>Refine sua busca utilizando os filtros abaixo.</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-6">
              <div className="space-y-2"><Label>Cliente</Label><Input placeholder="Buscar cliente..." /></div>
              <div className="space-y-2"><Label>Período</Label><div className="grid grid-cols-2 gap-2"><Input type="date" /><Input type="date" /></div></div>
              <div className="space-y-2"><Label>Status</Label><Input placeholder="Todos" /></div>
              <Separator />
              <div className="space-y-2"><Label>Valor Mínimo</Label><Input type="number" placeholder="0,00" /></div>
              <div className="space-y-2"><Label>Valor Máximo</Label><Input type="number" placeholder="999.999,99" /></div>
            </div>
            <SheetFooter>
              <SheetClose asChild><Button variant="outline">Limpar</Button></SheetClose>
              <Button>Aplicar Filtros</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ShowcaseSection>

      <ShowcaseSection title="Detalhes Rápidos">
        <Sheet>
          <SheetTrigger asChild><Button variant="secondary">Ver Detalhes do Produto</Button></SheetTrigger>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Motor Elétrico 5CV</SheetTitle>
              <SheetDescription>PRD-2026-001</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-6">
              <div className="aspect-video rounded-lg bg-muted/30 flex items-center justify-center text-4xl">📦</div>
              {[
                ['Categoria', 'Motores Elétricos'],
                ['Estoque', '42 unidades'],
                ['Preço', 'R$ 2.450,00'],
                ['Fornecedor', 'WEG S.A.'],
                ['Última Entrada', '02/04/2026'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm border-b border-border/30 pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
