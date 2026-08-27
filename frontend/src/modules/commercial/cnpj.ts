const CNPJ_MASK = /[./\-\s]/g;

export function normalizeCnpj(value: string): string {
  return value.replace(CNPJ_MASK, "").toUpperCase();
}

export function isCnpjKey(value: string): boolean {
  return /^[A-Z0-9]{14}$/.test(normalizeCnpj(value));
}
