import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Progress } from '@/components/ui/progress';

export default function ProgressShowcase() {
  return (
    <UIShowcaseLayout title="Progress" description="Indicadores de progresso para tarefas e carregamento.">
      <ShowcaseSection title="Barras de Progresso">
        <div className="space-y-4 max-w-lg">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>0%</span></div>
            <Progress value={0} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>25%</span></div>
            <Progress value={25} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>50%</span></div>
            <Progress value={50} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>75%</span></div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>100%</span></div>
            <Progress value={100} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Rótulo e Porcentagem">
        <div className="space-y-4 max-w-lg">
          {[
            { label: 'Upload de arquivos', value: 68 },
            { label: 'Sincronização de dados', value: 42 },
            { label: 'Processamento de pedidos', value: 91 },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progresso com Status (Custom)">
        <div className="space-y-4 max-w-lg">
          {[
            { label: 'Concluído', value: 100, color: 'bg-status-success' },
            { label: 'Em andamento', value: 55, color: 'bg-status-info' },
            { label: 'Atrasado', value: 30, color: 'bg-destructive' },
            { label: 'Atenção', value: 80, color: 'bg-status-warning' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Circular / Radial">
        <div className="flex flex-wrap gap-8">
          {[
            { value: 75, label: 'Meta Vendas', color: 'stroke-primary' },
            { value: 45, label: 'Produção', color: 'stroke-secondary' },
            { value: 92, label: 'Qualidade', color: 'stroke-status-success' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" className="stroke-muted" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" className={item.color} strokeWidth="2.5"
                    strokeDasharray={`${item.value} ${100 - item.value}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{item.value}%</span>
              </div>
              <span className="text-xs text-muted-foreground mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
