import { ReactNode, useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Panel, PanelColor, PanelTone } from './Panel';

export interface CollapsiblePanelProps {
  title: string;
  description?: string;
  color?: PanelColor;
  tone?: PanelTone;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Variante do Panel com toggle de expansão no header.
 */
export function CollapsiblePanel({
  title,
  description,
  color = 'neutral',
  tone = 'soft',
  icon,
  defaultOpen = true,
  children,
  footer,
  className,
}: CollapsiblePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Panel
      title={title}
      description={description}
      color={color}
      tone={tone}
      icon={icon}
      actions={
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Recolher painel' : 'Expandir painel'}
          className="p-1 rounded hover:bg-black/10 transition-colors"
        >
          <ChevronDown
            size={16}
            className={cn('transition-transform', open ? 'rotate-180' : 'rotate-0')}
          />
        </button>
      }
      footer={open ? footer : undefined}
      className={className}
    >
      {open ? children : null}
    </Panel>
  );
}
