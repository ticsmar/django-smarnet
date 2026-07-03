import { PagesLayout, PageSection } from '../PagesLayout';
import { Truck, Package, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

const items = [
  { name: 'Válvula reguladora 1/2"', qty: 2, price: 245.0 },
  { name: 'Cabo elétrico 4mm 50m', qty: 1, price: 180.0 },
  { name: 'Sensor de temperatura PT100', qty: 3, price: 380.0 },
];

const timeline = [
  { icon: CheckCircle2, label: 'Pedido entregue', date: '15/04 14:32', done: true },
  { icon: Truck, label: 'Em rota de entrega', date: '15/04 09:10', done: true },
  { icon: Package, label: 'Saiu do CD', date: '14/04 17:45', done: true },
  { icon: CheckCircle2, label: 'Pedido confirmado', date: '13/04 10:22', done: true },
];

export default function OrderDetailsShowcase() {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <PagesLayout title="Detalhes do Pedido" description="Informações completas do pedido." category="Páginas / Ecommerce">
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4">
          <PageSection>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Pedido</p>
                <p className="font-display text-xl font-bold text-foreground">#PED-2401</p>
              </div>
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-status-success/10 text-status-success">Entregue</span>
            </div>
            <p className="text-xs text-muted-foreground">Realizado em 13/04/2025 às 10:22</p>
          </PageSection>

          <PageSection title="Status da Entrega">
            <div className="relative pl-8">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              {timeline.map((t, i) => (
                <div key={i} className="relative pb-5 last:pb-0">
                  <div className={`absolute -left-[26px] w-8 h-8 rounded-full flex items-center justify-center border-2 ${t.done ? 'bg-status-success/10 border-status-success/30 text-status-success' : 'bg-surface-container-low border-border text-muted-foreground'}`}>
                    <t.icon size={13} />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection title="Itens do Pedido">
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.name} className="flex items-center gap-4 p-3 bg-surface-container-low rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/10" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{it.name}</p>
                    <p className="text-xs text-muted-foreground">{it.qty} × R$ {it.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">R$ {(it.qty * it.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </PageSection>
        </div>

        <aside className="space-y-4">
          <PageSection title="Cliente">
            <p className="font-semibold text-foreground">Construtora Moura Dubeux</p>
            <ul className="text-xs text-muted-foreground mt-3 space-y-1.5">
              <li className="flex items-center gap-2"><MapPin size={11} /> São Paulo, SP</li>
              <li className="flex items-center gap-2"><Phone size={11} /> (11) 4002-8922</li>
              <li className="flex items-center gap-2"><Mail size={11} /> compras@mouradubeux.com</li>
            </ul>
          </PageSection>

          <PageSection title="Resumo">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Frete</span><span>R$ 35,00</span></div>
              <div className="flex justify-between font-display text-lg font-bold text-foreground pt-3 border-t border-border/40 mt-3">
                <span>Total</span>
                <span className="text-primary">R$ {(subtotal + 35).toFixed(2)}</span>
              </div>
            </div>
          </PageSection>
        </aside>
      </div>
    </PagesLayout>
  );
}
