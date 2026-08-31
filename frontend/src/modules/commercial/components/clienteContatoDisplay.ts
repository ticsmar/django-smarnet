import type { ClienteContato } from "../types/cliente";
import {
  joinPresent,
  mailtoHref,
  present,
  type DisplayLine,
} from "./clienteDisplay";

export function contatoCargoDepto(contato: ClienteContato): string | null {
  return joinPresent([contato.depto, contato.cargo], " · ");
}

export function contatoPhones(contato: ClienteContato): string | null {
  return joinPresent([contato.telefone, contato.celular, contato.fax], " · ");
}

export function contatoLines(contato: ClienteContato): DisplayLine[] {
  const lines: DisplayLine[] = [];
  const job = contatoCargoDepto(contato);
  if (job) {
    lines.push({ key: "job", text: job });
  }
  const email = present(contato.email);
  if (email) {
    lines.push({
      key: "email",
      text: email,
      href: mailtoHref(email) ?? undefined,
    });
  }
  const phones = contatoPhones(contato);
  if (phones) {
    lines.push({ key: "phones", text: phones });
  }
  return lines;
}

export function contatoMatches(contato: ClienteContato, needle: string): boolean {
  if (!needle) {
    return true;
  }
  const hay = [
    contato.nome,
    contato.depto,
    contato.cargo,
    contato.email,
    contato.telefone,
    contato.celular,
    contato.fax,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(needle);
}
