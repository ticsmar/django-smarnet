import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Filter, Settings2 } from 'lucide-react';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

const collapsibleProps: PropDef[] = [
  { name: 'open', type: 'boolean', description: 'Estado controlado (aberto/fechado).' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Estado inicial em modo não controlado.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback quando o estado muda.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o trigger.' },
];

export default function CollapsiblePage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  return (
    <ComponentDoc
      summary="Toggle simples para mostrar/esconder um único bloco de conteúdo. Ideal para áreas opcionais em formulários, filtros avançados, detalhes complementares e linhas expansíveis em tabelas."
      importPath="import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'"
    >
      <DocSection title="Collapsible">
        <VariantSection
          title="Padrão (não controlado)"
          description="Trigger personalizado com chevron animado e conteúdo abaixo."
          preview={
            <Collapsible className="w-full max-w-md">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between group">
                  Mostrar detalhes adicionais
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 rounded-xl bg-surface-container border border-border/30 p-4 text-sm text-muted-foreground">
                Conteúdo escondido revelado ao clicar. Útil para áreas opcionais em formulários, filtros avançados ou metadados secundários.
              </CollapsibleContent>
            </Collapsible>
          }
          code={`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" className="w-full justify-between group">
      Mostrar detalhes
      <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>...</CollapsibleContent>
</Collapsible>`}
        />

        <VariantSection
          title="Modo controlado"
          description="Use open + onOpenChange para sincronizar o estado externamente."
          preview={
            <div className="w-full max-w-md space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  Estado: <span className="font-mono text-foreground">{open1 ? 'aberto' : 'fechado'}</span>
                </span>
                <Button size="sm" variant="ghost" onClick={() => setOpen1(v => !v)}>
                  Alternar externamente
                </Button>
              </div>
              <Collapsible open={open1} onOpenChange={setOpen1}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between group">
                    <span className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filtros avançados</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 rounded-xl bg-surface-container border border-border/30 p-4 space-y-2">
                  <div className="text-xs text-muted-foreground">Período</div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="text-xs text-muted-foreground">Responsável</div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          }
          code={`const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>...</CollapsibleTrigger>
  <CollapsibleContent>...</CollapsibleContent>
</Collapsible>`}
        />

        <VariantSection
          title="Lista expansível (estilo GitHub)"
          description="Padrão comum para revelar itens secundários numa lista pré-existente."
          preview={
            <div className="w-full max-w-md rounded-xl border border-border/40 bg-surface-container">
              <div className="px-4 py-3 border-b border-border/30">
                <p className="text-sm font-semibold text-foreground">Configurações da conta</p>
                <p className="text-xs text-muted-foreground">3 itens visíveis · 2 ocultos</p>
              </div>
              <div className="p-2 space-y-1">
                <div className="px-3 py-2 rounded-lg hover:bg-muted/50 text-sm">Perfil pessoal</div>
                <div className="px-3 py-2 rounded-lg hover:bg-muted/50 text-sm">Notificações</div>
                <div className="px-3 py-2 rounded-lg hover:bg-muted/50 text-sm">Idioma e região</div>
                <Collapsible open={open2} onOpenChange={setOpen2}>
                  <CollapsibleContent className="space-y-1">
                    <div className="px-3 py-2 rounded-lg hover:bg-muted/50 text-sm flex items-center gap-2">
                      <Settings2 className="h-3.5 w-3.5 text-muted-foreground" /> Privacidade
                    </div>
                    <div className="px-3 py-2 rounded-lg hover:bg-muted/50 text-sm flex items-center gap-2">
                      <Settings2 className="h-3.5 w-3.5 text-muted-foreground" /> API & Webhooks
                    </div>
                  </CollapsibleContent>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-muted-foreground">
                      <Plus className="h-3.5 w-3.5" />
                      {open2 ? 'Mostrar menos' : 'Mostrar mais 2 itens'}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </div>
          }
          code={`<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleContent>
    {/* itens ocultos */}
  </CollapsibleContent>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm">
      {open ? 'Mostrar menos' : 'Mostrar mais 2 itens'}
    </Button>
  </CollapsibleTrigger>
</Collapsible>`}
        />

        <PropsTable rows={collapsibleProps} title="Collapsible (Root)" />

        <UsageNote type="tip">
          Use <code className="font-mono text-[11px]">data-[state=open]</code> nos elementos do trigger para animar ícones (rotação do chevron, troca de cor) sem JavaScript adicional.
        </UsageNote>

        <UsageNote type="info">
          <strong>Quando usar Collapsible vs Accordion?</strong><br />
          <strong>Collapsible</strong> = um único bloco isolado (ex.: "ver mais detalhes").<br />
          <strong>Accordion</strong> = múltiplas seções relacionadas (ex.: FAQ, configurações agrupadas).
        </UsageNote>

        <UsageNote type="warning">
          Em modo controlado, lembre-se de gerenciar o estado em um nível de componente que sobreviva às re-renderizações — caso contrário o estado será perdido inesperadamente.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
