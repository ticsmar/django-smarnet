import { type ButtonProps } from '@/components/ui/button';

/**
 * Cores semânticas do design system disponíveis para o trigger.
 */
export type DropdownColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'alert'
  | 'info'
  | 'destructive'
  | 'neutral';

/**
 * Estilo visual do trigger.
 * - solid: cor preenchida
 * - outline: borda colorida + fundo transparente
 * - ghost: sem borda nem fundo, apenas hover
 */
export type DropdownTriggerVariant = 'solid' | 'outline' | 'ghost';

/**
 * Resolve `variant` + `color` em uma das variantes aceitas pelo <Button />.
 *
 * Regras:
 * - solid + cor → variante sólida da cor (ex: 'success')
 * - outline + primary/destructive → outline-primary / outline-destructive
 * - outline + outras cores → 'outline' neutro (não temos outline-success etc.)
 * - ghost → sempre 'ghost' (cor aplicada via texto se necessário)
 * - neutral → secondary/outline/ghost padrão
 */
export function resolveTriggerVariant(
  variant: DropdownTriggerVariant = 'outline',
  color: DropdownColor = 'neutral',
): NonNullable<ButtonProps['variant']> {
  if (variant === 'ghost') return 'ghost';

  if (variant === 'outline') {
    if (color === 'primary') return 'outline-primary';
    if (color === 'destructive') return 'outline-destructive';
    return 'outline';
  }

  // solid
  if (color === 'neutral') return 'secondary';
  return color;
}
