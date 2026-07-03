import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Star, Heart, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

function StarRating({ max = 5, initial = 0, size = 20 }: { max?: number; initial?: number; size?: number }) {
  const [rating, setRating] = useState(initial);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const val = i + 1;
        return (
          <button key={i} onClick={() => setRating(val)} onMouseEnter={() => setHover(val)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-110">
            <Star size={size} className={`${val <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'} transition-colors`} />
          </button>
        );
      })}
      <span className="text-sm text-muted-foreground ml-2">{rating}/{max}</span>
    </div>
  );
}

function HeartRating({ max = 5, initial = 0 }: { max?: number; initial?: number }) {
  const [rating, setRating] = useState(initial);
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <button key={i} onClick={() => setRating(i + 1)} className="transition-transform hover:scale-110">
          <Heart size={20} className={`${i < rating ? 'fill-destructive text-destructive' : 'text-muted-foreground/30'} transition-colors`} />
        </button>
      ))}
    </div>
  );
}

export default function RatingsShowcase() {
  return (
    <AdvancedUILayout title="Ratings" description="Componentes de avaliação com estrelas, corações e thumbs.">
      <ShowcaseSection title="Estrelas">
        <div className="space-y-4">
          <div><p className="text-sm text-muted-foreground mb-2">Padrão (5 estrelas)</p><StarRating initial={3} /></div>
          <div><p className="text-sm text-muted-foreground mb-2">10 estrelas</p><StarRating max={10} initial={7} size={16} /></div>
          <div><p className="text-sm text-muted-foreground mb-2">Grande</p><StarRating initial={4} size={32} /></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Corações">
        <div className="space-y-4">
          <HeartRating initial={3} />
          <HeartRating max={3} initial={2} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Avaliação de Fornecedores">
        <div className="space-y-3 max-w-md">
          {[
            { name: 'WEG S.A.', rating: 5, reviews: 42 },
            { name: 'Siemens Brasil', rating: 4, reviews: 28 },
            { name: 'Parker Hannifin', rating: 4, reviews: 15 },
            { name: 'Festo Brasil', rating: 3, reviews: 8 },
          ].map(f => (
            <div key={f.name} className="flex items-center justify-between border-b border-border/30 pb-3">
              <div>
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.reviews} avaliações</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < f.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/20'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Feedback Rápido">
        <div className="flex gap-6">
          {[
            { icon: ThumbsUp, label: 'Útil', count: 24 },
            { icon: Heart, label: 'Favorito', count: 12 },
            { icon: Star, label: 'Destaque', count: 8 },
          ].map(item => {
            const [active, setActive] = useState(false);
            return (
              <button key={item.label} onClick={() => setActive(!active)} className="flex flex-col items-center gap-1 group">
                <item.icon size={24} className={`transition-all group-hover:scale-110 ${active ? 'fill-primary text-primary' : 'text-muted-foreground/40'}`} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs font-mono">{active ? item.count + 1 : item.count}</span>
              </button>
            );
          })}
        </div>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
