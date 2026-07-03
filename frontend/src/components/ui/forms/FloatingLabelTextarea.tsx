import * as React from 'react';
import { cn } from '@/lib/utils';
import { FormFieldStatus } from './FormField';

export interface FloatingLabelTextareaProps
  extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  label: string;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  status?: FormFieldStatus;
  containerClassName?: string;
}

/**
 * Textarea com label flutuante. Mesmo padrão visual do FloatingLabelInput.
 */
export const FloatingLabelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(
  (
    {
      id: idProp,
      label,
      error,
      hint,
      status,
      className,
      containerClassName,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      disabled,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<string>(
      typeof defaultValue === 'string' ? defaultValue : '',
    );
    const [focused, setFocused] = React.useState(false);
    const current = isControlled ? String(value ?? '') : internal;
    const hasValue = current.length > 0;

    const computedStatus: FormFieldStatus =
      status ?? (error ? 'error' : 'default');
    const borderClass =
      computedStatus === 'error'
        ? 'border-destructive ring-destructive/20'
        : focused
        ? 'border-secondary ring-2 ring-secondary/20'
        : 'border-input';

    return (
      <div className={cn('space-y-1', containerClassName)}>
        <div className="relative">
          <textarea
            id={id}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            onChange={(e) => {
              if (!isControlled) setInternal(e.target.value);
              onChange?.(e);
            }}
            className={cn(
              'peer w-full min-h-[100px] px-3 pt-5 pb-2 rounded-md border bg-background text-foreground text-sm transition-all outline-none resize-y',
              borderClass,
              disabled && 'opacity-50 cursor-not-allowed bg-muted/30',
              className,
            )}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              'absolute left-3 transition-all pointer-events-none',
              hasValue || focused
                ? 'top-1 text-[10px] font-bold'
                : 'top-3 text-sm text-muted-foreground',
              (hasValue || focused) &&
                computedStatus === 'error' &&
                'text-destructive',
              (hasValue || focused) &&
                computedStatus !== 'error' &&
                'text-secondary',
            )}
          >
            {label}
          </label>
        </div>
        {error ? (
          <p className="text-[11px] text-destructive">{error}</p>
        ) : hint ? (
          <p className="text-[11px] text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    );
  },
);
FloatingLabelTextarea.displayName = 'FloatingLabelTextarea';
