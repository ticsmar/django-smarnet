import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';
import { Filter, Settings, Bell } from 'lucide-react';

const popoverContentProps: PropDef[] = [
  { name: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: 'Lado de exibição.' },
  { name: 'sideOffset', type: 'number', default: '4', description: 'Distância em px do trigger.' },
  { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: 'Alinhamento no eixo perpendicular.' },
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais.' },
];

const popoverRootProps: PropDef[] = [
  { name: 'open', type: 'boolean', default: '—', description: 'Controle externo de abertura.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Callback de mudança de estado.' },
  { name: 'modal', type: 'boolean', default: 'false', description: 'Se true, bloqueia interação fora do popover.' },
];

export default function PopoverPage() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <ComponentDoc
      summary="Painel flutuante ancorado a um trigger, usado para formulários rápidos, filtros e configurações contextuais."
      importPath="import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'"
    >
      <DocSection title="Popover">
        <VariantSection
          title="Filtro Rápido"
          description="Formulário inline para filtros contextuais."
          preview={
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter size={14} className="mr-2" /> Filtrar
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-foreground">Filtro rápido</h4>
                  <div className="space-y-2">
                    <Label htmlFor="p-search" className="text-xs">Buscar</Label>
                    <Input id="p-search" placeholder="Termo..." className="h-8 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Status</Label>
                    <div className="space-y-1.5">
                      {['Ativo', 'Inativo', 'Pendente'].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <Checkbox id={`st-${s}`} />
                          <Label htmlFor={`st-${s}`} className="text-xs font-normal text-foreground">{s}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="w-full">Aplicar</Button>
                </div>
              </PopoverContent>
            </Popover>
          }
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm">
      <Filter size={14} className="mr-2" /> Filtrar
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-72">
    <div className="space-y-3">
      <h4 className="font-bold text-sm">Filtro rápido</h4>
      <Input placeholder="Buscar..." />
      <Button size="sm" className="w-full">Aplicar</Button>
    </div>
  </PopoverContent>
</Popover>`}
        />

        <VariantSection
          title="Configurações Rápidas"
          description="Popover com controles de ajuste."
          preview={
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings size={14} className="mr-2" /> Ajustes
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-foreground">Configurações</h4>
                  <div className="space-y-2">
                    <Label className="text-xs">Volume de notificações</Label>
                    <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                    <p className="text-[10px] text-muted-foreground text-right">{sliderValue[0]}%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-foreground">Sons</Label>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-foreground">Vibração</Label>
                    <Checkbox />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          }
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm">
      <Settings size={14} className="mr-2" /> Ajustes
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">
    <Slider value={[50]} max={100} />
    <Checkbox defaultChecked />
  </PopoverContent>
</Popover>`}
        />

        <VariantSection
          title="Posicionamento"
          description="Controle o lado e alinhamento do popover."
          preview={
            <div className="flex gap-3 flex-wrap">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <Popover key={side}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">{side}</Button>
                  </PopoverTrigger>
                  <PopoverContent side={side} className="w-48">
                    <p className="text-xs text-foreground">Popover ao <strong>{side}</strong> do trigger.</p>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          }
          code={`<PopoverContent side="top">...</PopoverContent>
<PopoverContent side="right">...</PopoverContent>`}
        />

        <VariantSection
          title="Notificações"
          description="Padrão de popover para painel de notificações."
          preview={
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative h-9 w-9">
                  <Bell size={15} />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">3</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-foreground">Notificações</h4>
                  {[
                    { title: 'Pedido #1234 aprovado', time: '2 min' },
                    { title: 'Novo ticket de suporte', time: '15 min' },
                    { title: 'Relatório mensal pronto', time: '1h' },
                  ].map((n) => (
                    <div key={n.title} className="flex justify-between items-start py-1.5 border-t border-border/30">
                      <p className="text-xs text-foreground">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{n.time}</span>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-xs">Ver todas</Button>
                </div>
              </PopoverContent>
            </Popover>
          }
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="icon" className="relative">
      <Bell size={15} />
      <span className="absolute -top-1 -right-1 ...">3</span>
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-72" align="end">
    <h4>Notificações</h4>
    ...
  </PopoverContent>
</Popover>`}
        />

        <PropsTable rows={popoverRootProps} title="Popover (Root) Props" />
        <PropsTable rows={popoverContentProps} title="PopoverContent Props" />

        <UsageNote type="info">
          Popover é focável e suporta navegação por teclado. Use <code className="font-mono text-[11px]">modal=true</code> para bloquear interação fora quando necessário.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
