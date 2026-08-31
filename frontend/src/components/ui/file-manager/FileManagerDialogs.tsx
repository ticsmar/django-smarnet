import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormFileUpload, FileListItem, FormInput, FormSelect } from "@/components/ui/forms";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useT } from "@/hooks/useT";
import type { FileManagerHistoricoItem, FileManagerNode } from "./types";
import { folderOptions, formatNodeDate, historicoAcaoLabel } from "./treeUtils";

const ROOT_VALUE = "root";
const TODOS_VALUE = "todos";

function folderSelectOptions(nodes: FileManagerNode[]) {
  return [
    { value: ROOT_VALUE, label: "—" },
    ...folderOptions(nodes).map((node) => ({
      value: String(node.par_codigo),
      label: node.nome,
    })),
  ];
}

export function AttachDialog({
  open,
  onOpenChange,
  nodes,
  defaultParent,
  submitting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: FileManagerNode[];
  defaultParent: number | null;
  submitting: boolean;
  onSubmit: (input: { files: File[]; par_codigo_pai: number | null; descricao: string }) => void;
}) {
  const t = useT();
  const [parent, setParent] = useState(defaultParent == null ? ROOT_VALUE : String(defaultParent));
  const [descricao, setDescricao] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("fileManager.attach.title")}</DialogTitle>
        </DialogHeader>
        <FormSelect
          label={t("fileManager.fields.folder")}
          value={parent}
          onValueChange={setParent}
          options={folderSelectOptions(nodes)}
        />
        <FormSelect
          label={t("fileManager.fields.group")}
          value={TODOS_VALUE}
          options={[{ value: TODOS_VALUE, label: t("fileManager.fields.group_all") }]}
        />
        <FormInput
          label={t("fileManager.fields.description")}
          value={descricao}
          maxLength={60}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <FormFileUpload
          multiple
          title={t("fileManager.attach.drop")}
          onFilesSelected={(list) => {
            if (!list) return;
            setFiles((current) => [...current, ...Array.from(list)]);
          }}
        />
        <div className="space-y-2">
          {files.map((file) => (
            <FileListItem
              key={`${file.name}-${file.size}`}
              name={file.name}
              size={`${Math.max(1, Math.round(file.size / 1024))} Kb`}
              progress={100}
              onRemove={() => setFiles((current) => current.filter((item) => item !== file))}
            />
          ))}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("fileManager.actions.exit")}
          </Button>
          <Button
            type="button"
            disabled={submitting || files.length === 0}
            onClick={() =>
              onSubmit({
                files,
                par_codigo_pai: parent === ROOT_VALUE ? null : Number(parent),
                descricao,
              })
            }
          >
            {t("fileManager.actions.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FolderDialog({
  open,
  onOpenChange,
  nodes,
  defaultParent,
  submitting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: FileManagerNode[];
  defaultParent: number | null;
  submitting: boolean;
  onSubmit: (input: { nome: string; descricao: string; par_codigo_pai: number | null }) => void;
}) {
  const t = useT();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [parent, setParent] = useState(defaultParent == null ? ROOT_VALUE : String(defaultParent));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("fileManager.folder.title")}</DialogTitle>
        </DialogHeader>
        <FormInput
          label={t("fileManager.fields.name")}
          required
          value={nome}
          maxLength={300}
          onChange={(event) => setNome(event.target.value)}
        />
        <FormInput
          label={t("fileManager.fields.description")}
          value={descricao}
          maxLength={60}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <FormSelect
          label={t("fileManager.fields.parent")}
          value={parent}
          onValueChange={setParent}
          options={folderSelectOptions(nodes)}
        />
        <FormSelect
          label={t("fileManager.fields.group")}
          value={TODOS_VALUE}
          options={[{ value: TODOS_VALUE, label: t("fileManager.fields.group_all") }]}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("fileManager.actions.exit")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !nome.trim()}
            onClick={() =>
              onSubmit({
                nome: nome.trim(),
                descricao,
                par_codigo_pai: parent === ROOT_VALUE ? null : Number(parent),
              })
            }
          >
            {t("fileManager.actions.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MoveDialog({
  open,
  onOpenChange,
  nodes,
  selectedName,
  submitting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: FileManagerNode[];
  selectedName: string;
  submitting: boolean;
  onSubmit: (input: { par_codigo_pai: number | null; nome: string }) => void;
}) {
  const t = useT();
  const [parent, setParent] = useState(ROOT_VALUE);
  const [nome, setNome] = useState(selectedName);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("fileManager.move.title")}</DialogTitle>
        </DialogHeader>
        <FormSelect
          label={t("fileManager.fields.folder")}
          value={parent}
          onValueChange={setParent}
          options={folderSelectOptions(nodes)}
        />
        <FormInput
          label={t("fileManager.fields.name")}
          value={nome}
          maxLength={300}
          onChange={(event) => setNome(event.target.value)}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("fileManager.actions.exit")}
          </Button>
          <Button
            type="button"
            disabled={submitting || !nome.trim()}
            onClick={() =>
              onSubmit({
                par_codigo_pai: parent === ROOT_VALUE ? null : Number(parent),
                nome: nome.trim(),
              })
            }
          >
            {t("fileManager.actions.insert")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function HistoryDialog({
  open,
  onOpenChange,
  items,
  loading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: FileManagerHistoricoItem[];
  loading: boolean;
}) {
  const t = useT();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-3xl flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{t("fileManager.history.title")}</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p className="text-sm text-muted-foreground">{t("fileManager.loading")}</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("fileManager.history.empty")}</p>
        ) : (
          <ScrollArea className="h-72 w-full rounded-md border border-border/40">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("fileManager.history.user")}</TableHead>
                  <TableHead>{t("fileManager.history.action")}</TableHead>
                  <TableHead>{t("fileManager.history.item")}</TableHead>
                  <TableHead>{t("fileManager.history.date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={`${item.nome}-${item.data ?? index}`}>
                    <TableCell className="whitespace-normal break-words">
                      {item.usuario_nome ?? "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {historicoAcaoLabel(item.acao)}
                    </TableCell>
                    <TableCell className="max-w-[16rem] whitespace-normal break-all">
                      {item.nome}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatNodeDate(item.data)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t("fileManager.actions.exit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
