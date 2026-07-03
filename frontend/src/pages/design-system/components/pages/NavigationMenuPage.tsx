import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';
import { cn } from '@/lib/utils';
import { BarChart3, Box, FileText, Settings, ShieldCheck, Users, Zap } from 'lucide-react';

const navMenuProps: PropDef[] = [
  { name: 'value', type: 'string', description: 'Item ativo no modo controlado.' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao trocar item ativo.' },
  { name: 'delayDuration', type: 'number', default: '200', description: 'Delay em ms para abrir o submenu no hover.' },
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Orientação do menu.' },
];

const navMenuItemProps: PropDef[] = [
  { name: 'value', type: 'string', description: 'Identificador do item (necessário para controlado).' },
];

const navMenuTriggerProps: PropDef[] = [
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais. Estende navigationMenuTriggerStyle.' },
];

const navMenuContentProps: PropDef[] = [
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS do painel dropdown.' },
  { name: 'forceMount', type: 'boolean', default: 'false', description: 'Mantém o conteúdo montado (útil para animações).' },
];

const navMenuLinkProps: PropDef[] = [
  { name: 'active', type: 'boolean', default: 'false', description: 'Marca como link ativo.' },
  { name: 'onSelect', type: '(e: Event) => void', description: 'Callback ao selecionar.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Renderiza o filho direto em vez de <a>.' },
];

function ListItem({ className, title, icon: Icon, children, ...props }: React.ComponentPropsWithoutRef<'a'> & { title: string; icon?: React.ElementType }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-4 w-4 text-primary" />}
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavigationMenuPage() {
  return (
    <ComponentDoc
      summary="Menu de navegação horizontal hover-based, ideal para headers de aplicação. Exibe submenus flutuantes com animação de slide e suporte a grid de links."
      importPath="import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu'"
    >
      <DocSection title="NavigationMenu">
        <VariantSection
          title="Menu com Submenus"
          description="Trigger com hover revela um painel de links organizados em grid."
          preview={
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Módulos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2">
                      <ListItem title="ERP Industrial" icon={Box} href="#">
                        Gestão completa de produção, estoque e logística.
                      </ListItem>
                      <ListItem title="CRM" icon={Users} href="#">
                        Relacionamento com clientes e pipeline de vendas.
                      </ListItem>
                      <ListItem title="Financeiro" icon={BarChart3} href="#">
                        Contas a pagar/receber, fluxo de caixa e DRE.
                      </ListItem>
                      <ListItem title="RH" icon={ShieldCheck} href="#">
                        Gestão de colaboradores, folha e benefícios.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[350px] gap-1 p-3">
                      <ListItem title="Documentação" icon={FileText} href="#">
                        Guias de uso e referência da API.
                      </ListItem>
                      <ListItem title="Integrações" icon={Zap} href="#">
                        Conecte com ERPs, gateways e sistemas externos.
                      </ListItem>
                      <ListItem title="Configurações" icon={Settings} href="#">
                        Preferências do sistema e personalização.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Preços
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          }
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Módulos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-1 p-3 md:grid-cols-2">
          <ListItem title="ERP" icon={Box} href="#">
            Descrição do módulo...
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Preços
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        />

        <VariantSection
          title="Com Destaque Principal"
          description="Primeiro item com visual de destaque e descrição longa ao lado do grid de links."
          preview={
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Plataforma</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <Box className="h-6 w-6 text-primary" />
                            <div className="mb-2 mt-4 text-lg font-bold text-foreground">
                              SmarNet ERP
                            </div>
                            <p className="text-xs leading-tight text-muted-foreground">
                              Plataforma completa para gestão industrial. Módulos integrados para toda a operação.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem title="Começar" href="#">
                        Guia rápido de configuração e primeiros passos.
                      </ListItem>
                      <ListItem title="Componentes" href="#">
                        Biblioteca de UI do Design System.
                      </ListItem>
                      <ListItem title="Templates" href="#">
                        Layouts prontos para páginas comuns.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          }
          code={`<NavigationMenuContent>
  <ul className="grid lg:grid-cols-[.75fr_1fr]">
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <a className="flex h-full flex-col justify-end rounded-lg bg-gradient-to-b from-primary/20 p-6">
          <div className="text-lg font-bold">SmarNet ERP</div>
          <p className="text-xs text-muted-foreground">Descrição...</p>
        </a>
      </NavigationMenuLink>
    </li>
    <ListItem title="Começar" href="#">...</ListItem>
  </ul>
</NavigationMenuContent>`}
        />

        <VariantSection
          title="Links Simples (sem dropdown)"
          description="Use navigationMenuTriggerStyle() para links diretos no mesmo estilo visual."
          preview={
            <NavigationMenu>
              <NavigationMenuList>
                {['Dashboard', 'Pedidos', 'Clientes', 'Relatórios'].map((label) => (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          }
          code={`import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

<NavigationMenuLink className={navigationMenuTriggerStyle()}>
  Dashboard
</NavigationMenuLink>`}
        />

        <PropsTable rows={navMenuProps} title="NavigationMenu (Root)" />
        <PropsTable rows={navMenuItemProps} title="NavigationMenuItem" />
        <PropsTable rows={navMenuTriggerProps} title="NavigationMenuTrigger" />
        <PropsTable rows={navMenuContentProps} title="NavigationMenuContent" />
        <PropsTable rows={navMenuLinkProps} title="NavigationMenuLink" />

        <UsageNote type="tip">
          Use <code className="font-mono text-[11px]">navigationMenuTriggerStyle()</code> em links diretos para manter a consistência visual com os triggers de dropdown.
        </UsageNote>

        <UsageNote type="warning">
          O <code className="font-mono text-[11px]">NavigationMenu</code> é otimizado para menus de header. Para menus de contexto (clique-direito), use <code className="font-mono text-[11px]">ContextMenu</code>. Para menus dropdown em botões, use <code className="font-mono text-[11px]">DropdownMenu</code>.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
