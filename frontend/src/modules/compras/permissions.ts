/** Django permission strings for Compras models (`app_label.codename`). */
export const COMPRAS_PERMS = {
  viewFornecedor: "compras_infrastructure.view_fornecedor",
  addFornecedor: "compras_infrastructure.add_fornecedor",
  changeFornecedor: "compras_infrastructure.change_fornecedor",
  deleteFornecedor: "compras_infrastructure.delete_fornecedor",
  viewFornecContato: "compras_infrastructure.view_forneccontato",
  addFornecContato: "compras_infrastructure.add_forneccontato",
  changeFornecContato: "compras_infrastructure.change_forneccontato",
  deleteFornecContato: "compras_infrastructure.delete_forneccontato",
} as const;

export type ComprasPermission = (typeof COMPRAS_PERMS)[keyof typeof COMPRAS_PERMS];

export function hasPermission(
  user: { is_superuser?: boolean; permissions?: string[] } | null | undefined,
  perm: string,
): boolean {
  if (!user) {
    return false;
  }
  if (user.is_superuser) {
    return true;
  }
  return user.permissions?.includes(perm) ?? false;
}
