import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DSCode } from '../_components';

/* ============================================================
 * Documentation primitives — used across all component pages
 * Padronizam a apresentação: Preview + Code (em abas), Props,
 * Variantes e Notas de uso.
 * ============================================================ */

/* --------- ComponentDoc: container raiz da página ---------- */
export function ComponentDoc({
  summary,
  importPath,
  children,
}: {
  /** Descrição curta logo abaixo do título. */
  summary?: ReactNode;
  /** Caminho de import a destacar no topo. */
  importPath?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-10">
      {(summary || importPath) && (
        <div className="space-y-3 -mt-3">
          {summary && (
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">{summary}</p>
          )}
          {importPath && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-surface-container px-3 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                Import
              </span>
              <code className="text-xs font-mono text-foreground">{importPath}</code>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/* --------- PreviewCodeTabs: alterna entre Preview e Code --- */
export function PreviewCodeTabs({
  preview,
  code,
  previewClassName,
}: {
  preview: ReactNode;
  code: string;
  previewClassName?: string;
}) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="bg-surface-container/60">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Código</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-3">
        <div
          className={cn(
            'rounded-2xl bg-surface-container p-6 border border-border/30 shadow-ambient',
            previewClassName,
          )}
        >
          {preview}
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-3">
        <DSCode>{code}</DSCode>
      </TabsContent>
    </Tabs>
  );
}

/* --------- VariantSection: bloco de uma variante ---------- */
export function VariantSection({
  title,
  description,
  preview,
  code,
  className,
}: {
  title: string;
  description?: ReactNode;
  preview: ReactNode;
  code: string;
  className?: string;
}) {
  return (
    <section className={cn('space-y-3', className)}>
      <header>
        <h3 className="font-display font-bold text-base">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">{description}</p>
        )}
      </header>
      <PreviewCodeTabs preview={preview} code={code} />
    </section>
  );
}

/* --------- PropsTable: tabela de props do componente ------ */
export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: ReactNode;
}

export function PropsTable({ rows, title = 'Props' }: { rows: PropDef[]; title?: string }) {
  return (
    <section className="space-y-3">
      <h3 className="font-display font-bold text-base">{title}</h3>
      <div className="rounded-2xl border border-border/40 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-surface-container">
            <tr className="text-left">
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">
                Prop
              </th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">
                Tipo
              </th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">
                Default
              </th>
              <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] text-muted-foreground">
                Descrição
              </th>
            </tr>
          </thead>
          <tbody className="bg-background">
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-border/30 align-top">
                <td className="px-4 py-2.5 font-mono text-[11px] text-foreground whitespace-nowrap">
                  {row.name}
                  {row.required && <span className="text-destructive ml-0.5">*</span>}
                </td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-secondary whitespace-pre-wrap">
                  {row.type}
                </td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
                  {row.default ?? '—'}
                </td>
                <td className="px-4 py-2.5 text-foreground/80 leading-relaxed">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* --------- DocSection: agrupador genérico de blocos ------- */
export function DocSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('space-y-4', className)}>
      <header>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1">Seção</p>
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">{description}</p>
        )}
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

/* --------- UsageNote: nota de uso/best practice ----------- */
export function UsageNote({
  type = 'info',
  children,
}: {
  type?: 'info' | 'tip' | 'warning';
  children: ReactNode;
}) {
  const styles = {
    info: 'bg-info/5 border-info/30 text-foreground',
    tip: 'bg-success/5 border-success/30 text-foreground',
    warning: 'bg-warning/5 border-warning/30 text-foreground',
  } as const;
  const labels = { info: 'Nota', tip: 'Dica', warning: 'Atenção' } as const;
  return (
    <div className={cn('rounded-xl border-l-4 px-4 py-3 text-sm', styles[type])}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">
        {labels[type]}
      </p>
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  );
}
