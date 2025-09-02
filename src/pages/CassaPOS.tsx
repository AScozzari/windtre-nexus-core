import { useState } from 'react';
import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Plus,
  Receipt,
  CreditCard,
  ShoppingCart,
  Euro,
  TrendingUp,
  Calendar,
  Clock,
  Printer,
  Smartphone,
  Wifi,
  Zap
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

const mockVendite = [
  {
    id: 'VEN-001',
    data: '09/04/2024',
    ora: '10:30',
    cliente: 'Mario Rossi',
    telefono: '+39 347 123 4567',
    prodotti: [
      { nome: 'Piano MIA Unlimited', prezzo: 29.90, quantita: 1, tipo: 'Mobile' },
      { nome: 'Attivazione SIM', prezzo: 0.00, quantita: 1, tipo: 'Servizio' }
    ],
    totale: 29.90,
    metodoPagamento: 'Carta di Credito',
    operatore: 'Anna Bianchi',
    negozio: 'Milano Centro - VIA001',
    status: 'Completata',
    commissione: 15.00
  },
  {
    id: 'VEN-002',
    data: '09/04/2024',
    ora: '11:15',
    cliente: 'Giulia Verdi',
    telefono: '+39 340 987 6543',
    prodotti: [
      { nome: 'Super Fibra 1000 Mega', prezzo: 39.90, quantita: 1, tipo: 'Fibra' },
      { nome: 'Modem Wi-Fi 6', prezzo: 99.90, quantita: 1, tipo: 'Hardware' },
      { nome: 'Installazione', prezzo: 0.00, quantita: 1, tipo: 'Servizio' }
    ],
    totale: 139.80,
    metodoPagamento: 'Bonifico',
    operatore: 'Marco Bianchi',
    negozio: 'Milano Centro - VIA001',
    status: 'In Lavorazione',
    commissione: 45.00
  },
  {
    id: 'VEN-003',
    data: '09/04/2024',
    ora: '14:45',
    cliente: 'Luigi Neri',
    telefono: '+39 333 555 7777',
    prodotti: [
      { nome: 'WindTre Energia Casa', prezzo: 85.50, quantita: 1, tipo: 'Energia' },
      { nome: 'Bundle Mobile + Energia', prezzo: -10.00, quantita: 1, tipo: 'Sconto' }
    ],
    totale: 75.50,
    metodoPagamento: 'Contanti',
    operatore: 'Anna Bianchi',
    negozio: 'Milano Centro - VIA001',
    status: 'Completata',
    commissione: 25.00
  },
  {
    id: 'VEN-004',
    data: '09/04/2024',
    ora: '16:20',
    cliente: 'Sofia Blu',
    telefono: '+39 328 444 9999',
    prodotti: [
      { nome: 'Business Mobile Pro', prezzo: 39.90, quantita: 3, tipo: 'Business' },
      { nome: 'Configurazione Fleet', prezzo: 50.00, quantita: 1, tipo: 'Servizio' }
    ],
    totale: 169.70,
    metodoPagamento: 'Fatturazione Elettronica',
    operatore: 'Marco Bianchi',
    negozio: 'Milano Centro - VIA001',
    status: 'In Attesa Documenti',
    commissione: 85.00
  }
];

const mockProdotti = [
  { categoria: 'Mobile', nome: 'MIA Unlimited', prezzo: 29.90, disponibile: true },
  { categoria: 'Mobile', nome: 'Giga Premium', prezzo: 19.90, disponibile: true },
  { categoria: 'Fibra', nome: 'Super Fibra 1000', prezzo: 39.90, disponibile: true },
  { categoria: 'Fibra', nome: 'Fibra Casa 200', prezzo: 29.90, disponibile: true },
  { categoria: 'Energia', nome: 'Energia Casa', prezzo: 85.50, disponibile: true },
  { categoria: 'Business', nome: 'Business Pro', prezzo: 39.90, disponibile: true },
  { categoria: 'Hardware', nome: 'Modem Wi-Fi 6', prezzo: 99.90, disponibile: false },
  { categoria: 'Accessori', nome: 'Cover Smartphone', prezzo: 19.90, disponibile: true }
];

const CassaPOS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [metodoPagamentoFilter, setMetodoPagamentoFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('vendite');

  const filteredVendite = mockVendite.filter(vendita => {
    const matchesSearch = vendita.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendita.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendita.telefono.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || vendita.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesMetodo = metodoPagamentoFilter === 'all' || vendita.metodoPagamento === metodoPagamentoFilter;
    
    return matchesSearch && matchesStatus && matchesMetodo;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completata':
        return <Badge variant="default" className="bg-success text-success-foreground">Completata</Badge>;
      case 'in lavorazione':
        return <Badge variant="outline" className="border-warning text-warning">In Lavorazione</Badge>;
      case 'in attesa documenti':
        return <Badge variant="outline" className="border-info text-info">In Attesa Documenti</Badge>;
      case 'annullata':
        return <Badge variant="destructive">Annullata</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProdottoIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'fibra': return <Wifi className="h-4 w-4" />;
      case 'energia': return <Zap className="h-4 w-4" />;
      case 'business': return <Receipt className="h-4 w-4" />;
      default: return <ShoppingCart className="h-4 w-4" />;
    }
  };

  const getProdottoColor = (tipo: string) => {
    const colors: { [key: string]: string } = {
      'Mobile': 'text-windtre-orange bg-windtre-orange/10',
      'Fibra': 'text-windtre-purple bg-windtre-purple/10',
      'Energia': 'text-warning bg-warning/10',
      'Business': 'text-info bg-info/10',
      'Hardware': 'text-muted-foreground bg-muted/10',
      'Servizio': 'text-success bg-success/10',
      'Sconto': 'text-destructive bg-destructive/10'
    };
    return colors[tipo] || 'text-muted-foreground bg-muted/10';
  };

  const stats = {
    venditeTotali: mockVendite.length,
    venditeCompletate: mockVendite.filter(v => v.status === 'Completata').length,
    incassoGiornaliero: mockVendite
      .filter(v => v.status === 'Completata')
      .reduce((sum, v) => sum + v.totale, 0),
    commissioniTotali: mockVendite
      .filter(v => v.status === 'Completata')
      .reduce((sum, v) => sum + v.commissione, 0)
  };

  return (
    <EnterpriseLayout>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sistema POS & Vendite
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestisci vendite, incassi e prodotti dei tuoi negozi WindTre
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass-purple" className="gap-2">
              <Printer className="h-4 w-4" />
              Stampa Report
            </Button>
            <Button variant="enterprise" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuova Vendita
            </Button>
          </div>
        </div>

        {/* POS Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="glass-strong border-windtre-orange/20 hover:shadow-glow-orange transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-5 w-5 text-windtre-orange" />
                <span className="text-sm font-medium">Vendite Oggi</span>
              </div>
              <div className="text-2xl font-bold text-windtre-orange">{stats.venditeTotali}</div>
              <p className="text-xs text-muted-foreground">
                {stats.venditeCompletate} completate
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-success/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Incasso Giornaliero</span>
              </div>
              <div className="text-2xl font-bold text-success">€{stats.incassoGiornaliero.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Senza commissioni
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-windtre-purple/20 hover:shadow-glow-purple transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-windtre-purple" />
                <span className="text-sm font-medium">Commissioni</span>
              </div>
              <div className="text-2xl font-bold text-windtre-purple">€{stats.commissioniTotali.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Su vendite completate
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-info/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-info" />
              
                <span className="text-sm font-medium">Scontrino Medio</span>
              </div>
              <div className="text-2xl font-bold text-info">
                €{stats.venditeCompletate > 0 ? (stats.incassoGiornaliero / stats.venditeCompletate).toFixed(2) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                Per transazione
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="glass-strong border border-border/50">
          <TabsTrigger value="vendite">Vendite del Giorno</TabsTrigger>
          <TabsTrigger value="prodotti">Catalogo Prodotti</TabsTrigger>
          <TabsTrigger value="incassi">Riepilogo Incassi</TabsTrigger>
        </TabsList>

        <TabsContent value="vendite" className="mt-6">
          {/* Filters */}
          <Card className="glass-strong border-border/50 mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Filtri Vendite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cerca vendita..."
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
                    <SelectItem value="completata">Completata</SelectItem>
                    <SelectItem value="in-lavorazione">In Lavorazione</SelectItem>
                    <SelectItem value="in-attesa-documenti">In Attesa Documenti</SelectItem>
                    <SelectItem value="annullata">Annullata</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={metodoPagamentoFilter} onValueChange={setMetodoPagamentoFilter}>
                  <SelectTrigger className="glass border-border/50">
                    <SelectValue placeholder="Metodo Pagamento" />
                  </SelectTrigger>
                  <SelectContent className="glass border-border/50">
                    <SelectItem value="all">Tutti i metodi</SelectItem>
                    <SelectItem value="Carta di Credito">Carta di Credito</SelectItem>
                    <SelectItem value="Contanti">Contanti</SelectItem>
                    <SelectItem value="Bonifico">Bonifico</SelectItem>
                    <SelectItem value="Fatturazione Elettronica">Fatturazione Elettronica</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="glass-orange" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtri Avanzati
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sales List */}
          <div className="grid gap-4">
            {filteredVendite.map((vendita, index) => (
              <Card 
                key={vendita.id} 
                className="glass-strong border-border/50 hover:glass transition-all duration-300 animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {vendita.id}
                        </Badge>
                        {getStatusBadge(vendita.status)}
                        <Badge variant="outline" className="text-xs">
                          {vendita.metodoPagamento}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-1">{vendita.cliente}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{vendita.telefono}</p>
                      <p className="text-sm font-medium">Operatore: {vendita.operatore}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-windtre-purple mb-1">
                        €{vendita.totale.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{vendita.ora} - {vendita.data}</span>
                      </div>
                      {vendita.status === 'Completata' && (
                        <p className="text-xs text-success mt-1">
                          Commissione: €{vendita.commissione.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Prodotti Venduti:</h4>
                    <div className="grid gap-2">
                      {vendita.prodotti.map((prodotto, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 glass rounded-lg">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getProdottoColor(prodotto.tipo)}`}
                            >
                              {getProdottoIcon(prodotto.tipo)}
                              <span className="ml-1">{prodotto.tipo}</span>
                            </Badge>
                            <span className="text-sm font-medium">{prodotto.nome}</span>
                            <span className="text-xs text-muted-foreground">x{prodotto.quantita}</span>
                          </div>
                          <span className={`text-sm font-bold ${prodotto.prezzo < 0 ? 'text-destructive' : 'text-foreground'}`}>
                            €{prodotto.prezzo.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="glass" size="sm">
                      Dettagli
                    </Button>
                    <Button variant="glass-orange" size="sm" className="gap-1">
                      <Printer className="h-4 w-4" />
                      Ristampa
                    </Button>
                    {vendita.status !== 'Completata' && (
                      <Button variant="glass-purple" size="sm">
                        Completa
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prodotti" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockProdotti.map((prodotto, index) => (
              <Card 
                key={index} 
                className={`glass-strong border-border/50 hover:glass transition-all duration-300 ${
                  !prodotto.disponibile ? 'opacity-60' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getProdottoColor(prodotto.categoria)}`}
                    >
                      {getProdottoIcon(prodotto.categoria)}
                      <span className="ml-1">{prodotto.categoria}</span>
                    </Badge>
                    <Badge variant={prodotto.disponibile ? 'default' : 'destructive'} className="text-xs">
                      {prodotto.disponibile ? 'Disponibile' : 'Esaurito'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{prodotto.nome}</h3>
                  <div className="text-xl font-bold text-windtre-purple">
                    €{prodotto.prezzo.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="incassi" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Riepilogo Giornaliero</CardTitle>
                <CardDescription>Incassi per metodo di pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Carta di Credito', 'Contanti', 'Bonifico', 'Fatturazione Elettronica'].map(metodo => {
                    const venditeMetodo = mockVendite.filter(v => v.metodoPagamento === metodo && v.status === 'Completata');
                    const totaleMetodo = venditeMetodo.reduce((sum, v) => sum + v.totale, 0);
                    return (
                      <div key={metodo} className="flex justify-between items-center p-3 glass rounded-lg">
                        <span className="font-medium">{metodo}</span>
                        <div className="text-right">
                          <span className="font-bold">€{totaleMetodo.toFixed(2)}</span>
                          <p className="text-xs text-muted-foreground">{venditeMetodo.length} transazioni</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Performance Prodotti</CardTitle>
                <CardDescription>Vendite per categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mobile', 'Fibra', 'Energia', 'Business'].map(categoria => {
                    const prodottiCategoria = mockVendite
                      .filter(v => v.status === 'Completata')
                      .flatMap(v => v.prodotti.filter(p => p.tipo === categoria));
                    const totaleCategoria = prodottiCategoria.reduce((sum, p) => sum + p.prezzo * p.quantita, 0);
                    const quantitaCategoria = prodottiCategoria.reduce((sum, p) => sum + p.quantita, 0);
                    
                    return (
                      <div key={categoria} className="flex justify-between items-center p-3 glass rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getProdottoColor(categoria)}`}
                          >
                            {getProdottoIcon(categoria)}
                            <span className="ml-1">{categoria}</span>
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">€{totaleCategoria.toFixed(2)}</span>
                          <p className="text-xs text-muted-foreground">{quantitaCategoria} unità</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </EnterpriseLayout>
  );
};

export default CassaPOS;