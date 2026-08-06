import { Home } from 'lucide-react';
import { PathBreadcrumb, type BreadcrumbItemData } from '@/components/ui/breadcrumbs';
import { usePageBreadcrumbItems } from '@/contexts/PageBreadcrumbContext';
import { useT } from '@/hooks/useT';
import { cn } from '@/lib/utils';

/**
 * Faixa de breadcrumb do layout: posição fixa abaixo do topo e largura total
 * da área de conteúdo, independente do wrapper de cada página.
 */
export function PageBreadcrumbBar({ className }: { className?: string }) {
  const t = useT();
  const items = usePageBreadcrumbItems();

  if (!items.length) return null;

  const trail: BreadcrumbItemData[] = [
    { label: t('breadcrumb.home'), href: '/app', icon: Home, iconOnly: true },
    ...items,
  ];

  return <PathBreadcrumb items={trail} maxItems={5} className={cn('w-full mb-6', className)} />;
}
