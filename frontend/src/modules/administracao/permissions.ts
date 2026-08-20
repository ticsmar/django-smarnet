/** Django permission strings for Administração Cliente. */
export const ADMINISTRACAO_PERMS = {
  viewCliente: "administracao_infrastructure.view_cliente",
  addCliente: "administracao_infrastructure.add_cliente",
  changeCliente: "administracao_infrastructure.change_cliente",
} as const;

export type AdministracaoPermission =
  (typeof ADMINISTRACAO_PERMS)[keyof typeof ADMINISTRACAO_PERMS];
