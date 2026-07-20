import { Link } from "react-router-dom";
import {
  ChevronRight,
  LayoutDashboard,
  Monitor,
  Palette,
  Settings,
  Truck,
  User,
  type LucideIcon,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useT } from "@/hooks/useT";
import { useBranchManagerAccess } from "@/modules/device";
import { COMPRAS_PERMS, hasPermission } from "@/modules/compras";

type HubCard = {
  key: string;
  path: string;
  icon: LucideIcon;
};

export default function HomePage() {
  const t = useT();
  const { user } = useApp();
  const { isManager: canAccessDevices } = useBranchManagerAccess();

  const cards: HubCard[] = [];

  if (hasPermission(user, COMPRAS_PERMS.viewFornecedor)) {
    cards.push({
      key: "compras",
      path: "/app/compras/fornecedores",
      icon: Truck,
    });
  }

  if (canAccessDevices) {
    cards.push({
      key: "devices",
      path: "/app/devices",
      icon: Monitor,
    });
  }

  cards.push({
    key: "profile",
    path: "/app/profile",
    icon: User,
  });

  if (user?.can_manage_access || user?.is_superuser) {
    cards.push({
      key: "settings",
      path: "/settings",
      icon: Settings,
    });
  }

  if (user?.is_superuser) {
    cards.push({
      key: "design_system",
      path: "/design-system",
      icon: Palette,
    });
  }

  const hasOnlyProfile = cards.length === 1 && cards[0].key === "profile";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground shrink-0">
            <LayoutDashboard size={22} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold text-foreground">
              {t("dashboard.welcome")}{" "}
              <span className="text-primary">{user?.username ?? ""}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{t("home.subtitle")}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-sm font-semibold text-foreground mb-3">
          {t("home.modules")}
        </h2>

        {hasOnlyProfile ? (
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
            <p className="text-sm text-muted-foreground">{t("home.empty")}</p>
            <Link
              to="/app/profile"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {t("home.card.profile")}
              <ChevronRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.key}
                to={card.path}
                className="group rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/15">
                    <card.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-sm font-semibold text-foreground">
                        {t(`home.card.${card.key}`)}
                      </h3>
                      <ChevronRight
                        size={14}
                        className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(`home.card.${card.key}.desc`)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
