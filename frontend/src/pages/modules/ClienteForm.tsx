import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save, X, Building2, CreditCard, Users2, Truck,
  FileText, Phone, Mail, CheckSquare, Home, ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

type Tab = 'cadastrais' | 'financeiros' | 'contatos' | 'cobranca' | 'embarque' | 'observacao';

const tabs: { key: Tab; label: string; icon: typeof Building2 }[] = [
  { key: 'cadastrais', label: 'Dados Cadastrais', icon: Building2 },
  { key: 'financeiros', label: 'Dados Financeiros', icon: CreditCard },
  { key: 'contatos', label: 'Contatos', icon: Users2 },
  { key: 'cobranca', label: 'Cobrança', icon: FileText },
  { key: 'embarque', label: 'Embarque', icon: Truck },
  { key: 'observacao', label: 'Observação', icon: FileText },
];

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

function Field({ label, required, children, span }: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  span?: 2 | 3;
}) {
  return (
    <div className={span === 3 ? 'md:col-span-2 xl:col-span-3' : span === 2 ? 'md:col-span-2' : ''}>
      <Label className="text-xs mb-1.5">
        {label}
        {required && <span className="text-destructive ml-1">•</span>}
      </Label>
      {children}
    </div>
  );
}

export default function ClienteForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('cadastrais');
  const [isento, setIsento] = useState(false);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6">
        <Link to="/app" className="text-muted-foreground hover:text-foreground transition-colors"><Home size={14} /></Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-muted-foreground">Comercial</span>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <Link to="/app/clientes" className="text-muted-foreground hover:text-foreground transition-colors">Clientes</Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-foreground font-medium">Novo Cliente</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Cadastro de Cliente — Novo</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/app/clientes')}
            className="px-5 py-2.5 rounded-xl bg-surface-container text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors"
          >
            <X size={16} /> Cancelar
          </button>
          <button className="px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={16} /> Salvar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === key
                ? 'gradient-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-surface-container-low hover:text-foreground'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Form content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-background rounded-2xl shadow-ambient p-6 lg:p-8"
      >
        {activeTab === 'cadastrais' && <TabCadastrais isento={isento} setIsento={setIsento} />}
        {activeTab === 'financeiros' && <TabFinanceiros />}
        {activeTab === 'contatos' && <TabContatos />}
        {activeTab === 'cobranca' && <TabCobranca />}
        {activeTab === 'embarque' && <TabEmbarque />}
        {activeTab === 'observacao' && <TabObservacao />}
      </motion.div>
    </>
  );
}

/* ─── Tab: Dados Cadastrais ─── */
function TabCadastrais({ isento, setIsento }: { isento: boolean; setIsento: (v: boolean) => void }) {
  return (
    <>
      <FieldGroup title="Identificação">
        <Field label="Razão Social" required span={2}>
          <Input placeholder="Nome completo da empresa" />
        </Field>
        <Field label="Nome Reduzido" required>
          <Input placeholder="Nome fantasia" />
        </Field>
        <Field label="CNPJ" required>
          <Input placeholder="00.000.000/0000-00" />
        </Field>
        <Field label="Inscrição Estadual">
          <div className="flex items-center gap-3">
            <Input className="flex-1" placeholder="000.000.000.000" disabled={isento} />
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer whitespace-nowrap">
              <Checkbox checked={isento} onCheckedChange={(v) => setIsento(!!v)} />
              Isento
            </label>
          </div>
        </Field>
        <Field label="Inscrição Municipal">
          <Input placeholder="Número" />
        </Field>
        <Field label="Natureza" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="juridico">Jurídico</SelectItem>
              <SelectItem value="fisico">Físico</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Tipo do Cliente">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="cliente">Cliente</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="ex">Ex-Cliente</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Contribuinte">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nao">Não</SelectItem>
              <SelectItem value="sim">Sim</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Tipo Operação">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="consumidor">Consumidor Final</SelectItem>
              <SelectItem value="revenda">Revenda</SelectItem>
              <SelectItem value="industrializacao">Industrialização</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Cond. Pagamento">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="3060">30/60 dias</SelectItem>
              <SelectItem value="306090">30/60/90 dias</SelectItem>
              <SelectItem value="avista">À vista</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Modo de Pagamento">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="transferencia">Transferência Bancária</SelectItem>
              <SelectItem value="boleto">Boleto</SelectItem>
              <SelectItem value="cartao">Cartão</SelectItem>
              <SelectItem value="pix">PIX</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Status" required>
          <div className="flex gap-2">
            <span className="px-3 py-2 rounded-xl bg-status-success/10 text-status-success text-sm font-semibold flex items-center gap-2">
              <CheckSquare size={14} /> Sem restrições
            </span>
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup title="Endereço">
        <Field label="CEP" required>
          <Input placeholder="00000-000" />
        </Field>
        <Field label="Endereço" required span={2}>
          <Input placeholder="Rua, número" />
        </Field>
        <Field label="Complemento">
          <Input placeholder="Sala, andar..." />
        </Field>
        <Field label="Bairro" required>
          <Input placeholder="Bairro" />
        </Field>
        <Field label="País" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="brasil">BRASIL</SelectItem>
              <SelectItem value="argentina">ARGENTINA</SelectItem>
              <SelectItem value="eua">ESTADOS UNIDOS</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Estado" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sp">SÃO PAULO</SelectItem>
              <SelectItem value="rj">RIO DE JANEIRO</SelectItem>
              <SelectItem value="mg">MINAS GERAIS</SelectItem>
              <SelectItem value="pr">PARANÁ</SelectItem>
              <SelectItem value="rs">RIO GRANDE DO SUL</SelectItem>
              <SelectItem value="sc">SANTA CATARINA</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Cidade" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="araraquara">ARARAQUARA</SelectItem>
              <SelectItem value="saopaulo">SÃO PAULO</SelectItem>
              <SelectItem value="sertaozinho">SERTÃOZINHO</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <FieldGroup title="Outros Dados">
        <Field label="Telefone 1">
          <Input placeholder="(00) 0000-0000" />
        </Field>
        <Field label="Telefone 2">
          <Input placeholder="(00) 0000-0000" />
        </Field>
        <Field label="Fax">
          <Input placeholder="(00) 0000-0000" />
        </Field>
        <Field label="E-mail NFe">
          <Input type="email" placeholder="nfe@empresa.com.br" />
        </Field>
        <Field label="E-mail NFSe">
          <Input type="email" placeholder="nfse@empresa.com.br" />
        </Field>
        <Field label="Home Page">
          <Input placeholder="www.empresa.com.br" />
        </Field>
      </FieldGroup>

      <FieldGroup title="Características">
        <Field label="Origem" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nacional">NACIONAL</SelectItem>
              <SelectItem value="internacional">INTERNACIONAL</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Segmento" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fabricante">FABRICANTE DE EQUIPAMENTOS</SelectItem>
              <SelectItem value="distribuidor">DISTRIBUIDOR</SelectItem>
              <SelectItem value="integrador">INTEGRADOR</SelectItem>
              <SelectItem value="usuario">USUÁRIO FINAL</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Área Coord. Comercial" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="spn">São Paulo - Norte</SelectItem>
              <SelectItem value="sps">São Paulo - Sul</SelectItem>
              <SelectItem value="rj">Rio de Janeiro</SelectItem>
              <SelectItem value="mg">Minas Gerais</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Área Coord. Técnico" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="engenharia">ENGENHARIA DE APLICAÇÕES</SelectItem>
              <SelectItem value="suporte">SUPORTE TÉCNICO</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Transportadora">
          <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rapido">Transportes Rápido</SelectItem>
              <SelectItem value="express">Logística Express</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Vendedor Área" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="spo">SAO PAULO - OESTE</SelectItem>
              <SelectItem value="spl">SAO PAULO - LESTE</SelectItem>
              <SelectItem value="sul">SUL</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Vendedor" required>
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="paulo">Paulo Roberto Ribeiro</SelectItem>
              <SelectItem value="ana">Ana Carolina do Prado</SelectItem>
              <SelectItem value="douglas">Douglas Fabio</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Vendedor 2">
          <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="paulo">Paulo Roberto Ribeiro</SelectItem>
              <SelectItem value="ana">Ana Carolina do Prado</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    </>
  );
}

/* ─── Tab: Dados Financeiros ─── */
function TabFinanceiros() {
  return (
    <>
      <FieldGroup title="Dados Bancários">
        <Field label="Banco">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bb">Banco do Brasil</SelectItem>
              <SelectItem value="itau">Itaú</SelectItem>
              <SelectItem value="bradesco">Bradesco</SelectItem>
              <SelectItem value="santander">Santander</SelectItem>
              <SelectItem value="caixa">Caixa Econômica</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Agência">
          <Input placeholder="0000-0" />
        </Field>
        <Field label="Conta Corrente">
          <Input placeholder="00000-0" />
        </Field>
        <Field label="PIX">
          <Input placeholder="Chave PIX" />
        </Field>
      </FieldGroup>
      <FieldGroup title="Limites e Crédito">
        <Field label="Limite de Crédito">
          <Input placeholder="R$ 0,00" />
        </Field>
        <Field label="Saldo Devedor">
          <Input placeholder="R$ 0,00" readOnly className="bg-muted/30" />
        </Field>
        <Field label="Classificação de Risco">
          <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="a">A - Excelente</SelectItem>
              <SelectItem value="b">B - Bom</SelectItem>
              <SelectItem value="c">C - Regular</SelectItem>
              <SelectItem value="d">D - Ruim</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Prazo Médio (dias)">
          <Input type="number" placeholder="30" />
        </Field>
      </FieldGroup>
    </>
  );
}

/* ─── Tab: Contatos ─── */
function TabContatos() {
  const contatos = [
    { nome: 'Carlos Eduardo Silva', cargo: 'Diretor Comercial', tel: '(16) 3301-2200', email: 'carlos@empresa.com.br' },
    { nome: 'Maria Fernanda Costa', cargo: 'Compras', tel: '(16) 3301-2201', email: 'maria@empresa.com.br' },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-display font-bold text-foreground">Contatos Cadastrados</h3>
        <button className="px-4 py-2 rounded-xl bg-surface-container-low text-foreground text-sm font-medium hover:bg-surface-container transition-colors">
          + Adicionar Contato
        </button>
      </div>
      <div className="space-y-3">
        {contatos.map((c, i) => (
          <div key={i} className="bg-surface-container-low rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
              {c.nome.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-foreground text-sm">{c.nome}</p>
              <p className="text-xs text-muted-foreground">{c.cargo}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone size={12} /> {c.tel}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail size={12} /> {c.email}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Tab: Cobrança ─── */
function TabCobranca() {
  return (
    <FieldGroup title="Dados de Cobrança">
      <Field label="Endereço de Cobrança" span={2}>
        <Input placeholder="Endereço completo" />
      </Field>
      <Field label="CEP">
        <Input placeholder="00000-000" />
      </Field>
      <Field label="Cidade">
        <Input placeholder="Cidade" />
      </Field>
      <Field label="Estado">
        <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sp">SÃO PAULO</SelectItem>
            <SelectItem value="rj">RIO DE JANEIRO</SelectItem>
            <SelectItem value="mg">MINAS GERAIS</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Contato Cobrança">
        <Input placeholder="Nome do contato" />
      </Field>
      <Field label="Telefone">
        <Input placeholder="(00) 0000-0000" />
      </Field>
      <Field label="E-mail Cobrança">
        <Input type="email" placeholder="cobranca@empresa.com.br" />
      </Field>
    </FieldGroup>
  );
}

/* ─── Tab: Embarque ─── */
function TabEmbarque() {
  return (
    <FieldGroup title="Dados de Embarque">
      <Field label="Endereço de Entrega" span={2}>
        <Input placeholder="Endereço completo" />
      </Field>
      <Field label="CEP">
        <Input placeholder="00000-000" />
      </Field>
      <Field label="Cidade">
        <Input placeholder="Cidade" />
      </Field>
      <Field label="Estado">
        <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sp">SÃO PAULO</SelectItem>
            <SelectItem value="rj">RIO DE JANEIRO</SelectItem>
            <SelectItem value="mg">MINAS GERAIS</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Transportadora Padrão">
        <Select><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rapido">Transportes Rápido</SelectItem>
            <SelectItem value="express">Logística Express</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Tipo de Frete">
        <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="cif">CIF</SelectItem>
            <SelectItem value="fob">FOB</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Horário de Recebimento">
        <Input placeholder="08:00 às 17:00" />
      </Field>
      <Field label="Observações de Entrega" span={3}>
        <Textarea placeholder="Instruções especiais de entrega..." className="min-h-[80px] resize-y" />
      </Field>
    </FieldGroup>
  );
}

/* ─── Tab: Observação ─── */
function TabObservacao() {
  return (
    <FieldGroup title="Observações Gerais">
      <Field label="Observações internas" span={3}>
        <Textarea placeholder="Observações sobre o cliente..." className="min-h-[200px] resize-y" />
      </Field>
      <Field label="Observações para Nota Fiscal" span={3}>
        <Textarea placeholder="Texto que será impresso na NF..." className="min-h-[100px] resize-y" />
      </Field>
    </FieldGroup>
  );
}
