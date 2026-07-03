import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Button } from '@/components/ui/button';
import { ColoredToast, showColoredToast } from '@/components/ui/toasts';
import type { AlertColor, AlertTone } from '@/components/ui/alert';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Sparkles,
  Layers,
  Palette,
  Zap,
  Bell,
  Circle,
} from 'lucide-react';

const COLORS: { color: AlertColor; label: string; icon: typeof Info }[] = [
  { color: 'primary', label: 'Primary', icon: Sparkles },
  { color: 'secondary', label: 'Secondary', icon: Layers },
  { color: 'tertiary', label: 'Tertiary', icon: Palette },
  { color: 'accent', label: 'Accent', icon: Zap },
  { color: 'success', label: 'Success', icon: CheckCircle2 },
  { color: 'warning', label: 'Warning', icon: AlertTriangle },
  { color: 'alert', label: 'Alert', icon: Bell },
  { color: 'info', label: 'Info', icon: Info },
  { color: 'destructive', label: 'Destructive', icon: XCircle },
  { color: 'neutral', label: 'Neutral', icon: Circle },
];

const TONES: AlertTone[] = ['solid', 'soft', 'outline'];

const SAMPLE_TITLE: Record<AlertColor, string> = {
  primary: 'Operação concluída',
  secondary: 'Atualização disponível',
  tertiary: 'Nova mensagem',
  accent: 'Destaque',
  success: 'Sucesso!',
  warning: 'Atenção',
  alert: 'Alerta crítico',
  info: 'Informação',
  destructive: 'Erro',
  neutral: 'Notificação',
};

const SAMPLE_DESC: Record<AlertColor, string> = {
  primary: 'A ação principal foi executada com sucesso.',
  secondary: 'Uma nova versão do sistema está pronta.',
  tertiary: 'Você recebeu uma nova mensagem do time.',
  accent: 'Confira as novidades disponíveis.',
  success: 'Registro salvo com sucesso no sistema.',
  warning: 'Verifique os campos obrigatórios.',
  alert: 'Falha grave detectada — ação imediata necessária.',
  info: 'Os dados foram atualizados.',
  destructive: 'Não foi possível processar a requisição.',
  neutral: 'Atualização discreta do sistema.',
};

export default function ToastsShowcase() {
  return (
    <UIShowcaseLayout
      title="Toasts"
      description="Notificações temporárias com 10 cores semânticas e 3 tons (solid, soft, outline)."
    >
      {/* DEMO INTERATIVO */}
      <ShowcaseSection title="Disparar toasts (Sonner)">
        <p className="text-xs text-muted-foreground mb-3">
          Clique nos botões abaixo para disparar um toast usando o helper{' '}
          <code className="text-foreground">showColoredToast</code>.
        </p>

        {TONES.map((tone) => (
          <div key={tone} className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Tom: {tone}
            </h4>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(({ color, label, icon: Icon }) => (
                <Button
                  key={`${tone}-${color}`}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    showColoredToast({
                      color,
                      tone,
                      icon: Icon,
                      title: SAMPLE_TITLE[color],
                      description: SAMPLE_DESC[color],
                    })
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </ShowcaseSection>

      {/* GRID VISUAL ESTÁTICO */}
      <ShowcaseSection title="Matriz visual — Cores × Tons">
        <div className="space-y-6">
          {TONES.map((tone) => (
            <div key={tone}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Tom: {tone}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COLORS.map(({ color, label, icon: Icon }) => (
                  <ColoredToast
                    key={`${tone}-${color}`}
                    color={color}
                    tone={tone}
                    icon={Icon}
                    title={`${label} — ${SAMPLE_TITLE[color]}`}
                    description={SAMPLE_DESC[color]}
                    dismissible={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* EXEMPLO COM AÇÃO */}
      <ShowcaseSection title="Toast com ação">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              showColoredToast({
                color: 'destructive',
                tone: 'soft',
                title: 'Registro excluído',
                description: 'O cliente foi removido com sucesso.',
                action: (
                  <button
                    type="button"
                    onClick={() =>
                      showColoredToast({
                        color: 'success',
                        tone: 'soft',
                        title: 'Ação desfeita',
                        description: 'O registro foi restaurado.',
                      })
                    }
                    className="text-xs font-semibold underline-offset-2 hover:underline"
                  >
                    Desfazer
                  </button>
                ),
              })
            }
          >
            Excluir com Desfazer
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              showColoredToast({
                color: 'success',
                tone: 'solid',
                title: 'Pedido aprovado',
                description: 'O pedido #1024 foi aprovado e enviado para produção.',
              })
            }
          >
            Sucesso (solid)
          </Button>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
