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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        {/* Left Sidebar */}
        <EnterpriseSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <EnterpriseHeader />
          
          {/* Main Content */}
          <main className={cn(
            "flex-1 overflow-y-auto bg-gradient-to-br from-background to-muted/30",
            "transition-all duration-500 ease-in-out",
            isRightSidebarOpen ? "mr-96" : "mr-12"
          )}>
            <div className="p-6 min-h-full">
              {children}
            </div>
          </main>
        </div>

        {/* Right Sidebar */}
        <RightSidebar 
          isOpen={isRightSidebarOpen} 
          onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
        />
      </div>
    </SidebarProvider>
  );
};