import * as React from 'react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormFieldShell, FormFieldStatus } from './FormField';

export type FormSelectSize = 'sm' | 'md' | 'lg';

const triggerSize: Record<FormSelectSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

export interface FormSelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface FormSelectProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  optionalLabel?: string;
  status?: FormFieldStatus;
  size?: FormSelectSize;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  options: FormSelectOption[];
  className?: string;
  triggerClassName?: string;
}

export function FormSelect({
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
  placeholder,
  value,
  defaultValue,
  onValueChange,
  disabled,
  options,
  className,
  triggerClassName,
}: FormSelectProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');
  const stateBorder =
    computedStatus === 'error'
      ? 'border-destructive focus:ring-destructive'
      : computedStatus === 'success'
      ? 'border-status-success'
      : computedStatus === 'warning'
      ? 'border-status-warning'
      : '';

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
      className={className}
    >
      <Select value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={cn(triggerSize[size], stateBorder, triggerClassName)}
          aria-invalid={computedStatus === 'error' || undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : ''}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldShell>
  );
}
