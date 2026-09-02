import type { BadgeColor, BadgeTone } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";

/** Map CRS_RESTRICAO / letra to StatusBadge semantic color. Never interpolates CRS_CORES. */
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

export function riscoLongDesc(descLonga?: string | null): string {
  return (descLonga || "").trim().replace(/\s+/g, " ");
}

export function riscoShortDesc(
  desc?: string | null,
  descLonga?: string | null,
): string {
  const short = (desc || "").trim();
  if (short) {
    return short;
  }
  const longa = riscoLongDesc(descLonga);
  const sep = longa.indexOf(":");
  if (sep >= 0) {
    return longa.slice(sep + 1).trim();
  }
  return longa;
}

type ClienteRiscoStatusBadgeProps = {
  letra: string | null | undefined;
  desc?: string | null;
  descLonga?: string | null;
  restricao?: number | null;
  showDesc?: boolean;
  showLongDesc?: boolean;
  tone?: BadgeTone;
  className?: string;
};

export function ClienteRiscoStatusBadge({
  letra,
  desc,
  descLonga,
  restricao,
  showDesc = false,
  showLongDesc = false,
  tone = "soft",
  className,
}: ClienteRiscoStatusBadgeProps) {
  const letter = (letra || "").trim() || "A";
  const short = riscoShortDesc(desc, descLonga);
  const longa = riscoLongDesc(descLonga);
  const label = showLongDesc
    ? longa || short || letter
    : showDesc
      ? short || letter
      : letter;
  const title = showLongDesc
    ? undefined
    : longa || (showDesc ? undefined : short) || undefined;
  return (
    <StatusBadge
      label={label}
      title={title}
      color={clienteRiscoBadgeColor(restricao, letter)}
      tone={tone}
      showDot
      className={cn("shrink-0", className)}
    />
  );
}
