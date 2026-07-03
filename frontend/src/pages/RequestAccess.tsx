import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building2, ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

export default function RequestAccess() {
  const { locale } = useApp();
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-background rounded-2xl shadow-ambient-lg p-8">
        <h2 className="text-2xl font-display font-bold text-foreground">{t('request.title', locale)}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t('request.subtitle', locale)}</p>

        {sent ? (
          <div className="mt-6 p-4 rounded-xl bg-status-success/10 text-status-success text-sm font-medium">
            {t('request.success', locale)}
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                placeholder={t('request.name', locale)} />
            </div>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                placeholder={t('request.email', locale)} />
            </div>
            <div className="relative">
              <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
                placeholder={t('request.company', locale)} />
            </div>
            <select className="w-full px-4 py-3 rounded-xl bg-surface-container-highest text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20">
              <option value="employee">{t('request.role.employee', locale)}</option>
              <option value="representative">{t('request.role.representative', locale)}</option>
            </select>
            <button type="submit" className="w-full py-3 gradient-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
              {t('request.submit', locale)}
            </button>
          </form>
        )}

        <a href="/" className="mt-6 flex items-center gap-2 text-sm text-secondary hover:underline">
          <ArrowLeft size={14} /> {t('request.back', locale)}
        </a>
      </motion.div>
    </div>
  );
}
