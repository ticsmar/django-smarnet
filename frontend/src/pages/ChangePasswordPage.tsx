import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { changePassword, getCurrentUser } from '@/api/auth';
import { ApiError } from '@/api/client';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, authLoading } = useApp();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user?.must_change_password) {
    return <Navigate to="/app" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await changePassword({ new_password: newPassword });
      const refreshed = await getCurrentUser();
      setUser(refreshed);
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Falha ao alterar a senha.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-background rounded-2xl shadow-ambient-lg p-8"
      >
        <h2 className="text-2xl font-display font-bold text-foreground">Defina uma nova senha</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Por segurança, você precisa alterar a senha temporária antes de continuar.
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Nova senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Confirmar senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-highest text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 gradient-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? 'Salvando...' : 'Salvar nova senha'}
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
