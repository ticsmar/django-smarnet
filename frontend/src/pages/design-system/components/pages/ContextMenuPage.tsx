import { useState } from 'react';
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator,
  ContextMenuTrigger, ContextMenuCheckboxItem, ContextMenuRadioGroup,
  ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger,
  ContextMenuSubContent, ContextMenuShortcut, ContextMenuLabel,
} from '@/components/ui/context-menu';
import { ComponentDoc, VariantSection, PropsTable, DocSection, UsageNote, type PropDef } from '../_docs';

const props: PropDef[] = [
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback ao abrir/fechar.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Bloqueia interação fora do menu.' },
];

const itemProps: PropDef[] = [
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desativa o item.' },
  { name: 'onSelect', type: '(event) => void', description: 'Callback ao selecionar.' },
  { name: 'className', type: 'string', description: 'Classes CSS adicionais.' },
];

const triggerArea = "grid place-items-center h-32 rounded-xl border-2 border-dashed border-border/50 bg-surface-container/50 text-sm text-muted-foreground select-none transition-colors hover:border-border";

export default function ContextMenuPage() {
  const [bookmarks, setBookmarks] = useState(true);
  const [urls, setUrls] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <ComponentDoc
      summary="Menu contextual ativado com clique direito (ou long-press em dispositivos touch). Baseado em Radix UI."
      importPath="import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ... } from '@/components/ui/context-menu'"
    >
      <DocSection title="Variantes">
        <VariantSection
          title="Menu básico"
          description="Clique com o botão direito na área para abrir."
          preview={
            <ContextMenu>
              <ContextMenuTrigger className={triggerArea}>
                Clique com o botão direito aqui
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuItem>Voltar <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuItem>Avançar <ContextMenuShortcut>⌘]</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuItem>Recarregar <ContextMenuShortcut>⌘R</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Salvar como… <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut></ContextMenuItem>
                <ContextMenuItem>Imprimir <ContextMenuShortcut>⌘P</ContextMenuShortcut></ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          }
          code={`<ContextMenu>
  <ContextMenuTrigger className="…">
    Clique com o botão direito aqui
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Voltar <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuItem>Avançar</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Salvar como…</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        />

        <VariantSection
          title="Com checkboxes e radios"
          description="Combine itens checkbox e radio no mesmo menu."
          preview={
            <ContextMenu>
              <ContextMenuTrigger className={triggerArea}>
                Botão direito — checkboxes & radios
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuLabel>Exibir</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
                  Barra de favoritos
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={urls} onCheckedChange={setUrls}>
                  URLs completas
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuLabel>Responsável</ContextMenuLabel>
                <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                  <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="ana">Ana</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="carlos">Carlos</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuContent>
            </ContextMenu>
          }
          code={`<ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
  Barra de favoritos
</ContextMenuCheckboxItem>

<ContextMenuRadioGroup value={person} onValueChange={setPerson}>
  <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
</ContextMenuRadioGroup>`}
        />

        <VariantSection
          title="Com submenu"
          preview={
            <ContextMenu>
              <ContextMenuTrigger className={triggerArea}>
                Botão direito — submenu
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuItem>Copiar</ContextMenuItem>
                <ContextMenuItem>Recortar</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Compartilhar</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-44">
                    <ContextMenuItem>E-mail</ContextMenuItem>
                    <ContextMenuItem>WhatsApp</ContextMenuItem>
                    <ContextMenuItem>Copiar link</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-destructive">Excluir</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          }
          code={`<ContextMenuSub>
  <ContextMenuSubTrigger>Compartilhar</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>E-mail</ContextMenuItem>
    <ContextMenuItem>WhatsApp</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`}
        />
      </DocSection>

      <PropsTable rows={props} title="ContextMenu Props" />
      <PropsTable rows={itemProps} title="ContextMenuItem Props" />

      <UsageNote type="warning">
        Em dispositivos touch o menu contextual é ativado por <strong>long-press</strong>. Considere oferecer alternativas visíveis (como um dropdown) para ações críticas.
      </UsageNote>
    </ComponentDoc>
  );
}
