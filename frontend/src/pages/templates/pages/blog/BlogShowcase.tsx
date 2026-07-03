import { PagesLayout, PageSection } from '../PagesLayout';
import { Calendar, User, MessageCircle, ArrowRight, Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';

const posts = [
  { title: 'Como a Indústria 4.0 está transformando a metalurgia brasileira', excerpt: 'IoT, machine learning e automação avançada estão remodelando processos produtivos em todo o setor.', author: 'Carlos Mendes', date: '12/04/2025', category: 'Tecnologia', comments: 24, featured: true },
  { title: '5 indicadores que todo gestor industrial precisa acompanhar', excerpt: 'OEE, TPM, custo por unidade produzida — descubra quais KPIs são essenciais para sua operação.', author: 'Ana Ribeiro', date: '08/04/2025', category: 'Gestão', comments: 18 },
  { title: 'LGPD na indústria: o que mudou em 2025', excerpt: 'Atualizações regulatórias e como adequar seu ERP às novas exigências de privacidade de dados.', author: 'Marina Costa', date: '03/04/2025', category: 'Compliance', comments: 9 },
  { title: 'Estoque enxuto: lições do modelo Toyota aplicadas ao Brasil', excerpt: 'Como reduzir capital imobilizado e ganhar agilidade com metodologia just-in-time adaptada.', author: 'Roberto Silva', date: '28/03/2025', category: 'Operações', comments: 31 },
];

const categories = ['Tecnologia', 'Gestão', 'Compliance', 'Operações', 'Financeiro'];

export default function BlogShowcase() {
  return (
    <PagesLayout title="Blog" description="Insights e tendências para gestão industrial." category="Páginas">
      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        <div className="space-y-4">
          {posts.map((p) => (
            <PageSection key={p.title}>
              <div className={p.featured ? 'border-l-2 border-primary pl-4' : ''}>
                {p.featured && <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase mb-2">Destaque</span>}
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{p.category}</span>
                <h2 className="font-display text-xl font-bold text-foreground mt-1 mb-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><User size={11} /> {p.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={11} /> {p.date}</span>
                    <span className="flex items-center gap-1.5"><MessageCircle size={11} /> {p.comments}</span>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">Ler mais <ArrowRight size={12} /></button>
                </div>
              </div>
            </PageSection>
          ))}
        </div>

        <aside className="space-y-4">
          <PageSection>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Buscar</p>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar artigos..." className="pl-9 h-9 text-sm" />
            </div>
          </PageSection>
          <PageSection>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Categorias</p>
            <ul className="space-y-1.5">
              {categories.map((c) => (
                <li key={c}>
                  <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm hover:bg-surface-container-low text-foreground">
                    <span className="flex items-center gap-2 text-muted-foreground"><Tag size={11} /> {c}</span>
                    <span className="text-[10px] text-muted-foreground">12</span>
                  </button>
                </li>
              ))}
            </ul>
          </PageSection>
        </aside>
      </div>
    </PagesLayout>
  );
}
