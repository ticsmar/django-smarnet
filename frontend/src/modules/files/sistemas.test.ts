import { describe, expect, it } from 'vitest';
import { hostEmbedFor, SISTEMA_CLIENTE } from './sistemas';

describe('FILE_MANAGER_HOSTS', () => {
  it('links Cliente to file manager code 7', () => {
    expect(SISTEMA_CLIENTE).toBe(7);
    const host = hostEmbedFor(SISTEMA_CLIENTE);
    expect(host?.filtroKey).toBe('CLIENTE.CODIGO');
    expect(host?.route).toBe('/app/commercial/customers');
  });

  it('reserves Proposta and OS without a Novo screen yet', () => {
    expect(hostEmbedFor(1)?.filtroKey).toBe('PRP_CODIGO');
    expect(hostEmbedFor(1)?.route).toBeUndefined();
    expect(hostEmbedFor(2)?.filtroKey).toBe('ORDER_NO');
    expect(hostEmbedFor(3)).toBeUndefined();
  });
});
