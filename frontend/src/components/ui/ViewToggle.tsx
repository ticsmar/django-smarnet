import { LayoutGrid, LayoutList, Table2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DataViewMode } from '@/hooks/useViewMode';
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
}

/**
 * Alternador Tabela / Lista / Cards.
 * Classes legadas: `.config-usuarios-view-toggle`, `.config-view-btn`,
 * `.config-sistemas-view-btn`, `.active`, `data-view`.
 */
export function ViewToggle({ value, onChange, className, ariaLabel }: ViewToggleProps) {
  const t = useT();

  return (
    <div
      className={cn('config-usuarios-view-toggle', className)}
      role="group"
      aria-label={ariaLabel ?? t('view.toggle')}
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
