import { PagesLayout, PageSection } from './PagesLayout';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '299',
    desc: 'Para pequenas operações em crescimento.',
    features: { 'Até 5 usuários': true, 'Cadastros essenciais': true, 'Pedidos e faturamento': true, 'Relatórios básicos': true, 'Suporte por e-mail': true, 'API e integrações': false, 'Multi-empresa': false, 'Suporte 24/7': false },
    highlight: false,
  },
  {
    name: 'Professional',
    price: '799',
    desc: 'Indústrias de médio porte com filiais.',
    features: { 'Até 25 usuários': true, 'Cadastros essenciais': true, 'Pedidos e faturamento': true, 'Relatórios avançados': true, 'Suporte por chat': true, 'API e integrações': true, 'Multi-empresa': true, 'Suporte 24/7': false },
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '1.999',
    desc: 'Operações complexas e multi-planta.',
    features: { 'Usuários ilimitados': true, 'Cadastros essenciais': true, 'Pedidos e faturamento': true, 'BI personalizado': true, 'Gerente de conta': true, 'API e integrações': true, 'Multi-empresa': true, 'Suporte 24/7': true },
    highlight: false,
  },
];

export default function PricingShowcase() {
  return (
    <PagesLayout title="Planos e Preços" description="Escolha o plano ideal para a sua operação." category="Páginas">
      <PageSection>
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground">Preços transparentes</h2>
          <p className="text-sm text-muted-foreground mt-2">Sem surpresas. Cancele quando quiser.</p>
          <div className="inline-flex items-center gap-1 bg-surface-container-low rounded-lg p-1 mt-5">
            <button className="px-4 h-8 rounded-md bg-primary text-primary-foreground text-xs font-semibold">Mensal</button>
            <button className="px-4 h-8 rounded-md text-muted-foreground text-xs font-semibold hover:text-foreground">Anual <span className="text-status-success">-20%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-6 ${p.highlight ? 'bg-primary text-primary-foreground ring-2 ring-primary' : 'bg-surface-container-low'}`}
            >
              {p.highlight && (
                <span className="inline-block px-2 py-0.5 rounded-md bg-primary-foreground/20 text-[10px] font-bold uppercase mb-3">Mais popular</span>
              )}
              <p className={`font-display text-lg font-bold ${p.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{p.name}</p>
              <p className={`text-xs mt-1 ${p.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{p.desc}</p>
              <div className="mt-5 mb-5">
                <span className={`font-display text-4xl font-bold ${p.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>R$ {p.price}</span>
                <span className={`text-sm ${p.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>/mês</span>
              </div>
              <button className={`w-full h-10 rounded-lg text-sm font-semibold mb-5 ${p.highlight ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                Assinar plano
              </button>
              <ul className="space-y-2.5">
                {Object.entries(p.features).map(([k, v]) => (
                  <li key={k} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-primary-foreground' : 'text-foreground'} ${!v && 'opacity-40'}`}>
                    {v ? <Check size={14} /> : <X size={14} />}
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
