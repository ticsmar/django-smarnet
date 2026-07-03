import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export function TipTapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[280px] px-4 py-3 focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  const Btn = ({ on, active, children }: any) => (
    <button
      type="button"
      onClick={on}
      className={cn(
        'min-w-9 h-9 px-2 rounded-md text-sm grid place-items-center hover:bg-zinc-700',
        active && 'bg-[#0F4C81] text-white',
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-zinc-800 bg-zinc-900">
        <Btn on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 className="w-4 h-4" />
        </Btn>
        <Btn on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 className="w-4 h-4" />
        </Btn>
        <Btn on={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn on={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn on={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List className="w-4 h-4" />
        </Btn>
        <Btn on={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered className="w-4 h-4" />
        </Btn>
        <Btn on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          <Quote className="w-4 h-4" />
        </Btn>
        <Btn on={() => {
          const url = window.prompt('URL da imagem');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}>
          <ImageIcon className="w-4 h-4" />
        </Btn>
        <Btn on={() => {
          const url = window.prompt('URL do link');
          if (url) editor.chain().focus().toggleLink({ href: url }).run();
        }} active={editor.isActive('link')}>
          <LinkIcon className="w-4 h-4" />
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
