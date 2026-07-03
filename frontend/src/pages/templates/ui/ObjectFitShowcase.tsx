import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';

export default function ObjectFitShowcase() {
  const img = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop';

  return (
    <UIShowcaseLayout title="Object Fit" description="Controle de ajuste de imagens e vídeos dentro de containers.">
      <ShowcaseSection title="Object Fit Variants">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { fit: 'object-cover', label: 'Cover' },
            { fit: 'object-contain', label: 'Contain' },
            { fit: 'object-fill', label: 'Fill' },
            { fit: 'object-scale-down', label: 'Scale Down' },
            { fit: 'object-none', label: 'None' },
          ].map(({ fit, label }) => (
            <div key={fit}>
              <div className="w-full h-40 rounded-xl border border-border overflow-hidden bg-muted">
                <img src={img} alt={label} className={`w-full h-full ${fit}`} />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center font-mono">{fit}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Object Position">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['object-top', 'object-center', 'object-bottom', 'object-left', 'object-right'].map(pos => (
            <div key={pos}>
              <div className="w-full h-32 rounded-xl border border-border overflow-hidden bg-muted">
                <img src={img} alt={pos} className={`w-full h-full object-cover ${pos}`} />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center font-mono">{pos}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Aspect Ratio">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { ratio: 'aspect-square', label: '1:1' },
            { ratio: 'aspect-video', label: '16:9' },
            { ratio: 'aspect-[4/3]', label: '4:3' },
            { ratio: 'aspect-[3/4]', label: '3:4' },
          ].map(({ ratio, label }) => (
            <div key={ratio}>
              <div className={`w-full ${ratio} rounded-xl border border-border overflow-hidden bg-muted`}>
                <img src={img} alt={label} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center font-mono">{label} ({ratio})</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
