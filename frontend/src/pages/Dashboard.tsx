import { motion } from 'framer-motion';
import {
  DollarSign, CheckSquare, AlertTriangle, Activity,
  TrendingUp, Minus, AlertCircle, CheckCircle,
  MoreVertical, Shield
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

import warehouseImage from '@/assets/warehouse-industrial.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const kpis = [
  { key: 'revenue', value: 'R$ 142.850', icon: DollarSign, trend: '+12.4%', trendIcon: TrendingUp, trendColor: 'text-status-success' },
  { key: 'orders', value: '312', icon: CheckSquare, trend: 'Estável →', trendIcon: Minus, trendColor: 'text-muted-foreground' },
  { key: 'stock', value: '14 itens', icon: AlertTriangle, trend: 'Ação !', trendIcon: AlertCircle, trendColor: 'text-status-warning' },
  { key: 'uptime', value: '99.98%', icon: Activity, trend: 'Operacional ✓', trendIcon: CheckCircle, trendColor: 'text-status-operational' },
];

const flowItems = [
  { code: 'PO', title: 'Pedido de Compra #88421', sub: 'Fornecedor: Metalúrgica Gerdau S.A.', label: 'DATA LIMITE', data: '24 Out 2023', status: 'Aguardando Cotação', statusColor: 'bg-status-pending/10 text-status-pending' },
  { code: 'NF', title: 'Faturamento Lote Industrial B-12', sub: 'Cliente: Construtora Moura Dubeux', label: 'VALOR', data: 'R$ 45.200,00', status: 'Processado', statusColor: 'bg-status-success/10 text-status-success' },
  { code: 'OP', title: 'Ordem de Produção Ativa', sub: 'Linha de Montagem: Setor Norte', label: 'EFICIÊNCIA', data: '94.5%', status: 'Em Produção', statusColor: 'bg-secondary/10 text-secondary' },
];

export default function Dashboard() {
  const { locale, user } = useApp();

  return (
    <>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
        <div>
          <p className="text-sm text-muted-foreground">{t('dashboard.welcome', locale)} <span className="text-secondary font-medium">{user?.name}</span></p>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mt-1">{t('dashboard.title', locale)}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.subtitle', locale)}</p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <button className="px-5 py-2.5 rounded-xl bg-surface-container text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
            ↓ {t('dashboard.export', locale)}
          </button>
          <button className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            {t('dashboard.new', locale)}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <motion.div initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(({ key, value, icon: Icon, trend, trendColor }, i) => (
          <motion.div key={key} custom={i} variants={fadeUp} className="bg-background rounded-2xl p-6 shadow-ambient">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-surface-container-low">
                <Icon size={20} className="text-muted-foreground" />
              </div>
              <span className={`text-xs font-semibold ${trendColor} px-2 py-1 rounded-lg bg-surface-container-low`}>{trend}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t(`dashboard.${key}`, locale)}</p>
            <p className="text-2xl font-display font-bold text-foreground mt-1">{value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background rounded-2xl p-6 shadow-ambient">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">{t('dashboard.flow', locale)}</h2>
              <p className="text-sm text-muted-foreground">Status dos processos em andamento</p>
            </div>
            <div className="flex rounded-xl bg-surface-container-low p-1">
              <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-background text-foreground shadow-sm">{t('dashboard.flow.all', locale)}</button>
              <button className="px-4 py-1.5 text-sm text-muted-foreground">{t('dashboard.flow.urgent', locale)}</button>
            </div>
          </div>
          <div className="space-y-4">
            {flowItems.map((item, i) => (
              <motion.div key={i} initial="hidden" animate="visible" custom={i + 4} variants={fadeUp}
                className="relative bg-surface-container-low rounded-2xl p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center gap-4">
                <div className="status-beacon bg-tertiary" />
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                    {item.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display font-bold text-foreground text-sm truncate">{item.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{item.sub}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 xl:gap-4 xl:justify-end">
                  <div className="text-left xl:text-center shrink-0">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.data}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${item.statusColor} shrink-0 whitespace-nowrap`}>{item.status}</span>
                  <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm text-muted-foreground font-medium hover:text-foreground transition-colors rounded-xl bg-surface-container-low hover:bg-surface-container">
            {t('dashboard.history', locale)}
          </button>
        </div>

        <div className="space-y-6">
          <motion.div initial="hidden" animate="visible" custom={8} variants={fadeUp}
            className="gradient-primary rounded-2xl p-6 text-primary-foreground">
            <div className="p-2.5 rounded-xl bg-primary-foreground/10 inline-block mb-4">
              <Shield size={22} />
            </div>
            <h3 className="text-lg font-display font-bold">{t('dashboard.security', locale)}</h3>
            <p className="mt-2 text-primary-foreground/70 text-sm leading-relaxed">{t('dashboard.security.desc', locale)}</p>
            <button className="mt-5 px-5 py-2.5 rounded-xl bg-primary-foreground/10 text-sm font-semibold hover:bg-primary-foreground/20 transition-colors">
              {t('dashboard.security.cta', locale)}
            </button>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={9} variants={fadeUp} className="rounded-2xl overflow-hidden relative">
            <img src={warehouseImage} alt="Warehouse" className="w-full h-48 object-cover" loading="lazy" width={1024} height={768} />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
              <p className="text-sm font-display font-bold text-background">Ocupação do Almoxarifado</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
