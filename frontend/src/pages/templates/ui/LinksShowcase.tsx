import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { ExternalLink, ArrowRight, Download, Mail } from 'lucide-react';

export default function LinksShowcase() {
  return (
    <UIShowcaseLayout title="Links & Interactions" description="Estilos de links, estados hover e interações.">
      <ShowcaseSection title="Links Padrão">
        <div className="space-y-2">
          <p><a href="#" className="text-primary hover:underline text-sm">Link padrão com underline no hover</a></p>
          <p><a href="#" className="text-primary underline text-sm">Link sempre sublinhado</a></p>
          <p><a href="#" className="text-foreground hover:text-primary transition-colors text-sm">Link neutro com troca de cor</a></p>
          <p><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Link discreto (muted)</a></p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Links com Ícone">
        <div className="space-y-2">
          <p><a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">Link externo <ExternalLink size={12} /></a></p>
          <p><a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">Ver detalhes <ArrowRight size={12} /></a></p>
          <p><a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download size={12} /> Baixar arquivo</a></p>
          <p><a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Mail size={12} /> contato@smar.com.br</a></p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Link Cards (Clicáveis)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Documentação', 'API Reference', 'Suporte'].map((label) => (
            <a key={label} href="#" className="block p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">Acesse a seção de {label.toLowerCase()}.</p>
              <span className="inline-flex items-center gap-1 text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Acessar <ArrowRight size={10} />
              </span>
            </a>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estados de Interação">
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 rounded-xl text-sm border border-border hover:bg-muted active:scale-95 transition-all">Hover + Active</button>
          <button className="px-4 py-2 rounded-xl text-sm border border-border hover:shadow-ambient transition-all">Hover com Sombra</button>
          <button className="px-4 py-2 rounded-xl text-sm border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all">Hover com Borda</button>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
