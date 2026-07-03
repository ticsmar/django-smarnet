import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, Plus, Building2, Globe, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const companies = [
  { name: 'TechCorp Brasil', sector: 'Tecnologia', contacts: 12, deals: 5, revenue: 'R$ 450k', status: 'Cliente' },
  { name: 'StartupX', sector: 'SaaS', contacts: 4, deals: 2, revenue: 'R$ 120k', status: 'Prospect' },
  { name: 'MegaCorp', sector: 'Indústria', contacts: 8, deals: 3, revenue: 'R$ 680k', status: 'Cliente' },
  { name: 'DesignHub', sector: 'Design', contacts: 3, deals: 1, revenue: 'R$ 85k', status: 'Lead' },
  { name: 'FinTech Solutions', sector: 'Financeiro', contacts: 15, deals: 7, revenue: 'R$ 920k', status: 'Cliente' },
  { name: 'DataCo Analytics', sector: 'Data', contacts: 6, deals: 2, revenue: 'R$ 210k', status: 'Prospect' },
];

export default function CRMCompaniesShowcase() {
  return (
    <AppsLayout title="Companies" description="Gerenciamento de empresas no CRM." category="CRM">
      <ShowcaseSection title="Empresas">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar empresas..." className="pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-foreground w-60 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <Button size="sm"><Plus size={14} className="mr-1" /> Nova Empresa</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/10 p-4 space-y-3 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{c.name[0]}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-foreground">{c.name}</h4>
                    <p className="text-xs text-muted-foreground">{c.sector}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    c.status === 'Cliente' ? 'bg-green-500/10 text-green-500' :
                    c.status === 'Prospect' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-primary/10 text-primary'
                  }`}>{c.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/20">
                    <p className="text-xs font-bold text-foreground">{c.contacts}</p>
                    <p className="text-[10px] text-muted-foreground">Contatos</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20">
                    <p className="text-xs font-bold text-foreground">{c.deals}</p>
                    <p className="text-[10px] text-muted-foreground">Deals</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20">
                    <p className="text-xs font-bold text-foreground">{c.revenue}</p>
                    <p className="text-[10px] text-muted-foreground">Receita</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
