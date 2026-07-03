import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';
import { BarChart3, Settings, Users, FileText, Bell, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const tabsProps: PropDef[] = [
  { name: 'defaultValue', type: 'string', description: 'Valor da aba ativa por padrão (não controlado).' },
  { name: 'value', type: 'string', description: 'Valor da aba ativa (modo controlado).' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Callback ao trocar de aba.' },
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Orientação do TabsList.' },
];

const tabsListProps: PropDef[] = [
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais no container da lista.' },
];

const tabsTriggerProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Identificador único da aba.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a aba.' },
  { name: 'className', type: 'string', default: '—', description: 'Classes CSS adicionais.' },
];

const tabsContentProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Deve corresponder ao value do TabsTrigger.' },
  { name: 'forceMount', type: 'boolean', default: 'false', description: 'Mantém o conteúdo montado mesmo inativo (útil para animações).' },
];

export default function TabsPage() {
  const [controlled, setControlled] = useState('overview');

  return (
    <ComponentDoc
      summary="Componente de abas para organizar conteúdo em painéis alternáveis. Suporta navegação por teclado, modo controlado e orientação vertical."
      importPath="import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'"
    >
      <DocSection title="Tabs">
        <VariantSection
          title="Padrão"
          description="Abas horizontais com estilo pill, fundo muted e shadow na aba ativa."
          preview={
            <Tabs defaultValue="overview" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="analytics">Análises</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4">
                  <p className="text-sm text-foreground font-medium">Painel de Visão Geral</p>
                  <p className="text-xs text-muted-foreground mt-1">Resumo das informações principais do módulo.</p>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4">
                  <p className="text-sm text-foreground font-medium">Painel de Análises</p>
                  <p className="text-xs text-muted-foreground mt-1">Gráficos e métricas detalhadas.</p>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4">
                  <p className="text-sm text-foreground font-medium">Painel de Configurações</p>
                  <p className="text-xs text-muted-foreground mt-1">Ajustes e preferências do módulo.</p>
                </div>
              </TabsContent>
            </Tabs>
          }
          code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
    <TabsTrigger value="analytics">Análises</TabsTrigger>
    <TabsTrigger value="settings">Configurações</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="analytics">...</TabsContent>
  <TabsContent value="settings">...</TabsContent>
</Tabs>`}
        />

        <VariantSection
          title="Com Ícones"
          description="Abas com ícone + label para maior reconhecimento visual."
          preview={
            <Tabs defaultValue="users" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="users" className="gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Usuários
                </TabsTrigger>
                <TabsTrigger value="reports" className="gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" /> Relatórios
                </TabsTrigger>
                <TabsTrigger value="config" className="gap-1.5">
                  <Settings className="h-3.5 w-3.5" /> Config
                </TabsTrigger>
              </TabsList>
              <TabsContent value="users" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Listagem de usuários do sistema.
                </div>
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Relatórios gerenciais.
                </div>
              </TabsContent>
              <TabsContent value="config" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Configurações avançadas.
                </div>
              </TabsContent>
            </Tabs>
          }
          code={`<TabsTrigger value="users" className="gap-1.5">
  <Users className="h-3.5 w-3.5" /> Usuários
</TabsTrigger>`}
        />

        <VariantSection
          title="Com Badge / Contador"
          description="Badges dentro das abas para indicar contagem ou status."
          preview={
            <Tabs defaultValue="all" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="all" className="gap-1.5">
                  Todos <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">128</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending" className="gap-1.5">
                  Pendentes <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-[10px]">5</Badge>
                </TabsTrigger>
                <TabsTrigger value="done" className="gap-1.5">
                  Concluídos <Badge variant="outline" className="ml-1 h-5 px-1.5 text-[10px]">93</Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Exibindo todos os registros.
                </div>
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  5 registros pendentes de aprovação.
                </div>
              </TabsContent>
              <TabsContent value="done" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  93 registros concluídos.
                </div>
              </TabsContent>
            </Tabs>
          }
          code={`<TabsTrigger value="pending" className="gap-1.5">
  Pendentes
  <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-[10px]">5</Badge>
</TabsTrigger>`}
        />

        <VariantSection
          title="Com Aba Desabilitada"
          description="Abas disabled ficam com opacidade reduzida e não respondem a clique."
          preview={
            <Tabs defaultValue="general" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="security" className="gap-1.5">
                  <Shield className="h-3.5 w-3.5" /> Segurança
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-1.5">
                  <Bell className="h-3.5 w-3.5" /> Notificações
                </TabsTrigger>
                <TabsTrigger value="billing" disabled>
                  Faturamento
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Configurações gerais da conta.
                </div>
              </TabsContent>
              <TabsContent value="security" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Autenticação e permissões.
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Preferências de notificação.
                </div>
              </TabsContent>
            </Tabs>
          }
          code={`<TabsTrigger value="billing" disabled>
  Faturamento
</TabsTrigger>`}
        />

        <VariantSection
          title="Modo Controlado"
          description="Use value + onValueChange para controlar a aba ativa externamente."
          preview={
            <div className="space-y-3 max-w-lg">
              <div className="flex gap-2">
                {['overview', 'details', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setControlled(tab)}
                    className={`text-xs px-3 py-1 rounded-md transition-colors ${
                      controlled === tab
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Ir para {tab}
                  </button>
                ))}
              </div>
              <Tabs value={controlled} onValueChange={setControlled}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                    Aba controlada: overview
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                    Aba controlada: details
                  </div>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                  <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                    Aba controlada: history
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          }
          code={`const [tab, setTab] = useState('overview');

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Detalhes</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="details">...</TabsContent>
</Tabs>`}
        />

        <VariantSection
          title="Full Width"
          description="TabsList ocupando toda a largura com abas distribuídas."
          preview={
            <Tabs defaultValue="docs" className="w-full max-w-lg">
              <TabsList className="w-full">
                <TabsTrigger value="docs" className="flex-1 gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Documentos
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1 gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5" /> Análises
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 gap-1.5">
                  <Settings className="h-3.5 w-3.5" /> Ajustes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="docs" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Abas distribuídas em largura total.
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Painel de análises.
                </div>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <div className="rounded-xl border border-border/30 bg-surface-container p-4 text-sm text-muted-foreground">
                  Painel de ajustes.
                </div>
              </TabsContent>
            </Tabs>
          }
          code={`<TabsList className="w-full">
  <TabsTrigger value="docs" className="flex-1">Documentos</TabsTrigger>
  <TabsTrigger value="analytics" className="flex-1">Análises</TabsTrigger>
</TabsList>`}
        />

        <PropsTable rows={tabsProps} title="Tabs (Root)" />
        <PropsTable rows={tabsListProps} title="TabsList" />
        <PropsTable rows={tabsTriggerProps} title="TabsTrigger" />
        <PropsTable rows={tabsContentProps} title="TabsContent" />

        <UsageNote type="tip">
          Use <code className="font-mono text-[11px]">className="w-full"</code> no <code className="font-mono text-[11px]">TabsList</code> e <code className="font-mono text-[11px]">className="flex-1"</code> nos triggers para tabs full-width.
        </UsageNote>

        <UsageNote type="info">
          A navegação por teclado é automática: <code className="font-mono text-[11px]">←</code> / <code className="font-mono text-[11px]">→</code> alternam entre abas, <code className="font-mono text-[11px]">Home</code> e <code className="font-mono text-[11px]">End</code> vão para a primeira/última.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
