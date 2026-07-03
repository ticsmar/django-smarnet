import { PagesLayout, PageSection } from './PagesLayout';
import { Search, MapPin, Briefcase, Building2, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

const featuredJobs = [
  { title: 'Engenheiro de Produção Sênior', company: 'Gerdau', location: 'Rio de Janeiro, RJ', type: 'CLT', salary: 'R$ 12.000 — 16.000' },
  { title: 'Analista de PCP', company: 'WEG Motores', location: 'Curitiba, PR', type: 'CLT', salary: 'R$ 7.000 — 9.500' },
  { title: 'Gerente Comercial Industrial', company: 'Petrobras', location: 'Sertãozinho, SP', type: 'CLT', salary: 'R$ 18.000 — 24.000' },
  { title: 'Técnico em Automação', company: 'Vale S.A.', location: 'Belo Horizonte, MG', type: 'CLT', salary: 'R$ 6.500 — 8.000' },
];

const categories = [
  { icon: Briefcase, name: 'Engenharia', count: 124 },
  { icon: Building2, name: 'Administração', count: 87 },
  { icon: TrendingUp, name: 'Comercial', count: 62 },
];

export default function JobsLandingShowcase() {
  return (
    <PagesLayout title="Portal de Vagas" description="Encontre sua próxima oportunidade na indústria." category="Páginas">
      <PageSection>
        <div className="text-center py-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Encontre vagas na <span className="text-primary">indústria brasileira</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            Mais de 1.200 vagas abertas em metalúrgicas, químicas e tecnologia industrial.
          </p>

          <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 max-w-3xl mx-auto mt-7">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cargo ou palavra-chave" className="pl-10 h-11" />
            </div>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cidade ou estado" className="pl-10 h-11" />
            </div>
            <button className="h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              Buscar vagas
            </button>
          </div>
        </div>
      </PageSection>

      <div className="grid sm:grid-cols-3 gap-4">
        {categories.map((c) => (
          <PageSection key={c.name}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><c.icon size={20} /></div>
              <div>
                <p className="font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count} vagas abertas</p>
              </div>
            </div>
          </PageSection>
        ))}
      </div>

      <PageSection title="Vagas em Destaque">
        <div className="space-y-3">
          {featuredJobs.map((j) => (
            <div key={j.title} className="bg-surface-container-low rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-low/70 transition-colors">
              <div>
                <p className="font-semibold text-foreground">{j.title}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Building2 size={11} /> {j.company}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {j.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={11} /> {j.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-status-success">{j.salary}</span>
                <button className="px-4 h-9 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90">Candidatar</button>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
