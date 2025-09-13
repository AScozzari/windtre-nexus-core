import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Settings, User, Shield, Building2 } from "lucide-react";
import { useAuth } from '@/core/providers/AuthProvider';
import { useRBAC } from '@/core/providers/RBACProvider';
import heroImage from "@/assets/hero-dashboard.jpg";
import w3Logo from "@/assets/w3c-logo.png";
import windtreLogo from "@/assets/windtre-logo.png";

export const AppHeader = () => {
  const { user, logout, tenant } = useAuth();
  const { hasRole } = useRBAC();

  if (!user) return null;

  const userInitials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const primaryRole = user.roles[0]; // Get primary role for display

  return (
    <header className="h-16 glass-subtle border-b border-white/10 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="md:hidden" />
        
        <div className="flex items-center space-x-3">
          <img src={w3Logo} alt="W3" className="h-8 w-8" />
          <img src={windtreLogo} alt="WindTre" className="h-8 w-auto" />
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-white">W3 Suite</h1>
            <p className="text-xs text-white/70">{tenant}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
              <Avatar className="h-10 w-10 border-2 border-white/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 mr-4 glass-subtle border-white/10" align="end">
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-white/70">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-white/70" />
                  <span className="text-sm text-white/70">Tenant:</span>
                  <Badge variant="secondary" className="text-xs">{tenant}</Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-white/70" />
                  <span className="text-sm text-white/70">Ruolo:</span>
                  <Badge variant="outline" className="text-xs border-white/20 text-white">
                    {primaryRole?.role_name}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-white/70">Status:</span>
                  <span className="text-sm text-white capitalize">{user.status}</span>
                </div>
              </div>
            </div>
            
            <DropdownMenuSeparator className="bg-white/10" />
            
            <DropdownMenuItem className="hover:bg-white/10 text-white">
              <User className="mr-2 h-4 w-4" />
              <span>Profilo</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="hover:bg-white/10 text-white">
              <Settings className="mr-2 h-4 w-4" />
              <span>Impostazioni</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-white/10" />
            
            <DropdownMenuItem 
              onClick={logout}
              className="hover:bg-white/10 text-red-400 hover:text-red-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};