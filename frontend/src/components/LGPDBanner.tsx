import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Cookie } from 'lucide-react';
import { useT } from '@/hooks/useT';
import { useLgpdConsent } from '@/hooks/useLgpdConsent';
import { FormSwitch } from '@/components/ui/forms/FormSwitch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function LGPDBanner() {
  const t = useT();
  const {
    consent,
    decided,
    preferencesOpen,
    setPreferencesOpen,
    acceptAll,
    savePreferences,
  } = useLgpdConsent();

  return (
    <>
      <AnimatePresence>
        {!decided && (
          <motion.aside
            key="lgpd-banner"
            role="region"
            aria-labelledby="lgpd-title"
            aria-describedby="lgpd-message"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 0.6, type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <div className="bg-background rounded-2xl shadow-ambient-lg p-5 border border-border/60">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-xl bg-secondary/10">
                  <Cookie size={18} className="text-secondary" />
                </div>
                <div>
                  <h2 id="lgpd-title" className="font-display font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <Shield size={14} aria-hidden /> {t('lgpd.title')}
                  </h2>
                  <p id="lgpd-message" className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t('lgpd.message')}{' '}
                    <Link to="/privacy" className="text-secondary font-medium hover:underline">
                      {t('footer.privacy')}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(true)}
                  className="px-4 py-2 text-xs font-medium rounded-xl bg-surface-container-low text-foreground hover:bg-surface-container transition-colors"
                >
                  {t('lgpd.preferences')}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-4 py-2 text-xs font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {t('lgpd.accept')}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <LgpdPreferencesDialog
        open={preferencesOpen}
        functionalDefault={consent?.functional ?? false}
        onOpenChange={setPreferencesOpen}
        onSave={savePreferences}
        onAcceptAll={acceptAll}
      />
    </>
  );
}

function LgpdPreferencesDialog({
  open,
  functionalDefault,
  onOpenChange,
  onSave,
  onAcceptAll,
}: {
  open: boolean;
  functionalDefault: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (functional: boolean) => void;
  onAcceptAll: () => void;
}) {
  const t = useT();
  const necessaryId = useId();
  const functionalId = useId();
  const [functional, setFunctional] = useState(functionalDefault);

  useEffect(() => {
    if (open) setFunctional(functionalDefault);
  }, [open, functionalDefault]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>{t('lgpd.prefs.title')}</DialogTitle>
          <DialogDescription>{t('lgpd.prefs.subtitle')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-1">
          <FormSwitch
            id={necessaryId}
            variant="row"
            checked
            disabled
            label={t('lgpd.necessary')}
            description={t('lgpd.necessary.desc')}
          />
          <FormSwitch
            id={functionalId}
            variant="row"
            checked={functional}
            onCheckedChange={(checked) => setFunctional(checked === true)}
            label={t('lgpd.functional')}
            description={t('lgpd.functional.desc')}
          />
        </div>
        <DialogFooter className="gap-2">
          <button
            type="button"
            onClick={() => onSave(functional)}
            className="px-4 py-2 text-xs font-medium rounded-xl bg-surface-container-low text-foreground hover:bg-surface-container transition-colors"
          >
            {t('lgpd.save')}
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="px-4 py-2 text-xs font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t('lgpd.accept')}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
