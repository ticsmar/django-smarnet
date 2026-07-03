import { ErrorPage } from './ErrorPage';
import { ServerCrash } from 'lucide-react';

export default function Error500Showcase() {
  return (
    <ErrorPage
      code="500"
      title="Erro interno do servidor"
      description="Algo deu errado em nossos servidores. Nossa equipe já foi notificada e está trabalhando na solução. Tente novamente em alguns minutos."
      illustration={
        <div className="w-32 h-32 rounded-full bg-destructive/10 flex items-center justify-center">
          <ServerCrash size={56} className="text-destructive" />
        </div>
      }
    />
  );
}
