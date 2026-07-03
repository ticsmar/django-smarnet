import { PagesLayout, PageSection } from '../PagesLayout';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

const items = [
  { name: 'Válvula reguladora 1/2"', cat: 'Hidráulica', price: 245.0, rating: 4.6 },
  { name: 'Bomba centrífuga 5HP', cat: 'Bombas', price: 1850.0, rating: 4.8 },
  { name: 'Sensor PT100', cat: 'Sensores', price: 380.0, rating: 4.5 },
  { name: 'Inversor de frequência', cat: 'Elétrica', price: 2400.0, rating: 4.9 },
];

export default function WishlistShowcase() {
  return (
    <PagesLayout title="Lista de Desejos" description="Produtos salvos para comprar depois." category="Páginas / Ecommerce">
      <PageSection>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center"><Heart size={18} fill="currentColor" /></div>
            <div>
              <p className="font-semibold text-foreground">{items.length} produtos salvos</p>
              <p className="text-xs text-muted-foreground">Adicione todos ao carrinho de uma vez</p>
            </div>
          </div>
          <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 flex items-center gap-2">
            <ShoppingCart size={13} /> Mover tudo
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.name} className="bg-surface-container-low rounded-2xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/5 relative">
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container text-destructive flex items-center justify-center"><Trash2 size={13} /></button>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{it.cat}</span>
                <p className="font-semibold text-foreground text-sm mt-1 truncate">{it.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  <span className="text-xs text-muted-foreground">{it.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-display text-lg font-bold text-foreground">R$ {it.price.toFixed(2)}</p>
                  <button className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90"><ShoppingCart size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
