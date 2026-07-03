import { Link } from 'react-router-dom';
import {
  Home, ChevronRight, TrendingUp, TrendingDown, Users, ShoppingCart,
  DollarSign, Package, Activity, Eye, Heart, MessageSquare, Star,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, Clock,
  CheckCircle2, AlertCircle, FileText, Download, Mail, Phone,
  MapPin, Briefcase, Award, Target, Zap, Wifi, HardDrive, Cpu,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-container rounded-2xl border border-border/40 p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <span className="w-8 h-px bg-border" />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function WidgetsShowcase() {
  return (
    <div className="px-2 lg:px-4 pt-2 pb-10 space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={13} /> Início
        </Link>
        <ChevronRight size={12} />
        <span>Templates</span>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Widgets</span>
      </nav>

      <div>
        <h1 className="font-display text-xl font-bold text-foreground">Widgets</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Coleção de widgets prontos para dashboards: KPIs, estatísticas, listas, perfis e indicadores.
        </p>
      </div>

      <div className="space-y-6">
        {/* KPI WIDGETS */}
        <Section title="KPI Widgets">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Receita Total', value: 'R$ 1.284.392', change: '+18.2%', up: true, icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Pedidos', value: '8.421', change: '+12.5%', up: true, icon: ShoppingCart, color: 'text-secondary', bg: 'bg-secondary/10' },
              { label: 'Clientes Ativos', value: '3.842', change: '-2.1%', up: false, icon: Users, color: 'text-tertiary', bg: 'bg-tertiary/10' },
              { label: 'Produtos', value: '1.156', change: '+5.4%', up: true, icon: Package, color: 'text-status-success', bg: 'bg-status-success/10' },
            ].map((kpi, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
                      <p className="text-2xl font-display font-bold text-foreground mt-1">{kpi.value}</p>
                    </div>
                    <div className={`w-11 h-11 rounded-xl ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
                      <kpi.icon size={20} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {kpi.up
                      ? <TrendingUp size={12} className="text-status-success" />
                      : <TrendingDown size={12} className="text-destructive" />}
                    <span className={`text-xs font-semibold ${kpi.up ? 'text-status-success' : 'text-destructive'}`}>{kpi.change}</span>
                    <span className="text-xs text-muted-foreground">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* PROGRESS WIDGETS */}
        <Section title="Progress Widgets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Meta Mensal</CardTitle>
                <CardDescription>Progresso da meta de vendas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Vendas', value: 78, color: 'bg-primary' },
                  { label: 'Novos Clientes', value: 62, color: 'bg-secondary' },
                  { label: 'Renovações', value: 91, color: 'bg-status-success' },
                ].map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-foreground font-medium">{m.label}</span>
                      <span className="text-muted-foreground">{m.value}%</span>
                    </div>
                    <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full transition-all`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Status do Sistema</CardTitle>
                <CardDescription>Recursos em tempo real</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'CPU', value: 42, icon: Cpu, color: 'text-primary' },
                  { label: 'Memória', value: 68, icon: HardDrive, color: 'text-secondary' },
                  { label: 'Rede', value: 23, icon: Wifi, color: 'text-status-success' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center ${m.color}`}>
                      <m.icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground font-medium">{m.label}</span>
                        <span className="text-muted-foreground">{m.value}%</span>
                      </div>
                      <Progress value={m.value} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--surface-container-low))" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.74)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-display font-bold text-foreground">74%</span>
                    <span className="text-xs text-muted-foreground">Concluído</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground mt-3">Performance Geral</p>
                <p className="text-xs text-muted-foreground">Acima da média do setor</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* MINI CHART WIDGETS */}
        <Section title="Mini Chart Widgets">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Visitas', value: '24.8k', change: '+12.4%', up: true, color: 'hsl(var(--primary))' },
              { label: 'Conversões', value: '1.842', change: '+8.1%', up: true, color: 'hsl(var(--secondary))' },
              { label: 'Bounce Rate', value: '32%', change: '-3.2%', up: false, color: 'hsl(var(--tertiary))' },
              { label: 'Receita', value: 'R$ 84k', change: '+24.5%', up: true, color: 'hsl(var(--status-success))' },
            ].map((s, i) => {
              const points = Array.from({ length: 12 }, () => 20 + Math.random() * 60);
              const max = Math.max(...points);
              const path = points.map((p, idx) =>
                `${idx === 0 ? 'M' : 'L'} ${(idx / (points.length - 1)) * 100} ${100 - (p / max) * 100}`
              ).join(' ');
              return (
                <Card key={i}>
                  <CardContent className="p-5">
                    <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                    <p className="text-2xl font-display font-bold text-foreground mt-1">{s.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {s.up
                        ? <ArrowUpRight size={12} className="text-status-success" />
                        : <ArrowDownRight size={12} className="text-destructive" />}
                      <span className={`text-xs font-semibold ${s.up ? 'text-status-success' : 'text-destructive'}`}>{s.change}</span>
                    </div>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-12 mt-3">
                      <path d={path} fill="none" stroke={s.color} strokeWidth="2" />
                      <path d={`${path} L 100 100 L 0 100 Z`} fill={s.color} fillOpacity="0.1" />
                    </svg>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* PROFILE WIDGETS */}
        <Section title="Profile Widgets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-3">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <h4 className="font-display font-bold text-foreground">Roberto Martinez</h4>
                <p className="text-xs text-muted-foreground">Gerente Comercial</p>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant="secondary">Premium</Badge>
                  <Badge variant="outline">Verificado</Badge>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-base font-display font-bold text-foreground">128</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Vendas</p>
                  </div>
                  <div>
                    <p className="text-base font-display font-bold text-foreground">94%</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Meta</p>
                  </div>
                  <div>
                    <p className="text-base font-display font-bold text-foreground">4.8</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="h-20 bg-gradient-to-r from-primary to-secondary rounded-t-lg" />
              <CardContent className="p-5 -mt-10">
                <Avatar className="w-16 h-16 border-4 border-card">
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <h4 className="font-display font-bold text-foreground mt-3">Ana Silva</h4>
                <p className="text-xs text-muted-foreground">Diretora de Operações</p>
                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={12} /> ana.silva@smarnet.com
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={12} /> +55 11 98765-4321
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={12} /> São Paulo, SP
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4">Enviar Mensagem</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Vendedor</CardTitle>
                <CardDescription>Performance da semana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Carlos Mendes', role: 'Senior', sales: 'R$ 124k', avatar: 'https://i.pravatar.cc/150?img=15' },
                  { name: 'Patrícia Lima', role: 'Pleno', sales: 'R$ 98k', avatar: 'https://i.pravatar.cc/150?img=25' },
                  { name: 'Rafael Costa', role: 'Senior', sales: 'R$ 87k', avatar: 'https://i.pravatar.cc/150?img=33' },
                ].map((v, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={v.avatar} />
                        <AvatarFallback>{v.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.role}</p>
                    </div>
                    <span className="text-sm font-display font-bold text-foreground">{v.sales}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ACTIVITY WIDGETS */}
        <Section title="Activity Widgets">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base">Atividades Recentes</CardTitle>
                  <CardDescription>Últimas ações do sistema</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={16} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: CheckCircle2, color: 'text-status-success', bg: 'bg-status-success/10', text: 'Pedido #4521 aprovado', time: '2 min', user: 'Carlos M.' },
                  { icon: Users, color: 'text-primary', bg: 'bg-primary/10', text: 'Novo cliente cadastrado: Petrobras', time: '15 min', user: 'Sistema' },
                  { icon: AlertCircle, color: 'text-status-warning', bg: 'bg-status-warning/10', text: 'Estoque baixo: Produto SKU-1234', time: '1h', user: 'Sistema' },
                  { icon: FileText, color: 'text-secondary', bg: 'bg-secondary/10', text: 'Relatório mensal gerado', time: '2h', user: 'Ana S.' },
                  { icon: DollarSign, color: 'text-tertiary', bg: 'bg-tertiary/10', text: 'Pagamento recebido R$ 24.500', time: '3h', user: 'Sistema' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center ${item.color} shrink-0`}>
                      <item.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.user} • {item.time} atrás
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-xs">Ver todas atividades</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Próximos Eventos</CardTitle>
                <CardDescription>Compromissos da semana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Reunião com Cliente Petrobras', date: '18 Abr', time: '14:00', type: 'Reunião', color: 'border-l-primary' },
                  { title: 'Apresentação Trimestral', date: '19 Abr', time: '10:00', type: 'Interno', color: 'border-l-secondary' },
                  { title: 'Treinamento de Vendas', date: '21 Abr', time: '09:00', type: 'Treinamento', color: 'border-l-tertiary' },
                  { title: 'Revisão de Metas', date: '22 Abr', time: '16:00', type: 'Interno', color: 'border-l-status-success' },
                ].map((ev, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border-l-4 ${ev.color}`}>
                    <div className="text-center min-w-[44px]">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">{ev.date.split(' ')[1]}</p>
                      <p className="text-lg font-display font-bold text-foreground leading-none">{ev.date.split(' ')[0]}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{ev.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <Clock size={11} /> {ev.time}
                        <span>•</span>
                        <span>{ev.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* SOCIAL WIDGETS */}
        <Section title="Social & Engagement Widgets">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Visualizações', value: '124.8k', icon: Eye, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Curtidas', value: '8.421', icon: Heart, color: 'text-destructive', bg: 'bg-destructive/10' },
              { label: 'Comentários', value: '1.284', icon: MessageSquare, color: 'text-secondary', bg: 'bg-secondary/10' },
              { label: 'Avaliação', value: '4.8/5', icon: Star, color: 'text-status-warning', bg: 'bg-status-warning/10' },
            ].map((s, i) => (
              <Card key={i}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                    <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* TASK WIDGETS */}
        <Section title="Task & Goal Widgets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Tarefas do Dia</CardTitle>
                  <Badge variant="secondary">8/12</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {[
                  { task: 'Revisar pedidos pendentes', done: true },
                  { task: 'Reunião com fornecedores', done: true },
                  { task: 'Atualizar relatório mensal', done: false },
                  { task: 'Aprovar novas cotações', done: false },
                  { task: 'Responder e-mails clientes', done: false },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      t.done ? 'bg-primary border-primary' : 'border-border'
                    }`}>
                      {t.done && <CheckCircle2 size={10} className="text-primary-foreground" />}
                    </div>
                    <span className={`text-sm ${t.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {t.task}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  Metas Trimestrais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Faturamento', current: 'R$ 842k', target: 'R$ 1M', value: 84 },
                  { label: 'Novos Contratos', current: '42', target: '50', value: 84 },
                  { label: 'NPS', current: '72', target: '80', value: 90 },
                ].map((g, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{g.label}</span>
                      <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{g.current}</span> / {g.target}
                      </span>
                    </div>
                    <Progress value={g.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award size={16} className="text-status-warning" />
                  Conquistas
                </CardTitle>
                <CardDescription>Badges desbloqueadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Award, label: 'Top Seller', color: 'text-status-warning bg-status-warning/10' },
                    { icon: Zap, label: 'Speed', color: 'text-primary bg-primary/10' },
                    { icon: Star, label: '5 Stars', color: 'text-secondary bg-secondary/10' },
                    { icon: Target, label: 'Goal', color: 'text-status-success bg-status-success/10' },
                    { icon: Briefcase, label: 'Pro', color: 'text-tertiary bg-tertiary/10' },
                    { icon: Activity, label: 'Active', color: 'text-destructive bg-destructive/10' },
                  ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface-container-low">
                      <div className={`w-10 h-10 rounded-full ${b.color} flex items-center justify-center`}>
                        <b.icon size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground text-center">{b.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* DOWNLOAD / FILE WIDGETS */}
        <Section title="File & Download Widgets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Relatório Mensal Abril', size: '2.4 MB', type: 'PDF', color: 'text-destructive bg-destructive/10' },
              { name: 'Planilha de Vendas Q1', size: '1.8 MB', type: 'XLSX', color: 'text-status-success bg-status-success/10' },
              { name: 'Apresentação Cliente', size: '5.2 MB', type: 'PPTX', color: 'text-status-warning bg-status-warning/10' },
            ].map((f, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center font-display font-bold text-xs`}>
                    {f.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.size}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Download size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
