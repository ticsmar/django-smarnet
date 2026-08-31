import type { FormEvent } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormGrid, FormInput } from "@/components/ui/forms";
import { useT } from "@/hooks/useT";

export type ContatoForm = {
  con_codigo: number | null;
  nome: string;
  nome_old: string;
  depto: string;
  cargo: string;
  telefone: string;
  fax: string;
  celular: string;
  email: string;
  con_ativo: number;
};

type ClienteContatoFormDialogProps = {
  open: boolean;
  form: ContatoForm;
  error: string;
  submitting: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (patch: Partial<ContatoForm>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ClienteContatoFormDialog({
  open,
  form,
  error,
  submitting,
  onOpenChange,
  onChange,
  onSubmit,
}: ClienteContatoFormDialogProps) {
  const t = useT();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {form.con_codigo
                ? t("administracao.clientes.contatos.edit")
                : t("administracao.clientes.contatos.new")}
            </DialogTitle>
          </DialogHeader>
          <FormGrid cols={2}>
            <div className="sm:col-span-2">
              <FormInput
                label={t("administracao.clientes.contatos.col.nome")}
                value={form.nome}
                required
                onChange={(event) => onChange({ nome: event.target.value })}
              />
            </div>
            <FormInput
              label={t("administracao.clientes.contatos.depto")}
              value={form.depto}
              onChange={(event) => onChange({ depto: event.target.value })}
            />
            <FormInput
              label={t("administracao.clientes.contatos.cargo")}
              value={form.cargo}
              onChange={(event) => onChange({ cargo: event.target.value })}
            />
            <FormInput
              label={t("administracao.clientes.fields.telefone")}
              value={form.telefone}
              onChange={(event) => onChange({ telefone: event.target.value })}
            />
            <FormInput
              label={t("administracao.clientes.fields.fax")}
              value={form.fax}
              onChange={(event) => onChange({ fax: event.target.value })}
            />
            <FormInput
              label={t("administracao.clientes.fields.email")}
              value={form.email}
              onChange={(event) => onChange({ email: event.target.value })}
            />
            <FormInput
              label={t("administracao.clientes.contatos.celular")}
              value={form.celular}
              onChange={(event) => onChange({ celular: event.target.value })}
            />
          </FormGrid>
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
            <Button type="submit" disabled={submitting}>
              {t("module.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
