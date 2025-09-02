import { ReactNode, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { EnterpriseSidebar } from './EnterpriseSidebar';
import { EnterpriseHeader } from './EnterpriseHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnterpriseLayoutProps {
  children: ReactNode;
}

export const EnterpriseLayout = ({ children }: EnterpriseLayoutProps) => {
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(true);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full relative">
        {/* Header sopra tutto */}
        <div className="sticky top-0 z-40 w-full">
          <EnterpriseHeader />
        </div>
        
        {/* Contenuto sotto l'header */}
        <div className="flex flex-1 relative">
          <EnterpriseSidebar onCollapseChange={setLeftSidebarCollapsed} />
          
          <main className={`flex-1 transition-all duration-300 bg-gradient-to-br from-background to-muted/30 ${
            isMobile 
              ? 'p-4' 
              : `p-6 ${workspaceCollapsed ? 'pr-16' : 'pr-96'}`
          }`}>
            {children}
          </main>
          
          {!isMobile && (
            <WorkspaceSidebar 
              onCollapseChange={setWorkspaceCollapsed}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};