import { PagesLayout, PageSection } from './PagesLayout';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const conversations = [
  { name: 'Ana Ribeiro', last: 'Pode revisar o pedido CLI-1023?', time: '09:42', unread: 2, online: true },
  { name: 'Equipe Comercial', last: 'Carlos: Reunião 14h confirmada', time: '08:30', unread: 5, online: true, group: true },
  { name: 'Roberto Silva', last: 'Enviei o orçamento por e-mail', time: 'Ontem', unread: 0, online: false },
  { name: 'Marina Costa', last: 'Obrigada pelo retorno!', time: 'Ontem', unread: 0, online: true },
  { name: 'Suporte Técnico', last: 'Chamado #4521 encerrado', time: 'Seg', unread: 0, online: false, group: true },
];

const messages = [
  { from: 'them', text: 'Bom dia! Você consegue revisar o pedido CLI-1023 ainda hoje?', time: '09:30' },
  { from: 'me', text: 'Bom dia, Ana! Já estou olhando agora.', time: '09:35' },
  { from: 'them', text: 'O cliente solicitou prazo de entrega menor.', time: '09:36' },
  { from: 'me', text: 'Vou verificar com a produção e te retorno em 30min.', time: '09:40' },
  { from: 'them', text: 'Pode revisar o pedido CLI-1023?', time: '09:42' },
];

export default function ChatShowcase() {
  return (
    <PagesLayout title="Chat" description="Mensageria interna em tempo real." category="Páginas">
      <PageSection className="!p-0 overflow-hidden">
        <div className="grid md:grid-cols-[320px_1fr] h-[600px]">
          {/* Sidebar */}
          <div className="border-r border-border/40 flex flex-col">
            <div className="p-4 border-b border-border/40">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar conversas..." className="pl-9 h-9 text-sm" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c, i) => (
                <button
                  key={c.name}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors text-left ${i === 0 ? 'bg-surface-container-low' : ''}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-status-success border-2 border-surface-container" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground truncate">{c.last}</p>
                      {c.unread > 0 && (
                        <span className="text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex flex-col">
            <div className="px-5 py-3 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">AR</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Ana Ribeiro</p>
                  <p className="text-[11px] text-status-success">Online agora</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><Phone size={15} /></button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><Video size={15} /></button>
                <button className="p-2 rounded-lg hover:bg-surface-container-low"><MoreVertical size={15} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${m.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-surface-container-low text-foreground'}`}>
                    <p className="text-sm">{m.text}</p>
                    <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border/40 flex items-center gap-2">
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-surface-container-low"><Paperclip size={16} /></button>
              <Input placeholder="Digite sua mensagem..." className="h-10 text-sm flex-1" />
              <button className="p-2 rounded-lg text-muted-foreground hover:bg-surface-container-low"><Smile size={16} /></button>
              <button className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"><Send size={15} /></button>
            </div>
          </div>
        </div>
      </PageSection>
    </PagesLayout>
  );
}
