import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Plus, Trash2, Home, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const tabs = [
  { key: 'resumo', label: 'Resumo' },
  { key: 'itens', label: 'Itens' },
  { key: 'pagamento', label: 'Pagamento' },
  { key: 'prazo', label: 'Prazo de Entrega' },
  { key: 'frete', label: 'Frete / Embarque' },
  { key: 'observacoes', label: 'Observações' },
];

function Field({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: number }) {
  return (
    <div className={span === 2 ? 'sm:col-span-2' : span === 3 ? 'sm:col-span-3' : ''}>
      <Label className="text-xs mb-1.5">{label}</Label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-display font-bold text-foreground mb-4 pb-2" style={{ borderBottom: '1px solid hsl(var(--border) / 0.3)' }}>{children}</h3>;
}

const mockItems = [
  { id: 1, codigo: 'EQP-001', descricao: 'Sensor de Pressão XK-200', qtd: 10, unidade: 'UN', unitario: 1250.00, ipi: 5, icms: 12, total: 12500.00 },
  { id: 2, codigo: 'EQP-002', descricao: 'Válvula Pneumática VP-100', qtd: 5, unidade: 'UN', unitario: 3400.00, ipi: 5, icms: 12, total: 17000.00 },
  { id: 3, codigo: 'EQP-003', descricao: 'Controlador PLC-400', qtd: 2, unidade: 'UN', unitario: 8900.00, ipi: 10, icms: 18, total: 17800.00 },
];

function TabResumo() {
  return (
    <div className="space-y-6">
      <SectionTitle>Dados do Pedido</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Nº Pedido"><Input defaultValue="PED-88425" /></Field>
        <Field label="Data Emissão"><Input type="date" defaultValue="2023-10-28" /></Field>
        <Field label="Status">
          <Select defaultValue="elaboracao">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="elaboracao">Em Elaboração</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="faturado">Faturado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Origem">
          <Select defaultValue="nacional">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nacional">Nacional</SelectItem>
              <SelectItem value="importacao">Importação</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <SectionTitle>Cliente</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Cliente" span={2}>
          <div className="flex gap-2">
            <Input defaultValue="USINA ACUCAREIRA FURLAN S/A" className="flex-1" />
            <button className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-muted-foreground"><Search size={16} /></button>
          </div>
        </Field>
        <Field label="CNPJ"><Input defaultValue="56.723.257/0001-26" /></Field>
        <Field label="Cidade/UF/País"><Input defaultValue="Santa Barbar D Oeste / SP / BRA" /></Field>
        <Field label="I.E."><Input defaultValue="606039671117" /></Field>
        <Field label="Vendedor">
          <Select defaultValue="carlos">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="carlos">Carlos Silva</SelectItem>
              <SelectItem value="maria">Maria Santos</SelectItem>
              <SelectItem value="pedro">Pedro Costa</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <SectionTitle>Contatos</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Contato Comercial"><Input defaultValue="Sr. Genivaldo A. Furlan" /></Field>
        <Field label="E-mail"><Input defaultValue="genivaldo@usinafurlan.com.br" /></Field>
        <Field label="Telefone"><Input defaultValue="(19) 3026-4600" /></Field>
      </div>

      <SectionTitle>Resumo Financeiro</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Equipamentos', value: 'R$ 47.300,00' },
          { label: 'Total Serviços', value: 'R$ 0,00' },
          { label: 'Frete', value: 'R$ 850,00' },
          { label: 'Base ICMS', value: 'R$ 47.300,00' },
          { label: 'Total IPI', value: 'R$ 3.150,00' },
          { label: 'Total Pedido', value: 'R$ 51.300,00' },
        ].map(item => (
          <div key={item.label} className="bg-surface-container-low rounded-xl p-3 text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
            <p className="text-sm font-display font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabItens() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionTitle>Itens do Pedido</SectionTitle>
        <button className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={14} /> Adicionar Item
        </button>
      </div>

      <div className="bg-background rounded-2xl shadow-ambient overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['#', 'Código', 'Descrição', 'Qtd', 'Un', 'V. Unitário', 'IPI %', 'ICMS %', 'Total'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">{h}</th>
                ))}
                <th className="px-4 py-3 bg-surface-container-low"></th>
              </tr>
            </thead>
            <tbody>
              {mockItems.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-secondary">{item.codigo}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{item.descricao}</td>
                  <td className="px-4 py-3"><Input type="number" defaultValue={item.qtd} className="w-16 text-center h-8" /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.unidade}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{item.unitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.ipi}%</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.icms}%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-surface-container-low text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-container-low">
                <td colSpan={8} className="px-4 py-3 text-sm font-bold text-foreground text-right">Total Geral:</td>
                <td className="px-4 py-3 text-sm font-display font-bold text-secondary">R$ 47.300,00</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabPagamento() {
  return (
    <div className="space-y-6">
      <SectionTitle>Condições de Pagamento</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Forma de Pagamento">
          <Select defaultValue="boleto">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="boleto">Boleto Bancário</SelectItem>
              <SelectItem value="transferencia">Transferência</SelectItem>
              <SelectItem value="cartao">Cartão</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
              <SelectItem value="financiamento">Financiamento</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Condição">
          <Select defaultValue="306090">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="306090">30/60/90 DDL</SelectItem>
              <SelectItem value="28">28 DDL</SelectItem>
              <SelectItem value="30">30 DDL</SelectItem>
              <SelectItem value="45">45 DDL</SelectItem>
              <SelectItem value="avista">À Vista</SelectItem>
              <SelectItem value="3060">30/60 DDL</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Moeda">
          <Select defaultValue="brl">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="brl">BRL - Real</SelectItem>
              <SelectItem value="usd">USD - Dólar</SelectItem>
              <SelectItem value="eur">EUR - Euro</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <SectionTitle>Parcelas</SectionTitle>
      <div className="bg-background rounded-2xl shadow-ambient overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['Parcela', 'Vencimento', 'Valor', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { parcela: '1/3', venc: '28/11/2023', valor: 'R$ 17.100,00', status: 'Pendente' },
              { parcela: '2/3', venc: '28/12/2023', valor: 'R$ 17.100,00', status: 'Pendente' },
              { parcela: '3/3', venc: '28/01/2024', valor: 'R$ 17.100,00', status: 'Pendente' },
            ].map((p, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{p.parcela}</td>
                <td className="px-4 py-3 text-sm text-foreground">{p.venc}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">{p.valor}</td>
                <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-status-pending/10 text-status-pending">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>Dados Bancários</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Banco">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bb">Banco do Brasil</SelectItem>
              <SelectItem value="itau">Itaú</SelectItem>
              <SelectItem value="bradesco">Bradesco</SelectItem>
              <SelectItem value="santander">Santander</SelectItem>
              <SelectItem value="caixa">Caixa</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Agência"><Input placeholder="0000-0" /></Field>
        <Field label="Conta"><Input placeholder="00000-0" /></Field>
        <Field label="PIX"><Input placeholder="Chave PIX" /></Field>
      </div>
    </div>
  );
}

function TabPrazo() {
  return (
    <div className="space-y-6">
      <SectionTitle>Prazos de Entrega</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Prazo de Entrega (dias)"><Input type="number" defaultValue="45" /></Field>
        <Field label="Data Prevista"><Input type="date" defaultValue="2023-12-12" /></Field>
        <Field label="Prioridade">
          <Select defaultValue="normal">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
              <SelectItem value="programada">Programada</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <SectionTitle>Entregas Parciais</SectionTitle>
      <div className="bg-background rounded-2xl shadow-ambient overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['Lote', 'Itens', 'Data Prevista', 'Data Entrega', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { lote: '1/2', itens: 'Sensor XK-200 (10 un)', prev: '15/11/2023', entrega: '-', status: 'Aguardando' },
              { lote: '2/2', itens: 'Válvula VP-100 (5 un), PLC-400 (2 un)', prev: '12/12/2023', entrega: '-', status: 'Aguardando' },
            ].map((l, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-surface-container-low/50'}>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{l.lote}</td>
                <td className="px-4 py-3 text-sm text-foreground">{l.itens}</td>
                <td className="px-4 py-3 text-sm text-foreground">{l.prev}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{l.entrega}</td>
                <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-status-pending/10 text-status-pending">{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Observações sobre Prazo" span={2}>
          <Textarea placeholder="Observações sobre condições de prazo..." className="resize-none" rows={3} />
        </Field>
      </div>
    </div>
  );
}

function TabFrete() {
  return (
    <div className="space-y-6">
      <SectionTitle>Dados de Frete e Embarque</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Tipo de Frete">
          <Select defaultValue="fot">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fob">FOB - Por conta do comprador</SelectItem>
              <SelectItem value="cif">CIF - Por conta do vendedor</SelectItem>
              <SelectItem value="fot">FOT - Fábrica</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Transportadora"><Input defaultValue="Transportes Rápidos Ltda" /></Field>
        <Field label="Valor do Frete"><Input defaultValue="R$ 850,00" /></Field>
        <Field label="Seguro"><Input defaultValue="R$ 0,00" /></Field>
        <Field label="Peso Bruto (kg)"><Input type="number" defaultValue="320" /></Field>
        <Field label="Volume"><Input type="number" defaultValue="8" /></Field>
      </div>

      <SectionTitle>Endereço de Entrega</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Endereço" span={2}><Input defaultValue="Rod. SP-304 Km 143,5 - CX.P. 127/128" /></Field>
        <Field label="CEP"><Input defaultValue="13450-000" /></Field>
        <Field label="Cidade"><Input defaultValue="Santa Bárbara d'Oeste" /></Field>
        <Field label="UF">
          <Select defaultValue="sp">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {['SP', 'RJ', 'MG', 'RS', 'PR', 'SC'].map(uf => (
                <SelectItem key={uf} value={uf.toLowerCase()}>{uf}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="País"><Input defaultValue="Brasil" /></Field>
      </div>
    </div>
  );
}

function TabObservacoes() {
  return (
    <div className="space-y-6">
      <SectionTitle>Observações Gerais</SectionTitle>
      <Field label="Observações do Pedido" span={2}>
        <Textarea rows={5} placeholder="Observações gerais do pedido..." className="resize-none" />
      </Field>

      <SectionTitle>Observações Internas</SectionTitle>
      <Field label="Notas internas (não visíveis ao cliente)" span={2}>
        <Textarea rows={4} placeholder="Notas internas..." className="resize-none" />
      </Field>

      <SectionTitle>Termos e Condições</SectionTitle>
      <Field label="Condições Contratuais" span={2}>
        <Textarea rows={4} defaultValue="Validade da proposta: 15 dias. Garantia conforme especificação técnica do fabricante. Entrega sujeita à confirmação de estoque." className="resize-none" />
      </Field>
    </div>
  );
}

const tabComponents: Record<string, () => JSX.Element> = {
  resumo: TabResumo,
  itens: TabItens,
  pagamento: TabPagamento,
  prazo: TabPrazo,
  frete: TabFrete,
  observacoes: TabObservacoes,
};

export default function PedidoForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('resumo');
  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6">
        <Link to="/app" className="text-muted-foreground hover:text-foreground transition-colors"><Home size={14} /></Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-muted-foreground">Comercial</span>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <Link to="/app/pedidos" className="text-muted-foreground hover:text-foreground transition-colors">Pedidos</Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-foreground font-medium">Novo Pedido</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Cadastro de Pedido — Novo</h1>
          <p className="text-sm text-muted-foreground mt-0.5">PED-88425 • <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-status-pending/10 text-status-pending">Em Elaboração</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/app/pedidos')} className="px-5 py-2.5 rounded-xl bg-background text-foreground text-sm font-semibold flex items-center gap-2 shadow-ambient hover:bg-surface-container-high transition-colors">
            <X size={16} /> Cancelar
          </button>
          <button className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={16} /> Salvar Pedido
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 bg-background rounded-2xl shadow-ambient p-1.5">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'gradient-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-low'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-background rounded-2xl shadow-ambient p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
