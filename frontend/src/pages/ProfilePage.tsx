import { Link } from "react-router-dom";
import { ChevronRight, Home, Lock, Shield, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { useT } from "@/hooks/useT";
import type { User as AuthUser } from "@/types/auth";

function roleLabel(user: AuthUser, t: (key: string) => string): string {
  if (user.is_branch_manager) return t("profile.role.branch_manager");
  return t("profile.role.user");
}

export default function ProfilePage() {
  const t = useT();
  const { user } = useApp();

  if (!user) {
    return (
      <div className="p-4 lg:p-8 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">{t("profile.empty")}</p>
        </div>
      </div>
    );
  }

  const initial = user.username.charAt(0).toUpperCase() || "U";
  const groups = user.groups ?? [];
  const badges: string[] = [];
  if (user.is_superuser) badges.push(t("profile.badge.superuser"));
  if (user.can_manage_access) badges.push(t("profile.badge.access_admin"));
  if (user.is_branch_manager) badges.push(t("profile.badge.branch_manager"));

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors">
          <Home size={14} />
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{t("profile.title")}</span>
      </nav>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-bold text-foreground truncate">
              {user.username}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {roleLabel(user, t)}
            </p>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {badges.map((label) => (
                  <span
                    key={label}
                    className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <User size={16} className="text-muted-foreground" />
          <h2 className="font-display text-sm font-semibold text-foreground">
            {t("profile.section.details")}
          </h2>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t("profile.field.username")}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{user.username}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t("profile.field.role")}
            </dt>
            <dd className="mt-1 text-sm text-foreground">{roleLabel(user, t)}</dd>
          </div>
        </dl>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t("profile.field.groups")}
            </p>
          </div>
          {groups.length === 0 ? (
            <p className="text-sm text-muted-foreground">—</p>
          ) : (
            <ul className="flex flex-wrap gap-1.5">
              {groups.map((group) => (
                <li
                  key={group}
                  className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-low text-foreground border border-border/40"
                >
                  {group}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary shrink-0">
              <Shield size={18} />
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold text-foreground">
                {t("profile.section.security")}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t("profile.security.desc")}
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/change-password">
              <Lock size={14} className="mr-2" />
              {t("nav.password")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
