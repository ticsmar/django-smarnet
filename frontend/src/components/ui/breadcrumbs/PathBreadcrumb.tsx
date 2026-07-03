import * as React from 'react';
import { ChevronRight, Slash, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';

export type BreadcrumbSeparatorKind = 'chevron' | 'slash';

export interface BreadcrumbItemData {
  /** Texto visível do item. */
  label: string;
  /** URL do link. Quando ausente, item é renderizado como texto (não-clicável). */
  href?: string;
  /** Ícone opcional (Lucide). Útil para o item raiz (ex: Home). */
  icon?: LucideIcon;
  /** Handler de clique opcional (para integração com router programático). */
  onClick?: (e: React.MouseEvent) => void;
}

export interface PathBreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Itens do caminho. O último item é automaticamente tratado como página atual. */
  items: BreadcrumbItemData[];
  /** Tipo de separador. Default: 'chevron'. */
  separator?: BreadcrumbSeparatorKind;
  /** Tamanho da fonte. Default: 'sm'. */
  size?: 'xs' | 'sm';
  /** Quantidade máxima de itens visíveis (com colapso no meio via ellipsis). 0 = sem limite. */
  maxItems?: number;
}

function renderSeparator(kind: BreadcrumbSeparatorKind) {
  if (kind === 'slash') return <Slash className="h-3 w-3" />;
  return <ChevronRight className="h-3.5 w-3.5" />;
}

/**
 * Breadcrumb data-driven com colapso opcional no meio (ellipsis).
 * O último item sempre é renderizado como página atual.
 */
export function PathBreadcrumb({
  items,
  separator = 'chevron',
  size = 'sm',
  maxItems = 0,
  className,
  ...props
}: PathBreadcrumbProps) {
  if (!items.length) return null;

  // Aplica auto-collapse: mantém primeiro + último(s), colapsa o meio.
  const shouldCollapse = maxItems > 0 && items.length > maxItems;
  const visible: (BreadcrumbItemData | 'ellipsis')[] = shouldCollapse
    ? [items[0], 'ellipsis', ...items.slice(items.length - (maxItems - 1))]
    : items;

  const sizeCls = size === 'xs' ? 'text-xs' : 'text-sm';

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList className={cn(sizeCls, 'gap-1.5 sm:gap-2')}>
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          const sep = !isLast && (
            <BreadcrumbSeparator className="text-muted-foreground/60">
              {renderSeparator(separator)}
            </BreadcrumbSeparator>
          );

          if (item === 'ellipsis') {
            return (
              <React.Fragment key={`ellipsis-${idx}`}>
                <BreadcrumbItem>
                  <BreadcrumbEllipsis className="h-6 w-6" />
                </BreadcrumbItem>
                {sep}
              </React.Fragment>
            );
          }

          const Icon = item.icon;
          const content = (
            <span className="inline-flex items-center gap-1.5">
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {item.label}
            </span>
          );

          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="font-medium text-foreground">{content}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} onClick={item.onClick} className="hover:text-foreground">
                    {content}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {sep}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
