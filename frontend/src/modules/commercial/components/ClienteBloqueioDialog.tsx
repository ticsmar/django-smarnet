import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSelect, FormTextarea } from "@/components/ui/forms";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/commercialApi";
import { useClienteRiscos, useGravaClienteBloqueio } from "../hooks/useClientes";
import type { ClienteDetail } from "../types/cliente";

const MSG_DUPLICIDADE = "DUPLICIDADE/INVÁLIDO";
const MSG_JUDICIAL = "BLOQUEIO JUDICIAL";
const CRS_DUPLICIDADE = 2;
const CRS_JUDICIAL = 5;
const MENSAGEM_MAX = 2000;

type ClienteBloqueioDialogProps = {
  open: boolean;
  codigo: number;
  nome: string;
  bloqueado: number;
  mensagemBloqueio: string | null | undefined;
  canSave: boolean;
  onOpenChange: (open: boolean) => void;
};

function defaultMensagem(crsCodigo: number, current: string): string {
  if (current.trim()) {
    return current;
  }
  if (crsCodigo === CRS_DUPLICIDADE) {
    return MSG_DUPLICIDADE;
  }
  if (crsCodigo === CRS_JUDICIAL) {
    return MSG_JUDICIAL;
  }
  return current;
}

export function ClienteBloqueioDialog({
  open,
  codigo,
  nome,
  bloqueado,
  mensagemBloqueio,
  canSave,
  onOpenChange,
}: ClienteBloqueioDialogProps) {
  const t = useT();
  const [status, setStatus] = useState(String(bloqueado));
  const [mensagem, setMensagem] = useState(mensagemBloqueio ?? "");
  const [error, setError] = useState("");
  const { data: riscos = [], isLoading } = useClienteRiscos(open);
  const save = useGravaClienteBloqueio();

  useEffect(() => {
    if (!open) {
      return;
    }
    setStatus(String(bloqueado));
    setMensagem(mensagemBloqueio ?? "");
    setError("");
  }, [open, bloqueado, mensagemBloqueio]);

  const options = useMemo(
    () =>
      riscos
        .filter(
          (item) => item.codigo !== CRS_DUPLICIDADE || item.codigo === bloqueado,
        )
        .map((item) => ({
          value: String(item.codigo),
          label: `${(item.letra ?? "").trim()} — ${(item.desc ?? "").trim()}`.replace(
            /^ — /,
            "",
          ),
        })),
    [riscos, bloqueado],
  );

  const selected = riscos.find((item) => String(item.codigo) === status);

  function handleStatusChange(value: string) {
    setStatus(value);
    setMensagem((current) => defaultMensagem(Number(value), current));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) {
      return;
    }
    const nextCodigo = Number(status);
    if (
      selected?.restricao === 1 &&
      nextCodigo !== bloqueado &&
      !window.confirm(t("administracao.clientes.bloqueio.confirm_os"))
    ) {
      return;
    }
    setError("");
    try {
      await save.mutateAsync({
        codigo,
        input: {
          bloqueado: nextCodigo,
          mensagem_bloqueio: defaultMensagem(nextCodigo, mensagem),
        },
      });
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.bloqueio.save_error"),
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
          <DialogHeader>
            <DialogTitle>
              {codigo} - {nome}
            </DialogTitle>
          </DialogHeader>
          <FormSelect
            label={t("administracao.clientes.bloqueio.status")}
            value={status}
            onValueChange={handleStatusChange}
            options={options}
            disabled={!canSave || isLoading}
            placeholder={t("administracao.clientes.bloqueio.status_placeholder")}
          />
          <FormTextarea
            label={t("administracao.clientes.bloqueio.mensagem")}
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
            maxLength={MENSAGEM_MAX}
            showCounter
            counterMax={MENSAGEM_MAX}
            disabled={!canSave}
          />
          {!canSave ? (
            <p className="text-sm text-muted-foreground">
              {t("administracao.clientes.bloqueio.no_perm")}
            </p>
          ) : null}
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("module.cancel")}
            </Button>
            <Button type="submit" disabled={!canSave || save.isPending}>
              {t("administracao.clientes.bloqueio.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type ClienteBloqueioFromDetailProps = {
  open: boolean;
  cliente: ClienteDetail;
  canSave: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ClienteBloqueioFromDetail({
  open,
  cliente,
  canSave,
  onOpenChange,
}: ClienteBloqueioFromDetailProps) {
  return (
    <ClienteBloqueioDialog
      open={open}
      codigo={cliente.codigo}
      nome={cliente.cliente || cliente.reduzido || "—"}
      bloqueado={cliente.bloqueado}
      mensagemBloqueio={cliente.mensagem_bloqueio}
      canSave={canSave}
      onOpenChange={onOpenChange}
    />
  );
}
