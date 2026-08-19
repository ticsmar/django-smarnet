import { Link, Navigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useT } from '@/hooks/useT';
import { useVisibleErpGroups } from '@/config/erpNavigation';
import { usePageBreadcrumb } from '@/contexts/PageBreadcrumbContext';

/**
 * Página índice de um grupo do menu (ex: /app/purchasing), listando os itens que
 * o usuário pode acessar. Serve de destino para o breadcrumb do módulo.
 */
export function ModuleIndexPage({ groupKey }: { groupKey: string }) {
  const t = useT();
  const group = useVisibleErpGroups().find((g) => g.key === groupKey);

  usePageBreadcrumb(group ? [{ label: t(`nav.${group.key}`) }] : []);

  if (!group) return <Navigate to="/app" replace />;

  const items = group.sections.flatMap((section) => section.items);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <group.icon size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {t(`nav.${group.key}`)}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(`erp.group.${group.key}.subtitle`)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className="group rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/15">
                <item.icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-foreground">
                  {t(`nav.${item.key}`)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t(`erp.item.${item.key}.desc`)}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
