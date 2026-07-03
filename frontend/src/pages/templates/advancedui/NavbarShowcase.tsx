import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Bell, Search, User, Menu } from 'lucide-react';

export default function NavbarShowcase() {
  return (
    <AdvancedUILayout title="Navbar" description="Barras de navegação responsivas com menus suspensos e ações.">
      <ShowcaseSection title="Navbar Padrão">
        <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-display font-bold text-primary">SmarNET</span>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Módulos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-1 p-3 w-48">
                        {['Clientes', 'Pedidos', 'Estoque', 'Faturamento'].map(m => (
                          <NavigationMenuLink key={m} className="block select-none rounded-md px-3 py-2 text-sm hover:bg-accent/10">{m}</NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Relatórios</NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><User className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Navbar Compacta">
        <div className="rounded-xl border border-border/40 bg-primary/5 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            <span className="font-display font-bold text-sm">ERP</span>
            <div className="hidden lg:flex items-center gap-1 ml-4">
              {['Início', 'Vendas', 'Financeiro', 'Produção'].map(l => (
                <Button key={l} variant="ghost" size="sm" className="text-xs">{l}</Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-xs gap-1"><Bell className="h-3.5 w-3.5" /> 3</Button>
            <Button variant="outline" size="sm" className="text-xs">Admin</Button>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Navbar com Mega Menu">
        <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Cadastros</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-3 p-4 w-96">
                    {[
                      { title: 'Clientes', desc: 'Gerenciar clientes e prospects' },
                      { title: 'Fornecedores', desc: 'Cadastro de fornecedores' },
                      { title: 'Produtos', desc: 'Catálogo de produtos' },
                      { title: 'Funcionários', desc: 'Quadro de funcionários' },
                    ].map(item => (
                      <div key={item.title} className="rounded-lg p-3 hover:bg-accent/10 cursor-pointer">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Operações</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-3 p-4 w-96">
                    {[
                      { title: 'Pedidos', desc: 'Gestão de pedidos de venda' },
                      { title: 'Compras', desc: 'Ordens de compra' },
                      { title: 'Produção', desc: 'Ordens de produção' },
                      { title: 'Expedição', desc: 'Logística e entregas' },
                    ].map(item => (
                      <div key={item.title} className="rounded-lg p-3 hover:bg-accent/10 cursor-pointer">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
