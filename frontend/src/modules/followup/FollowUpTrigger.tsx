import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FollowUpStatusIcon } from "@/components/ui/follow-up";
import { useT } from "@/hooks/useT";
import { FollowUp } from "./FollowUpHost";
import { useFollowUpStatus } from "./hooks";
import { followUpHostKey, followUpTabNameKey } from "./sistemas";

export type FollowUpHostTab = {
  sistema: number;
  filtro: string;
  disabled?: boolean;
};

function useHostTabLabel(sistema: number, filtro: string): string {
  const t = useT();
  const nameKey = followUpTabNameKey(sistema);
  const name = t(nameKey);
  const resolved = name === nameKey ? t("followUp.title") : name;
  return t("followUp.host_tab", { name: resolved, filtro });
}

function HostTabLabel({ sistema, filtro }: { sistema: number; filtro: string }) {
  return <>{useHostTabLabel(sistema, filtro)}</>;
}

export type FollowUpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hosts: FollowUpHostTab[];
  activeHostKey?: string;
  onActiveHostKeyChange?: (key: string) => void;
};

export function FollowUpDialog({
  open,
  onOpenChange,
  hosts,
  activeHostKey,
  onActiveHostKeyChange,
}: FollowUpDialogProps) {
  const t = useT();
  const keys = useMemo(
    () => hosts.map((host) => followUpHostKey(host.sistema, host.filtro)),
    [hosts],
  );
  const controlled = activeHostKey !== undefined;
  const [uncontrolled, setUncontrolled] = useState(keys[0] ?? "");
  const active = controlled ? activeHostKey : uncontrolled;

  useEffect(() => {
    if (keys.length === 0) {
      if (!controlled) setUncontrolled("");
      return;
    }
    if (!keys.includes(active)) {
      const fallback = keys[keys.length - 1] ?? "";
      if (controlled) onActiveHostKeyChange?.(fallback);
      else setUncontrolled(fallback);
    }
  }, [keys, active, controlled, onActiveHostKeyChange]);

  const tabValue = keys.includes(active) ? active : (keys[0] ?? "");

  function handleTabChange(next: string) {
    if (controlled) onActiveHostKeyChange?.(next);
    else setUncontrolled(next);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[640px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t("followUp.title")}</DialogTitle>
        </DialogHeader>
        {open && hosts.length > 0 && tabValue ? (
          <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
            <TabsList className="h-auto w-full justify-start overflow-x-auto">
              {hosts.map((host) => {
                const key = followUpHostKey(host.sistema, host.filtro);
                return (
                  <TabsTrigger key={key} value={key}>
                    <HostTabLabel sistema={host.sistema} filtro={host.filtro} />
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {hosts.map((host) => {
              const key = followUpHostKey(host.sistema, host.filtro);
              return (
                <TabsContent key={key} value={key}>
                  <div className="max-h-[55vh] overflow-auto pr-1">
                    <FollowUp
                      sistema={host.sistema}
                      filtro={host.filtro}
                      disabled={host.disabled}
                    />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        ) : null}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("followUp.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export type FollowUpTriggerProps = {
  sistema: number;
  filtro: string;
  disabled?: boolean;
};

export function FollowUpTrigger({
  sistema,
  filtro,
  disabled = false,
}: FollowUpTriggerProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const statusQuery = useFollowUpStatus(sistema, filtro);
  const nivel = statusQuery.data?.nivel ?? "none";
  const hosts = useMemo<FollowUpHostTab[]>(
    () => [{ sistema, filtro, disabled }],
    [sistema, filtro, disabled],
  );

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label={t("followUp.title")}
      >
        <FollowUpStatusIcon nivel={nivel} />
        {t("followUp.title")}
      </Button>
      <FollowUpDialog open={open} onOpenChange={setOpen} hosts={hosts} />
    </>
  );
}
