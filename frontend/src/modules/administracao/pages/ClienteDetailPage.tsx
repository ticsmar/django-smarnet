import { useState } from "react";
import { useParams } from "react-router-dom";
import { Building2, Loader2, Pencil } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/useT";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { ApiError } from "../api/administracaoApi";
import { ClienteFormDialog } from "../components/ClienteFormDialog";
import { useAdministracaoAccess } from "../hooks/useAdministracaoAccess";
import {
  useAtualizaCliente,
  useCliente,
} from "../hooks/useClientes";
import type { GravaClienteInput } from "../types/cliente";

export function ClienteDetailPage() {
  const t = useT();
  const { codCliente: codParam } = useParams();
  const codigo = Number(codParam);
  const { canChangeCliente } = useAdministracaoAccess();
  const [editOpen, setEditOpen] = useState(false);
  const [formError, setFormError] = useState("");

  usePageBreadcrumb([
    { label: t("nav.administracao"), href: "/app/administration" },
    {
      label: t("administracao.clientes.title"),
      href: "/app/administration/customers",
    },
    { label: String(codParam ?? "") },
  ]);

  const { data: cliente, isLoading, error } = useCliente(
    Number.isFinite(codigo) ? codigo : null,
  );
  const atualizaCliente = useAtualizaCliente();

  async function handleSave(values: GravaClienteInput) {
    setFormError("");
    try {
      await atualizaCliente.mutateAsync({ codigo, input: values });
      setEditOpen(false);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.update_error"),
      );
    }
  }

  if (!Number.isFinite(codigo)) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {t("administracao.clientes.invalid_code")}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("administracao.clientes.loading_one")}
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof ApiError
            ? error.message
            : t("administracao.clientes.load_one_error")}
        </AlertDescription>
      </Alert>
    );
  }

  const canEdit = canChangeCliente && cliente.can_edit;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("administracao.clientes.code_label", {
                  code: String(cliente.codigo),
                })}
              </p>
              <h1 className="text-xl font-semibold text-foreground">
                {cliente.cliente || cliente.reduzido || "—"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {[cliente.cidade, cliente.estado].filter(Boolean).join(" / ") ||
                  "—"}
              </p>
            </div>
          </div>
          {canEdit ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormError("");
                setEditOpen(true);
              }}
            >
              <Pencil size={16} /> {t("module.edit")}
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm md:grid-cols-2">
        <DetailField
          label={t("administracao.clientes.fields.reduzido")}
          value={cliente.reduzido}
        />
        <DetailField
          label={t("administracao.clientes.fields.documento")}
          value={cliente.cgc}
        />
        <DetailField
          label={t("administracao.clientes.fields.ie")}
          value={cliente.inscr_est}
        />
        <DetailField
          label={t("administracao.clientes.fields.natureza")}
          value={cliente.tipo}
        />
        <DetailField
          label={t("administracao.clientes.fields.endereco")}
          value={cliente.endereco1}
        />
        <DetailField
          label={t("administracao.clientes.fields.bairro")}
          value={cliente.cli_bairro}
        />
        <DetailField
          label={t("administracao.clientes.fields.cidade")}
          value={cliente.cidade}
        />
        <DetailField
          label={t("administracao.clientes.fields.estado")}
          value={cliente.estado}
        />
        <DetailField
          label={t("administracao.clientes.fields.cep")}
          value={cliente.cep}
        />
        <DetailField
          label={t("administracao.clientes.fields.telefone")}
          value={cliente.telefone1}
        />
        <DetailField
          label={t("administracao.clientes.fields.email")}
          value={cliente.email}
        />
        <DetailField
          label={t("administracao.clientes.fields.origem")}
          value={cliente.origem}
        />
      </div>

      <ClienteFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initial={cliente}
        submitting={atualizaCliente.isPending}
        error={formError}
        onSubmit={handleSave}
      />
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{value || "—"}</dd>
    </div>
  );
}

export default ClienteDetailPage;
