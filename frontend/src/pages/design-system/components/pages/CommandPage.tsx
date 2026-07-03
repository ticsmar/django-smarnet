import { useState } from 'react';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
  CommandSeparator, CommandDialog, CommandShortcut,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Calculator, Calendar, CreditCard, Settings, User, Search, Smile, Mail } from 'lucide-react';
import { ComponentDoc, VariantSection, PropsTable, DocSection, UsageNote, type PropDef } from '../_docs';

const commandProps: PropDef[] = [
  { name: 'value', type: 'string', description: 'Valor selecionado (controlado).' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao mudar seleção.' },
  { name: 'filter', type: '(value, search) => number', description: 'Função de filtro customizada. Retorna 0 (não exibir) ou 1 (exibir).' },
  { name: 'shouldFilter', type: 'boolean', default: 'true', description: 'Desativa filtro automático (para filtro server-side).' },
  { name: 'loop', type: 'boolean', default: 'false', description: 'Navegação em loop com teclado.' },
];

const dialogProps: PropDef[] = [
  { name: 'open', type: 'boolean', description: 'Estado controlado de abertura do diálogo.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback ao abrir/fechar.' },
];

const inputProps: PropDef[] = [
  { name: 'placeholder', type: 'string', description: 'Texto de placeholder no campo de busca.' },
  { name: 'value', type: 'string', description: 'Valor do campo (controlado).' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao digitar.' },
];

export default function CommandPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <ComponentDoc
      summary="Paleta de comandos estilo ⌘K para busca rápida, atalhos e navegação. Baseado em cmdk."
      importPath="import { Command, CommandInput, CommandList, CommandItem, CommandDialog, ... } from '@/components/ui/command'"
    >
      <DocSection title="Variantes">
        <VariantSection
          title="Inline"
          description="Command embutido na página, ideal para listas de busca."
          preview={
            <Command className="rounded-xl border border-border/30 max-w-md">
              <CommandInput placeholder="Buscar comando..." />
              <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Sugestões">
                  <CommandItem><Calendar className="mr-2 h-4 w-4" /> Agenda</CommandItem>
                  <CommandItem><Calculator className="mr-2 h-4 w-4" /> Calculadora</CommandItem>
                  <CommandItem><Smile className="mr-2 h-4 w-4" /> Emojis</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Configurações">
                  <CommandItem><User className="mr-2 h-4 w-4" /> Perfil</CommandItem>
                  <CommandItem><CreditCard className="mr-2 h-4 w-4" /> Cobrança</CommandItem>
                  <CommandItem><Settings className="mr-2 h-4 w-4" /> Configurações</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          }
          code={`<Command className="rounded-xl border max-w-md">
  <CommandInput placeholder="Buscar comando..." />
  <CommandList>
    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
    <CommandGroup heading="Sugestões">
      <CommandItem><Calendar /> Agenda</CommandItem>
      <CommandItem><Calculator /> Calculadora</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Configurações">
      <CommandItem><User /> Perfil</CommandItem>
      <CommandItem><Settings /> Configurações</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        />

        <VariantSection
          title="CommandDialog (⌘K)"
          description="Abre como modal flutuante. Ideal para atalho global de busca."
          preview={
            <div>
              <Button variant="outline" onClick={() => setDialogOpen(true)}>
                <Search className="mr-2 h-4 w-4" /> Buscar… <kbd className="ml-4 text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
              </Button>
              <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <CommandInput placeholder="Buscar em todo o sistema..." />
                <CommandList>
                  <CommandEmpty>Nenhum resultado.</CommandEmpty>
                  <CommandGroup heading="Páginas">
                    <CommandItem><Calendar className="mr-2 h-4 w-4" /> Agenda</CommandItem>
                    <CommandItem><Mail className="mr-2 h-4 w-4" /> Mensagens</CommandItem>
                    <CommandItem><Settings className="mr-2 h-4 w-4" /> Configurações</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Ações">
                    <CommandItem><User className="mr-2 h-4 w-4" /> Meu perfil <CommandShortcut>⌘P</CommandShortcut></CommandItem>
                    <CommandItem><CreditCard className="mr-2 h-4 w-4" /> Cobrança <CommandShortcut>⌘B</CommandShortcut></CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          }
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Buscar… ⌘K</Button>

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Buscar em todo o sistema..." />
  <CommandList>
    <CommandEmpty>Nenhum resultado.</CommandEmpty>
    <CommandGroup heading="Páginas">
      <CommandItem><Calendar /> Agenda</CommandItem>
      <CommandItem><Settings /> Configurações</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
        />

        <VariantSection
          title="Com atalhos (Shortcut)"
          preview={
            <Command className="rounded-xl border border-border/30 max-w-md">
              <CommandInput placeholder="Buscar..." />
              <CommandList>
                <CommandGroup heading="Atalhos rápidos">
                  <CommandItem>Nova tarefa <CommandShortcut>⌘N</CommandShortcut></CommandItem>
                  <CommandItem>Buscar cliente <CommandShortcut>⌘F</CommandShortcut></CommandItem>
                  <CommandItem>Dashboard <CommandShortcut>⌘D</CommandShortcut></CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          }
          code={`<CommandItem>
  Nova tarefa <CommandShortcut>⌘N</CommandShortcut>
</CommandItem>`}
        />

        <VariantSection
          title="Sem filtro automático"
          description="Desative shouldFilter para filtrar server-side ou externamente."
          preview={
            <Command shouldFilter={false} className="rounded-xl border border-border/30 max-w-md">
              <CommandInput placeholder="Buscar (filtro desativado)..." />
              <CommandList>
                <CommandGroup heading="Resultados fixos">
                  <CommandItem>Item A</CommandItem>
                  <CommandItem>Item B</CommandItem>
                  <CommandItem>Item C</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          }
          code={`<Command shouldFilter={false}>
  <CommandInput placeholder="Buscar..." />
  <CommandList>
    <CommandGroup heading="Resultados fixos">
      <CommandItem>Item A</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        />
      </DocSection>

      <PropsTable rows={commandProps} title="Command Props" />
      <PropsTable rows={dialogProps} title="CommandDialog Props" />
      <PropsTable rows={inputProps} title="CommandInput Props" />

      <UsageNote type="tip">
        Para ativar o <code>CommandDialog</code> com <code>⌘K</code> / <code>Ctrl+K</code>, adicione um listener global de teclado que chame <code>setOpen(true)</code>.
      </UsageNote>
    </ComponentDoc>
  );
}
