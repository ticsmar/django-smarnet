import { ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Cores semânticas suportadas pelo AccentCard.
 * Cobre todas as 10 cores do design system.
 */
export type AccentColor =
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
 * Tom visual do acento:
 * - solid: borda lateral espessa + fundo sólido na cor (alto destaque)
 * - soft: borda lateral + fundo suave /5 na cor (destaque moderado — default)
 * - outline: apenas borda lateral colorida, fundo do card padrão (destaque sutil)
 */
export type AccentTone = 'solid' | 'soft' | 'outline';

const BORDER_BY_COLOR: Record<AccentColor, string> = {
  primary: 'border-l-primary',
  secondary: 'border-l-secondary',
  tertiary: 'border-l-tertiary',
  accent: 'border-l-accent',
  success: 'border-l-success',
  warning: 'border-l-warning',
  alert: 'border-l-alert',
  info: 'border-l-info',
  destructive: 'border-l-destructive',
  neutral: 'border-l-muted-foreground',
};

const SOLID_BG_BY_COLOR: Record<AccentColor, string> = {
  primary: 'bg-primary text-primary-foreground border-primary',
  secondary: 'bg-secondary text-secondary-foreground border-secondary',
  tertiary: 'bg-tertiary text-tertiary-foreground border-tertiary',
  accent: 'bg-accent text-accent-foreground border-accent',
  success: 'bg-success text-success-foreground border-success',
  warning: 'bg-warning text-warning-foreground border-warning',
  alert: 'bg-alert text-alert-foreground border-alert',
  info: 'bg-info text-info-foreground border-info',
  destructive: 'bg-destructive text-destructive-foreground border-destructive',
  neutral: 'bg-muted text-muted-foreground border-border',
};

const SOFT_BG_BY_COLOR: Record<AccentColor, string> = {
  primary: 'bg-primary/5',
  secondary: 'bg-secondary/5',
  tertiary: 'bg-tertiary/5',
  accent: 'bg-accent/5',
  success: 'bg-success/5',
  warning: 'bg-warning/5',
  alert: 'bg-alert/5',
  info: 'bg-info/5',
  destructive: 'bg-destructive/5',
  neutral: 'bg-muted/40',
};

export interface AccentCardProps {
  title: string;
  description?: string;
  /** Cor semântica do acento. Default: 'secondary'. */
  accent?: AccentColor;
  /** Tom do acento: solid | soft | outline. Default: 'soft'. */
  tone?: AccentTone;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AccentCard({
  title,
  description,
  accent = 'secondary',
  tone = 'soft',
  children,
  footer,
  className,
}: AccentCardProps) {
  const toneClasses =
    tone === 'solid'
      ? cn('border-l-4', SOLID_BG_BY_COLOR[accent])
      : tone === 'soft'
        ? cn('border-l-4', BORDER_BY_COLOR[accent], SOFT_BG_BY_COLOR[accent])
        : cn('border-l-4', BORDER_BY_COLOR[accent]);

  // Em solid, o texto usa cor de contraste; descrição precisa ficar legível.
  const descClass = tone === 'solid' ? 'opacity-90' : undefined;

  return (
    <Card className={cn(toneClasses, className)}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && (
          <CardDescription className={cn(tone === 'solid' && 'text-current', descClass)}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
