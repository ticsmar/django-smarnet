import { AppsLayout, ShowcaseSection } from './AppsLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

export default function JobPostShowcase() {
  return (
    <AppsLayout title="Job Post" description="Formulário para publicação de nova vaga." category="Jobs">
      <ShowcaseSection title="Nova Vaga">
        <div className="max-w-2xl space-y-5">
          <div>
            <Label className="text-xs mb-1.5">Título da Vaga</Label>
            <Input placeholder="Ex: Desenvolvedor Full Stack Senior" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1.5">Empresa</Label>
              <Input placeholder="Nome da empresa" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Localização</Label>
              <Input placeholder="Cidade, Estado" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs mb-1.5">Tipo</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="integral">Tempo Integral</SelectItem>
                  <SelectItem value="meio">Meio Período</SelectItem>
                  <SelectItem value="pj">PJ</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1.5">Salário Mín</Label>
              <Input type="number" placeholder="R$ 0" />
            </div>
            <div>
              <Label className="text-xs mb-1.5">Salário Máx</Label>
              <Input type="number" placeholder="R$ 0" />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1.5">Descrição da Vaga</Label>
            <Textarea rows={5} placeholder="Descreva as responsabilidades..." className="resize-none" />
          </div>
          <div>
            <Label className="text-xs mb-1.5">Skills Necessárias</Label>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map(s => (
                <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-xs text-primary">{s} <X size={10} className="cursor-pointer" /></span>
              ))}
              <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted/20 text-xs text-muted-foreground hover:text-foreground"><Plus size={10} /> Adicionar</button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button>Publicar Vaga</Button>
            <Button variant="outline">Salvar Rascunho</Button>
          </div>
        </div>
      </ShowcaseSection>
    </AppsLayout>
  );
}
