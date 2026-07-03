import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import {
  Badge,
  StatusBadge,
  CounterBadge,
  TrendBadge,
  type BadgeColor,
} from '@/components/ui/badges';
import { CheckCircle2, Clock, XCircle, AlertTriangle, Star, Zap, Bell, Mail } from 'lucide-react';

const ALL_COLORS: BadgeColor[] = [
  'primary', 'secondary', 'tertiary', 'accent',
  'success', 'warning', 'alert', 'info', 'destructive', 'neutral',
];

export default function BadgeShowcase() {
  return (
    <UIShowcaseLayout
      title="Badge"
      description="Componentes prontos em src/components/ui/badges/ — Badge (com 9 cores × 3 tons), StatusBadge, CounterBadge e TrendBadge."
    >
      {/* ============ BADGE PRIMITIVO ============ */}
      <ShowcaseSection title="Badge — todas as cores no tom solid">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <Badge key={c} color={c} tone="solid">{c}</Badge>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badge — tom soft (recomendado para etiquetas/categorias)">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <Badge key={c} color={c} tone="soft">{c}</Badge>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badge — tom outline">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <Badge key={c} color={c} tone="outline">{c}</Badge>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badge — com ícone">
        <div className="flex flex-wrap gap-2">
          <Badge color="success" tone="solid"><CheckCircle2 size={12} /> Aprovado</Badge>
          <Badge color="warning" tone="soft"><Clock size={12} /> Aguardando</Badge>
          <Badge color="destructive" tone="solid"><XCircle size={12} /> Rejeitado</Badge>
          <Badge color="info" tone="soft"><AlertTriangle size={12} /> Atenção</Badge>
          <Badge color="tertiary" tone="solid"><Star size={12} /> Premium</Badge>
          <Badge color="accent" tone="solid"><Zap size={12} /> Urgente</Badge>
        </div>
      </ShowcaseSection>

      {/* ============ STATUS BADGE ============ */}
      <ShowcaseSection title="StatusBadge — chip de status com dot">
        <div className="flex flex-wrap gap-3">
          <StatusBadge label="Ativo" color="success" pulse />
          <StatusBadge label="Pendente" color="warning" />
          <StatusBadge label="Cancelado" color="destructive" />
          <StatusBadge label="Em análise" color="info" />
          <StatusBadge label="Inativo" color="neutral" />
          <StatusBadge label="Premium" color="tertiary" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="StatusBadge — todos os tons">
        <div className="space-y-2">
          {(['solid', 'soft', 'outline'] as const).map((tone) => (
            <div key={tone} className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground w-16 capitalize">{tone}</span>
              <StatusBadge label="Ativo" color="success" tone={tone} pulse />
              <StatusBadge label="Pendente" color="warning" tone={tone} />
              <StatusBadge label="Cancelado" color="destructive" tone={tone} />
              <StatusBadge label="Info" color="info" tone={tone} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="StatusBadge — sem dot">
        <div className="flex flex-wrap gap-2">
          <StatusBadge label="Aprovado" color="success" showDot={false} />
          <StatusBadge label="Rejeitado" color="destructive" showDot={false} />
        </div>
      </ShowcaseSection>

      {/* ============ COUNTER BADGE ============ */}
      <ShowcaseSection title="CounterBadge — sobreposto a ícones (notificações)">
        <div className="flex items-center gap-6">
          <CounterBadge count={3} position="top-right">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
              <Bell size={18} className="text-muted-foreground" />
            </div>
          </CounterBadge>

          <CounterBadge count={150} position="top-right" color="primary">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
              <Mail size={18} className="text-muted-foreground" />
            </div>
          </CounterBadge>

          <CounterBadge dot position="top-right" color="success">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
              <Star size={18} className="text-muted-foreground" />
            </div>
          </CounterBadge>

          <CounterBadge dot position="bottom-right" color="warning">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
              <Star size={18} className="text-muted-foreground" />
            </div>
          </CounterBadge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="CounterBadge — inline e por cor">
        <div className="flex flex-wrap items-center gap-3">
          {ALL_COLORS.map((c) => (
            <CounterBadge key={c} count={5} color={c} />
          ))}
        </div>
      </ShowcaseSection>

      {/* ============ TREND BADGE ============ */}
      <ShowcaseSection title="TrendBadge — variação percentual (semântica automática)">
        <div className="flex flex-wrap gap-3">
          <TrendBadge value={12.5} />
          <TrendBadge value={-3.2} />
          <TrendBadge value={0} />
          <TrendBadge value={48.1} />
          <TrendBadge value={-15.4} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="TrendBadge — inversão de cores (métricas onde subir é ruim)">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-muted-foreground">Tempo de resposta:</span>
          <TrendBadge value={8.2} invertColors />
          <span className="text-xs text-muted-foreground ml-4">Churn:</span>
          <TrendBadge value={-2.1} invertColors />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="TrendBadge — variantes (sem ícone, tamanho sm, sufixo customizado)">
        <div className="flex flex-wrap items-center gap-3">
          <TrendBadge value={5.3} size="sm" />
          <TrendBadge value={-2.8} size="sm" />
          <TrendBadge value={1200} suffix="" precision={0} />
          <TrendBadge value={-340} suffix=" un" precision={0} />
          <TrendBadge value={9.9} hideIcon />
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
