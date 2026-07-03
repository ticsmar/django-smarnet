import { PagesLayout, PageSection } from '../PagesLayout';
import { Search, Eye, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const orders = [
  { id: '#PED-2401', customer: 'Construtora Moura Dubeux', date: '15/04/2025', items: 5, total: 1850.0, status: 'Entregue' },
  { id: '#PED-2400', customer: 'Metalúrgica Gerdau', date: '14/04/2025', items: 12, total: 4280.0, status: 'Em trânsito' },
  { id: '#PED-2399', customer: 'Petrobras', date: '13/04/2025', items: 3, total: 980.0, status: 'Processando' },
  { id: '#PED-2398', customer: 'Vale S.A.', date: '12/04/2025', items: 8, total: 3120.0, status: 'Entregue' },
  { id: '#PED-2397', customer: 'WEG Motores', date: '10/04/2025', items: 2, total: 540.0, status: 'Cancelado' },
  { id: '#PED-2396', customer: 'Construtora Moura Dubeux', date: '08/04/2025', items: 15, total: 6230.0, status: 'Entregue' },
];

const statusColor: Record<string, string> = {
  Entregue: 'bg-status-success/10 text-status-success',
  'Em trânsito': 'bg-primary/10 text-primary',
  Processando: 'bg-amber-500/10 text-amber-500',
  Cancelado: 'bg-destructive/10 text-destructive',
};

export default function OrdersShowcase() {
  return (
    <PagesLayout title="Pedidos" description="Histórico de todos os pedidos." category="Páginas / Ecommerce">
      <PageSection>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar pedido..." className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex gap-2">
            {['Todos', 'Pendentes', 'Entregues'].map((s, i) => (
              <button key={s} className={`h-9 px-4 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-muted-foreground hover:text-foreground'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Pedido</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Cliente</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Data</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Itens</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Valor</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{o.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{o.customer}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{o.date}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{o.items}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">R$ {o.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-muted-foreground">
                      <button className="p-2 rounded-lg hover:bg-surface-container-low hover:text-foreground"><Eye size={14} /></button>
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
