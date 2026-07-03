import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, MapPin, Star, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const candidates = [
  { name: 'Carlos Mendes', role: 'Full Stack Developer', location: 'São Paulo', exp: '8 anos', rating: 4.8, skills: ['React', 'Node.js', 'PostgreSQL'], available: true },
  { name: 'Ana Silva', role: 'UX Designer', location: 'Remoto', exp: '5 anos', rating: 4.5, skills: ['Figma', 'Research', 'Prototyping'], available: true },
  { name: 'Lucas Rocha', role: 'DevOps Engineer', location: 'Curitiba', exp: '6 anos', rating: 4.3, skills: ['AWS', 'Docker', 'Terraform'], available: false },
  { name: 'Maria Lima', role: 'Data Scientist', location: 'Rio de Janeiro', exp: '4 anos', rating: 4.6, skills: ['Python', 'ML', 'SQL'], available: true },
  { name: 'Pedro Kuhn', role: 'Mobile Developer', location: 'Florianópolis', exp: '7 anos', rating: 4.4, skills: ['React Native', 'Swift', 'Kotlin'], available: true },
  { name: 'Juliana Costa', role: 'Product Manager', location: 'São Paulo', exp: '9 anos', rating: 4.7, skills: ['Scrum', 'Analytics', 'Strategy'], available: false },
];

export default function SearchCandidateShowcase() {
  return (
    <AppsLayout title="Search Candidate" description="Busca e avaliação de candidatos com perfis detalhados." category="Jobs">
      <ShowcaseSection title="Buscar Candidatos">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar candidato..." className="w-full pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <select className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground"><option>Área</option></select>
            <select className="px-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground"><option>Experiência</option></select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/10 p-4 space-y-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">{c.name}</h4>
                      <span className={`w-2 h-2 rounded-full ${c.available ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                    </div>
                    <p className="text-xs text-muted-foreground">{c.role} • {c.exp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin size={10} /> {c.location}
                  <span className="ml-auto flex items-center gap-1">
                    <Star size={10} className="fill-amber-400 text-amber-400" /> {c.rating}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-muted/30 text-[10px] text-muted-foreground">{s}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs"><Mail size={12} className="mr-1" /> Contatar</Button>
                  <Button size="sm" variant="outline" className="text-xs"><ExternalLink size={12} /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
