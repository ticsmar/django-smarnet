import { PagesLayout, PageSection } from './PagesLayout';
import { Inbox, Plus } from 'lucide-react';

export default function EmptyShowcase() {
  return (
    <PagesLayout title="Página Vazia" description="Template em branco para iniciar novas funcionalidades." category="Páginas">
      <PageSection>
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Inbox size={32} />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Comece a construir aqui</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Use este template em branco como ponto de partida para suas novas páginas e funcionalidades.
          </p>
          <button className="flex items-center gap-2 px-5 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
            <Plus size={15} /> Adicionar conteúdo
          </button>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
