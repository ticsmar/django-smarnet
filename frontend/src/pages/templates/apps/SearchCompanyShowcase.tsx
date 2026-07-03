import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, MapPin, Users, Star, ExternalLink } from 'lucide-react';

const companies = [
  { name: 'TechCorp Brasil', sector: 'Tecnologia', location: 'São Paulo', employees: '500-1000', rating: 4.2, jobs: 12 },
  { name: 'DesignHub', sector: 'Design/UX', location: 'Remoto', employees: '50-200', rating: 4.5, jobs: 5 },
  { name: 'CloudFirst', sector: 'Cloud/DevOps', location: 'Curitiba', employees: '200-500', rating: 4.0, jobs: 8 },
  { name: 'DataInsights', sector: 'Data Science', location: 'Rio de Janeiro', employees: '100-300', rating: 3.8, jobs: 3 },
  { name: 'FinTech Solutions', sector: 'Financeiro', location: 'São Paulo', employees: '1000+', rating: 4.3, jobs: 15 },
  { name: 'AppFactory', sector: 'Mobile', location: 'Florianópolis', employees: '50-100', rating: 4.1, jobs: 6 },
];

export default function SearchCompanyShowcase() {
  return (
    <AppsLayout title="Search Company" description="Busca e exploração de empresas com vagas disponíveis." category="Jobs">
      <ShowcaseSection title="Buscar Empresas">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar empresa..." className="w-full pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <select className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground"><option>Setor</option></select>
            <select className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground"><option>Localização</option></select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/10 p-4 space-y-3 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">{c.name[0]}</div>
                  <ExternalLink size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{c.name}</h4>
                  <p className="text-xs text-muted-foreground">{c.sector}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={10} /> {c.location}</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {c.employees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={10} className={s <= Math.round(c.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{c.rating}</span>
                  </div>
                  <span className="text-xs text-primary font-medium">{c.jobs} vagas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
