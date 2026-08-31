import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CollectionHeader } from "@/components/ui/collection-header";
import { CollectionToolbar } from "@/components/ui/collection-toolbar";
import { EmptyState } from "@/components/ui/empty-state";
import { PaginationInfo } from "@/components/ui/pagination-blocks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ApiError } from "../api/purchasingApi";
import {
  FornecedorFormDialog,
  type FornecedorFormValues,
} from "../components/FornecedorFormDialog";
import { FornecedorRowActions } from "../components/FornecedorRowActions";
import {
  useAtualizaFornecedor,
  useFornecedores,
  useGravaFornecedor,
  useInativaFornecedor,
} from "../hooks/useFornecedores";
import { usePurchasingAccess } from "../hooks/usePurchasingAccess";
import { flagClass } from "../utils/paisFlags";
import type { Fornecedor } from "../types/fornecedor";

const VIEW_STORAGE_KEY = "smarnet:view:compras-fornecedores";

export function FornecedoresPage() {
  const t = useT();
  const navigate = useNavigate();
  const {
    canAddFornecedor,
    canViewFornecedor,
    canChangeFornecedor,
    canDeleteFornecedor,
  } = usePurchasingAccess();
  const [search, setSearch] = useState("");
  const [ativo, setAtivo] = useState<"all" | "1" | "0">("all");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Fornecedor | null>(null);
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, "tabela");

  const showActionsColumn =
    canViewFornecedor || canChangeFornecedor || canDeleteFornecedor;

  usePageBreadcrumb([
    { label: t("nav.compras"), href: "/app/purchasing" },
    { label: t("compras.fornecedores.title") },
  ]);

  const params = useMemo(
    () => ({
      search,
      ativo: ativo === "all" ? null : Number(ativo),
      page,
      page_size: 20,
    }),
    [search, ativo, page],
  );

  const { data, isLoading, error } = useFornecedores(params);
  const gravaFornecedor = useGravaFornecedor();
  const atualizaFornecedor = useAtualizaFornecedor();
  const inativaFornecedor = useInativaFornecedor();

  function statusLabel(ativoValue: number | null): string {
    return ativoValue === 1
      ? t("compras.status.active")
      : t("compras.status.inactive");
  }

  function statusClass(ativoValue: number | null): string {
    return ativoValue === 1
      ? "bg-emerald-500/15 text-emerald-600"
      : "bg-muted text-muted-foreground";
  }

  function openDetail(item: Fornecedor) {
    navigate(`/app/purchasing/suppliers/${item.for_codigo}`);
  }

  function openEdit(item: Fornecedor) {
    setFormError("");
    setActionError("");
    setEditing(item);
  }

  async function handleDelete(item: Fornecedor) {
    const name = item.for_razao_soc || item.for_nome_reduz || String(item.for_codigo);
    if (
      !window.confirm(
        t("compras.fornecedores.delete_confirm", { name }),
      )
    ) {
      return;
    }
    setActionError("");
    try {
      await inativaFornecedor.mutateAsync(item.for_codigo);
    } catch (err) {
      setActionError(
        err instanceof ApiError
          ? err.message
          : t("compras.fornecedores.delete_error"),
      );
    }
  }

  function rowActions(
    item: Fornecedor,
    variant: "menu" | "buttons" = "menu",
  ) {
    const canSoftDelete =
      (canDeleteFornecedor || canChangeFornecedor) && item.for_ativo === 1;
    return (
      <FornecedorRowActions
        variant={variant}
        canView={canViewFornecedor}
        canEdit={canChangeFornecedor}
        canDelete={canSoftDelete}
        onView={() => openDetail(item)}
        onEdit={() => openEdit(item)}
        onDelete={() => void handleDelete(item)}
      />
    );
  }

  function paisCell(item: Fornecedor) {
    const cls = flagClass(item.pai_codigo);
    return (
      <span className="inline-flex items-center gap-2">
        {cls ? <span className={cls} /> : null}
        <span>{item.pai_nome || "—"}</span>
      </span>
    );
  }

  async function handleCreate(values: FornecedorFormValues) {
    setFormError("");
    try {
      const result = await gravaFornecedor.mutateAsync({
        ...values,
        idioma_msg: "P",
      });
      setCreateOpen(false);
      navigate(`/app/purchasing/suppliers/${result.cod_fornec}`);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("compras.fornecedores.save_error"),
      );
    }
  }

  async function handleUpdate(values: FornecedorFormValues) {
    if (!editing) return;
    setFormError("");
    try {
      await atualizaFornecedor.mutateAsync({
        codFornec: editing.for_codigo,
        input: { ...values, idioma_msg: "P" },
      });
      setEditing(null);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("compras.fornecedores.update_error"),
      );
    }
  }

  const items = data?.items ?? [];
  const formOpen = createOpen || editing !== null;
  const formSubmitting =
    gravaFornecedor.isPending || atualizaFornecedor.isPending;

  return (
    <>
      <div className="space-y-6">
        <CollectionHeader
          icon={<Droplets size={20} />}
          title={t("compras.fornecedores.title")}
          description={t("compras.fornecedores.subtitle")}
          action={
            canAddFornecedor ? (
              <Button
                onClick={() => {
                  setEditing(null);
                  setFormError("");
                  setCreateOpen(true);
                }}
              >
                <Plus size={16} className="mr-1.5" />
                {t("compras.fornecedores.new")}
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
          searchPlaceholder={t("compras.fornecedores.search_placeholder")}
          searchAriaLabel={t("compras.fornecedores.search_placeholder")}
          filters={
            <Select
              value={ativo}
              onValueChange={(value: "all" | "1" | "0") => {
                setAtivo(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder={t("compras.col.status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("compras.fornecedores.filter_all")}
                </SelectItem>
                <SelectItem value="1">
                  {t("compras.fornecedores.filter_ativos")}
                </SelectItem>
                <SelectItem value="0">
                  {t("compras.fornecedores.filter_inativos")}
                </SelectItem>
              </SelectContent>
            </Select>
          }
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {error ? (
          <Alert color="destructive" tone="soft">
            <AlertDescription>
              {error instanceof ApiError
                ? error.message
                : t("compras.fornecedores.load_error")}
            </AlertDescription>
          </Alert>
        ) : null}

        {actionError ? (
          <Alert color="destructive" tone="soft">
            <AlertDescription>{actionError}</AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <EmptyState
            variant="loading"
            title={t("compras.fornecedores.loading")}
          />
        ) : !data || items.length === 0 ? (
          <EmptyState title={t("compras.fornecedores.empty")} />
        ) : (
          <>
            {viewMode === "tabela" ? (
              <Table>
                  <TableHeader>
                    <TableRow>
                      {showActionsColumn ? (
                        <TableHead className="w-10 px-2" />
                      ) : null}
                      <TableHead>{t("compras.col.codigo")}</TableHead>
                      <TableHead>{t("compras.col.razao_social")}</TableHead>
                      <TableHead>{t("compras.col.nome")}</TableHead>
                      <TableHead>{t("compras.col.municipio")}</TableHead>
                      <TableHead>{t("compras.col.pais")}</TableHead>
                      <TableHead>{t("compras.col.status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow
                        key={item.for_codigo}
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
                          {item.for_codigo}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.for_razao_soc || "—"}
                        </TableCell>
                        <TableCell>{item.for_nome_reduz || "—"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.for_munic || "—"}
                          {item.for_estado ? ` / ${item.for_estado}` : ""}
                        </TableCell>
                        <TableCell>{paisCell(item)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(item.for_ativo)}`}
                          >
                            {statusLabel(item.for_ativo)}
                          </span>
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
                    key={item.for_codigo}
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetail(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openDetail(item);
                      }
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border/50 bg-background px-3 py-3 text-left transition-colors hover:border-primary/30 hover:bg-surface-container-low sm:gap-4 sm:px-4"
                  >
                    {showActionsColumn ? (
                      <div className="shrink-0">{rowActions(item)}</div>
                    ) : null}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-low font-mono text-xs font-bold text-muted-foreground">
                      {item.for_codigo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.for_razao_soc || "—"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.for_nome_reduz || "—"}
                        {item.for_munic
                          ? ` · ${item.for_munic}${item.for_estado ? ` / ${item.for_estado}` : ""}`
                          : ""}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:block">{paisCell(item)}</div>
                    <span
                      className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(item.for_ativo)}`}
                    >
                      {statusLabel(item.for_ativo)}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {viewMode === "cards" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.for_codigo}
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetail(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openDetail(item);
                      }
                    }}
                    className="flex cursor-pointer flex-col rounded-2xl border border-border/50 bg-background p-5 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {item.for_razao_soc || "—"}
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {item.for_codigo}
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(item.for_ativo)}`}
                      >
                        {statusLabel(item.for_ativo)}
                      </span>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">{t("compras.col.nome")}</dt>
                        <dd className="truncate font-medium text-foreground">
                          {item.for_nome_reduz || "—"}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">{t("compras.col.municipio")}</dt>
                        <dd className="truncate font-medium text-foreground">
                          {item.for_munic || "—"}
                          {item.for_estado ? ` / ${item.for_estado}` : ""}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">{t("compras.col.pais")}</dt>
                        <dd>{paisCell(item)}</dd>
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
              prevLabel={t("compras.fornecedores.prev")}
              nextLabel={t("compras.fornecedores.next")}
            />
          </>
        )}
      </div>

      {canAddFornecedor || canChangeFornecedor ? (
        <FornecedorFormDialog
          open={formOpen}
          onOpenChange={(open) => {
            if (!open) {
              setCreateOpen(false);
              setEditing(null);
              setFormError("");
            }
          }}
          initial={editing}
          submitting={formSubmitting}
          error={formError}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      ) : null}
    </>
  );
}
