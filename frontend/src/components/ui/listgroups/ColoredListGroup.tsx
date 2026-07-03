import { ReactNode } from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Cores semânticas suportadas pelo ColoredListGroup.
 * Cobre todas as 10 cores do design system.
 */
export type ListGroupColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'alert'
  | 'info'
  | 'destructive'
  | 'neutral';

/**
 * Tom visual da lista:
 * - solid: itens com fundo sólido na cor (alto destaque)
 * - soft: itens com fundo /5 na cor (default — destaque moderado)
 * - outline: borda colorida + fundo do card (destaque sutil)
 */
export type ListGroupTone = 'solid' | 'soft' | 'outline';

const SOLID_BG: Record<ListGroupColor, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  tertiary: 'bg-tertiary text-tertiary-foreground hover:bg-tertiary/90',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
  success: 'bg-success text-success-foreground hover:bg-success/90',
  warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
  alert: 'bg-alert text-alert-foreground hover:bg-alert/90',
  info: 'bg-info text-info-foreground hover:bg-info/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  neutral: 'bg-muted text-foreground hover:bg-muted/80',
};

const SOFT_BG: Record<ListGroupColor, string> = {
  primary: 'bg-primary/5 hover:bg-primary/10 text-foreground',
  secondary: 'bg-secondary/5 hover:bg-secondary/10 text-foreground',
  tertiary: 'bg-tertiary/5 hover:bg-tertiary/10 text-foreground',
  accent: 'bg-accent/5 hover:bg-accent/10 text-foreground',
  success: 'bg-success/5 hover:bg-success/10 text-foreground',
  warning: 'bg-warning/5 hover:bg-warning/10 text-foreground',
  alert: 'bg-alert/5 hover:bg-alert/10 text-foreground',
  info: 'bg-info/5 hover:bg-info/10 text-foreground',
  destructive: 'bg-destructive/5 hover:bg-destructive/10 text-foreground',
  neutral: 'bg-muted/40 hover:bg-muted/60 text-foreground',
};

const OUTLINE_BG: Record<ListGroupColor, string> = {
  primary: 'hover:bg-primary/5 text-foreground',
  secondary: 'hover:bg-secondary/5 text-foreground',
  tertiary: 'hover:bg-tertiary/5 text-foreground',
  accent: 'hover:bg-accent/5 text-foreground',
  success: 'hover:bg-success/5 text-foreground',
  warning: 'hover:bg-warning/5 text-foreground',
  alert: 'hover:bg-alert/5 text-foreground',
  info: 'hover:bg-info/5 text-foreground',
  destructive: 'hover:bg-destructive/5 text-foreground',
  neutral: 'hover:bg-muted/40 text-foreground',
};

const CONTAINER_BORDER: Record<ListGroupColor, string> = {
  primary: 'border-primary/40',
  secondary: 'border-secondary/40',
  tertiary: 'border-tertiary/40',
  accent: 'border-accent/40',
  success: 'border-success/40',
  warning: 'border-warning/40',
  alert: 'border-alert/40',
  info: 'border-info/40',
  destructive: 'border-destructive/40',
  neutral: 'border-border',
};

const ICON_COLOR: Record<ListGroupColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  accent: 'text-accent-foreground',
  success: 'text-success',
  warning: 'text-warning',
  alert: 'text-alert',
  info: 'text-info',
  destructive: 'text-destructive',
  neutral: 'text-muted-foreground',
};

export interface ListGroupItem {
  label: string;
  description?: string;
  icon?: LucideIcon;
  badge?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ColoredListGroupProps {
  items: ListGroupItem[];
  /** Cor semântica. Default: 'neutral'. */
  color?: ListGroupColor;
  /** Tom: solid | soft | outline. Default: 'soft'. */
  tone?: ListGroupTone;
  /** Mostra chevron à direita em cada item. */
  showChevron?: boolean;
  className?: string;
}

/**
 * Lista agrupada com 10 cores semânticas e 3 tons (solid, soft, outline).
 * Itens compartilham um background colorido sutil (ou sólido) consistente
 * com o restante da biblioteca (Alerts, Cards, Panels).
 */
export function ColoredListGroup({
  items,
  color = 'neutral',
  tone = 'soft',
  showChevron = false,
  className,
}: ColoredListGroupProps) {
  const itemBg =
    tone === 'solid' ? SOLID_BG[color] : tone === 'soft' ? SOFT_BG[color] : OUTLINE_BG[color];

  const containerBorder = CONTAINER_BORDER[color];

  // Em solid, ícones e divisores precisam de contraste contra fundo cheio
  const dividerClass =
    tone === 'solid'
      ? 'border-b border-white/15 last:border-b-0'
      : 'border-b border-border/60 last:border-b-0';

  const iconClass = tone === 'solid' ? 'opacity-90' : ICON_COLOR[color];

  return (
    <div
      className={cn(
        'rounded-xl border overflow-hidden',
        containerBorder,
        className,
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <button
            key={`${item.label}-${i}`}
            type="button"
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors',
              itemBg,
              dividerClass,
              item.disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              {Icon && <Icon size={16} className={cn('shrink-0', iconClass)} />}
              <div className="min-w-0">
                <div className="font-medium truncate">{item.label}</div>
                {item.description && (
                  <div
                    className={cn(
                      'text-xs truncate',
                      tone === 'solid' ? 'opacity-80' : 'text-muted-foreground',
                    )}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.badge}
              {item.trailing}
              {showChevron && (
                <ChevronRight
                  size={14}
                  className={tone === 'solid' ? 'opacity-80' : 'text-muted-foreground'}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
