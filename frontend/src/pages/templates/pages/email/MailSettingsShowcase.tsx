import { PagesLayout, PageSection } from '../PagesLayout';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const settings = [
  { title: 'Notificações', items: [
    { name: 'Notificar novos e-mails', desc: 'Push notification ao receber um e-mail', enabled: true },
    { name: 'Som de notificação', desc: 'Tocar som ao receber um e-mail novo', enabled: false },
    { name: 'Notificar apenas favoritos', desc: 'Apenas remetentes marcados', enabled: false },
  ]},
  { title: 'Privacidade', items: [
    { name: 'Carregar imagens automaticamente', desc: 'Bloqueio de imagens externas', enabled: false },
    { name: 'Confirmação de leitura', desc: 'Enviar confirmação automática', enabled: true },
    { name: 'Bloquear rastreadores', desc: 'Impede pixels de tracking', enabled: true },
  ]},
];

export default function MailSettingsShowcase() {
  return (
    <PagesLayout title="Configurações de E-mail" description="Personalize seu cliente de e-mail." category="Páginas / Email">
      <PageSection title="Conta">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1.5">Nome de exibição</Label>
            <Input defaultValue="Ana Paula Ribeiro" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Endereço de e-mail</Label>
            <Input defaultValue="ana@smarnet.com" type="email" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Assinatura padrão</Label>
            <Input defaultValue="Ana Ribeiro · Gerente Comercial · SmarNet" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Fuso horário</Label>
            <Select defaultValue="brt">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="brt">Brasília (GMT-3)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PageSection>

      {settings.map((s) => (
        <PageSection key={s.title} title={s.title}>
          <div className="space-y-4">
            {s.items.map((it) => (
              <div key={it.name} className="flex items-center justify-between gap-4 py-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{it.name}</p>
                  <p className="text-xs text-muted-foreground">{it.desc}</p>
                </div>
                <Switch defaultChecked={it.enabled} />
              </div>
            ))}
          </div>
        </PageSection>
      ))}

      <div className="flex justify-end gap-2">
        <button className="h-10 px-5 rounded-lg border border-border text-sm font-semibold hover:bg-surface-container-low">Cancelar</button>
        <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">Salvar alterações</button>
      </div>
    </PagesLayout>
  );
}
