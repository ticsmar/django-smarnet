import * as React from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface FormSwitchProps extends Omit<React.ComponentProps<typeof Switch>, 'id'> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  /** Layout: inline (label + switch) ou row (label à esquerda, switch à direita em card) */
  variant?: 'inline' | 'row';
  className?: string;
}

export const FormSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  FormSwitchProps
>(({ id: idProp, label, description, error, variant = 'inline', className, ...props }, ref) => {
  const reactId = React.useId();
  const id = idProp ?? reactId;

  if (variant === 'row') {
    return (
      <div
        className={cn(
          'flex items-center justify-between gap-4 p-3 rounded-xl bg-background border border-border/40',
          props.disabled && 'opacity-60',
          error && 'border-destructive',
          className,
        )}
      >
        <div className="min-w-0">
          {label && (
            <Label htmlFor={id} className="text-sm font-semibold text-foreground cursor-pointer">
              {label}
            </Label>
          )}
          {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
          {error && <p className="text-[11px] text-destructive mt-0.5">{error}</p>}
        </div>
        <Switch id={id} ref={ref} {...props} />
      </div>
    );
  }

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Switch id={id} ref={ref} {...props} />
      <div className="flex-1 min-w-0">
        {label && (
          <Label htmlFor={id} className="text-sm cursor-pointer leading-tight">
            {label}
          </Label>
        )}
        {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
        {error && <p className="text-[11px] text-destructive mt-0.5">{error}</p>}
      </div>
    </div>
  );
});
FormSwitch.displayName = 'FormSwitch';
