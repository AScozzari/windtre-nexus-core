import { useState } from 'react';
import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  MoreHorizontal,
  Eye,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockClienti = [
  {
    id: '001',
    nome: 'Mario Rossi',
    telefono: '+39 347 123 4567',
    email: 'mario.rossi@email.com',
    citta: 'Milano',
    servizi: ['Mobile', 'Fibra'],
    status: 'Attivo',
    fatturato: '€89.90/mese',
    dataRegistrazione: '15/01/2024'
  },
  {
    id: '002',
    nome: 'Anna Bianchi',
    telefono: '+39 340 987 6543',
    email: 'anna.bianchi@email.com',
    citta: 'Roma',
    servizi: ['Mobile', 'Energia'],
    status: 'Attivo',
    fatturato: '€125.50/mese',
    dataRegistrazione: '22/02/2024'
  },
  {
    id: '003',
    nome: 'Luigi Verdi',
    telefono: '+39 333 555 7777',
    email: 'luigi.verdi@email.com',
    citta: 'Napoli',
    servizi: ['Fibra'],
    status: 'Sospeso',
    fatturato: '€39.90/mese',
    dataRegistrazione: '03/03/2024'
  },
  {
    id: '004',
    nome: 'Giulia Neri',
    telefono: '+39 328 444 9999',
    email: 'giulia.neri@email.com',
    citta: 'Torino',
    servizi: ['Mobile', 'Fibra', 'Energia'],
    status: 'Attivo',
    fatturato: '€179.90/mese',
    dataRegistrazione: '10/01/2024'
  },
  {
    id: '005',
    nome: 'Marco Ferrari',
    telefono: '+39 339 111 2222',
    email: 'marco.ferrari@email.com',
    citta: 'Bologna',
    servizi: ['Business'],
    status: 'Attivo',
    fatturato: '€299.90/mese',
    dataRegistrazione: '05/02/2024'
  }
];

const Clienti = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cittaFilter, setCittaFilter] = useState('all');

  const filteredClienti = mockClienti.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.telefono.includes(searchTerm) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cliente.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCitta = cittaFilter === 'all' || cliente.citta === cittaFilter;
    
    return matchesSearch && matchesStatus && matchesCitta;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'attivo':
        return <Badge variant="default" className="bg-success text-success-foreground">Attivo</Badge>;
      case 'sospeso':
        return <Badge variant="destructive">Sospeso</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServicesBadge = (servizi: string[]) => {
    const colors: { [key: string]: string } = {
      'Mobile': 'bg-windtre-orange/20 text-windtre-orange border-windtre-orange/30',
      'Fibra': 'bg-windtre-purple/20 text-windtre-purple border-windtre-purple/30',
      'Energia': 'bg-warning/20 text-warning border-warning/30',
      'Business': 'bg-info/20 text-info border-info/30'
    };
    
    return servizi.map(servizio => (
      <Badge key={servizio} variant="outline" className={colors[servizio] || 'bg-muted'}>
        {servizio}
      </Badge>
    ));
  };

  return (
    <EnterpriseLayout>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gestione Clienti
            </h1>
            <p className="text-muted-foreground mt-2">
              Visualizza e gestisci tutti i clienti del tuo tenant
            </p>
          </div>
          <Button variant="enterprise" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuovo Cliente
          </Button>
        </div>

        {/* Filters */}
        <Card className="glass-strong border-border/50 mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filtri e Ricerca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-border/50"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="attivo">Attivo</SelectItem>
                  <SelectItem value="sospeso">Sospeso</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={cittaFilter} onValueChange={setCittaFilter}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Città" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="all">Tutte le città</SelectItem>
                  <SelectItem value="Milano">Milano</SelectItem>
                  <SelectItem value="Roma">Roma</SelectItem>
                  <SelectItem value="Napoli">Napoli</SelectItem>
                  <SelectItem value="Torino">Torino</SelectItem>
                  <SelectItem value="Bologna">Bologna</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="glass-orange" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtri Avanzati
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="glass-strong border-windtre-orange/20 hover:shadow-glow-orange transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-windtre-orange">{mockClienti.length}</div>
              <p className="text-sm text-muted-foreground">Clienti Totali</p>
            </CardContent>
          </Card>
          <Card className="glass-strong border-success/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {mockClienti.filter(c => c.status === 'Attivo').length}
              </div>
              <p className="text-sm text-muted-foreground">Clienti Attivi</p>
            </CardContent>
          </Card>
          <Card className="glass-strong border-destructive/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">
                {mockClienti.filter(c => c.status === 'Sospeso').length}
              </div>
              <p className="text-sm text-muted-foreground">Clienti Sospesi</p>
            </CardContent>
          </Card>
          <Card className="glass-strong border-windtre-purple/20 hover:shadow-glow-purple transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-windtre-purple">€734.10</div>
              <p className="text-sm text-muted-foreground">Fatturato Mensile</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {filteredClienti.map((cliente, index) => (
          <Card 
            key={cliente.id} 
            className="glass-strong border-border/50 hover:glass transition-all duration-300 animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${cliente.nome}`} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {cliente.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{cliente.nome}</h3>
                      {getStatusBadge(cliente.status)}
                      <Badge variant="outline" className="text-xs">
                        ID: {cliente.id}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {cliente.telefono}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {cliente.citta}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-windtre-purple">
                      {cliente.fatturato}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dal {cliente.dataRegistrazione}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {getServicesBadge(cliente.servizi)}
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass border-border/50">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizza Dettagli
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifica Cliente
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Chiama Cliente
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClienti.length === 0 && (
        <Card className="glass-strong border-border/50 mt-8">
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Nessun cliente trovato</h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri di ricerca o aggiungi un nuovo cliente.
            </p>
            <Button variant="enterprise" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Cliente
            </Button>
          </CardContent>
        </Card>
      )}
    </EnterpriseLayout>
  );
};

export default Clienti;