import { Progress } from '@/components/ui/progress';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

const progressProps: PropDef[] = [
  { name: 'value', type: 'number', default: '0', description: 'Valor atual de progresso (0–100).' },
  { name: 'max', type: 'number', default: '100', description: 'Valor máximo da barra.' },
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais no root.' },
];

export default function ProgressPage() {
  return (
    <ComponentDoc
      summary="Barra de progresso linear indicando andamento de uma operação ou métrica."
      importPath="import { Progress } from '@/components/ui/progress'"
    >
      <DocSection title="Progress">
        <VariantSection
          title="Valores Diversos"
          description="Barra preenchida proporcionalmente ao valor."
          preview={
            <div className="space-y-4 max-w-lg">
              {[10, 33, 60, 85, 100].map((v) => (
                <div key={v}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-foreground">Progresso</span>
                    <span className="text-muted-foreground">{v}%</span>
                  </div>
                  <Progress value={v} />
                </div>
              ))}
            </div>
          }
          code={`<Progress value={60} />`}
        />

        <VariantSection
          title="Tamanhos Customizados"
          description="Use className para alterar altura e raio."
          preview={
            <div className="space-y-4 max-w-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Slim (h-1.5)</p>
                <Progress value={45} className="h-1.5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Default (h-4)</p>
                <Progress value={45} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Thick (h-6)</p>
                <Progress value={45} className="h-6" />
              </div>
            </div>
          }
          code={`<Progress value={45} className="h-1.5" />
<Progress value={45} />
<Progress value={45} className="h-6" />`}
        />

        <VariantSection
          title="Cores Semânticas"
          description="Sobrescreva a cor do indicador com classes Tailwind."
          preview={
            <div className="space-y-3 max-w-lg">
              {[
                { label: 'Primary', cls: '[&>div]:bg-primary', v: 70 },
                { label: 'Success', cls: '[&>div]:bg-success', v: 100 },
                { label: 'Warning', cls: '[&>div]:bg-warning', v: 55 },
                { label: 'Destructive', cls: '[&>div]:bg-destructive', v: 30 },
                { label: 'Info', cls: '[&>div]:bg-info', v: 80 },
                { label: 'Accent', cls: '[&>div]:bg-accent', v: 65 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">{item.v}%</span>
                  </div>
                  <Progress value={item.v} className={item.cls} />
                </div>
              ))}
            </div>
          }
          code={`<Progress value={100} className="[&>div]:bg-success" />
<Progress value={55} className="[&>div]:bg-warning" />
<Progress value={30} className="[&>div]:bg-destructive" />`}
        />

        <VariantSection
          title="Indeterminado (sem valor)"
          description="Quando value é undefined, a barra fica vazia — combine com animação CSS para loading."
          preview={
            <div className="max-w-lg">
              <Progress className="[&>div]:animate-pulse [&>div]:bg-primary" value={100} />
            </div>
          }
          code={`<Progress className="[&>div]:animate-pulse [&>div]:bg-primary" value={100} />`}
        />

        <PropsTable rows={progressProps} />

        <UsageNote type="tip">
          Use <code className="font-mono text-[11px]">{'className="[&>div]:bg-success"'}</code> para alterar a cor do indicador sem criar componentes extras.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
