import { PagesLayout, PageSection } from '../PagesLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image as ImageIcon, Save, Send } from 'lucide-react';

export default function CreateBlogShowcase() {
  return (
    <PagesLayout title="Criar Artigo" description="Compose e publique um novo post no blog." category="Páginas / Blog">
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <PageSection>
          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-1.5">Título do artigo</Label>
              <Input placeholder="Insira um título atrativo..." className="text-base h-12 font-semibold" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Resumo</Label>
              <Textarea rows={2} placeholder="Breve descrição que aparecerá nos cards..." />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Conteúdo</Label>
              <Textarea rows={16} placeholder="Escreva seu artigo aqui..." />
            </div>
          </div>
        </PageSection>

        <aside className="space-y-4">
          <PageSection>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Publicação</p>
            <div className="space-y-3">
              <div>
                <Label className="text-xs mb-1.5">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="review">Em revisão</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1.5">Categoria</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tecnologia</SelectItem>
                    <SelectItem value="management">Gestão</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="operations">Operações</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1.5">Tags</Label>
                <Input placeholder="Separe por vírgulas" />
              </div>
            </div>
          </PageSection>

          <PageSection>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Imagem de capa</p>
            <div className="border-2 border-dashed border-border/60 rounded-xl p-6 text-center">
              <ImageIcon size={28} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Clique para enviar uma imagem</p>
              <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG até 5MB</p>
            </div>
          </PageSection>

          <div className="flex flex-col gap-2">
            <button className="h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2">
              <Send size={14} /> Publicar
            </button>
            <button className="h-11 rounded-lg border border-border text-sm font-semibold hover:bg-surface-container-low flex items-center justify-center gap-2">
              <Save size={14} /> Salvar rascunho
            </button>
          </div>
        </aside>
      </div>
    </PagesLayout>
  );
}
