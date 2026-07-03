import { PagesLayout, PageSection } from './PagesLayout';
import { Target, Eye, Award, Users, Building2, Globe } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Anos de mercado' },
  { value: '500+', label: 'Clientes ativos' },
  { value: '120', label: 'Colaboradores' },
  { value: '12', label: 'Estados atendidos' },
];

const values = [
  { icon: Target, title: 'Missão', text: 'Industrializar o Brasil com tecnologia confiável e processos sustentáveis.' },
  { icon: Eye, title: 'Visão', text: 'Ser referência em automação industrial na América Latina até 2030.' },
  { icon: Award, title: 'Valores', text: 'Excelência operacional, ética, inovação contínua e respeito às pessoas.' },
];

const team = [
  { name: 'Carlos Eduardo Mendes', role: 'CEO', initials: 'CM' },
  { name: 'Ana Paula Ribeiro', role: 'CTO', initials: 'AR' },
  { name: 'Roberto Silva', role: 'COO', initials: 'RS' },
  { name: 'Marina Costa', role: 'CFO', initials: 'MC' },
];

export default function AboutUsShowcase() {
  return (
    <PagesLayout title="Sobre Nós" description="Conheça nossa história, missão e valores." category="Páginas">
      <PageSection>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Nossa história</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-3 mb-4">
              Construindo o futuro da indústria brasileira
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desde 2009, a SmarNet entrega soluções de automação industrial e ERP para fábricas, metalúrgicas e
              indústrias químicas em todo o país. Nossa plataforma conecta operação, controle financeiro e cadeia
              de suprimentos em um único ecossistema confiável.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Investimos em pesquisa contínua e parcerias com universidades para garantir que nossos clientes
              estejam sempre na vanguarda tecnológica.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface-container-low rounded-xl p-5 text-center">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <div className="grid md:grid-cols-3 gap-4">
        {values.map((v) => (
          <PageSection key={v.title}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <v.icon size={18} />
            </div>
            <h3 className="font-display font-bold text-foreground mb-1">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.text}</p>
          </PageSection>
        ))}
      </div>

      <PageSection title="Liderança">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((t) => (
            <div key={t.name} className="bg-surface-container-low rounded-xl p-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">
                {t.initials}
              </div>
              <p className="font-semibold text-foreground mt-3">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <div className="grid md:grid-cols-3 gap-4">
        <PageSection>
          <Users className="text-primary mb-2" size={20} />
          <p className="font-semibold text-foreground">Pessoas em primeiro lugar</p>
          <p className="text-sm text-muted-foreground mt-1">Equipe diversa, qualificada e comprometida.</p>
        </PageSection>
        <PageSection>
          <Building2 className="text-primary mb-2" size={20} />
          <p className="font-semibold text-foreground">Estrutura nacional</p>
          <p className="text-sm text-muted-foreground mt-1">3 escritórios, suporte 24/7 em todo o Brasil.</p>
        </PageSection>
        <PageSection>
          <Globe className="text-primary mb-2" size={20} />
          <p className="font-semibold text-foreground">Compromisso ESG</p>
          <p className="text-sm text-muted-foreground mt-1">Sustentabilidade integrada ao nosso negócio.</p>
        </PageSection>
      </div>
    </PagesLayout>
  );
}
