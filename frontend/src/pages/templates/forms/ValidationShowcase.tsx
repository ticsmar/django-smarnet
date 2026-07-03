import { useState } from 'react';
import { FormsShowcaseLayout, ShowcaseSection } from './FormsShowcaseLayout';
import { FormInput, PasswordStrengthInput } from '@/components/ui/forms';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ValidatedFieldProps {
  label: string;
  placeholder: string;
  validate: (v: string) => string | null;
  hint?: string;
  type?: string;
}

function ValidatedField({ label, placeholder, validate, hint, type }: ValidatedFieldProps) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(value) : null;
  const valid = touched && !error && value.length > 0;

  return (
    <FormInput
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setTouched(true)}
      error={error ?? undefined}
      success={valid ? 'Campo válido' : undefined}
      hint={!touched ? hint : undefined}
    />
  );
}

export default function ValidationShowcase() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <FormsShowcaseLayout title="Validation" description="Padrões de validação de formulários com feedback visual em tempo real.">
      <ShowcaseSection title="Validação em Tempo Real">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ValidatedField
            label="Nome Completo"
            placeholder="Digite seu nome"
            validate={v => v.length === 0 ? 'Campo obrigatório' : v.length < 3 ? 'Mínimo 3 caracteres' : null}
            hint="Mínimo 3 caracteres"
          />
          <ValidatedField
            label="Email"
            type="email"
            placeholder="email@empresa.com"
            validate={v => v.length === 0 ? 'Campo obrigatório' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email inválido' : null}
            hint="Formato: nome@dominio.com"
          />
          <ValidatedField
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            validate={v => v.length === 0 ? 'Campo obrigatório' : v.replace(/\D/g, '').length !== 14 ? 'CNPJ deve ter 14 dígitos' : null}
            hint="Apenas números"
          />
          <ValidatedField
            label="Telefone"
            placeholder="(00) 00000-0000"
            validate={v => v.length === 0 ? 'Campo obrigatório' : v.replace(/\D/g, '').length < 10 ? 'Telefone incompleto' : null}
          />
          <ValidatedField
            label="CEP"
            placeholder="00000-000"
            validate={v => v.length === 0 ? 'Campo obrigatório' : v.replace(/\D/g, '').length !== 8 ? 'CEP deve ter 8 dígitos' : null}
          />
          <ValidatedField
            label="Senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            validate={v => {
              if (v.length === 0) return 'Campo obrigatório';
              if (v.length < 8) return 'Mínimo 8 caracteres';
              if (!/[A-Z]/.test(v)) return 'Deve conter letra maiúscula';
              if (!/[0-9]/.test(v)) return 'Deve conter número';
              return null;
            }}
            hint="Mínimo 8 caracteres, 1 maiúscula, 1 número"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Formulário com Validação no Submit">
        <div className="max-w-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Nome" required placeholder="Nome" error={submitted ? 'Campo obrigatório' : undefined} />
            <FormInput label="Sobrenome" required placeholder="Sobrenome" error={submitted ? 'Campo obrigatório' : undefined} />
          </div>
          <FormInput label="Email" required placeholder="email@empresa.com" error={submitted ? 'Email inválido' : undefined} />
          <div className="flex items-center gap-3">
            <Button onClick={() => setSubmitted(true)}>Enviar</Button>
            <Button variant="ghost" onClick={() => setSubmitted(false)}>Limpar</Button>
          </div>
          {submitted && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle size={16} />
              <span>Corrija os campos destacados antes de enviar.</span>
            </div>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Indicador de Força da Senha">
        <div className="max-w-sm">
          <PasswordStrengthInput />
        </div>
      </ShowcaseSection>
    </FormsShowcaseLayout>
  );
}
