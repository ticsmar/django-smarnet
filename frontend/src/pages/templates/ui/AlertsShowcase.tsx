import { useState } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, Bell, Sparkles, Rocket } from 'lucide-react';
import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Alert, AlertTitle, AlertDescription, type AlertColor, type AlertTone } from '@/components/ui/alert';
import { InlineAlert, BannerAlert, ToastAlert } from '@/components/ui/alerts';
import { Button } from '@/components/ui/button';

const COLORS: AlertColor[] = ['primary', 'secondary', 'tertiary', 'accent', 'success', 'warning', 'alert', 'info', 'destructive', 'neutral'];
const TONES: AlertTone[] = ['solid', 'soft', 'outline'];

const COLOR_LABELS: Record<AlertColor, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary',
  accent: 'Accent',
  success: 'Sucesso',
  warning: 'Aviso',
  alert: 'Alerta',
  info: 'Info',
  destructive: 'Erro',
  neutral: 'Neutro',
};

export default function AlertsShowcase() {
  const [tone, setTone] = useState<AlertTone>('soft');
  const [bannerOpen, setBannerOpen] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; color: AlertColor }[]>([]);

  const pushToast = (color: AlertColor) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, color }]);
  };

  return (
    <UIShowcaseLayout title="Alerts" description="Alertas contextuais com 10 cores semânticas e 3 tons (solid · soft · outline).">
      {/* Tone selector */}
      <ShowcaseSection title="Alert primitivo — todas as cores">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground">Tom:</span>
          {TONES.map(t => (
            <Button
              key={t}
              size="sm"
              variant={tone === t ? 'default' : 'outline'}
              className="h-7 text-xs capitalize"
              onClick={() => setTone(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COLORS.map(color => (
            <Alert key={color} color={color} tone={tone}>
              <Info className="h-4 w-4" />
              <AlertTitle>{COLOR_LABELS[color]}</AlertTitle>
              <AlertDescription>
                Mensagem de exemplo usando <code className="text-[11px] font-mono opacity-80">color="{color}"</code> e <code className="text-[11px] font-mono opacity-80">tone="{tone}"</code>.
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Padrões clássicos (com ícones contextuais)">
        <div className="space-y-3">
          <Alert color="info" tone="soft">
            <Info className="h-4 w-4" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>Sincronização agendada para 02:00.</AlertDescription>
          </Alert>
          <Alert color="success" tone="soft">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>Pedido #4821 faturado com sucesso.</AlertDescription>
          </Alert>
          <Alert color="warning" tone="soft">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>Estoque do SKU-203 abaixo do mínimo.</AlertDescription>
          </Alert>
          <Alert color="destructive" tone="soft">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>Falha ao conectar ao serviço de NFe.</AlertDescription>
          </Alert>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="InlineAlert — feedback compacto em formulário">
        <div className="flex flex-wrap gap-2">
          <InlineAlert color="info">Campo opcional</InlineAlert>
          <InlineAlert color="success">CNPJ válido</InlineAlert>
          <InlineAlert color="warning">Verifique o e-mail</InlineAlert>
          <InlineAlert color="destructive">CEP inválido</InlineAlert>
          <InlineAlert color="neutral">Nenhum filtro aplicado</InlineAlert>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <InlineAlert color="primary" tone="solid">Primary solid</InlineAlert>
          <InlineAlert color="accent" tone="outline">Accent outline</InlineAlert>
          <InlineAlert color="tertiary" tone="solid">Tertiary solid</InlineAlert>
          <InlineAlert color="alert" tone="soft">Alert soft</InlineAlert>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="BannerAlert — anúncios e avisos sistêmicos">
        <div className="space-y-3">
          {bannerOpen && (
            <BannerAlert
              color="info"
              tone="soft"
              icon={Sparkles}
              title="Atualização disponível"
              description="Uma nova versão do SmarNet está disponível com correções de NFe e melhorias de performance."
              actions={[
                { label: 'Atualizar agora', variant: 'default', onClick: () => setBannerOpen(false) },
                { label: 'Mais tarde', variant: 'ghost', onClick: () => setBannerOpen(false) },
              ]}
              dismissible
              onDismiss={() => setBannerOpen(false)}
            />
          )}
          {!bannerOpen && (
            <Button variant="outline" size="sm" onClick={() => setBannerOpen(true)}>
              Mostrar banner novamente
            </Button>
          )}

          <BannerAlert
            color="warning"
            tone="soft"
            title="Estoque crítico"
            description="15 produtos estão com estoque abaixo do mínimo configurado."
            actions={[{ label: 'Ver produtos', onClick: () => {} }]}
          />

          <BannerAlert
            color="primary"
            tone="solid"
            icon={Rocket}
            title="Bem-vindo ao novo módulo de Propostas"
            description="Configure modelos, fluxos de aprovação e envio direto por e-mail."
            actions={[{ label: 'Começar', variant: 'secondary', onClick: () => {} }]}
            dismissible
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ToastAlert — notificações flutuantes">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button size="sm" variant="outline" onClick={() => pushToast('success')}>Disparar sucesso</Button>
          <Button size="sm" variant="outline" onClick={() => pushToast('warning')}>Disparar aviso</Button>
          <Button size="sm" variant="outline" onClick={() => pushToast('destructive')}>Disparar erro</Button>
          <Button size="sm" variant="outline" onClick={() => pushToast('info')}>Disparar info</Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Exemplos estáticos:</p>
          <ToastAlert color="success" title="Backup concluído" description="Todos os dados foram salvos com segurança." />
          <ToastAlert color="info" tone="soft" icon={Bell} title="Nova mensagem" description="Você recebeu uma proposta para revisão." />
          <ToastAlert color="destructive" title="Falha na importação" description="3 linhas com formato inválido foram ignoradas." />
        </div>

        {/* Stack de toasts disparados pelos botões */}
        {toasts.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {toasts.map(t => (
              <ToastAlert
                key={t.id}
                color={t.color}
                title="Notificação"
                description={`Toast disparado (${t.color}). Auto-fecha em 4s.`}
                duration={4000}
                onDismiss={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
              />
            ))}
          </div>
        )}
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
