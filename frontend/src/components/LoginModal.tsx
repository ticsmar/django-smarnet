import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, User, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { login } from '@/api/auth';
import { ApiError } from '@/api/client';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForgot: () => void;
  onRequestAccess: () => void;
}

export function LoginModal({ isOpen, onClose, onForgot, onRequestAccess }: LoginModalProps) {
  const navigate = useNavigate();
  const { locale, setUser } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const user = await login({ username, password });
      setUser(user);
      onClose();
      navigate(user.must_change_password ? '/change-password' : '/app');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? 'Usuário ou senha inválidos.' : err.message);
      } else {
        setError('Falha ao entrar. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-background rounded-2xl shadow-ambient-lg p-8 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:bg-surface-container-low transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground">{t('login.title', locale)}</h2>
              <p className="text-muted-foreground mt-1 text-sm">{t('login.subtitle', locale)}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t('login.username', locale)}</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                    placeholder="usuario"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t('login.password', locale)}</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 gradient-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {submitting ? 'Entrando...' : t('login.submit', locale)}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm">
              <button onClick={onForgot} className="text-secondary hover:underline">
                {t('login.forgot', locale)}
              </button>
              <button onClick={onRequestAccess} className="text-secondary hover:underline flex items-center gap-1">
                <UserPlus size={14} />
                {t('login.request', locale)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
