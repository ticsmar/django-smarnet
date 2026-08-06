import { Factory, Monitor, Droplets, Truck } from 'lucide-react';
import type { ComponentType } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useBranchManagerAccess } from '@/modules/device';
import { COMPRAS_PERMS, hasPermission } from '@/modules/compras';

export type ErpMenuItem = {
  key: string;
  icon: ComponentType<{ size?: number | string }>;
  path: string;
  managerOnly?: boolean;
  permission?: string;
};

export type ErpSection = {
  label: string | null;
  items: ErpMenuItem[];
};

export type ErpGroup = {
  key: string;
  icon: ComponentType<{ size?: number | string }>;
  /** Página índice do módulo, usada no menu e no breadcrumb. */
  path: string;
  sections: ErpSection[];
};

export const erpGroups: ErpGroup[] = [
  {
    key: 'producao',
    icon: Factory,
    path: '/app/producao',
    sections: [
      {
        label: null,
        items: [{ key: 'devices', icon: Monitor, path: '/app/devices', managerOnly: true }],
      },
    ],
  },
  {
    key: 'compras',
    icon: Droplets,
    path: '/app/compras',
    sections: [
      {
        label: null,
        items: [
          {
            key: 'compras_fornecedores',
            icon: Truck,
            path: '/app/compras/fornecedores',
            permission: COMPRAS_PERMS.viewFornecedor,
          },
        ],
      },
    ],
  },
];

export function findErpGroup(groupKey: string): ErpGroup | undefined {
  return erpGroups.find((group) => group.key === groupKey);
}

/** Grupos e itens que o usuário atual pode acessar. */
export function useVisibleErpGroups(): ErpGroup[] {
  const { user } = useApp();
  const { isManager: canAccessDevices } = useBranchManagerAccess();

  return erpGroups
    .map((group) => ({
      ...group,
      sections: group.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            if (item.managerOnly && !canAccessDevices) return false;
            if (item.permission && !hasPermission(user, item.permission)) return false;
            return true;
          }),
        }))
        .filter((section) => section.items.length > 0),
    }))
    .filter((group) => group.sections.length > 0);
}
