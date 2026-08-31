import { useMemo, useState, type FormEvent } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { FormGrid, FormSection } from "@/components/ui/forms";
import { useT } from "@/hooks/useT";
import { useViewMode } from "@/hooks/useViewMode";
import { ApiError } from "../api/commercialApi";
import { useCommercialAccess } from "../hooks/useCommercialAccess";
import {
  useClienteContatos,
  useGravaClienteContato,
  useSetClienteContatoPadrao,
} from "../hooks/useClientes";
import type { ClienteContato, ClienteDetail } from "../types/cliente";
import { ClienteChildToolbar } from "./ClienteChildToolbar";
import { ClienteContatoFormDialog, type ContatoForm } from "./ClienteContatoFormDialog";
import { ClienteContatoList, type ContatoPadraoKind } from "./ClienteContatoList";
import { ClienteDisplayLines } from "./ClienteDisplayLines";
import { ClienteFormError } from "./ClienteDadosGeraisFields";
import { ClienteListPager, clampPage, slicePage } from "./ClienteListPager";
import { contatoLines, contatoMatches } from "./clienteContatoDisplay";
import { present } from "./clienteDisplay";

const VIEW_STORAGE_KEY = "smarnet:view:administracao-cliente-contatos";

const EMPTY: ContatoForm = {
  con_codigo: null,
  nome: "",
  nome_old: "",
  depto: "",
  cargo: "",
  telefone: "",
  fax: "",
  celular: "",
  email: "",
  con_ativo: 1,
};

type ClienteContatosTabProps = {
  cliente: ClienteDetail;
  editing?: boolean;
};

export function ClienteContatosTab({ cliente, editing = false }: ClienteContatosTabProps) {
  const t = useT();
  const { canViewContato, canAddContato, canChangeContato } =
    useCommercialAccess();
  const canAdd = canAddContato && editing;
  const canChange = canChangeContato && editing;
  const { data: contatos = [], isLoading } = useClienteContatos(
    canViewContato ? cliente.codigo : null,
  );
  const grava = useGravaClienteContato();
  const setPadrao = useSetClienteContatoPadrao();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<ContatoForm>(EMPTY);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useViewMode(VIEW_STORAGE_KEY, "tabela");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return contatos.filter((contato) => contatoMatches(contato, needle));
  }, [contatos, query]);
  const safePage = clampPage(filtered.length, page);
  const pageItems = slicePage(filtered, safePage);

  if (!canViewContato) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("administracao.clientes.tabs.no_perm")}
      </p>
    );
  }

  function openCreate() {
    setForm(EMPTY);
    setError("");
    setOpen(true);
  }

  function openEdit(contato: ClienteContato) {
    setForm({
      con_codigo: contato.con_codigo,
      nome: contato.nome ?? "",
      nome_old: contato.nome ?? "",
      depto: contato.depto ?? "",
      cargo: contato.cargo ?? "",
      telefone: contato.telefone ?? "",
      fax: contato.fax ?? "",
      celular: contato.celular ?? "",
      email: contato.email ?? "",
      con_ativo: contato.con_ativo ?? 1,
    });
    setError("");
    setOpen(true);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await grava.mutateAsync({
        codigo: cliente.codigo,
        input: {
          con_codigo: form.con_codigo,
          nome: form.nome,
          nome_old: form.nome_old || null,
          depto: form.depto || null,
          cargo: form.cargo || null,
          telefone: form.telefone || null,
          fax: form.fax || null,
          celular: form.celular || null,
          email: form.email || null,
          con_ativo: form.con_ativo,
        },
      });
      setOpen(false);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.contatos.save_error"),
      );
    }
  }

  async function markPadrao(contato: ClienteContato, kind: ContatoPadraoKind) {
    try {
      await setPadrao.mutateAsync({
        codigo: cliente.codigo,
        input: {
          con_codigo_com:
            kind === "com" ? contato.con_codigo : cliente.con_codigo_com,
          con_codigo_tec:
            kind === "tec" ? contato.con_codigo : cliente.con_codigo_tec,
          con_codigo_fin:
            kind === "fin" ? contato.con_codigo : cliente.con_codigo_fin,
        },
      });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("administracao.clientes.contatos.save_error"),
      );
    }
  }

  return (
    <div className="space-y-6">
      <DefaultContatosSummary cliente={cliente} contatos={contatos} />

      <ClienteChildToolbar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        searchPlaceholder={t("administracao.clientes.contatos.search_placeholder")}
        searchAriaLabel={t("administracao.clientes.contatos.search")}
        canAdd={canAdd}
        onAdd={openCreate}
        addLabel={t("administracao.clientes.contatos.novo")}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {error && !open ? <ClienteFormError error={error} /> : null}

      {isLoading ? (
        <EmptyState variant="loading" title={t("administracao.clientes.loading")} />
      ) : filtered.length === 0 ? (
        <EmptyState title={t("administracao.clientes.contatos.empty")} />
      ) : (
        <>
          <ClienteContatoList
            items={pageItems}
            viewMode={viewMode}
            canEdit={canChange}
            onEdit={openEdit}
            onSetPadrao={(contato, kind) => void markPadrao(contato, kind)}
          />
          <ClienteListPager
            total={filtered.length}
            page={safePage}
            onPageChange={setPage}
          />
        </>
      )}

      <ClienteContatoFormDialog
        open={open}
        form={form}
        error={open ? error : ""}
        submitting={grava.isPending}
        onOpenChange={setOpen}
        onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
        onSubmit={handleSave}
      />
    </div>
  );
}

function DefaultContatosSummary({
  cliente,
  contatos,
}: {
  cliente: ClienteDetail;
  contatos: ClienteContato[];
}) {
  const t = useT();
  const slots = [
    {
      key: "com",
      label: t("administracao.clientes.contatos.com"),
      codigo: cliente.con_codigo_com,
      fallback: cliente.contato,
    },
    {
      key: "tec",
      label: t("administracao.clientes.contatos.tec"),
      codigo: cliente.con_codigo_tec,
      fallback: cliente.contatotec,
    },
    {
      key: "fin",
      label: t("administracao.clientes.contatos.fin"),
      codigo: cliente.con_codigo_fin,
      fallback: cliente.contatofin,
    },
  ].filter((slot) => slot.codigo || present(slot.fallback));

  if (slots.length === 0) {
    return null;
  }

  return (
    <FormGrid cols={3} gap="lg">
      {slots.map((slot) => {
        const contato =
          contatos.find((item) => item.con_codigo === slot.codigo) ?? null;
        const name = present(contato?.nome) ?? present(slot.fallback);
        const lines = contato ? contatoLines(contato) : [];
        return (
          <FormSection key={slot.key} title={slot.label}>
            {name ? (
              <p className="text-sm font-semibold text-foreground">{name}</p>
            ) : null}
            <ClienteDisplayLines lines={lines} />
          </FormSection>
        );
      })}
    </FormGrid>
  );
}
