import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

/* ----------------------------- FormSection ----------------------------- */

export interface FormSectionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/** Seção visual com título + linha divisória, usada em cadastros longos. */
export function FormSection({ title, description, actions, className, children }: FormSectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {(title || actions) && (
        <div className="flex items-end justify-between gap-3 pb-2 border-b border-border/30">
          <div>
            {title && <h4 className="text-sm font-bold text-foreground">{title}</h4>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------- FormGrid ------------------------------ */

type GridCols = 1 | 2 | 3 | 4 | 6 | 12;

const colsMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

export interface FormGridProps {
  cols?: GridCols;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function FormGrid({ cols = 2, gap = 'md', className, children }: FormGridProps) {
  const gapClass = gap === 'sm' ? 'gap-3' : gap === 'lg' ? 'gap-6' : 'gap-4';
  return <div className={cn('grid', colsMap[cols], gapClass, className)}>{children}</div>;
}

/* ------------------------------- FormRow ------------------------------- */

export interface FormRowProps {
  /** Largura do label (em px ou utilitário tailwind) — só usada em variant="horizontal" */
  labelWidth?: number;
  label?: React.ReactNode;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Linha de formulário horizontal: label à esquerda, controle à direita.
 * Útil para formulários compactos com muitos campos.
 */
export function FormRow({ label, htmlFor, labelWidth = 128, className, children }: FormRowProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {label && (
        <Label
          htmlFor={htmlFor}
          className="text-xs text-right shrink-0"
          style={{ width: labelWidth }}
        >
          {label}
        </Label>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------ FormInline ----------------------------- */

export interface FormInlineProps {
  className?: string;
  children: React.ReactNode;
}

/** Linha de campos inline (ex.: filtros, adicionar item). */
export function FormInline({ className, children }: FormInlineProps) {
  return <div className={cn('flex flex-wrap items-end gap-3', className)}>{children}</div>;
}

/* ----------------------------- FormActions ----------------------------- */

export interface FormActionsProps {
  align?: 'start' | 'end' | 'between';
  className?: string;
  children: React.ReactNode;
}

/** Barra de ações no final do formulário (Salvar, Cancelar, etc.). */
export function FormActions({ align = 'end', className, children }: FormActionsProps) {
  const alignClass =
    align === 'start' ? 'justify-start' : align === 'between' ? 'justify-between' : 'justify-end';
  return <div className={cn('flex items-center gap-2', alignClass, className)}>{children}</div>;
}
