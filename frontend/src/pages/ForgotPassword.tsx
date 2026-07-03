import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { Input } from '@/components/ui/input';

export default function ForgotPassword() {
  const { locale } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-background rounded-2xl shadow-ambient-lg p-8">
        <h2 className="text-2xl font-display font-bold text-foreground">{t('forgot.title', locale)}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t('forgot.subtitle', locale)}</p>

        {sent ? (
          <div className="mt-6 p-4 rounded-xl bg-status-success/10 text-status-success text-sm font-medium">
            {t('forgot.success', locale)}
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="pl-10"
                placeholder="nome@smar.com.br" />
            </div>
            <button type="submit" className="w-full py-3 gradient-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
              {t('forgot.submit', locale)}
            </button>
          </form>
        )}

        <a href="/" className="mt-6 flex items-center gap-2 text-sm text-secondary hover:underline">
          <ArrowLeft size={14} /> {t('forgot.back', locale)}
        </a>
      </motion.div>
    </div>
  );
}
