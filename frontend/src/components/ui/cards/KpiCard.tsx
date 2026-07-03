import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type KpiTrend = 'up' | 'down' | 'neutral';

export interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: KpiTrend;
  comparisonLabel?: string;
  icon?: LucideIcon;
  /** Cor do ícone — use tokens semânticos (text-primary, text-secondary, text-tertiary, text-status-success...) */
  iconColor?: string;
  className?: string;
}

export function KpiCard({
  label,
  value,
  change,
  trend = 'neutral',
  comparisonLabel = 'vs mês anterior',
  icon: Icon,
  iconColor = 'text-primary',
  className,
}: KpiCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;
  const trendColor =
    trend === 'up'
      ? 'text-status-success'
      : trend === 'down'
        ? 'text-destructive'
        : 'text-muted-foreground';

  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-display font-bold text-foreground mt-1">{value}</p>
          </div>
          {Icon && (
            <div
              className={cn(
                'w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center',
                iconColor,
              )}
            >
              <Icon size={18} />
            </div>
          )}
        </div>
        {change && (
          <div className="flex items-center gap-1 mt-3">
            {TrendIcon && <TrendIcon size={12} className={trendColor} />}
            <span className={cn('text-xs font-semibold', trendColor)}>{change}</span>
            {comparisonLabel && (
              <span className="text-xs text-muted-foreground">{comparisonLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
