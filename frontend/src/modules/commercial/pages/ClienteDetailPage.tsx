import { useState } from "react";
import { Navigate, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Building2, Loader2, Pencil } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileManager } from "@/modules/files";
import { FollowUpTrigger } from "@/modules/followup";
import { SISTEMA_CLIENTE_FOLLOWUP } from "@/modules/followup/sistemas";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { useT } from "@/hooks/useT";
import { SISTEMA_CLIENTE } from "@/modules/files/sistemas";
import { ApiError } from "../api/commercialApi";
import { ClienteBloqueioFromDetail } from "../components/ClienteBloqueioDialog";
import { ClienteContatosTab } from "../components/ClienteContatosTab";
import { ClienteRiscoStatusBadge } from "../components/ClienteRiscoStatusBadge";
import { ClienteDadosGeraisForm } from "../components/ClienteDadosGeraisForm";
import { ClienteEnderecoRefsTab } from "../components/ClienteEnderecoRefsTab";
import { ClienteFinanceiroForm } from "../components/ClienteFinanceiroForm";
import { ClienteLogTab } from "../components/ClienteLogTab";
import { useCommercialAccess } from "../hooks/useCommercialAccess";
import {
  useAtualizaCliente,
  useCliente,
} from "../hooks/useClientes";
import type { GravaClienteInput } from "../types/cliente";

export function ClienteDetailPage() {
  const t = useT();
  const navigate = useNavigate();
  const { codCliente: codParam } = useParams();
  const [searchParams] = useSearchParams();
  const editMatch = useMatch("/app/commercial/customers/:codCliente/edit");
  const codigo = Number(codParam);
  const {
    canChangeCliente,
    canChangeClienteRisco,
    canViewCobranca,
    canAddCobranca,
    canChangeCobranca,
    canViewEmbarque,
    canAddEmbarque,
    canChangeEmbarque,
  } = useCommercialAccess();
  const [formError, setFormError] = useState("");
  const [bloqueioOpen, setBloqueioOpen] = useState(false);
  const detailPath = `/app/commercial/customers/${codParam ?? ""}`;
  const editPath = `${detailPath}/edit`;

  usePageBreadcrumb([
    { label: t("nav.comercial"), href: "/app/commercial" },
    {
      label: t("administracao.clientes.title"),
      href: "/app/commercial/customers",
    },
    { label: String(codParam ?? "") },
  ]);

  const { data: cliente, isLoading, error } = useCliente(
    Number.isFinite(codigo) ? codigo : null,
  );
  const atualizaCliente = useAtualizaCliente();

  function setEditing(next: boolean) {
    setFormError("");
    navigate(next ? editPath : detailPath, { replace: true });
  }

  async function handleSave(values: GravaClienteInput) {
    setFormError("");
    try {
      await atualizaCliente.mutateAsync({ codigo, input: values });
      setEditing(false);
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

  if (!editMatch && searchParams.get("edit") === "1") {
    return <Navigate to={editPath} replace />;
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
  if (editMatch && !canEdit) {
    return <Navigate to={detailPath} replace />;
  }
  const editing = Boolean(editMatch);
  const nome = cliente.cliente || cliente.reduzido || "—";

  return (
    <div className="flex flex-col gap-5 lg:min-h-0 lg:flex-1">
      <div className="shrink-0 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {cliente.codigo} - {nome}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("administracao.clientes.atualizacao", {
                  date: formatAtualizacao(cliente.dt_atual),
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={(event) => {
                event.stopPropagation();
                setBloqueioOpen(true);
              }}
              aria-haspopup="dialog"
              aria-label={t("administracao.clientes.bloqueio.open")}
            >
              <ClienteRiscoStatusBadge
                letra={cliente.crs_cod_letra}
                desc={cliente.crs_desc}
                descLonga={cliente.crs_desc_longa}
                restricao={cliente.crs_restricao}
                showDesc
                tone="solid"
                className="max-w-full px-3 py-1.5 text-sm"
              />
            </button>
            {canEdit && !editing ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil size={16} /> {t("module.edit")}
              </Button>
            ) : null}
            <FollowUpTrigger
              sistema={SISTEMA_CLIENTE_FOLLOWUP}
              filtro={String(cliente.codigo)}
              disabled={!editing}
            />
          </div>
        </div>
      </div>

      <Tabs variant="folder" fill defaultValue="gerais" className="w-full lg:min-h-0 lg:flex-1">
        <TabsList>
          <TabsTrigger value="gerais">
            {t("administracao.clientes.tabs.gerais")}
          </TabsTrigger>
          {cliente.show_financeiro !== false ? (
            <TabsTrigger value="financeiro">
              {t("administracao.clientes.tabs.financeiro")}
            </TabsTrigger>
          ) : null}
          <TabsTrigger value="contatos">
            {t("administracao.clientes.tabs.contatos")}
          </TabsTrigger>
          <TabsTrigger value="cobranca">
            {t("administracao.clientes.tabs.cobranca")}
          </TabsTrigger>
          <TabsTrigger value="embarque">
            {t("administracao.clientes.tabs.embarque")}
          </TabsTrigger>
          <TabsTrigger value="log">
            {t("administracao.clientes.tabs.log")}
          </TabsTrigger>
          <TabsTrigger value="arquivos">
            {t("administracao.clientes.tabs.arquivos")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gerais">
          <ClienteDadosGeraisForm
            initial={cliente}
            submitting={atualizaCliente.isPending}
            error={formError}
            disabled={!editing}
            onSubmit={handleSave}
            onCancel={() => setEditing(false)}
          />
        </TabsContent>

        {cliente.show_financeiro !== false ? (
          <TabsContent value="financeiro">
            <ClienteFinanceiroForm cliente={cliente} canEdit={canEdit && editing} />
          </TabsContent>
        ) : null}

        <TabsContent value="contatos">
          <ClienteContatosTab cliente={cliente} editing={editing} />
        </TabsContent>

        <TabsContent value="cobranca">
          <ClienteEnderecoRefsTab
            codigo={cliente.codigo}
            kind="cobranca"
            canView={canViewCobranca}
            canAdd={canAddCobranca && editing}
            canChange={canChangeCobranca && editing}
          />
        </TabsContent>

        <TabsContent value="embarque">
          <ClienteEnderecoRefsTab
            codigo={cliente.codigo}
            kind="embarque"
            canView={canViewEmbarque}
            canAdd={canAddEmbarque && editing}
            canChange={canChangeEmbarque && editing}
          />
        </TabsContent>

        <TabsContent value="log">
          <ClienteLogTab cliente={cliente} canEdit={canEdit && editing} />
        </TabsContent>

        <TabsContent value="arquivos">
          <FileManager
            sistema={SISTEMA_CLIENTE}
            filtro={String(cliente.codigo)}
            disabled={!editing}
          />
        </TabsContent>
      </Tabs>

      <ClienteBloqueioFromDetail
        open={bloqueioOpen}
        cliente={cliente}
        canSave={canChangeClienteRisco}
        onOpenChange={setBloqueioOpen}
      />
    </div>
  );
}

function formatAtualizacao(value: string | null): string {
  if (!value) {
    return "—";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString();
}

export default ClienteDetailPage;
