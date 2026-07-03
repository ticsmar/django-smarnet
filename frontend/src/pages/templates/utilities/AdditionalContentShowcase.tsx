import { UtilitiesLayout, ShowcaseSection } from './UtilitiesLayout';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function AdditionalContentShowcase() {
  return (
    <UtilitiesLayout title="Additional Content" description="Componentes utilitários adicionais: separadores, contadores, indicadores e mais.">
      <ShowcaseSection title="Separadores">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Horizontal</p>
            <Separator />
          </div>
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm text-foreground">Item A</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-foreground">Item B</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-foreground">Item C</span>
          </div>
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OU</span>
            <Separator className="flex-1" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Counters / Badges Numéricos">
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Mensagens', count: 5 },
            { label: 'Notificações', count: 12 },
            { label: 'Alertas', count: 3 },
            { label: 'Pedidos', count: 99 },
            { label: 'Novo', count: 0 },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 bg-muted/30 px-4 py-2.5 rounded-lg">
              <span className="text-sm text-foreground">{item.label}</span>
              <Badge variant={item.count === 0 ? 'secondary' : 'default'} className="text-xs rounded-full min-w-[20px] justify-center">
                {item.count === 0 ? 'Novo' : item.count > 50 ? '50+' : item.count}
              </Badge>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Empty State">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground">Nenhum dado encontrado</h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">Tente ajustar os filtros ou criar um novo registro para começar.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Indicadores de Status">
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Ativo', color: 'bg-success' },
            { label: 'Pendente', color: 'bg-warning' },
            { label: 'Inativo', color: 'bg-muted-foreground' },
            { label: 'Erro', color: 'bg-destructive' },
            { label: 'Processando', color: 'bg-primary animate-pulse' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 text-sm text-foreground">
              <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              {s.label}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Ribbon / Destaque">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Popular', 'Novo', 'Premium'].map(label => (
            <div key={label} className="relative bg-muted/30 rounded-xl p-6 overflow-hidden">
              <div className="absolute top-3 -right-8 bg-primary text-primary-foreground text-[10px] font-bold px-8 py-0.5 rotate-45 uppercase tracking-wider">
                {label}
              </div>
              <h4 className="text-sm font-semibold text-foreground">Card com Ribbon</h4>
              <p className="text-xs text-muted-foreground mt-1">Destaque "{label}" no canto</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Aspect Ratio">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { ratio: 'aspect-square', label: '1:1' },
            { ratio: 'aspect-video', label: '16:9' },
            { ratio: 'aspect-[4/3]', label: '4:3' },
            { ratio: 'aspect-[3/4]', label: '3:4' },
          ].map(a => (
            <div key={a.label} className="space-y-1">
              <div className={`${a.ratio} bg-primary/10 rounded-lg flex items-center justify-center`}>
                <span className="text-primary text-xs font-mono">{a.label}</span>
              </div>
              <code className="text-[10px] text-muted-foreground">{a.ratio}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UtilitiesLayout>
  );
}
