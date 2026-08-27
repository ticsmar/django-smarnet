import { Star } from "lucide-react";
import { StatusBadge } from "@/components/ui/badges";
import { useT } from "@/hooks/useT";
import type { DataViewMode } from "@/hooks/useViewMode";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { present } from "./clienteDisplay";
import {
  addressLines,
  contactLines,
  enderecoCidadeUf,
  type EnderecoRefRow,
} from "./clienteEnderecoDisplay";
import {
  ClienteChildRowActions,
  type ClienteChildAction,
} from "./ClienteChildRowActions";
import { ClienteDisplayLines } from "./ClienteDisplayLines";
import { rowActivateProps } from "./rowActivateProps";

type ClienteEnderecoRefListProps = {
  items: EnderecoRefRow[];
  viewMode: DataViewMode;
  canEdit: boolean;
  onEdit: (row: EnderecoRefRow) => void;
  onSetPadrao: (chave: string) => void;
};

export function ClienteEnderecoRefList({
  items,
  viewMode,
  canEdit,
  onEdit,
  onSetPadrao,
}: ClienteEnderecoRefListProps) {
  switch (viewMode) {
    case "tabela":
      return (
        <EnderecoTabela
          items={items}
          canEdit={canEdit}
          onEdit={onEdit}
          onSetPadrao={onSetPadrao}
        />
      );
    case "lista":
      return (
        <EnderecoLista
          items={items}
          canEdit={canEdit}
          onEdit={onEdit}
          onSetPadrao={onSetPadrao}
        />
      );
    case "cards":
      return (
        <EnderecoCards
          items={items}
          canEdit={canEdit}
          onEdit={onEdit}
          onSetPadrao={onSetPadrao}
        />
      );
    default: {
      const exhaustive: never = viewMode;
      return exhaustive;
    }
  }
}

type ViewProps = Omit<ClienteEnderecoRefListProps, "viewMode">;

function padraoAction(
  row: EnderecoRefRow,
  canEdit: boolean,
  onSetPadrao: ViewProps["onSetPadrao"],
  label: string,
): ClienteChildAction[] {
  if (!canEdit || row.is_padrao) {
    return [];
  }
  return [
    {
      key: "padrao",
      label,
      icon: Star,
      onClick: () => onSetPadrao(row.chave),
    },
  ];
}

function EnderecoStatusBadges({ row }: { row: EnderecoRefRow }) {
  const t = useT();
  return (
    <span className="inline-flex flex-wrap gap-1">
      {row.is_padrao ? (
        <StatusBadge
          label={t("administracao.clientes.enderecos.padrao")}
          color="accent"
          showDot={false}
          className="px-2 py-0.5"
        />
      ) : null}
      {row.ativo === 1 ? null : (
        <StatusBadge
          label={t("administracao.clientes.enderecos.inativo")}
          color="destructive"
          showDot={false}
          className="px-2 py-0.5"
        />
      )}
    </span>
  );
}

function useEnderecoActions(props: ViewProps) {
  const t = useT();
  const setPadraoLabel = t("administracao.clientes.enderecos.set_padrao");
  return (row: EnderecoRefRow, variant: "menu" | "buttons") => (
    <ClienteChildRowActions
      canEdit={props.canEdit}
      onEdit={() => props.onEdit(row)}
      extra={padraoAction(row, props.canEdit, props.onSetPadrao, setPadraoLabel)}
      variant={variant}
    />
  );
}

function EnderecoTabela(props: ViewProps) {
  const t = useT();
  const actions = useEnderecoActions(props);
  return (
    <Table>
        <TableHeader>
          <TableRow>
            {props.canEdit ? <TableHead className="w-10 px-2" /> : null}
            <TableHead>
              {t("administracao.clientes.enderecos.col.chave")}
            </TableHead>
            <TableHead>
              {t("administracao.clientes.enderecos.col.nome")}
            </TableHead>
            <TableHead>{t("administracao.clientes.col.cidade")}</TableHead>
            <TableHead>{t("administracao.clientes.fields.contato")}</TableHead>
            <TableHead>{t("administracao.clientes.col.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.items.map((row) => {
            const activate = rowActivateProps(
              props.canEdit ? () => props.onEdit(row) : undefined,
            );
            return (
              <TableRow
                key={row.chave}
                className={props.canEdit ? "cursor-pointer" : undefined}
                {...activate}
              >
                {props.canEdit ? (
                  <TableCell className="w-10 px-2 py-2">
                    {actions(row, "menu")}
                  </TableCell>
                ) : null}
                <TableCell className="font-mono text-muted-foreground">
                  {row.chave}
                </TableCell>
                <TableCell className="font-medium">
                  {present(row.nome) ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {enderecoCidadeUf(row) ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {present(row.contato) ?? "—"}
                </TableCell>
                <TableCell>
                  <EnderecoStatusBadges row={row} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}

function EnderecoLista(props: ViewProps) {
  const actions = useEnderecoActions(props);
  return (
    <div className="space-y-2">
      {props.items.map((row) => {
        const activate = rowActivateProps(
          props.canEdit ? () => props.onEdit(row) : undefined,
        );
        const title = present(row.nome) ?? row.chave;
        const lines = [...addressLines(row), ...contactLines(row)].slice(0, 2);
        return (
          <div
            key={row.chave}
            className={`flex w-full items-center gap-3 rounded-xl border border-border/50 bg-background px-3 py-3 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low sm:gap-4 sm:px-4 ${props.canEdit ? "cursor-pointer" : ""}`}
            {...activate}
          >
            {props.canEdit ? (
              <div className="shrink-0">{actions(row, "menu")}</div>
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                <span className="truncate">{title}</span>
                <EnderecoStatusBadges row={row} />
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {row.chave}
              </p>
              <ClienteDisplayLines lines={lines} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EnderecoCards(props: ViewProps) {
  const actions = useEnderecoActions(props);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {props.items.map((row) => {
        const activate = rowActivateProps(
          props.canEdit ? () => props.onEdit(row) : undefined,
        );
        const title = present(row.nome) ?? row.chave;
        const lines = [...addressLines(row), ...contactLines(row)];
        return (
          <div
            key={row.chave}
            className={`flex flex-col rounded-2xl border border-border/50 bg-background p-5 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low ${props.canEdit ? "cursor-pointer" : ""}`}
            {...activate}
          >
            <div className="mb-3 min-w-0">
              <p className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                <span className="truncate">{title}</span>
                <EnderecoStatusBadges row={row} />
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {row.chave}
              </p>
            </div>
            <ClienteDisplayLines lines={lines} />
            {props.canEdit ? (
              <div className="mt-4 border-t border-border/40 pt-3">
                {actions(row, "buttons")}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
