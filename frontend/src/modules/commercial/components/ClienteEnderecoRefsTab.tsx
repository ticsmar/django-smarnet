import { useMemo, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { FormInput, FormSection } from "@/components/ui/forms";
import { useT } from "@/hooks/useT";
import { useViewMode } from "@/hooks/useViewMode";
import { ApiError } from "../api/commercialApi";
import {
  useClienteCobrancas,
  useClienteEmbarques,
  useGravaClienteCobranca,
  useGravaClienteEmbarque,
  useSetClienteCobrancaPadrao,
  useSetClienteEmbarquePadrao,
} from "../hooks/useClientes";
import { ClienteChildToolbar } from "./ClienteChildToolbar";
import { ClienteEnderecoRefFields } from "./ClienteEnderecoRefFields";
import { ClienteEnderecoRefList } from "./ClienteEnderecoRefList";
import { ClienteFormError } from "./ClienteDadosGeraisFields";
import { ClienteListPager, clampPage, slicePage } from "./ClienteListPager";
import {
  enderecoMatches,
  fromCobranca,
  fromEmbarque,
  type EnderecoRefRow,
} from "./clienteEnderecoDisplay";

type Kind = "cobranca" | "embarque";

type ClienteEnderecoRefsTabProps = {
  codigo: number;
  kind: Kind;
  canView: boolean;
  canAdd: boolean;
  canChange: boolean;
};

export function ClienteEnderecoRefsTab({
  codigo,
  kind,
  canView,
  canAdd,
  canChange,
}: ClienteEnderecoRefsTabProps) {
  const t = useT();
  const cobrancas = useClienteCobrancas(
    kind === "cobranca" && canView ? codigo : null,
  );
  const embarques = useClienteEmbarques(
    kind === "embarque" && canView ? codigo : null,
  );
  const gravaCobranca = useGravaClienteCobranca();
  const gravaEmbarque = useGravaClienteEmbarque();
  const setCobrancaPadrao = useSetClienteCobrancaPadrao();
  const setEmbarquePadrao = useSetClienteEmbarquePadrao();
  const [open, setOpen] = useState(false);
  const [editingChave, setEditingChave] = useState<string | null>(null);
  const [cliRef, setCliRef] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const viewKey =
    kind === "cobranca"
      ? "smarnet:view:administracao-cliente-cobranca"
      : "smarnet:view:administracao-cliente-embarque";
  const [viewMode, setViewMode] = useViewMode(viewKey, "tabela");

  const isCobranca = kind === "cobranca";
  const listQuery = isCobranca ? cobrancas : embarques;
  const rows: EnderecoRefRow[] = useMemo(() => {
    if (isCobranca) {
      return (cobrancas.data ?? []).map(fromCobranca);
    }
    return (embarques.data ?? []).map(fromEmbarque);
  }, [isCobranca, cobrancas.data, embarques.data]);
  const current = rows.find((row) => row.is_padrao) ?? rows[0] ?? null;
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => enderecoMatches(row, needle));
  }, [rows, query]);
  const safePage = clampPage(filtered.length, page);
  const pageItems = slicePage(filtered, safePage);

  if (!canView) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("administracao.clientes.tabs.no_perm")}
      </p>
    );
  }

  function openCreate() {
    setEditingChave(null);
    setCliRef("");
    setError("");
    setOpen(true);
  }

  function openEdit(row: EnderecoRefRow) {
    setEditingChave(row.chave);
    setCliRef(String(row.cli_codigo_ref ?? ""));
    setError("");
    setOpen(true);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ref = Number(cliRef);
    if (!Number.isFinite(ref) || ref <= 0) {
      setError(t("administracao.clientes.invalid_code"));
      return;
    }
    setError("");
    try {
      const input = {
        chave: editingChave,
        cli_codigo_ref: ref,
        ativo: 1,
        tipo_cadastro: (editingChave ? "A" : "I") as "I" | "A",
      };
      if (isCobranca) {
        await gravaCobranca.mutateAsync({ codigo, input });
      } else {
        await gravaEmbarque.mutateAsync({ codigo, input });
      }
      setOpen(false);
      setCliRef("");
      setEditingChave(null);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.update_error"),
      );
    }
  }

  async function handlePadrao(chave: string) {
    try {
      if (isCobranca) {
        await setCobrancaPadrao.mutateAsync({ codigo, chave });
      } else {
        await setEmbarquePadrao.mutateAsync({ codigo, chave });
      }
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.update_error"),
      );
    }
  }

  return (
    <div className="space-y-6">
      {listQuery.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("administracao.clientes.loading")}
        </div>
      ) : current ? (
        <FormSection
          title={
            isCobranca
              ? t("administracao.clientes.tabs.cobranca")
              : t("administracao.clientes.tabs.embarque")
          }
        >
          <p className="mb-3 font-mono text-xs text-muted-foreground">
            {current.chave}
          </p>
          <ClienteEnderecoRefFields row={current} />
        </FormSection>
      ) : null}

      {error && !open ? <ClienteFormError error={error} /> : null}

      <ClienteChildToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        searchPlaceholder={t(
          "administracao.clientes.enderecos.search_placeholder",
        )}
        searchAriaLabel={t("administracao.clientes.enderecos.search")}
        canAdd={canAdd}
        onAdd={openCreate}
        addLabel={t("administracao.clientes.enderecos.novo")}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {listQuery.isLoading ? null : filtered.length === 0 ? (
        <EmptyState title={t("administracao.clientes.enderecos.empty")} />
      ) : (
        <>
          <ClienteEnderecoRefList
            items={pageItems}
            viewMode={viewMode}
            canEdit={canChange}
            onEdit={openEdit}
            onSetPadrao={(chave) => void handlePadrao(chave)}
          />
          <ClienteListPager
            total={filtered.length}
            page={safePage}
            onPageChange={setPage}
          />
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form className="space-y-4" onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {editingChave
                  ? t("module.edit")
                  : t("administracao.clientes.enderecos.new")}
              </DialogTitle>
            </DialogHeader>
            <FormInput
              label={t("administracao.clientes.enderecos.cli_ref")}
              type="number"
              value={cliRef}
              required
              onChange={(event) => setCliRef(event.target.value)}
            />
            {error ? <ClienteFormError error={error} /> : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("module.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={gravaCobranca.isPending || gravaEmbarque.isPending}
              >
                {t("module.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
