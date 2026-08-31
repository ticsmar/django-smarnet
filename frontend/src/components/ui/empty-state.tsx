import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type EmptyStateVariant = "empty" | "loading";

export interface EmptyStateProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  variant = "empty",
  className,
}: EmptyStateProps) {
  if (variant === "loading") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground",
          className,
        )}
        role="status"
      >
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {title ?? "Carregando…"}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mb-3 flex justify-center text-muted-foreground">{icon}</div>
      ) : null}
      {title ? (
        <p className="text-sm font-medium text-foreground">{title}</p>
      ) : null}
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
