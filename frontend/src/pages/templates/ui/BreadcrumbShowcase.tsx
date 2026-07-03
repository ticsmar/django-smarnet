import { Home, Plus, Download, FileText } from 'lucide-react';
import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { PathBreadcrumb, CompactBreadcrumb, PageHeaderBreadcrumb } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';

export default function BreadcrumbShowcase() {
  const basicItems = [
    { label: 'Início', href: '#', icon: Home },
    { label: 'Cadastros', href: '#' },
    { label: 'Clientes', href: '#' },
    { label: 'Detalhes' },
  ];

  const longPath = [
    { label: 'Início', href: '#', icon: Home },
    { label: 'Comercial', href: '#' },
    { label: 'Pedidos', href: '#' },
    { label: '2024', href: '#' },
    { label: 'Q4', href: '#' },
    { label: 'Outubro', href: '#' },
    { label: '#PED-15558' },
  ];

  return (
    <UIShowcaseLayout title="Breadcrumb" description="Navegação hierárquica data-driven com colapso automático e cabeçalhos de página.">
      <ShowcaseSection title="PathBreadcrumb — separadores">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">separator="chevron" (default)</p>
            <PathBreadcrumb items={basicItems} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">separator="slash"</p>
            <PathBreadcrumb items={basicItems} separator="slash" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos">
        <div className="space-y-3">
          <PathBreadcrumb items={basicItems} size="sm" />
          <PathBreadcrumb items={basicItems} size="xs" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Auto-collapse com ellipsis">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">7 itens, sem limite</p>
            <PathBreadcrumb items={longPath} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">7 itens, maxItems=4</p>
            <PathBreadcrumb items={longPath} maxItems={4} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">7 itens, maxItems=3</p>
            <PathBreadcrumb items={longPath} maxItems={3} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="CompactBreadcrumb (responsivo)">
        <p className="text-xs text-muted-foreground mb-3">
          Em telas pequenas mostra apenas "← {'{pai}'} / atual". Redimensione para ver o efeito.
        </p>
        <div className="rounded-xl border border-border p-4 bg-surface-container/40">
          <CompactBreadcrumb items={longPath} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="PageHeaderBreadcrumb">
        <div className="space-y-6">
          <PageHeaderBreadcrumb
            items={basicItems}
            title="Cliente: ACME Indústria Ltda"
            description="Dados cadastrais, contatos e histórico de movimentações."
            actions={
              <>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1.5" /> Exportar
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1.5" /> Novo pedido
                </Button>
              </>
            }
          />

          <PageHeaderBreadcrumb
            items={[
              { label: 'Início', href: '#', icon: Home },
              { label: 'Faturamento', href: '#' },
              { label: 'Notas fiscais' },
            ]}
            title="Notas fiscais emitidas"
            actions={
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1.5" /> Modelos
              </Button>
            }
            separator="slash"
          />
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
