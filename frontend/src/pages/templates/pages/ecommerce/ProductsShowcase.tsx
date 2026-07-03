import { PagesLayout, PageSection } from '../PagesLayout';
import { Search, Filter, Star, ShoppingCart, Heart, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';

const products = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  name: ['Válvula reguladora 1/2"', 'Cabo elétrico 4mm', 'Sensor PT100', 'Mangueira hidráulica', 'Bomba centrífuga 5HP', 'Inversor de frequência', 'Transmissor de pressão', 'Rolamento SKF 6204', 'Motor elétrico WEG 3HP'][i],
  price: [245, 180, 380, 95.5, 1850, 2400, 680, 145, 1290][i],
  rating: 4 + Math.random(),
  reviews: 20 + i * 7,
  category: ['Hidráulica', 'Elétrica', 'Sensores', 'Hidráulica', 'Bombas', 'Elétrica', 'Sensores', 'Mecânica', 'Motores'][i],
}));

export default function ProductsShowcase() {
  return (
    <PagesLayout title="Produtos" description="Catálogo de produtos da loja." category="Páginas / Ecommerce">
      <PageSection>
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar produtos..." className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 rounded-lg border border-border text-xs font-semibold hover:bg-surface-container-low flex items-center gap-2"><Filter size={13} /> Filtros</button>
            <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1">
              <button className="w-8 h-7 rounded-md bg-surface-container text-foreground flex items-center justify-center"><Grid3X3 size={13} /></button>
              <button className="w-8 h-7 rounded-md text-muted-foreground flex items-center justify-center"><List size={13} /></button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-surface-container-low rounded-2xl overflow-hidden hover:bg-surface-container-low/70 transition-colors group">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/5 relative">
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container text-muted-foreground hover:text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Heart size={14} /></button>
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface-container text-muted-foreground">{p.category}</span>
              </div>
              <div className="p-4">
                <p className="font-semibold text-foreground text-sm truncate">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  <span className="text-xs text-muted-foreground">{p.rating.toFixed(1)} ({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-display text-lg font-bold text-foreground">R$ {p.price.toFixed(2)}</p>
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
