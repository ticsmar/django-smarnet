import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormFieldShell, FormFieldStatus } from './FormField';

export type InputGroupSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<InputGroupSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

/* ------------------------------------------------------------------ */
/*  InputGroupAddon — texto ou ícone estático colado ao input          */
/* ------------------------------------------------------------------ */
export interface InputGroupAddonProps {
  children: React.ReactNode;
  position?: 'start' | 'end';
  size?: InputGroupSize;
  className?: string;
}

export function InputGroupAddon({
  children,
  position = 'start',
  size = 'md',
  className,
}: InputGroupAddonProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 border border-input bg-muted/40 text-muted-foreground font-medium shrink-0',
        position === 'start'
          ? 'rounded-l-md border-r-0'
          : 'rounded-r-md border-l-0',
        size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  InputGroupButton — botão colado ao input                           */
/* ------------------------------------------------------------------ */
export interface InputGroupButtonProps {
  children: React.ReactNode;
  position?: 'start' | 'end';
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  onClick?: () => void;
  className?: string;
}

export function InputGroupButton({
  children,
  position = 'end',
  variant = 'default',
  onClick,
  className,
}: InputGroupButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      onClick={onClick}
      className={cn(
        position === 'start' ? 'rounded-r-none' : 'rounded-l-none',
        className,
      )}
    >
      {children}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  InputGroup — composição do input com addons/botões                  */
/* ------------------------------------------------------------------ */
export interface InputGroupProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'prefix'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  size?: InputGroupSize;
  /** Elementos à esquerda (InputGroupAddon ou InputGroupButton) */
  prepend?: React.ReactNode;
  /** Elementos à direita */
  append?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      id: idProp,
      label,
      description,
      hint,
      error,
      success,
      required,
      status,
      size = 'md',
      prepend,
      append,
      className,
      containerClassName,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const computedStatus: FormFieldStatus =
      status ?? (error ? 'error' : success ? 'success' : 'default');

    const stateBorder =
      computedStatus === 'error'
        ? 'border-destructive focus-visible:ring-destructive'
        : computedStatus === 'success'
        ? 'border-status-success focus-visible:ring-status-success'
        : '';

    return (
      <FormFieldShell
        id={id}
        label={label}
        required={required}
        description={description}
        hint={hint}
        error={error}
        success={success}
        status={computedStatus}
      >
        <div className={cn('flex w-full', containerClassName)}>
          {prepend}
          <Input
            id={id}
            ref={ref}
            className={cn(
              sizeClasses[size],
              stateBorder,
              prepend && 'rounded-l-none',
              append && 'rounded-r-none',
              inputClassName,
              className,
            )}
            aria-invalid={computedStatus === 'error' || undefined}
            {...props}
          />
          {append}
        </div>
      </FormFieldShell>
    );
  },
);
InputGroup.displayName = 'InputGroup';
