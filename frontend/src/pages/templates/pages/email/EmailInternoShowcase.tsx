import { useMemo, useState } from 'react';
import { PagesLayout, PageSection } from '../PagesLayout';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Copy, Check } from 'lucide-react';
import {
  renderInternalEmail,
  internalEmailSample,
  internalEmailWithDetailsSample,
} from './templates/internalEmailTemplate';

export default function EmailInternoShowcase() {
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const htmlDefault = useMemo(
    () => renderInternalEmail(internalEmailSample, window.location.origin),
    [],
  );
  const htmlDetails = useMemo(
    () => renderInternalEmail(internalEmailWithDetailsSample, window.location.origin),
    [],
  );

  const toPreview = (html: string) => (dark ? html.replace('<body ', '<body data-ogsc ') : html);

  const handleCopy = async (html: string, key: string) => {
    await navigator.clipboard.writeText(html);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <PagesLayout
      title="E-mail Interno"
      description="Modelo de e-mail transacional para notificações internas do SmarNet (PO, OS, alertas de sistema). HTML responsivo com suporte a dark mode nativo do cliente de e-mail."
      category="Páginas / Email"
    >
      <div className="flex flex-wrap items-center justify-end gap-2 mb-2">
        <Button variant={dark ? 'outline' : 'default'} size="sm" className="gap-2" onClick={() => setDark(false)}>
          <Sun size={14} /> Claro
        </Button>
        <Button variant={dark ? 'default' : 'outline'} size="sm" className="gap-2" onClick={() => setDark(true)}>
          <Moon size={14} /> Escuro
        </Button>
      </div>

      <PageSection title="Variante padrão — sem bloco de detalhes em destaque">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-xs text-muted-foreground">
            Notificação enxuta — usa apenas a tabela de campos e a caixa “Created by”. Ideal para alertas curtos.
          </p>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleCopy(htmlDefault, 'def')}>
            {copied === 'def' ? <Check size={14} /> : <Copy size={14} />}
            {copied === 'def' ? 'Copiado' : 'Copiar HTML'}
          </Button>
        </div>
        <div className="rounded-xl overflow-hidden border border-border/40" style={{ background: dark ? '#0b1220' : '#e9ecef' }}>
          <iframe
            title="Preview e-mail interno padrão"
            srcDoc={toPreview(htmlDefault)}
            style={{ width: '100%', height: 820, border: 0, display: 'block' }}
          />
        </div>
      </PageSection>

      <PageSection title="Variante com bloco DETALHES em destaque">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-xs text-muted-foreground">
            Replica o card lateral <strong>DETALHES</strong> do sistema legado (O.S., Cliente, Solicitante, Datas).
            Use quando a notificação precisar reforçar o registro original.
          </p>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleCopy(htmlDetails, 'det')}>
            {copied === 'det' ? <Check size={14} /> : <Copy size={14} />}
            {copied === 'det' ? 'Copiado' : 'Copiar HTML'}
          </Button>
        </div>
        <div className="rounded-xl overflow-hidden border border-border/40" style={{ background: dark ? '#0b1220' : '#e9ecef' }}>
          <iframe
            title="Preview e-mail interno com detalhes"
            srcDoc={toPreview(htmlDetails)}
            style={{ width: '100%', height: 880, border: 0, display: 'block' }}
          />
        </div>
      </PageSection>

      <PageSection title="Diretrizes de uso">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>Use a variante <strong>com bloco DETALHES</strong> quando a notificação se refere a um registro completo (O.S., Pedido) e o destinatário precisa visualizar dados-chave sem abrir o sistema.</li>
          <li>Use a variante <strong>padrão</strong> para alertas curtos ou confirmações simples — menos é mais.</li>
          <li>O bloco lateral preserva a hierarquia em modo escuro automaticamente (<code>prefers-color-scheme</code> + fallback <code>data-ogsc</code>).</li>
          <li>Mantenha no máximo 5–6 linhas dentro do bloco DETALHES para não saturar a leitura mobile.</li>
        </ul>
      </PageSection>
    </PagesLayout>
  );
}
