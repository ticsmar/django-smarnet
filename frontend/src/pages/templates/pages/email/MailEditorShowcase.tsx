import { useState } from 'react';
import { PagesLayout, PageSection } from '../PagesLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Link2, Image as ImageIcon,
  Paperclip, Smile, Send, Save, Trash2, X, Code2, Quote, Undo2, Redo2,
} from 'lucide-react';

const toolbarGroups = [
  [
    { icon: Undo2, label: 'Desfazer' },
    { icon: Redo2, label: 'Refazer' },
  ],
  [
    { icon: Bold, label: 'Negrito' },
    { icon: Italic, label: 'Itálico' },
    { icon: Underline, label: 'Sublinhado' },
    { icon: Strikethrough, label: 'Tachado' },
  ],
  [
    { icon: AlignLeft, label: 'Esquerda' },
    { icon: AlignCenter, label: 'Centro' },
    { icon: AlignRight, label: 'Direita' },
  ],
  [
    { icon: List, label: 'Lista' },
    { icon: ListOrdered, label: 'Lista numerada' },
    { icon: Quote, label: 'Citação' },
    { icon: Code2, label: 'Código' },
  ],
  [
    { icon: Link2, label: 'Link' },
    { icon: ImageIcon, label: 'Imagem' },
    { icon: Paperclip, label: 'Anexo' },
    { icon: Smile, label: 'Emoji' },
  ],
];

const attachments = [
  { name: 'proposta-comercial-q2.pdf', size: '1.4 MB' },
  { name: 'cronograma-implantacao.xlsx', size: '342 KB' },
];

export default function MailEditorShowcase() {
  const [body, setBody] = useState(
    'Olá, equipe,\n\nSegue em anexo a proposta comercial revisada para o segundo trimestre, conforme alinhado em nossa última reunião.\n\nFico à disposição para esclarecimentos.\n\nAtenciosamente,\nAna Paula Ribeiro'
  );

  return (
    <PagesLayout
      title="Editor de E-mail"
      description="Componha e formate mensagens com editor rich-text."
      category="Páginas / Email"
    >
      <PageSection title="Nova Mensagem">
        <div className="space-y-3">
          {/* Header fields */}
          <div className="space-y-3">
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3">
              <Label className="text-xs text-muted-foreground w-12">Para</Label>
              <Input defaultValue="diretoria@novasmar.com.br" />
              <div className="flex gap-1 text-xs">
                <button className="text-muted-foreground hover:text-foreground px-2 py-1">Cc</button>
                <button className="text-muted-foreground hover:text-foreground px-2 py-1">Cco</button>
              </div>
            </div>
            <div className="grid grid-cols-[auto,1fr] items-center gap-3">
              <Label className="text-xs text-muted-foreground w-12">Cc</Label>
              <Input placeholder="adicionar destinatários em cópia" />
            </div>
            <div className="grid grid-cols-[auto,1fr] items-center gap-3">
              <Label className="text-xs text-muted-foreground w-12">Assunto</Label>
              <Input defaultValue="Proposta Comercial Q2 2026 — Revisão Final" />
            </div>
          </div>

          <Separator />

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 px-2 py-2 rounded-lg bg-surface-container-low">
            <select className="text-xs bg-transparent border-0 px-2 py-1 outline-none cursor-pointer hover:bg-background rounded">
              <option>Parágrafo</option>
              <option>Título 1</option>
              <option>Título 2</option>
              <option>Título 3</option>
            </select>
            <Separator orientation="vertical" className="h-5 mx-1" />
            <select className="text-xs bg-transparent border-0 px-2 py-1 outline-none cursor-pointer hover:bg-background rounded">
              <option>Inter</option>
              <option>Manrope</option>
              <option>Mono</option>
            </select>
            <Separator orientation="vertical" className="h-5 mx-1" />

            {toolbarGroups.map((group, gi) => (
              <div key={gi} className="flex items-center gap-0.5">
                {group.map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    title={b.label}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  >
                    <b.icon size={15} />
                  </button>
                ))}
                {gi < toolbarGroups.length - 1 && (
                  <Separator orientation="vertical" className="h-5 mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* Editor body */}
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="resize-y font-sans leading-relaxed"
          />

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Anexos ({attachments.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {attachments.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-lg bg-surface-container-low text-sm"
                  >
                    <Paperclip size={14} className="text-muted-foreground" />
                    <span className="font-medium">{a.name}</span>
                    <span className="text-xs text-muted-foreground">{a.size}</span>
                    <button
                      type="button"
                      className="ml-1 p-1 rounded hover:bg-background text-muted-foreground hover:text-destructive"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageSection>

      <PageSection>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Save size={14} />
            <span>Rascunho salvo automaticamente há 2 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Trash2 size={14} /> Descartar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Save size={14} /> Salvar Rascunho
            </Button>
            <Button size="sm" className="gap-2">
              <Send size={14} /> Enviar
            </Button>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
