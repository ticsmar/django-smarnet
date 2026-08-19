import { useQuery } from "@tanstack/react-query";
import { Building2, Briefcase, Lock, Shield, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserProfile } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { useT } from "@/hooks/useT";
import type { User as AuthUser, UserProfile } from "@/types/auth";

function roleLabel(user: AuthUser | UserProfile, t: (key: string) => string): string {
  if (user.is_branch_manager) return t("profile.role.branch_manager");
  return t("profile.role.user");
}

function displayOrDash(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  const text = String(value).trim();
  return text || "—";
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground break-words">{displayOrDash(value)}</dd>
    </div>
  );
}

export default function ProfilePage() {
  const t = useT();
  const { user } = useApp();

  usePageBreadcrumb([{ label: t("profile.title") }]);

  const profileQuery = useQuery({
    queryKey: ["users", "me", "profile"],
    queryFn: getUserProfile,
    enabled: Boolean(user),
  });

  if (!user) {
    return (
      <div className="p-4 lg:p-8 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">{t("profile.empty")}</p>
        </div>
      </div>
    );
  }

  const profile = profileQuery.data;
  const displayName = profile?.display_name?.trim() || user.username;
  const initial = displayName.charAt(0).toUpperCase() || "U";
  const groups = profile?.groups ?? user.groups ?? [];
  const badges: string[] = [];
  if (profile?.is_superuser || user.is_superuser) badges.push(t("profile.badge.superuser"));
  if (profile?.can_manage_access || user.can_manage_access) {
    badges.push(t("profile.badge.access_admin"));
  }
  if (profile?.is_branch_manager || user.is_branch_manager) {
    badges.push(t("profile.badge.branch_manager"));
  }

  const companyLocation = [profile?.emp_cidade, profile?.emp_estado]
    .filter((part) => Boolean(part?.trim()))
    .join(" / ");

  const employeeAddress = [
    profile?.fun_endereco,
    profile?.fun_bairro,
    [profile?.fun_cidade, profile?.fun_uf].filter(Boolean).join(" - "),
    profile?.fun_cep,
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-bold text-foreground truncate">
              {displayName}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {roleLabel(profile ?? user, t)}
              {profile?.email ? ` · ${profile.email}` : null}
            </p>
            {profile?.emp_nome ? (
              <p className="text-sm text-foreground/80 mt-1 truncate">{profile.emp_nome}</p>
            ) : null}
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
        {profileQuery.isLoading ? (
          <p className="text-sm text-muted-foreground mt-4">{t("profile.loading")}</p>
        ) : null}
        {profileQuery.isError ? (
          <p className="text-sm text-destructive mt-4">{t("profile.load_error")}</p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <User size={16} className="text-muted-foreground" />
          <h2 className="font-display text-sm font-semibold text-foreground">
            {t("profile.section.details")}
          </h2>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label={t("profile.field.username")} value={user.username} />
          <Field label={t("profile.field.role")} value={roleLabel(profile ?? user, t)} />
          <Field label={t("profile.field.display_name")} value={profile?.display_name} />
          <Field label={t("profile.field.email")} value={profile?.email} />
          <Field label={t("profile.field.user_id")} value={profile?.usu_chapa} />
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

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-muted-foreground" />
          <h2 className="font-display text-sm font-semibold text-foreground">
            {t("profile.section.company")}
          </h2>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label={t("profile.field.emp_nome")} value={profile?.emp_nome} />
          <Field label={t("profile.field.emp_reduzido")} value={profile?.emp_reduzido} />
          <Field label={t("profile.field.emp_codigo")} value={profile?.emp_codigo} />
          <Field label={t("profile.field.emp_location")} value={companyLocation} />
        </dl>
      </div>

      {profile?.is_funcionario ? (
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-muted-foreground" />
            <h2 className="font-display text-sm font-semibold text-foreground">
              {t("profile.section.employee")}
            </h2>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label={t("profile.field.fun_chapa")} value={profile.fun_chapa} />
            <Field label={t("profile.field.fun_apelido")} value={profile.fun_apelido} />
            <Field label={t("profile.field.fun_cargo")} value={profile.fun_cargo} />
            <Field label={t("profile.field.fun_ativo")} value={profile.fun_ativo_label} />
            <Field label={t("profile.field.fun_dt_adm")} value={profile.fun_dt_adm} />
            <Field label={t("profile.field.fun_ramal")} value={profile.fun_ramal} />
            <Field label={t("profile.field.fun_unidade")} value={profile.fun_unidade} />
            <Field label={t("profile.field.fun_filial")} value={profile.fun_filial} />
            <div className="sm:col-span-2">
              <Field label={t("profile.field.fun_address")} value={employeeAddress} />
            </div>
          </dl>
        </div>
      ) : null}

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
