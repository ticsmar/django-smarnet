import * as React from 'react';
import Select, { Props as SelectProps, GroupBase } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { cn } from '@/lib/utils';
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
  control: (base: any, state: any) => {
    const readOnly = Boolean(state.selectProps.isReadOnly);
    const disabled = state.isDisabled && !readOnly;
    return {
      ...base,
      backgroundColor: disabled
        ? "hsl(var(--muted) / 0.5)"
        : readOnly || state.isDisabled
          ? "hsl(var(--muted))"
          : "hsl(var(--background))",
      borderColor: disabled
        ? "hsl(var(--muted-foreground) / 0.25)"
        : state.isFocused
          ? "hsl(var(--ring))"
          : "hsl(var(--input))",
      color: disabled ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
      cursor: state.isDisabled || readOnly ? "not-allowed" : "default",
      pointerEvents: state.isDisabled || readOnly ? "none" : "auto",
      opacity: 1,
      borderRadius: "0.5rem",
      minHeight: "2.5rem",
      height: "2.5rem",
      boxSizing: "border-box" as const,
      fontSize: "0.875rem",
      boxShadow: state.isFocused && !state.isDisabled ? "0 0 0 2px hsl(var(--ring) / 0.3)" : "none",
      "&:hover": {
        borderColor: disabled
          ? "hsl(var(--muted-foreground) / 0.25)"
          : state.isFocused
            ? "hsl(var(--ring))"
            : "hsl(var(--input))",
      },
    };
  },
  valueContainer: (base: any) => ({
    ...base,
    height: '2.5rem',
    padding: '0 0.75rem',
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: '2.5rem',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: '0 8px',
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: '0 8px',
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: 'hsl(var(--foreground))',
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
  singleValue: (base: any, state: any) => ({
    ...base,
    color:
      state.isDisabled && !state.selectProps.isReadOnly
        ? "hsl(var(--muted-foreground))"
        : "hsl(var(--foreground))",
  }),
  placeholder: (base: any) => ({ ...base, color: 'hsl(var(--muted-foreground))' }),
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
  readOnly?: boolean;
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
  readOnly,
  isDisabled,
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
      <div
        className={cn(
          Boolean(isDisabled || readOnly) && "cursor-not-allowed",
        )}
      >
        <Component
          inputId={id}
          options={options as any}
          styles={defaultStyles}
          isDisabled={Boolean(isDisabled || readOnly)}
          isReadOnly={readOnly}
          {...selectProps}
        />
      </div>
    </FormFieldShell>
  );
}
