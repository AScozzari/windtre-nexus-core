import { ReactNode } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { EnterpriseSidebar } from './EnterpriseSidebar';
import { EnterpriseHeader } from './EnterpriseHeader';

interface EnterpriseLayoutProps {
  children: ReactNode;
}

export const EnterpriseLayout = ({ children }: EnterpriseLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EnterpriseSidebar />
        
        <div className="flex-1 flex flex-col">
          <EnterpriseHeader />
          
          <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};