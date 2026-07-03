import * as React from 'react';
import Select, { Props as SelectProps, GroupBase } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FormFieldShell, FormFieldStatus } from './FormField';

export interface FormComboboxOption {
  value: string;
  label: string;
}

export interface FormComboboxGroup {
  label: string;
  options: FormComboboxOption[];
}

const defaultStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--background))',
    borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
    borderRadius: '0.5rem',
    minHeight: '2.5rem',
    fontSize: '0.875rem',
    boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring) / 0.3)' : 'none',
    '&:hover': { borderColor: 'hsl(var(--ring))' },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    zIndex: 50,
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 60 }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'hsl(var(--primary))'
      : state.isFocused
      ? 'hsl(var(--accent))'
      : 'transparent',
    color: state.isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
    fontSize: '0.875rem',
    '&:active': { backgroundColor: 'hsl(var(--accent))' },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--secondary) / 0.15)',
    borderRadius: '0.375rem',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'hsl(var(--secondary))',
    fontSize: '0.75rem',
    fontWeight: 600,
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: 'hsl(var(--secondary))',
    '&:hover': {
      backgroundColor: 'hsl(var(--secondary) / 0.3)',
      color: 'hsl(var(--secondary))',
    },
  }),
  singleValue: (base: any) => ({ ...base, color: 'hsl(var(--foreground))' }),
  placeholder: (base: any) => ({ ...base, color: 'hsl(var(--muted-foreground))' }),
  input: (base: any) => ({ ...base, color: 'hsl(var(--foreground))' }),
  groupHeading: (base: any) => ({
    ...base,
    color: 'hsl(var(--muted-foreground))',
    fontSize: '0.65rem',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  }),
};

type ReactSelectProps = SelectProps<FormComboboxOption, boolean, GroupBase<FormComboboxOption>>;

export interface FormComboboxProps
  extends Omit<ReactSelectProps, 'styles' | 'options'> {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  options: FormComboboxOption[] | FormComboboxGroup[];
  /** Permite criar novas opções dinamicamente (CreatableSelect) */
  creatable?: boolean;
  /** Texto exibido para criar nova opção */
  formatCreateLabel?: (input: string) => React.ReactNode;
  className?: string;
}

/**
 * Combobox baseado em react-select com tema integrado ao design system.
 * Suporta busca, multi seleção, agrupamento e criação dinâmica.
 */
export function FormCombobox({
  id: idProp,
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  options,
  creatable,
  className,
  ...selectProps
}: FormComboboxProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

  const Component: any = creatable ? CreatableSelect : Select;

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
      <Component
        inputId={id}
        options={options as any}
        styles={defaultStyles}
        {...selectProps}
      />
    </FormFieldShell>
  );
}
