import { PagesLayout, PageSection } from '../PagesLayout';
import { Plus, Trash2, FileText, Send, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const items = [
  { desc: 'Válvula reguladora 1/2"', qty: 50, price: 245.0 },
  { desc: 'Cabo elétrico 4mm 50m', qty: 12, price: 180.0 },
  { desc: 'Sensor de temperatura PT100', qty: 8, price: 380.0 },
];

export default function CreateInvoiceShowcase() {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <PagesLayout title="Criar Nota Fiscal" description="Emita uma nova fatura." category="Páginas / Invoice">
      <PageSection>
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><FileText size={20} /></div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">Nova Nota Fiscal</p>
              <p className="text-xs text-muted-foreground">NF #4522 (rascunho)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-lg border border-border text-xs font-semibold hover:bg-surface-container-low flex items-center gap-2"><Save size={13} /> Rascunho</button>
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 flex items-center gap-2"><Send size={13} /> Emitir</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="text-xs mb-1.5">Cliente</Label>
            <Input placeholder="Buscar cliente..." />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Data de emissão</Label>
            <Input type="date" defaultValue="2025-04-15" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">CNPJ</Label>
            <Input defaultValue="12.345.678/0001-90" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Vencimento</Label>
            <Input type="date" defaultValue="2025-05-15" />
          </div>
        </div>

        <p className="font-semibold text-foreground mb-3">Itens</p>
        <div className="bg-surface-container-low rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Descrição</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider w-24">Qtd</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider w-32">Preço</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider w-32">Total</th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b border-border/20 last:border-0">
                  <td className="px-4 py-3 text-foreground">{it.desc}</td>
                  <td className="px-4 py-3 text-right text-foreground">{it.qty}</td>
                  <td className="px-4 py-3 text-right text-foreground">R$ {it.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-foreground font-semibold">R$ {(it.qty * it.price).toFixed(2)}</td>
                  <td className="px-2 py-3 text-right">
                    <button className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="text-xs font-semibold text-primary flex items-center gap-1.5 hover:underline mb-6">
          <Plus size={13} /> Adicionar item
        </button>

        <div className="grid md:grid-cols-2 gap-6 pt-5 border-t border-border/40">
          <div>
            <Label className="text-xs mb-1.5">Observações</Label>
            <Textarea rows={4} placeholder="Notas adicionais..." />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Impostos (18%)</span>
              <span>R$ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-display text-lg font-bold text-foreground pt-2 border-t border-border/40">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
