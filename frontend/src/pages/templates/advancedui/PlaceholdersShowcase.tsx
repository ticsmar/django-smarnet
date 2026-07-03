import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function PlaceholdersShowcase() {
  return (
    <AdvancedUILayout title="Placeholders" description="Esqueletos e placeholders para estados de carregamento.">
      <ShowcaseSection title="Skeleton Básico">
        <div className="space-y-3 max-w-md">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Card Skeleton">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-border/40">
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-8 w-20 rounded-md" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabela Skeleton">
        <div className="rounded-lg border border-border/40 overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-4 flex-1" />)}
          </div>
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className="px-4 py-3 flex gap-4 border-t border-border/20">
              {Array.from({ length: 5 }).map((_, col) => <Skeleton key={col} className="h-3.5 flex-1" />)}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Perfil Skeleton">
        <div className="flex items-start gap-4 max-w-md">
          <Skeleton className="h-16 w-16 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Dashboard KPI Skeleton">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border/40">
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-2 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
