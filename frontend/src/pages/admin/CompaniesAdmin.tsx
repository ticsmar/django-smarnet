import { useState } from 'react';
import { Plus, Building2, MapPin, Users, X } from 'lucide-react';

interface Company {
  id: string;
  nome: string;
  cnpj: string;
  cidade: string;
  uf: string;
  usuarios: number;
  status: 'Ativa' | 'Inativa';
  tipo: 'Matriz' | 'Filial';
}

const initial: Company[] = [
  { id: '1', nome: 'Smar Matriz', cnpj: '12.345.678/0001-90', cidade: 'Sertãozinho', uf: 'SP', usuarios: 84, status: 'Ativa', tipo: 'Matriz' },
  { id: '2', nome: 'Smar SP', cnpj: '12.345.678/0002-71', cidade: 'São Paulo', uf: 'SP', usuarios: 22, status: 'Ativa', tipo: 'Filial' },
  { id: '3', nome: 'Smar MG', cnpj: '12.345.678/0003-52', cidade: 'Belo Horizonte', uf: 'MG', usuarios: 15, status: 'Ativa', tipo: 'Filial' },
  { id: '4', nome: 'Smar Sul', cnpj: '12.345.678/0004-33', cidade: 'Porto Alegre', uf: 'RS', usuarios: 6, status: 'Inativa', tipo: 'Filial' },
];

export default function CompaniesAdmin() {
  const [companies, setCompanies] = useState<Company[]>(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: '', cnpj: '', cidade: '', uf: 'SP', tipo: 'Filial' as 'Matriz' | 'Filial' });

  const handleCreate = () => {
    if (!form.nome || !form.cnpj) return;
    setCompanies([
      { id: String(Date.now()), ...form, usuarios: 0, status: 'Ativa' },
      ...companies,
    ]);
    setForm({ nome: '', cnpj: '', cidade: '', uf: 'SP', tipo: 'Filial' });
    setOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-zinc-100 flex items-center gap-2">
            <Building2 size={22} className="text-amber-400" /> Gestão de Empresas
          </h1>
          <p className="text-sm text-zinc-400">Matrizes, filiais e unidades vinculadas ao ERP.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-sm px-4 py-2 transition-colors"
        >
          <Plus size={16} /> Nova Empresa
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((c) => (
          <div key={c.id} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 hover:border-zinc-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Building2 size={20} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${c.status === 'Ativa' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-zinc-700/40 text-zinc-400'}`}>
                  {c.status}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400">{c.tipo}</span>
              </div>
            </div>
            <h3 className="font-bold text-zinc-100">{c.nome}</h3>
            <p className="text-xs text-zinc-500 mb-3">{c.cnpj}</p>
            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-3 border-t border-zinc-800">
              <span className="inline-flex items-center gap-1"><MapPin size={12} /> {c.cidade}, {c.uf}</span>
              <span className="inline-flex items-center gap-1"><Users size={12} /> {c.usuarios} usuários</span>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-zinc-100">Cadastrar Empresa</h3>
              <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-zinc-200"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Razão Social</label>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">CNPJ</label>
                <input value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                  placeholder="00.000.000/0000-00"
                  className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Cidade</label>
                  <input value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                    className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">UF</label>
                  <input value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })} maxLength={2}
                    className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tipo</label>
                <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as 'Matriz' | 'Filial' })}
                  className="w-full mt-1 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:border-amber-500/60">
                  <option>Matriz</option><option>Filial</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-xl text-sm text-zinc-300 hover:bg-zinc-800">Cancelar</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-900">Cadastrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
