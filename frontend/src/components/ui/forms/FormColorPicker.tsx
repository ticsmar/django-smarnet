import * as React from 'react';
import { cn } from '@/lib/utils';
import { FormFieldShell, FormFieldStatus } from './FormField';
import { Input } from '@/components/ui/input';

export interface FormColorPickerProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  value: string;
  onChange: (value: string) => void;
  /** Lista de swatches para seleção rápida */
  swatches?: string[];
  /** Ocultar campo de texto hex */
  hideHex?: boolean;
  className?: string;
}

/**
 * Seletor de cor com input nativo + campo hex + swatches opcionais.
 * Apenas tokens semânticos (border, muted, foreground).
 */
export const FormColorPicker = React.forwardRef<HTMLInputElement, FormColorPickerProps>(
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
      value,
      onChange,
      swatches,
      hideHex,
      className,
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;

    return (
      <FormFieldShell
        id={id}
        label={label}
        required={required}
        description={description}
        hint={hint}
        error={error}
        success={success}
        status={status}
        className={className}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <input
              ref={ref}
              id={id}
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 rounded-lg border border-border cursor-pointer bg-background"
            />
            {!hideHex && (
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="font-mono text-sm flex-1"
              />
            )}
          </div>
          {swatches && swatches.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {swatches.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange(c)}
                  aria-label={`Selecionar cor ${c}`}
                  className={cn(
                    'w-7 h-7 rounded-lg border-2 transition-all',
                    value.toLowerCase() === c.toLowerCase()
                      ? 'border-foreground scale-110 shadow-md'
                      : 'border-transparent hover:scale-105',
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>
      </FormFieldShell>
    );
  },
);
FormColorPicker.displayName = 'FormColorPicker';
