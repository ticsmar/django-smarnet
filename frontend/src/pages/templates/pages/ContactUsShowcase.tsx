import { PagesLayout, PageSection } from './PagesLayout';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactUsShowcase() {
  return (
    <PagesLayout title="Fale Conosco" description="Estamos prontos para atender você." category="Páginas">
      <div className="grid md:grid-cols-3 gap-4">
        <PageSection>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3"><Phone size={18} /></div>
          <p className="font-semibold text-foreground">Telefone</p>
          <p className="text-sm text-muted-foreground mt-1">+55 11 4002-8922</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5"><Clock size={11} /> Seg-Sex, 8h às 18h</p>
        </PageSection>
        <PageSection>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3"><Mail size={18} /></div>
          <p className="font-semibold text-foreground">E-mail</p>
          <p className="text-sm text-muted-foreground mt-1">contato@smarnet.com.br</p>
          <p className="text-xs text-muted-foreground mt-2">Resposta em até 24h úteis</p>
        </PageSection>
        <PageSection>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3"><MapPin size={18} /></div>
          <p className="font-semibold text-foreground">Endereço</p>
          <p className="text-sm text-muted-foreground mt-1">Av. Paulista, 1000 — São Paulo/SP</p>
          <p className="text-xs text-muted-foreground mt-2">CEP 01310-100</p>
        </PageSection>
      </div>

      <PageSection>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Envie uma mensagem</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-3 mb-2">Como podemos ajudar?</h2>
            <p className="text-sm text-muted-foreground mb-6">Preencha o formulário e nossa equipe entrará em contato em breve.</p>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1.5">Nome</Label>
                  <Input placeholder="Seu nome completo" />
                </div>
                <div>
                  <Label className="text-xs mb-1.5">Empresa</Label>
                  <Input placeholder="Razão social" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1.5">E-mail</Label>
                  <Input type="email" placeholder="voce@empresa.com" />
                </div>
                <div>
                  <Label className="text-xs mb-1.5">Telefone</Label>
                  <Input placeholder="(11) 99999-9999" />
                </div>
              </div>
              <div>
                <Label className="text-xs mb-1.5">Assunto</Label>
                <Input placeholder="Sobre o que deseja falar?" />
              </div>
              <div>
                <Label className="text-xs mb-1.5">Mensagem</Label>
                <Textarea rows={5} placeholder="Descreva sua necessidade..." />
              </div>
              <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 flex items-center justify-center gap-2">
                <MessageCircle size={16} /> Enviar mensagem
              </button>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center">
            <div className="text-center text-muted-foreground p-8">
              <MapPin size={48} className="mx-auto mb-3 text-primary/40" />
              <p className="text-sm font-semibold text-foreground">Visite nosso escritório</p>
              <p className="text-xs mt-2">Av. Paulista, 1000 — Bela Vista<br />São Paulo/SP — 01310-100</p>
            </div>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
