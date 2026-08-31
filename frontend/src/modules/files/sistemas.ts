export const SISTEMA_CLIENTE = 7;

export type FileManagerHostEmbed = {
  filtroKey: string;
  route?: string;
  routeLabel?: string;
};

/** Hosts that embed FileManager. Key = PAR_SISTEMA / op_file. */
export const FILE_MANAGER_HOSTS: Partial<Record<number, FileManagerHostEmbed>> = {
  1: { filtroKey: "PRP_CODIGO" },
  2: { filtroKey: "ORDER_NO" },
  7: {
    filtroKey: "CLIENTE.CODIGO",
    route: "/app/commercial/customers",
    routeLabel: "Cadastro de clientes",
  },
};

export function hostEmbedFor(codigo: number): FileManagerHostEmbed | undefined {
  return FILE_MANAGER_HOSTS[codigo];
}
