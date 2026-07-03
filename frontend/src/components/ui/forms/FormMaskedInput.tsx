import * as React from 'react';
import { FormInput, FormInputProps } from './FormInput';

export type MaskType = 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date' | 'money' | 'percent' | 'custom';

const masks: Record<Exclude<MaskType, 'custom'>, (v: string) => string> = {
  cpf: (v) =>
    v
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14),
  cnpj: (v) =>
    v
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18),
  phone: (v) => {
    const d = v.replace(/\D/g, '');
    if (d.length <= 10) return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15);
  },
  cep: (v) => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9),
  date: (v) =>
    v
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10),
  money: (v) => {
    const n = v.replace(/\D/g, '');
    const f = (parseInt(n || '0') / 100).toFixed(2);
    return f.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },
  percent: (v) => {
    const n = v.replace(/\D/g, '');
    const f = (parseInt(n || '0') / 100).toFixed(2);
    return f.replace('.', ',');
  },
};

export interface FormMaskedInputProps extends Omit<FormInputProps, 'value' | 'onChange'> {
  mask: MaskType;
  value: string;
  onChange: (value: string) => void;
  /** Função de máscara customizada (quando mask = 'custom') */
  customMask?: (value: string) => string;
}

/**
 * Input com máscara: CPF, CNPJ, telefone, CEP, data, valor, percentual.
 * Internamente reusa FormInput, então herda labels, ícones, prefixos, status etc.
 */
export const FormMaskedInput = React.forwardRef<HTMLInputElement, FormMaskedInputProps>(
  ({ mask, value, onChange, customMask, ...rest }, ref) => {
    const apply = React.useCallback(
      (raw: string) => {
        if (mask === 'custom') return customMask ? customMask(raw) : raw;
        return masks[mask](raw);
      },
      [mask, customMask],
    );

    return (
      <FormInput
        ref={ref}
        value={value}
        onChange={(e) => onChange(apply(e.target.value))}
        inputMode={mask === 'money' || mask === 'percent' || mask === 'phone' || mask === 'cep' ? 'numeric' : undefined}
        {...rest}
      />
    );
  },
);
FormMaskedInput.displayName = 'FormMaskedInput';
