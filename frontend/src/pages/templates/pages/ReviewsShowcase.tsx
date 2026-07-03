import { PagesLayout, PageSection } from './PagesLayout';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

const summary = { avg: 4.7, total: 348, breakdown: [{ s: 5, p: 78 }, { s: 4, p: 15 }, { s: 3, p: 4 }, { s: 2, p: 2 }, { s: 1, p: 1 }] };

const reviews = [
  { name: 'Carlos Mendes', company: 'Gerdau', rating: 5, date: '12/04/2025', title: 'Plataforma sólida e completa', text: 'Implementamos em 4 plantas em menos de 2 meses. O suporte é excepcional e os relatórios atendem perfeitamente nossa demanda.', helpful: 24 },
  { name: 'Marina Costa', company: 'Petrobras', rating: 5, date: '08/04/2025', title: 'Mudou nosso processo financeiro', text: 'Conciliação bancária automática economizou 20h semanais da nossa equipe. Recomendo demais.', helpful: 18 },
  { name: 'Roberto Silva', company: 'Vale S.A.', rating: 4, date: '02/04/2025', title: 'Muito bom, faltam alguns ajustes', text: 'Sistema robusto, mas senti falta de mais opções de customização nos dashboards. De resto, muito satisfeito.', helpful: 9 },
];

export default function ReviewsShowcase() {
  return (
    <PagesLayout title="Avaliações" description="Veja o que nossos clientes estão falando." category="Páginas">
      <PageSection>
        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-center">
          <div className="text-center">
            <p className="font-display text-5xl font-bold text-foreground">{summary.avg}</p>
            <div className="flex justify-center gap-0.5 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-amber-400" fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Baseado em {summary.total} avaliações</p>
          </div>
          <div className="space-y-2">
            {summary.breakdown.map((b) => (
              <div key={b.s} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-3">{b.s}</span>
                <Star size={11} className="text-amber-400" fill="currentColor" />
                <div className="flex-1 h-2 rounded-full bg-surface-container-low overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${b.p}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">{b.p}%</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection title="Depoimentos">
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-surface-container-low rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {r.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground">{r.company} · {r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={13} className={j < r.rating ? 'text-amber-400' : 'text-muted-foreground/30'} fill={j < r.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{r.title}</p>
              <p className="text-sm text-muted-foreground">{r.text}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-foreground"><ThumbsUp size={12} /> Útil ({r.helpful})</button>
                <button className="flex items-center gap-1.5 hover:text-foreground"><MessageCircle size={12} /> Responder</button>
              </div>
            </div>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
