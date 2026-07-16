import { useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Droplets,
  Home,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  useAtivaFornecedor,
  useExcluiFornecContato,
  useFornecContatos,
  useFornecedor,
  useGravaFornecContato,
  useGravaFornecedor,
  useInativaFornecedor,
} from "../hooks/useFornecedores";
import { useComprasAccess } from "../hooks/useComprasAccess";
import { flagClass } from "../utils/paisFlags";
import type { FornecContato } from "../types/fornecedor";

type ContatoForm = {
  cod_contato: number | null;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
};

const EMPTY_CONTATO: ContatoForm = {
  cod_contato: null,
  nome: "",
  cargo: "",
  email: "",
  telefone: "",
};

export function FornecedorDetailPage() {
  const { codFornec: codParam } = useParams();
  const codFornec = Number(codParam);
  const {
    canChangeFornecedor,
    canViewFornecContato,
    canAddFornecContato,
    canChangeFornecContato,
    canDeleteFornecContato,
  } = useComprasAccess();

  const [editOpen, setEditOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [contatoOpen, setContatoOpen] = useState(false);
  const [contatoForm, setContatoForm] = useState<ContatoForm>(EMPTY_CONTATO);
  const [contatoError, setContatoError] = useState("");

  const { data: fornecedor, isLoading, error } = useFornecedor(
    Number.isFinite(codFornec) ? codFornec : null,
  );
  const { data: contatosData, isLoading: contatosLoading } = useFornecContatos({
    for_codigo:
      canViewFornecContato && Number.isFinite(codFornec) ? codFornec : null,
    page: 1,
    page_size: 100,
  });

  const gravaFornecedor = useGravaFornecedor();
  const ativaFornecedor = useAtivaFornecedor();
  const inativaFornecedor = useInativaFornecedor();
  const gravaContato = useGravaFornecContato();
  const excluiContato = useExcluiFornecContato();

  const isAtivo = fornecedor?.for_ativo === 1;

  const contactCount = useMemo(
    () => contatosData?.total ?? 0,
    [contatosData],
  );

  async function handleSave(values: FornecedorFormValues) {
    setFormError("");
    try {
      await gravaFornecedor.mutateAsync({
        ...values,
        cod_fornec: codFornec,
        idioma_msg: "P",
      });
      setEditOpen(false);
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : "Falha ao atualizar fornecedor.",
      );
    }
  }

  async function handleToggleAtivo() {
    setActionError("");
    try {
      if (isAtivo) {
        await inativaFornecedor.mutateAsync(codFornec);
      } else {
        await ativaFornecedor.mutateAsync(codFornec);
      }
    } catch (err) {
      setActionError(
        err instanceof ApiError
          ? err.message
          : "Falha ao alterar status do fornecedor.",
      );
    }
  }

  function openCreateContato() {
    setContatoForm(EMPTY_CONTATO);
    setContatoError("");
    setContatoOpen(true);
  }

  function openEditContato(contato: FornecContato) {
    setContatoForm({
      cod_contato: contato.fco_codigo,
      nome: contato.fco_nome ?? "",
      cargo: contato.fco_cargo ?? "",
      email: contato.fco_email ?? "",
      telefone: contato.fco_telefone ?? "",
    });
    setContatoError("");
    setContatoOpen(true);
  }

  async function handleSaveContato(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContatoError("");
    try {
      await gravaContato.mutateAsync({
        cod_contato: contatoForm.cod_contato,
        cod_fornec: codFornec,
        nome: contatoForm.nome,
        cargo: contatoForm.cargo,
        email: contatoForm.email,
        telefone: contatoForm.telefone,
        idioma_msg: "P",
      });
      setContatoOpen(false);
    } catch (err) {
      setContatoError(
        err instanceof ApiError ? err.message : "Falha ao gravar contato.",
      );
    }
  }

  async function handleDeleteContato(contato: FornecContato) {
    const confirmed = window.confirm(
      `Excluir o contato "${contato.fco_nome || contato.fco_codigo}"?`,
    );
    if (!confirmed) {
      return;
    }
    setActionError("");
    try {
      await excluiContato.mutateAsync(contato.fco_codigo);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Falha ao excluir contato.",
      );
    }
  }

  if (!Number.isFinite(codFornec)) {
    return (
      <Alert color="destructive" tone="soft">
        <AlertDescription>Código de fornecedor inválido.</AlertDescription>
      </Alert>
    );
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
        <Link
          to="/app/compras/fornecedores"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Compras
        </Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <Link
          to="/app/compras/fornecedores"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Fornecedores
        </Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="font-medium text-foreground">{codFornec}</span>
      </nav>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <Droplets size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {fornecedor?.for_razao_soc || "Fornecedor"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Código {codFornec}
                  {fornecedor?.for_nome_reduz
                    ? ` · ${fornecedor.for_nome_reduz}`
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {canChangeFornecedor ? (
                <Button
                  variant="outline"
                  disabled={!fornecedor || ativaFornecedor.isPending || inativaFornecedor.isPending}
                  onClick={() => void handleToggleAtivo()}
                >
                  {isAtivo ? "Inativar" : "Ativar"}
                </Button>
              ) : null}
              {canChangeFornecedor ? (
                <Button
                  disabled={!fornecedor}
                  onClick={() => {
                    setFormError("");
                    setEditOpen(true);
                  }}
                >
                  <Pencil size={16} className="mr-1.5" />
                  Editar
                </Button>
              ) : null}
            </div>
          </div>

          {actionError ? (
            <Alert color="destructive" tone="soft" className="mt-4">
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          ) : null}

          {isLoading ? (
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              Carregando fornecedor...
            </div>
          ) : error ? (
            <Alert color="destructive" tone="soft" className="mt-4">
              <AlertDescription>
                {error instanceof ApiError
                  ? error.message
                  : "Falha ao carregar fornecedor."}
              </AlertDescription>
            </Alert>
          ) : fornecedor ? (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      isAtivo
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isAtivo ? "Ativo" : "Inativo"}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  País
                </dt>
                <dd className="mt-1 inline-flex items-center gap-2 text-sm">
                  {(() => {
                    const cls = flagClass(fornecedor.pai_codigo);
                    return (
                      <>
                        {cls ? <span className={cls} /> : null}
                        <span>{fornecedor.pai_nome ?? "—"}</span>
                      </>
                    );
                  })()}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Endereço
                </dt>
                <dd className="mt-1 text-sm">
                  {[
                    fornecedor.for_endereco,
                    fornecedor.for_bairro,
                    fornecedor.for_munic,
                    fornecedor.for_estado,
                    fornecedor.for_cep,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Contatos</h2>
              <p className="text-sm text-muted-foreground">
                {canViewFornecContato
                  ? `${contactCount} contato${contactCount === 1 ? "" : "s"}`
                  : "Sem permissão para visualizar contatos."}
              </p>
            </div>
            {canAddFornecContato ? (
              <Button onClick={openCreateContato}>
                <Plus size={16} className="mr-1.5" />
                Novo contato
              </Button>
            ) : null}
          </div>

          {!canViewFornecContato ? (
            <div className="mt-6 rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
              Você não tem permissão para listar contatos deste fornecedor.
            </div>
          ) : contatosLoading ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              Carregando contatos...
            </div>
          ) : !contatosData || contatosData.items.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
              Nenhum contato cadastrado.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-xl border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    {(canChangeFornecContato || canDeleteFornecContato) && (
                      <TableHead className="text-right" />
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contatosData.items.map((contato) => (
                    <TableRow key={contato.fco_codigo}>
                      <TableCell className="font-medium">
                        {contato.fco_nome || "—"}
                      </TableCell>
                      <TableCell>{contato.fco_cargo || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {contato.fco_email || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {contato.fco_telefone || "—"}
                      </TableCell>
                      {(canChangeFornecContato || canDeleteFornecContato) && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {canChangeFornecContato ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditContato(contato)}
                              >
                                <Pencil size={14} />
                              </Button>
                            ) : null}
                            {canDeleteFornecContato ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => void handleDeleteContato(contato)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            ) : null}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {canChangeFornecedor ? (
        <FornecedorFormDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          initial={fornecedor}
          submitting={gravaFornecedor.isPending}
          error={formError}
          onSubmit={handleSave}
        />
      ) : null}

      {(canAddFornecContato || canChangeFornecContato) ? (
      <Dialog open={contatoOpen} onOpenChange={setContatoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {contatoForm.cod_contato ? "Editar contato" : "Novo contato"}
            </DialogTitle>
            <DialogDescription>
              Contatos do fornecedor gravados via procedimento Oracle.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSaveContato}>
            <div className="space-y-2">
              <Label htmlFor="contato_nome">Nome</Label>
              <Input
                id="contato_nome"
                required
                value={contatoForm.nome}
                onChange={(event) =>
                  setContatoForm((current) => ({
                    ...current,
                    nome: event.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contato_cargo">Cargo</Label>
              <Input
                id="contato_cargo"
                required
                value={contatoForm.cargo}
                onChange={(event) =>
                  setContatoForm((current) => ({
                    ...current,
                    cargo: event.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contato_email">E-mail</Label>
              <Input
                id="contato_email"
                type="email"
                required
                value={contatoForm.email}
                onChange={(event) =>
                  setContatoForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contato_telefone">Telefone</Label>
              <Input
                id="contato_telefone"
                required
                value={contatoForm.telefone}
                onChange={(event) =>
                  setContatoForm((current) => ({
                    ...current,
                    telefone: event.target.value,
                  }))
                }
              />
            </div>
            {contatoError ? (
              <p className="text-sm text-destructive">{contatoError}</p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setContatoOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={gravaContato.isPending}>
                {gravaContato.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      ) : null}
    </>
  );
}
