import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AccordionsShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdvancedUILayout title="Accordions & Collapse" description="Componentes de conteúdo colapsável e acordeões interativos.">
      <ShowcaseSection title="Accordion Padrão">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>O que é o SmarNET ERP?</AccordionTrigger>
            <AccordionContent>
              SmarNET é um sistema ERP industrial completo para gestão de clientes, pedidos, faturamento e estoque.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Quais módulos estão disponíveis?</AccordionTrigger>
            <AccordionContent>
              Clientes, Produtos, Pedidos, Faturamento, Estoque, Funcionários, Fornecedores e Usuários.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Como faço para solicitar acesso?</AccordionTrigger>
            <AccordionContent>
              Acesse a página de solicitação de acesso e preencha o formulário com seus dados corporativos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion Múltiplo">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Faturamento</AccordionTrigger>
            <AccordionContent>Gerencie notas fiscais, boletos e relatórios financeiros.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Estoque</AccordionTrigger>
            <AccordionContent>Controle de entradas, saídas e inventário em tempo real.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Logística</AccordionTrigger>
            <AccordionContent>Rastreamento de entregas e gestão de transportadoras.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>

      <ShowcaseSection title="Collapsible">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
            <h4 className="text-sm font-semibold">Detalhes Avançados</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border border-border/40 bg-muted/20 px-4 py-3 text-sm">
              Código do produto: <span className="font-mono text-primary">PRD-2026-001</span>
            </div>
            <div className="rounded-md border border-border/40 bg-muted/20 px-4 py-3 text-sm">
              Lote: <span className="font-mono text-primary">LT-0042</span>
            </div>
            <div className="rounded-md border border-border/40 bg-muted/20 px-4 py-3 text-sm">
              Validade: <span className="font-mono text-primary">2027-12-31</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion com Ícones e Status">
        <Accordion type="single" collapsible className="w-full">
          {[
            { id: '1', title: 'Pedido #15230 — Aprovado', status: 'bg-emerald-500', desc: 'Pedido aprovado pelo financeiro em 05/04/2026.' },
            { id: '2', title: 'Pedido #15231 — Pendente', status: 'bg-amber-500', desc: 'Aguardando aprovação do gerente comercial.' },
            { id: '3', title: 'Pedido #15232 — Cancelado', status: 'bg-destructive', desc: 'Cancelado pelo cliente em 03/04/2026.' },
          ].map(item => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.status}`} />
                  <span>{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.desc}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
