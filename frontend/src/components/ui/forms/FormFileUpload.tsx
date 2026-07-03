import * as React from 'react';
import { Upload, X, CheckCircle2, FileText, Image as ImageIcon, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FormFieldShell, FormFieldStatus } from './FormField';

export interface UploadedFileItem {
  name: string;
  size?: string;
  type?: 'pdf' | 'image' | 'file' | string;
  progress?: number;
}

export interface FormFileUploadProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  /** Variantes visuais do dropzone */
  variant?: 'dropzone' | 'compact';
  /** Texto principal do dropzone */
  title?: string;
  /** Texto auxiliar (ex.: tipos aceitos, tamanho máx) */
  helperText?: string;
  /** Texto do botão */
  buttonLabel?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList | null) => void;
  className?: string;
}

const fileIconMap: Record<string, { Icon: React.ElementType; bg: string; color: string }> = {
  pdf: { Icon: FileText, bg: 'bg-destructive/10', color: 'text-destructive' },
  image: { Icon: ImageIcon, bg: 'bg-status-info/10', color: 'text-status-info' },
  file: { Icon: File, bg: 'bg-status-success/10', color: 'text-status-success' },
};

export function FormFileUpload({
  id: idProp,
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  variant = 'dropzone',
  title = 'Arraste arquivos aqui ou clique para selecionar',
  helperText,
  buttonLabel = 'Selecionar Arquivos',
  accept,
  multiple,
  onFilesSelected,
  className,
}: FormFileUploadProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

  const handleClick = () => inputRef.current?.click();

  const inputEl = (
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept={accept}
      multiple={multiple}
      className="hidden"
      onChange={(e) => onFilesSelected?.(e.target.files)}
    />
  );

  if (variant === 'compact') {
    return (
      <FormFieldShell
        id={id}
        label={label}
        required={required}
        description={description}
        hint={hint}
        error={error}
        success={success}
        status={computedStatus}
        className={className}
      >
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background text-sm text-muted-foreground">
            <FileText size={16} /> {helperText ?? 'Nenhum arquivo selecionado'}
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={handleClick}>
            {buttonLabel}
          </Button>
          {inputEl}
        </div>
      </FormFieldShell>
    );
  }

  return (
    <FormFieldShell
      id={id}
      label={label}
      required={required}
      description={description}
      hint={hint}
      error={error}
      success={success}
      status={computedStatus}
      className={className}
    >
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'w-full border-2 border-dashed border-border/60 rounded-2xl p-10 text-center transition-all',
          'hover:border-secondary/50 hover:bg-secondary/5',
          computedStatus === 'error' && 'border-destructive/60',
        )}
      >
        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
          <Upload size={24} className="text-secondary" />
        </div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {helperText && <p className="text-xs text-muted-foreground mt-1">{helperText}</p>}
        <span className="inline-flex items-center mt-4 px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted/40">
          {buttonLabel}
        </span>
      </button>
      {inputEl}
    </FormFieldShell>
  );
}

export interface FileListItemProps extends UploadedFileItem {
  onRemove?: () => void;
  className?: string;
}

/** Item visual para representar um arquivo enviado, com progresso e ações. */
export function FileListItem({ name, size, type = 'file', progress = 100, onRemove, className }: FileListItemProps) {
  const { Icon, bg, color } = fileIconMap[type] ?? fileIconMap.file;
  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl bg-background border border-border/30',
        className,
      )}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', bg, color)}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Progress value={progress} className="h-1.5 flex-1" />
          <span className="text-[10px] font-semibold text-muted-foreground shrink-0">{progress}%</span>
        </div>
        {size && <p className="text-[10px] text-muted-foreground mt-0.5">{size}</p>}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {progress === 100 && <CheckCircle2 size={18} className="text-status-success" />}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
            aria-label={`Remover ${name}`}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export interface FormAvatarUploadProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  preview?: string;
  onPick?: (files: FileList | null) => void;
  onRemove?: () => void;
  className?: string;
}

/** Upload de avatar/imagem com preview ao lado. */
export function FormAvatarUpload({
  label,
  description,
  preview,
  onPick,
  onRemove,
  className,
}: FormAvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cn('flex items-center gap-6', className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-20 h-20 rounded-2xl bg-muted/30 border-2 border-dashed border-border/60 flex items-center justify-center hover:border-secondary/50 cursor-pointer transition-colors overflow-hidden"
        aria-label="Selecionar imagem"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon size={24} className="text-muted-foreground" />
        )}
      </button>
      <div>
        {label && <p className="text-sm font-semibold text-foreground">{label}</p>}
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        <div className="flex gap-2 mt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            Upload
          </Button>
          {onRemove && (
            <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={onRemove}>
              Remover
            </Button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onPick?.(e.target.files)}
      />
    </div>
  );
}
