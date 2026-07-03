import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Search, Plus, Filter, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TH = "px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low";
const TD = "px-6 py-4 text-sm text-foreground";

const contacts = [
  { name: 'João Silva', email: 'joao@empresa.com', phone: '+55 11 9999-1111', company: 'TechCorp', status: 'Ativo', tag: 'Cliente' },
  { name: 'Maria Santos', email: 'maria@startup.com', phone: '+55 21 8888-2222', company: 'StartupX', status: 'Ativo', tag: 'Lead' },
  { name: 'Pedro Oliveira', email: 'pedro@corp.com', phone: '+55 31 7777-3333', company: 'MegaCorp', status: 'Inativo', tag: 'Prospect' },
  { name: 'Ana Costa', email: 'ana@design.com', phone: '+55 41 6666-4444', company: 'DesignHub', status: 'Ativo', tag: 'Parceiro' },
  { name: 'Carlos Mendes', email: 'carlos@fin.com', phone: '+55 51 5555-5555', company: 'FinTech', status: 'Ativo', tag: 'Cliente' },
  { name: 'Lucia Ferreira', email: 'lucia@data.com', phone: '+55 71 4444-6666', company: 'DataCo', status: 'Ativo', tag: 'Lead' },
];

export default function CRMContactsShowcase() {
  return (
    <AppsLayout title="Contacts" description="Gerenciamento de contatos do CRM com busca e filtros." category="CRM">
      <ShowcaseSection title="Contatos">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Buscar contatos..." className="pl-8 pr-3 py-2 rounded-lg bg-muted/20 border border-border text-xs text-foreground w-60 focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <Button variant="outline" size="sm"><Filter size={12} className="mr-1" /> Filtros</Button>
            </div>
            <Button size="sm"><Plus size={14} className="mr-1" /> Novo Contato</Button>
          </div>
          <div className="overflow-hidden rounded-xl border border-border/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className={TH}>Nome</th>
                    <th className={TH}>Email</th>
                    <th className={TH}>Telefone</th>
                    <th className={TH}>Empresa</th>
                    <th className={TH}>Status</th>
                    <th className={TH}>Tag</th>
                    <th className="px-6 py-4 bg-surface-container-low"></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => (
                    <tr key={i} className={cn("hover:bg-muted/20 transition-colors", i % 2 === 0 ? "bg-background" : "bg-surface-container-low/50")}>
                      <td className={TD}>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{c.name}</span>
                        </div>
                      </td>
                      <td className={cn(TD, "text-muted-foreground text-xs")}>{c.email}</td>
                      <td className={cn(TD, "text-muted-foreground text-xs")}>{c.phone}</td>
                      <td className={cn(TD, "text-muted-foreground text-xs")}>{c.company}</td>
                      <td className={TD}>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${c.status === 'Ativo' ? 'bg-status-success/10 text-status-success' : 'bg-muted text-muted-foreground'}`}>{c.status}</span>
                      </td>
                      <td className={TD}>
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-[10px] font-medium text-primary">{c.tag}</span>
                      </td>
                      <td className={TD}><MoreVertical size={14} className="text-muted-foreground cursor-pointer" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
