import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download,
  FileText,
  Euro,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Eye
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

const mockFatture = [
  {
    id: 'FAT-2024-001',
    cliente: 'Mario Rossi',
    telefono: '+39 347 123 4567',
    importo: '€29.90',
    dataEmissione: '01/03/2024',
    dataScadenza: '31/03/2024',
    status: 'Pagata',
    servizio: 'Mobile',
    metodoPagamento: 'Carta di Credito',
    note: 'Piano MIA Unlimited'
  },
  {
    id: 'FAT-2024-002',
    cliente: 'Anna Bianchi',
    telefono: '+39 340 987 6543',
    importo: '€39.90',
    dataEmissione: '01/03/2024',
    dataScadenza: '31/03/2024',
    status: 'In attesa',
    servizio: 'Fibra',
    metodoPagamento: 'Bonifico',
    note: 'Super Fibra 1000 Mega'
  },
  {
    id: 'FAT-2024-003',
    cliente: 'Luigi Verdi',
    telefono: '+39 333 555 7777',
    importo: '€85.50',
    dataEmissione: '15/02/2024',
    dataScadenza: '15/03/2024',
    status: 'Scaduta',
    servizio: 'Energia',
    metodoPagamento: 'Addebito Diretto',
    note: 'WindTre Energia Casa - Bimestrale'
  },
  {
    id: 'FAT-2024-004',
    cliente: 'Giulia Neri',
    telefono: '+39 328 444 9999',
    importo: '€199.90',
    dataEmissione: '01/03/2024',
    dataScadenza: '31/03/2024',
    status: 'Pagata',
    servizio: 'Business',
    metodoPagamento: 'Fatturazione Elettronica',
    note: 'Business Pro Package'
  },
  {
    id: 'FAT-2024-005',
    cliente: 'Marco Ferrari',
    telefono: '+39 339 111 2222',
    importo: '€19.90',
    dataEmissione: '05/03/2024',
    dataScadenza: '05/04/2024',
    status: 'Emessa',
    servizio: 'Mobile',
    metodoPagamento: 'Carta di Credito',
    note: 'Giga Unlimited Premium'
  }
];

const Fatturazione = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [servizioFilter, setServizioFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('tutte');

  const filteredFatture = mockFatture.filter(fattura => {
    const matchesSearch = fattura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fattura.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fattura.telefono.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || fattura.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesServizio = servizioFilter === 'all' || fattura.servizio === servizioFilter;
    
    let matchesTab = true;
    if (activeTab === 'pagate') matchesTab = fattura.status === 'Pagata';
    if (activeTab === 'attesa') matchesTab = fattura.status === 'In attesa' || fattura.status === 'Emessa';
    if (activeTab === 'scadute') matchesTab = fattura.status === 'Scaduta';
    
    return matchesSearch && matchesStatus && matchesServizio && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pagata':
        return <Badge variant="default" className="bg-success text-success-foreground gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Pagata
        </Badge>;
      case 'in attesa':
        return <Badge variant="outline" className="border-warning text-warning gap-1">
          <Clock className="h-3 w-3" />
          In Attesa
        </Badge>;
      case 'emessa':
        return <Badge variant="outline" className="border-info text-info gap-1">
          <Send className="h-3 w-3" />
          Emessa
        </Badge>;
      case 'scaduta':
        return <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Scaduta
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

  const calcolaTotali = () => {
    const pagate = mockFatture.filter(f => f.status === 'Pagata');
    const attesa = mockFatture.filter(f => f.status === 'In attesa' || f.status === 'Emessa');
    const scadute = mockFatture.filter(f => f.status === 'Scaduta');
    
    const totalePagato = pagate.reduce((sum, f) => sum + parseFloat(f.importo.replace('€', '')), 0);
    const totaleAttesa = attesa.reduce((sum, f) => sum + parseFloat(f.importo.replace('€', '')), 0);
    const totaleScaduto = scadute.reduce((sum, f) => sum + parseFloat(f.importo.replace('€', '')), 0);
    
    return { totalePagato, totaleAttesa, totaleScaduto };
  };

  const { totalePagato, totaleAttesa, totaleScaduto } = calcolaTotali();

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gestione Fatturazione
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitora fatture, pagamenti e incassi del tuo tenant
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass-purple" className="gap-2">
              <Download className="h-4 w-4" />
              Esporta Report
            </Button>
            <Button variant="enterprise" className="gap-2">
              <FileText className="h-4 w-4" />
              Nuova Fattura
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="glass-strong border-success/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Incassato</span>
              </div>
              <div className="text-2xl font-bold text-success">€{totalePagato.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {mockFatture.filter(f => f.status === 'Pagata').length} fatture pagate
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-warning/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">In Attesa</span>
              </div>
              <div className="text-2xl font-bold text-warning">€{totaleAttesa.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {mockFatture.filter(f => f.status === 'In attesa' || f.status === 'Emessa').length} fatture pendenti
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-destructive/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium">Scadute</span>
              </div>
              <div className="text-2xl font-bold text-destructive">€{totaleScaduto.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {mockFatture.filter(f => f.status === 'Scaduta').length} fatture scadute
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-windtre-purple/20 hover:shadow-glow-purple transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="h-5 w-5 text-windtre-purple" />
                <span className="text-sm font-medium">Fatturato Totale</span>
              </div>
              <div className="text-2xl font-bold text-windtre-purple">
                €{(totalePagato + totaleAttesa + totaleScaduto).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockFatture.length} fatture totali
              </p>
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
                  placeholder="Cerca fattura..."
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
                  <SelectItem value="pagata">Pagata</SelectItem>
                  <SelectItem value="in-attesa">In Attesa</SelectItem>
                  <SelectItem value="emessa">Emessa</SelectItem>
                  <SelectItem value="scaduta">Scaduta</SelectItem>
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
          <TabsTrigger value="tutte">Tutte ({mockFatture.length})</TabsTrigger>
          <TabsTrigger value="pagate">
            Pagate ({mockFatture.filter(f => f.status === 'Pagata').length})
          </TabsTrigger>
          <TabsTrigger value="attesa">
            In Attesa ({mockFatture.filter(f => f.status === 'In attesa' || f.status === 'Emessa').length})
          </TabsTrigger>
          <TabsTrigger value="scadute">
            Scadute ({mockFatture.filter(f => f.status === 'Scaduta').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Invoices List */}
          <div className="grid gap-4">
            {filteredFatture.map((fattura, index) => (
              <Card 
                key={fattura.id} 
                className="glass-strong border-border/50 hover:glass transition-all duration-300 animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {fattura.id}
                        </Badge>
                        {getStatusBadge(fattura.status)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getServizioColor(fattura.servizio)}`}
                        >
                          {fattura.servizio}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-1">{fattura.cliente}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{fattura.telefono}</p>
                      <p className="text-sm font-medium text-foreground">{fattura.note}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-windtre-purple mb-1">
                        {fattura.importo}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {fattura.metodoPagamento}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Emessa:</span>
                        <span className="font-medium">{fattura.dataEmissione}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Scadenza:</span>
                        <span className={`font-medium ${
                          fattura.status === 'Scaduta' ? 'text-destructive' : ''
                        }`}>
                          {fattura.dataScadenza}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Metodo di Pagamento:</span>
                        <p className="font-medium">{fattura.metodoPagamento}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button variant="glass" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Visualizza
                      </Button>
                      <Button variant="glass-orange" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Scarica
                      </Button>
                      {fattura.status === 'Scaduta' && (
                        <Button variant="glass-purple" size="sm" className="gap-1">
                          <Send className="h-4 w-4" />
                          Sollecito
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFatture.length === 0 && (
            <Card className="glass-strong border-border/50 mt-8">
              <CardContent className="text-center py-12">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-semibold mb-2">Nessuna fattura trovata</h3>
                <p className="text-muted-foreground">
                  Prova a modificare i filtri di ricerca o genera una nuova fattura.
                </p>
                <Button variant="enterprise" className="mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Nuova Fattura
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fatturazione;