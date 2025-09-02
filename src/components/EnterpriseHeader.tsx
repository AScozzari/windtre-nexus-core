import { useState } from 'react';
import { Bell, Search, Settings, User, Store, X } from 'lucide-react';
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

const windtreLogo = '/lovable-uploads/0729be2a-b1da-4ecc-a1d4-321013db32d6.png';

export const EnterpriseHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedStore, setSelectedStore] = useState('Windtre Milano');
  const navigate = useNavigate();

  const stores = [
    'Windtre Milano',
    'Windtre Napoli', 
    'Windtre Fiumicino'
  ];

  return (
    <header className="glass-strong border-b border-border/50 p-4 relative">
      <div className="flex items-center justify-between">
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          
          <div className="flex items-center gap-3">
            <img 
              src={windtreLogo} 
              alt="WindTre W3 Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Windtre Suite
              </h1>
              <p className="text-xs text-muted-foreground">Multitenant Dashboard</p>
            </div>
          </div>
        </div>

        {/* Center - Smart Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
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

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2">
          {/* Tenant Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="sm" className="gap-2">
                <Store className="h-4 w-4" />
                <span className="hidden sm:inline">{selectedStore}</span>
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

          {/* Settings - REMOVED */}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuLabel>Il mio Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profilo</DropdownMenuItem>
              <DropdownMenuItem>Impostazioni</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};