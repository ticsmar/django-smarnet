import { ErrorPage } from './ErrorPage';
import { Search } from 'lucide-react';

export default function Error404Showcase() {
  return (
    <ErrorPage
      code="404"
      title="Página não encontrada"
      description="O endereço digitado não existe ou foi removido. Verifique a URL ou retorne ao painel principal."
      illustration={
        <div className="w-32 h-32 rounded-full bg-secondary/10 flex items-center justify-center">
          <Search size={56} className="text-secondary" />
        </div>
      }
    />
  );
}
