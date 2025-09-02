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
      <div className="min-h-screen w-full">
        {/* 1. Header fisso trasparente */}
        <EnterpriseHeader />
        
        {/* Layout principale a 4 blocchi */}
        <div className="flex w-full h-screen pt-16">
          {/* 2. Sidebar sinistra - fissa dinamica full height */}
          <EnterpriseSidebar />
          
          {/* 3. Div centrale con scroll proprio */}
          <main className={cn(
            "flex-1 h-full overflow-y-auto bg-gradient-to-br from-background to-muted/30",
            isRightSidebarOpen ? "mr-96" : "mr-12"
          )}>
            <div className="p-6 min-h-full">
              {children}
            </div>
          </main>
        </div>

        {/* 4. Sidebar destra con scroll interno e bordi integrati */}
        <RightSidebar 
          isOpen={isRightSidebarOpen} 
          onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
        />
      </div>
    </SidebarProvider>
  );
};