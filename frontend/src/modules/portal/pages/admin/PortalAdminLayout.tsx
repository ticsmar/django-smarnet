import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PortalAdminSidebar } from '@/components/PortalAdminSidebar';
import { ArrowLeftCircle, Shield } from 'lucide-react';

export default function PortalAdminLayout() {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-zinc-950">
        <PortalAdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <nav className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800">
            <div className="px-4 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-zinc-400 hover:text-zinc-100" />
                <div className="hidden md:flex items-center gap-2 text-zinc-400">
                  <Shield size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    Portal · Admin
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/portal')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-amber-300 hover:bg-amber-500/10 transition-colors border border-amber-500/30"
              >
                <ArrowLeftCircle size={14} />
                Ver portal público
              </button>
            </div>
          </nav>
          <main className="flex-1 pt-4 pb-12 px-6 lg:px-8 max-w-[1600px] w-full mx-auto text-zinc-200">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
