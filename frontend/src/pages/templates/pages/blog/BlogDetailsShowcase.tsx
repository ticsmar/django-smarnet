import { PagesLayout, PageSection } from '../PagesLayout';
import { Calendar, User, MessageCircle, Tag, Share2, Bookmark, ArrowLeft } from 'lucide-react';

export default function BlogDetailsShowcase() {
  return (
    <PagesLayout title="Detalhes do Artigo" description="Visualização completa de um post do blog." category="Páginas / Blog">
      <PageSection>
        <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-5">
          <ArrowLeft size={13} /> Voltar para o blog
        </button>

        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Tecnologia</span>
        <h1 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">
          Como a Indústria 4.0 está transformando a metalurgia brasileira
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border/40 mb-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><User size={12} /> Carlos Mendes</span>
            <span className="flex items-center gap-1.5"><Calendar size={12} /> 12/04/2025</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={12} /> 24 comentários</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-surface-container-low text-muted-foreground hover:text-foreground"><Share2 size={14} /></button>
            <button className="p-2 rounded-lg hover:bg-surface-container-low text-muted-foreground hover:text-foreground"><Bookmark size={14} /></button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent rounded-2xl h-64 mb-6 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Imagem de capa</span>
        </div>

        <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
          <p className="text-base text-foreground">
            A quarta revolução industrial chegou ao Brasil com força nos últimos cinco anos, especialmente no setor metalúrgico,
            onde sensores IoT, gêmeos digitais e algoritmos de machine learning estão redefinindo o que é possível em termos
            de produtividade e eficiência.
          </p>
          <p>
            Empresas tradicionais como Gerdau, CSN e Vale investiram bilhões em modernização de plantas, integrando dados em
            tempo real para decisões operacionais que antes levavam dias. O resultado? Reduções de até 35% no consumo
            energético e ganhos de 22% em throughput.
          </p>
          <h3 className="font-display text-xl font-bold text-foreground pt-3">O papel dos ERPs modernos</h3>
          <p>
            Sistemas integrados de gestão são o sistema nervoso central dessa transformação. Sem uma plataforma capaz de
            consolidar dados de chão de fábrica, financeiro e cadeia de suprimentos, qualquer iniciativa de Indústria 4.0
            tende a ficar isolada e perder potencial.
          </p>
          <p>
            Neste artigo, exploramos cinco casos brasileiros de sucesso e os aprendizados que sua empresa pode extrair
            para construir sua própria jornada digital.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-8 pt-5 border-t border-border/40">
          {['indústria 4.0', 'metalurgia', 'IoT', 'transformação digital'].map((t) => (
            <span key={t} className="px-3 py-1 rounded-md bg-surface-container-low text-xs text-muted-foreground flex items-center gap-1">
              <Tag size={10} /> {t}
            </span>
          ))}
        </div>
      </PageSection>
    </PagesLayout>
  );
}
