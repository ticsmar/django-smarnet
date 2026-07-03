import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Espaçamento entre os botões. Default: 'md' */
  spacing?: 'sm' | 'md' | 'lg';
  /** Orientação. Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Permite quebra de linha (apenas horizontal). Default: true */
  wrap?: boolean;
  /**
   * Quando true, os botões ficam "colados" (sem gap), com bordas internas
   * compartilhadas e cantos arredondados apenas nas extremidades. Ideal para
   * toolbars, segmented controls e paginação.
   */
  attached?: boolean;
}

const spacingMap = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-3',
};

/**
 * Agrupa múltiplos <Button /> ou <ActionButton /> com espaçamento consistente.
 *
 * Use `attached` para criar toolbars, segmented controls ou paginação onde os
 * botões compartilham bordas (estilo de barra única).
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ spacing = 'md', orientation = 'horizontal', wrap = true, attached = false, className, ...props }, ref) => {
    if (attached) {
      return (
        <div
          ref={ref}
          role="group"
          className={cn(
            'inline-flex overflow-hidden rounded-xl border border-border bg-surface-container-high/50',
            orientation === 'horizontal' ? 'flex-row items-stretch' : 'flex-col items-stretch',
            // Reset radius dos filhos e divisórias entre eles
            orientation === 'horizontal'
              ? '[&>*]:rounded-none [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-border'
              : '[&>*]:rounded-none [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border',
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col items-stretch',
          orientation === 'horizontal' && wrap && 'flex-wrap',
          spacingMap[spacing],
          className,
        )}
        {...props}
      />
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';
