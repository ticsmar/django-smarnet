import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Panel, PanelColor, PanelTone } from './Panel';

export interface StatPanelProps {
  title: string;
  value: string | number;
  delta?: string;
  helper?: string;
  color?: PanelColor;
  tone?: PanelTone;
  icon?: LucideIcon;
  className?: string;
}

/**
 * Painel especializado para exibir uma métrica/KPI com header colorido.
 */
export function StatPanel({
  title,
  value,
  delta,
  helper,
  color = 'primary',
  tone = 'soft',
  icon,
  className,
}: StatPanelProps) {
  return (
    <Panel title={title} color={color} tone={tone} icon={icon} className={className}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-2xl font-bold leading-none text-foreground">{value}</div>
          {helper && (
            <div className="text-xs text-muted-foreground mt-1">{helper}</div>
          )}
        </div>
        {delta && (
          <span
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              delta.startsWith('-')
                ? 'bg-destructive/10 text-destructive'
                : 'bg-success/10 text-success',
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </Panel>
  );
}
