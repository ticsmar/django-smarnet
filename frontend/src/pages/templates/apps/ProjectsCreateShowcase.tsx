import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, X } from 'lucide-react';

export default function ProjectsCreateShowcase() {
  return (
    <AppsLayout title="Create Project" description="Formulário completo para criação de novo projeto." category="Projects">
      <ShowcaseSection title="Novo Projeto">
        <div className="max-w-2xl space-y-5">
          <div>
            <Label className="text-xs mb-1.5">Nome do Projeto</Label>
            <Input placeholder="Ex: ERP SmarNet v4" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1.5">Data Início</Label>
              <Input type="date" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Data Final</Label>
              <Input type="date" />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Descrição</Label>
            <Textarea placeholder="Descreva o projeto..." className="min-h-[100px] resize-none" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1.5">Prioridade</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1.5">Status</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planejado">Planejado</SelectItem>
                  <SelectItem value="andamento">Em andamento</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Membros da Equipe</Label>
            <div className="flex flex-wrap gap-2">
              {['Carlos M.', 'Ana S.', 'Lucas R.'].map(m => (
                <span key={m} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-xs text-primary">
                  {m} <X size={10} className="cursor-pointer" />
                </span>
              ))}
              <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted/20 text-xs text-muted-foreground hover:text-foreground">
                <Plus size={10} /> Adicionar
              </button>
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Anexos</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Arraste arquivos aqui ou clique para enviar</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, PNG até 10MB</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button>Criar Projeto</Button>
            <Button variant="outline">Cancelar</Button>
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
