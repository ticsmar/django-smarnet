import * as React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export type FormFieldStatus = 'default' | 'error' | 'success' | 'warning';

export interface FormFieldShellProps {
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
  optionalLabel?: string;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  status?: FormFieldStatus;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
}

/**
 * Wrapper padronizado para campos de formulário.
 * Cuida de label (com asterisco para required), descrição, hint, mensagens de erro/sucesso.
 * Apenas tokens semânticos: funciona em modo claro e escuro.
 */
export function FormFieldShell({
  id,
  label,
  required,
  optionalLabel,
  description,
  hint,
  error,
  success,
  status,
  className,
  labelClassName,
  children,
}: FormFieldShellProps) {
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            'text-xs font-medium flex items-center gap-1.5',
            computedStatus === 'error' && 'text-destructive',
            labelClassName,
          )}
        >
          <span>{label}</span>
          {required && <span className="text-destructive" aria-hidden>*</span>}
          {!required && optionalLabel && (
            <span className="text-[10px] font-normal text-muted-foreground">({optionalLabel})</span>
          )}
        </Label>
      )}
      {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
      {children}
      {error ? (
        <p className="text-[11px] text-destructive flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      ) : success ? (
        <p className="text-[11px] text-status-success flex items-center gap-1">
          <CheckCircle2 size={11} /> {success}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
          <Info size={11} /> {hint}
        </p>
      ) : null}
    </div>
  );
}
