const CNPJ_MASK = /[./\-\s]/g;

export function normalizeCnpj(value: string): string {
  return value.replace(CNPJ_MASK, "").toUpperCase();
}

export function isCnpjKey(value: string): boolean {
  return /^[A-Z0-9]{14}$/.test(normalizeCnpj(value));
}

/** Display mask `AA.AAA.AAA/AAAA-AA` (digits or letters). */
export function formatCnpj(value: string | null | undefined): string | null {
  if (!value?.trim()) {
    return null;
  }
  const key = normalizeCnpj(value);
  if (key.length !== 14) {
    return value.trim();
  }
  return `${key.slice(0, 2)}.${key.slice(2, 5)}.${key.slice(5, 8)}/${key.slice(8, 12)}-${key.slice(12)}`;
}
