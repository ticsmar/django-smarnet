import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

const hoverCardContentProps: PropDef[] = [
  { name: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: 'Lado de exibição.' },
  { name: 'sideOffset', type: 'number', default: '4', description: 'Distância em px do trigger.' },
  { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: 'Alinhamento no eixo perpendicular.' },
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais.' },
];

const hoverCardRootProps: PropDef[] = [
  { name: 'openDelay', type: 'number', default: '700', description: 'Delay em ms para abrir ao hover.' },
  { name: 'closeDelay', type: 'number', default: '300', description: 'Delay em ms para fechar ao sair.' },
  { name: 'open', type: 'boolean', default: '—', description: 'Controle externo de abertura.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Callback de mudança de estado.' },
];

export default function HoverCardPage() {
  return (
    <ComponentDoc
      summary="Card flutuante de preview rico exibido ao passar o mouse sobre um trigger, ideal para pré-visualização de perfis, links e entidades."
      importPath="import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'"
    >
      <DocSection title="HoverCard">
        <VariantSection
          title="Perfil de Usuário"
          description="Preview de perfil com avatar e informações resumidas."
          preview={
            <HoverCard>
              <HoverCardTrigger className="text-primary underline cursor-pointer font-medium">
                @maria.silva
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://i.pravatar.cc/100?img=5" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-semibold text-foreground">Maria Silva</h4>
                    <p className="text-xs text-muted-foreground">Gerente de Operações · Matriz SP</p>
                    <div className="flex items-center gap-2 pt-1">
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Desde Jan 2020</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          }
          code={`<HoverCard>
  <HoverCardTrigger className="text-primary underline cursor-pointer">
    @maria.silva
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-3">
      <Avatar><AvatarImage src="..." /><AvatarFallback>MS</AvatarFallback></Avatar>
      <div>
        <h4 className="text-sm font-semibold">Maria Silva</h4>
        <p className="text-xs text-muted-foreground">Gerente de Operações</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        />

        <VariantSection
          title="Preview de Empresa"
          description="Card com dados de empresa e badges de status."
          preview={
            <HoverCard>
              <HoverCardTrigger className="text-primary underline cursor-pointer font-medium">
                Nova Smar S/A
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Nova Smar S/A</h4>
                      <p className="text-xs text-muted-foreground">CNPJ: 12.345.678/0001-90</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">Ativo</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> São Paulo, SP</span>
                    <span className="flex items-center gap-1"><CalendarDays size={12} /> Cliente desde 2018</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { label: 'Pedidos', value: '142' },
                      { label: 'Faturamento', value: 'R$ 2.4M' },
                      { label: 'Tickets', value: '3' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-sm font-bold text-foreground">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          }
          code={`<HoverCard>
  <HoverCardTrigger className="text-primary underline cursor-pointer">
    Nova Smar S/A
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Nova Smar S/A</h4>
      <Badge variant="outline">Ativo</Badge>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-sm font-bold">142</p>
          <p className="text-[10px] text-muted-foreground">Pedidos</p>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        />

        <VariantSection
          title="Posicionamento"
          description="Controle o lado de exibição com side."
          preview={
            <div className="flex gap-6 flex-wrap">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <HoverCard key={side}>
                  <HoverCardTrigger className="text-primary underline cursor-pointer text-sm">
                    Hover ({side})
                  </HoverCardTrigger>
                  <HoverCardContent side={side} className="w-48">
                    <p className="text-xs text-foreground">Conteúdo exibido ao <strong>{side}</strong>.</p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          }
          code={`<HoverCardContent side="top">...</HoverCardContent>
<HoverCardContent side="right">...</HoverCardContent>`}
        />

        <PropsTable rows={hoverCardRootProps} title="HoverCard (Root) Props" />
        <PropsTable rows={hoverCardContentProps} title="HoverCardContent Props" />

        <UsageNote type="tip">
          Use HoverCard para enriquecer links e referências a entidades sem poluir a interface. Evite conteúdo interativo complexo — para isso, prefira <code className="font-mono text-[11px]">Popover</code>.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
