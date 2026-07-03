import * as React from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormFieldShell, FormFieldStatus } from './FormField';

export interface FormRadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface FormRadioGroupProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  options: FormRadioOption[];
  /** inline = lado a lado; stacked = vertical; cards = cartões selecionáveis */
  variant?: 'stacked' | 'inline' | 'cards';
  columns?: 2 | 3 | 4;
  className?: string;
  name?: string;
  disabled?: boolean;
}

export function FormRadioGroup({
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  value,
  defaultValue,
  onValueChange,
  options,
  variant = 'stacked',
  columns = 3,
  className,
  name,
  disabled,
}: FormRadioGroupProps) {
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');
  const baseId = React.useId();
  const colsClass =
    columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3';

  return (
    <FormFieldShell
      label={label}
      required={required}
      description={description}
      hint={hint}
      error={error}
      success={success}
      status={computedStatus}
      className={className}
    >
      <RadioGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
        disabled={disabled}
        className={cn(
          variant === 'inline' && 'flex flex-wrap gap-x-5 gap-y-2',
          variant === 'stacked' && 'space-y-2',
          variant === 'cards' && `grid ${colsClass} gap-2`,
        )}
      >
        {options.map((opt) => {
          const itemId = `${name ?? 'radio'}-${baseId}-${opt.value}`;
          if (variant === 'cards') {
            const checked = (value ?? defaultValue) === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  'flex flex-col items-start gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all bg-background',
                  checked ? 'border-secondary bg-secondary/5' : 'border-border/40 hover:border-border',
                  opt.disabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  <RadioGroupItem value={opt.value} disabled={opt.disabled} className="sr-only" />
                  <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                </div>
                {opt.description && (
                  <span className="text-[11px] text-muted-foreground">{opt.description}</span>
                )}
              </label>
            );
          }
          return (
            <div key={opt.value} className="flex items-start gap-2.5">
              <RadioGroupItem value={opt.value} id={itemId} disabled={opt.disabled} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <Label htmlFor={itemId} className="text-sm cursor-pointer leading-tight">
                  {opt.label}
                </Label>
                {opt.description && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">{opt.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </FormFieldShell>
  );
}
