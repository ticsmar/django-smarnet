import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';

export default function ImagesShowcase() {
  const placeholder = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop';
  const avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&facepad=2';

  return (
    <UIShowcaseLayout title="Images & Figures" description="Tratamento de imagens com bordas, máscaras e legendas.">
      <ShowcaseSection title="Bordas Arredondadas">
        <div className="flex flex-wrap gap-4">
          <img src={placeholder} alt="Rounded" className="w-40 h-28 object-cover rounded-lg" />
          <img src={placeholder} alt="More Rounded" className="w-40 h-28 object-cover rounded-2xl" />
          <img src={placeholder} alt="Full Round" className="w-28 h-28 object-cover rounded-full" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Sombra e Borda">
        <div className="flex flex-wrap gap-4">
          <img src={placeholder} alt="Shadow" className="w-40 h-28 object-cover rounded-xl shadow-ambient" />
          <img src={placeholder} alt="Border" className="w-40 h-28 object-cover rounded-xl border-2 border-border" />
          <img src={placeholder} alt="Border Primary" className="w-40 h-28 object-cover rounded-xl border-2 border-primary/30" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Figure com Legenda">
        <div className="flex flex-wrap gap-6">
          <figure className="max-w-xs">
            <img src={placeholder} alt="Figure" className="w-full rounded-xl" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">
              Figura 1 — Linha de produção automatizada
            </figcaption>
          </figure>
          <figure className="max-w-xs">
            <img src={placeholder} alt="Figure 2" className="w-full rounded-xl" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">
              Figura 2 — Painel de controle CNC
            </figcaption>
          </figure>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Avatares">
        <div className="flex items-center gap-3">
          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
          <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30 ring-offset-2 ring-offset-background" />
          <img src={avatar} alt="Avatar" className="w-14 h-14 rounded-full object-cover" />
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JS</div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Grupo de Avatares (Stacked)">
        <div className="flex -space-x-3">
          {[1,2,3,4].map(i => (
            <img key={i} src={`${avatar}&q=${i}`} alt={`User ${i}`} className="w-10 h-10 rounded-full object-cover border-2 border-background" />
          ))}
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground border-2 border-background">+5</div>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
