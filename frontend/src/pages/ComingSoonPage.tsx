import { Construction } from "lucide-react";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { useT } from "@/hooks/useT";

type ComingSoonPageProps = {
  groupKey: string;
  groupPath: string;
  titleKey: string;
};

export function ComingSoonPage({
  groupKey,
  groupPath,
  titleKey,
}: ComingSoonPageProps) {
  const t = useT();
  const title = t(titleKey);

  usePageBreadcrumb([
    { label: t(`nav.${groupKey}`), href: groupPath },
    { label: title },
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Construction size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("module.coming_soon")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
