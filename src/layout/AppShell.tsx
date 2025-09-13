import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export const AppShell = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full relative">
        {/* Header fisso sopra tutto */}
        <div className="fixed top-0 left-0 right-0 z-50 w-full">
          <AppHeader />
        </div>
        
        {/* Contenuto sotto l'header */}
        <div className="flex flex-1 relative pt-16">
          <AppSidebar />
          
          <main className={`flex-1 transition-all duration-300 bg-gradient-to-br from-background to-muted/30 ${
            isMobile ? 'p-3 pt-2' : 'p-6'
          }`}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};