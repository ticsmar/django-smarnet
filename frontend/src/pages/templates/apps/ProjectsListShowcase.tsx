import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, Plus, MoreVertical, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const projects = [
  { name: 'ERP SmarNet v3', status: 'Em andamento', progress: 68, team: 5, tasks: '24/35', due: '15 Mai 2026', color: 'bg-primary' },
  { name: 'App Mobile', status: 'Em andamento', progress: 42, team: 3, tasks: '12/28', due: '30 Jun 2026', color: 'bg-secondary' },
  { name: 'Dashboard Analytics', status: 'Concluído', progress: 100, team: 4, tasks: '18/18', due: '01 Mar 2026', color: 'bg-green-500' },
  { name: 'API Gateway', status: 'Pausado', progress: 25, team: 2, tasks: '5/20', due: '20 Jul 2026', color: 'bg-amber-500' },
  { name: 'Design System v2', status: 'Em andamento', progress: 85, team: 3, tasks: '30/35', due: '10 Abr 2026', color: 'bg-primary' },
  { name: 'Migração Cloud', status: 'Planejado', progress: 0, team: 6, tasks: '0/42', due: '01 Ago 2026', color: 'bg-muted-foreground' },
];

export default function ProjectsListShowcase() {
  return (
    <AppsLayout title="Projects List" description="Lista de projetos com progresso, equipe e status." category="Projects">
      <ShowcaseSection title="Todos os Projetos">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar projetos..." className="pl-8 pr-3 py-1.5 rounded-lg bg-muted/30 border border-border text-xs text-foreground w-60 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <Button size="sm"><Plus size={14} className="mr-1" /> Novo Projeto</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/10 p-4 space-y-3 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${p.color}`} />
                    <h4 className="text-sm font-semibold text-foreground">{p.name}</h4>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground"><MoreVertical size={14} /></button>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                  p.status === 'Concluído' ? 'bg-green-500/10 text-green-500' :
                  p.status === 'Pausado' ? 'bg-amber-500/10 text-amber-500' :
                  p.status === 'Planejado' ? 'bg-muted text-muted-foreground' :
                  'bg-primary/10 text-primary'
                }`}>{p.status}</span>
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progresso</span><span>{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users size={11} /> {p.team}</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={11} /> {p.tasks}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> {p.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
