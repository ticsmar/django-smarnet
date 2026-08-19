import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNav } from '@/components/TopNav';
import { PageBreadcrumbBar } from '@/components/PageBreadcrumbBar';
import { PageBreadcrumbProvider } from '@/contexts/PageBreadcrumbContext';

export function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <PageBreadcrumbProvider>
        <div className="flex min-h-svh w-full bg-surface-container-low">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopNav />
            <main className="mx-auto w-full max-w-[1600px] flex-1 px-3 pb-[max(3rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pt-4 lg:px-8">
              <PageBreadcrumbBar />
              {children ?? <Outlet />}
            </main>
          </div>
        </div>
      </PageBreadcrumbProvider>
    </SidebarProvider>
  );
}
