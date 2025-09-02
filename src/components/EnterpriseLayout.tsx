import { ReactNode, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { EnterpriseSidebar } from './EnterpriseSidebar';
import { EnterpriseHeader } from './EnterpriseHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';

interface EnterpriseLayoutProps {
  children: ReactNode;
}

export const EnterpriseLayout = ({ children }: EnterpriseLayoutProps) => {
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <EnterpriseSidebar onCollapseChange={setLeftSidebarCollapsed} />
        
        <div className="flex-1 flex flex-col">
          <div className="sticky top-0 z-40">
            <EnterpriseHeader />
          </div>
          
          <main className={`flex-1 p-6 bg-gradient-to-br from-background to-muted/30 transition-all duration-300 ${
            workspaceCollapsed ? 'pr-16' : 'pr-96'
          } ${leftSidebarCollapsed ? 'pl-16' : 'pl-6'}`}>
            {children}
          </main>
        </div>

        <WorkspaceSidebar 
          onCollapseChange={setWorkspaceCollapsed}
        />
      </div>
    </SidebarProvider>
  );
};