import { motion } from 'framer-motion';
import { BarChart3, Shield, Globe, Puzzle, Settings, Cpu, Network } from 'lucide-react';
import heroImage from '@/assets/hero-industrial.jpg';
import warehouseImage from '@/assets/warehouse-industrial.jpg';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/i18n';
import { LGPDBanner } from '@/components/LGPDBanner';
import { LandingNav } from '@/components/LandingNav';
import { SmarnetLogo } from '@/components/SmarnetLogo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function LandingPage() {
  const { locale } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Industrial automation" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 gradient-hero opacity-80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-44">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <span className="text-xs font-bold tracking-widest text-tertiary">{t('hero.badge', locale)}</span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} className="text-4xl lg:text-6xl font-display font-extrabold text-sidebar-foreground leading-tight drop-shadow-lg">
              {t('hero.title1', locale)}
              <br />
              <span className="text-tertiary">{t('hero.title2', locale)}</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="mt-6 text-lg text-sidebar-foreground/85 leading-relaxed max-w-lg drop-shadow">
              {t('hero.subtitle', locale)}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-3.5 rounded-2xl bg-tertiary text-tertiary-foreground font-semibold flex items-center gap-2 hover:bg-tertiary/90 transition-colors shadow-lg">
                {t('hero.cta', locale)} →
              </button>
              <button className="px-8 py-3.5 rounded-2xl bg-sidebar-foreground/10 text-sidebar-foreground font-semibold backdrop-blur-sm hover:bg-sidebar-foreground/20 transition-colors border border-sidebar-foreground/20">
                {t('hero.roadmap', locale)}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <motion.h2 custom={0} variants={fadeUp} className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            {t('features.title', locale)}
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} className="mt-3 text-muted-foreground max-w-xl">
            {t('features.subtitle', locale)}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real-time Data */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="bg-surface-container-low rounded-2xl p-8 row-span-1">
            <div className="p-3 rounded-xl bg-secondary/10 inline-block mb-4">
              <BarChart3 size={22} className="text-secondary" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground">{t('features.realtime', locale)}</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{t('features.realtime.desc', locale)}</p>
            <div className="mt-6 h-24 bg-surface-container rounded-xl flex items-end justify-center gap-1 p-4">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="w-3 rounded-sm bg-secondary/60" />
              ))}
            </div>
          </motion.div>

          {/* Security */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="gradient-primary rounded-2xl p-8 text-primary-foreground">
            <div className="p-3 rounded-xl bg-primary-foreground/10 inline-block mb-4">
              <Shield size={22} className="text-primary-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold">{t('features.security', locale)}</h3>
            <p className="mt-2 text-primary-foreground/70 text-sm leading-relaxed">{t('features.security.desc', locale)}</p>
            <button className="mt-6 text-sm font-semibold hover:underline">{t('features.security.cta', locale)}</button>
          </motion.div>

          {/* Compliance */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="bg-tertiary/10 rounded-2xl p-8">
            <h3 className="text-lg font-display font-bold text-foreground">{t('features.compliance', locale)}</h3>
            <p className="mt-2 text-muted-foreground text-sm">{t('features.compliance.desc', locale)}</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary text-xs font-bold">LGPD</span>
              <span className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary text-xs font-bold">GDPR</span>
            </div>
          </motion.div>

          {/* Modular */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
            className="bg-surface-container-low rounded-2xl p-8">
            <h3 className="text-lg font-display font-bold text-foreground">{t('features.modular', locale)}</h3>
            <p className="mt-2 text-muted-foreground text-sm">{t('features.modular.desc', locale)}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[Puzzle, Globe, Settings, Cpu].map((Icon, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface-container flex items-center justify-center">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engineered Section */}
      <section className="py-24 lg:py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 custom={0} variants={fadeUp} className="text-3xl lg:text-4xl font-display font-bold text-foreground">
                {t('engineered.title', locale)}
              </motion.h2>
              <motion.p custom={1} variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
                {t('engineered.subtitle', locale)}
              </motion.p>
              <div className="mt-10 space-y-8">
                {[
                  { icon: Network, key: 'unified' },
                  { icon: Cpu, key: 'predictive' },
                  { icon: Globe, key: 'api' },
                ].map(({ icon: Icon, key }, i) => (
                  <motion.div key={key} custom={i + 2} variants={fadeUp} className="flex gap-4">
                    <div className="p-2.5 rounded-xl bg-secondary/10 h-fit">
                      <Icon size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground">{t(`engineered.${key}`, locale)}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t(`engineered.${key}.desc`, locale)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={warehouseImage} alt="Industrial infrastructure" className="rounded-2xl shadow-ambient-lg" loading="lazy" width={1024} height={768} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <SmarnetLogo size="md" />
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="https://smar.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">smar.com.br</a>
          <span className="hover:text-foreground transition-colors cursor-pointer">{t('footer.privacy', locale)}</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">{t('footer.status', locale)}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('footer.rights', locale)}</p>
      </footer>

      <LGPDBanner />
    </div>
  );
}
