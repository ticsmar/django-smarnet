import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, ChevronRight, X, Save, Table2, Search, Filter,
  ArrowUpDown, Eye, Edit, Trash2, ChevronDown, ChevronUp,
  LayoutList, Grid3X3, Layers, BarChart3,
  CheckCircle2, AlertTriangle, XCircle, Clock, Info
} from 'lucide-react';

import { cn } from '@/lib/utils';

type Tab = 'padrao' | 'compacta' | 'selecao' | 'expansivel' | 'zebrada';

const tabs: { key: Tab; label: string; icon: typeof Table2 }[] = [
  { key: 'padrao', label: 'Padrão Ordenável', icon: LayoutList },
  { key: 'compacta', label: 'Compacta', icon: Grid3X3 },
  { key: 'selecao', label: 'Seleção (Checkbox)', icon: Layers },
  { key: 'expansivel', label: 'Expansível (Master-Detail)', icon: Table2 },
  { key: 'zebrada', label: 'Zebrada + Resumo', icon: BarChart3 },
];

const TABLE_HEADER = "bg-surface-container-low";
const TABLE_FOOTER = "bg-surface-container-low";
const TABLE_WRAPPER = "bg-surface-container rounded-2xl border border-border/40 overflow-hidden";

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-border" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">
        {children}
      </div>
    </div>
  );
}

export default function TableShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('padrao');

  return (
    <>
      <div className="px-4 lg:px-8 pt-4 pb-10 space-y-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition-colors flex items-center gap-1"><Home size={13} /> Início</Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Showcase de Tabelas</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight font-heading">
              Modelos de Tabelas & Grids
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Variações de tabelas para o design system ERP</p>
          </div>
          <div className="flex gap-2">
            <Link to="/app" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-muted/50 text-muted-foreground hover:bg-muted transition-colors border border-border">
              <X size={14} /> Fechar
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-medium/50 rounded-xl p-1 border border-border/50 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap relative",
                  isActive
                    ? "bg-background text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <Icon size={14} />
                {tab.label}
                {isActive && (
                  <motion.div layoutId="table-tab" className="absolute inset-0 rounded-lg border-2 border-secondary/30 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

          {activeTab === 'padrao' && (
            <FieldGroup title="Tabela Padrão — Ordenável">
              <div className="col-span-2 xl:col-span-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input placeholder="Buscar..." className="h-9 w-full pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
                    <Filter size={13} /> Filtros
                  </button>
                </div>
                <div className={TABLE_WRAPPER}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={cn(TABLE_HEADER, "border-b border-border/40")}>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">
                          <button className="inline-flex items-center gap-1 hover:text-foreground transition-colors">Código <ArrowUpDown size={12} /></button>
                        </th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">
                          <button className="inline-flex items-center gap-1 hover:text-foreground transition-colors">Descrição <ArrowUpDown size={12} /></button>
                        </th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Categoria</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground text-xs">
                          <button className="inline-flex items-center gap-1 hover:text-foreground transition-colors ml-auto">Valor <ArrowUpDown size={12} /></button>
                        </th>
                        <th className="px-4 py-2.5 text-center font-semibold text-muted-foreground text-xs">Status</th>
                        <th className="px-4 py-2.5 text-center font-semibold text-muted-foreground text-xs">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        { cod: 'PRD-0012', desc: 'Sensor de Pressão XK-200', cat: 'Instrumentação', valor: 'R$ 1.250,00', status: 'Ativo' },
                        { cod: 'PRD-0045', desc: 'Válvula Solenoide 2"', cat: 'Controle', valor: 'R$ 3.890,00', status: 'Ativo' },
                        { cod: 'PRD-0078', desc: 'Transmissor de Nível', cat: 'Instrumentação', valor: 'R$ 2.150,00', status: 'Inativo' },
                        { cod: 'PRD-0103', desc: 'CLP Compacto S7-1200', cat: 'Automação', valor: 'R$ 8.420,00', status: 'Ativo' },
                        { cod: 'PRD-0156', desc: 'Cabo Profibus DP 100m', cat: 'Redes', valor: 'R$ 480,00', status: 'Baixo Estoque' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary">{row.cod}</td>
                          <td className="px-4 py-3 font-medium text-foreground">{row.desc}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.cat}</td>
                          <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">{row.valor}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn(
                              "inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              row.status === 'Ativo' && 'bg-status-success/10 text-status-success',
                              row.status === 'Inativo' && 'bg-muted text-muted-foreground',
                              row.status === 'Baixo Estoque' && 'bg-status-warning/10 text-status-warning',
                            )}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="inline-flex gap-1">
                              <button className="p-1.5 rounded-md hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-colors" title="Visualizar"><Eye size={14} /></button>
                              <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors" title="Editar"><Edit size={14} /></button>
                              <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Excluir"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={cn("flex items-center justify-between px-4 py-2.5 border-t border-border/40 text-xs text-muted-foreground", TABLE_FOOTER)}>
                    <span>Exibindo 1-5 de 156 registros</span>
                    <div className="flex gap-1">
                      {[1,2,3,'...',32].map((p,i) => (
                        <button key={i} className={cn("px-2.5 py-1 rounded-md font-medium transition-colors", p === 1 ? "bg-secondary text-secondary-foreground" : "hover:bg-muted/50")}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FieldGroup>
          )}

          {activeTab === 'compacta' && (
            <FieldGroup title="Tabela Compacta — Densidade Alta">
              <div className="col-span-2 xl:col-span-3">
                <div className={TABLE_WRAPPER}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={cn(TABLE_HEADER, "border-b border-border/40")}>
                        <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Código</th>
                        <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Produto</th>
                        <th className="px-3 py-2 text-center font-semibold text-muted-foreground">Qtd</th>
                        <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Unit.</th>
                        <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        { cod: '001', prod: 'Parafuso M8x30 Inox', qtd: 500, unit: '0,45', total: '225,00' },
                        { cod: '002', prod: 'Porca Sext. M8 Inox', qtd: 500, unit: '0,22', total: '110,00' },
                        { cod: '003', prod: 'Arruela Lisa M8', qtd: 1000, unit: '0,08', total: '80,00' },
                        { cod: '004', prod: 'Chapa Aço 1020 3mm', qtd: 10, unit: '189,90', total: '1.899,00' },
                        { cod: '005', prod: 'Tubo Galv. 1" x 6m', qtd: 25, unit: '42,00', total: '1.050,00' },
                        { cod: '006', prod: 'Eletrodo E6013 3.25mm', qtd: 5, unit: '38,50', total: '192,50' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-muted/20 transition-colors">
                          <td className="px-3 py-1.5 font-mono text-muted-foreground">{row.cod}</td>
                          <td className="px-3 py-1.5 text-foreground">{row.prod}</td>
                          <td className="px-3 py-1.5 text-center font-mono font-semibold text-foreground">{row.qtd}</td>
                          <td className="px-3 py-1.5 text-right font-mono text-muted-foreground">R$ {row.unit}</td>
                          <td className="px-3 py-1.5 text-right font-mono font-semibold text-foreground">R$ {row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={cn(TABLE_FOOTER, "border-t border-border/40 font-semibold")}>
                        <td colSpan={4} className="px-3 py-2 text-right text-xs text-muted-foreground">Total Geral:</td>
                        <td className="px-3 py-2 text-right font-mono text-sm text-secondary font-bold">R$ 3.556,50</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </FieldGroup>
          )}

          {activeTab === 'selecao' && (
            <FieldGroup title="Tabela com Seleção (Checkbox)">
              <div className="col-span-2 xl:col-span-3">
                <div className={TABLE_WRAPPER}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={cn(TABLE_HEADER, "border-b border-border/40")}>
                        <th className="px-4 py-2.5 w-10"><input type="checkbox" className="rounded border-border" /></th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Nº Pedido</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Cliente</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Data</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground text-xs">Valor</th>
                        <th className="px-4 py-2.5 text-center font-semibold text-muted-foreground text-xs">Situação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        { ped: 'PED-88425', cli: 'Metalúrgica Aço Forte', data: '02/04/2026', valor: 'R$ 15.800,00', sit: 'Aprovado', color: 'emerald' },
                        { ped: 'PED-88426', cli: 'Ind. Química Sul', data: '03/04/2026', valor: 'R$ 42.300,00', sit: 'Pendente', color: 'amber' },
                        { ped: 'PED-88427', cli: 'TechParts Ltda', data: '04/04/2026', valor: 'R$ 8.950,00', sit: 'Em Produção', color: 'blue' },
                        { ped: 'PED-88428', cli: 'Montagens Industriais SA', data: '05/04/2026', valor: 'R$ 67.200,00', sit: 'Faturado', color: 'purple' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3"><input type="checkbox" className="rounded border-border" /></td>
                          <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary">{row.ped}</td>
                          <td className="px-4 py-3 font-medium text-foreground">{row.cli}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.data}</td>
                          <td className="px-4 py-3 text-right font-mono font-semibold">{row.valor}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn(
                              "inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              row.color === 'emerald' && 'bg-status-success/10 text-status-success',
                              row.color === 'amber' && 'bg-status-warning/10 text-status-warning',
                              row.color === 'blue' && 'bg-status-info/10 text-status-info',
                              row.color === 'purple' && 'bg-accent/10 text-accent',
                            )}>
                              {row.sit}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={cn("flex items-center gap-3 px-4 py-2.5 border-t border-border/40 text-xs", TABLE_FOOTER)}>
                    <span className="font-semibold text-secondary">2 selecionados</span>
                    <button className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-colors">Aprovar</button>
                    <button className="px-3 py-1 rounded-md bg-muted text-muted-foreground font-semibold hover:bg-muted/80 transition-colors">Exportar</button>
                    <button className="px-3 py-1 rounded-md text-destructive hover:bg-destructive/10 font-semibold transition-colors">Excluir</button>
                  </div>
                </div>
              </div>
            </FieldGroup>
          )}

          {activeTab === 'expansivel' && (
            <FieldGroup title="Tabela Expansível (Master-Detail)">
              <div className="col-span-2 xl:col-span-3">
                <div className={TABLE_WRAPPER}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={cn(TABLE_HEADER, "border-b border-border/40")}>
                        <th className="px-4 py-2.5 w-10"></th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Nº NF</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Fornecedor</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Emissão</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground text-xs">Valor Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3"><button className="p-1 rounded hover:bg-muted/50 text-muted-foreground"><ChevronDown size={14} /></button></td>
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary">NF-45892</td>
                        <td className="px-4 py-3 font-medium text-foreground">Distribuidora Aço Brasil</td>
                        <td className="px-4 py-3 text-muted-foreground">01/04/2026</td>
                        <td className="px-4 py-3 text-right font-mono font-semibold">R$ 28.450,00</td>
                      </tr>
                      <tr className="bg-muted/10">
                        <td></td>
                        <td colSpan={4} className="px-4 py-3">
                          <div className="rounded-lg border border-border/50 overflow-hidden">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className={cn(TABLE_HEADER)}>
                                  <th className="px-3 py-1.5 text-left text-muted-foreground font-medium">Item</th>
                                  <th className="px-3 py-1.5 text-left text-muted-foreground font-medium">Descrição</th>
                                  <th className="px-3 py-1.5 text-center text-muted-foreground font-medium">Qtd</th>
                                  <th className="px-3 py-1.5 text-right text-muted-foreground font-medium">Valor</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/30">
                                <tr><td className="px-3 py-1.5 font-mono">001</td><td className="px-3 py-1.5">Chapa Aço 1020 6mm</td><td className="px-3 py-1.5 text-center">20</td><td className="px-3 py-1.5 text-right font-mono">R$ 15.200,00</td></tr>
                                <tr><td className="px-3 py-1.5 font-mono">002</td><td className="px-3 py-1.5">Barra Redonda 1"</td><td className="px-3 py-1.5 text-center">50</td><td className="px-3 py-1.5 text-right font-mono">R$ 8.750,00</td></tr>
                                <tr><td className="px-3 py-1.5 font-mono">003</td><td className="px-3 py-1.5">Cantoneira 2" x 3mm</td><td className="px-3 py-1.5 text-center">30</td><td className="px-3 py-1.5 text-right font-mono">R$ 4.500,00</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3"><button className="p-1 rounded hover:bg-muted/50 text-muted-foreground"><ChevronRight size={14} /></button></td>
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary">NF-45893</td>
                        <td className="px-4 py-3 font-medium text-foreground">Eletropaulo Componentes</td>
                        <td className="px-4 py-3 text-muted-foreground">02/04/2026</td>
                        <td className="px-4 py-3 text-right font-mono font-semibold">R$ 12.680,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </FieldGroup>
          )}

          {activeTab === 'zebrada' && (
            <FieldGroup title="Tabela Zebrada (Striped) + Resumo com Status">
              <div className="col-span-2 xl:col-span-3">
                <div className={TABLE_WRAPPER}>
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10">
                      <tr className={cn(TABLE_HEADER, "border-b border-border/40")}>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Nº O.S.</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Descrição</th>
                        <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground text-xs">Responsável</th>
                        <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground text-xs">Valor</th>
                        <th className="px-4 py-2.5 text-center font-semibold text-muted-foreground text-xs">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { os: 'OS-4501', desc: 'Manutenção preventiva - Linha A', resp: 'João Silva', valor: 'R$ 12.500,00', status: 'Confirmado', statusType: 'success' },
                        { os: 'OS-4502', desc: 'Calibração instrumentos', resp: 'Maria Santos', valor: 'R$ 8.200,00', status: 'Em Análise', statusType: 'info' },
                        { os: 'OS-4503', desc: 'Reparo emergencial - Caldeira', resp: 'Carlos Oliveira', valor: 'R$ 35.000,00', status: 'Alerta', statusType: 'warning' },
                        { os: 'OS-4504', desc: 'Instalação CLP novo', resp: 'Ana Costa', valor: 'R$ 22.800,00', status: 'Confirmado', statusType: 'success' },
                        { os: 'OS-4505', desc: 'Troca de válvulas setor B', resp: 'Pedro Lima', valor: 'R$ 4.600,00', status: 'Cancelado', statusType: 'error' },
                        { os: 'OS-4506', desc: 'Pintura estrutural galpão', resp: 'Lucas Mendes', valor: 'R$ 18.900,00', status: 'Pendente', statusType: 'pending' },
                        { os: 'OS-4507', desc: 'Automação linha de envase', resp: 'Fernanda Reis', valor: 'R$ 67.400,00', status: 'Confirmado', statusType: 'success' },
                        { os: 'OS-4508', desc: 'Revisão compressor Atlas', resp: 'Roberto Alves', valor: 'R$ 9.750,00', status: 'Alerta', statusType: 'warning' },
                        { os: 'OS-4509', desc: 'Substituição motor 50cv', resp: 'Juliana Prado', valor: 'R$ 14.300,00', status: 'Cancelado', statusType: 'error' },
                        { os: 'OS-4510', desc: 'Teste hidrostático vasos', resp: 'Marcos Souza', valor: 'R$ 6.100,00', status: 'Em Análise', statusType: 'info' },
                      ].map((row, i) => (
                        <tr key={i} className={cn(
                          "transition-colors hover:bg-muted/30 border-b border-border/20",
                          i % 2 === 1 ? "bg-surface-container-low/60" : "bg-transparent"
                        )}>
                          <td className="px-4 py-2.5 font-mono text-xs font-semibold text-secondary">{row.os}</td>
                          <td className="px-4 py-2.5 font-medium text-foreground">{row.desc}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{row.resp}</td>
                          <td className="px-4 py-2.5 text-right font-mono font-semibold text-foreground">{row.valor}</td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              row.statusType === 'success' && 'bg-status-success/10 text-status-success',
                              row.statusType === 'warning' && 'bg-status-warning/10 text-status-warning',
                              row.statusType === 'error' && 'bg-status-error/10 text-status-error',
                              row.statusType === 'info' && 'bg-status-info/10 text-status-info',
                              row.statusType === 'pending' && 'bg-status-pending/10 text-status-pending',
                            )}>
                              {row.statusType === 'success' && <CheckCircle2 size={11} />}
                              {row.statusType === 'warning' && <AlertTriangle size={11} />}
                              {row.statusType === 'error' && <XCircle size={11} />}
                              {row.statusType === 'info' && <Info size={11} />}
                              {row.statusType === 'pending' && <Clock size={11} />}
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={cn(TABLE_FOOTER, "border-t border-border/40 font-bold")}>
                        <td className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Total</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">10 registros</td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3 text-right font-mono text-foreground">R$ 199.550,00</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-[10px]">
                            <span className="text-status-success font-bold">3 ✓</span>
                            <span className="text-status-warning font-bold">2 !</span>
                            <span className="text-status-error font-bold">2 ✗</span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </FieldGroup>
          )}

        </motion.div>
      </div>
    </>
  );
}
