import { ClipboardList, Clock, Factory } from "lucide-react";
import { useMemo, useState } from "react";
import { useT } from "@/hooks/useT";
import { usePageBreadcrumb } from "@/contexts/PageBreadcrumbContext";
import { CollectionHeader } from "@/components/ui/collection-header";
import { CollectionToolbar } from "@/components/ui/collection-toolbar";
import { EmptyState } from "@/components/ui/empty-state";
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
    <div className="space-y-6">
      <CollectionHeader
        icon={<Factory size={20} />}
        title={t("ops.title")}
        description={t("ops.subtitle")}
      />

      <CollectionToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={t("ops.search")}
        searchAriaLabel={t("ops.search")}
      />

      {items.length === 0 ? (
        <EmptyState title={t("ops.empty")} />
      ) : (
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
          </TableBody>
        </Table>
      )}

      <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <ClipboardList size={14} /> {t("ops.mock_notice")}
      </p>
    </div>
  );
}