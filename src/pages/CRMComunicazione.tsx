import { useState } from 'react';
import { EnterpriseLayout } from '@/components/EnterpriseLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Mail, 
  Phone,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  PhoneCall,
  Video,
  Zap,
  Bot
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data per conversazioni
const mockConversations = [
  {
    id: 1,
    contact: "Marco Rossi",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Grazie per la proposta, quando possiamo sentirci?",
    timestamp: "10:30",
    channel: "whatsapp",
    status: "unread",
    messages: [
      {
        id: 1,
        sender: "Marco Rossi",
        content: "Ciao, sono interessato ai vostri servizi fibra",
        timestamp: "09:15",
        type: "received"
      },
      {
        id: 2,
        sender: "Tu",
        content: "Ciao Marco! Grazie per averci contattato. Ti invio subito una proposta personalizzata.",
        timestamp: "09:18",
        type: "sent"
      },
      {
        id: 3,
        sender: "Marco Rossi", 
        content: "Grazie per la proposta, quando possiamo sentirci?",
        timestamp: "10:30",
        type: "received"
      }
    ]
  },
  {
    id: 2,
    contact: "Laura Verde",
    avatar: "/api/placeholder/32/32",
    lastMessage: "La videochiamata è confermata per le 15:00",
    timestamp: "Ieri",
    channel: "email",
    status: "read",
    messages: [
      {
        id: 1,
        sender: "Laura Verde",
        content: "Buongiorno, volevo maggiori dettagli sui piani business",
        timestamp: "Ieri 14:20",
        type: "received"
      },
      {
        id: 2,
        sender: "Tu",
        content: "Certo Laura, possiamo organizzare una videochiamata per oggi pomeriggio?",
        timestamp: "Ieri 14:25",
        type: "sent"
      },
      {
        id: 3,
        sender: "Laura Verde",
        content: "La videochiamata è confermata per le 15:00",
        timestamp: "Ieri 15:00",
        type: "received"
      }
    ]
  },
  {
    id: 3,
    contact: "Andrea Neri",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Perfetto, procediamo con l'attivazione",
    timestamp: "2 ore fa",
    channel: "sms",
    status: "read",
    messages: []
  }
];

const channels = [
  { id: 'all', name: 'Tutti i Canali', icon: MessageSquare, color: 'text-gray-600' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'text-green-600' },
  { id: 'email', name: 'Email', icon: Mail, color: 'text-blue-600' },
  { id: 'sms', name: 'SMS', icon: Phone, color: 'text-orange-600' },
  { id: 'chat', name: 'Live Chat', icon: MessageSquare, color: 'text-purple-600' }
];

const CRMComunicazione = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = selectedChannel === 'all' || conv.channel === selectedChannel;
    return matchesSearch && matchesChannel;
  });

  const getChannelIcon = (channel: string) => {
    const channelData = channels.find(c => c.id === channel);
    return channelData ? channelData.icon : MessageSquare;
  };

  const getChannelColor = (channel: string) => {
    const channelData = channels.find(c => c.id === channel);
    return channelData ? channelData.color : 'text-gray-600';
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Logica per inviare messaggio
      console.log('Invio messaggio:', message);
      setMessage('');
    }
  };

  return (
    <EnterpriseLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Centro Comunicazioni
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestisci tutte le comunicazioni multicanale in un unico posto
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Automazioni
            </Button>
          </div>
        </div>

        {/* Main Communication Interface */}
        <div className="flex-1 grid lg:grid-cols-12 gap-6">
          {/* Sidebar Conversazioni */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            {/* Filtri Canali */}
            <Card className="glass-strong">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Canali</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {channels.map((channel) => {
                  const IconComponent = channel.icon;
                  return (
                    <Button
                      key={channel.id}
                      variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <IconComponent className={`h-4 w-4 mr-2 ${channel.color}`} />
                      {channel.name}
                      {channel.id !== 'all' && (
                        <Badge variant="outline" className="ml-auto">
                          {mockConversations.filter(c => c.channel === channel.id).length}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca conversazioni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-strong"
              />
            </div>

            {/* Lista Conversazioni */}
            <Card className="glass-strong flex-1 overflow-hidden">
              <CardContent className="p-0">
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {filteredConversations.map((conversation) => {
                    const ChannelIcon = getChannelIcon(conversation.channel);
                    return (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-b-0 ${
                          selectedConversation?.id === conversation.id ? 'bg-muted/50' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conversation.avatar} />
                              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                                {conversation.contact.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center ${
                              conversation.channel === 'whatsapp' ? 'bg-green-500' :
                              conversation.channel === 'email' ? 'bg-blue-500' :
                              conversation.channel === 'sms' ? 'bg-orange-500' : 'bg-purple-500'
                            }`}>
                              <ChannelIcon className="h-2 w-2 text-white" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">{conversation.contact}</h4>
                              <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          
                          {conversation.status === 'unread' && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Area Chat */}
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedConversation ? (
              <Card className="glass-strong h-full flex flex-col">
                {/* Header Conversazione */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {selectedConversation.contact.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.contact}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getChannelColor(selectedConversation.channel).replace('text-', 'bg-')}`}></div>
                          <span className="text-sm text-muted-foreground capitalize">
                            {selectedConversation.channel}
                          </span>
                          <Badge variant="outline">Online</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <PhoneCall className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messaggi */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.type === 'sent'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                          {msg.type === 'sent' && (
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Input Messaggio */}
                <div className="border-t p-4">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Textarea
                        placeholder="Scrivi un messaggio..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[40px] max-h-32 resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    
                    <Button onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Premi Invio per inviare, Shift+Invio per andare a capo</span>
                    <div className="flex items-center gap-2">
                      <span>Template</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        AI Suggest
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="glass-strong h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Seleziona una conversazione per iniziare</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default CRMComunicazione;