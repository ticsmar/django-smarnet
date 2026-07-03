import * as React from 'react';
import { Loader2, LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
  /** Texto do botão */
  label: string;
  /** Ícone à esquerda (componente lucide-react) */
  icon?: LucideIcon;
  /** Ícone à direita */
  iconRight?: LucideIcon;
  /** Tamanho do ícone (px). Default: 16 */
  iconSize?: number;
  /** Estado de loading — desabilita e mostra spinner */
  loading?: boolean;
  /** Texto exibido durante loading. Default: mantém label */
  loadingLabel?: string;
}

/**
 * Botão composto com suporte a ícones e estado de loading.
 * Encapsula o padrão `<Button><Icon /> texto</Button>`.
 *
 * Aceita TODAS as variantes de cor do design system:
 * primary, secondary, tertiary, accent, destructive, success,
 * warning, alert, info, outline, outline-primary, outline-destructive,
 * ghost, link.
 */
export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      label,
      icon: Icon,
      iconRight: IconRight,
      iconSize = 16,
      loading = false,
      loadingLabel,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <Button ref={ref} disabled={isDisabled} className={cn(className)} {...props}>
        {loading ? (
          <Loader2 size={iconSize} className="animate-spin" />
        ) : (
          Icon && <Icon size={iconSize} />
        )}
        <span>{loading && loadingLabel ? loadingLabel : label}</span>
        {!loading && IconRight && <IconRight size={iconSize} />}
      </Button>
    );
  },
);
ActionButton.displayName = 'ActionButton';
