import * as React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface FormCheckboxProps
  extends Omit<React.ComponentProps<typeof Checkbox>, 'id'> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  /** Layout em "card" — usa surface elevada */
  variant?: 'inline' | 'card';
  className?: string;
}

export const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  FormCheckboxProps
>(({ id: idProp, label, description, error, variant = 'inline', className, ...props }, ref) => {
  const reactId = React.useId();
  const id = idProp ?? reactId;

  if (variant === 'card') {
    return (
      <label
        htmlFor={id}
        className={cn(
          'flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-background hover:bg-muted/30 transition-colors cursor-pointer',
          props.disabled && 'opacity-60 cursor-not-allowed',
          error && 'border-destructive',
          className,
        )}
      >
        <Checkbox id={id} ref={ref} className="mt-0.5" {...props} />
        <div className="flex-1 min-w-0">
          {label && <p className="text-sm font-medium text-foreground">{label}</p>}
          {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
          {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
        </div>
      </label>
    );
  }

  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <Checkbox id={id} ref={ref} className="mt-0.5" {...props} />
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
FormCheckbox.displayName = 'FormCheckbox';
