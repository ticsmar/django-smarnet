import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LayoutGrid, LayoutList, Table2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DataViewMode } from '@/hooks/useViewMode';
import { useIsMobile } from '@/hooks/use-mobile';
import { useT } from '@/hooks/useT';

const OPTIONS: {
  view: DataViewMode;
  icon: LucideIcon;
  labelKey: string;
}[] = [
  { view: 'tabela', icon: Table2, labelKey: 'view.tabela' },
  { view: 'lista', icon: LayoutList, labelKey: 'view.lista' },
  { view: 'cards', icon: LayoutGrid, labelKey: 'view.cards' },
];

export interface ViewToggleProps {
  value: DataViewMode;
  onChange: (view: DataViewMode) => void;
  className?: string;
  /** aria-label do grupo. Default via i18n `view.toggle`. */
  ariaLabel?: string;
  /**
   * `auto` = dropdown compacto no mobile, segmento no desktop.
   * `segment` / `compact` forçam o layout.
   */
  variant?: 'auto' | 'segment' | 'compact';
}

/**
 * Alternador Tabela / Lista / Cards.
 * No celular (auto/compact): um chip minimalista com o modo atual + menu.
 */
export function ViewToggle({
  value,
  onChange,
  className,
  ariaLabel,
  variant = 'auto',
}: ViewToggleProps) {
  const t = useT();
  const isMobile = useIsMobile();
  const compact = variant === 'compact' || (variant === 'auto' && isMobile);
  const groupLabel = ariaLabel ?? t('view.toggle');

  if (compact) {
    return (
      <CompactViewMenu
        value={value}
        onChange={onChange}
        className={className}
        ariaLabel={groupLabel}
      />
    );
  }

  return (
    <div
      className={cn('config-usuarios-view-toggle', className)}
      role="group"
      aria-label={groupLabel}
    >
      {OPTIONS.map(({ view, icon: Icon, labelKey }) => {
        const active = value === view;
        return (
          <button
            key={view}
            type="button"
            data-view={view}
            aria-pressed={active}
            aria-label={t(labelKey)}
            title={t(labelKey)}
            className={cn(
              'config-view-btn',
              'config-sistemas-view-btn',
              active && 'active',
            )}
            onClick={() => onChange(view)}
          >
            <Icon size={16} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}

function CompactViewMenu({
  value,
  onChange,
  className,
  ariaLabel,
}: {
  value: DataViewMode;
  onChange: (view: DataViewMode) => void;
  className?: string;
  ariaLabel: string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((option) => option.view === value) ?? OPTIONS[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative shrink-0', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        title={ariaLabel}
        className="config-view-compact-trigger"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <CurrentIcon size={15} aria-hidden className="config-view-compact-icon" />
        <span className="max-w-[4.5rem] truncate">{t(current.labelKey)}</span>
        <ChevronDown
          size={14}
          aria-hidden
          className={cn('config-view-compact-chevron', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <div role="menu" aria-label={ariaLabel} className="config-view-compact-menu">
          {OPTIONS.map(({ view, icon: Icon, labelKey }) => {
            const active = value === view;
            return (
              <button
                key={view}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                data-view={view}
                className={cn('config-view-compact-item', active && 'active')}
                onClick={() => {
                  onChange(view);
                  setOpen(false);
                }}
              >
                <Icon size={15} aria-hidden />
                <span>{t(labelKey)}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
