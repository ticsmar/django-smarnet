import { PagesLayout, PageSection } from '../PagesLayout';
import { Search, Filter, Edit, Trash2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

const products = [
  { name: 'Válvula reguladora 1/2"', sku: 'COD-VR-12', cat: 'Hidráulica', price: 245.0, stock: 142, status: 'Ativo' },
  { name: 'Cabo elétrico 4mm 50m', sku: 'CAB-4M-50', cat: 'Elétrica', price: 180.0, stock: 87, status: 'Ativo' },
  { name: 'Sensor PT100', sku: 'SEN-PT-100', cat: 'Sensores', price: 380.0, stock: 12, status: 'Estoque baixo' },
  { name: 'Mangueira hidráulica 1"', sku: 'MAN-HD-1', cat: 'Hidráulica', price: 95.5, stock: 0, status: 'Esgotado' },
  { name: 'Bomba centrífuga 5HP', sku: 'BMB-CN-5', cat: 'Bombas', price: 1850.0, stock: 24, status: 'Ativo' },
  { name: 'Inversor de frequência', sku: 'INV-FQ-3K', cat: 'Elétrica', price: 2400.0, stock: 8, status: 'Estoque baixo' },
];

const statusColor: Record<string, string> = {
  Ativo: 'bg-status-success/10 text-status-success',
  'Estoque baixo': 'bg-amber-500/10 text-amber-500',
  Esgotado: 'bg-destructive/10 text-destructive',
};

export default function ProductsListShowcase() {
  return (
    <PagesLayout title="Lista de Produtos" description="Gerencie todos os produtos cadastrados." category="Páginas / Ecommerce">
      <PageSection>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-5">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar produto ou SKU..." className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3 rounded-lg border border-border text-xs font-semibold hover:bg-surface-container-low flex items-center gap-2"><Filter size={13} /> Filtrar</button>
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 flex items-center gap-2"><Plus size={13} /> Novo produto</button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Produto</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">SKU</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Categoria</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Preço</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Estoque</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.sku} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/10 shrink-0" />
                      <span className="font-semibold text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-mono text-xs">{p.sku}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{p.cat}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">R$ {p.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-muted-foreground">
                      <button className="p-2 rounded-lg hover:bg-surface-container-low hover:text-foreground"><Edit size={14} /></button>
                      <button className="p-2 rounded-lg hover:bg-surface-container-low hover:text-destructive"><Trash2 size={14} /></button>
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
