import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Loader2, Plus, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { useT } from "@/hooks/useT";
import { useViewMode } from "@/hooks/useViewMode";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { ApiError } from "../api/administracaoApi";
import { ClienteFormDialog } from "../components/ClienteFormDialog";
import { ClienteCadastroCheckBadge } from "../components/ClienteCadastroCheckBadge";
import { ClienteRiscoStatusBadge } from "../components/ClienteRiscoStatusBadge";
import { ClienteRowActions } from "../components/ClienteRowActions";
import { useAdministracaoAccess } from "../hooks/useAdministracaoAccess";
import {
  useAtualizaCliente,
  useCliente,
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
    useAdministracaoAccess();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingCodigo, setEditingCodigo] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, "tabela");

  const showActionsColumn = canViewCliente || canChangeCliente;

  usePageBreadcrumb([
    { label: t("nav.administracao"), href: "/app/administration" },
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
  const { data: editingCliente } = useCliente(editingCodigo);
  const gravaCliente = useGravaCliente();
  const atualizaCliente = useAtualizaCliente();
  const createFromFuncionario = useCreateClienteFromFuncionario();

  const totalPages = useMemo(() => {
    if (!data) {
      return 1;
    }
    return Math.max(1, Math.ceil(data.total / data.page_size));
  }, [data]);

  function openDetail(item: ClienteListItem) {
    navigate(`/app/administration/customers/${item.codigo}`);
  }

  function openEdit(item: ClienteListItem) {
    setFormError("");
    setCreateOpen(false);
    setEditingCodigo(item.codigo);
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
      navigate(`/app/administration/customers/${result.codigo}`);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.save_error"),
      );
    }
  }

  async function handleUpdate(values: GravaClienteInput) {
    if (editingCodigo == null) {
      return;
    }
    setFormError("");
    try {
      await atualizaCliente.mutateAsync({
        codigo: editingCodigo,
        input: values,
      });
      setEditingCodigo(null);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.update_error"),
      );
    }
  }

  async function handleFromFuncionario(cpf: string) {
    setFormError("");
    try {
      const result = await createFromFuncionario.mutateAsync(cpf);
      setCreateOpen(false);
      navigate(`/app/administration/customers/${result.codigo}`);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.save_error"),
      );
    }
  }

  const items = data?.items ?? [];
  const formOpen = createOpen || editingCodigo != null;
  const formSubmitting =
    gravaCliente.isPending ||
    atualizaCliente.isPending ||
    createFromFuncionario.isPending;
  const isEditing = editingCodigo != null;

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {t("administracao.clientes.title")}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("administracao.clientes.subtitle")}
              </p>
            </div>
          </div>
          {canAddCliente ? (
            <Button
              onClick={() => {
                setEditingCodigo(null);
                setFormError("");
                setCreateOpen(true);
              }}
            >
              <Plus size={16} className="mr-1.5" />
              {t("administracao.clientes.new")}
            </Button>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="pl-9"
              placeholder={t("administracao.clientes.search_placeholder")}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
          <ViewToggle
            className="sm:ml-auto"
            value={viewMode}
            onChange={setViewMode}
          />
        </div>

        {error ? (
          <Alert color="destructive" tone="soft" className="mt-4">
            <AlertDescription>
              {error instanceof ApiError
                ? error.message
                : t("administracao.clientes.load_error")}
            </AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            {t("administracao.clientes.loading")}
          </div>
        ) : !data || items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {t("administracao.clientes.empty")}
            </p>
          </div>
        ) : (
          <>
            {viewMode === "tabela" ? (
              <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
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
              </div>
            ) : null}

            {viewMode === "lista" ? (
              <div className="mt-6 space-y-2">
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
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {data.total === 1
                  ? t("administracao.clientes.records", {
                      count: data.total,
                    })
                  : t("administracao.clientes.records_plural", {
                      count: data.total,
                    })}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  {t("administracao.clientes.prev")}
                </Button>
                <span>
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  {t("administracao.clientes.next")}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {canAddCliente || canChangeCliente ? (
        <ClienteFormDialog
          open={formOpen}
          onOpenChange={(open) => {
            if (!open) {
              setCreateOpen(false);
              setEditingCodigo(null);
              setFormError("");
            }
          }}
          initial={isEditing ? (editingCliente ?? null) : null}
          submitting={formSubmitting}
          error={formError}
          onSubmit={isEditing ? handleUpdate : handleCreate}
          onCreateFromFuncionario={
            isEditing ? undefined : handleFromFuncionario
          }
          onOpenExisting={(codigo) => {
            setCreateOpen(false);
            setEditingCodigo(null);
            navigate(`/app/administration/customers/${codigo}`);
          }}
        />
      ) : null}
    </>
  );
}

export default ClientesPage;
