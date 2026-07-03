import { toast as sonnerToast } from 'sonner';
import { ColoredToast, type ColoredToastProps } from './ColoredToast';

export interface ShowColoredToastOptions extends Omit<ColoredToastProps, 'onDismiss'> {
  /** Duração em ms. Default: 4000. */
  duration?: number;
}

/**
 * Dispara um toast colorido usando Sonner como container, mas renderizando
 * o nosso ColoredToast (com 10 cores × 3 tons).
 */
export function showColoredToast({ duration = 4000, ...props }: ShowColoredToastOptions) {
  return sonnerToast.custom(
    (id) => (
      <ColoredToast
        {...props}
        onDismiss={() => sonnerToast.dismiss(id)}
      />
    ),
    { duration },
  );
}
