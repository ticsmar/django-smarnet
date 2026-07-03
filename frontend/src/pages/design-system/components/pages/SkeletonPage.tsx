import { Skeleton } from '@/components/ui/skeleton';
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

const skeletonProps: PropDef[] = [
  { name: 'className', type: 'string', description: 'Define tamanho, forma e aparência do placeholder.' },
  { name: '...props', type: 'HTMLAttributes<HTMLDivElement>', description: 'Todos os atributos nativos de div são suportados.' },
];

export default function SkeletonPage() {
  return (
    <ComponentDoc
      summary="Placeholder animado (pulse) que indica carregamento de conteúdo. Substitui spinners em layouts de conteúdo."
      importPath="@/components/ui/skeleton"
    >
      <DocSection title="Skeleton" description="Combinações comuns de skeleton para diferentes layouts.">
        <VariantSection
          title="Card loading"
          description="Avatar + linhas de texto simulando um card de perfil."
          preview={
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          }
          code={`<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`}
        />

        <VariantSection
          title="Lista de itens"
          description="Linhas em sequência simulando uma lista."
          preview={
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-11/12" />
              <Skeleton className="h-6 w-10/12" />
              <Skeleton className="h-6 w-9/12" />
            </div>
          }
          code={`<div className="space-y-2">
  <Skeleton className="h-6 w-full" />
  <Skeleton className="h-6 w-11/12" />
  <Skeleton className="h-6 w-10/12" />
</div>`}
        />

        <VariantSection
          title="Grid de cards"
          description="Múltiplos cards em grid simulando uma galeria ou dashboard."
          preview={
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-28 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          }
          code={`<div className="grid grid-cols-3 gap-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="space-y-3">
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ))}
</div>`}
        />

        <VariantSection
          title="Formulário"
          description="Skeleton simulando campos de formulário."
          preview={
            <div className="space-y-4 max-w-sm">
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          }
          code={`<div className="space-y-4 max-w-sm">
  <div className="space-y-2">
    <Skeleton className="h-3 w-16" />
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
  <Skeleton className="h-10 w-28 rounded-lg" />
</div>`}
        />
      </DocSection>

      <DocSection title="API">
        <PropsTable rows={skeletonProps} />
      </DocSection>

      <UsageNote type="tip">
        Use dimensões que aproximem o conteúdo real para evitar layout shift quando os dados carregarem.
      </UsageNote>
    </ComponentDoc>
  );
}
