import { ReactNode } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { EnterpriseSidebar } from './EnterpriseSidebar';
import { EnterpriseHeader } from './EnterpriseHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';

interface EnterpriseLayoutProps {
  children: ReactNode;
}

export const EnterpriseLayout = ({ children }: EnterpriseLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <EnterpriseSidebar />
        
        <div className="flex-1 flex flex-col">
          <EnterpriseHeader />
          
          <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/30 pr-96">
            {children}
          </main>
        </div>

        <WorkspaceSidebar />
      </div>
    </SidebarProvider>
  );
};