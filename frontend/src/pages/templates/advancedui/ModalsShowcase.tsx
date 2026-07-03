import { AdvancedUILayout, ShowcaseSection } from './AdvancedUILayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ModalsShowcase() {
  return (
    <AdvancedUILayout title="Modals & Closes" description="Diálogos modais para ações, formulários e confirmações.">
      <ShowcaseSection title="Modal Básico">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild><Button>Abrir Modal</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes do Pedido</DialogTitle>
                <DialogDescription>Visualize as informações do pedido selecionado.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Número:</span><span className="font-mono">#15558</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Cliente:</span><span>Indústrias ABC Ltda</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Valor:</span><span className="font-bold text-primary">R$ 12.450,00</span></div>
              </div>
              <DialogFooter><Button variant="outline">Fechar</Button><Button>Aprovar</Button></DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Modal com Formulário</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Fornecedor</DialogTitle>
                <DialogDescription>Preencha os dados do fornecedor.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2"><Label>Razão Social</Label><Input placeholder="Ex: Tech Parts Ltda" /></div>
                <div className="space-y-2"><Label>CNPJ</Label><Input placeholder="00.000.000/0000-00" /></div>
                <div className="space-y-2"><Label>E-mail</Label><Input type="email" placeholder="contato@empresa.com" /></div>
              </div>
              <DialogFooter><Button variant="outline">Cancelar</Button><Button>Salvar</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alert Dialog (Confirmação)">
        <div className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive">Excluir Registro</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
                <AlertDialogDescription>Esta ação não pode ser desfeita. O registro será permanentemente removido do sistema.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction>Sim, excluir</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">Cancelar Pedido</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar pedido #15558?</AlertDialogTitle>
                <AlertDialogDescription>O pedido será marcado como cancelado e os itens retornarão ao estoque. Deseja continuar?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Manter</AlertDialogCancel><AlertDialogAction>Cancelar Pedido</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos de Modal">
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Pequeno', size: 'sm:max-w-sm' },
            { label: 'Médio', size: 'sm:max-w-md' },
            { label: 'Grande', size: 'sm:max-w-lg' },
            { label: 'Extra Grande', size: 'sm:max-w-2xl' },
          ].map(m => (
            <Dialog key={m.label}>
              <DialogTrigger asChild><Button variant="outline">{m.label}</Button></DialogTrigger>
              <DialogContent className={m.size}>
                <DialogHeader>
                  <DialogTitle>Modal {m.label}</DialogTitle>
                  <DialogDescription>Este modal usa a largura máxima: {m.size}</DialogDescription>
                </DialogHeader>
                <div className="py-6 text-center text-muted-foreground text-sm">Conteúdo do modal com largura {m.label.toLowerCase()}.</div>
                <DialogFooter><Button variant="outline">Fechar</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ShowcaseSection>
    </AdvancedUILayout>
  );
}
