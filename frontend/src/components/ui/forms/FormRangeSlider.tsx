import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { FormFieldShell, FormFieldStatus } from './FormField';

export interface FormRangeSliderProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Função para formatar o valor exibido ao lado do label */
  formatValue?: (value: number[]) => React.ReactNode;
  /** Mostrar marcações abaixo do slider */
  ticks?: number[] | boolean;
  /** Função para formatar cada marcação */
  formatTick?: (value: number) => React.ReactNode;
  className?: string;
}

function defaultFormat(value: number[]): React.ReactNode {
  return value.length > 1 ? `${value[0]} — ${value[1]}` : `${value[0]}`;
}

export function FormRangeSlider({
  id: idProp,
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  formatValue = defaultFormat,
  ticks,
  formatTick = (v) => v,
  className,
}: FormRangeSliderProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

  const tickValues: number[] | undefined =
    ticks === true
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step)
      : Array.isArray(ticks)
      ? ticks
      : undefined;

  return (
    <FormFieldShell
      id={id}
      label={
        label !== undefined ? (
          <span className="flex items-center justify-between w-full">
            <span>{label}</span>
            <span className="text-sm font-bold text-secondary ml-3">{formatValue(value)}</span>
          </span>
        ) : undefined
      }
      required={required}
      description={description}
      hint={hint}
      error={error}
      success={success}
      status={computedStatus}
      className={cn('space-y-3', className)}
      labelClassName="text-xs"
    >
      <div className={cn('space-y-2', disabled && 'opacity-50')}>
        <Slider
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        {tickValues && (
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            {tickValues.map((v) => (
              <span key={v}>{formatTick(v)}</span>
            ))}
          </div>
        )}
      </div>
    </FormFieldShell>
  );
}
