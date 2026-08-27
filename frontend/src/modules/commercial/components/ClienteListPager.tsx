import { PaginationInfo } from "@/components/ui/pagination-blocks";
import { useT } from "@/hooks/useT";

export const CLIENTE_CHILD_PAGE_SIZE = 20;

export function slicePage<T>(items: T[], page: number): T[] {
  const totalPages = Math.max(1, Math.ceil(items.length / CLIENTE_CHILD_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * CLIENTE_CHILD_PAGE_SIZE;
  return items.slice(start, start + CLIENTE_CHILD_PAGE_SIZE);
}

export function clampPage(total: number, page: number): number {
  const totalPages = Math.max(1, Math.ceil(total / CLIENTE_CHILD_PAGE_SIZE));
  return Math.min(Math.max(1, page), totalPages);
}

type ClienteListPagerProps = {
  total: number;
  page: number;
  onPageChange: (page: number) => void;
};

export function ClienteListPager({
  total,
  page,
  onPageChange,
}: ClienteListPagerProps) {
  const t = useT();
  if (total === 0) {
    return null;
  }
  return (
    <PaginationInfo
      className="mt-4"
      page={page}
      pageSize={CLIENTE_CHILD_PAGE_SIZE}
      total={total}
      onPageChange={onPageChange}
      prevLabel={t("administracao.clientes.prev")}
      nextLabel={t("administracao.clientes.next")}
    />
  );
}
