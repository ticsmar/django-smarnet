import { useState } from 'react';
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator,
  MenubarShortcut, MenubarTrigger, MenubarCheckboxItem, MenubarRadioGroup,
  MenubarRadioItem, MenubarSub, MenubarSubContent, MenubarSubTrigger,
} from '@/components/ui/menubar';
import { ComponentDoc, VariantSection, PropsTable, DocSection, UsageNote, type PropDef } from '../_docs';

const props: PropDef[] = [
  { name: 'value', type: 'string', description: 'Menu aberto (controlado).' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao mudar o menu aberto.' },
  { name: 'dir', type: '"ltr" | "rtl"', default: '"ltr"', description: 'Direção de leitura.' },
  { name: 'loop', type: 'boolean', default: 'true', description: 'Navegar em loop com teclado.' },
];

const itemProps: PropDef[] = [
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desativa o item.' },
  { name: 'onSelect', type: '(event) => void', description: 'Callback ao selecionar.' },
];

export default function MenubarPage() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [zoom, setZoom] = useState('100');

  return (
    <ComponentDoc
      summary="Barra de menus horizontal estilo desktop, ideal para editores, ferramentas e painéis. Navegação completa por teclado."
      importPath="import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, ... } from '@/components/ui/menubar'"
    >
      <DocSection title="Variantes">
        <VariantSection
          title="Menubar básica"
          description="Menus com itens, separadores e atalhos."
          preview={
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Arquivo</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                  <MenubarItem>Abrir <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Salvar <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                  <MenubarItem>Salvar como… <MenubarShortcut>⇧⌘S</MenubarShortcut></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Imprimir <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Editar</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Desfazer <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                  <MenubarItem>Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Recortar <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
                  <MenubarItem>Copiar <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
                  <MenubarItem>Colar <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Ajuda</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Documentação</MenubarItem>
                  <MenubarItem>Sobre</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          }
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem>Abrir <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Salvar <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />

        <VariantSection
          title="Com checkboxes e radios"
          description="Combine checkboxes e radio groups para opções de visualização."
          preview={
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Visualizar</MenubarTrigger>
                <MenubarContent>
                  <MenubarCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
                    Barra de ferramentas
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
                    Barra lateral
                  </MenubarCheckboxItem>
                  <MenubarSeparator />
                  <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
                    <MenubarRadioItem value="75">75%</MenubarRadioItem>
                    <MenubarRadioItem value="100">100%</MenubarRadioItem>
                    <MenubarRadioItem value="125">125%</MenubarRadioItem>
                    <MenubarRadioItem value="150">150%</MenubarRadioItem>
                  </MenubarRadioGroup>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          }
          code={`<MenubarCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
  Barra de ferramentas
</MenubarCheckboxItem>

<MenubarRadioGroup value={zoom} onValueChange={setZoom}>
  <MenubarRadioItem value="100">100%</MenubarRadioItem>
</MenubarRadioGroup>`}
        />

        <VariantSection
          title="Com submenu"
          preview={
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Inserir</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Imagem</MenubarItem>
                  <MenubarItem>Tabela</MenubarItem>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Gráfico</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>Barra</MenubarItem>
                      <MenubarItem>Linha</MenubarItem>
                      <MenubarItem>Pizza</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          }
          code={`<MenubarSub>
  <MenubarSubTrigger>Gráfico</MenubarSubTrigger>
  <MenubarSubContent>
    <MenubarItem>Barra</MenubarItem>
    <MenubarItem>Linha</MenubarItem>
  </MenubarSubContent>
</MenubarSub>`}
        />

        <VariantSection
          title="Item desabilitado"
          preview={
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Arquivo</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Novo</MenubarItem>
                  <MenubarItem disabled>Abrir recente (vazio)</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Sair</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          }
          code={`<MenubarItem disabled>Abrir recente (vazio)</MenubarItem>`}
        />
      </DocSection>

      <PropsTable rows={props} title="Menubar Props" />
      <PropsTable rows={itemProps} title="MenubarItem Props" />

      <UsageNote type="tip">
        A <code>Menubar</code> suporta navegação completa por teclado: setas ← → entre menus, ↑ ↓ entre itens, Enter para selecionar e Esc para fechar.
      </UsageNote>
    </ComponentDoc>
  );
}
