import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { showColoredToast } from '@/components/ui/toasts';
import { ToastAlert } from '@/components/ui/alerts';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

const colors: Array<'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'alert' | 'info' | 'destructive' | 'neutral'> = [
  'primary', 'secondary', 'success', 'warning', 'alert', 'info', 'destructive',
];

export default function ToastsPage() {
  const [tone, setTone] = useState<'solid' | 'soft' | 'outline'>('soft');

  return (
    <ComponentDoc
      summary="Toasts coloridos com 10 cores semânticas e 3 tons (solid, soft, outline). Disparados via showColoredToast (Sonner como container) ou usados estaticamente como ToastAlert."
      importPath="@/components/ui/toasts"
    >
      <DocSection
        title="showColoredToast"
        description="Função para disparar toasts; cada chamada cria um item na stack do Sonner."
      >
        <VariantSection
          title="Cores e tons"
          preview={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(['solid', 'soft', 'outline'] as const).map((t) => (
                  <Button
                    key={t}
                    size="sm"
                    variant={tone === t ? 'default' : 'outline'}
                    onClick={() => setTone(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      showColoredToast({
                        color: c,
                        tone,
                        title: c.charAt(0).toUpperCase() + c.slice(1),
                        description: `Toast ${tone} na cor ${c}.`,
                      })
                    }
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          }
          code={`import { showColoredToast } from '@/components/ui/toasts';

showColoredToast({
  color: 'success',
  tone: 'soft',
  title: 'Pedido salvo',
  description: 'O pedido #4821 foi salvo com sucesso.',
});`}
        />

        <VariantSection
          title="Com ação"
          preview={
            <Button
              onClick={() =>
                showColoredToast({
                  color: 'warning',
                  tone: 'soft',
                  title: 'Item movido',
                  description: 'O item foi movido para a lixeira.',
                  action: (
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Desfazer
                    </Button>
                  ),
                })
              }
            >
              Mostrar toast com ação
            </Button>
          }
          code={`showColoredToast({
  color: 'warning',
  title: 'Item movido',
  description: 'Movido para a lixeira.',
  action: <Button size="sm" variant="outline">Desfazer</Button>,
});`}
        />

        <PropsTable
          rows={[
            { name: 'color', type: '"primary" | "secondary" | "success" | "warning" | "alert" | "info" | "destructive" | …', default: '"info"', description: 'Cor semântica.' },
            { name: 'tone', type: '"solid" | "soft" | "outline"', default: '"soft"', description: 'Tom visual.' },
            { name: 'title', type: 'ReactNode', description: 'Título em destaque.' },
            { name: 'description', type: 'ReactNode', description: 'Texto explicativo.' },
            { name: 'icon', type: 'LucideIcon | null', description: 'Ícone customizado. null oculta.' },
            { name: 'action', type: 'ReactNode', description: 'Botão/elemento de ação inline.' },
            { name: 'duration', type: 'number', default: '4000', description: 'Tempo (ms) até auto-fechar.' },
            { name: 'dismissible', type: 'boolean', default: 'true', description: 'Mostra botão X de fechar.' },
          ]}
        />
      </DocSection>

      <DocSection
        title="ToastAlert (estático)"
        description="Renderiza o card visual sem depender do Sonner — útil para previews ou stacks próprios."
      >
        <VariantSection
          title="Estático"
          preview={
            <div className="space-y-3 max-w-md">
              <ToastAlert color="success" title="Salvo" description="Pedido #4821 atualizado." />
              <ToastAlert color="destructive" tone="solid" title="Falha" description="Não foi possível conectar." />
              <ToastAlert color="info" tone="outline" title="Sincronização" description="Próxima execução em 5 min." />
            </div>
          }
          code={`<ToastAlert color="success" title="Salvo" description="..." />
<ToastAlert color="destructive" tone="solid" title="Falha" description="..." />`}
        />
      </DocSection>

      <UsageNote type="tip">
        Para alertas inline em formulários use <strong>InlineAlert</strong> (página Alerts). Para
        banners em topo de página use <strong>BannerAlert</strong>.
      </UsageNote>
    </ComponentDoc>
  );
}
