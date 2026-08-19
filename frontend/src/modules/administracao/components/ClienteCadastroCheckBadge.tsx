import { StatusBadge } from "@/components/ui/badges";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";

/** Codes from SIAOS.PCK_CLIENTE.SF_CHECA_CADASTRO. */
export const CADASTRO_INCOMPLETO = 1;
export const CADASTRO_CNPJ_INVALIDO = 2;

type ClienteCadastroCheckBadgeProps = {
  checagem: number | null | undefined;
  className?: string;
};

export function ClienteCadastroCheckBadge({
  checagem,
  className,
}: ClienteCadastroCheckBadgeProps) {
  const t = useT();
  if (checagem !== CADASTRO_INCOMPLETO && checagem !== CADASTRO_CNPJ_INVALIDO) {
    return null;
  }
  const title =
    checagem === CADASTRO_CNPJ_INVALIDO
      ? t("administracao.clientes.cadastro.cnpj_invalido")
      : t("administracao.clientes.cadastro.incompleto");
  return (
    <StatusBadge
      label="!"
      title={title}
      color="warning"
      tone="soft"
      showDot={false}
      className={cn("min-w-6 justify-center px-2", className)}
    />
  );
}
