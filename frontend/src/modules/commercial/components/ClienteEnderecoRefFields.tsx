import { FormGrid, FormSection } from "@/components/ui/forms";
import { useT } from "@/hooks/useT";
import { ClienteDisplayLines } from "./ClienteDisplayLines";
import {
  addressLines,
  contactLines,
  type EnderecoRefRow,
} from "./clienteEnderecoDisplay";
import { present } from "./clienteDisplay";

export function ClienteEnderecoRefFields({ row }: { row: EnderecoRefRow }) {
  const t = useT();
  const address = addressLines(row);
  const contact = contactLines(row);
  const nome = present(row.nome);
  if (!nome && address.length === 0 && contact.length === 0) {
    return null;
  }
  return (
    <div className="space-y-4">
      {nome ? (
        <p className="text-sm font-semibold text-foreground">{nome}</p>
      ) : null}
      <FormGrid cols={2} gap="lg">
        {address.length ? (
          <FormSection title={t("administracao.clientes.fields.endereco")}>
            <ClienteDisplayLines lines={address} />
          </FormSection>
        ) : null}
        {contact.length ? (
          <FormSection title={t("administracao.clientes.fields.contato")}>
            <ClienteDisplayLines lines={contact} />
          </FormSection>
        ) : null}
      </FormGrid>
    </div>
  );
}
