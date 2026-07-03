import { useState } from 'react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, LogOut, Settings, Mail, MessageSquare, Plus, CreditCard } from 'lucide-react';
import { ComponentDoc, VariantSection, PropsTable, DocSection, UsageNote, type PropDef } from '../_docs';

const props: PropDef[] = [
  { name: 'open', type: 'boolean', description: 'Estado controlado de abertura.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback ao abrir/fechar.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Se true, bloqueia interação com o restante da página.' },
];

const itemProps: PropDef[] = [
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desativa o item.' },
  { name: 'onSelect', type: '(event) => void', description: 'Callback ao selecionar.' },
  { name: 'className', type: 'string', description: 'Classes extras (ex: text-destructive).' },
];

export default function DropdownMenuPage() {
  const [showStatus, setShowStatus] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [position, setPosition] = useState('bottom');

  return (
    <ComponentDoc
      summary="Menu suspenso com itens, separadores, checkboxes, radios e submenus. Baseado em Radix UI."
      importPath="import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, ... } from '@/components/ui/dropdown-menu'"
    >
      <DocSection title="Variantes">
        <VariantSection
          title="Menu padrão"
          description="Items com ícones, labels e separadores."
          preview={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Conta <ChevronDown className="ml-1 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Perfil</DropdownMenuItem>
                <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /> Cobrança</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" /> Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Conta <ChevronDown /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><User /> Perfil</DropdownMenuItem>
    <DropdownMenuItem><Settings /> Configurações</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive"><LogOut /> Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />

        <VariantSection
          title="Com atalhos de teclado"
          preview={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Editar <ChevronDown className="ml-1 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Desfazer <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Refazer <DropdownMenuShortcut>⇧⌘Z</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Recortar <DropdownMenuShortcut>⌘X</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Copiar <DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
                <DropdownMenuItem>Colar <DropdownMenuShortcut>⌘V</DropdownMenuShortcut></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          code={`<DropdownMenuItem>
  Desfazer <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
</DropdownMenuItem>`}
        />
      </DocSection>

      <DocSection title="Checkboxes" description="Itens com estado marcado/desmarcado.">
        <VariantSection
          title="CheckboxItem"
          preview={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Colunas <ChevronDown className="ml-1 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Visibilidade</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
                  Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showEmail} onCheckedChange={setShowEmail}>
                  E-mail
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked disabled>
                  Nome (obrigatório)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          code={`const [showStatus, setShowStatus] = useState(true);

<DropdownMenuCheckboxItem
  checked={showStatus}
  onCheckedChange={setShowStatus}
>
  Status
</DropdownMenuCheckboxItem>`}
        />
      </DocSection>

      <DocSection title="Radio Group" description="Seleção exclusiva dentro do menu.">
        <VariantSection
          title="RadioItem"
          preview={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Posição <ChevronDown className="ml-1 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Posição do painel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Topo</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Base</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Direita</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          code={`<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">Topo</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">Base</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
        />
      </DocSection>

      <DocSection title="Submenu">
        <VariantSection
          title="Menu aninhado"
          preview={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Mais <ChevronDown className="ml-1 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> E-mail</DropdownMenuItem>
                <DropdownMenuItem><MessageSquare className="mr-2 h-4 w-4" /> Mensagem</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger><Plus className="mr-2 h-4 w-4" /> Convidar</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Por e-mail</DropdownMenuItem>
                    <DropdownMenuItem>Por link</DropdownMenuItem>
                    <DropdownMenuItem>Por SMS</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          code={`<DropdownMenuSub>
  <DropdownMenuSubTrigger><Plus /> Convidar</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Por e-mail</DropdownMenuItem>
    <DropdownMenuItem>Por link</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`}
        />
      </DocSection>

      <PropsTable rows={props} title="DropdownMenu Props" />
      <PropsTable rows={itemProps} title="DropdownMenuItem Props" />

      <UsageNote type="info">
        Use <code>DropdownMenuShortcut</code> apenas para exibir atalhos — a captura do teclado deve ser implementada separadamente.
      </UsageNote>
    </ComponentDoc>
  );
}
