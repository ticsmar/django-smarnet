import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

const aspectRatioProps: PropDef[] = [
  { name: 'ratio', type: 'number', default: '1', required: true, description: 'Proporção largura/altura (ex: 16/9, 4/3, 1).' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo que será contido na proporção definida.' },
  { name: 'className', type: 'string', description: 'Classes adicionais para o container.' },
];

export default function AspectRatioPage() {
  return (
    <ComponentDoc
      summary="Mantém uma proporção fixa (aspect ratio) para o conteúdo filho, útil para imagens, vídeos e embeds responsivos. Baseado em Radix UI."
      importPath="@/components/ui/aspect-ratio"
    >
      <DocSection title="AspectRatio" description="Envolva qualquer conteúdo para forçar uma proporção fixa.">
        <VariantSection
          title="16:9 (widescreen)"
          description="Proporção padrão para vídeos e banners."
          preview={
            <div className="max-w-md">
              <AspectRatio ratio={16 / 9} className="rounded-xl bg-muted grid place-items-center">
                <span className="text-sm font-semibold text-muted-foreground">16 : 9</span>
              </AspectRatio>
            </div>
          }
          code={`<AspectRatio ratio={16 / 9} className="rounded-xl bg-muted">
  <img src="..." className="object-cover w-full h-full" />
</AspectRatio>`}
        />

        <VariantSection
          title="4:3 (clássico)"
          description="Proporção clássica de fotografia e monitores."
          preview={
            <div className="max-w-xs">
              <AspectRatio ratio={4 / 3} className="rounded-xl bg-muted grid place-items-center">
                <span className="text-sm font-semibold text-muted-foreground">4 : 3</span>
              </AspectRatio>
            </div>
          }
          code={`<AspectRatio ratio={4 / 3} className="rounded-xl bg-muted">
  {children}
</AspectRatio>`}
        />

        <VariantSection
          title="1:1 (quadrado)"
          description="Ideal para thumbnails e avatares."
          preview={
            <div className="max-w-[200px]">
              <AspectRatio ratio={1} className="rounded-xl bg-muted grid place-items-center">
                <span className="text-sm font-semibold text-muted-foreground">1 : 1</span>
              </AspectRatio>
            </div>
          }
          code={`<AspectRatio ratio={1} className="rounded-xl bg-muted">
  {children}
</AspectRatio>`}
        />

        <VariantSection
          title="Com imagem"
          description="Imagem contida na proporção definida usando object-cover."
          preview={
            <div className="max-w-md">
              <AspectRatio ratio={21 / 9} className="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80"
                  alt="Demo"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          }
          code={`<AspectRatio ratio={21 / 9} className="rounded-xl overflow-hidden">
  <img src="..." alt="..." className="object-cover w-full h-full" />
</AspectRatio>`}
        />
      </DocSection>

      <DocSection title="API">
        <PropsTable rows={aspectRatioProps} />
      </DocSection>

      <UsageNote type="info">
        O componente usa a técnica CSS <code>padding-bottom</code> para manter a proporção. O conteúdo filho é posicionado absolutamente dentro do container.
      </UsageNote>
    </ComponentDoc>
  );
}
