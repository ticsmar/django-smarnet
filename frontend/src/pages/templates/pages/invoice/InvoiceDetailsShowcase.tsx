import { PagesLayout, PageSection } from '../PagesLayout';
import { Download, Printer, Send, FileText } from 'lucide-react';

const items = [
  { desc: 'Válvula reguladora 1/2"', qty: 50, price: 245.0 },
  { desc: 'Cabo elétrico 4mm 50m', qty: 12, price: 180.0 },
  { desc: 'Sensor de temperatura PT100', qty: 8, price: 380.0 },
  { desc: 'Mangueira hidráulica 1"', qty: 25, price: 95.5 },
];

export default function InvoiceDetailsShowcase() {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <PagesLayout title="Detalhes da Nota Fiscal" description="Visualização completa de uma NF emitida." category="Páginas / Invoice">
      <PageSection>
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-border/40">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-status-success/10 text-status-success">Paga</span>
            <span className="text-xs text-muted-foreground">Emitida em 15/04/2025</span>
          </div>
          <div className="flex gap-2">
            <button className="h-9 w-9 rounded-lg border border-border hover:bg-surface-container-low flex items-center justify-center"><Printer size={14} /></button>
            <button className="h-9 w-9 rounded-lg border border-border hover:bg-surface-container-low flex items-center justify-center"><Download size={14} /></button>
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 flex items-center gap-2"><Send size={13} /> Enviar por e-mail</button>
          </div>
        </div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><FileText size={18} /></div>
            <p className="font-display text-2xl font-bold text-foreground">SmarNet S/A</p>
            <p className="text-xs text-muted-foreground mt-1">Av. Paulista, 1000 — São Paulo/SP<br />CNPJ: 11.222.333/0001-44</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nota Fiscal</p>
            <p className="font-display text-2xl font-bold text-foreground">#4521</p>
            <p className="text-xs text-muted-foreground mt-1">Vencimento: 15/05/2025</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-container-low rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Cliente</p>
            <p className="font-semibold text-foreground">Construtora Moura Dubeux</p>
            <p className="text-xs text-muted-foreground mt-1">CNPJ: 12.345.678/0001-90<br />Rua das Acácias, 234 — São Paulo/SP</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Pagamento</p>
            <p className="font-semibold text-foreground">Boleto Bancário</p>
            <p className="text-xs text-muted-foreground mt-1">30 dias · Banco Itaú<br />Pagamento confirmado em 28/04/2025</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-surface-container-low">
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Item</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Qtd</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Preço unit.</th>
                <th className="text-right px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b border-border/20 last:border-0">
                  <td className="px-4 py-3 text-foreground">{it.desc}</td>
                  <td className="px-4 py-3 text-right text-foreground">{it.qty}</td>
                  <td className="px-4 py-3 text-right text-foreground">R$ {it.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">R$ {(it.qty * it.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-full max-w-sm space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Impostos (18%)</span>
              <span>R$ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-display text-xl font-bold text-foreground pt-3 border-t border-border/40">
              <span>Total</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
