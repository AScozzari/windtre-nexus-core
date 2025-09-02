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
      {/* Professional Layout Container */}
      <div className="layout-container">
        
        {/* 1. Fixed Header with Glassmorphism */}
        <EnterpriseHeader />
        
        {/* 2. Main Layout Content Area */}
        <div className="layout-content">
          
          {/* 3. Left Sidebar - Fixed height, no scroll interference */}
          <EnterpriseSidebar />
          
          {/* 4. Central Content - Independent scroll */}
          <main className={cn(
            "layout-main bg-gradient-to-br from-background to-muted/30",
            "transition-all duration-500 ease-in-out",
            isRightSidebarOpen ? "mr-96" : "mr-12"
          )}>
            <div className="p-6 min-h-full">
              {children}
            </div>
          </main>
          
        </div>

        {/* 5. Right Sidebar - Fixed positioning */}
        <div className="layout-sidebar-right">
          <RightSidebar 
            isOpen={isRightSidebarOpen} 
            onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
          />
        </div>
        
      </div>
    </SidebarProvider>
  );
};