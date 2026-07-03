import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';
import { CheckCircle2, AlertTriangle, XCircle, FileText, Settings, Shield } from 'lucide-react';

const accordionProps: PropDef[] = [
  { name: 'type', type: '"single" | "multiple"', required: true, description: 'Permite uma ou múltiplas seções abertas simultaneamente.' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: 'Em modo "single", permite fechar a seção ativa clicando novamente.' },
  { name: 'defaultValue', type: 'string | string[]', description: 'Valor(es) abertos por padrão (não controlado).' },
  { name: 'value', type: 'string | string[]', description: 'Valor(es) abertos (modo controlado).' },
  { name: 'onValueChange', type: '(value) => void', description: 'Callback quando o estado muda.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita todo o accordion.' },
];

const accordionItemProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Identificador único do item.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita um item específico.' },
];

export default function AccordionPage() {
  return (
    <ComponentDoc
      summary="Componente de conteúdo expansível para FAQs, listas longas e seções progressivas. Suporta abertura única ou múltipla, controle externo, ícones e estados desabilitados — totalmente acessível por teclado."
      importPath="import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'"
    >
      <DocSection title="Accordion">
        <VariantSection
          title="Padrão (single + collapsible)"
          description="Apenas uma seção aberta por vez. Use collapsible para permitir fechar todas."
          preview={
            <Accordion type="single" collapsible className="w-full max-w-xl bg-surface-container rounded-xl border-2 border-border/80 px-4 [&>div:last-child]:border-b-0 [&>div]:border-border/70">
              <AccordionItem value="i1">
                <AccordionTrigger>Como faturar um pedido?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Acesse Pedidos → selecione o pedido → clique em Faturar. A NFe será gerada automaticamente conforme as configurações fiscais.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="i2">
                <AccordionTrigger>Posso editar um cliente após cadastro?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim. Acesse Clientes → menu de ações (⋯) → Editar. Algumas alterações exigem aprovação do gerente.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="i3">
                <AccordionTrigger>Como integrar com o ERP fiscal?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Configure as credenciais em Configurações → Integrações → Fiscal. Suportamos os principais provedores nacionais.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          }
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="i1">
    <AccordionTrigger>Como faturar um pedido?</AccordionTrigger>
    <AccordionContent>Acesse Pedidos → Faturar...</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />

        <VariantSection
          title="Múltiplo (várias seções abertas)"
          description="type='multiple' permite que o usuário expanda quantas seções quiser ao mesmo tempo."
          preview={
            <Accordion type="multiple" defaultValue={['m1']} className="w-full max-w-xl bg-surface-container rounded-xl border-2 border-border/80 px-4 [&>div:last-child]:border-b-0 [&>div]:border-border/70">
              <AccordionItem value="m1">
                <AccordionTrigger>Faturamento</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Gerencie notas fiscais, boletos e relatórios financeiros consolidados.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="m2">
                <AccordionTrigger>Estoque</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Controle de entradas, saídas e inventário em tempo real com rastreabilidade por lote.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="m3">
                <AccordionTrigger>Logística</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Rastreamento de entregas, gestão de transportadoras e roteirização.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          }
          code={`<Accordion type="multiple" defaultValue={['m1']}>
  <AccordionItem value="m1">
    <AccordionTrigger>Faturamento</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />

        <VariantSection
          title="Com ícones e indicadores de status"
          description="Combine ícones, cores semânticas (success/warning/destructive) e descrições no trigger."
          preview={
            <Accordion type="single" collapsible className="w-full max-w-xl bg-surface-container rounded-xl border-2 border-border/80 px-4 [&>div:last-child]:border-b-0 [&>div]:border-border/70">
              {[
                { id: 's1', icon: CheckCircle2, dot: 'bg-success', color: 'text-success', title: 'Pedido #15230 — Aprovado', desc: 'Aprovado pelo financeiro em 05/04/2026 às 14:32.' },
                { id: 's2', icon: AlertTriangle, dot: 'bg-warning', color: 'text-warning', title: 'Pedido #15231 — Pendente', desc: 'Aguardando aprovação do gerente comercial. SLA: 2h restantes.' },
                { id: 's3', icon: XCircle, dot: 'bg-destructive', color: 'text-destructive', title: 'Pedido #15232 — Cancelado', desc: 'Cancelado pelo cliente em 03/04/2026. Motivo: divergência de prazo.' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                        <Icon className={`h-4 w-4 ${item.color}`} />
                        <span>{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.desc}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          }
          code={`<AccordionTrigger className="hover:no-underline">
  <div className="flex items-center gap-3">
    <span className="h-2 w-2 rounded-full bg-success" />
    <CheckCircle2 className="h-4 w-4 text-success" />
    <span>Pedido #15230 — Aprovado</span>
  </div>
</AccordionTrigger>`}
        />

        <VariantSection
          title="Com item desabilitado"
          description="Itens com disabled ficam inertes (não respondem a clique nem teclado) e visualmente esmaecidos."
          preview={
            <Accordion type="single" collapsible className="w-full max-w-xl bg-surface-container rounded-xl border-2 border-border/80 px-4 [&>div:last-child]:border-b-0 [&>div]:border-border/70">
              <AccordionItem value="d1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Documentação geral
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Acesse manuais, tutoriais e a base de conhecimento.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Configurações
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Personalize preferências do sistema.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d3" disabled>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Segurança avançada (em breve)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Disponível na próxima release.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          }
          code={`<AccordionItem value="d3" disabled>
  <AccordionTrigger>Segurança avançada (em breve)</AccordionTrigger>
  <AccordionContent>...</AccordionContent>
</AccordionItem>`}
        />

        <PropsTable rows={accordionProps} title="Accordion (Root)" />
        <PropsTable rows={accordionItemProps} title="AccordionItem" />

        <UsageNote type="tip">
          Para FAQs, prefira <code className="font-mono text-[11px]">type="single" collapsible</code> — mantém o foco do usuário em uma resposta por vez.
        </UsageNote>

        <UsageNote type="info">
          Navegação por teclado: <code className="font-mono text-[11px]">↑</code>/<code className="font-mono text-[11px]">↓</code> percorrem itens, <code className="font-mono text-[11px]">Enter</code>/<code className="font-mono text-[11px]">Espaço</code> abrem/fecham. O ícone do trigger gira 180° automaticamente no estado aberto.
        </UsageNote>

        <UsageNote type="warning">
          Evite aninhar accordions em mais de 2 níveis — comprometa a clareza visual e a usabilidade. Considere navegação alternativa (tabs ou nova página) quando o conteúdo for extenso.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
