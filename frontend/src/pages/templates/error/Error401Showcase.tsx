import { ErrorPage } from './ErrorPage';
import { Lock } from 'lucide-react';

export default function Error401Showcase() {
  return (
    <ErrorPage
      code="401"
      title="Não autorizado"
      description="Você não tem permissão para acessar este recurso. Faça login com uma conta válida ou solicite acesso ao administrador."
      illustration={
        <div className="w-32 h-32 rounded-full bg-status-warning/10 flex items-center justify-center">
          <Lock size={56} className="text-status-warning" />
        </div>
      }
    />
  );
}
