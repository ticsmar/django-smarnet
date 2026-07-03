import * as React from 'react';
import { cn } from '@/lib/utils';
import { FormFieldStatus } from './FormField';

export interface FloatingLabelSelectOption {
  value: string;
  label: string;
}

export interface FloatingLabelSelectProps
  extends Omit<React.ComponentProps<'select'>, 'size'> {
  label: string;
  options: FloatingLabelSelectOption[] | string[];
  error?: React.ReactNode;
  hint?: React.ReactNode;
  status?: FormFieldStatus;
  containerClassName?: string;
}

/**
 * Select com label flutuante. Mesmo padrão visual do FloatingLabelInput.
 */
export const FloatingLabelSelect = React.forwardRef<
  HTMLSelectElement,
  FloatingLabelSelectProps
>(
  (
    {
      id: idProp,
      label,
      options,
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

    const normalizedOptions: FloatingLabelSelectOption[] = options.map((o) =>
      typeof o === 'string' ? { value: o, label: o } : o,
    );

    return (
      <div className={cn('space-y-1', containerClassName)}>
        <div className="relative">
          <select
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
              'peer w-full h-12 px-3 pt-4 pb-1 rounded-md border bg-background text-foreground text-sm transition-all outline-none appearance-none',
              borderClass,
              disabled && 'opacity-50 cursor-not-allowed bg-muted/30',
              className,
            )}
            {...props}
          >
            <option value="" />
            {normalizedOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          <label
            htmlFor={id}
            className={cn(
              'absolute left-3 transition-all pointer-events-none',
              hasValue || focused
                ? 'top-1 text-[10px] font-bold'
                : 'top-3.5 text-sm text-muted-foreground',
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
FloatingLabelSelect.displayName = 'FloatingLabelSelect';
