import { PagesLayout, PageSection } from './PagesLayout';
import { Zap, Shield, BarChart3, Users, Check, ArrowRight } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Performance', text: 'Processamento em tempo real para grandes volumes.' },
  { icon: Shield, title: 'Segurança', text: 'Criptografia ponta-a-ponta e conformidade LGPD.' },
  { icon: BarChart3, title: 'Analytics', text: 'Dashboards interativos e relatórios automatizados.' },
  { icon: Users, title: 'Multi-usuário', text: 'Permissões granulares por departamento e função.' },
];

export default function LandingShowcase() {
  return (
    <PagesLayout title="Landing Page" description="Página de captura para campanhas e produtos." category="Páginas">
      <PageSection>
        <div className="text-center py-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Novo · Versão 4.0
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
            Transforme sua operação industrial em <span className="text-primary">dados acionáveis</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5">
            ERP completo para indústria 4.0 — produção, estoque, comercial e financeiro em um único ecossistema.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-7">
            <button className="px-6 h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
              Começar agora <ArrowRight size={15} />
            </button>
            <button className="px-6 h-11 rounded-lg border border-border text-sm font-semibold hover:bg-surface-container-low">
              Ver demonstração
            </button>
          </div>
        </div>
      </PageSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <PageSection key={f.title}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <f.icon size={18} />
            </div>
            <p className="font-semibold text-foreground">{f.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{f.text}</p>
          </PageSection>
        ))}
      </div>

      <PageSection>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Por que escolher a SmarNet?</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Mais de 500 indústrias já confiam na nossa plataforma para gerenciar suas operações críticas.
            </p>
            <ul className="space-y-3">
              {['Implantação em 30 dias', 'Suporte 24/7 em português', 'Atualizações gratuitas', 'Backup automático em cloud', 'Integração nativa com bancos'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-2xl p-8 text-center">
            <p className="font-display text-5xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground mt-2">indústrias confiam na SmarNet</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-surface-container-low rounded-xl p-4">
                <p className="font-display text-2xl font-bold text-foreground">99.9%</p>
                <p className="text-[11px] text-muted-foreground">uptime</p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-4">
                <p className="font-display text-2xl font-bold text-foreground">24/7</p>
                <p className="text-[11px] text-muted-foreground">suporte</p>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
