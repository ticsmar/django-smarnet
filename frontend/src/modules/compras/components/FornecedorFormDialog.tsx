import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormCombobox } from "@/components/ui/forms";
import type { Fornecedor, GravaFornecedorInput } from "../types/fornecedor";
import { usePaises } from "../hooks/usePaises";
import { flagClass } from "../utils/paisFlags";

export type FornecedorFormValues = Omit<GravaFornecedorInput, "idioma_msg">;

const EMPTY_FORM: FornecedorFormValues = {
  cod_fornec: null,
  razao_soc: "",
  nome_reduz: "",
  endereco: "",
  bairro: "",
  munic: "",
  cep: "",
  estado: "",
  cod_pais: 76,
};

type FornecedorFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Fornecedor | null;
  submitting?: boolean;
  error?: string;
  onSubmit: (values: FornecedorFormValues) => Promise<void>;
};

function fromFornecedor(fornecedor: Fornecedor): FornecedorFormValues {
  return {
    cod_fornec: fornecedor.for_codigo,
    razao_soc: fornecedor.for_razao_soc ?? "",
    nome_reduz: fornecedor.for_nome_reduz ?? "",
    endereco: fornecedor.for_endereco ?? "",
    bairro: fornecedor.for_bairro ?? "",
    munic: fornecedor.for_munic ?? "",
    cep: fornecedor.for_cep ?? "",
    estado: fornecedor.for_estado ?? "",
    cod_pais: fornecedor.pai_codigo ?? 76,
  };
}

export function FornecedorFormDialog({
  open,
  onOpenChange,
  initial = null,
  submitting = false,
  error = "",
  onSubmit,
}: FornecedorFormDialogProps) {
  const [form, setForm] = useState<FornecedorFormValues>(EMPTY_FORM);
  const isEdit = initial !== null;
  const { data: paises = [], isLoading: paisesLoading } = usePaises();

  const paisOptions = useMemo(
    () =>
      paises.map((pais) => ({
        value: String(pais.pai_codigo),
        label: pais.pai_nome ?? String(pais.pai_codigo),
      })),
    [paises],
  );

  const selectedPais = useMemo(
    () =>
      paisOptions.find((option) => option.value === String(form.cod_pais)) ??
      null,
    [form.cod_pais, paisOptions],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    setForm(initial ? fromFornecedor(initial) : EMPTY_FORM);
  }, [open, initial]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(form);
  }

  function update<K extends keyof FornecedorFormValues>(
    key: K,
    value: FornecedorFormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar fornecedor" : "Novo fornecedor"}
          </DialogTitle>
          <DialogDescription>
            Os dados são gravados via procedimento Oracle do módulo Compras.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="razao_soc">Razão social</Label>
              <Input
                id="razao_soc"
                required
                value={form.razao_soc}
                onChange={(event) => update("razao_soc", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome_reduz">Nome reduzido</Label>
              <Input
                id="nome_reduz"
                required
                value={form.nome_reduz}
                onChange={(event) => update("nome_reduz", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <FormCombobox
                id="cod_pais"
                label="País"
                required
                options={paisOptions}
                value={selectedPais}
                onChange={(option) => {
                  const selected = Array.isArray(option) ? option[0] : option;
                  if (selected?.value) {
                    update("cod_pais", Number(selected.value));
                  }
                }}
                placeholder={
                  paisesLoading ? "Carregando países..." : "Buscar país..."
                }
                isClearable={false}
                isLoading={paisesLoading}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : undefined
                }
                formatOptionLabel={(option) => {
                  const cls = flagClass(Number(option.value));
                  return (
                    <span className="flex items-center gap-2">
                      {cls ? <span className={cls} /> : null}
                      <span>{option.label}</span>
                    </span>
                  );
                }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                required
                value={form.endereco}
                onChange={(event) => update("endereco", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                required
                value={form.bairro}
                onChange={(event) => update("bairro", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="munic">Município</Label>
              <Input
                id="munic"
                required
                value={form.munic}
                onChange={(event) => update("munic", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                required
                value={form.cep}
                onChange={(event) => update("cep", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                required
                value={form.estado}
                onChange={(event) => update("estado", event.target.value)}
              />
            </div>
          </div>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
