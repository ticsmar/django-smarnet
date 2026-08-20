import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SmarnetLogo } from '@/components/SmarnetLogo';
import { useT } from '@/hooks/useT';
import { openLgpdPreferences } from '@/lib/lgpdConsent';

export default function PrivacyPage() {
  const t = useT();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" aria-label="Smarnet">
            <SmarnetLogo size="md" />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:underline mb-8"
        >
          <ArrowLeft size={14} aria-hidden /> {t('privacy.back')}
        </Link>

        <h1 className="text-3xl font-display font-bold text-foreground">{t('privacy.title')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('privacy.updated')}</p>
        <p className="mt-6 text-muted-foreground leading-relaxed">{t('privacy.intro')}</p>

        <section className="mt-10">
          <h2 className="text-lg font-display font-bold text-foreground">{t('privacy.controller.title')}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{t('privacy.controller.body')}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-display font-bold text-foreground">{t('privacy.data.title')}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{t('privacy.data.body')}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-display font-bold text-foreground">{t('privacy.cookies.title')}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{t('privacy.cookies.intro')}</p>
          <dl className="mt-4 space-y-4">
            <div className="rounded-xl bg-surface-container-low p-4">
              <dt className="text-sm font-semibold text-foreground">{t('lgpd.necessary')}</dt>
              <dd className="mt-1 text-sm text-muted-foreground leading-relaxed">{t('privacy.cookies.necessary')}</dd>
            </div>
            <div className="rounded-xl bg-surface-container-low p-4">
              <dt className="text-sm font-semibold text-foreground">{t('lgpd.functional')}</dt>
              <dd className="mt-1 text-sm text-muted-foreground leading-relaxed">{t('privacy.cookies.functional')}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-display font-bold text-foreground">{t('privacy.rights.title')}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{t('privacy.rights.body')}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-display font-bold text-foreground">{t('privacy.contact.title')}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {t('privacy.contact.body')}{' '}
            <a
              href="https://smar.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-medium hover:underline"
            >
              smar.com.br
            </a>
          </p>
        </section>

        <button
          type="button"
          onClick={() => openLgpdPreferences()}
          className="mt-10 px-5 py-2.5 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {t('lgpd.manage')}
        </button>
      </main>
    </div>
  );
}
