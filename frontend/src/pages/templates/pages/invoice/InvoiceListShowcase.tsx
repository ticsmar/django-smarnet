import { PagesLayout, PageSection } from '../PagesLayout';
import { Plus, Search, Eye, Download, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const invoices = [
  { id: '#4521', client: 'Construtora Moura Dubeux', date: '15/04/2025', due: '15/05/2025', total: 24500.0, status: 'Paga' },
  { id: '#4520', client: 'Metalúrgica Gerdau', date: '14/04/2025', due: '14/05/2025', total: 38900.0, status: 'Pendente' },
  { id: '#4519', client: 'Petrobras', date: '12/04/2025', due: '12/05/2025', total: 124800.0, status: 'Pendente' },
  { id: '#4518', client: 'Vale S.A.', date: '10/04/2025', due: '10/05/2025', total: 67500.0, status: 'Paga' },
  { id: '#4517', client: 'WEG Motores', date: '08/04/2025', due: '08/05/2025', total: 15200.0, status: 'Atrasada' },
  { id: '#4516', client: 'Construtora Moura Dubeux', date: '05/04/2025', due: '05/05/2025', total: 89400.0, status: 'Paga' },
];

const statusColor: Record<string, string> = {
  Paga: 'bg-status-success/10 text-status-success',
  Pendente: 'bg-amber-500/10 text-amber-500',
  Atrasada: 'bg-destructive/10 text-destructive',
};

export default function InvoiceListShowcase() {
  const total = invoices.reduce((s, i) => s + i.total, 0);
  const pending = invoices.filter(i => i.status !== 'Paga').reduce((s, i) => s + i.total, 0);

  return (
    <PagesLayout title="Lista de Notas Fiscais" description="Gerencie todas as NFs emitidas." category="Páginas / Invoice">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-surface-container rounded-2xl border border-border/40 p-4">
          <p className="text-xs text-muted-foreground">Faturado (mês)</p>
          <p className="font-display text-2xl font-bold text-foreground mt-1">R$ {(total / 1000).toFixed(1)}k</p>
        </div>
        <div className="bg-surface-container rounded-2xl border border-border/40 p-4">
          <p className="text-xs text-muted-foreground">A receber</p>
          <p className="font-display text-2xl font-bold text-amber-500 mt-1">R$ {(pending / 1000).toFixed(1)}k</p>
        </div>
        <div className="bg-surface-container rounded-2xl border border-border/40 p-4">
          <p className="text-xs text-muted-foreground">NFs emitidas</p>
          <p className="font-display text-2xl font-bold text-foreground mt-1">{invoices.length}</p>
        </div>
        <div className="bg-surface-container rounded-2xl border border-border/40 p-4">
          <p className="text-xs text-muted-foreground">Atrasadas</p>
          <p className="font-display text-2xl font-bold text-destructive mt-1">{invoices.filter(i => i.status === 'Atrasada').length}</p>
        </div>
      </div>

      <PageSection>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar nota fiscal..." className="pl-9 h-9 text-sm" />
          </div>
          <button className="flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
            <Plus size={15} /> Nova NF
          </button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">NF</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Cliente</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Emissão</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Vencimento</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Valor</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Ações</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={inv.id} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{inv.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{inv.client}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{inv.date}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{inv.due}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">R$ {inv.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor[inv.status]}`}>{inv.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-muted-foreground">
                      <button className="p-2 rounded-lg hover:bg-surface-container-low hover:text-foreground"><Eye size={14} /></button>
                      <button className="p-2 rounded-lg hover:bg-surface-container-low hover:text-foreground"><Download size={14} /></button>
                      <button className="p-2 rounded-lg hover:bg-surface-container-low hover:text-foreground"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
