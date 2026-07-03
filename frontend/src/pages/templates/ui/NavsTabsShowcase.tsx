import { useState } from 'react';
import { UIShowcaseLayout, ShowcaseSection } from './UIShowcaseLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Bell, Shield } from 'lucide-react';

export default function NavsTabsShowcase() {
  const [pill, setPill] = useState('tab1');

  return (
    <UIShowcaseLayout title="Navs & Tabs" description="Navegação por abas para organizar conteúdo em seções.">
      <ShowcaseSection title="Tabs Padrão (Underline)">
        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-0 h-auto p-0">
            {['Dados Gerais', 'Endereço', 'Contatos', 'Documentos'].map(tab => (
              <TabsTrigger key={tab} value={tab.toLowerCase().replace(/\s/g, '')}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-1 text-sm"
              >{tab}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="dadosgerais" className="mt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba Dados Gerais.</p>
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs em Pill">
        <div className="flex gap-1 bg-surface-container-high/50 rounded-xl p-1 w-fit">
          {['tab1', 'tab2', 'tab3'].map(t => (
            <button key={t} onClick={() => setPill(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pill === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t === 'tab1' ? 'Visão Geral' : t === 'tab2' ? 'Detalhes' : 'Histórico'}
            </button>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs com Ícone">
        <Tabs defaultValue="perfil" className="w-full">
          <TabsList>
            <TabsTrigger value="perfil" className="gap-1.5"><User size={14} /> Perfil</TabsTrigger>
            <TabsTrigger value="config" className="gap-1.5"><Settings size={14} /> Configurações</TabsTrigger>
            <TabsTrigger value="notif" className="gap-1.5"><Bell size={14} /> Notificações</TabsTrigger>
            <TabsTrigger value="seguranca" className="gap-1.5"><Shield size={14} /> Segurança</TabsTrigger>
          </TabsList>
          <TabsContent value="perfil" className="mt-4">
            <p className="text-sm text-muted-foreground">Dados do perfil do usuário.</p>
          </TabsContent>
          <TabsContent value="config" className="mt-4">
            <p className="text-sm text-muted-foreground">Configurações gerais do sistema.</p>
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs Verticais">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-48 border-r border-border pr-4">
            {[
              { label: 'Geral', active: true },
              { label: 'Aparência' },
              { label: 'Integrações' },
              { label: 'Avançado' },
            ].map(tab => (
              <button key={tab.label}
                className={`px-3 py-2 text-sm rounded-lg text-left transition-colors ${tab.active ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >{tab.label}</button>
            ))}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Conteúdo da aba selecionada aparece aqui.</p>
          </div>
        </div>
      </ShowcaseSection>
    </UIShowcaseLayout>
  );
}
