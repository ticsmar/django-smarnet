import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';
import { BarChart3, Box, FileText, Home, Settings, Shield, Users } from 'lucide-react';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger, SidebarHeader, SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const sidebarProviderProps: PropDef[] = [
  { name: 'defaultOpen', type: 'boolean', default: 'true', description: 'Estado inicial (não controlado).' },
  { name: 'open', type: 'boolean', description: 'Estado controlado (expanded ou collapsed).' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback ao alternar.' },
];

const sidebarProps: PropDef[] = [
  { name: 'side', type: '"left" | "right"', default: '"left"', description: 'Lado da sidebar.' },
  { name: 'variant', type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: 'Estilo visual da sidebar.' },
  { name: 'collapsible', type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: 'Comportamento ao colapsar.' },
];

const sidebarMenuButtonProps: PropDef[] = [
  { name: 'isActive', type: 'boolean', default: 'false', description: 'Marca o item como rota ativa.' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Renderiza o filho como elemento (ex: NavLink).' },
  { name: 'tooltip', type: 'string | TooltipContent', description: 'Tooltip exibido no modo collapsed (icon).' },
  { name: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: 'Tamanho do botão.' },
  { name: 'variant', type: '"default" | "outline"', default: '"default"', description: 'Variante visual.' },
];

const menuItems = [
  { title: 'Dashboard', icon: Home, active: true },
  { title: 'Pedidos', icon: FileText, badge: '12' },
  { title: 'Clientes', icon: Users },
  { title: 'Produção', icon: Box },
  { title: 'Relatórios', icon: BarChart3 },
];

const adminItems = [
  { title: 'Configurações', icon: Settings },
  { title: 'Segurança', icon: Shield },
];

export default function SidebarPage() {
  return (
    <ComponentDoc
      summary="Sidebar de navegação principal da aplicação. Suporta grupos colapsáveis, badges, modo collapsed (ícones), tooltips e integração com react-router via NavLink."
      importPath="import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar'"
    >
      <DocSection title="Sidebar">
        <VariantSection
          title="Sidebar Expandida"
          description="Layout padrão com grupos, ícones, labels e badges."
          preview={
            <div className="rounded-xl border border-border/30 overflow-hidden bg-background" style={{ height: '420px' }}>
              <SidebarProvider defaultOpen={true}>
                <div className="flex h-full w-full">
                  <Sidebar collapsible="none" className="border-r border-border/30">
                    <SidebarHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                          <Box className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">SmarNet</p>
                          <p className="text-[10px] text-muted-foreground">ERP Industrial</p>
                        </div>
                      </div>
                    </SidebarHeader>
                    <SidebarSeparator />
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupLabel>Principal</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {menuItems.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton isActive={item.active}>
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.title}</span>
                                  {item.badge && (
                                    <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px]">
                                      {item.badge}
                                    </Badge>
                                  )}
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                      <SidebarGroup>
                        <SidebarGroupLabel>Administração</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {adminItems.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton>
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.title}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-3">
                      <div className="flex items-center gap-2 rounded-lg bg-surface-container p-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">João da Silva</p>
                          <p className="text-[10px] text-muted-foreground truncate">Admin</p>
                        </div>
                      </div>
                    </SidebarFooter>
                  </Sidebar>
                  <div className="flex-1 p-4">
                    <p className="text-sm text-muted-foreground">Conteúdo principal da aplicação.</p>
                  </div>
                </div>
              </SidebarProvider>
            </div>
          }
          code={`<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>...</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={true}>
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>...</SidebarFooter>
  </Sidebar>
  <main>...</main>
</SidebarProvider>`}
        />

        <VariantSection
          title="Item Ativo + Badge"
          description="isActive destaca o item com fundo accent. Badges indicam contadores."
          preview={
            <div className="rounded-xl border border-border/30 overflow-hidden bg-background w-64">
              <SidebarProvider defaultOpen={true}>
                <Sidebar collapsible="none" className="w-full">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton isActive>
                              <Home className="h-4 w-4" />
                              <span>Dashboard</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <FileText className="h-4 w-4" />
                              <span>Pedidos</span>
                              <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">3</Badge>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Users className="h-4 w-4" />
                              <span>Clientes</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
              </SidebarProvider>
            </div>
          }
          code={`<SidebarMenuButton isActive={pathname === '/dashboard'}>
  <Home className="h-4 w-4" />
  <span>Dashboard</span>
</SidebarMenuButton>

<SidebarMenuButton>
  <FileText className="h-4 w-4" />
  <span>Pedidos</span>
  <Badge variant="destructive" className="ml-auto">3</Badge>
</SidebarMenuButton>`}
        />

        <VariantSection
          title="SidebarTrigger"
          description="Botão para alternar entre expanded e collapsed. Posicione no header externo."
          preview={
            <div className="rounded-xl border border-border/30 overflow-hidden bg-background" style={{ height: '200px' }}>
              <SidebarProvider defaultOpen={true}>
                <div className="flex h-full w-full">
                  <Sidebar collapsible="icon" className="border-r border-border/30">
                    <SidebarContent>
                      <SidebarGroup>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {[{ t: 'Home', i: Home }, { t: 'Pedidos', i: FileText }, { t: 'Config', i: Settings }].map(item => (
                              <SidebarMenuItem key={item.t}>
                                <SidebarMenuButton tooltip={item.t}>
                                  <item.i className="h-4 w-4" />
                                  <span>{item.t}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    </SidebarContent>
                  </Sidebar>
                  <div className="flex-1 flex flex-col">
                    <header className="h-10 flex items-center border-b border-border/30 px-2">
                      <SidebarTrigger />
                      <span className="text-xs text-muted-foreground ml-2">Clique para alternar</span>
                    </header>
                    <div className="flex-1 p-4 text-sm text-muted-foreground">Conteúdo</div>
                  </div>
                </div>
              </SidebarProvider>
            </div>
          }
          code={`<SidebarProvider>
  <Sidebar collapsible="icon">...</Sidebar>
  <div className="flex-1 flex flex-col">
    <header>
      <SidebarTrigger />
    </header>
    <main>...</main>
  </div>
</SidebarProvider>`}
        />

        <PropsTable rows={sidebarProviderProps} title="SidebarProvider" />
        <PropsTable rows={sidebarProps} title="Sidebar" />
        <PropsTable rows={sidebarMenuButtonProps} title="SidebarMenuButton" />

        <UsageNote type="tip">
          Use <code className="font-mono text-[11px]">collapsible="icon"</code> para manter uma faixa estreita com ícones quando collapsed. Com <code className="font-mono text-[11px]">"offcanvas"</code>, a sidebar desaparece completamente.
        </UsageNote>

        <UsageNote type="warning">
          Posicione o <code className="font-mono text-[11px]">SidebarTrigger</code> no header externo (fora da Sidebar) para que continue acessível mesmo com <code className="font-mono text-[11px]">collapsible="offcanvas"</code>.
        </UsageNote>

        <UsageNote type="info">
          Combine <code className="font-mono text-[11px]">SidebarMenuButton</code> com <code className="font-mono text-[11px]">asChild</code> e <code className="font-mono text-[11px]">NavLink</code> do react-router para ativar automaticamente o item da rota atual.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
