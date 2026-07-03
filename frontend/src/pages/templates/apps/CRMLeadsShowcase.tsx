import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, Plus, TrendingUp, Phone, Mail, Star, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const leads = [
  { name: 'Roberto Alves', company: 'InnovaTech', email: 'roberto@innovatech.com', source: 'Website', score: 92, status: 'Quente' },
  { name: 'Fernanda Lima', company: 'GreenEnergy', email: 'fernanda@green.com', source: 'LinkedIn', score: 78, status: 'Morno' },
  { name: 'Diego Santos', company: 'AutoParts', email: 'diego@autoparts.com', source: 'Indicação', score: 85, status: 'Quente' },
  { name: 'Patricia Gomes', company: 'EduTech', email: 'patricia@edutech.com', source: 'Evento', score: 45, status: 'Frio' },
  { name: 'Marcos Ribeiro', company: 'LogisCo', email: 'marcos@logisco.com', source: 'Website', score: 68, status: 'Morno' },
  { name: 'Camila Nunes', company: 'HealthPlus', email: 'camila@healthplus.com', source: 'Ads', score: 55, status: 'Frio' },
];

export default function CRMLeadsShowcase() {
  return (
    <AppsLayout title="Leads" description="Gerenciamento de leads com scoring e status de qualificação." category="CRM">
      <div className="grid grid-cols-3 gap-4 mb-2">
        {[
          { label: 'Leads Quentes', value: '24', change: '+12%', color: 'text-green-500 bg-green-500/10' },
          { label: 'Leads Mornos', value: '38', change: '+5%', color: 'text-amber-500 bg-amber-500/10' },
          { label: 'Leads Frios', value: '15', change: '-3%', color: 'text-muted-foreground bg-muted' },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container rounded-xl border border-border/40 p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <span className={`text-xs font-medium ${s.color} px-1.5 py-0.5 rounded`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>
      <ShowcaseSection title="Todos os Leads">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar leads..." className="pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-foreground w-60 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <Button size="sm"><Plus size={14} className="mr-1" /> Novo Lead</Button>
          </div>
          <div className="space-y-2">
            {leads.map((l, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {l.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground">{l.name}</h4>
                  <p className="text-xs text-muted-foreground">{l.company} • {l.source}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp size={12} className={l.score >= 80 ? 'text-green-500' : l.score >= 60 ? 'text-amber-500' : 'text-muted-foreground'} />
                  <span className="text-xs font-bold text-foreground">{l.score}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                  l.status === 'Quente' ? 'bg-green-500/10 text-green-500' :
                  l.status === 'Morno' ? 'bg-amber-500/10 text-amber-500' :
                  'bg-muted text-muted-foreground'
                }`}>{l.status}</span>
                <div className="flex gap-1 shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground"><Phone size={12} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground"><Mail size={12} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground"><MoreVertical size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
