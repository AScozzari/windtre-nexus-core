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
    <div className="min-h-screen w-full relative">
      {/* Header fisso in alto */}
      <EnterpriseHeader />
      
      {/* Layout principale sotto l'header */}
      <SidebarProvider>
        <div className="flex w-full h-[calc(100vh-4rem)] pt-16">
          {/* Sidebar sinistra */}
          <EnterpriseSidebar />
          
          {/* Contenuto principale */}
          <main className={cn(
            "flex-1 overflow-y-auto bg-gradient-to-br from-background to-muted/30 p-6",
            isRightSidebarOpen ? "mr-96" : "mr-12"
          )}>
            <div className="max-w-full h-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>

      {/* Sidebar destra */}
      <RightSidebar 
        isOpen={isRightSidebarOpen} 
        onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
      />
    </div>
  );
};