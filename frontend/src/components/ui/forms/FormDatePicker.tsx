import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormFieldShell, FormFieldStatus } from './FormField';

interface BaseProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

export interface FormDatePickerProps extends BaseProps {
  mode?: 'single';
  value?: Date;
  onChange: (date: Date | undefined) => void;
  formatStr?: string;
  numberOfMonths?: number;
}

export interface FormDateRangePickerProps extends BaseProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  formatStr?: string;
  numberOfMonths?: number;
}

/** Date picker single — wrapper sobre Calendar + Popover. */
export function FormDatePicker({
  id: idProp,
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  placeholder = 'Selecione uma data',
  value,
  onChange,
  formatStr = 'dd/MM/yyyy',
  numberOfMonths = 1,
  className,
  triggerClassName,
  disabled,
}: FormDatePickerProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

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
      className={className}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              computedStatus === 'error' && 'border-destructive',
              triggerClassName,
            )}
          >
            <CalendarIcon size={16} className="mr-2" />
            {value ? format(value, formatStr, { locale: ptBR }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            locale={ptBR}
            numberOfMonths={numberOfMonths}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </FormFieldShell>
  );
}

/** Date picker de intervalo (range). */
export function FormDateRangePicker({
  id: idProp,
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  placeholder = 'Selecione o período',
  value,
  onChange,
  formatStr = 'dd/MM/yyyy',
  numberOfMonths = 2,
  className,
  triggerClassName,
  disabled,
}: FormDateRangePickerProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

  const labelText = value?.from
    ? value.to
      ? `${format(value.from, formatStr, { locale: ptBR })} — ${format(value.to, formatStr, { locale: ptBR })}`
      : format(value.from, formatStr, { locale: ptBR })
    : placeholder;

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
      className={className}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value?.from && 'text-muted-foreground',
              computedStatus === 'error' && 'border-destructive',
              triggerClassName,
            )}
          >
            <CalendarIcon size={16} className="mr-2" />
            {labelText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            locale={ptBR}
            numberOfMonths={numberOfMonths}
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </FormFieldShell>
  );
}
