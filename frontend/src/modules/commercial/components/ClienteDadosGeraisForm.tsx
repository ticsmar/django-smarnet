import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/useT";
import type { ClienteDetail, GravaClienteInput } from "../types/cliente";
import {
  ClienteDadosGeraisFields,
  ClienteFormError,
} from "./ClienteDadosGeraisFields";
import {
  formFromCliente,
  payloadFromForm,
  type ClienteFormValues,
} from "./clienteFormModel";

type ClienteDadosGeraisFormProps = {
  initial: ClienteDetail;
  submitting?: boolean;
  error?: string;
  disabled?: boolean;
  statusSlot?: ReactNode;
  onSubmit: (values: GravaClienteInput) => Promise<void>;
  onCancel?: () => void;
};

export function ClienteDadosGeraisForm({
  initial,
  submitting = false,
  error = "",
  disabled = false,
  statusSlot,
  onSubmit,
  onCancel,
}: ClienteDadosGeraisFormProps) {
  const t = useT();
  const [form, setForm] = useState<ClienteFormValues>(() =>
    formFromCliente(initial),
  );

  useEffect(() => {
    setForm(formFromCliente(initial));
  }, [initial.codigo]);

  const update = useCallback(
    <K extends keyof ClienteFormValues>(key: K, value: ClienteFormValues[K]) => {
      setForm((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) {
      return;
    }
    await onSubmit(payloadFromForm(form));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <ClienteDadosGeraisFields
        form={form}
        onChange={update}
        documentoReadOnly
        disabled={disabled}
        statusSlot={statusSlot}
      />
      <ClienteFormError error={error} />
      {disabled ? null : (
        <div className="flex flex-wrap justify-center gap-2 border-t border-border/50 pt-4">
          {onCancel ? (
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("module.cancel")}
            </Button>
          ) : null}
          <Button type="submit" disabled={submitting}>
            {submitting
              ? t("administracao.clientes.saving")
              : t("administracao.clientes.atualizar")}
          </Button>
        </div>
      )}
    </form>
  );
}
