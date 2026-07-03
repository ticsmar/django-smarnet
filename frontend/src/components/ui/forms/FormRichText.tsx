import * as React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapUnderline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, List, ListOrdered, Quote, Highlighter, Undo, Redo, Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormFieldShell, FormFieldStatus } from './FormField';

function ToolbarBtn({
  active,
  onClick,
  children,
  title,
  disabled,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        'p-1.5 rounded-md transition-colors',
        active
          ? 'bg-secondary/20 text-secondary'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border/40 mx-1 self-center" />;
}

function DefaultToolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap gap-0.5 p-2 border-b border-border/30 bg-muted/20">
      <ToolbarBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Negrito"><Bold size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Itálico"><Italic size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Sublinhado"><Underline size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Tachado"><Strikethrough size={15} /></ToolbarBtn>
      <Divider />
      <ToolbarBtn active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Título 1"><Heading1 size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Título 2"><Heading2 size={15} /></ToolbarBtn>
      <Divider />
      <ToolbarBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Alinhar Esquerda"><AlignLeft size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Centralizar"><AlignCenter size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Alinhar Direita"><AlignRight size={15} /></ToolbarBtn>
      <Divider />
      <ToolbarBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Lista"><List size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Lista Numerada"><ListOrdered size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Citação"><Quote size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Destacar"><Highlighter size={15} /></ToolbarBtn>
      <ToolbarBtn active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Código"><Code size={15} /></ToolbarBtn>
      <Divider />
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Desfazer"><Undo size={15} /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Refazer"><Redo size={15} /></ToolbarBtn>
    </div>
  );
}

export interface FormRichTextProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  status?: FormFieldStatus;
  /** Conteúdo HTML inicial */
  content?: string;
  onChange?: (html: string) => void;
  minHeight?: string;
  className?: string;
}

/** Editor de texto rico (TipTap) já estilizado com o design system. */
export function FormRichText({
  id: idProp,
  label,
  description,
  hint,
  error,
  success,
  required,
  status,
  content = '',
  onChange,
  minHeight = '200px',
  className,
}: FormRichTextProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const computedStatus: FormFieldStatus = status ?? (error ? 'error' : success ? 'success' : 'default');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapUnderline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none text-foreground p-4',
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

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
      <div
        className={cn(
          'rounded-xl border border-border bg-background overflow-hidden',
          computedStatus === 'error' && 'border-destructive',
        )}
      >
        {editor && <DefaultToolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </FormFieldShell>
  );
}
