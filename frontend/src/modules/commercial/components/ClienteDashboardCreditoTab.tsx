import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { EmptyState } from "@/components/ui/empty-state";
import {
  FormGrid,
  FormMaskedInput,
  FormSection,
  formatMoneyMask,
  parseMoneyMask,
} from "@/components/ui/forms";
import { Panel } from "@/components/ui/panels";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/useT";
import { ApiError } from "../api/commercialApi";
import { ClienteBloqueioDialog } from "./ClienteBloqueioDialog";
import { ClienteRiscoStatusBadge } from "./ClienteRiscoStatusBadge";
import {
  formatDashboardDate,
  formatDashboardMoney,
  isNegativeAmount,
} from "./clienteDashboardFormat";
import { useGravaClienteDashboardLimites } from "../hooks/useClientes";
import { useCommercialAccess } from "../hooks/useCommercialAccess";
import type {
  ClienteDashboardCredito,
  ClienteDashboardOsPendente,
  ClienteDashboardPropostaPonto,
  ClienteDashboardSeriePonto,
  ClienteDashboardTituloPendente,
} from "../types/clienteDashboard";

type CreditoSubTab = "resumo" | "titulos" | "oss" | "cadastros";

const FAT_CONFIG: ChartConfig = {
  valor: { label: "Valor", color: "hsl(var(--primary))" },
  media: { label: "Média", color: "hsl(var(--secondary))" },
};

const PROP_CONFIG: ChartConfig = {
  proposta: { label: "Proposta", color: "hsl(var(--primary))" },
  os: { label: "O.S.", color: "hsl(var(--secondary))" },
};

function moneyClass(value: string | number | null | undefined): string {
  return isNegativeAmount(value) ? "text-destructive" : "";
}

function LedgerRow({
  sign,
  label,
  value,
  strong,
}: {
  sign: string;
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-3 border-b border-border/40 py-1.5 last:border-0",
        strong && "border-t border-border pt-2 font-semibold",
      )}
    >
      <span className="text-sm text-muted-foreground">
        {sign} {label}
      </span>
      <span className={cn("tabular-nums text-sm", moneyClass(value), strong && "text-foreground")}>
        {formatDashboardMoney(value)}
      </span>
    </div>
  );
}

function SerieValorCard({
  title,
  series,
  emptyLabel,
}: {
  title: string;
  series: ClienteDashboardSeriePonto[];
  emptyLabel: string;
}) {
  const t = useT();
  const data = useMemo(
    () =>
      series.map((item) => ({
        periodo: item.periodo,
        valor: Number(item.valor),
        media: Number(item.media),
      })),
    [series],
  );
  if (series.length === 0) {
    return (
      <Panel title={title} tone="outline">
        <EmptyState title={emptyLabel} />
      </Panel>
    );
  }
  return (
    <Panel title={title} tone="outline">
      <Tabs defaultValue="grafico">
        <TabsList>
          <TabsTrigger value="grafico">{t("cliente.dashboard.credito.graficos")}</TabsTrigger>
          <TabsTrigger value="tabela">{t("cliente.dashboard.credito.tabela")}</TabsTrigger>
        </TabsList>
        <TabsContent value="grafico">
          <ChartContainer config={FAT_CONFIG} className="h-56 w-full">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="valor" stroke="var(--color-valor)" dot />
              <Line type="monotone" dataKey="media" stroke="var(--color-media)" strokeDasharray="4 4" />
            </LineChart>
          </ChartContainer>
        </TabsContent>
        <TabsContent value="tabela">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("cliente.dashboard.credito.col.periodo")}</TableHead>
                <TableHead className="text-right">{t("cliente.dashboard.credito.col.valor")}</TableHead>
                <TableHead className="text-right">{t("cliente.dashboard.credito.col.media")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.map((item) => (
                <TableRow key={item.periodo}>
                  <TableCell>{item.periodo}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatDashboardMoney(item.valor)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatDashboardMoney(item.media)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Panel>
  );
}

function SeriePropostaCard({
  series,
  emptyLabel,
}: {
  series: ClienteDashboardPropostaPonto[];
  emptyLabel: string;
}) {
  const t = useT();
  const data = useMemo(
    () =>
      series.map((item) => ({
        periodo: item.periodo,
        proposta: Number(item.proposta),
        os: Number(item.os),
      })),
    [series],
  );
  if (series.length === 0) {
    return (
      <Panel title={t("cliente.dashboard.credito.proposta_ano")} tone="outline">
        <EmptyState title={emptyLabel} />
      </Panel>
    );
  }
  return (
    <Panel title={t("cliente.dashboard.credito.proposta_ano")} tone="outline">
      <Tabs defaultValue="grafico">
        <TabsList>
          <TabsTrigger value="grafico">{t("cliente.dashboard.credito.graficos")}</TabsTrigger>
          <TabsTrigger value="tabela">{t("cliente.dashboard.credito.tabela")}</TabsTrigger>
        </TabsList>
        <TabsContent value="grafico">
          <ChartContainer config={PROP_CONFIG} className="h-56 w-full">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="proposta" fill="var(--color-proposta)" radius={4} />
              <Bar dataKey="os" fill="var(--color-os)" radius={4} />
            </BarChart>
          </ChartContainer>
        </TabsContent>
        <TabsContent value="tabela">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("cliente.dashboard.credito.col.periodo")}</TableHead>
                <TableHead className="text-right">
                  {t("cliente.dashboard.credito.col.proposta")}
                </TableHead>
                <TableHead className="text-right">{t("cliente.dashboard.credito.col.os")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.map((item) => (
                <TableRow key={item.periodo}>
                  <TableCell>{item.periodo}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatDashboardMoney(item.proposta)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatDashboardMoney(item.os)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Panel>
  );
}

function ResumoTab({ data }: { data: ClienteDashboardCredito }) {
  const t = useT();
  const r = data.resumo;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={t("cliente.dashboard.credito.prazo")} tone="outline">
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.titulos_vencer")} value={r.titulos_a_vencer} />
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.titulos_vencidos")} value={r.titulos_vencidos} />
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.faturar_prazo")} value={r.valores_faturar_prazo} />
          <LedgerRow sign="(=)" label={t("cliente.dashboard.credito.concedido_prazo")} value={r.credito_concedido_prazo} strong />
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.limite_prazo")} value={r.limite_prazo} />
          <LedgerRow sign="(=)" label={t("cliente.dashboard.credito.saldo_prazo")} value={r.saldo_prazo} strong />
        </Panel>
        <Panel title={t("cliente.dashboard.credito.vista")} tone="outline">
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.faturar_antecipacao")} value={r.valores_faturar_antecipacao} />
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.faturar_vista")} value={r.valores_faturar_vista} />
          <LedgerRow sign="(-)" label={t("cliente.dashboard.credito.saldo_antecipacoes")} value={r.saldo_antecipacoes} />
          <LedgerRow sign="(=)" label={t("cliente.dashboard.credito.concedido_vista")} value={r.credito_concedido_vista} strong />
          <LedgerRow sign="(+)" label={t("cliente.dashboard.credito.limite_vista")} value={r.limite_vista} />
          <LedgerRow sign="(=)" label={t("cliente.dashboard.credito.saldo_vista")} value={r.saldo_vista} strong />
          <LedgerRow sign="(=)" label={t("cliente.dashboard.credito.saldo_geral")} value={r.saldo_geral} strong />
        </Panel>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-surface-container-low px-4 py-3">
          <p className="text-xs text-muted-foreground">{t("cliente.dashboard.credito.media_atraso")}</p>
          <p className={cn("mt-1 text-lg font-semibold tabular-nums", (r.media_atraso_dias ?? 0) < 0 && "text-destructive")}>
            {r.media_atraso_dias === null ? "—" : t("cliente.dashboard.credito.dias", { n: r.media_atraso_dias })}
          </p>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface-container-low px-4 py-3">
          <p className="text-xs text-muted-foreground">{t("cliente.dashboard.credito.media_antecipacao")}</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">
            {r.media_antecipacao_dias === null
              ? "—"
              : t("cliente.dashboard.credito.dias", { n: r.media_antecipacao_dias })}
          </p>
        </div>
      </div>
      {data.series_disponivel ? (
        <div className="grid gap-4 xl:grid-cols-3">
          <SerieValorCard
            title={t("cliente.dashboard.credito.faturamento_mes")}
            series={data.faturamento_mes}
            emptyLabel={t("cliente.dashboard.credito.series_empty")}
          />
          <SerieValorCard
            title={t("cliente.dashboard.credito.faturamento_ano")}
            series={data.faturamento_ano}
            emptyLabel={t("cliente.dashboard.credito.series_empty")}
          />
          <SeriePropostaCard
            series={data.proposta_ano}
            emptyLabel={t("cliente.dashboard.credito.series_empty")}
          />
        </div>
      ) : (
        <Alert>
          <AlertDescription>{t("cliente.dashboard.credito.series_unavailable")}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

function sumField(
  items: ClienteDashboardOsPendente[],
  field: keyof ClienteDashboardOsPendente,
): number {
  return items.reduce((acc, item) => acc + (Number(item[field]) || 0), 0);
}

function TitulosPendentesTab({ data }: { data: ClienteDashboardCredito }) {
  const t = useT();
  if (!data.titulos_pendentes_disponivel) {
    return (
      <Alert>
        <AlertDescription>{t("cliente.dashboard.credito.titulos_unavailable")}</AlertDescription>
      </Alert>
    );
  }
  const items = data.titulos_pendentes;
  if (items.length === 0) {
    return <EmptyState title={t("cliente.dashboard.credito.titulos_empty")} />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("cliente.dashboard.historico.col.os")}</TableHead>
          <TableHead>{t("cliente.dashboard.credito.col.nf")}</TableHead>
          <TableHead>{t("cliente.dashboard.credito.col.serie")}</TableHead>
          <TableHead>{t("cliente.dashboard.credito.col.parcela")}</TableHead>
          <TableHead>{t("cliente.dashboard.historico.col.vencimento")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.historico.col.valor")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: ClienteDashboardTituloPendente, index) => (
          <TableRow key={`${item.nf}-${item.parcela}-${index}`}>
            <TableCell className="font-mono">{item.os || "—"}</TableCell>
            <TableCell>{item.nf || "—"}</TableCell>
            <TableCell>{item.serie || "—"}</TableCell>
            <TableCell>{item.parcela || "—"}</TableCell>
            <TableCell>{formatDashboardDate(item.vencimento)}</TableCell>
            <TableCell className={cn("text-right tabular-nums", (item.dias ?? 1) <= 0 && "text-destructive")}>
              {formatDashboardMoney(item.valor)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-right">
            {t("cliente.dashboard.credito.total_vencer")}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(data.resumo.titulos_a_vencer)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5} className="text-right">
            {t("cliente.dashboard.credito.total_vencidos")}
          </TableCell>
          <TableCell className="text-right tabular-nums text-destructive">
            {formatDashboardMoney(data.resumo.titulos_vencidos)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function OssAntecipacoesTab({ data }: { data: ClienteDashboardCredito }) {
  const t = useT();
  if (!data.oss_pendentes_disponivel) {
    return (
      <Alert>
        <AlertDescription>{t("cliente.dashboard.credito.oss_unavailable")}</AlertDescription>
      </Alert>
    );
  }
  const items = data.oss_pendentes;
  if (items.length === 0) {
    return <EmptyState title={t("cliente.dashboard.credito.oss_empty")} />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={5}>{t("cliente.dashboard.credito.oss_aberto")}</TableHead>
          <TableHead colSpan={2}>{t("cliente.dashboard.credito.antecipacoes")}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead>{t("cliente.dashboard.historico.col.os")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.credito.col.faturado")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.credito.col.antecipado")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.credito.col.avista")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.credito.col.aprazo")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.credito.col.pg_antecipado")}</TableHead>
          <TableHead className="text-right">{t("cliente.dashboard.historico.col.saldo")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={`${item.order_no}-${index}`}>
            <TableCell className="font-mono">{item.os || "—"}</TableCell>
            <TableCell className="text-right tabular-nums">
              {formatDashboardMoney(item.valor_faturado)}
            </TableCell>
            <TableCell className={cn("text-right tabular-nums", moneyClass(item.antecipacao))}>
              {formatDashboardMoney(item.antecipacao)}
            </TableCell>
            <TableCell className={cn("text-right tabular-nums", moneyClass(item.avista))}>
              {formatDashboardMoney(item.avista)}
            </TableCell>
            <TableCell className={cn("text-right tabular-nums", moneyClass(item.parcela))}>
              {formatDashboardMoney(item.parcela)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatDashboardMoney(item.pg_antecipado)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatDashboardMoney(item.saldo_antecipacao)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>{t("cliente.dashboard.credito.total_os_linha")}</TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(sumField(items, "valor_faturado"))}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(sumField(items, "antecipacao"))}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(sumField(items, "avista"))}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(sumField(items, "parcela"))}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(sumField(items, "pg_antecipado"))}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {formatDashboardMoney(sumField(items, "saldo_antecipacao"))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function LimitesForm({
  data,
  canSave,
}: {
  data: ClienteDashboardCredito;
  canSave: boolean;
}) {
  const t = useT();
  const saveLimites = useGravaClienteDashboardLimites();
  const [limitecr, setLimitecr] = useState(formatMoneyMask(data.limitecr));
  const [limiteCrv, setLimiteCrv] = useState(formatMoneyMask(data.cli_limite_crv));
  const [error, setError] = useState("");

  useEffect(() => {
    setLimitecr(formatMoneyMask(data.limitecr));
    setLimiteCrv(formatMoneyMask(data.cli_limite_crv));
  }, [data.limitecr, data.cli_limite_crv]);

  async function handleSave() {
    if (!canSave) return;
    setError("");
    try {
      await saveLimites.mutateAsync({
        codigo: data.codigo,
        input: {
          limitecr: parseMoneyMask(limitecr),
          cli_limite_crv: parseMoneyMask(limiteCrv),
        },
      });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : t("cliente.dashboard.credito.limites_save_error"),
      );
    }
  }

  return (
    <FormSection title={t("cliente.dashboard.credito.cadastros")}>
      <FormGrid cols={2}>
        <FormMaskedInput
          id="dash-limitecr"
          mask="money"
          prefix="R$"
          label={t("cliente.dashboard.credito.limite")}
          value={limitecr}
          onChange={setLimitecr}
          disabled={!canSave}
          placeholder="0,00"
          inputClassName="tabular-nums text-right"
        />
        <FormMaskedInput
          id="dash-limite-crv"
          mask="money"
          prefix="R$"
          label={t("cliente.dashboard.credito.limite_crv")}
          value={limiteCrv}
          onChange={setLimiteCrv}
          disabled={!canSave}
          placeholder="0,00"
          inputClassName="tabular-nums text-right"
        />
      </FormGrid>
      <div className="pt-4">
        <Button
          type="button"
          onClick={() => void handleSave()}
          disabled={!canSave || saveLimites.isPending}
        >
          {t("cliente.dashboard.credito.salvar_limites")}
        </Button>
      </div>
      {error ? (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </FormSection>
  );
}

function CadastrosTab({
  data,
  onEditRestricoes,
}: {
  data: ClienteDashboardCredito;
  onEditRestricoes: () => void;
}) {
  const t = useT();
  const { canChangeClienteRisco } = useCommercialAccess();
  return (
    <div className="max-w-xl space-y-6">
      <LimitesForm data={data} canSave={canChangeClienteRisco} />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={onEditRestricoes} disabled={!canChangeClienteRisco}>
          {t("cliente.dashboard.credito.editar_restricoes")}
        </Button>
        <ClienteRiscoStatusBadge
          letra={data.risco_letra}
          descLonga={data.risco_descricao}
          restricao={data.risco_restricao ? Number(data.risco_restricao) : null}
          showDesc
        />
      </div>
      {!canChangeClienteRisco ? (
        <p className="text-sm text-muted-foreground">
          {t("cliente.dashboard.credito.limites_disabled")}
        </p>
      ) : null}
      {data.mensagem_bloqueio ? (
        <Alert>
          <AlertDescription>{data.mensagem_bloqueio}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}

export function ClienteDashboardCreditoTab({
  data,
}: {
  data: ClienteDashboardCredito;
}) {
  const t = useT();
  const [subTab, setSubTab] = useState<CreditoSubTab>("resumo");
  const [bloqueioOpen, setBloqueioOpen] = useState(false);
  const { canChangeClienteRisco } = useCommercialAccess();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {data.scope === "grupo" ? (
        <p className="mb-3 shrink-0 text-sm text-muted-foreground">
          {t("cliente.dashboard.credito.membros_grupo", {
            count: data.membros_grupo,
            cabeca: data.grupo_cabeca,
          })}
        </p>
      ) : null}
      <Tabs
        variant="folder"
        value={subTab}
        onValueChange={(value) => setSubTab(value as CreditoSubTab)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <TabsList>
          <TabsTrigger value="resumo">{t("cliente.dashboard.credito.tab.resumo")}</TabsTrigger>
          <TabsTrigger value="titulos">{t("cliente.dashboard.credito.tab.titulos")}</TabsTrigger>
          <TabsTrigger value="oss">{t("cliente.dashboard.credito.tab.oss")}</TabsTrigger>
          <TabsTrigger value="cadastros">{t("cliente.dashboard.credito.tab.cadastros")}</TabsTrigger>
        </TabsList>
        <TabsContent value="resumo" className="min-h-0 overflow-auto">
          <ResumoTab data={data} />
        </TabsContent>
        <TabsContent value="titulos" className="min-h-0 overflow-auto">
          <TitulosPendentesTab data={data} />
        </TabsContent>
        <TabsContent value="oss" className="min-h-0 overflow-auto">
          <OssAntecipacoesTab data={data} />
        </TabsContent>
        <TabsContent value="cadastros" className="min-h-0 overflow-auto">
          <CadastrosTab data={data} onEditRestricoes={() => setBloqueioOpen(true)} />
        </TabsContent>
      </Tabs>
      <ClienteBloqueioDialog
        open={bloqueioOpen}
        codigo={data.codigo}
        nome={data.nome}
        bloqueado={data.bloqueado}
        mensagemBloqueio={data.mensagem_bloqueio}
        canSave={canChangeClienteRisco}
        onOpenChange={setBloqueioOpen}
      />
    </div>
  );
}
