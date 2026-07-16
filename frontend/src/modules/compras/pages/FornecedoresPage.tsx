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

function statusLabel(ativo: number | null): string {
  return ativo === 1 ? "Ativo" : "Inativo";
}

export function FornecedoresPage() {
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
        err instanceof ApiError ? err.message : "Falha ao gravar fornecedor.",
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
        <span className="text-muted-foreground">Compras</span>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="font-medium text-foreground">Fornecedores</span>
      </nav>

      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Droplets size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Fornecedores
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Cadastro e consulta de fornecedores do módulo Compras.
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
              Novo fornecedor
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
              placeholder="Buscar por razão social ou nome..."
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
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">Ativos</SelectItem>
              <SelectItem value="0">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error ? (
          <Alert color="destructive" tone="soft" className="mt-4">
            <AlertDescription>
              {error instanceof ApiError
                ? error.message
                : "Falha ao carregar fornecedores."}
            </AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            Carregando fornecedores...
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum fornecedor encontrado.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Razão social</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Município</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>Status</TableHead>
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
                      </TableCell>                      <TableCell>
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
                {data.total} registro{data.total === 1 ? "" : "s"}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Anterior
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
                  Próxima
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
