import * as React from 'react';
import { FormInput, FormInputProps } from './FormInput';

export type MaskType = 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date' | 'money' | 'percent' | 'custom';

/** Digits as cents → `1.246.990,00`. Empty stays empty. */
export function applyMoneyMask(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  return (parseInt(digits, 10) / 100)
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Number in reais (API) → masked string for `FormMaskedInput mask="money"`. */
export function formatMoneyMask(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '';
  const cents = Math.round(Math.abs(numeric) * 100);
  return applyMoneyMask(String(cents));
}

/** Masked `1.246.990,00` → number in reais, or `null` if empty. */
export function parseMoneyMask(masked: string): number | null {
  const digits = masked.replace(/\D/g, '');
  if (!digits) return null;
  return parseInt(digits, 10) / 100;
}

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
  money: applyMoneyMask,
  percent: (v) => {
    const n = v.replace(/\D/g, '');
    if (!n) return '';
    return (parseInt(n, 10) / 100).toFixed(2).replace('.', ',');
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
 *
 * Moeda: `mask="money"` + `prefix="R$"`. Carregar número da API com
 * `formatMoneyMask`; gravar com `parseMoneyMask`.
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
        {...rest}
        value={apply(value)}
        onChange={(e) => onChange(apply(e.target.value))}
        inputMode={mask === 'money' || mask === 'percent' || mask === 'phone' || mask === 'cep' ? 'numeric' : undefined}
      />
    );
  },
);
FormMaskedInput.displayName = 'FormMaskedInput';
