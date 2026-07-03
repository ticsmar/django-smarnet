import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ComponentDoc, DocSection, VariantSection, PropsTable, UsageNote, type PropDef } from '../_docs';

const groupProps: PropDef[] = [
  { name: 'direction', type: '"horizontal" | "vertical"', required: true, description: 'Orientação dos painéis.' },
  { name: 'autoSaveId', type: 'string', description: 'Persiste tamanhos no localStorage com a chave informada.' },
  { name: 'onLayout', type: '(sizes: number[]) => void', description: 'Callback disparado a cada redimensionamento.' },
];

const panelProps: PropDef[] = [
  { name: 'defaultSize', type: 'number (0-100)', description: 'Tamanho inicial em porcentagem.' },
  { name: 'minSize / maxSize', type: 'number', description: 'Limites de redimensionamento em porcentagem.' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: 'Permite colapsar o painel ao arrastar abaixo do minSize.' },
];

const handleProps: PropDef[] = [
  { name: 'withHandle', type: 'boolean', default: 'false', description: 'Mostra um “grip” visual no centro da divisória.' },
];

export default function ResizablePage() {
  return (
    <ComponentDoc
      summary="Painéis redimensionáveis baseados em react-resizable-panels — ideais para layouts tipo IDE, diff viewers e dashboards configuráveis. Tamanhos persistem opcionalmente via autoSaveId."
      importPath="import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'"
    >
      <DocSection title="Resizable">
        <VariantSection
          title="Horizontal — sidebar + conteúdo"
          description="Layout clássico de aplicação: navegação à esquerda, conteúdo principal à direita. Arraste a divisória central."
          preview={
            <ResizablePanelGroup direction="horizontal" className="rounded-xl border-2 border-border/70 max-w-2xl h-60 bg-surface-container">
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="h-full grid place-items-center text-sm font-medium text-muted-foreground">Sidebar</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70}>
                <div className="h-full grid place-items-center text-sm font-medium">Conteúdo principal</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          }
          code={`<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30} minSize={20}>Sidebar</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>Conteúdo</ResizablePanel>
</ResizablePanelGroup>`}
        />

        <VariantSection
          title="Vertical — editor + console"
          description="Útil para split entre código/visualização e logs/output."
          preview={
            <ResizablePanelGroup direction="vertical" className="rounded-xl border-2 border-border/70 max-w-2xl h-72 bg-surface-container">
              <ResizablePanel defaultSize={65}>
                <div className="h-full grid place-items-center text-sm font-medium">Editor</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={35}>
                <div className="h-full grid place-items-center text-xs font-mono text-muted-foreground bg-surface-container-high">
                  &gt; build completed in 1.2s
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          }
          code={`<ResizablePanelGroup direction="vertical">
  <ResizablePanel defaultSize={65}>Editor</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={35}>Console</ResizablePanel>
</ResizablePanelGroup>`}
        />

        <VariantSection
          title="Layout de 3 colunas (IDE)"
          description="Combine grupos aninhados para layouts complexos: árvore + editor + inspetor."
          preview={
            <ResizablePanelGroup direction="horizontal" className="rounded-xl border-2 border-border/70 max-w-3xl h-64 bg-surface-container">
              <ResizablePanel defaultSize={20} minSize={15}>
                <div className="h-full grid place-items-center text-xs font-medium text-muted-foreground">Árvore</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={55}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={70}>
                    <div className="h-full grid place-items-center text-sm font-medium">Editor</div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={30}>
                    <div className="h-full grid place-items-center text-xs text-muted-foreground bg-surface-container-high">Terminal</div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={15}>
                <div className="h-full grid place-items-center text-xs font-medium text-muted-foreground">Inspetor</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          }
          code={`<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={20}>Árvore</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={55}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={70}>Editor</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>Terminal</ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={25}>Inspetor</ResizablePanel>
</ResizablePanelGroup>`}
        />

        <PropsTable rows={groupProps} title="ResizablePanelGroup" />
        <PropsTable rows={panelProps} title="ResizablePanel" />
        <PropsTable rows={handleProps} title="ResizableHandle" />

        <UsageNote type="tip">
          Use <code className="font-mono text-[11px]">autoSaveId</code> em layouts de dashboard — o usuário recupera o tamanho preferido entre sessões.
        </UsageNote>

        <UsageNote type="info">
          A divisória responde a teclado: <code className="font-mono text-[11px]">Tab</code> para focar, <code className="font-mono text-[11px]">←/→</code> ou <code className="font-mono text-[11px]">↑/↓</code> para redimensionar.
        </UsageNote>
      </DocSection>
    </ComponentDoc>
  );
}
