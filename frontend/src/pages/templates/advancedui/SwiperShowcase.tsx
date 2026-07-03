import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SwiperShowcase() {
  return (
    <AdvancedUILayout title="Swiper JS" description="Slides avançados com efeitos de transição e navegação dinâmica.">
      <ShowcaseSection title="Swiper com Cards de KPI">
        <div className="mx-auto max-w-3xl">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-3">
              {[
                { title: 'Vendas Hoje', value: 'R$ 45.230', change: '+12%', up: true },
                { title: 'Pedidos Abertos', value: '28', change: '-3', up: false },
                { title: 'Ticket Médio', value: 'R$ 1.615', change: '+5%', up: true },
                { title: 'Novos Clientes', value: '7', change: '+2', up: true },
                { title: 'Itens Críticos', value: '14', change: '+4', up: false },
                { title: 'NPS', value: '72', change: '+8pts', up: true },
              ].map((kpi, i) => (
                <CarouselItem key={i} className="pl-3 basis-1/2 lg:basis-1/3">
                  <Card className="border-border/40">
                    <CardContent className="p-5 space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <Badge variant={kpi.up ? 'default' : 'destructive'} className="text-xs">{kpi.change}</Badge>
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

      <ShowcaseSection title="Swiper Autoplay (Loop)">
        <div className="mx-auto max-w-xl">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {[
                { bg: 'from-primary/20 to-primary/5', text: 'Gestão Financeira' },
                { bg: 'from-secondary/20 to-secondary/5', text: 'Controle de Estoque' },
                { bg: 'from-accent/20 to-accent/5', text: 'Pedidos de Venda' },
                { bg: 'from-destructive/20 to-destructive/5', text: 'Notas Fiscais' },
              ].map((s, i) => (
                <CarouselItem key={i}>
                  <div className={`bg-gradient-to-br ${s.bg} rounded-xl flex items-center justify-center h-48`}>
                    <span className="text-xl font-bold text-foreground/70">{s.text}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Galeria de Imagens">
        <div className="mx-auto max-w-3xl">
          <Carousel opts={{ align: 'center' }}>
            <CarouselContent className="-ml-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <CarouselItem key={i} className="pl-2 basis-1/4">
                  <div className="aspect-square rounded-lg bg-muted/40 flex items-center justify-center border border-border/30">
                    <span className="text-2xl text-muted-foreground/30">🖼️</span>
                  </div>
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
