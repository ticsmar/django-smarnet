import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

const carouselProps: PropDef[] = [
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Direção de navegação dos slides.' },
  { name: 'opts', type: 'EmblaOptionsType', description: 'Opções nativas do Embla Carousel: align, loop, dragFree, slidesToScroll, etc.' },
  { name: 'plugins', type: 'EmblaPluginType[]', description: 'Plugins Embla — Autoplay, ClassNames, etc.' },
  { name: 'setApi', type: '(api) => void', description: 'Expõe a API do Embla para controle programático (scrollTo, on, etc.).' },
];

export default function CarouselPage() {
  return (
    <ComponentDoc
      summary="Carrossel acessível baseado em Embla — suporta navegação por teclado, swipe touch e múltiplos slides por viewport. Estiliza-se inteiramente via tokens do design system."
      importPath="import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'"
    >
      <DocSection title="Carousel">
        <VariantSection
          title="Padrão (slide único)"
          description="Um slide por vez — ideal para banners, destaques de campanha e onboarding visual."
          preview={
            <div className="px-12">
              <Carousel className="max-w-md mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i}>
                      <div className="aspect-video rounded-xl bg-primary/10 border-2 border-primary/30 grid place-items-center text-primary text-2xl font-display font-bold">
                        Slide {i + 1}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          }
          code={`<Carousel>
  <CarouselContent>
    {slides.map((s, i) => (
      <CarouselItem key={i}>{s}</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />

        <VariantSection
          title="Múltiplos itens por viewport"
          description="Use basis-1/3 (ou similar) em CarouselItem para mostrar vários cards lado a lado — útil em listas de produtos ou métricas."
          preview={
            <div className="px-12">
              <Carousel opts={{ align: 'start' }} className="max-w-2xl mx-auto">
                <CarouselContent>
                  {[
                    { t: 'Sensores', v: '+128' },
                    { t: 'Transmissores', v: '+64' },
                    { t: 'Válvulas', v: '+42' },
                    { t: 'Atuadores', v: '+18' },
                    { t: 'Controladores', v: '+12' },
                    { t: 'Acessórios', v: '+96' },
                  ].map((item, i) => (
                    <CarouselItem key={i} className="md:basis-1/3">
                      <Card className="border-2 border-border/70">
                        <CardContent className="aspect-square grid place-items-center p-6">
                          <div className="text-center">
                            <p className="text-3xl font-display font-extrabold text-primary">{item.v}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.t}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          }
          code={`<Carousel opts={{ align: 'start' }}>
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i} className="md:basis-1/3">
        <Card>...</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />

        <VariantSection
          title="Com loop infinito"
          description="opts.loop=true permite navegar continuamente sem chegar ao 'fim' — útil para galerias de imagens."
          preview={
            <div className="px-12">
              <Carousel opts={{ loop: true }} className="max-w-md mx-auto">
                <CarouselContent>
                  {['#0a3a5c', '#0d8b8b', '#f59e0b', '#7c3aed'].map((c, i) => (
                    <CarouselItem key={i}>
                      <div className="aspect-video rounded-xl border-2 border-border/70 grid place-items-center text-white font-display font-bold text-xl" style={{ background: c }}>
                        Slide {i + 1} (loop)
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          }
          code={`<Carousel opts={{ loop: true }}>
  ...
</Carousel>`}
        />

        <PropsTable rows={carouselProps} title="Carousel (Root)" />

        <UsageNote type="tip">
          Os botões <code className="font-mono text-[11px]">CarouselPrevious</code> e <code className="font-mono text-[11px]">CarouselNext</code> ficam absolutamente posicionados — reserve espaço com <code className="font-mono text-[11px]">px-12</code> no container pai.
        </UsageNote>

        <UsageNote type="info">
          Acessibilidade: navegação por teclado (← / →) é nativa. Os controles têm <code className="font-mono text-[11px]">aria-label</code> traduzido automaticamente.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
