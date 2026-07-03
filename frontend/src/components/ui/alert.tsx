import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { type BadgeColor as AlertColor, type BadgeTone as AlertTone, badgeColorClasses } from "@/components/ui/badge";

/**
 * Alert primitivo expandido.
 * - API legada: `variant` ('default' | 'destructive')
 * - API recomendada: `color` (10 cores semânticas) + `tone` ('solid' | 'soft' | 'outline')
 *
 * Tons:
 * - solid: fundo sólido, texto contraste
 * - soft: fundo suave + texto colorido (default — mais legível em ERP)
 * - outline: borda colorida, fundo transparente
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const SOLID_BY_COLOR: Record<AlertColor, string> = {
  primary: 'border-transparent bg-primary text-primary-foreground [&>svg]:text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground [&>svg]:text-secondary-foreground',
  tertiary: 'border-transparent bg-tertiary text-tertiary-foreground [&>svg]:text-tertiary-foreground',
  accent: 'border-transparent bg-accent text-accent-foreground [&>svg]:text-accent-foreground',
  success: 'border-transparent bg-success text-success-foreground [&>svg]:text-success-foreground',
  warning: 'border-transparent bg-warning text-warning-foreground [&>svg]:text-warning-foreground',
  alert: 'border-transparent bg-alert text-alert-foreground [&>svg]:text-alert-foreground',
  info: 'border-transparent bg-info text-info-foreground [&>svg]:text-info-foreground',
  destructive: 'border-transparent bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
  neutral: 'border-transparent bg-muted text-muted-foreground [&>svg]:text-muted-foreground',
};

const SOFT_BY_COLOR: Record<AlertColor, string> = {
  primary: 'bg-primary/10 text-primary border-primary/30 [&>svg]:text-primary',
  secondary: 'bg-secondary/10 text-secondary border-secondary/30 [&>svg]:text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary border-tertiary/30 [&>svg]:text-tertiary',
  accent: 'bg-accent/10 text-accent border-accent/30 [&>svg]:text-accent',
  success: 'bg-success/10 text-success border-success/30 [&>svg]:text-success',
  warning: 'bg-warning/10 text-warning border-warning/30 [&>svg]:text-warning',
  alert: 'bg-alert/10 text-alert border-alert/30 [&>svg]:text-alert',
  info: 'bg-info/10 text-info border-info/30 [&>svg]:text-info',
  destructive: 'bg-destructive/10 text-destructive border-destructive/30 [&>svg]:text-destructive',
  neutral: 'bg-muted text-muted-foreground border-border [&>svg]:text-muted-foreground',
};

const OUTLINE_BY_COLOR: Record<AlertColor, string> = {
  primary: 'border-primary text-primary bg-transparent [&>svg]:text-primary',
  secondary: 'border-secondary text-secondary bg-transparent [&>svg]:text-secondary',
  tertiary: 'border-tertiary text-tertiary bg-transparent [&>svg]:text-tertiary',
  accent: 'border-accent text-accent bg-transparent [&>svg]:text-accent',
  success: 'border-success text-success bg-transparent [&>svg]:text-success',
  warning: 'border-warning text-warning bg-transparent [&>svg]:text-warning',
  alert: 'border-alert text-alert bg-transparent [&>svg]:text-alert',
  info: 'border-info text-info bg-transparent [&>svg]:text-info',
  destructive: 'border-destructive text-destructive bg-transparent [&>svg]:text-destructive',
  neutral: 'border-border text-muted-foreground bg-transparent [&>svg]:text-muted-foreground',
};

export function alertColorClasses(color: AlertColor, tone: AlertTone = 'soft'): string {
  if (tone === 'solid') return SOLID_BY_COLOR[color];
  if (tone === 'outline') return OUTLINE_BY_COLOR[color];
  return SOFT_BY_COLOR[color];
}

// Re-export for convenience
export type { AlertColor, AlertTone };
// also export aliased names so badge helper stays untouched
export { badgeColorClasses as _badgeColorClasses };

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Cor semântica do design system. Quando definido, sobrepõe `variant`. */
  color?: AlertColor;
  /** Tom da cor: solid | soft | outline. Default: 'soft'. */
  tone?: AlertTone;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, color, tone = 'soft', ...props }, ref) => {
    if (color) {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(
            'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
            alertColorClasses(color, tone),
            className,
          )}
          {...props}
        />
      );
    }
    return <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm opacity-90 [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
