import { Briefcase, Landmark, Wrench } from "lucide-react";
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
import type { ClienteContato } from "../types/cliente";
import { present } from "./clienteDisplay";
import {
  ClienteChildRowActions,
  type ClienteChildAction,
} from "./ClienteChildRowActions";
import { ClienteDisplayLines } from "./ClienteDisplayLines";
import {
  contatoCargoDepto,
  contatoLines,
  contatoPhones,
} from "./clienteContatoDisplay";
import { rowActivateProps } from "./rowActivateProps";

export type ContatoPadraoKind = "com" | "tec" | "fin";

type ClienteContatoListProps = {
  items: ClienteContato[];
  viewMode: DataViewMode;
  canEdit: boolean;
  onEdit: (contato: ClienteContato) => void;
  onSetPadrao: (contato: ClienteContato, kind: ContatoPadraoKind) => void;
};

export function ClienteContatoList({
  items,
  viewMode,
  canEdit,
  onEdit,
  onSetPadrao,
}: ClienteContatoListProps) {
  switch (viewMode) {
    case "tabela":
      return (
        <ContatoTabela
          items={items}
          canEdit={canEdit}
          onEdit={onEdit}
          onSetPadrao={onSetPadrao}
        />
      );
    case "lista":
      return (
        <ContatoLista
          items={items}
          canEdit={canEdit}
          onEdit={onEdit}
          onSetPadrao={onSetPadrao}
        />
      );
    case "cards":
      return (
        <ContatoCards
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

type ViewProps = Omit<ClienteContatoListProps, "viewMode">;

function padraoActions(
  contato: ClienteContato,
  canEdit: boolean,
  onSetPadrao: ViewProps["onSetPadrao"],
  labels: { com: string; tec: string; fin: string },
): ClienteChildAction[] {
  if (!canEdit) {
    return [];
  }
  const extra: ClienteChildAction[] = [];
  if (!contato.is_comercial) {
    extra.push({
      key: "com",
      label: labels.com,
      icon: Briefcase,
      onClick: () => onSetPadrao(contato, "com"),
    });
  }
  if (!contato.is_tecnico) {
    extra.push({
      key: "tec",
      label: labels.tec,
      icon: Wrench,
      onClick: () => onSetPadrao(contato, "tec"),
    });
  }
  if (!contato.is_financeiro) {
    extra.push({
      key: "fin",
      label: labels.fin,
      icon: Landmark,
      onClick: () => onSetPadrao(contato, "fin"),
    });
  }
  return extra;
}

function ContatoRoleBadges({ contato }: { contato: ClienteContato }) {
  const t = useT();
  const badges: Array<{ key: string; label: string }> = [];
  if (contato.is_comercial) {
    badges.push({ key: "com", label: t("administracao.clientes.contatos.com") });
  }
  if (contato.is_tecnico) {
    badges.push({ key: "tec", label: t("administracao.clientes.contatos.tec") });
  }
  if (contato.is_financeiro) {
    badges.push({ key: "fin", label: t("administracao.clientes.contatos.fin") });
  }
  if (badges.length === 0) {
    return null;
  }
  return (
    <span className="inline-flex flex-wrap gap-1">
      {badges.map((badge) => (
        <StatusBadge
          key={badge.key}
          label={badge.label}
          color="accent"
          showDot={false}
          className="px-2 py-0.5"
        />
      ))}
    </span>
  );
}

function useContatoActions(props: ViewProps) {
  const t = useT();
  const labels = {
    com: t("administracao.clientes.contatos.set_com"),
    tec: t("administracao.clientes.contatos.set_tec"),
    fin: t("administracao.clientes.contatos.set_fin"),
  };
  return (contato: ClienteContato, variant: "menu" | "buttons") => (
    <ClienteChildRowActions
      canEdit={props.canEdit}
      onEdit={() => props.onEdit(contato)}
      extra={padraoActions(contato, props.canEdit, props.onSetPadrao, labels)}
      variant={variant}
    />
  );
}

function ContatoTabela(props: ViewProps) {
  const t = useT();
  const actions = useContatoActions(props);
  return (
    <Table>
        <TableHeader>
          <TableRow>
            {props.canEdit ? <TableHead className="w-10 px-2" /> : null}
            <TableHead>{t("administracao.clientes.contatos.col.nome")}</TableHead>
            <TableHead>{t("administracao.clientes.contatos.depto")}</TableHead>
            <TableHead>{t("administracao.clientes.fields.telefone")}</TableHead>
            <TableHead>{t("administracao.clientes.fields.email")}</TableHead>
            <TableHead>{t("administracao.clientes.contatos.roles")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.items.map((contato) => {
            const activate = rowActivateProps(
              props.canEdit ? () => props.onEdit(contato) : undefined,
            );
            return (
              <TableRow
                key={contato.con_codigo}
                className={props.canEdit ? "cursor-pointer" : undefined}
                {...activate}
              >
                {props.canEdit ? (
                  <TableCell className="w-10 px-2 py-2">
                    {actions(contato, "menu")}
                  </TableCell>
                ) : null}
                <TableCell className="font-medium">
                  {present(contato.nome) ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {contatoCargoDepto(contato) ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {contatoPhones(contato) ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {present(contato.email) ?? "—"}
                </TableCell>
                <TableCell>
                  <ContatoRoleBadges contato={contato} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
  );
}

function ContatoLista(props: ViewProps) {
  const actions = useContatoActions(props);
  return (
    <div className="space-y-2">
      {props.items.map((contato) => {
        const activate = rowActivateProps(
          props.canEdit ? () => props.onEdit(contato) : undefined,
        );
        const name = present(contato.nome) ?? "—";
        return (
          <div
            key={contato.con_codigo}
            className={`flex w-full items-center gap-3 rounded-xl border border-border/50 bg-background px-3 py-3 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low sm:gap-4 sm:px-4 ${props.canEdit ? "cursor-pointer" : ""}`}
            {...activate}
          >
            {props.canEdit ? (
              <div className="shrink-0">{actions(contato, "menu")}</div>
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                <span className="truncate">{name}</span>
                <ContatoRoleBadges contato={contato} />
              </p>
              <ClienteDisplayLines lines={contatoLines(contato)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContatoCards(props: ViewProps) {
  const actions = useContatoActions(props);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {props.items.map((contato) => {
        const activate = rowActivateProps(
          props.canEdit ? () => props.onEdit(contato) : undefined,
        );
        const name = present(contato.nome) ?? "—";
        const lines = contatoLines(contato);
        return (
          <div
            key={contato.con_codigo}
            className={`flex flex-col rounded-2xl border border-border/50 bg-background p-5 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-surface-container-low ${props.canEdit ? "cursor-pointer" : ""}`}
            {...activate}
          >
            <div className="mb-3 min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {name}
              </p>
              <div className="mt-1">
                <ContatoRoleBadges contato={contato} />
              </div>
            </div>
            <ClienteDisplayLines lines={lines} />
            {props.canEdit ? (
              <div className="mt-4 border-t border-border/40 pt-3">
                {actions(contato, "buttons")}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
