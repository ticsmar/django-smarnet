import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Droplets,
  Home,
  Loader2,
  Plus,
  Search,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ApiError } from "../api/comprasApi";
import {
  FornecedorFormDialog,
  type FornecedorFormValues,
} from "../components/FornecedorFormDialog";
import {
  useFornecedores,
  useGravaFornecedor,
} from "../hooks/useFornecedores";
import { useComprasAccess } from "../hooks/useComprasAccess";
import { flagClass } from "../utils/paisFlags";

export function FornecedoresPage() {
  const t = useT();
  const navigate = useNavigate();
  const { canAddFornecedor } = useComprasAccess();
  const [search, setSearch] = useState("");
  const [ativo, setAtivo] = useState<"all" | "1" | "0">("all");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [formError, setFormError] = useState("");

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

  const totalPages = useMemo(() => {
    if (!data) {
      return 1;
    }
    return Math.max(1, Math.ceil(data.total / data.page_size));
  }, [data]);

  function statusLabel(ativoValue: number | null): string {
    return ativoValue === 1
      ? t("compras.status.active")
      : t("compras.status.inactive");
  }

  async function handleCreate(values: FornecedorFormValues) {
    setFormError("");
    try {
      const result = await gravaFornecedor.mutateAsync({
        ...values,
        cod_fornec: null,
        idioma_msg: "P",
      });
      setCreateOpen(false);
      navigate(`/app/compras/fornecedores/${result.cod_fornec}`);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : t("compras.fornecedores.save_error"),
      );
    }
  }

  return (
    <>
      <nav className="mb-6 flex items-center gap-1.5 text-sm">
        <Link
          to="/app"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Home size={14} />
        </Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-muted-foreground">{t("nav.compras")}</span>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="font-medium text-foreground">
          {t("compras.fornecedores.title")}
        </span>
      </nav>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Droplets size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {t("compras.fornecedores.title")}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("compras.fornecedores.subtitle")}
              </p>
            </div>
          </div>
          {canAddFornecedor ? (
            <Button
              onClick={() => {
                setFormError("");
                setCreateOpen(true);
              }}
            >
              <Plus size={16} className="mr-1.5" />
              {t("compras.fornecedores.new")}
            </Button>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="pl-9"
              placeholder={t("compras.fornecedores.search_placeholder")}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
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
        </div>

        {error ? (
          <Alert color="destructive" tone="soft" className="mt-4">
            <AlertDescription>
              {error instanceof ApiError
                ? error.message
                : t("compras.fornecedores.load_error")}
            </AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            {t("compras.fornecedores.loading")}
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {t("compras.fornecedores.empty")}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("compras.col.codigo")}</TableHead>
                    <TableHead>{t("compras.col.razao_social")}</TableHead>
                    <TableHead>{t("compras.col.nome")}</TableHead>
                    <TableHead>{t("compras.col.municipio")}</TableHead>
                    <TableHead>{t("compras.col.pais")}</TableHead>
                    <TableHead>{t("compras.col.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item) => (
                    <TableRow
                      key={item.for_codigo}
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/app/compras/fornecedores/${item.for_codigo}`)
                      }
                    >
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
                      <TableCell>
                        {(() => {
                          const cls = flagClass(item.pai_codigo);
                          return (
                            <span className="inline-flex items-center gap-2">
                              {cls ? <span className={cls} /> : null}
                              <span>{item.pai_nome || "—"}</span>
                            </span>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.for_ativo === 1
                              ? "bg-emerald-500/15 text-emerald-600"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {statusLabel(item.for_ativo)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {data.total === 1
                  ? t("compras.fornecedores.records", { count: data.total })
                  : t("compras.fornecedores.records_plural", {
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
                  {t("compras.fornecedores.prev")}
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
                  {t("compras.fornecedores.next")}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {canAddFornecedor ? (
        <FornecedorFormDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          submitting={gravaFornecedor.isPending}
          error={formError}
          onSubmit={handleCreate}
        />
      ) : null}
    </>
  );
}
