import { ClipboardList, Clock, Factory, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useT } from "@/hooks/useT";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MOCK_OPS = [
  { id: "OP-26081", produto: "Transmissor LD301", linha: "Linha A", quantidade: 48, status: "Em separacao", previsao: "Hoje, 16:30" },
  { id: "OP-26082", produto: "Conversor FY302", linha: "Linha B", quantidade: 24, status: "Em montagem", previsao: "Amanha, 09:00" },
  { id: "OP-26091", produto: "Posicionador FY500", linha: "Linha C", quantidade: 12, status: "Aguardando teste", previsao: "Amanha, 14:15" },
  { id: "OP-26104", produto: "Sensor TT302", linha: "Linha A", quantidade: 36, status: "Liberada", previsao: "11/08, 10:00" },
];

export default function OrdemProducaoListPage() {
  const t = useT();
  const [search, setSearch] = useState("");

  usePageBreadcrumb([
    { label: t("nav.producao"), href: "/app/production" },
    { label: t("nav.ops") },
  ]);

  const items = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return MOCK_OPS;
    return MOCK_OPS.filter((item) =>
      [item.id, item.produto, item.linha, item.status].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [search]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Factory size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">{t("ops.title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("ops.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("ops.search")}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("ops.col.op")}</TableHead>
              <TableHead>{t("ops.col.product")}</TableHead>
              <TableHead>{t("ops.col.line")}</TableHead>
              <TableHead>{t("ops.col.quantity")}</TableHead>
              <TableHead>{t("ops.col.status")}</TableHead>
              <TableHead>{t("ops.col.due")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs font-semibold">{item.id}</TableCell>
                <TableCell>{item.produto}</TableCell>
                <TableCell>{item.linha}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700">
                    <Clock size={12} /> {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.previsao}</TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  {t("ops.empty")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <ClipboardList size={14} /> {t("ops.mock_notice")}
      </p>
    </div>
  );
}