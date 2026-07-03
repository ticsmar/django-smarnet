import { PagesLayout, PageSection } from '../PagesLayout';
import { Trash2, Minus, Plus, Tag, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';

const items = [
  { name: 'Válvula reguladora 1/2"', sku: 'COD-VR-12', price: 245.0, qty: 2 },
  { name: 'Cabo elétrico 4mm 50m', sku: 'CAB-4M-50', price: 180.0, qty: 1 },
  { name: 'Sensor de temperatura PT100', sku: 'SEN-PT-100', price: 380.0, qty: 3 },
];

export default function CartShowcase() {
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const shipping = 35;
  const total = subtotal + shipping;

  return (
    <PagesLayout title="Carrinho" description="Revise os itens antes de finalizar a compra." category="Páginas / Ecommerce">
      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <PageSection>
          <div className="flex items-center justify-between mb-5">
            <p className="font-semibold text-foreground">Itens no carrinho ({items.length})</p>
            <button className="text-xs text-muted-foreground hover:text-destructive">Limpar carrinho</button>
          </div>

          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.sku} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{it.name}</p>
                  <p className="text-[11px] text-muted-foreground">{it.sku}</p>
                  <p className="text-sm font-bold text-primary mt-1">R$ {it.price.toFixed(2)}</p>
                </div>
                <div className="inline-flex items-center bg-surface-container rounded-lg shrink-0">
                  <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"><Minus size={12} /></button>
                  <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                  <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"><Plus size={12} /></button>
                </div>
                <p className="text-sm font-bold text-foreground w-24 text-right shrink-0">R$ {(it.qty * it.price).toFixed(2)}</p>
                <button className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </PageSection>

        <aside className="space-y-4">
          <PageSection>
            <p className="font-semibold text-foreground mb-3">Cupom de desconto</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Insira o código" className="pl-9 h-10 text-sm" />
              </div>
              <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90">Aplicar</button>
            </div>
          </PageSection>

          <PageSection>
            <p className="font-semibold text-foreground mb-4">Resumo</p>
            <div className="space-y-2 text-sm pb-4 border-b border-border/40">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Frete</span><span>R$ {shipping.toFixed(2)}</span></div>
            </div>
            <div className="flex justify-between font-display text-lg font-bold text-foreground pt-4 mb-5">
              <span>Total</span>
              <span className="text-primary">R$ {total.toFixed(2)}</span>
            </div>
            <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2">
              <ShoppingBag size={15} /> Finalizar compra
            </button>
          </PageSection>
        </aside>
      </div>
    </PagesLayout>
  );
}
