import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CollectionHeader } from "@/components/ui/collection-header";
import { CollectionToolbar } from "@/components/ui/collection-toolbar";
import { EmptyState } from "@/components/ui/empty-state";
import { PaginationInfo } from "@/components/ui/pagination-blocks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useT } from "@/hooks/useT";
import { useViewMode } from "@/hooks/useViewMode";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { ApiError } from "../api/commercialApi";
import { ClienteFormDialog } from "../components/ClienteFormDialog";
import { ClienteCadastroCheckBadge } from "../components/ClienteCadastroCheckBadge";
import { ClienteRiscoStatusBadge } from "../components/ClienteRiscoStatusBadge";
import { ClienteRowActions } from "../components/ClienteRowActions";
import { useCommercialAccess } from "../hooks/useCommercialAccess";
import {
  useClientes,
  useCreateClienteFromFuncionario,
  useGravaCliente,
} from "../hooks/useClientes";
import type { ClienteListItem, GravaClienteInput } from "../types/cliente";

const VIEW_STORAGE_KEY = "smarnet:view:administracao-clientes";

export function ClientesPage() {
  const t = useT();
  const navigate = useNavigate();
  const { canAddCliente, canViewCliente, canChangeCliente } =
    useCommercialAccess();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, "tabela");

  const showActionsColumn = canViewCliente || canChangeCliente;

  usePageBreadcrumb([
    { label: t("nav.comercial"), href: "/app/commercial" },
    { label: t("administracao.clientes.title") },
  ]);

  const params = useMemo(
    () => ({
      search,
      page,
      page_size: 20,
    }),
    [search, page],
  );

  const { data, isLoading, error } = useClientes(params);
  const gravaCliente = useGravaCliente();
  const createFromFuncionario = useCreateClienteFromFuncionario();

  function openDetail(item: ClienteListItem) {
    navigate(`/app/commercial/customers/${item.codigo}`);
  }

  function openEdit(item: ClienteListItem) {
    navigate(`/app/commercial/customers/${item.codigo}/edit`);
  }

  function rowActions(
    item: ClienteListItem,
    variant: "menu" | "buttons" = "menu",
  ) {
    return (
      <ClienteRowActions
        variant={variant}
        canView={canViewCliente}
        canEdit={canChangeCliente && item.can_edit}
        onView={() => openDetail(item)}
        onEdit={() => openEdit(item)}
      />
    );
  }

  async function handleCreate(values: GravaClienteInput) {
    setFormError("");
    try {
      const result = await gravaCliente.mutateAsync(values);
      setCreateOpen(false);
      navigate(`/app/commercial/customers/${result.codigo}`);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.save_error"),
      );
    }
  }

  async function handleFromFuncionario(cpf: string) {
    setFormError("");
    try {
      const result = await createFromFuncionario.mutateAsync(cpf);
      setCreateOpen(false);
      navigate(`/app/commercial/customers/${result.codigo}`);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.save_error"),
      );
    }
  }

  const items = data?.items ?? [];
  const formSubmitting =
    gravaCliente.isPending || createFromFuncionario.isPending;

  return (
    <>
      <div className="space-y-6">
        <CollectionHeader
          icon={<Building2 size={20} />}
          title={t("administracao.clientes.title")}
          description={t("administracao.clientes.subtitle")}
          action={
            canAddCliente ? (
              <Button
                onClick={() => {
                  setFormError("");
                  setCreateOpen(true);
                }}
              >
                <Plus size={16} className="mr-1.5" />
                {t("administracao.clientes.new")}
              </Button>
            ) : null
          }
        />

        <CollectionToolbar
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          searchPlaceholder={t("administracao.clientes.search_placeholder")}
          searchAriaLabel={t("administracao.clientes.search_placeholder")}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {error ? (
          <Alert color="destructive" tone="soft">
            <AlertDescription>
              {error instanceof ApiError
                ? error.message
                : t("administracao.clientes.load_error")}
            </AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <EmptyState
            variant="loading"
            title={t("administracao.clientes.loading")}
          />
        ) : !data || items.length === 0 ? (
          <EmptyState title={t("administracao.clientes.empty")} />
        ) : (
          <>
            {viewMode === "tabela" ? (
              <Table>
                  <TableHeader>
                    <TableRow>
                      {showActionsColumn ? (
                        <TableHead className="w-10 px-2" />
                      ) : null}
                      <TableHead>
                        {t("administracao.clientes.col.codigo")}
                      </TableHead>
                      <TableHead>
                        {t("administracao.clientes.col.nome")}
                      </TableHead>
                      <TableHead>
                        {t("administracao.clientes.fields.reduzido")}
                      </TableHead>
                      <TableHead>
                        {t("administracao.clientes.col.documento")}
                      </TableHead>
                      <TableHead>
                        {t("administracao.clientes.col.cidade")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow
                        key={item.codigo}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onClick={() => openDetail(item)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openDetail(item);
                          }
                        }}
                      >
                        {showActionsColumn ? (
                          <TableCell className="w-10 px-2 py-2">
                            {rowActions(item)}
                          </TableCell>
                        ) : null}
                        <TableCell className="font-mono text-muted-foreground">
                          {item.codigo}
                        </TableCell>
                        <TableCell className="font-medium">
                          <span className="inline-flex max-w-full items-center gap-2">
                            <ClienteRiscoStatusBadge
                              letra={item.crs_cod_letra}
                              descLonga={item.crs_desc_longa}
                              restricao={item.crs_restricao}
                            />
                            <ClienteCadastroCheckBadge
                              checagem={item.cadastro_checagem}
                            />
                            <span className="truncate">
                              {item.cliente || "—"}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>{item.reduzido || "—"}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {item.cgc || "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.cidade || "—"}
                          {item.estado ? ` / ${item.estado}` : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            ) : null}

            {viewMode === "lista" ? (
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.codigo}
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetail(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openDetail(item);
                      }
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border/50 bg-background px-3 py-3 text-left transition-colors hover:border-primary/30 hover:bg-surface-container-low sm:gap-4 sm:px-4"
                  >
                    {showActionsColumn ? (
                      <div className="shrink-0">{rowActions(item)}</div>
                    ) : null}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-low font-mono text-xs font-bold text-muted-foreground">
                      {item.codigo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
                        <ClienteRiscoStatusBadge
                          letra={item.crs_cod_letra}
                          descLonga={item.crs_desc_longa}
                          restricao={item.crs_restricao}
                        />
                        <ClienteCadastroCheckBadge
                          checagem={item.cadastro_checagem}
                        />
                        <span className="truncate">{item.cliente || "—"}</span>
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.reduzido || "—"}
                        {item.cidade
                          ? ` · ${item.cidade}${item.estado ? ` / ${item.estado}` : ""}`
                          : ""}
                      </p>
                    </div>
                    <span className="hidden shrink-0 font-mono text-xs text-muted-foreground sm:inline">
                      {item.cgc || "—"}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {viewMode === "cards" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.codigo}
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetail(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openDetail(item);
                      }
                    }}
                    className="flex cursor-pointer flex-col rounded-2xl border border-border/50 bg-background p-5 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
                          <ClienteRiscoStatusBadge
                            letra={item.crs_cod_letra}
                            descLonga={item.crs_desc_longa}
                            restricao={item.crs_restricao}
                          />
                          <ClienteCadastroCheckBadge
                            checagem={item.cadastro_checagem}
                          />
                          <span className="truncate">
                            {item.cliente || "—"}
                          </span>
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {item.codigo}
                        </p>
                      </div>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">
                          {t("administracao.clientes.fields.reduzido")}
                        </dt>
                        <dd className="truncate font-medium text-foreground">
                          {item.reduzido || "—"}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">
                          {t("administracao.clientes.col.documento")}
                        </dt>
                        <dd className="truncate font-mono font-medium text-foreground">
                          {item.cgc || "—"}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">
                          {t("administracao.clientes.col.cidade")}
                        </dt>
                        <dd className="truncate font-medium text-foreground">
                          {item.cidade || "—"}
                          {item.estado ? ` / ${item.estado}` : ""}
                        </dd>
                      </div>
                    </dl>
                    {showActionsColumn ? (
                      <div className="mt-4 border-t border-border/40 pt-3">
                        {rowActions(item, "buttons")}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <PaginationInfo
              page={page}
              pageSize={data.page_size}
              total={data.total}
              onPageChange={setPage}
              prevLabel={t("administracao.clientes.prev")}
              nextLabel={t("administracao.clientes.next")}
            />
          </>
        )}
      </div>

      {canAddCliente ? (
        <ClienteFormDialog
          open={createOpen}
          onOpenChange={(open) => {
            setCreateOpen(open);
            if (!open) {
              setFormError("");
            }
          }}
          submitting={formSubmitting}
          error={formError}
          onSubmit={handleCreate}
          onCreateFromFuncionario={handleFromFuncionario}
          onOpenExisting={(codigo) => {
            setCreateOpen(false);
            navigate(`/app/commercial/customers/${codigo}`);
          }}
        />
      ) : null}
    </>
  );
}

export default ClientesPage;
