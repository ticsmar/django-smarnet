import {
  Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ComponentDoc, VariantSection, PropsTable, UsageNote } from '../_docs';
import { SlidersHorizontal, Plus, ShoppingCart } from 'lucide-react';

export default function DrawerPage() {
  return (
    <ComponentDoc
      summary="Bottom sheet deslizante (vaul) — componente mobile-first que sobe da base da tela. Suporta arrastar para fechar (swipe-down). Ideal para ações contextuais, filtros rápidos e formulários curtos em dispositivos móveis."
      importPath="import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'"
    >
      {/* Filtros */}
      <VariantSection
        title="Filtros Rápidos"
        description="Caso clássico mobile — abre filtros com swipe-down para fechar."
        preview={
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4" />Filtros</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filtros avançados</DrawerTitle>
                <DrawerDescription>Refine a listagem. Arraste para baixo para fechar.</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-4 px-4 pb-2">
                <div className="space-y-2">
                  <Label htmlFor="dr-status">Status</Label>
                  <Input id="dr-status" placeholder="Ativo, Pendente..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dr-category">Categoria</Label>
                  <Input id="dr-category" placeholder="Todos" />
                </div>
              </div>
              <DrawerFooter>
                <Button>Aplicar</Button>
                <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline"><SlidersHorizontal className="mr-2 h-4 w-4" />Filtros</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filtros avançados</DrawerTitle>
      <DrawerDescription>Refine a listagem.</DrawerDescription>
    </DrawerHeader>
    <div className="space-y-4 px-4 pb-2">
      {/* campos de filtro */}
    </div>
    <DrawerFooter>
      <Button>Aplicar</Button>
      <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      />

      {/* Ação rápida */}
      <VariantSection
        title="Ação Rápida (Criar item)"
        description="Drawer compacto para formulário de criação rápida."
        preview={
          <Drawer>
            <DrawerTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Novo item</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Criar item</DrawerTitle>
                <DrawerDescription>Adicione um novo item ao inventário.</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-4 px-4 pb-2">
                <div className="space-y-2">
                  <Label htmlFor="dr-item">Nome do item</Label>
                  <Input id="dr-item" placeholder="Ex: Parafuso M8" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="dr-qty">Quantidade</Label>
                    <Input id="dr-qty" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dr-price">Preço (R$)</Label>
                    <Input id="dr-price" type="number" placeholder="0,00" />
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button>Salvar</Button>
                <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button><Plus className="mr-2 h-4 w-4" />Novo item</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Criar item</DrawerTitle>
      <DrawerDescription>Adicione um novo item ao inventário.</DrawerDescription>
    </DrawerHeader>
    <div className="space-y-4 px-4 pb-2">
      {/* campos */}
    </div>
    <DrawerFooter>
      <Button>Salvar</Button>
      <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      />

      {/* Resumo / carrinho */}
      <VariantSection
        title="Resumo de Ação (Carrinho)"
        description="Drawer com conteúdo de resumo e CTA primário — padrão comum em e-commerce e ERP."
        preview={
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary"><ShoppingCart className="mr-2 h-4 w-4" />Ver carrinho (3)</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Resumo do pedido</DrawerTitle>
                <DrawerDescription>3 itens selecionados</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-2 space-y-3">
                {[
                  { name: 'Parafuso M8 x100', price: 'R$ 45,00' },
                  { name: 'Arruela lisa 3/8"', price: 'R$ 12,50' },
                  { name: 'Porca sextavada M8', price: 'R$ 28,00' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="font-medium text-foreground">{item.price}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between items-center font-semibold text-foreground">
                  <span>Total</span>
                  <span>R$ 85,50</span>
                </div>
              </div>
              <DrawerFooter>
                <Button>Finalizar pedido</Button>
                <DrawerClose asChild><Button variant="ghost">Continuar comprando</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        }
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="secondary"><ShoppingCart className="mr-2 h-4 w-4" />Ver carrinho (3)</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Resumo do pedido</DrawerTitle>
      <DrawerDescription>3 itens selecionados</DrawerDescription>
    </DrawerHeader>
    <div className="px-4 pb-2 space-y-3">
      {/* lista de itens */}
      <div className="border-t border-border pt-3 flex justify-between font-semibold">
        <span>Total</span><span>R$ 85,50</span>
      </div>
    </div>
    <DrawerFooter>
      <Button>Finalizar pedido</Button>
      <DrawerClose asChild><Button variant="ghost">Continuar comprando</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      />

      <PropsTable
        title="Componentes & Props"
        rows={[
          { name: 'Drawer', type: 'Root', description: 'Container raiz — gerencia estado e comportamento de arraste.' },
          { name: 'open', type: 'boolean', description: 'Controle externo do estado.', default: '—' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback quando o estado muda.' },
          { name: 'shouldScaleBackground', type: 'boolean', description: 'Se true, reduz a escala do conteúdo atrás do drawer.', default: 'true' },
          { name: 'DrawerTrigger', type: 'Component', description: 'Elemento que abre o drawer. Use asChild.' },
          { name: 'DrawerContent', type: 'Component', description: 'Painel bottom-sheet com barra de arraste, overlay e animação.' },
          { name: 'DrawerHeader', type: 'div', description: 'Wrapper para título + descrição.' },
          { name: 'DrawerTitle', type: 'Component', description: 'Título — obrigatório para acessibilidade.' },
          { name: 'DrawerDescription', type: 'Component', description: 'Descrição opcional.' },
          { name: 'DrawerFooter', type: 'div', description: 'Container de ações — empilha verticalmente.' },
          { name: 'DrawerClose', type: 'Component', description: 'Elemento que fecha o drawer. Use asChild.' },
        ]}
      />

      <UsageNote type="tip">
        O <strong>Drawer</strong> é ideal para interações mobile-first. Em desktop, considere usar 
        <code>Dialog</code> ou <code>Sheet</code> para melhor aproveitamento do espaço.
      </UsageNote>

      <UsageNote type="warning">
        O Drawer usa a biblioteca <code>vaul</code> e aplica <code>shouldScaleBackground</code> por padrão.
        Se seu layout tiver posição fixed, teste o comportamento de escala para evitar deslocamentos visuais.
      </UsageNote>
    </ComponentDoc>
  );
}
