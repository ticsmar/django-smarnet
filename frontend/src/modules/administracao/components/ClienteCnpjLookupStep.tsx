import { type FormEvent } from "react";
import { Loader2, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useT } from "@/hooks/useT";
import { normalizeCnpj } from "../cnpj";
import type { ConsultaCnpjResult } from "../types/cliente";

type ClienteCnpjLookupStepProps = {
  cnpj: string;
  loading: boolean;
  result: ConsultaCnpjResult | null;
  error: string;
  onCnpjChange: (value: string) => void;
  onSearch: () => void;
  onBack: () => void;
  onOpenExisting: (codigo: number) => void;
};

export function ClienteCnpjLookupStep({
  cnpj,
  loading,
  result,
  error,
  onCnpjChange,
  onSearch,
  onBack,
  onOpenExisting,
}: ClienteCnpjLookupStepProps) {
  const t = useT();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="cliente-cnpj-busca">
          {t("administracao.clientes.cnpj.search")}
        </Label>
        <div className="flex gap-2">
          <Input
            id="cliente-cnpj-busca"
            value={cnpj}
            maxLength={18}
            onChange={(event) => onCnpjChange(event.target.value)}
            onBlur={() => {
              if (normalizeCnpj(cnpj)) {
                onSearch();
              }
            }}
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={loading}
            aria-label={t("administracao.clientes.cnpj.search")}
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

      {result?.already_registered ? (
        <Alert>
          <AlertDescription>
            {result.message
              || t("administracao.clientes.cnpj.already", {
                code: String(result.matches[0]?.codigo ?? ""),
              })}
          </AlertDescription>
        </Alert>
      ) : null}

      {result && result.matches.length > 0 ? (
        <div className="max-h-72 overflow-y-auto rounded-xl border border-border/50">
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onBack}>
          {t("administracao.clientes.back_type")}
        </Button>
      </div>
    </form>
  );
}
