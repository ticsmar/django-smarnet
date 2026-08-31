/**
 * Cores semânticas e tons compartilhados por Button, Panel, Badge, Alert, etc.
 *
 * Tons:
 * - solid: preenchido, texto de contraste
 * - light (alias: soft): fundo suave, texto na cor
 * - outline: borda na cor, fundo transparente
 *
 * `light` é o nome preferido no catálogo; `soft` permanece por compatibilidade.
 */

export const SEMANTIC_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'success',
  'warning',
  'alert',
  'info',
  'destructive',
  'neutral',
] as const;

export type SemanticColor = (typeof SEMANTIC_COLORS)[number];

export type ColorTone = 'solid' | 'soft' | 'light' | 'outline';

export type ResolvedColorTone = 'solid' | 'soft' | 'outline';

export function resolveColorTone(
  tone: ColorTone | undefined,
  fallback: ResolvedColorTone,
): ResolvedColorTone {
  switch (tone) {
    case 'light':
    case 'soft':
      return 'soft';
    case 'solid':
      return 'solid';
    case 'outline':
      return 'outline';
    case undefined:
      return fallback;
    default: {
      const _exhaustive: never = tone;
      return _exhaustive;
    }
  }
}
