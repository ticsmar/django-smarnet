import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';
import { Info, Settings, Trash2, Edit, HelpCircle } from 'lucide-react';

const tooltipContentProps: PropDef[] = [
  { name: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: 'Lado de exibição em relação ao trigger.' },
  { name: 'sideOffset', type: 'number', default: '4', description: 'Distância em px do trigger.' },
  { name: 'align', type: '"start" | "center" | "end"', default: '"center"', description: 'Alinhamento no eixo perpendicular.' },
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais.' },
];

const providerProps: PropDef[] = [
  { name: 'delayDuration', type: 'number', default: '700', description: 'Delay em ms antes de abrir.' },
  { name: 'skipDelayDuration', type: 'number', default: '300', description: 'Delay ao mover entre triggers.' },
];

export default function TooltipPage() {
  return (
    <ComponentDoc
      summary="Dica flutuante exibida ao hover ou foco, ideal para rótulos de ícones e informações complementares."
      importPath="import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'"
    >
      <DocSection title="Tooltip">
        <VariantSection
          title="Posições"
          description="Quatro posições em relação ao trigger."
          preview={
            <TooltipProvider>
              <div className="flex gap-3 flex-wrap">
                {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                  <Tooltip key={side}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">{side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>
                      <p>Tooltip {side}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          }
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Tooltip top</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        />

        <VariantSection
          title="Em Ícones de Ação"
          description="Padrão comum para toolbar de ações."
          preview={
            <TooltipProvider>
              <div className="flex gap-2">
                {[
                  { icon: Edit, label: 'Editar' },
                  { icon: Trash2, label: 'Excluir' },
                  { icon: Settings, label: 'Configurações' },
                  { icon: HelpCircle, label: 'Ajuda' },
                ].map((item) => (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <item.icon size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{item.label}</p></TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          }
          code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon"><Edit size={15} /></Button>
  </TooltipTrigger>
  <TooltipContent>Editar</TooltipContent>
</Tooltip>`}
        />

        <VariantSection
          title="Conteúdo Rico"
          description="Tooltip com título e descrição para contexto mais detalhado."
          preview={
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center gap-1 text-sm text-primary cursor-help">
                    <Info size={14} /> O que é CNPJ?
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="font-semibold text-xs">Cadastro Nacional de Pessoa Jurídica</p>
                  <p className="text-xs mt-1 opacity-80">Identificação fiscal de 14 dígitos para empresas no Brasil.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
          code={`<Tooltip>
  <TooltipTrigger asChild>
    <span className="inline-flex items-center gap-1 text-sm text-primary cursor-help">
      <Info size={14} /> O que é CNPJ?
    </span>
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <p className="font-semibold text-xs">Cadastro Nacional de Pessoa Jurídica</p>
    <p className="text-xs mt-1 opacity-80">Identificação fiscal de 14 dígitos.</p>
  </TooltipContent>
</Tooltip>`}
        />

        <VariantSection
          title="Texto Truncado"
          description="Tooltip para revelar texto cortado por overflow."
          preview={
            <TooltipProvider>
              <div className="max-w-[200px]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm truncate cursor-default text-foreground">
                      Este é um texto muito longo que será cortado e precisa do tooltip
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>Este é um texto muito longo que será cortado e precisa do tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          }
          code={`<Tooltip>
  <TooltipTrigger asChild>
    <p className="truncate">Texto longo...</p>
  </TooltipTrigger>
  <TooltipContent className="max-w-sm">
    <p>Texto completo aqui</p>
  </TooltipContent>
</Tooltip>`}
        />

        <PropsTable rows={tooltipContentProps} title="TooltipContent Props" />
        <PropsTable rows={providerProps} title="TooltipProvider Props" />

        <UsageNote type="info">
          Envolva a árvore de componentes com <code className="font-mono text-[11px]">{"<TooltipProvider>"}</code> uma única vez (geralmente no layout raiz) para compartilhar configuração de delay.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
