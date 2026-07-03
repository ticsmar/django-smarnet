import { PagesLayout, PageSection } from './PagesLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = ['Geral', 'Faturamento', 'Suporte Técnico', 'Integrações'];

const faqs = [
  { q: 'Como faço para cadastrar um novo cliente?', a: 'Acesse o menu Comercial > Clientes e clique em "Novo cliente". Preencha os campos obrigatórios e salve.' },
  { q: 'Onde encontro meus boletos em aberto?', a: 'No menu Faturamento, filtre por status "Em aberto". Você pode imprimir ou enviar por e-mail diretamente da tabela.' },
  { q: 'Como integrar com meu ERP atual?', a: 'Disponibilizamos APIs REST e webhooks. Acesse Integrações > API para gerar tokens e ler nossa documentação.' },
  { q: 'Quais navegadores são suportados?', a: 'Suportamos Chrome, Edge, Firefox e Safari nas duas últimas versões estáveis.' },
  { q: 'Posso exportar meus dados?', a: 'Sim. Em qualquer tabela, use o botão "Exportar" para baixar em CSV, Excel ou PDF.' },
  { q: 'Como solicito treinamento para minha equipe?', a: 'Abra um chamado em Suporte > Treinamentos. Nossa equipe entra em contato em até 1 dia útil.' },
];

export default function FAQsShowcase() {
  return (
    <PagesLayout title="Perguntas Frequentes" description="Respostas para as dúvidas mais comuns sobre o sistema." category="Páginas">
      <PageSection>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <HelpCircle size={26} />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Como podemos ajudar?</h2>
          <p className="text-sm text-muted-foreground mt-2">Pesquise por palavras-chave ou navegue pelas categorias.</p>
          <div className="relative mt-5">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Pesquisar..." className="pl-10 h-11" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`px-4 h-8 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-muted-foreground hover:text-foreground'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-sm text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>
    </PagesLayout>
  );
}
