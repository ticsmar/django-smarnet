import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { useState } from 'react';
import {
  Pagination,
  PaginationWithFirstLast,
  PaginationInfo,
  PaginationPageSize,
} from '@/components/ui/pagination-blocks';

export default function PaginationShowcase() {
  const [page1, setPage1] = useState(3);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(3);
  const [page4, setPage4] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  return (
    <UIShowcaseLayout
      title="Pagination"
      description="Navegação paginada para listas e tabelas de dados."
    >
      <ShowcaseSection title="Paginação Básica">
        <Pagination page={page1} totalPages={5} onPageChange={setPage1} />
      </ShowcaseSection>

      <ShowcaseSection title="Com Primeiro/Último">
        <PaginationWithFirstLast
          page={page2}
          totalPages={45}
          onPageChange={setPage2}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Paginação com Informação">
        <PaginationInfo
          page={page3}
          pageSize={10}
          total={452}
          onPageChange={setPage3}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Seleção de Registros por Página">
        <PaginationPageSize
          page={page4}
          totalPages={45}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
