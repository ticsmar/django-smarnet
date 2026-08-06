import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNav } from '@/components/TopNav';
import { PageBreadcrumbBar } from '@/components/PageBreadcrumbBar';
import { PageBreadcrumbProvider } from '@/contexts/PageBreadcrumbContext';

export function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <SidebarProvider>
      <PageBreadcrumbProvider>
        <div className="min-h-screen flex w-full bg-surface-container-low">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <TopNav />
            <main className="flex-1 pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
              <PageBreadcrumbBar />
              {children ?? <Outlet />}
            </main>
          </div>
        </div>
      </PageBreadcrumbProvider>
    </SidebarProvider>
  );
}
