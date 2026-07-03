import { useMemo, useState } from 'react';
import { PagesLayout, PageSection } from '../PagesLayout';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Copy, Check } from 'lucide-react';
import {
  renderExternalEmail,
  externalEmailSample,
  externalEmailWithHighlightSample,
} from './templates/externalEmailTemplate';

export default function EmailExternoShowcase() {
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const htmlDefault = useMemo(
    () => renderExternalEmail(externalEmailSample, window.location.origin),
    [],
  );
  const htmlHighlight = useMemo(
    () => renderExternalEmail(externalEmailWithHighlightSample, window.location.origin),
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
      title="E-mail Externo"
      description="Modelo de e-mail institucional para comunicação com clientes e fornecedores (aceite de pedido, cotações, pós-venda). Identidade Smar Technology Company, HTML responsivo e suporte a dark mode."
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

      <PageSection title="Variante padrão — aceite de pedido">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-xs text-muted-foreground">
            Comunicação institucional padrão, com hero, dados do pedido e contatos por área.
          </p>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleCopy(htmlDefault, 'def')}>
            {copied === 'def' ? <Check size={14} /> : <Copy size={14} />}
            {copied === 'def' ? 'Copiado' : 'Copiar HTML'}
          </Button>
        </div>
        <div className="rounded-xl overflow-hidden border border-border/40" style={{ background: dark ? '#0b1220' : '#e9ecef' }}>
          <iframe
            title="Preview e-mail externo padrão"
            srcDoc={toPreview(htmlDefault)}
            style={{ width: '100%', height: 980, border: 0, display: 'block' }}
          />
        </div>
      </PageSection>

      <PageSection title="Variante com bloco de DESTAQUE em evidência">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="text-xs text-muted-foreground">
            Usa o callout âmbar para destacar uma informação crítica (nova data de entrega, alteração de prazo,
            alerta importante ao cliente). O bloco é o elemento de maior peso visual da mensagem.
          </p>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleCopy(htmlHighlight, 'hi')}>
            {copied === 'hi' ? <Check size={14} /> : <Copy size={14} />}
            {copied === 'hi' ? 'Copiado' : 'Copiar HTML'}
          </Button>
        </div>
        <div className="rounded-xl overflow-hidden border border-border/40" style={{ background: dark ? '#0b1220' : '#e9ecef' }}>
          <iframe
            title="Preview e-mail externo com destaque"
            srcDoc={toPreview(htmlHighlight)}
            style={{ width: '100%', height: 1020, border: 0, display: 'block' }}
          />
        </div>
      </PageSection>

      <PageSection title="Diretrizes de uso">
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>Use a variante <strong>com destaque</strong> sempre que houver uma informação que o cliente PRECISA ver primeiro (mudança de prazo, valor relevante, ação requerida).</li>
          <li>Mantenha o destaque com no máximo 2 linhas — rótulo curto + valor objetivo.</li>
          <li>Evite mais de um bloco de destaque por e-mail; a hierarquia se perde.</li>
          <li>O rodapé com contatos por área (Comercial, Pós-venda, Compras, Assistência) é obrigatório em ambas as variantes.</li>
          <li>Cores e contrastes ajustam automaticamente para modo escuro do cliente de e-mail.</li>
        </ul>
      </PageSection>
    </PagesLayout>
  );
}
