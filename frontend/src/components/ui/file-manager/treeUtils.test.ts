import { describe, expect, it } from 'vitest';
import type { FileManagerNode } from './types';
import {
  childrenOf,
  folderOptions,
  formatKb,
  historicoAcaoLabel,
  isFileManagerDisabled,
  trashItems,
} from './treeUtils';

function node(partial: Partial<FileManagerNode> & Pick<FileManagerNode, 'par_codigo'>): FileManagerNode {
  return {
    par_codigo_pai: null,
    tipo: 0,
    nome: 'n',
    descricao: null,
    tamanho: null,
    data: null,
    ace_codigo: null,
    pasta_fixa: false,
    in_lixeira: false,
    ...partial,
  };
}

describe('treeUtils', () => {
  const folder = node({ par_codigo: 1, tipo: 0, nome: 'Entrada' });
  const file = node({ par_codigo: 2, tipo: 1, par_codigo_pai: 1, nome: 'a.pdf' });
  const trashed = node({ par_codigo: 3, tipo: 1, in_lixeira: true, nome: 'old.pdf' });

  it('lists folders outside the trash', () => {
    expect(folderOptions([folder, file, trashed]).map((item) => item.par_codigo)).toEqual([1]);
  });

  it('nests children and isolates trash', () => {
    expect(childrenOf([folder, file, trashed], null).map((item) => item.par_codigo)).toEqual([1]);
    expect(childrenOf([folder, file, trashed], 1).map((item) => item.par_codigo)).toEqual([2]);
    expect(trashItems([folder, file, trashed]).map((item) => item.par_codigo)).toEqual([3]);
  });

  it('formats size in Kb and maps log actions', () => {
    expect(formatKb(20480)).toBe('20 Kb');
    expect(formatKb(null)).toBe('');
    expect(historicoAcaoLabel('INSERT')).toBe('Inseriu');
    expect(historicoAcaoLabel('DELETE')).toBe('Excluiu');
    expect(historicoAcaoLabel('X')).toBe('X');
  });

  it('treats 3.01 desabilita 1/true as locked writes', () => {
    expect(isFileManagerDisabled(undefined)).toBe(false);
    expect(isFileManagerDisabled(0)).toBe(false);
    expect(isFileManagerDisabled(false)).toBe(false);
    expect(isFileManagerDisabled(1)).toBe(true);
    expect(isFileManagerDisabled(true)).toBe(true);
  });
});
