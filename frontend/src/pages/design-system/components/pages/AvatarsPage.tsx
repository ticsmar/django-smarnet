import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ComponentDoc,
  DocSection,
  VariantSection,
  PropsTable,
  UsageNote,
  type PropDef,
} from '../_docs';

const avatarProps: PropDef[] = [
  { name: 'className', type: 'string', description: 'Classes adicionais para o container root.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Deve conter AvatarImage e/ou AvatarFallback.' },
];

const avatarImageProps: PropDef[] = [
  { name: 'src', type: 'string', required: true, description: 'URL da imagem do avatar.' },
  { name: 'alt', type: 'string', description: 'Texto alternativo da imagem.' },
  { name: 'onLoadingStatusChange', type: '(status) => void', description: 'Callback quando o status de carregamento muda.' },
];

const avatarFallbackProps: PropDef[] = [
  { name: 'children', type: 'ReactNode', required: true, description: 'Conteúdo de fallback (iniciais, ícone, etc.).' },
  { name: 'delayMs', type: 'number', description: 'Delay em ms antes de exibir o fallback.' },
  { name: 'className', type: 'string', description: 'Classes adicionais para estilização.' },
];

export default function AvatarsPage() {
  return (
    <ComponentDoc
      summary="Representação visual de um usuário com imagem ou iniciais como fallback. Baseado em Radix UI Avatar."
      importPath="@/components/ui/avatar"
    >
      {/* --- Tamanhos --- */}
      <DocSection title="Avatar" description="Composição de Avatar + AvatarImage + AvatarFallback.">
        <VariantSection
          title="Com imagem"
          description="Quando a URL da imagem é válida, exibe a foto do usuário."
          preview={
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/100?img=1" alt="Usuário 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/100?img=5" alt="Usuário 2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/100?img=12" alt="Usuário 3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
            </div>
          }
          code={`<Avatar>
  <AvatarImage src="https://i.pravatar.cc/100?img=1" alt="Usuário" />
  <AvatarFallback>U1</AvatarFallback>
</Avatar>`}
        />

        <VariantSection
          title="Fallback (iniciais)"
          description="Quando a imagem falha ou não é fornecida, exibe as iniciais."
          preview={
            <div className="flex items-center gap-4">
              <Avatar><AvatarFallback>NS</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>JP</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
            </div>
          }
          code={`<Avatar>
  <AvatarFallback>NS</AvatarFallback>
</Avatar>`}
        />

        <VariantSection
          title="Tamanhos customizados"
          description="Use className para alterar o tamanho do avatar."
          preview={
            <div className="flex items-end gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-sm">MD</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg">XL</AvatarFallback>
              </Avatar>
            </div>
          }
          code={`<Avatar className="h-8 w-8">
  <AvatarFallback className="text-xs">SM</AvatarFallback>
</Avatar>

<Avatar className="h-20 w-20">
  <AvatarFallback className="text-lg">XL</AvatarFallback>
</Avatar>`}
        />

        <VariantSection
          title="Grupo de avatares (stack)"
          description="Sobreposição de avatares para indicar múltiplos usuários."
          preview={
            <div className="flex -space-x-3">
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://i.pravatar.cc/100?img=5" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://i.pravatar.cc/100?img=12" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback className="text-xs">+3</AvatarFallback>
              </Avatar>
            </div>
          }
          code={`<div className="flex -space-x-3">
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." />
    <AvatarFallback>A</AvatarFallback>
  </Avatar>
  {/* ... */}
  <Avatar className="border-2 border-background">
    <AvatarFallback className="text-xs">+3</AvatarFallback>
  </Avatar>
</div>`}
        />
      </DocSection>

      {/* --- Props --- */}
      <DocSection title="API">
        <PropsTable rows={avatarProps} title="Avatar" />
        <PropsTable rows={avatarImageProps} title="AvatarImage" />
        <PropsTable rows={avatarFallbackProps} title="AvatarFallback" />
      </DocSection>

      <UsageNote type="tip">
        Sempre forneça um <code>AvatarFallback</code> como filho — ele será exibido durante o carregamento da imagem e em caso de erro.
      </UsageNote>
    </ComponentDoc>
  );
}
