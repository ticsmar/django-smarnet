import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'size'> {
  /** Ícone (componente lucide-react) */
  icon: LucideIcon;
  /** Texto acessível obrigatório (sr-only) */
  label: string;
  /** Tamanho do botão. Default: 'md' (h-9 w-9) */
  size?: 'sm' | 'md' | 'lg';
  iconSize?: number;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
};

/**
 * Botão somente ícone com label acessível obrigatório (sr-only).
 * Aceita as mesmas variantes de cor do <Button />.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, size = 'md', iconSize = 15, variant = 'outline', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="icon"
        className={cn(sizeMap[size], className)}
        aria-label={label}
        title={label}
        {...props}
      >
        <Icon size={iconSize} />
        <span className="sr-only">{label}</span>
      </Button>
    );
  },
);
IconButton.displayName = 'IconButton';
