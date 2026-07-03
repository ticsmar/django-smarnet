import { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { ArrowLeftCircle, Shield } from 'lucide-react';

export function AdminLayout({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-zinc-950">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Admin TopNav — dark */}
          <nav className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800">
            <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-zinc-400 hover:text-zinc-100" />
                <div className="hidden md:flex items-center gap-2 text-zinc-400">
                  <Shield size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    Modo Administrador
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/app')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-amber-300 hover:bg-amber-500/10 transition-colors border border-amber-500/30"
              >
                <ArrowLeftCircle size={14} />
                Retornar ao ERP
              </button>
            </div>
          </nav>
          <main className="flex-1 pt-4 pb-12 px-6 lg:px-8 max-w-[1600px] w-full mx-auto text-zinc-200">
            {children ?? <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
