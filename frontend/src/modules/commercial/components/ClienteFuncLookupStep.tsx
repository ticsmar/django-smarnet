import { type FormEvent } from "react";
import { Loader2, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useT } from "@/hooks/useT";
import type { ConsultaFuncionarioResult } from "../types/cliente";

type ClienteFuncLookupStepProps = {
  cpf: string;
  loading: boolean;
  copying: boolean;
  result: ConsultaFuncionarioResult | null;
  error: string;
  onCpfChange: (value: string) => void;
  onSearch: () => void;
  onCopy: () => void;
  onBack: () => void;
  onOpenExisting: (codigo: number) => void;
};

export function ClienteFuncLookupStep({
  cpf,
  loading,
  copying,
  result,
  error,
  onCpfChange,
  onSearch,
  onCopy,
  onBack,
  onOpenExisting,
}: ClienteFuncLookupStepProps) {
  const t = useT();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  const funcionario = result?.funcionario;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <FormInput
            id="cliente-func-cpf"
            className="flex-1"
            label={t("administracao.clientes.func.search")}
            value={cpf}
            maxLength={14}
            onChange={(event) => onCpfChange(event.target.value)}
            onBlur={() => {
              if (cpf.replace(/\D/g, "").length === 11) {
                onSearch();
              }
            }}
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={loading}
            aria-label={t("administracao.clientes.func.search")}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {result?.message ? (
        <Alert>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      ) : null}

      {result && result.matches.length > 0 ? (
        <div className="max-h-72 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {t("administracao.clientes.col.codigo")}
                </TableHead>
                <TableHead>{t("administracao.clientes.col.nome")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.matches.map((match) => (
                <TableRow
                  key={match.codigo}
                  className="cursor-pointer"
                  onClick={() => onOpenExisting(match.codigo)}
                >
                  <TableCell className="font-mono">{match.codigo}</TableCell>
                  <TableCell>{match.cliente || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}

      {funcionario ? (
        <div className="grid gap-2 rounded-xl border border-border/50 p-4 text-sm sm:grid-cols-2">
          <PreviewField
            label={t("administracao.clientes.fields.nome")}
            value={funcionario.nome}
          />
          <PreviewField
            label={t("administracao.clientes.func.chapa")}
            value={funcionario.chapa}
          />
          <PreviewField
            label={t("administracao.clientes.fields.cpf")}
            value={funcionario.cpf}
          />
          <PreviewField
            label={t("administracao.clientes.func.rg")}
            value={funcionario.rg}
          />
          <PreviewField
            label={t("administracao.clientes.fields.endereco")}
            value={funcionario.endereco}
          />
          <PreviewField
            label={t("administracao.clientes.fields.cep")}
            value={funcionario.cep}
          />
          <PreviewField
            label={t("administracao.clientes.func.uf")}
            value={funcionario.uf}
          />
          <PreviewField
            label={t("administracao.clientes.fields.bairro")}
            value={funcionario.bairro}
          />
          <PreviewField
            label={t("administracao.clientes.fields.cidade")}
            value={funcionario.municipio}
          />
          <PreviewField
            label={t("administracao.clientes.fields.telefone")}
            value={funcionario.telefone}
          />
          <PreviewField
            label={t("administracao.clientes.fields.email")}
            value={funcionario.email}
          />
        </div>
      ) : null}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onBack}>
          {t("administracao.clientes.back_type")}
        </Button>
        <Button
          type="button"
          disabled={!result?.can_copy || copying}
          onClick={onCopy}
        >
          {copying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("administracao.clientes.func.copy")
          )}
        </Button>
      </div>
    </form>
  );
}

function PreviewField({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-foreground">{value || "—"}</dd>
    </div>
  );
}
