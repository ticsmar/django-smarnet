import { Bell, BellOff, CheckCircle2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/useT";
import type { FollowUpStatusNivel } from "@/modules/followup/types";

export function FollowUpStatusIcon({
  nivel,
  className,
}: {
  nivel: FollowUpStatusNivel;
  className?: string;
}) {
  if (nivel === "warning") {
    return <Bell className={cn("h-4 w-4 text-warning", className)} aria-hidden />;
  }
  if (nivel === "ok") {
    return <CheckCircle2 className={cn("h-4 w-4 text-accent", className)} aria-hidden />;
  }
  return <MessageSquare className={cn("h-4 w-4 text-muted-foreground", className)} aria-hidden />;
}

export function FollowUpAlarmBadge({
  nivel,
}: {
  nivel: "none" | "future" | "overdue";
}) {
  const t = useT();
  if (nivel === "future") {
    return <Bell className="inline h-3.5 w-3.5 text-warning" aria-label={t("followUp.alarm_future")} />;
  }
  if (nivel === "overdue") {
    return <BellOff className="inline h-3.5 w-3.5 text-destructive" aria-label={t("followUp.alarm_overdue")} />;
  }
  return null;
}
