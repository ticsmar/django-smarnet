import { PagesLayout, PageSection } from '../PagesLayout';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, Check } from 'lucide-react';

const colors = ['Azul', 'Cinza', 'Preto'];
const sizes = ['1/2"', '3/4"', '1"', '1.1/4"'];

export default function ProductDetailsShowcase() {
  return (
    <PagesLayout title="Detalhes do Produto" description="Página completa de produto." category="Páginas / Ecommerce">
      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="aspect-square bg-gradient-to-br from-primary/15 to-secondary/10 rounded-2xl" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-lg ${i === 0 ? 'bg-primary/20 ring-2 ring-primary' : 'bg-surface-container-low'}`} />
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Hidráulica · COD-VR-12</span>
            <h1 className="font-display text-2xl font-bold text-foreground mt-2 mb-3">Válvula Reguladora de Pressão 1/2"</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < 4 ? 'text-amber-400' : 'text-muted-foreground/30'} fill={i < 4 ? 'currentColor' : 'none'} />)}
              </div>
              <span className="text-xs text-muted-foreground">4.6 (84 avaliações)</span>
              <span className="text-xs text-status-success font-semibold">Em estoque</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground mb-1">R$ 245,00</p>
            <p className="text-xs text-muted-foreground mb-5">ou 6x de R$ 40,83 sem juros</p>
            <p className="text-sm text-muted-foreground mb-5">
              Válvula em latão forjado para regulagem de pressão em sistemas hidráulicos industriais. Compatível com pressões de 0 a 16 bar.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-foreground mb-2">Cor</p>
                <div className="flex gap-2">
                  {colors.map((c, i) => (
                    <button key={c} className={`h-9 px-4 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-foreground'}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-2">Tamanho</p>
                <div className="flex gap-2">
                  {sizes.map((s, i) => (
                    <button key={s} className={`h-9 px-4 rounded-lg text-xs font-semibold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-foreground'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-2">Quantidade</p>
                <div className="inline-flex items-center bg-surface-container-low rounded-lg">
                  <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground"><Minus size={13} /></button>
                  <span className="w-10 text-center text-sm font-semibold">1</span>
                  <button className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground"><Plus size={13} /></button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button className="flex-1 h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2">
                <ShoppingCart size={15} /> Adicionar ao carrinho
              </button>
              <button className="w-11 h-11 rounded-lg border border-border hover:bg-surface-container-low flex items-center justify-center"><Heart size={15} /></button>
              <button className="w-11 h-11 rounded-lg border border-border hover:bg-surface-container-low flex items-center justify-center"><Share2 size={15} /></button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-border/40">
              <div><Truck size={16} className="mx-auto text-primary mb-1" /><p className="text-[10px] text-muted-foreground">Frete grátis acima de R$ 500</p></div>
              <div><Shield size={16} className="mx-auto text-primary mb-1" /><p className="text-[10px] text-muted-foreground">Garantia de 2 anos</p></div>
              <div><RotateCcw size={16} className="mx-auto text-primary mb-1" /><p className="text-[10px] text-muted-foreground">Troca em 30 dias</p></div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40">
          <h3 className="font-display font-bold text-foreground mb-4">Especificações técnicas</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm">
            {[
              ['Material', 'Latão forjado'],
              ['Pressão máxima', '16 bar'],
              ['Temperatura', '-10°C a +120°C'],
              ['Conexão', 'Rosca BSP'],
              ['Norma', 'ABNT NBR 15770'],
              ['Peso', '0.45 kg'],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center gap-2 py-1.5">
                <Check size={13} className="text-status-success" />
                <span className="text-muted-foreground">{k}:</span>
                <span className="text-foreground font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
