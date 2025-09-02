import { useState } from 'react';
import { Bell, Search, Settings, User, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const windtreLogo = '/lovable-uploads/0729be2a-b1da-4ecc-a1d4-321013db32d6.png';

export const EnterpriseHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 glass-strong border-b border-border/50 shadow-lg">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Side - Logo integrato e Navigation */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          
          <div className="flex items-center gap-3">
            {/* Logo W3 integrato nell'header */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-windtre-orange/10 to-windtre-purple/10 border border-windtre-orange/20">
              <img 
                src={windtreLogo} 
                alt="WindTre W3 Logo" 
                className="h-7 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-base font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                  WindTre Enterprise
                </h1>
                <p className="text-xs text-muted-foreground">Dashboard Unificato</p>
              </div>
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
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">WindTre Retail Nord SRL</span>
              <Badge variant="secondary" className="ml-1">Milano Centro</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass border-border/50 w-64">
            <DropdownMenuLabel>Seleziona Ragione Sociale & Negozio</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">WindTre Retail Nord SRL</span>
                <span className="text-xs text-muted-foreground">Milano Centro - VIA001 (Attuale)</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">WindTre Retail Centro SRL</span>
                <span className="text-xs text-muted-foreground">Roma EUR - VIA002</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">WindTre Retail Sud SRL</span>
                <span className="text-xs text-muted-foreground">Napoli Centro - VIA003</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">WindTre Corporate SPA</span>
                <span className="text-xs text-muted-foreground">Sede Centrale - HQ001</span>
              </div>
            </DropdownMenuItem>
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

          {/* Settings */}
          <Button variant="glass" size="icon">
            <Settings className="h-4 w-4" />
          </Button>

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