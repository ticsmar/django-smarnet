import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ComponentDoc, VariantSection, PropsTable, UsageNote } from '../_docs';

export default function AlertDialogPage() {
  return (
    <ComponentDoc
      summary="Diálogo modal de confirmação que interrompe o fluxo do usuário para decisões críticas ou destrutivas. Baseado em Radix AlertDialog — acessível, com foco preso e overlay."
      importPath="import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'"
    >
      {/* Destrutivo */}
      <VariantSection
        title="Confirmação Destrutiva"
        description="Ação irreversível — botão de confirmação usa variante destructive."
        preview={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Excluir cliente</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação removerá permanentemente o cliente e todos os pedidos associados. Não é possível desfazer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Sim, excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir cliente</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação removerá permanentemente o cliente...
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Sim, excluir
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      />

      {/* Confirmação padrão */}
      <VariantSection
        title="Confirmação Padrão"
        description="Confirmação não destrutiva — usa botão primário para a ação principal."
        preview={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Publicar relatório</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publicar relatório?</AlertDialogTitle>
                <AlertDialogDescription>
                  O relatório será visível para todos os membros da equipe. Você pode despublicar depois.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Voltar</AlertDialogCancel>
                <AlertDialogAction>Publicar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Publicar relatório</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Publicar relatório?</AlertDialogTitle>
      <AlertDialogDescription>
        O relatório será visível para todos os membros da equipe.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Voltar</AlertDialogCancel>
      <AlertDialogAction>Publicar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      />

      {/* Logout */}
      <VariantSection
        title="Confirmação de Logout"
        description="Caso de uso comum em ERP — confirmar saída da sessão."
        preview={
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Sair do sistema</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Encerrar sessão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Você será desconectado e precisará fazer login novamente para acessar o sistema.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Continuar logado</AlertDialogCancel>
                <AlertDialogAction>Sair</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Sair do sistema</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Encerrar sessão?</AlertDialogTitle>
      <AlertDialogDescription>
        Você será desconectado e precisará fazer login novamente.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Continuar logado</AlertDialogCancel>
      <AlertDialogAction>Sair</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      />

      {/* Props */}
      <PropsTable
        title="Componentes & Props"
        rows={[
          { name: 'AlertDialog', type: 'Root', description: 'Container raiz — controla estado open/closed.' },
          { name: 'open', type: 'boolean', description: 'Controle externo do estado aberto/fechado (controlled mode).', default: '—' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback quando o estado muda.' },
          { name: 'AlertDialogTrigger', type: 'Component', description: 'Elemento que dispara a abertura. Use asChild para renderizar seu próprio botão.' },
          { name: 'AlertDialogContent', type: 'Component', description: 'Painel modal com overlay, foco preso e animações de entrada/saída.' },
          { name: 'AlertDialogHeader', type: 'div', description: 'Wrapper semântico para título + descrição.' },
          { name: 'AlertDialogTitle', type: 'Component', description: 'Título do diálogo — obrigatório para acessibilidade (aria-labelledby).' },
          { name: 'AlertDialogDescription', type: 'Component', description: 'Descrição do diálogo — lida por leitores de tela (aria-describedby).' },
          { name: 'AlertDialogFooter', type: 'div', description: 'Container para botões de ação — empilha em mobile, lado a lado em desktop.' },
          { name: 'AlertDialogAction', type: 'Component', description: 'Botão de confirmação — fecha o diálogo ao clicar.' },
          { name: 'AlertDialogCancel', type: 'Component', description: 'Botão de cancelamento — fecha o diálogo sem executar ação.' },
        ]}
      />

      <UsageNote type="warning">
        Use <strong>AlertDialog</strong> apenas para ações que requerem confirmação explícita (exclusão, logout, publicação). 
        Para formulários ou conteúdo interativo, prefira o componente <code>Dialog</code>.
      </UsageNote>

      <UsageNote type="tip">
        O AlertDialog não pode ser fechado clicando no overlay ou pressionando Escape — isso é intencional 
        para garantir que o usuário tome uma decisão consciente.
      </UsageNote>
    </ComponentDoc>
  );
}
