import * as React from 'react';
import type { BreadcrumbItemData } from '@/components/ui/breadcrumbs';

interface PageBreadcrumbContextValue {
  items: BreadcrumbItemData[];
  setItems: React.Dispatch<React.SetStateAction<BreadcrumbItemData[]>>;
}

const PageBreadcrumbContext = React.createContext<PageBreadcrumbContextValue | undefined>(undefined);

function sameTrail(a: BreadcrumbItemData[], b: BreadcrumbItemData[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, i) => {
    const other = b[i];
    return (
      item.label === other.label &&
      item.href === other.href &&
      item.icon === other.icon &&
      item.iconOnly === other.iconOnly
    );
  });
}

export function PageBreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<BreadcrumbItemData[]>([]);
  const value = React.useMemo(() => ({ items, setItems }), [items]);

  return <PageBreadcrumbContext.Provider value={value}>{children}</PageBreadcrumbContext.Provider>;
}

/** Trilha declarada pela página atual (sem o item raiz). */
export function usePageBreadcrumbItems(): BreadcrumbItemData[] {
  return React.useContext(PageBreadcrumbContext)?.items ?? [];
}

/**
 * Declara a trilha da página atual, renderizada na faixa fixa do layout.
 * O item raiz (Home) é adicionado pela própria faixa — informe apenas os
 * níveis seguintes. Fora de um `PageBreadcrumbProvider` o hook é inerte.
 */
export function usePageBreadcrumb(items: BreadcrumbItemData[]): void {
  const setItems = React.useContext(PageBreadcrumbContext)?.setItems;

  // Sem lista de dependências: a comparação por conteúdo evita re-render em
  // loop, já que as páginas recriam o array de itens a cada render.
  React.useEffect(() => {
    setItems?.((prev) => (sameTrail(prev, items) ? prev : items));
  });

  React.useEffect(() => () => setItems?.([]), [setItems]);
}
