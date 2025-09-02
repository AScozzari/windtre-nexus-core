import { useState } from 'react';
import { ReactNode } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { EnterpriseSidebar } from './EnterpriseSidebar';
import { EnterpriseHeader } from './EnterpriseHeader';
import { RightSidebar } from './RightSidebar';
import { cn } from '@/lib/utils';

interface EnterpriseLayoutProps {
  children: ReactNode;
}

export const EnterpriseLayout = ({ children }: EnterpriseLayoutProps) => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Header sticky in alto per tutta la larghezza */}
        <EnterpriseHeader />
        
        {/* Container per sidebar e contenuto sotto l'header */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar sinistra con z-index appropriato */}
          <EnterpriseSidebar />
          
          {/* Contenuto principale */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className={cn("flex flex-1", isRightSidebarOpen ? "lg:pr-96" : "lg:pr-12")}>
              <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/30 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>

          {/* Sidebar destra con z-index appropriato */}
          <RightSidebar 
            isOpen={isRightSidebarOpen} 
            onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
          />
        </div>
      </div>
    </SidebarProvider>
  );
};