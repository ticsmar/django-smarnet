import { useState } from 'react';
import {
  Pagination,
  PaginationWithFirstLast,
  PaginationInfo,
  PaginationPageSize,
} from '@/components/ui/pagination-blocks';
import { ComponentDoc, DocSection, VariantSection, PropsTable } from '../_docs';

export default function PaginationPage() {
  const [page1, setPage1] = useState(3);
  const [page2, setPage2] = useState(2);
  const [page3, setPage3] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [page4, setPage4] = useState(1);

  return (
    <ComponentDoc
      summary="Quatro componentes de paginação: numérica básica, com primeira/última + ellipsis, com indicador 'Exibindo X-Y de N' e seletor de tamanho de página."
      importPath="@/components/ui/pagination-blocks"
    >
      <DocSection title="Pagination" description="Numérica básica com prev/next.">
        <VariantSection
          title="Default"
          preview={<Pagination page={page1} totalPages={10} onPageChange={setPage1} />}
          code={`const [page, setPage] = useState(1);

<Pagination page={page} totalPages={10} onPageChange={setPage} />`}
        />
        <PropsTable
          rows={[
            { name: 'page', type: 'number', required: true, description: 'Página atual (1-indexada).' },
            { name: 'totalPages', type: 'number', required: true, description: 'Total de páginas.' },
            { name: 'onPageChange', type: '(p: number) => void', required: true, description: 'Callback ao trocar.' },
            { name: 'siblings', type: 'number', default: '5', description: 'Páginas numéricas visíveis.' },
          ]}
        />
      </DocSection>

      <DocSection title="PaginationWithFirstLast">
        <VariantSection
          title="Com ellipsis e atalhos"
          preview={
            <PaginationWithFirstLast page={page2} totalPages={20} onPageChange={setPage2} />
          }
          code={`<PaginationWithFirstLast page={page} totalPages={20} onPageChange={setPage} />`}
        />
        <PropsTable
          rows={[
            { name: 'page / totalPages / onPageChange', type: '— igual Pagination —', description: 'Mesmas props.' },
            { name: 'leadingPages', type: 'number', default: '3', description: 'Páginas iniciais antes do ellipsis.' },
          ]}
        />
      </DocSection>

      <DocSection title="PaginationInfo">
        <VariantSection
          title="Com indicador de intervalo"
          preview={
            <PaginationInfo page={page3} pageSize={10} total={87} onPageChange={setPage3} />
          }
          code={`<PaginationInfo
  page={page}
  pageSize={10}
  total={87}
  onPageChange={setPage}
  recordLabel="registros"
/>`}
        />
        <PropsTable
          rows={[
            { name: 'page', type: 'number', required: true, description: 'Página atual.' },
            { name: 'pageSize', type: 'number', required: true, description: 'Itens por página.' },
            { name: 'total', type: 'number', required: true, description: 'Total de registros.' },
            { name: 'onPageChange', type: '(p) => void', required: true, description: 'Callback.' },
            { name: 'recordLabel', type: 'string', default: '"registros"', description: 'Label do tipo de registro.' },
          ]}
        />
      </DocSection>

      <DocSection title="PaginationPageSize">
        <VariantSection
          title="Seletor de tamanho"
          preview={
            <PaginationPageSize
              page={page4}
              totalPages={5}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          }
          code={`<PaginationPageSize
  page={page}
  totalPages={5}
  pageSize={pageSize}
  pageSizeOptions={[10, 25, 50, 100]}
  onPageSizeChange={setPageSize}
/>`}
        />
        <PropsTable
          rows={[
            { name: 'pageSize', type: 'number', required: true, description: 'Tamanho atual.' },
            { name: 'pageSizeOptions', type: 'number[]', default: '[10, 25, 50, 100]', description: 'Opções disponíveis.' },
            { name: 'onPageSizeChange', type: '(size) => void', required: true, description: 'Callback.' },
            { name: 'page / totalPages', type: 'number', required: true, description: 'Para o indicador "Página X de Y".' },
          ]}
        />
      </DocSection>
    </ComponentDoc>
  );
}
