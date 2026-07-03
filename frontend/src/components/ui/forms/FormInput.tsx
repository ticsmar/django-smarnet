import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { FormFieldShell, FormFieldStatus } from './FormField';

export type FormInputSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<FormInputSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

const padForIcon: Record<FormInputSize, { left: string; right: string }> = {
  sm: { left: 'pl-8', right: 'pr-8' },
  md: { left: 'pl-9', right: 'pr-9' },
  lg: { left: 'pl-10', right: 'pr-10' },
};

const iconOffset: Record<FormInputSize, string> = {
  sm: 'left-2.5',
  md: 'left-3',
  lg: 'left-3',
};
const iconOffsetRight: Record<FormInputSize, string> = {
  sm: 'right-2.5',
  md: 'right-3',
  lg: 'right-3',
};

export interface FormInputProps extends Omit<React.ComponentProps<'input'>, 'size' | 'prefix'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  optionalLabel?: string;
  status?: FormFieldStatus;
  size?: FormInputSize;
  /** Ícone à esquerda dentro do input */
  startIcon?: React.ReactNode;
  /** Ícone/elemento à direita dentro do input */
  endIcon?: React.ReactNode;
  /** Texto/elemento como prefixo "addon" (fora do input, com borda compartilhada) */
  prefix?: React.ReactNode;
  /** Texto/elemento como sufixo "addon" */
  suffix?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id: idProp,
      label,
      description,
      hint,
      error,
      success,
      required,
      optionalLabel,
      status,
      size = 'md',
      startIcon,
      endIcon,
      prefix,
      suffix,
      className,
      containerClassName,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

    const stateBorder =
      computedStatus === 'error'
        ? 'border-destructive focus-visible:ring-destructive'
        : computedStatus === 'success'
        ? 'border-status-success focus-visible:ring-status-success'
        : computedStatus === 'warning'
        ? 'border-status-warning focus-visible:ring-status-warning'
        : '';

    const inputEl = (
      <Input
        id={id}
        ref={ref}
        className={cn(
          sizeClasses[size],
          stateBorder,
          startIcon && padForIcon[size].left,
          endIcon && padForIcon[size].right,
          prefix && 'rounded-l-none',
          suffix && 'rounded-r-none',
          inputClassName,
          className,
        )}
        aria-invalid={computedStatus === 'error' || undefined}
        {...props}
      />
    );

    const wrapped =
      startIcon || endIcon ? (
        <div className="relative">
          {startIcon && (
            <span className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none', iconOffset[size])}>
              {startIcon}
            </span>
          )}
          {inputEl}
          {endIcon && (
            <span className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconOffsetRight[size])}>
              {endIcon}
            </span>
          )}
        </div>
      ) : (
        inputEl
      );

    const withAddons =
      prefix || suffix ? (
        <div className={cn('flex w-full', containerClassName)}>
          {prefix && (
            <span
              className={cn(
                'inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted/40 text-muted-foreground font-medium',
                size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
              )}
            >
              {prefix}
            </span>
          )}
          {wrapped}
          {suffix && (
            <span
              className={cn(
                'inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted/40 text-muted-foreground font-medium',
                size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
              )}
            >
              {suffix}
            </span>
          )}
        </div>
      ) : (
        <div className={containerClassName}>{wrapped}</div>
      );

    return (
      <FormFieldShell
        id={id}
        label={label}
        required={required}
        optionalLabel={optionalLabel}
        description={description}
        hint={hint}
        error={error}
        success={success}
        status={computedStatus}
      >
        {withAddons}
      </FormFieldShell>
    );
  },
);
FormInput.displayName = 'FormInput';
