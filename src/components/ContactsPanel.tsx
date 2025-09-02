import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Video, 
  MoreHorizontal,
  UserPlus,
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockContacts = [
  {
    id: '1',
    name: 'Mario Rossi',
    status: 'online',
    lastSeen: 'Ora',
    phone: '+39 347 123 4567',
    email: 'mario.rossi@email.com',
    channels: ['phone', 'email', 'whatsapp'],
    unreadMessages: 3,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Mario Rossi'
  },
  {
    id: '2',
    name: 'Anna Bianchi',
    status: 'away',
    lastSeen: '5 min fa',
    phone: '+39 340 987 6543',
    email: 'anna.bianchi@email.com',
    channels: ['phone', 'email', 'teams'],
    unreadMessages: 0,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Anna Bianchi'
  },
  {
    id: '3',
    name: 'Luigi Verdi',
    status: 'busy',
    lastSeen: '1 ora fa',
    phone: '+39 333 555 7777',
    email: 'luigi.verdi@email.com',
    channels: ['phone', 'email'],
    unreadMessages: 1,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Luigi Verdi'
  },
  {
    id: '4',
    name: 'Giulia Neri',
    status: 'offline',
    lastSeen: '2 ore fa',
    phone: '+39 328 444 9999',
    email: 'giulia.neri@email.com',
    channels: ['phone', 'email', 'whatsapp', 'teams'],
    unreadMessages: 0,
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Giulia Neri'
  }
];

export const ContactsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success border-success';
      case 'away': return 'bg-warning border-warning';
      case 'busy': return 'bg-destructive border-destructive';
      case 'offline': return 'bg-muted-foreground border-muted-foreground';
      default: return 'bg-muted-foreground border-muted-foreground';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'phone': return <Phone className="h-3 w-3" />;
      case 'email': return <Mail className="h-3 w-3" />;
      case 'whatsapp': return <MessageSquare className="h-3 w-3" />;
      case 'teams': return <Video className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'phone': return 'text-windtre-orange bg-windtre-orange/10';
      case 'email': return 'text-windtre-purple bg-windtre-purple/10';
      case 'whatsapp': return 'text-success bg-success/10';
      case 'teams': return 'text-info bg-info/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Contatti</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Filter className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <UserPlus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Cerca contatti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 pl-7 text-xs glass border-border/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="glass-strong border-border/30 hover:glass transition-all duration-200 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="text-xs bg-gradient-primary text-white">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-medium truncate">{contact.name}</h4>
                    {contact.unreadMessages > 0 && (
                      <Badge variant="destructive" className="h-4 w-4 p-0 text-xs flex items-center justify-center">
                        {contact.unreadMessages}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{contact.lastSeen}</p>
                  
                  <div className="flex items-center gap-1">
                    {contact.channels.map((channel) => (
                      <Button
                        key={channel}
                        variant="ghost"
                        size="icon"
                        className={`h-5 w-5 rounded-full ${getChannelColor(channel)}`}
                      >
                        {getChannelIcon(channel)}
                      </Button>
                    ))}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-border/50">
                        <DropdownMenuItem className="text-xs">
                          <Phone className="h-3 w-3 mr-2" />
                          Chiama
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">
                          <Mail className="h-3 w-3 mr-2" />
                          Invia Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-2" />
                          Messaggio
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-3 border-t border-border/50">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="glass-orange" size="sm" className="text-xs h-7">
            <Phone className="h-3 w-3 mr-1" />
            Chiama
          </Button>
          <Button variant="glass-purple" size="sm" className="text-xs h-7">
            <MessageSquare className="h-3 w-3 mr-1" />
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
};