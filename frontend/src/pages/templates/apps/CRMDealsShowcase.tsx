import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { DollarSign, Clock, User, MoreVertical } from 'lucide-react';

const stages = ['Qualificação', 'Proposta', 'Negociação', 'Fechamento'];
const deals = [
  { title: 'ERP Enterprise', company: 'MegaCorp', value: 'R$ 250k', stage: 0, owner: 'João S.', days: 12 },
  { title: 'Licença SaaS Anual', company: 'TechCorp', value: 'R$ 180k', stage: 1, owner: 'Maria S.', days: 8 },
  { title: 'Consultoria DevOps', company: 'CloudFirst', value: 'R$ 95k', stage: 1, owner: 'Carlos M.', days: 15 },
  { title: 'Plataforma BI', company: 'DataCo', value: 'R$ 320k', stage: 2, owner: 'Ana C.', days: 22 },
  { title: 'Automação RPA', company: 'FinTech', value: 'R$ 150k', stage: 2, owner: 'João S.', days: 5 },
  { title: 'App Mobile', company: 'StartupX', value: 'R$ 85k', stage: 3, owner: 'Pedro O.', days: 3 },
];

export default function CRMDealsShowcase() {
  return (
    <AppsLayout title="Deals" description="Pipeline de deals com visualização Kanban por estágio." category="CRM">
      <ShowcaseSection title="Pipeline de Deals">
        <div className="grid grid-cols-4 gap-4 min-h-[400px]">
          {stages.map((stage, si) => {
            const stageDeals = deals.filter(d => d.stage === si);
            const total = stageDeals.reduce((acc, d) => acc + parseFloat(d.value.replace(/[^\d]/g, '')), 0);
            return (
              <div key={stage} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{stage}</h4>
                    <p className="text-[10px] text-muted-foreground">{stageDeals.length} deals • R$ {(total / 1000).toFixed(0)}k</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {stageDeals.map((d, i) => (
                    <div key={i} className="p-3 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors cursor-grab space-y-2">
                      <div className="flex items-start justify-between">
                        <h5 className="text-xs font-semibold text-foreground">{d.title}</h5>
                        <MoreVertical size={12} className="text-muted-foreground" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">{d.company}</p>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold text-primary"><DollarSign size={10} /> {d.value}</span>
                        <span className="flex items-center gap-1"><Clock size={8} /> {d.days}d</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                          {d.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{d.owner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
