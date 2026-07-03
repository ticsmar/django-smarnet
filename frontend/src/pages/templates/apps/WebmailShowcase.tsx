import { useMemo, useState } from 'react';
import { AppsLayout, ShowcaseSection } from './AppsLayout';
import {
  Inbox, Send, FileText, Star, AlertOctagon, Trash2, Tag, Search, Plus,
  Paperclip, Reply, ReplyAll, Forward, Archive, MoreHorizontal, ChevronLeft,
  Mail, MailOpen, CircleDot,
} from 'lucide-react';

type Folder = 'inbox' | 'starred' | 'sent' | 'drafts' | 'spam' | 'trash';

interface Email {
  id: number;
  from: string;
  fromEmail: string;
  initials: string;
  color: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  date: string;
  unread: boolean;
  starred: boolean;
  folder: Folder;
  labels?: { name: string; color: string }[];
  attachments?: { name: string; size: string }[];
}

const palette = [
  'bg-primary/15 text-primary',
  'bg-secondary/15 text-secondary',
  'bg-accent/20 text-accent-foreground',
  'bg-destructive/15 text-destructive',
  'bg-muted text-foreground',
];

const seed: Email[] = [
  {
    id: 1, from: 'Ana Paula Ribeiro', fromEmail: 'ana.ribeiro@smar.com.br', initials: 'AR', color: palette[0],
    subject: 'Revisão da OS #4821 — Linha 03', preview: 'Segue a análise técnica do equipamento e o checklist preliminar para…',
    body: 'Olá,\n\nSegue a análise técnica do equipamento e o checklist preliminar para validação ainda hoje. Precisamos do retorno até as 17h para liberar a parada programada.\n\nObrigada,\nAna',
    time: '09:42', date: 'Hoje', unread: true, starred: true, folder: 'inbox',
    labels: [{ name: 'Manutenção', color: 'bg-secondary/15 text-secondary' }],
    attachments: [{ name: 'OS-4821-checklist.pdf', size: '184 KB' }],
  },
  {
    id: 2, from: 'Carlos Mendes', fromEmail: 'carlos@fornecedor.com', initials: 'CM', color: palette[1],
    subject: 'Proposta comercial — Rolamentos SKF', preview: 'Prezados, encaminho a proposta atualizada com as condições de pagamento…',
    body: 'Prezados,\n\nEncaminho a proposta atualizada com as condições de pagamento revisadas e prazo de entrega de 12 dias úteis.\n\nAtenciosamente,\nCarlos',
    time: '08:15', date: 'Hoje', unread: true, starred: false, folder: 'inbox',
    labels: [{ name: 'Compras', color: 'bg-accent/20 text-accent-foreground' }],
    attachments: [{ name: 'proposta-skf-v2.pdf', size: '512 KB' }],
  },
  {
    id: 3, from: 'Juliano Bonini', fromEmail: 'juliano@smar.com.br', initials: 'JB', color: palette[2],
    subject: 'Indicadores semanais — Produção', preview: 'Bom dia, fechamos a semana com OEE médio de 87,4% e uma redução de…',
    body: 'Bom dia,\n\nFechamos a semana com OEE médio de 87,4% e redução de 12% em paradas não programadas. Detalhes em anexo.',
    time: 'Ontem', date: 'Ontem', unread: false, starred: true, folder: 'inbox',
    labels: [{ name: 'Relatórios', color: 'bg-primary/15 text-primary' }],
  },
  {
    id: 4, from: 'RH SmarNet', fromEmail: 'rh@smar.com.br', initials: 'RH', color: palette[3],
    subject: 'Treinamento NR-12 confirmado', preview: 'O treinamento de capacitação acontecerá no dia 22/05 às 14h no auditório…',
    body: 'O treinamento de capacitação acontecerá no dia 22/05 às 14h no auditório principal. Confirme presença até quinta-feira.',
    time: 'Ontem', date: 'Ontem', unread: false, starred: false, folder: 'inbox',
    labels: [{ name: 'RH', color: 'bg-destructive/15 text-destructive' }],
  },
  {
    id: 5, from: 'Mariana Souza', fromEmail: 'mariana@cliente.com', initials: 'MS', color: palette[0],
    subject: 'Re: Cronograma do projeto Alfa', preview: 'Obrigada pelo retorno. Aprovamos as datas e seguimos com a próxima etapa…',
    body: 'Obrigada pelo retorno. Aprovamos as datas e seguimos com a próxima etapa conforme combinado em call.',
    time: 'Seg', date: '12/05', unread: false, starred: false, folder: 'inbox',
  },
  {
    id: 6, from: 'Eu', fromEmail: 'me@smar.com.br', initials: 'EU', color: palette[4],
    subject: 'Re: Proposta comercial — Rolamentos SKF', preview: 'Carlos, recebido. Vou revisar e retorno ainda hoje com a aprovação…',
    body: 'Carlos, recebido. Vou revisar e retorno ainda hoje com a aprovação.',
    time: '10:02', date: 'Hoje', unread: false, starred: false, folder: 'sent',
  },
  {
    id: 7, from: 'Eu', fromEmail: 'me@smar.com.br', initials: 'EU', color: palette[4],
    subject: 'Rascunho: Comunicado parada programada', preview: 'Comunicamos a parada programada da Linha 03 entre os dias 25 e 27…',
    body: 'Comunicamos a parada programada da Linha 03 entre os dias 25 e 27 de maio para manutenção preventiva.',
    time: '07:48', date: 'Hoje', unread: false, starred: false, folder: 'drafts',
  },
  {
    id: 8, from: 'promo@marketing.io', fromEmail: 'promo@marketing.io', initials: 'PM', color: palette[1],
    subject: 'Última chance: 50% OFF!', preview: 'Promoção exclusiva por tempo limitado, aproveite agora mesmo…',
    body: 'Promoção exclusiva por tempo limitado.',
    time: 'Sáb', date: '10/05', unread: false, starred: false, folder: 'spam',
  },
];

const folders: { id: Folder; label: string; icon: typeof Inbox }[] = [
  { id: 'inbox', label: 'Caixa de entrada', icon: Inbox },
  { id: 'starred', label: 'Com estrela', icon: Star },
  { id: 'sent', label: 'Enviados', icon: Send },
  { id: 'drafts', label: 'Rascunhos', icon: FileText },
  { id: 'spam', label: 'Spam', icon: AlertOctagon },
  { id: 'trash', label: 'Lixeira', icon: Trash2 },
];

const labels = [
  { name: 'Manutenção', color: 'bg-secondary' },
  { name: 'Compras', color: 'bg-accent' },
  { name: 'Relatórios', color: 'bg-primary' },
  { name: 'RH', color: 'bg-destructive' },
];

export default function WebmailShowcase() {
  const [emails, setEmails] = useState<Email[]>(seed);
  const [folder, setFolder] = useState<Folder>('inbox');
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [search, setSearch] = useState('');
  const [composing, setComposing] = useState(false);

  const counts = useMemo(() => ({
    inbox: emails.filter(e => e.folder === 'inbox' && e.unread).length,
    starred: emails.filter(e => e.starred).length,
    sent: emails.filter(e => e.folder === 'sent').length,
    drafts: emails.filter(e => e.folder === 'drafts').length,
    spam: emails.filter(e => e.folder === 'spam').length,
    trash: emails.filter(e => e.folder === 'trash').length,
  }), [emails]);

  const list = useMemo(() => {
    const base = folder === 'starred'
      ? emails.filter(e => e.starred)
      : emails.filter(e => e.folder === folder);
    if (!search) return base;
    const q = search.toLowerCase();
    return base.filter(e =>
      e.subject.toLowerCase().includes(q) ||
      e.from.toLowerCase().includes(q) ||
      e.preview.toLowerCase().includes(q)
    );
  }, [emails, folder, search]);

  const selected = list.find(e => e.id === selectedId) ?? list[0] ?? null;

  const toggleStar = (id: number) =>
    setEmails(prev => prev.map(e => e.id === id ? { ...e, starred: !e.starred } : e));

  const markRead = (id: number) =>
    setEmails(prev => prev.map(e => e.id === id ? { ...e, unread: false } : e));

  return (
    <AppsLayout title="Webmail" description="Cliente de e-mail completo com pastas, busca, leitura e composição.">
      <ShowcaseSection title="Caixa de entrada">
        <div className="grid grid-cols-12 gap-0 rounded-2xl overflow-hidden bg-background ring-1 ring-border/40 min-h-[640px]">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-surface-container-low p-4 space-y-5 border-r border-border/40">
            <button
              onClick={() => setComposing(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-ambient"
            >
              <Plus size={16} /> Novo e-mail
            </button>

            <nav className="space-y-1">
              {folders.map(({ id, label, icon: Icon }) => {
                const count = counts[id];
                const active = folder === id;
                return (
                  <button
                    key={id}
                    onClick={() => { setFolder(id); setSelectedId(null); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-surface-container hover:text-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={15} />
                      {label}
                    </span>
                    {count > 0 && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-surface-container-highest text-foreground'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                <Tag size={11} /> Marcadores
              </p>
              <div className="space-y-1">
                {labels.map(l => (
                  <button key={l.name} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-surface-container hover:text-foreground transition-colors">
                    <span className={`h-2 w-2 rounded-full ${l.color}`} />
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* List */}
          <section className={`col-span-12 md:col-span-4 lg:col-span-4 border-r border-border/40 bg-surface-container-low ${selected && 'hidden md:block'}`}>
            <div className="p-3 border-b border-border/40">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar e-mails…"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>
            </div>
            <div className="divide-y divide-border/40 max-h-[580px] overflow-y-auto">
              {list.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground">Nenhum e-mail nesta pasta.</div>
              )}
              {list.map(e => {
                const active = selected?.id === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => { setSelectedId(e.id); markRead(e.id); }}
                    className={`w-full text-left p-3 flex gap-3 transition-colors ${
                      active ? 'bg-secondary/10' : 'hover:bg-surface-container'
                    }`}
                  >
                    <div className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${e.color}`}>
                      {e.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm truncate ${e.unread ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                          {e.from}
                        </p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{e.time}</span>
                      </div>
                      <p className={`text-xs truncate mt-0.5 ${e.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {e.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{e.preview}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {e.unread && <CircleDot size={10} className="text-secondary" />}
                        {e.starred && <Star size={11} className="fill-accent text-accent" />}
                        {e.attachments && e.attachments.length > 0 && (
                          <Paperclip size={11} className="text-muted-foreground" />
                        )}
                        {e.labels?.map(l => (
                          <span key={l.name} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${l.color}`}>{l.name}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Reader */}
          <section className={`col-span-12 md:col-span-5 lg:col-span-6 ${!selected && 'hidden md:flex'} ${selected ? 'flex' : ''} flex-col`}>
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                <MailOpen size={40} className="text-muted-foreground/40 mb-3" />
                <p className="text-sm">Selecione um e-mail para visualizar</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-2 p-4 border-b border-border/40">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="md:hidden p-2 rounded-lg hover:bg-surface-container text-muted-foreground"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <ToolBtn icon={Reply} label="Responder" />
                    <ToolBtn icon={ReplyAll} label="Responder a todos" />
                    <ToolBtn icon={Forward} label="Encaminhar" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ToolBtn icon={Archive} label="Arquivar" />
                    <ToolBtn icon={Trash2} label="Excluir" />
                    <button
                      onClick={() => toggleStar(selected.id)}
                      className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground"
                      title="Favoritar"
                    >
                      <Star size={15} className={selected.starred ? 'fill-accent text-accent' : ''} />
                    </button>
                    <ToolBtn icon={MoreHorizontal} label="Mais" />
                  </div>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  <h2 className="font-display text-lg font-bold text-foreground">{selected.subject}</h2>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {selected.labels?.map(l => (
                      <span key={l.name} className={`text-[10px] font-bold px-2 py-0.5 rounded ${l.color}`}>{l.name}</span>
                    ))}
                  </div>
                  <div className="flex items-start gap-3 mt-5">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold ${selected.color}`}>
                      {selected.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{selected.from}</p>
                          <p className="text-xs text-muted-foreground">&lt;{selected.fromEmail}&gt; para mim</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{selected.date} · {selected.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {selected.body}
                  </div>

                  {selected.attachments && selected.attachments.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Anexos</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.attachments.map(a => (
                          <div key={a.name} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low ring-1 ring-border/40">
                            <Paperclip size={13} className="text-secondary" />
                            <div>
                              <p className="text-xs font-semibold text-foreground">{a.name}</p>
                              <p className="text-[10px] text-muted-foreground">{a.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick reply */}
                  <div className="mt-8 rounded-2xl bg-surface-container-low p-4 ring-1 ring-border/40">
                    <p className="text-xs font-semibold text-foreground mb-2">Resposta rápida</p>
                    <textarea
                      placeholder={`Responder para ${selected.from.split(' ')[0]}…`}
                      rows={3}
                      className="w-full rounded-xl bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground">
                        <Paperclip size={15} />
                      </button>
                      <button className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                        <Send size={13} /> Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </ShowcaseSection>

      {/* Compose modal */}
      {composing && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6 bg-foreground/40 backdrop-blur-sm">
          <div className="w-full md:max-w-2xl bg-background rounded-t-2xl md:rounded-2xl shadow-ambient-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-primary text-primary-foreground">
              <p className="text-sm font-semibold flex items-center gap-2"><Mail size={15} /> Novo e-mail</p>
              <button onClick={() => setComposing(false)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10">
                <ChevronLeft size={16} className="rotate-90" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <input placeholder="Para" className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" />
              <input placeholder="Assunto" className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" />
              <textarea rows={8} placeholder="Escreva sua mensagem…" className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none" />
              <div className="flex items-center justify-between pt-2">
                <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground"><Paperclip size={16} /></button>
                <div className="flex items-center gap-2">
                  <button onClick={() => setComposing(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground">Descartar</button>
                  <button onClick={() => setComposing(false)} className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                    <Send size={13} /> Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppsLayout>
  );
}

function ToolBtn({ icon: Icon, label }: { icon: typeof Inbox; label: string }) {
  return (
    <button title={label} className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors">
      <Icon size={15} />
    </button>
  );
}
