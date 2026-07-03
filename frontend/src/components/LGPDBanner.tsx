import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cookie } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';

export function LGPDBanner() {
  const { locale } = useApp();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ delay: 1, type: 'spring', damping: 20 }}
      className="fixed bottom-6 right-6 z-50 max-w-sm"
    >
      <div className="bg-background rounded-2xl shadow-ambient-lg p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-xl bg-secondary/10">
            <Cookie size={18} className="text-secondary" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground flex items-center gap-1.5">
              <Shield size={14} /> Privacy & Compliance
            </h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {t('lgpd.message', locale)}
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 text-xs font-medium rounded-xl bg-surface-container-low text-foreground hover:bg-surface-container transition-colors">
            {t('lgpd.preferences', locale)}
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-4 py-2 text-xs font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t('lgpd.accept', locale)}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
