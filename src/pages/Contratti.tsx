import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText,
  Calendar,
  Euro,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pause
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const mockContratti = [
  {
    id: 'CTR-001',
    cliente: 'Mario Rossi',
    telefono: '+39 347 123 4567',
    piano: 'MIA Unlimited Full Easy Pay',
    servizio: 'Mobile',
    prezzo: '€29.90/mese',
    dataAttivazione: '15/01/2024',
    dataScadenza: '15/01/2026',
    status: 'Attivo',
    progressoMesi: 3,
    durataContratto: 24,
    fatturazione: 'Mensile'
  },
  {
    id: 'CTR-002',
    cliente: 'Anna Bianchi',
    telefono: '+39 340 987 6543',
    piano: 'Super Fibra 1000 Mega',
    servizio: 'Fibra',
    prezzo: '€39.90/mese',
    dataAttivazione: '22/02/2024',
    dataScadenza: '22/02/2026',
    status: 'Attivo',
    progressoMesi: 2,
    durataContratto: 24,
    fatturazione: 'Mensile'
  },
  {
    id: 'CTR-003',
    cliente: 'Luigi Verdi',
    telefono: '+39 333 555 7777',
    piano: 'WindTre Energia Casa',
    servizio: 'Energia',
    prezzo: '€85.50/mese',
    dataAttivazione: '03/03/2024',
    dataScadenza: '03/03/2025',
    status: 'Sospeso',
    progressoMesi: 1,
    durataContratto: 12,
    fatturazione: 'Bimestrale'
  },
  {
    id: 'CTR-004',
    cliente: 'Giulia Neri',
    telefono: '+39 328 444 9999',
    piano: 'Business Pro Package',
    servizio: 'Business',
    prezzo: '€199.90/mese',
    dataAttivazione: '10/01/2024',
    dataScadenza: '10/01/2027',
    status: 'Attivo',
    progressoMesi: 3,
    durataContratto: 36,
    fatturazione: 'Mensile'
  },
  {
    id: 'CTR-005',
    cliente: 'Marco Ferrari',
    telefono: '+39 339 111 2222',
    piano: 'Giga Unlimited Premium',
    servizio: 'Mobile',
    prezzo: '€19.90/mese',
    dataAttivazione: '05/02/2024',
    dataScadenza: '05/02/2025',
    status: 'In scadenza',
    progressoMesi: 11,
    durataContratto: 12,
    fatturazione: 'Mensile'
  }
];

const Contratti = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [servizioFilter, setServizioFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('tutti');

  const filteredContratti = mockContratti.filter(contratto => {
    const matchesSearch = contratto.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contratto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contratto.telefono.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || contratto.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesServizio = servizioFilter === 'all' || contratto.servizio === servizioFilter;
    
    let matchesTab = true;
    if (activeTab === 'attivi') matchesTab = contratto.status === 'Attivo';
    if (activeTab === 'scadenza') matchesTab = contratto.status === 'In scadenza' || 
      (contratto.durataContratto - contratto.progressoMesi) <= 2;
    if (activeTab === 'sospesi') matchesTab = contratto.status === 'Sospeso';
    
    return matchesSearch && matchesStatus && matchesServizio && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'attivo':
        return <Badge variant="default" className="bg-success text-success-foreground gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Attivo
        </Badge>;
      case 'sospeso':
        return <Badge variant="destructive" className="gap-1">
          <Pause className="h-3 w-3" />
          Sospeso
        </Badge>;
      case 'in scadenza':
        return <Badge variant="outline" className="border-warning text-warning gap-1">
          <AlertCircle className="h-3 w-3" />
          In Scadenza
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServizioColor = (servizio: string) => {
    const colors: { [key: string]: string } = {
      'Mobile': 'text-windtre-orange bg-windtre-orange/10',
      'Fibra': 'text-windtre-purple bg-windtre-purple/10',
      'Energia': 'text-warning bg-warning/10',
      'Business': 'text-info bg-info/10'
    };
    return colors[servizio] || 'text-muted-foreground bg-muted/10';
  };

  const calculateProgress = (progressoMesi: number, durataContratto: number) => {
    return (progressoMesi / durataContratto) * 100;
  };

  const getProgressColor = (progress: number) => {
    if (progress < 50) return 'bg-windtre-orange';
    if (progress < 80) return 'bg-windtre-purple';
    return 'bg-warning';
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gestione Contratti
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitora e gestisci tutti i contratti attivi del tuo tenant
            </p>
          </div>
          <Button variant="enterprise" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuovo Contratto
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="glass-strong border-windtre-orange/20 hover:shadow-glow-orange transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-windtre-orange" />
                <span className="text-sm font-medium">Contratti Totali</span>
              </div>
              <div className="text-2xl font-bold text-windtre-orange">{mockContratti.length}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-success/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Attivi</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {mockContratti.filter(c => c.status === 'Attivo').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-warning/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">In Scadenza</span>
              </div>
              <div className="text-2xl font-bold text-warning">
                {mockContratti.filter(c => c.status === 'In scadenza' || 
                  (c.durataContratto - c.progressoMesi) <= 2).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-windtre-purple/20 hover:shadow-glow-purple transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="h-5 w-5 text-windtre-purple" />
                <span className="text-sm font-medium">Ricavi Mensili</span>
              </div>
              <div className="text-2xl font-bold text-windtre-purple">€374.60</div>
            </CardContent>
          </Card>
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
                  placeholder="Cerca contratto..."
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
                  <SelectItem value="in-scadenza">In Scadenza</SelectItem>
                  <SelectItem value="sospeso">Sospeso</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={servizioFilter} onValueChange={setServizioFilter}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Servizio" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="all">Tutti i servizi</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Fibra">Fibra</SelectItem>
                  <SelectItem value="Energia">Energia</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
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

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="glass-strong border border-border/50">
          <TabsTrigger value="tutti">Tutti ({mockContratti.length})</TabsTrigger>
          <TabsTrigger value="attivi">
            Attivi ({mockContratti.filter(c => c.status === 'Attivo').length})
          </TabsTrigger>
          <TabsTrigger value="scadenza">
            In Scadenza ({mockContratti.filter(c => c.status === 'In scadenza' || 
              (c.durataContratto - c.progressoMesi) <= 2).length})
          </TabsTrigger>
          <TabsTrigger value="sospesi">
            Sospesi ({mockContratti.filter(c => c.status === 'Sospeso').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Contracts List */}
          <div className="grid gap-4">
            {filteredContratti.map((contratto, index) => (
              <Card 
                key={contratto.id} 
                className="glass-strong border-border/50 hover:glass transition-all duration-300 animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {contratto.id}
                        </Badge>
                        {getStatusBadge(contratto.status)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getServizioColor(contratto.servizio)}`}
                        >
                          {contratto.servizio}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-1">{contratto.cliente}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{contratto.telefono}</p>
                      <p className="text-sm font-medium text-foreground">{contratto.piano}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-windtre-purple mb-1">
                        {contratto.prezzo}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Fatturazione {contratto.fatturazione}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Attivazione:</span>
                        <span className="font-medium">{contratto.dataAttivazione}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Scadenza:</span>
                        <span className="font-medium">{contratto.dataScadenza}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso contratto:</span>
                        <span className="font-medium">
                          {contratto.progressoMesi}/{contratto.durataContratto} mesi
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(contratto.progressoMesi, contratto.durataContratto)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {contratto.durataContratto - contratto.progressoMesi} mesi rimanenti
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button variant="glass" size="sm">
                        Dettagli
                      </Button>
                      <Button variant="glass-orange" size="sm">
                        Modifica
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContratti.length === 0 && (
            <Card className="glass-strong border-border/50 mt-8">
              <CardContent className="text-center py-12">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-lg font-semibold mb-2">Nessun contratto trovato</h3>
                <p className="text-muted-foreground">
                  Prova a modificare i filtri di ricerca o aggiungi un nuovo contratto.
                </p>
                <Button variant="enterprise" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuovo Contratto
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Contratti;