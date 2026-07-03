import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const wordSize: Record<Size, string> = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
};

const captionSize: Record<Size, string> = {
  sm: 'text-[8px] tracking-[0.25em]',
  md: 'text-[9px] tracking-[0.28em]',
  lg: 'text-[10px] tracking-[0.3em]',
  xl: 'text-[10px] tracking-[0.3em]',
};

interface SmarnetLogoProps {
  size?: Size;
  showCaption?: boolean;
  className?: string;
  /** When true, uses muted/sidebar foreground colors (for dark surfaces). */
  onDark?: boolean;
}

/**
 * Logotipo padrão SmarNet — palavra "smarnet" em itálico bold + caption "INTRANET".
 * Estilo de referência: sidebar do app.
 */
export function SmarnetLogo({
  size = 'md',
  showCaption = true,
  className,
  onDark = false,
}: SmarnetLogoProps) {
  const wordColor = onDark ? 'text-sidebar-foreground' : 'text-foreground';
  const capColor = onDark ? 'text-sidebar-foreground/70' : 'text-muted-foreground';

  return (
    <div className={cn('flex flex-col items-center justify-center leading-none', className)}>
      <span
        className={cn(
          'font-sans font-bold italic tracking-tight rounded-md leading-none',
          wordSize[size],
          wordColor,
        )}
      >
        smarnet
      </span>
      {showCaption && (
        <span
          className={cn(
            'font-semibold uppercase mt-[2px]',
            captionSize[size],
            capColor,
          )}
        >
          I&nbsp;N&nbsp;T&nbsp;R&nbsp;A&nbsp;N&nbsp;E&nbsp;T
        </span>
      )}
    </div>
  );
}

/** Marca quadrada com letra "S" — usada quando há pouco espaço (sidebar colapsada, avatares). */
export function SmarnetMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-lg bg-[hsl(185,78%,55%)]/20 border border-[hsl(185,78%,55%)]/30 flex items-center justify-center text-[hsl(185,78%,55%)] font-bold shrink-0',
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      S
    </div>
  );
}
