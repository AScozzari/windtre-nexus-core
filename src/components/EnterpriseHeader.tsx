import { useState } from 'react';
import { Bell, Search, Settings, User, Store, X, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const windtreLogo = '/lovable-uploads/0729be2a-b1da-4ecc-a1d4-321013db32d6.png';

export const EnterpriseHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedStore, setSelectedStore] = useState('Windtre Milano');
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout eseguito",
      description: "Sei stato disconnesso dal sistema",
    });
    navigate('/login');
  };

  const stores = [
    'Windtre Milano',
    'Windtre Napoli', 
    'Windtre Fiumicino'
  ];

  return (
    <header className={`glass-strong border-b border-border/50 relative ${isMobile ? 'px-3 py-2' : 'p-4'}`}>
      <div className="flex items-center justify-between">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center gap-2">
          {isMobile && <SidebarTrigger />}
          
          <div className="flex items-center gap-2">
            <img 
              src={windtreLogo} 
              alt="WindTre W3 Logo" 
              className={`object-contain ${isMobile ? 'h-8' : 'h-10'} w-auto`}
            />
            {!isMobile && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Windtre Suite
                </h1>
                <p className="text-xs text-muted-foreground">Multitenant Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Center - Smart Search (solo desktop) */}
        {!isMobile && (
          <div className="flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca clienti, contratti, fatture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass border-border/50 focus:border-windtre-orange/50"
              />
            </div>
          </div>
        )}

        {/* Right Side - Actions */}
        <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
          {/* Tenant Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size={isMobile ? "icon" : "sm"} className={!isMobile ? "gap-2" : ""}>
                <Store className="h-4 w-4" />
                {!isMobile && <span className="hidden sm:inline">{selectedStore}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuLabel>Seleziona Negozio</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {stores.map((store) => (
                <DropdownMenuItem 
                  key={store}
                  onClick={() => setSelectedStore(store)}
                  className={selectedStore === store ? "bg-accent" : ""}
                >
                  {store} {selectedStore === store && "(Attuale)"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="glass" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profilo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Impostazioni
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar (quando necessaria) */}
      {isMobile && searchTerm && (
        <div className="mt-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass border-border/50 focus:border-windtre-orange/50"
          />
        </div>
      )}
    </header>
  );
};