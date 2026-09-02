import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { FormSelect } from "@/components/ui/forms";
import { PaginationInfo } from "@/components/ui/pagination-blocks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/commercialApi";
import { ClienteDashboardCreditoTab } from "./ClienteDashboardCreditoTab";
import {
  formatDashboardDate,
  formatDashboardMoney,
} from "./clienteDashboardFormat";
import {
  useClienteDashboardCredito,
  useClienteDashboardOs,
  useClienteDashboardTitulos,
} from "../hooks/useClienteDashboard";
import type { ClienteDashboardScope } from "../types/clienteDashboard";

export type ClienteDashboardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  codigo: number | null;
  nome?: string | null;
};

const PAGE_SIZE = 20;

function ScopeSelect({
  scope,
  onScopeChange,
}: {
  scope: ClienteDashboardScope;
  onScopeChange: (scope: ClienteDashboardScope) => void;
}) {
  const t = useT();
  return (
    <FormSelect
      id="cliente-dashboard-scope"
      label={t("cliente.dashboard.scope.label")}
      value={scope}
      onValueChange={(value) => onScopeChange(value as ClienteDashboardScope)}
      options={[
        { value: "cliente", label: t("cliente.dashboard.scope.cliente") },
        { value: "grupo", label: t("cliente.dashboard.scope.grupo") },
      ]}
      size="sm"
      className="w-44"
    />
  );
}

function CreditoTab({
  codigo,
  scope,
}: {
  codigo: number;
  scope: ClienteDashboardScope;
}) {
  const t = useT();
  const { data, isLoading, error } = useClienteDashboardCredito(codigo, scope);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("cliente.dashboard.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof ApiError
            ? error.message
            : t("cliente.dashboard.load_error")}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ClienteDashboardCreditoTab data={data} />
    </div>
  );
}

function HistoricoOsTab({
  codigo,
  scope,
}: {
  codigo: number;
  scope: ClienteDashboardScope;
}) {
  const t = useT();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useClienteDashboardOs(codigo, {
    scope,
    page,
    page_size: PAGE_SIZE,
  });

  useEffect(() => {
    setPage(1);
  }, [scope, codigo]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("cliente.dashboard.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof ApiError
            ? error.message
            : t("cliente.dashboard.load_error")}
        </AlertDescription>
      </Alert>
    );
  }

  const items = data?.items ?? [];

  if (items.length === 0) {
    return <EmptyState title={t("cliente.dashboard.historico.os_empty")} />;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("cliente.dashboard.historico.col.os")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.cliente")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.data")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.origem")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={`${item.order_no}-${item.cust_key}`}>
              <TableCell className="font-mono">{item.order_no}</TableCell>
              <TableCell>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.cust_key}
                </span>
                <span className="ml-2">{item.cliente_nome}</span>
              </TableCell>
              <TableCell>{formatDashboardDate(item.order_date)}</TableCell>
              <TableCell>{item.origem_descricao || item.origem || "—"}</TableCell>
              <TableCell>
                {item.os_encerrada
                  ? t("cliente.dashboard.historico.os_encerrada")
                  : item.order_status || t("cliente.dashboard.historico.os_aberta")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data ? (
        <PaginationInfo
          page={page}
          pageSize={data.page_size}
          total={data.total}
          onPageChange={setPage}
          prevLabel={t("administracao.clientes.prev")}
          nextLabel={t("administracao.clientes.next")}
        />
      ) : null}
    </div>
  );
}

function HistoricoTitulosTab({
  codigo,
  scope,
}: {
  codigo: number;
  scope: ClienteDashboardScope;
}) {
  const t = useT();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useClienteDashboardTitulos(codigo, {
    scope,
    page,
    page_size: PAGE_SIZE,
  });

  useEffect(() => {
    setPage(1);
  }, [scope, codigo]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        {t("cliente.dashboard.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof ApiError
            ? error.message
            : t("cliente.dashboard.load_error")}
        </AlertDescription>
      </Alert>
    );
  }

  if (data && !data.titulos_disponivel) {
    return (
      <Alert>
        <AlertDescription>
          {t("cliente.dashboard.historico.titulos_unavailable")}
        </AlertDescription>
      </Alert>
    );
  }

  const items = data?.items ?? [];

  if (items.length === 0) {
    return <EmptyState title={t("cliente.dashboard.historico.titulos_empty")} />;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("cliente.dashboard.historico.col.titulo")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.cliente")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.emissao")}</TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.vencimento")}</TableHead>
            <TableHead className="text-right">
              {t("cliente.dashboard.historico.col.valor")}
            </TableHead>
            <TableHead className="text-right">
              {t("cliente.dashboard.historico.col.saldo")}
            </TableHead>
            <TableHead>{t("cliente.dashboard.historico.col.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={`${item.numero}-${item.parcela}-${item.cliente_codigo}`}>
              <TableCell>
                {item.numero}
                {item.parcela ? ` / ${item.parcela}` : ""}
              </TableCell>
              <TableCell className="font-mono">{item.cliente_codigo}</TableCell>
              <TableCell>{formatDashboardDate(item.emissao)}</TableCell>
              <TableCell>{formatDashboardDate(item.vencimento)}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatDashboardMoney(item.valor)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatDashboardMoney(item.saldo)}
              </TableCell>
              <TableCell>{item.status || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data ? (
        <PaginationInfo
          page={page}
          pageSize={data.page_size}
          total={data.total}
          onPageChange={setPage}
          prevLabel={t("administracao.clientes.prev")}
          nextLabel={t("administracao.clientes.next")}
        />
      ) : null}
    </div>
  );
}

export function ClienteDashboardDialog({
  open,
  onOpenChange,
  codigo,
  nome,
}: ClienteDashboardDialogProps) {
  const t = useT();
  const [scope, setScope] = useState<ClienteDashboardScope>("cliente");
  const [mainTab, setMainTab] = useState("credito");
  const [histTab, setHistTab] = useState("os");

  useEffect(() => {
    if (!open) {
      setScope("cliente");
      setMainTab("credito");
      setHistTab("os");
    }
  }, [open]);

  const title =
    codigo !== null
      ? t("cliente.dashboard.title_with_client", {
          codigo,
          nome: nome || String(codigo),
        })
      : t("cliente.dashboard.title");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid h-[92vh] max-h-[92vh] w-[min(96vw,1400px)] max-w-[min(96vw,1400px)] grid-rows-[minmax(0,1fr)] gap-0 overflow-hidden p-0">
        <div className="flex h-full min-h-0 flex-col">
          <DialogHeader className="shrink-0 border-b border-border/50 px-6 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <DialogTitle>{title}</DialogTitle>
              {open && codigo !== null ? (
                <ScopeSelect scope={scope} onScopeChange={setScope} />
              ) : null}
            </div>
          </DialogHeader>

          {open && codigo !== null ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pt-4">
              <Tabs
                variant="folder"
                value={mainTab}
                onValueChange={setMainTab}
                className="flex min-h-0 flex-1 flex-col overflow-hidden"
              >
                <TabsList>
                  <TabsTrigger value="credito">
                    {t("cliente.dashboard.tab.credito")}
                  </TabsTrigger>
                  <TabsTrigger value="historico">
                    {t("cliente.dashboard.tab.historico")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="credito"
                  className="min-h-0 overflow-hidden"
                >
                  <CreditoTab codigo={codigo} scope={scope} />
                </TabsContent>

                <TabsContent
                  value="historico"
                  className="min-h-0 overflow-hidden"
                >
                  <Tabs
                    value={histTab}
                    onValueChange={setHistTab}
                    className="flex min-h-0 flex-1 flex-col overflow-hidden"
                  >
                    <TabsList className="mb-4 shrink-0">
                      <TabsTrigger value="os">
                        {t("cliente.dashboard.tab.os")}
                      </TabsTrigger>
                      <TabsTrigger value="titulos">
                        {t("cliente.dashboard.tab.titulos")}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="os" className="min-h-0 flex-1 overflow-auto">
                      <HistoricoOsTab codigo={codigo} scope={scope} />
                    </TabsContent>
                    <TabsContent
                      value="titulos"
                      className="min-h-0 flex-1 overflow-auto"
                    >
                      <HistoricoTitulosTab codigo={codigo} scope={scope} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </div>
          ) : null}

          <DialogFooter className="shrink-0 border-t border-border/50 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("cliente.dashboard.close")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
