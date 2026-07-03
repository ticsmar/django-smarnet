import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { FormInput } from './FormInput';

export interface PasswordCheck {
  label: string;
  test: (value: string) => boolean;
}

const defaultChecks: PasswordCheck[] = [
  { label: 'Mínimo 8 caracteres', test: (v) => v.length >= 8 },
  { label: 'Letra maiúscula', test: (v) => /[A-Z]/.test(v) },
  { label: 'Letra minúscula', test: (v) => /[a-z]/.test(v) },
  { label: 'Número', test: (v) => /[0-9]/.test(v) },
  { label: 'Caractere especial', test: (v) => /[^a-zA-Z0-9]/.test(v) },
];

export interface PasswordStrengthInputProps {
  label?: React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  /** Regras de validação customizadas. Se omitido, usa checklist padrão. */
  checks?: PasswordCheck[];
  /** Mostrar a barra de força */
  showStrengthBar?: boolean;
  /** Mostrar lista de requisitos */
  showChecklist?: boolean;
  required?: boolean;
  disabled?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  containerClassName?: string;
}

export function PasswordStrengthInput({
  label = 'Senha',
  placeholder = 'Digite sua senha',
  value: valueProp,
  onChange,
  checks = defaultChecks,
  showStrengthBar = true,
  showChecklist = true,
  required,
  disabled,
  hint,
  error,
  containerClassName,
}: PasswordStrengthInputProps) {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const current = isControlled ? valueProp : internal;

  const results = checks.map((c) => ({ ...c, ok: c.test(current) }));
  const strength = results.filter((r) => r.ok).length;
  const total = checks.length;

  const strengthColor =
    strength === 0
      ? 'bg-muted/30'
      : strength <= Math.floor(total * 0.3)
      ? 'bg-destructive'
      : strength <= Math.floor(total * 0.6)
      ? 'bg-status-warning'
      : 'bg-status-success';

  return (
    <div className={cn('space-y-2', containerClassName)}>
      <FormInput
        label={label}
        type={showPass ? 'text' : 'password'}
        placeholder={placeholder}
        value={current}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.value);
          onChange?.(e.target.value);
        }}
        required={required}
        disabled={disabled}
        hint={hint}
        error={error}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      {current.length > 0 && showStrengthBar && (
        <div className="flex gap-1">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i < strength ? strengthColor : 'bg-muted/30',
              )}
            />
          ))}
        </div>
      )}

      {current.length > 0 && showChecklist && (
        <div className="space-y-1.5">
          {results.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-xs">
              {c.ok ? (
                <CheckCircle2
                  size={13}
                  className="text-status-success shrink-0"
                />
              ) : (
                <div className="w-[13px] h-[13px] rounded-full border border-muted-foreground/30 shrink-0" />
              )}
              <span
                className={c.ok ? 'text-foreground' : 'text-muted-foreground'}
              >
                {c.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
