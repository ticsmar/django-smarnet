import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export default function CarouselShowcase() {
  const colors = [
    'from-primary/20 to-primary/5',
    'from-secondary/20 to-secondary/5',
    'from-accent/20 to-accent/5',
    'from-destructive/20 to-destructive/5',
    'from-primary/30 to-accent/10',
  ];

  return (
    <AdvancedUILayout title="Carousel" description="Carrosséis responsivos para exibição de conteúdo em slides.">
      <ShowcaseSection title="Carousel Básico">
        <div className="mx-auto max-w-xl">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem key={i}>
                  <Card>
                    <CardContent className={`flex aspect-video items-center justify-center bg-gradient-to-br ${colors[i]} rounded-xl`}>
                      <span className="text-3xl font-bold text-foreground/60">Slide {i + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Carousel Multi-Item (33%)">
        <div className="mx-auto max-w-3xl">
          <Carousel opts={{ align: 'start' }}>
            <CarouselContent className="-ml-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <CarouselItem key={i} className="pl-2 basis-1/3">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center bg-muted/40 rounded-xl">
                      <span className="text-2xl font-semibold text-muted-foreground">{i + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Carousel de Produtos">
        <div className="mx-auto max-w-3xl">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-3">
              {[
                { name: 'Motor Elétrico 5CV', code: 'PRD-001', price: 'R$ 2.450,00' },
                { name: 'Inversor de Frequência', code: 'PRD-002', price: 'R$ 3.890,00' },
                { name: 'Sensor de Pressão', code: 'PRD-003', price: 'R$ 1.200,00' },
                { name: 'CLP S7-1200', code: 'PRD-004', price: 'R$ 5.600,00' },
                { name: 'Válvula Pneumática', code: 'PRD-005', price: 'R$ 780,00' },
                { name: 'Encoder Rotativo', code: 'PRD-006', price: 'R$ 1.950,00' },
              ].map((prod, i) => (
                <CarouselItem key={i} className="pl-3 basis-1/2 lg:basis-1/3">
                  <Card className="border-border/40">
                    <CardContent className="p-4 space-y-2">
                      <div className="aspect-square rounded-lg bg-muted/30 flex items-center justify-center">
                        <span className="text-4xl text-muted-foreground/40">📦</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground">{prod.code}</p>
                      <p className="text-sm font-semibold truncate">{prod.name}</p>
                      <p className="text-sm font-bold text-primary">{prod.price}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
