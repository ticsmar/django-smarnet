import * as React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FormFieldShell, FormFieldStatus } from './FormField';

export interface FormTextareaProps extends React.ComponentProps<'textarea'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  optionalLabel?: string;
  status?: FormFieldStatus;
  /** Mostra contador de caracteres baseado em maxLength ou prop counter */
  showCounter?: boolean;
  counterMax?: number;
  textareaClassName?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
      className,
      textareaClassName,
      showCounter,
      counterMax,
      maxLength,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<string>(typeof defaultValue === 'string' ? defaultValue : '');
    const current = isControlled ? String(value ?? '') : internal;
    const max = counterMax ?? maxLength;

    const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');
    const stateBorder =
      computedStatus === 'error'
        ? 'border-destructive focus-visible:ring-destructive'
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
      >
        <div className={cn('relative', className)}>
          <Textarea
            id={id}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={(e) => {
              if (!isControlled) setInternal(e.target.value);
              onChange?.(e);
            }}
            className={cn('min-h-[100px] resize-y', stateBorder, textareaClassName)}
            aria-invalid={computedStatus === 'error' || undefined}
            {...props}
          />
          {showCounter && (
            <span className="absolute bottom-1.5 right-2 text-[10px] text-muted-foreground tabular-nums select-none">
              {current.length}{max ? `/${max}` : ''}
            </span>
          )}
        </div>
      </FormFieldShell>
    );
  },
);
FormTextarea.displayName = 'FormTextarea';
