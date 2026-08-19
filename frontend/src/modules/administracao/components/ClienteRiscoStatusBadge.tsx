import type { BadgeColor } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";

/** Map CRS_RESTRICAO / letra to StatusBadge semantic color. */
export function clienteRiscoBadgeColor(
  restricao: number | null | undefined,
  letra: string | null | undefined,
): BadgeColor {
  const code = (letra || "").trim().toUpperCase();
  if (code === "A") {
    return "success";
  }
  if (restricao === 2 || code.startsWith("E") || code.startsWith("D")) {
    return "destructive";
  }
  if (restricao === 1 || code === "C") {
    return "alert";
  }
  if (code === "B" || code === "N") {
    return "warning";
  }
  return "neutral";
}

type ClienteRiscoStatusBadgeProps = {
  letra: string | null | undefined;
  descLonga?: string | null;
  restricao?: number | null;
  className?: string;
};

export function ClienteRiscoStatusBadge({
  letra,
  descLonga,
  restricao,
  className,
}: ClienteRiscoStatusBadgeProps) {
  const label = (letra || "").trim() || "A";
  return (
    <StatusBadge
      label={label}
      title={descLonga?.trim() || undefined}
      color={clienteRiscoBadgeColor(restricao, label)}
      tone="soft"
      showDot
      className={cn("shrink-0", className)}
    />
  );
}
