import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Plus,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  MoreHorizontal,
  Edit,
  Eye,
  Building2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockDipendenti = [
  {
    id: 'EMP-001',
    nome: 'Marco Bianchi',
    cognome: 'Bianchi',
    email: 'marco.bianchi@windtre.it',
    telefono: '+39 347 123 4567',
    ruolo: 'Store Manager',
    dipartimento: 'Vendite',
    negozio: 'Milano Centro - VIA001',
    ragioneSociale: 'WindTre Retail Nord SRL',
    dataAssunzione: '15/01/2022',
    contratto: 'Tempo Indeterminato',
    stipendio: '€3.200/mese',
    status: 'Attivo',
    orarioLavoro: 'Full-time',
    ferie: { usate: 12, disponibili: 26 },
    permessi: { usati: 3, disponibili: 8 }
  },
  {
    id: 'EMP-002',
    nome: 'Anna Rossi',
    cognome: 'Rossi',
    email: 'anna.rossi@windtre.it',
    telefono: '+39 340 987 6543',
    ruolo: 'Consulente Vendite',
    dipartimento: 'Vendite',
    negozio: 'Roma EUR - VIA002',
    ragioneSociale: 'WindTre Retail Centro SRL',
    dataAssunzione: '22/06/2023',
    contratto: 'Tempo Determinato',
    stipendio: '€1.800/mese',
    status: 'Attivo',
    orarioLavoro: 'Full-time',
    ferie: { usate: 8, disponibili: 20 },
    permessi: { usati: 1, disponibili: 6 }
  },
  {
    id: 'EMP-003',
    nome: 'Luigi Verdi',
    cognome: 'Verdi',
    email: 'luigi.verdi@windtre.it',
    telefono: '+39 333 555 7777',
    ruolo: 'Tecnico Installazioni',
    dipartimento: 'Tecnico',
    negozio: 'Napoli Centro - VIA003',
    ragioneSociale: 'WindTre Retail Sud SRL',
    dataAssunzione: '10/03/2021',
    contratto: 'Tempo Indeterminato',
    stipendio: '€2.400/mese',
    status: 'In Ferie',
    orarioLavoro: 'Full-time',
    ferie: { usate: 18, disponibili: 26 },
    permessi: { usati: 4, disponibili: 8 }
  },
  {
    id: 'EMP-004',
    nome: 'Giulia Neri',
    cognome: 'Neri',
    email: 'giulia.neri@windtre.it',
    telefono: '+39 328 444 9999',
    ruolo: 'HR Specialist',
    dipartimento: 'Risorse Umane',
    negozio: 'Sede Centrale - HQ001',
    ragioneSociale: 'WindTre Corporate SPA',
    dataAssunzione: '05/09/2020',
    contratto: 'Tempo Indeterminato',
    stipendio: '€2.800/mese',
    status: 'Attivo',
    orarioLavoro: 'Full-time',
    ferie: { usate: 22, disponibili: 26 },
    permessi: { usati: 6, disponibili: 8 }
  },
  {
    id: 'EMP-005',
    nome: 'Francesco Blu',
    cognome: 'Blu',
    email: 'francesco.blu@windtre.it',
    telefono: '+39 339 111 2222',
    ruolo: 'Consulente Part-time',
    dipartimento: 'Vendite',
    negozio: 'Torino Centro - VIA004',
    ragioneSociale: 'WindTre Retail Nord SRL',
    dataAssunzione: '12/11/2023',
    contratto: 'Part-time',
    stipendio: '€1.200/mese',
    status: 'Attivo',
    orarioLavoro: 'Part-time',
    ferie: { usate: 4, disponibili: 13 },
    permessi: { usati: 1, disponibili: 4 }
  }
];

const HRDipendenti = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dipartimentoFilter, setDipartimentoFilter] = useState('all');
  const [ragioneSocialeFilter, setRagioneSocialeFilter] = useState('all');

  const filteredDipendenti = mockDipendenti.filter(dipendente => {
    const matchesSearch = 
      `${dipendente.nome} ${dipendente.cognome}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dipendente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dipendente.telefono.includes(searchTerm) ||
      dipendente.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dipendente.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesDipartimento = dipartimentoFilter === 'all' || dipendente.dipartimento === dipartimentoFilter;
    const matchesRagioneSociale = ragioneSocialeFilter === 'all' || dipendente.ragioneSociale === ragioneSocialeFilter;
    
    return matchesSearch && matchesStatus && matchesDipartimento && matchesRagioneSociale;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'attivo':
        return <Badge variant="default" className="bg-success text-success-foreground">Attivo</Badge>;
      case 'in ferie':
        return <Badge variant="outline" className="border-warning text-warning">In Ferie</Badge>;
      case 'malattia':
        return <Badge variant="outline" className="border-destructive text-destructive">Malattia</Badge>;
      case 'sospeso':
        return <Badge variant="destructive">Sospeso</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRuoloColor = (ruolo: string) => {
    const colors: { [key: string]: string } = {
      'Store Manager': 'text-windtre-orange bg-windtre-orange/10',
      'Consulente Vendite': 'text-windtre-purple bg-windtre-purple/10',
      'Tecnico Installazioni': 'text-success bg-success/10',
      'HR Specialist': 'text-info bg-info/10',
      'Consulente Part-time': 'text-warning bg-warning/10'
    };
    return colors[ruolo] || 'text-muted-foreground bg-muted/10';
  };

  const stats = {
    totale: mockDipendenti.length,
    attivi: mockDipendenti.filter(d => d.status === 'Attivo').length,
    inFerie: mockDipendenti.filter(d => d.status === 'In Ferie').length,
    partTime: mockDipendenti.filter(d => d.orarioLavoro === 'Part-time').length
  };

  const ragioneSociali = [...new Set(mockDipendenti.map(d => d.ragioneSociale))];
  const dipartimenti = [...new Set(mockDipendenti.map(d => d.dipartimento))];

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gestione Dipendenti
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestisci il personale di tutte le ragioni sociali e negozi
            </p>
          </div>
          <Button variant="enterprise" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuovo Dipendente
          </Button>
        </div>

        {/* HR Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="glass-strong border-windtre-orange/20 hover:shadow-glow-orange transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="h-5 w-5 text-windtre-orange" />
                <span className="text-sm font-medium">Dipendenti Totali</span>
              </div>
              <div className="text-2xl font-bold text-windtre-orange">{stats.totale}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-success/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Attivi</span>
              </div>
              <div className="text-2xl font-bold text-success">{stats.attivi}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-warning/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">In Ferie</span>
              </div>
              <div className="text-2xl font-bold text-warning">{stats.inFerie}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-windtre-purple/20 hover:shadow-glow-purple transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-windtre-purple" />
                <span className="text-sm font-medium">Part-Time</span>
              </div>
              <div className="text-2xl font-bold text-windtre-purple">{stats.partTime}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-strong border-border/50 mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filtri e Ricerca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca dipendente..."
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
                  <SelectItem value="in-ferie">In Ferie</SelectItem>
                  <SelectItem value="malattia">Malattia</SelectItem>
                  <SelectItem value="sospeso">Sospeso</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dipartimentoFilter} onValueChange={setDipartimentoFilter}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Dipartimento" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="all">Tutti i dipartimenti</SelectItem>
                  {dipartimenti.map(dip => (
                    <SelectItem key={dip} value={dip}>{dip}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={ragioneSocialeFilter} onValueChange={setRagioneSocialeFilter}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Ragione Sociale" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="all">Tutte le ragioni sociali</SelectItem>
                  {ragioneSociali.map(ragione => (
                    <SelectItem key={ragione} value={ragione}>
                      {ragione.replace(' SRL', '').replace(' SPA', '')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="glass-orange" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtri Avanzati
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employees List */}
      <div className="grid gap-4">
        {filteredDipendenti.map((dipendente, index) => (
          <Card 
            key={dipendente.id} 
            className="glass-strong border-border/50 hover:glass transition-all duration-300 animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${dipendente.nome} ${dipendente.cognome}`} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {dipendente.nome.charAt(0)}{dipendente.cognome.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{dipendente.nome} {dipendente.cognome}</h3>
                      {getStatusBadge(dipendente.status)}
                      <Badge variant="outline" className="text-xs">
                        {dipendente.id}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-sm ${getRuoloColor(dipendente.ruolo)}`}
                      >
                        {dipendente.ruolo}
                      </Badge>
                      <span className="text-muted-foreground mx-2">•</span>
                      <span className="text-sm font-medium">{dipendente.dipartimento}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {dipendente.telefono}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {dipendente.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {dipendente.negozio}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {dipendente.ragioneSociale.replace(' SRL', '').replace(' SPA', '')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-windtre-purple mb-1">
                    {dipendente.stipendio}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {dipendente.contratto} - {dipendente.orarioLavoro}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dal {dipendente.dataAssunzione}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Ferie & Permessi</h4>
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span>Ferie:</span>
                      <span>{dipendente.ferie.usate}/{dipendente.ferie.disponibili}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Permessi:</span>
                      <span>{dipendente.permessi.usati}/{dipendente.permessi.disponibili}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Informazioni Contrattuali</h4>
                  <div className="text-xs text-muted-foreground">
                    <p>Contratto: {dipendente.contratto}</p>
                    <p>Orario: {dipendente.orarioLavoro}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="glass" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Dettagli
                  </Button>
                  <Button variant="glass-orange" size="sm" className="gap-1">
                    <Edit className="h-4 w-4" />
                    Modifica
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass border-border/50">
                      <DropdownMenuItem>Gestisci Ferie</DropdownMenuItem>
                      <DropdownMenuItem>Storico Presenze</DropdownMenuItem>
                      <DropdownMenuItem>Documenti</DropdownMenuItem>
                      <DropdownMenuItem>Valutazioni</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDipendenti.length === 0 && (
        <Card className="glass-strong border-border/50 mt-8">
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">Nessun dipendente trovato</h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri di ricerca o aggiungi un nuovo dipendente.
            </p>
            <Button variant="enterprise" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Dipendente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HRDipendenti;