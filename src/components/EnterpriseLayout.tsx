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
      {/* Header fisso che copre tutto */}
      <EnterpriseHeader />
      
      <div className="min-h-screen flex w-full relative pt-16">
        <EnterpriseSidebar />
        
        <div className={cn("flex-1 flex flex-col min-w-0 h-screen", isRightSidebarOpen ? "lg:pr-96" : "lg:pr-12")}>
          <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/30 overflow-y-auto">
            {children}
          </main>
        </div>

        <RightSidebar 
          isOpen={isRightSidebarOpen} 
          onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
        />
      </div>
    </SidebarProvider>
  );
};