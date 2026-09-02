import DOMPurify from "dompurify";
import { ArrowDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/useT";
import { FollowUpAlarmBadge } from "./FollowUpStatusIcon";
import type { FollowUpItem } from "@/modules/followup/types";

const HTML_TAGS = ["br", "b", "i", "strong", "em", "u"];

function sanitize(raw: string): string {
  return DOMPurify.sanitize(raw, { ALLOWED_TAGS: HTML_TAGS, ALLOWED_ATTR: [] });
}

function formatWhen(iso: string | null): string {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleString("pt-BR");
}

export function FollowUpList({
  items,
  disabled,
  onEdit,
  onBaixa,
}: {
  items: FollowUpItem[];
  disabled?: boolean;
  onEdit: (item: FollowUpItem) => void;
  onBaixa: (item: FollowUpItem) => void;
}) {
  const t = useT();
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">{t("followUp.empty")}</p>
    );
  }

  let lastTipo = "";
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const showHeader = item.tre_descricao !== lastTipo;
        lastTipo = item.tre_descricao;
        return (
          <div key={item.pre_codigo}>
            {showHeader ? (
              <p className="mb-1 border-b border-border bg-muted/40 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                {item.tre_descricao}
              </p>
            ) : null}
            <div className="rounded-lg border border-border/50 bg-surface-container px-3 py-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  {formatWhen(item.pre_data)}
                  {item.usu_nome ? ` — ${item.usu_nome}` : ""}
                  {item.pre_dt_baixa
                    ? ` — [${formatWhen(item.pre_dt_baixa)}]`
                    : item.pre_dt_alarm
                      ? ` — ${t("followUp.alerta")} [${formatWhen(item.pre_dt_alarm)}]`
                      : ""}
                </p>
                <div className="flex shrink-0 items-center gap-1">
                  <FollowUpAlarmBadge nivel={item.alarm_nivel} />
                  {!disabled && item.can_edit ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onEdit(item)}
                      aria-label={t("followUp.change")}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  ) : null}
                  {!disabled && !item.pre_dt_baixa && item.pre_dt_alarm ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onBaixa(item)}
                      aria-label={t("followUp.baixa")}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                  ) : null}
                </div>
              </div>
              {item.mot_descricao ? (
                <p className="mt-1 text-xs font-medium text-foreground">
                  {t("followUp.motivo")}: {item.mot_descricao}
                </p>
              ) : null}
              <div
                className="mt-1 text-sm text-foreground"
                dangerouslySetInnerHTML={{ __html: sanitize(item.mensagem) }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
