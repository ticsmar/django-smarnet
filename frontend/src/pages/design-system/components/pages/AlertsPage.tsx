import { BannerAlert, InlineAlert, ToastAlert } from '@/components/ui/alerts';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote } from '../_docs';

export default function AlertsPage() {
  return (
    <ComponentDoc
      summary="Três componentes de alerta com 10 cores semânticas e 3 tons (solid, soft, outline): BannerAlert (full-width com ações), InlineAlert (chip compacto) e ToastAlert (notificação visual estática)."
      importPath="@/components/ui/alerts"
    >
      <DocSection title="BannerAlert" description="Banner full-width com título, descrição e ações.">
        <VariantSection
          title="Variantes principais"
          preview={
            <div className="space-y-3">
              <BannerAlert
                color="info"
                title="Manutenção programada"
                description="O sistema ficará indisponível das 02:00 às 04:00 de domingo."
                actions={[{ label: 'Ver detalhes', onClick: () => {} }]}
                dismissible
              />
              <BannerAlert
                color="success"
                title="Pedido faturado"
                description="A NF-e #4821 foi emitida com sucesso."
              />
              <BannerAlert
                color="warning"
                title="Estoque baixo"
                description="O SKU-203 está abaixo do mínimo configurado."
                tone="solid"
              />
              <BannerAlert
                color="destructive"
                title="Falha na sincronização"
                description="Não foi possível sincronizar com o ERP externo."
                tone="outline"
              />
            </div>
          }
          code={`<BannerAlert
  color="info"
  title="Manutenção programada"
  description="O sistema ficará indisponível das 02:00 às 04:00."
  actions={[{ label: 'Ver detalhes', onClick: handleClick }]}
  dismissible
/>`}
        />
        <PropsTable
          rows={[
            { name: 'color', type: '"primary" | "secondary" | "success" | "warning" | "alert" | "info" | "destructive" | …', default: '"info"', description: 'Cor semântica.' },
            { name: 'tone', type: '"solid" | "soft" | "outline"', default: '"soft"', description: 'Tom visual.' },
            { name: 'title / description', type: 'ReactNode', description: 'Conteúdos textuais.' },
            { name: 'icon', type: 'LucideIcon | null', description: 'Ícone customizado. null oculta.' },
            { name: 'actions', type: 'BannerAlertAction[]', description: '[{ label, onClick, variant? }]' },
            { name: 'dismissible', type: 'boolean', default: 'false', description: 'Habilita botão de fechar.' },
            { name: 'onDismiss', type: '() => void', description: 'Callback ao fechar.' },
          ]}
        />
      </DocSection>

      <DocSection title="InlineAlert" description="Chip compacto inline para feedback em formulários.">
        <VariantSection
          title="Inline chips"
          preview={
            <div className="flex flex-wrap gap-2">
              <InlineAlert color="info">Sincronização em andamento</InlineAlert>
              <InlineAlert color="success">Salvo automaticamente</InlineAlert>
              <InlineAlert color="warning">Não publicado</InlineAlert>
              <InlineAlert color="destructive">Falha de conexão</InlineAlert>
              <InlineAlert color="primary" tone="solid">Novidade</InlineAlert>
            </div>
          }
          code={`<InlineAlert color="info">Sincronização em andamento</InlineAlert>
<InlineAlert color="success">Salvo automaticamente</InlineAlert>
<InlineAlert color="warning">Não publicado</InlineAlert>`}
        />
      </DocSection>

      <DocSection title="ToastAlert" description="Card de notificação visual (sem stack próprio).">
        <VariantSection
          title="Variantes"
          preview={
            <div className="space-y-3 max-w-md">
              <ToastAlert color="success" title="Salvo" description="Alterações persistidas." />
              <ToastAlert color="info" tone="soft" title="Info" description="Nova versão disponível." />
              <ToastAlert color="destructive" tone="solid" title="Erro" description="Falha ao processar." />
            </div>
          }
          code={`<ToastAlert color="success" title="Salvo" description="..." />
<ToastAlert color="destructive" tone="solid" title="Erro" description="..." />`}
        />
      </DocSection>

      <UsageNote type="tip">
        Para disparar toasts dinamicamente (com stack/posição), use{' '}
        <strong>showColoredToast</strong> na página <strong>Toasts &amp; Sonner</strong>.
      </UsageNote>
    </ComponentDoc>
  );
}
