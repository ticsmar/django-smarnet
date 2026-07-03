import type { Menu, Noticia, GrupoNoticias } from '@/types/portal';

const now = new Date();
const iso = (offsetDays: number) =>
  new Date(now.getTime() + offsetDays * 86_400_000).toISOString();

export const mockGrupos: GrupoNoticias[] = [
  { id: 'g1', nome: 'Comunicados Oficiais', descricao: 'Avisos da diretoria', ativo: true },
  { id: 'g2', nome: 'Obras e Infraestrutura', descricao: 'Status de obras', ativo: true },
  { id: 'g3', nome: 'Sustentabilidade', descricao: 'Iniciativas verdes', ativo: true },
];

export const mockMenus: Menu[] = [
  // Raízes
  { id: 'm-portal',    label: 'O PORTAL',           slug: 'o-portal',           ordem: 1, ativo: true, tipo: 'vazio' },
  { id: 'm-smar',      label: 'A SMAR',             slug: 'a-smar',             ordem: 2, ativo: true, tipo: 'vazio' },
  { id: 'm-qual',      label: 'QUALIDADE',          slug: 'qualidade',          ordem: 3, ativo: true, tipo: 'vazio' },
  { id: 'm-rh',        label: 'RECURSOS HUMANOS',   slug: 'recursos-humanos',   ordem: 4, ativo: true, tipo: 'vazio' },
  { id: 'm-contas',    label: 'PRESTAÇÃO DE CONTAS',slug: 'prestacao-de-contas',ordem: 5, ativo: true, tipo: 'vazio' },
  { id: 'm-saiba',     label: 'SAIBA MAIS',         slug: 'saiba-mais',         ordem: 6, ativo: true, tipo: 'vazio' },
  { id: 'm-gov',       label: 'GOVERNANÇA',         slug: 'governanca',         ordem: 7, ativo: true, tipo: 'vazio' },

  // QUALIDADE
  { id: 'm-qual-1', label: 'Índices',                       slug: 'indices',                       ordem: 1, ativo: true, tipo: 'vazio', menuPaiId: 'm-qual' },
  { id: 'm-qual-2', label: 'Treinamento Qualidade',         slug: 'treinamento-qualidade',         ordem: 2, ativo: true, tipo: 'vazio', menuPaiId: 'm-qual' },
  { id: 'm-qual-3', label: 'Tratamento de não Conformidade',slug: 'tratamento-nao-conformidade',   ordem: 3, ativo: true, tipo: 'vazio', menuPaiId: 'm-qual' },

  // RECURSOS HUMANOS
  { id: 'm-rh-1', label: 'Moderador',       slug: 'moderador',       ordem: 1, ativo: true, tipo: 'vazio', menuPaiId: 'm-rh' },
  { id: 'm-rh-2', label: 'Treinamento',     slug: 'treinamento-rh',  ordem: 2, ativo: true, tipo: 'vazio', menuPaiId: 'm-rh' },
  { id: 'm-rh-3', label: 'Políticas de RH', slug: 'politicas-rh',    ordem: 3, ativo: true, tipo: 'vazio', menuPaiId: 'm-rh' },
  { id: 'm-rh-4', label: 'Procedimentos',   slug: 'procedimentos-rh',ordem: 4, ativo: true, tipo: 'vazio', menuPaiId: 'm-rh' },
  { id: 'm-rh-5', label: 'CIPA',            slug: 'cipa',            ordem: 5, ativo: true, tipo: 'vazio', menuPaiId: 'm-rh' },

  // PRESTAÇÃO DE CONTAS
  { id: 'm-contas-1', label: 'Mensagem da Gestão',         slug: 'mensagem-da-gestao',         ordem: 1, ativo: true, tipo: 'vazio', menuPaiId: 'm-contas' },
  { id: 'm-contas-2', label: 'Reunião Semanal de Gestão',  slug: 'reuniao-semanal-de-gestao',  ordem: 2, ativo: true, tipo: 'vazio', menuPaiId: 'm-contas' },

  // SAIBA MAIS
  { id: 'm-saiba-1', label: 'Boas Vindas',            slug: 'boas-vindas',            ordem: 1, ativo: true, tipo: 'vazio', menuPaiId: 'm-saiba' },
  { id: 'm-saiba-2', label: 'FAQ',                    slug: 'faq',                    ordem: 2, ativo: true, tipo: 'vazio', menuPaiId: 'm-saiba' },
  { id: 'm-saiba-3', label: 'Aconteceu',              slug: 'aconteceu',              ordem: 3, ativo: true, tipo: 'vazio', menuPaiId: 'm-saiba' },
  { id: 'm-saiba-4', label: 'Eventos',                slug: 'eventos',                ordem: 4, ativo: true, tipo: 'vazio', menuPaiId: 'm-saiba' },
  { id: 'm-saiba-5', label: 'Comentários / Sugestões',slug: 'comentarios-sugestoes',  ordem: 5, ativo: true, tipo: 'vazio', menuPaiId: 'm-saiba' },
  { id: 'm-saiba-6', label: 'Acesso a internet',      slug: 'acesso-internet',        ordem: 6, ativo: true, tipo: 'vazio', menuPaiId: 'm-saiba' },

  // GOVERNANÇA
  { id: 'm-gov-1', label: 'Canal de Soluções',         slug: 'canal-de-solucoes',         ordem: 1, ativo: true, tipo: 'vazio', menuPaiId: 'm-gov' },
  { id: 'm-gov-2', label: 'Código de Ética e Conduta', slug: 'codigo-de-etica-e-conduta', ordem: 2, ativo: true, tipo: 'vazio', menuPaiId: 'm-gov' },
  { id: 'm-gov-3', label: 'Company Profile',           slug: 'company-profile',           ordem: 3, ativo: true, tipo: 'vazio', menuPaiId: 'm-gov' },
  { id: 'm-gov-4', label: 'ESG',                       slug: 'esg',                       ordem: 4, ativo: true, tipo: 'vazio', menuPaiId: 'm-gov' },
  { id: 'm-gov-5', label: 'Programa de Integridade',   slug: 'programa-de-integridade',   ordem: 5, ativo: true, tipo: 'vazio', menuPaiId: 'm-gov' },
];

const img = (id: number) =>
  `https://images.unsplash.com/photo-${[
    '1473341304170-971dccb5ac1e',
    '1581094794329-c8112a89af12',
    '1503387762-592deb58ef4e',
    '1518770660439-4636190af475',
    '1493238792000-8113da705763',
    '1466611653911-95081537e5b7',
    '1581092580497-e0d23cbdf1dc',
    '1497435334941-8c899ee9e8e9',
  ][id % 8]}?auto=format&fit=crop&w=1600&q=80`;

const corpoLongo = `
<p>A Nova Smar S/A reafirma seu compromisso com a <strong>transparência</strong> e a
prestação de contas à comunidade, divulgando neste portal as principais ações,
investimentos e resultados operacionais da companhia.</p>
<h2>Principais entregas</h2>
<ul>
  <li>Expansão da rede com 12 km de novas tubulações</li>
  <li>Modernização de 3 estações de tratamento</li>
  <li>Programa de eficiência energética</li>
</ul>
<blockquote>Trabalhamos diariamente para entregar um serviço de excelência.</blockquote>
<p>Saiba mais nas próximas publicações.</p>
`;

export const mockNoticias: Noticia[] = [
  {
    id: 'n1', slug: 'inauguracao-eta-norte',
    manchete: 'Inauguração da nova ETA Norte amplia capacidade em 40%',
    resumo: 'A nova Estação de Tratamento de Água amplia o atendimento a 180 mil pessoas e moderniza a operação.',
    corpo: corpoLongo, imagem: img(0), imagemAlt: 'Estação de tratamento de água',
    categoria: 'Obras', destaque: true,
    autorNome: 'Mariana Costa', autorCargo: 'Diretora de Operações',
    status: 'publicada', dataPublicacao: iso(-1), dataExpiracao: null, naoExpira: true,
    publicadoEm: iso(-1), criadoEm: iso(-2), atualizadoEm: iso(-1), grupoId: 'g2', menuId: 'm3',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'n2', slug: 'plano-sustentabilidade-2026',
    manchete: 'Plano de Sustentabilidade 2026 reduzirá emissões em 30%',
    resumo: 'Iniciativas integradas vão modernizar a frota, otimizar consumo energético e ampliar a coleta seletiva.',
    corpo: corpoLongo, imagem: img(1), imagemAlt: 'Painéis solares',
    categoria: 'Sustentabilidade', destaque: true,
    autorNome: 'Ricardo Lemos', autorCargo: 'Gerente ESG',
    status: 'publicada', dataPublicacao: iso(-2), dataExpiracao: iso(120), naoExpira: false,
    publicadoEm: iso(-2), criadoEm: iso(-3), atualizadoEm: iso(-2), grupoId: 'g3', menuId: 'm4',
  },
  {
    id: 'n3', slug: 'comunicado-tarifa',
    manchete: 'Comunicado oficial sobre o reajuste tarifário 2026',
    resumo: 'A diretoria informa os parâmetros e a metodologia do reajuste autorizado pela agência reguladora.',
    corpo: corpoLongo, imagem: img(2), imagemAlt: 'Sala de reunião',
    categoria: 'Comunicados', destaque: true,
    autorNome: 'Diretoria Executiva', autorCargo: 'Nova Smar S/A',
    status: 'publicada', dataPublicacao: iso(-3), dataExpiracao: iso(5), naoExpira: false,
    publicadoEm: iso(-3), criadoEm: iso(-4), atualizadoEm: iso(-3), grupoId: 'g1', menuId: 'm2',
  },
  {
    id: 'n4', slug: 'campanha-uso-consciente',
    manchete: 'Campanha “Uso Consciente” chega às escolas municipais',
    resumo: 'Ação educativa atinge mais de 12 mil estudantes em 40 escolas com oficinas e materiais didáticos.',
    corpo: corpoLongo, imagem: img(3), imagemAlt: 'Alunos em sala',
    categoria: 'Eventos', destaque: false,
    autorNome: 'Júlia Andrade', autorCargo: 'Coordenadora de Comunicação',
    status: 'publicada', dataPublicacao: iso(-4), dataExpiracao: iso(60), naoExpira: false,
    publicadoEm: iso(-4), criadoEm: iso(-5), atualizadoEm: iso(-4), grupoId: 'g3',
    videoUrl: 'https://vimeo.com/76979871',
  },
  {
    id: 'n5', slug: 'concurso-publico',
    manchete: 'Concurso público abre 85 vagas para áreas técnicas',
    resumo: 'Inscrições abertas até 30/06 para níveis técnico e superior em diversas regiões de atuação.',
    corpo: corpoLongo, imagem: img(4), imagemAlt: 'Pessoas estudando',
    categoria: 'RH', destaque: false,
    autorNome: 'RH Nova Smar', autorCargo: 'Departamento de Pessoal',
    status: 'publicada', dataPublicacao: iso(-5), dataExpiracao: iso(45), naoExpira: false,
    publicadoEm: iso(-5), criadoEm: iso(-6), atualizadoEm: iso(-5), grupoId: 'g1',
  },
  {
    id: 'n6', slug: 'obras-zona-sul',
    manchete: 'Obras na Zona Sul entram em fase final',
    resumo: 'Cronograma prevê conclusão em 60 dias com nova adutora e bombas de alta eficiência.',
    corpo: corpoLongo, imagem: img(5), imagemAlt: 'Obra de adutora',
    categoria: 'Obras', destaque: false,
    autorNome: 'Eng. Paulo Reis', autorCargo: 'Gerente de Obras',
    status: 'publicada', dataPublicacao: iso(-6), dataExpiracao: iso(30), naoExpira: false,
    publicadoEm: iso(-6), criadoEm: iso(-7), atualizadoEm: iso(-6), grupoId: 'g2',
  },
  {
    id: 'n7', slug: 'seguranca-do-trabalho',
    manchete: 'SIPAT 2026 reforça cultura de segurança nas operações',
    resumo: 'Semana interna de prevenção contou com palestras, dinâmicas e treinamentos práticos.',
    corpo: corpoLongo, imagem: img(6), imagemAlt: 'Equipe de segurança',
    categoria: 'Segurança', destaque: false,
    autorNome: 'SESMT', autorCargo: 'Segurança do Trabalho',
    status: 'publicada', dataPublicacao: iso(-7), dataExpiracao: null, naoExpira: true,
    publicadoEm: iso(-7), criadoEm: iso(-8), atualizadoEm: iso(-7),
  },
  {
    id: 'n8', slug: 'relatorio-anual',
    manchete: 'Relatório Anual 2025 já está disponível',
    resumo: 'Documento detalha resultados financeiros, operacionais e socioambientais do exercício.',
    corpo: corpoLongo, imagem: img(7), imagemAlt: 'Capa de relatório',
    categoria: 'Institucional', destaque: false,
    autorNome: 'Diretoria Financeira', autorCargo: 'Nova Smar S/A',
    status: 'publicada', dataPublicacao: iso(-8), dataExpiracao: null, naoExpira: true,
    publicadoEm: iso(-8), criadoEm: iso(-9), atualizadoEm: iso(-8),
  },
];
