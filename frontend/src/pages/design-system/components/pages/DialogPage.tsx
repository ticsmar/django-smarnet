import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComponentDoc, VariantSection, PropsTable, UsageNote } from '../_docs';
import { User, Settings, MessageSquare } from 'lucide-react';

export default function DialogPage() {
  return (
    <ComponentDoc
      summary="Modal sobreposto ao conteúdo para formulários, detalhes ou fluxos curtos. Baseado em Radix Dialog — acessível, com foco preso, overlay e animações de entrada/saída. Pode ser fechado via overlay, Escape ou botão X."
      importPath="import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'"
    >
      {/* Formulário de edição */}
      <VariantSection
        title="Formulário de Edição"
        description="Caso mais comum — formulário curto dentro do modal com ações de salvar/cancelar."
        preview={
          <Dialog>
            <DialogTrigger asChild>
              <Button><User className="mr-2 h-4 w-4" />Editar perfil</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>Atualize suas informações cadastrais. Clique em salvar quando terminar.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="d-name">Nome completo</Label>
                  <Input id="d-name" defaultValue="Maria Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-email">E-mail</Label>
                  <Input id="d-email" type="email" defaultValue="maria@empresa.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-role">Cargo</Label>
                  <Select defaultValue="analyst">
                    <SelectTrigger id="d-role"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyst">Analista</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="director">Diretor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                <Button>Salvar alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button><User className="mr-2 h-4 w-4" />Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>Atualize suas informações cadastrais.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" defaultValue="Maria Silva" />
      </div>
      {/* ... mais campos */}
    </div>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
      <Button>Salvar alterações</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      />

      {/* Dialog com conteúdo rico */}
      <VariantSection
        title="Conteúdo Rico (feedback / mensagem)"
        description="Dialog para compor uma mensagem ou nota com textarea e campos adicionais."
        preview={
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" />Nova mensagem</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Enviar feedback</DialogTitle>
                <DialogDescription>Sua mensagem será encaminhada ao time de produto.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="d-subject">Assunto</Label>
                  <Input id="d-subject" placeholder="Resumo do feedback" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-message">Mensagem</Label>
                  <Textarea id="d-message" placeholder="Descreva em detalhes..." rows={4} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="ghost">Descartar</Button></DialogClose>
                <Button>Enviar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" />Nova mensagem</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[525px]">
    <DialogHeader>
      <DialogTitle>Enviar feedback</DialogTitle>
      <DialogDescription>Sua mensagem será encaminhada ao time de produto.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="subject">Assunto</Label>
        <Input id="subject" placeholder="Resumo do feedback" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" placeholder="Descreva em detalhes..." rows={4} />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Descartar</Button></DialogClose>
      <Button>Enviar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      />

      {/* Dialog compacto — confirmação rápida */}
      <VariantSection
        title="Dialog Compacto (Configurações)"
        description="Dialog menor sem descrição — útil para ajustes rápidos de configuração."
        preview={
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm"><Settings className="mr-2 h-4 w-4" />Configurar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Preferências de notificação</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>E-mails de resumo diário</span>
                  <Button variant="outline" size="sm">Ativar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Alertas de estoque baixo</span>
                  <Button variant="outline" size="sm">Desativar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notificações push</span>
                  <Button variant="outline" size="sm">Ativar</Button>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button size="sm">Fechar</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="secondary" size="sm"><Settings className="mr-2 h-4 w-4" />Configurar</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[400px]">
    <DialogHeader>
      <DialogTitle>Preferências de notificação</DialogTitle>
    </DialogHeader>
    <div className="space-y-3 py-2 text-sm text-muted-foreground">
      {/* conteúdo */}
    </div>
    <DialogFooter>
      <DialogClose asChild><Button size="sm">Fechar</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      />

      <PropsTable
        title="Componentes & Props"
        rows={[
          { name: 'Dialog', type: 'Root', description: 'Container raiz — gerencia estado open/closed.' },
          { name: 'open', type: 'boolean', description: 'Controle externo do estado (controlled mode).', default: '—' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback quando o estado muda (inclui fechar via overlay/Escape).' },
          { name: 'modal', type: 'boolean', description: 'Se true (default), renderiza overlay e prende o foco.', default: 'true' },
          { name: 'DialogTrigger', type: 'Component', description: 'Elemento que abre o dialog. Use asChild para renderizar seu próprio botão.' },
          { name: 'DialogContent', type: 'Component', description: 'Painel modal centralizado com overlay, foco preso, botão X e animações.' },
          { name: 'DialogHeader', type: 'div', description: 'Wrapper semântico para título + descrição.' },
          { name: 'DialogTitle', type: 'Component', description: 'Título — obrigatório para acessibilidade (aria-labelledby).' },
          { name: 'DialogDescription', type: 'Component', description: 'Descrição opcional — aria-describedby.' },
          { name: 'DialogFooter', type: 'div', description: 'Container de ações — empilha em mobile, lado a lado em desktop.' },
          { name: 'DialogClose', type: 'Component', description: 'Elemento que fecha o dialog ao clicar. Use asChild para estilizar.' },
        ]}
      />

      <UsageNote type="tip">
        Use <strong>Dialog</strong> para formulários, detalhes e fluxos que não exigem confirmação forçada.
        Para ações destrutivas que não devem ser fechadas via overlay, use <code>AlertDialog</code>.
      </UsageNote>

      <UsageNote type="warning">
        Sempre forneça <code>DialogTitle</code> para acessibilidade, mesmo que visualmente oculto.
        O <code>DialogDescription</code> é recomendado mas opcional.
      </UsageNote>
    </ComponentDoc>
  );
}
