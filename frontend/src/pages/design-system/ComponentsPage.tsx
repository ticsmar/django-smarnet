import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { DSSection, DSCard, DSCode } from './_components';

export default function ComponentsPage() {
  return (
    <>
      {/* BUTTONS */}
      <DSSection title="Buttons" description="Variantes semânticas com cores do sistema.">
        <DSCard className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="alert">Alert</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="info">Info</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </DSCard>
      </DSSection>

      {/* BADGES */}
      <DSSection title="Badges">
        <DSCard className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge className="bg-success text-success-foreground hover:bg-success/90">Success</Badge>
          <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Warning</Badge>
          <Badge className="bg-alert text-alert-foreground hover:bg-alert/90">Alert</Badge>
          <Badge className="bg-info text-info-foreground hover:bg-info/90">Info</Badge>
        </DSCard>
      </DSSection>

      {/* CARDS */}
      <DSSection title="Cards">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Padrão</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Card padrão com borda suave e radius xl.
            </CardContent>
          </Card>
          <div className="rounded-2xl bg-surface-container p-5 shadow-ambient">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">KPI</p>
            <p className="font-display text-3xl font-extrabold">R$ 482k</p>
            <p className="text-xs text-success mt-1">+12,4% vs mês anterior</p>
          </div>
          <div className="rounded-2xl bg-primary text-primary-foreground p-5 shadow-ambient-lg">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">
              Highlight
            </p>
            <p className="font-display text-2xl font-bold">Pedido #4821</p>
            <p className="text-xs opacity-80 mt-1">Pronto para faturar</p>
          </div>
        </div>
      </DSSection>

      {/* INPUTS */}
      <DSSection title="Form controls">
        <DSCard className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="ds-name">Nome</Label>
            <Input id="ds-name" placeholder="Nova Smar S/A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ds-email">E-mail</Label>
            <Input id="ds-email" type="email" placeholder="contato@empresa.com" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ds-msg">Mensagem</Label>
            <Textarea id="ds-msg" placeholder="Descreva..." rows={3} />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="ds-sw" />
            <Label htmlFor="ds-sw">Habilitar notificações</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="ds-ck" />
            <Label htmlFor="ds-ck">Aceito os termos</Label>
          </div>
        </DSCard>
      </DSSection>

      {/* TABS */}
      <DSSection title="Tabs">
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Visão geral</TabsTrigger>
            <TabsTrigger value="tab2">Histórico</TabsTrigger>
            <TabsTrigger value="tab3">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-3 text-sm text-muted-foreground">
            Conteúdo da aba Visão geral.
          </TabsContent>
          <TabsContent value="tab2" className="mt-3 text-sm text-muted-foreground">
            Conteúdo da aba Histórico.
          </TabsContent>
          <TabsContent value="tab3" className="mt-3 text-sm text-muted-foreground">
            Conteúdo da aba Configurações.
          </TabsContent>
        </Tabs>
      </DSSection>

      {/* ALERTS */}
      <DSSection title="Alerts">
        <div className="space-y-3">
          <Alert className="bg-info/10 border-info/30">
            <Info className="h-4 w-4 text-info" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>Sincronização agendada para 02:00.</AlertDescription>
          </Alert>
          <Alert className="bg-success/10 border-success/30">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>Pedido #4821 faturado com sucesso.</AlertDescription>
          </Alert>
          <Alert className="bg-warning/10 border-warning/30">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>Estoque do SKU-203 abaixo do mínimo.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>Falha ao conectar ao serviço de NFe.</AlertDescription>
          </Alert>
        </div>
      </DSSection>

      {/* PROGRESS */}
      <DSSection title="Progress">
        <DSCard className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold">Produção mensal</span>
              <span className="text-muted-foreground">68%</span>
            </div>
            <Progress value={68} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold">Meta de faturamento</span>
              <span className="text-muted-foreground">42%</span>
            </div>
            <Progress value={42} />
          </div>
        </DSCard>
      </DSSection>

      <DSSection title="Como importar">
        <DSCode>{`import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';`}</DSCode>
      </DSSection>
    </>
  );
}
