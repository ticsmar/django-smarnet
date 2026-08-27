import { useMemo, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AttachDialog,
  FolderDialog,
  HistoryDialog,
  MoveDialog,
} from "@/components/ui/file-manager/FileManagerDialogs";
import { FileManagerToolbar } from "@/components/ui/file-manager/FileManagerToolbar";
import { FileManagerTree } from "@/components/ui/file-manager/FileManagerTree";
import {
  isFileManagerDisabled,
  type FileManagerDisabled,
} from "@/components/ui/file-manager/treeUtils";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import { ApiError, downloadArquivoNode } from "./api";
import { useArquivoHistorico, useArquivoMutations, useArquivoTree } from "./hooks";
import type { ArquivoNode } from "./types";

export type { FileManagerDisabled };

export type FileManagerProps = {
  sistema: number;
  filtro: string;
  disabled?: FileManagerDisabled;
  className?: string;
};

export function FileManager({
  sistema,
  filtro,
  disabled = 0,
  className,
}: FileManagerProps) {
  const t = useT();
  const locked = isFileManagerDisabled(disabled);
  const treeQuery = useArquivoTree(sistema, filtro);
  const mutations = useArquivoMutations(sistema, filtro);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activeId, setActiveId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [dialog, setDialog] = useState<"attach" | "folder" | "move" | "history" | null>(
    null,
  );
  const [formError, setFormError] = useState("");

  const historyQuery = useArquivoHistorico(sistema, filtro, dialog === "history");
  const nodes = useMemo(() => treeQuery.data?.nodes ?? [], [treeQuery.data?.nodes]);
  const selectedNodes = useMemo(
    () => nodes.filter((node) => selected.has(node.par_codigo)),
    [nodes, selected],
  );
  const activeFolder = useMemo(() => {
    const active = nodes.find((node) => node.par_codigo === activeId);
    if (active?.tipo === 0 && !active.in_lixeira) {
      return active.par_codigo;
    }
    return active?.par_codigo_pai ?? null;
  }, [nodes, activeId]);

  function toggleSelect(parCodigo: number) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(parCodigo)) {
        next.delete(parCodigo);
      } else {
        next.add(parCodigo);
      }
      return next;
    });
  }

  function toggleExpand(parCodigo: number) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(parCodigo)) {
        next.delete(parCodigo);
      } else {
        next.add(parCodigo);
      }
      return next;
    });
  }

  function fail(error: unknown) {
    setFormError(error instanceof ApiError ? error.message : t("fileManager.error"));
  }

  async function handleTrash() {
    if (locked) {
      return;
    }
    setFormError("");
    try {
      await mutations.trashNodes.mutateAsync([...selected]);
      setSelected(new Set());
    } catch (error) {
      fail(error);
    }
  }

  async function handleDownload(node: ArquivoNode) {
    if (node.tipo !== 1) {
      return;
    }
    try {
      await downloadArquivoNode({
        par_codigo: node.par_codigo,
        sistema,
        filtro,
        nome: node.nome,
      });
    } catch (error) {
      fail(error);
    }
  }

  const mutateDisabled =
    selected.size === 0 || selectedNodes.some((node) => node.pasta_fixa);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/40 bg-background",
        className,
      )}
    >
      <FileManagerToolbar
        disabled={locked}
        disableMutate={mutateDisabled}
        onTrash={() => void handleTrash()}
        onAttach={() => setDialog("attach")}
        onFolder={() => setDialog("folder")}
        onMove={() => setDialog("move")}
        onHistory={() => setDialog("history")}
      />
      {formError ? (
        <Alert variant="destructive" className="m-3">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
      <div className="max-h-[28rem] overflow-auto px-2 pb-3">
        {treeQuery.isLoading ? (
          <p className="px-2 py-6 text-sm text-muted-foreground">{t("fileManager.loading")}</p>
        ) : treeQuery.error ? (
          <p className="px-2 py-6 text-sm text-destructive">{t("fileManager.load_error")}</p>
        ) : (
          <FileManagerTree
            rootLabel={treeQuery.data?.root_label ?? `${sistema}: ${filtro}`}
            nodes={nodes}
            selected={selected}
            activeId={activeId}
            expanded={expanded}
            disabled={locked}
            onToggleExpand={toggleExpand}
            onToggleSelect={toggleSelect}
            onActivate={(node) => setActiveId(node.par_codigo)}
            onDownload={(node) => void handleDownload(node)}
          />
        )}
      </div>

      {!locked && dialog === "attach" ? (
        <AttachDialog
          open
          nodes={nodes}
          defaultParent={activeFolder}
          submitting={mutations.uploadFile.isPending}
          onOpenChange={(open) => {
            if (!open) setDialog(null);
          }}
          onSubmit={(input) => {
            void (async () => {
              setFormError("");
              try {
                for (const file of input.files) {
                  await mutations.uploadFile.mutateAsync({
                    file,
                    descricao: input.descricao,
                    par_codigo_pai: input.par_codigo_pai,
                  });
                }
                setDialog(null);
              } catch (error) {
                fail(error);
              }
            })();
          }}
        />
      ) : null}

      {!locked && dialog === "folder" ? (
        <FolderDialog
          open
          nodes={nodes}
          defaultParent={activeFolder}
          submitting={mutations.createFolder.isPending}
          onOpenChange={(open) => {
            if (!open) setDialog(null);
          }}
          onSubmit={(input) => {
            void (async () => {
              setFormError("");
              try {
                await mutations.createFolder.mutateAsync(input);
                setDialog(null);
              } catch (error) {
                fail(error);
              }
            })();
          }}
        />
      ) : null}

      {!locked && dialog === "move" ? (
        <MoveDialog
          open
          nodes={nodes}
          selectedName={selectedNodes[0]?.nome ?? ""}
          submitting={mutations.moveNode.isPending}
          onOpenChange={(open) => {
            if (!open) setDialog(null);
          }}
          onSubmit={(input) => {
            void (async () => {
              setFormError("");
              try {
                const target = selectedNodes[0];
                if (!target) return;
                await mutations.moveNode.mutateAsync({
                  par_codigo: target.par_codigo,
                  par_codigo_pai: input.par_codigo_pai,
                  nome: input.nome,
                });
                setSelected(new Set());
                setDialog(null);
              } catch (error) {
                fail(error);
              }
            })();
          }}
        />
      ) : null}

      {dialog === "history" ? (
        <HistoryDialog
          open
          items={historyQuery.data ?? []}
          loading={historyQuery.isLoading}
          onOpenChange={(open) => {
            if (!open) setDialog(null);
          }}
        />
      ) : null}
    </div>
  );
}
