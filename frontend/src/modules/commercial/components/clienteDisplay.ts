export function present(value: string | null | undefined): string | null {
  const text = value?.trim();
  return text ? text : null;
}

export function joinPresent(
  values: Array<string | null | undefined>,
  sep: string,
): string | null {
  const parts = values
    .map(present)
    .filter((item): item is string => item != null);
  return parts.length ? parts.join(sep) : null;
}

export function mailtoHref(email: string | null | undefined): string | null {
  const value = email?.trim();
  if (!value || !value.includes("@")) {
    return null;
  }
  return `mailto:${value}`;
}

export type DisplayLine = { key: string; text: string; href?: string };
