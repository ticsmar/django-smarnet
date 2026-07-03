import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge primitivo com suporte a:
 * - 14 variantes legadas/diretas (default, secondary, destructive, outline + 9 cores semânticas em cada tom)
 * - API recomendada: usar `color` + `tone` (mais expressiva)
 *
 * Tons:
 * - solid: cor preenchida, texto contraste
 * - soft: fundo /10, texto na cor, borda /20 (estado/etiqueta)
 * - outline: borda na cor, texto na cor, sem fundo
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Legado / atalhos
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",

        // Solid (preenchido)
        primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        tertiary: "border-transparent bg-tertiary text-tertiary-foreground hover:bg-tertiary/80",
        accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        alert: "border-transparent bg-alert text-alert-foreground hover:bg-alert/80",
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeColor =
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

export type BadgeTone = 'solid' | 'soft' | 'outline';

const SOLID_BY_COLOR: Record<BadgeColor, string> = {
  primary: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  tertiary: 'border-transparent bg-tertiary text-tertiary-foreground',
  accent: 'border-transparent bg-accent text-accent-foreground',
  success: 'border-transparent bg-success text-success-foreground',
  warning: 'border-transparent bg-warning text-warning-foreground',
  alert: 'border-transparent bg-alert text-alert-foreground',
  info: 'border-transparent bg-info text-info-foreground',
  destructive: 'border-transparent bg-destructive text-destructive-foreground',
  neutral: 'border-transparent bg-muted text-muted-foreground',
};

const SOFT_BY_COLOR: Record<BadgeColor, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  tertiary: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  alert: 'bg-alert/10 text-alert border-alert/20',
  info: 'bg-info/10 text-info border-info/20',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  neutral: 'bg-muted text-muted-foreground border-border',
};

const OUTLINE_BY_COLOR: Record<BadgeColor, string> = {
  primary: 'border-primary text-primary bg-transparent',
  secondary: 'border-secondary text-secondary bg-transparent',
  tertiary: 'border-tertiary text-tertiary bg-transparent',
  accent: 'border-accent text-accent bg-transparent',
  success: 'border-success text-success bg-transparent',
  warning: 'border-warning text-warning bg-transparent',
  alert: 'border-alert text-alert bg-transparent',
  info: 'border-info text-info bg-transparent',
  destructive: 'border-destructive text-destructive bg-transparent',
  neutral: 'border-border text-muted-foreground bg-transparent',
};

export function badgeColorClasses(color: BadgeColor, tone: BadgeTone = 'soft'): string {
  if (tone === 'solid') return SOLID_BY_COLOR[color];
  if (tone === 'outline') return OUTLINE_BY_COLOR[color];
  return SOFT_BY_COLOR[color];
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Cor semântica do design system. Quando definido, sobrepõe `variant`. */
  color?: BadgeColor;
  /** Tom da cor: solid | soft | outline. Default: 'soft' quando `color` é usado. */
  tone?: BadgeTone;
}

function Badge({ className, variant, color, tone = 'soft', ...props }: BadgeProps) {
  // Modo novo: color + tone
  if (color) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          badgeColorClasses(color, tone),
          className,
        )}
        {...props}
      />
    );
  }

  // Modo legado: variant
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
