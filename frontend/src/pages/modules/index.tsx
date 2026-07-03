import ModulePage from '@/components/ModulePage';

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    'Ativo': 'bg-status-success/10 text-status-success',
    'Inativo': 'bg-muted text-muted-foreground',
    'Pendente': 'bg-status-pending/10 text-status-pending',
    'Concluído': 'bg-status-success/10 text-status-success',
    'Cancelado': 'bg-destructive/10 text-destructive',
    'Processando': 'bg-secondary/10 text-secondary',
    'Em Produção': 'bg-secondary/10 text-secondary',
    'Baixo': 'bg-status-warning/10 text-status-warning',
    'Normal': 'bg-status-success/10 text-status-success',
    'Crítico': 'bg-destructive/10 text-destructive',
  };
  return <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${colors[status] || 'bg-muted text-muted-foreground'}`}>{status}</span>;
};

const clientesData = Array.from({ length: 20 }, (_, i) => ({
  id: `CLI-${1000 + i}`,
  nome: ['Construtora Moura Dubeux', 'Metalúrgica Gerdau S.A.', 'Petrobras', 'Vale S.A.', 'WEG Motores'][i % 5],
  cnpj: `${12 + i}.345.678/0001-${90 + (i % 10)}`,
  cidade: ['São Paulo', 'Rio de Janeiro', 'Sertãozinho', 'Belo Horizonte', 'Curitiba'][i % 5],
  status: i % 4 === 0 ? 'Inativo' : 'Ativo',
}));

export function ClientesPage() {
  return <ModulePage title="Clientes" columns={[
    { key: 'id', label: 'Código' },
    { key: 'nome', label: 'Razão Social' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={clientesData} />;
}

const produtosData = Array.from({ length: 15 }, (_, i) => ({
  id: `PRD-${2000 + i}`,
  nome: ['Sensor XK-200', 'Válvula Pneumática VP-100', 'Controlador PLC-400', 'Transmissor TT-300', 'Atuador Elétrico AE-500'][i % 5],
  categoria: ['Sensores', 'Válvulas', 'Controladores', 'Transmissores', 'Atuadores'][i % 5],
  preco: `R$ ${(1200 + i * 350).toLocaleString('pt-BR')},00`,
  estoque: Math.floor(Math.random() * 200),
  status: i % 3 === 0 ? 'Inativo' : 'Ativo',
}));

export function ProdutosPage() {
  return <ModulePage title="Produtos" columns={[
    { key: 'id', label: 'SKU' },
    { key: 'nome', label: 'Produto' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'preco', label: 'Preço' },
    { key: 'estoque', label: 'Estoque' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={produtosData} />;
}

const pedidosData = Array.from({ length: 18 }, (_, i) => ({
  id: `PED-${88400 + i}`,
  cliente: ['Moura Dubeux', 'Gerdau S.A.', 'Petrobras', 'Vale S.A.', 'WEG'][i % 5],
  valor: `R$ ${(5000 + i * 2100).toLocaleString('pt-BR')},00`,
  data: `${(10 + i % 20).toString().padStart(2, '0')}/10/2023`,
  status: ['Pendente', 'Concluído', 'Processando', 'Cancelado'][i % 4],
}));

export function PedidosPage() {
  return <ModulePage title="Pedidos" columns={[
    { key: 'id', label: 'Nº Pedido' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'valor', label: 'Valor' },
    { key: 'data', label: 'Data' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={pedidosData} />;
}

const faturamentoData = Array.from({ length: 12 }, (_, i) => ({
  id: `NF-${30000 + i}`,
  cliente: ['Moura Dubeux', 'Gerdau S.A.', 'Petrobras'][i % 3],
  valor: `R$ ${(15000 + i * 5000).toLocaleString('pt-BR')},00`,
  emissao: `${(5 + i).toString().padStart(2, '0')}/10/2023`,
  status: ['Concluído', 'Processando', 'Pendente'][i % 3],
}));

export function FaturamentoPage() {
  return <ModulePage title="Faturamento" columns={[
    { key: 'id', label: 'Nota Fiscal' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'valor', label: 'Valor' },
    { key: 'emissao', label: 'Emissão' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={faturamentoData} />;
}

const estoqueData = Array.from({ length: 16 }, (_, i) => ({
  id: `EST-${4000 + i}`,
  produto: ['Sensor XK-200', 'Válvula VP-100', 'PLC-400', 'Transmissor TT-300', 'Atuador AE-500'][i % 5],
  local: ['Almoxarifado A', 'Almoxarifado B', 'Galpão 3'][i % 3],
  quantidade: Math.floor(Math.random() * 300),
  nivel: i % 4 === 0 ? 'Crítico' : i % 3 === 0 ? 'Baixo' : 'Normal',
}));

export function EstoquePage() {
  return <ModulePage title="Estoque" columns={[
    { key: 'id', label: 'Código' },
    { key: 'produto', label: 'Produto' },
    { key: 'local', label: 'Localização' },
    { key: 'quantidade', label: 'Qtd' },
    { key: 'nivel', label: 'Nível', render: (v: string) => statusBadge(v) },
  ]} data={estoqueData} />;
}

const usuariosData = Array.from({ length: 10 }, (_, i) => ({
  id: `USR-${100 + i}`,
  nome: ['Arthur Silva', 'Juliano Bonini', 'Maria Santos', 'Carlos Pereira', 'Ana Costa'][i % 5],
  email: `user${i}@smar.com.br`,
  perfil: i % 3 === 0 ? 'Admin' : 'Usuário',
  status: 'Ativo',
}));

export function UsuariosPage() {
  return <ModulePage title="Usuários" columns={[
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'perfil', label: 'Perfil' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={usuariosData} />;
}

const funcionariosData = Array.from({ length: 14 }, (_, i) => ({
  id: `FUN-${500 + i}`,
  nome: ['Pedro Almeida', 'Lucas Ferreira', 'Fernanda Lima', 'Rafael Souza', 'Camila Oliveira'][i % 5],
  cargo: ['Engenheiro', 'Técnico', 'Analista', 'Supervisor', 'Operador'][i % 5],
  depto: ['Produção', 'TI', 'Compras', 'RH', 'Financeiro'][i % 5],
  status: 'Ativo',
}));

export function FuncionariosPage() {
  return <ModulePage title="Funcionários" columns={[
    { key: 'id', label: 'Matrícula' },
    { key: 'nome', label: 'Nome' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'depto', label: 'Departamento' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={funcionariosData} />;
}

const fornecedoresData = Array.from({ length: 12 }, (_, i) => ({
  id: `FOR-${700 + i}`,
  nome: ['Aço Brasil', 'Elétrica Nacional', 'Plásticos SA', 'Hidráulica Sul', 'Metal Norte'][i % 5],
  cnpj: `${20 + i}.678.900/0001-${10 + i}`,
  cidade: ['São Paulo', 'Porto Alegre', 'Campinas', 'Joinville', 'Manaus'][i % 5],
  status: i % 5 === 0 ? 'Inativo' : 'Ativo',
}));

export function FornecedoresPage() {
  return <ModulePage title="Fornecedores" columns={[
    { key: 'id', label: 'Código' },
    { key: 'nome', label: 'Fornecedor' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'status', label: 'Status', render: (v: string) => statusBadge(v) },
  ]} data={fornecedoresData} />;
}
