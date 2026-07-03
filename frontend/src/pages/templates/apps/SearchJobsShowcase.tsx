import { useState } from 'react';
import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, MapPin, Clock, DollarSign, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allJobs = [
  { title: 'React Developer', company: 'TechCorp', location: 'São Paulo', type: 'CLT', salary: 'R$ 12-18k', level: 'Pleno', tags: ['React', 'TypeScript'] },
  { title: 'Python Engineer', company: 'DataCo', location: 'Remoto', type: 'PJ', salary: 'R$ 15-22k', level: 'Senior', tags: ['Python', 'Django'] },
  { title: 'DevOps Engineer', company: 'CloudFirst', location: 'Curitiba', type: 'CLT', salary: 'R$ 14-20k', level: 'Senior', tags: ['AWS', 'Docker', 'K8s'] },
  { title: 'UX Researcher', company: 'DesignHub', location: 'Remoto', type: 'CLT', salary: 'R$ 10-15k', level: 'Pleno', tags: ['UX', 'Research'] },
  { title: 'Mobile Developer', company: 'AppFactory', location: 'Florianópolis', type: 'PJ', salary: 'R$ 13-19k', level: 'Pleno', tags: ['React Native', 'iOS'] },
  { title: 'Tech Lead', company: 'StartupX', location: 'São Paulo', type: 'CLT', salary: 'R$ 20-30k', level: 'Senior', tags: ['Liderança', 'Arquitetura'] },
];

export default function SearchJobsShowcase() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <AppsLayout title="Search Jobs" description="Busca avançada de vagas com filtros laterais." category="Jobs">
      <div className="flex gap-6">
        {showFilters && (
          <div className="w-64 shrink-0 space-y-4">
            <ShowcaseSection title="Filtros">
              <div className="space-y-4">
                {[
                  { label: 'Nível', options: ['Junior', 'Pleno', 'Senior', 'Lead'] },
                  { label: 'Tipo', options: ['CLT', 'PJ', 'Freelancer'] },
                  { label: 'Modalidade', options: ['Presencial', 'Remoto', 'Híbrido'] },
                ].map(group => (
                  <div key={group.label} className="space-y-2">
                    <p className="text-xs font-semibold text-foreground">{group.label}</p>
                    {group.options.map(opt => (
                      <label key={opt} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="rounded border-border" /> {opt}
                      </label>
                    ))}
                  </div>
                ))}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Salário Mínimo</p>
                  <input type="range" min={5000} max={30000} className="w-full accent-primary" />
                  <p className="text-xs text-muted-foreground">R$ 5.000+</p>
                </div>
              </div>
            </ShowcaseSection>
          </div>
        )}
        <div className="flex-1">
          <ShowcaseSection title="Resultados">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{allJobs.length} vagas encontradas</p>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal size={12} className="mr-1" /> Filtros
                </Button>
              </div>
              <div className="space-y-3">
                {allJobs.map((j, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{j.title}</h4>
                        <p className="text-xs text-muted-foreground">{j.company}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">{j.level}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {j.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {j.type}</span>
                      <span className="flex items-center gap-1"><DollarSign size={10} /> {j.salary}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {j.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-muted/30 text-[10px] text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </AppsLayout>
  );
}
