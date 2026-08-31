import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { PageBreadcrumbBar } from "@/components/PageBreadcrumbBar";
import { PageBreadcrumbProvider } from "@/contexts/PageBreadcrumbContext";

export function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <SidebarProvider defaultOpen className="h-svh min-h-0 overflow-hidden">
      <PageBreadcrumbProvider>
        <div className="flex h-full min-h-0 w-full bg-surface-container-low">
          <AppSidebar />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <TopNav />
            <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto px-3 pb-[max(3rem,env(safe-area-inset-bottom))] pt-3 sm:px-4 sm:pt-4">
              <PageBreadcrumbBar />
              {children ?? <Outlet />}
            </main>
          </div>
        </div>
      </PageBreadcrumbProvider>
    </SidebarProvider>
  );
}
