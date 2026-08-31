import { useEffect, useState, type FormEvent } from "react";
import DOMPurify from "dompurify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormFieldShell, FormTextarea } from "@/components/ui/forms";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/commercialApi";
import {
  useAtualizaClienteObs,
  useClienteLogs,
} from "../hooks/useClientes";
import type { ClienteDetail, ClienteLog } from "../types/cliente";
import { ClienteFormError } from "./ClienteDadosGeraisFields";

const LOG_HTML_TAGS = ["br", "b", "i", "strong", "em", "u"];

function logHeader(item: ClienteLog): string {
  return [item.data_txt || item.lcl_data, item.usu_nome || item.usu_chapa]
    .filter(Boolean)
    .join(" - ");
}

function sanitizeLogHtml(raw: string): string {
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: LOG_HTML_TAGS,
    ALLOWED_ATTR: [],
  });
}

type ClienteLogTabProps = {
  cliente: ClienteDetail;
  canEdit: boolean;
};

export function ClienteLogTab({ cliente, canEdit }: ClienteLogTabProps) {
  const t = useT();
  const { data: logs = [], isLoading } = useClienteLogs(cliente.codigo);
  const save = useAtualizaClienteObs();
  const [observa, setObserva] = useState(cliente.observa ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setObserva(cliente.observa ?? "");
  }, [cliente.codigo, cliente.observa]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await save.mutateAsync({ codigo: cliente.codigo, observa });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.update_error"),
      );
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormTextarea
        id="cliente-obs"
        label={t("administracao.clientes.fields.observa")}
        value={observa}
        disabled={!canEdit}
        rows={8}
        onChange={(event) => setObserva(event.target.value)}
      />

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("administracao.clientes.loading")}
        </div>
      ) : (
        <FormFieldShell id="cliente-log" label={t("administracao.clientes.log.title")}>
          <div
            id="cliente-log"
            className="max-h-72 min-h-[12rem] overflow-y-auto rounded-md border border-input bg-muted/40 px-3 py-2 text-xs font-mono text-foreground"
          >
            {logs.length === 0 ? (
              <p className="text-muted-foreground">
                {t("administracao.clientes.log.empty")}
              </p>
            ) : (
              logs.map((item, index) => (
                <article
                  key={`${item.lcl_data}-${item.usu_chapa}-${index}`}
                  className="[&:not(:first-child)]:mt-3"
                >
                  <p className="font-medium">{logHeader(item)}</p>
                  {item.lcl_texto ? (
                    <div
                      className="break-words [&_br]:block"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeLogHtml(item.lcl_texto),
                      }}
                    />
                  ) : null}
                </article>
              ))
            )}
          </div>
        </FormFieldShell>
      )}

      <ClienteFormError error={error} />
      {canEdit ? (
        <div className="flex justify-center border-t border-border/50 pt-4">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending
              ? t("administracao.clientes.saving")
              : t("administracao.clientes.atualizar")}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
