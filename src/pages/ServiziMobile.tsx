import { useState } from 'react';
import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Plus,
  Phone,
  Signal,
  Smartphone,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Settings
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockLinee = [
  {
    id: 'MOB-001',
    numero: '+39 347 123 4567',
    cliente: 'Mario Rossi',
    piano: 'MIA Unlimited Full Easy Pay',
    consumoGiga: 85,
    limitGiga: 100,
    minuti: 'Illimitati',
    sms: 'Illimitati',
    status: 'Attivo',
    ultimoRinnovo: '15/03/2024',
    prossimoBilling: '15/04/2024',
    costoMensile: '€29.90',
    rete: '5G',
    zona: 'Milano Centro'
  },
  {
    id: 'MOB-002',
    numero: '+39 340 987 6543',
    cliente: 'Anna Bianchi',
    piano: 'Giga Unlimited Premium',
    consumoGiga: 45,
    limitGiga: 200,
    minuti: 'Illimitati',
    sms: 'Illimitati',
    status: 'Attivo',
    ultimoRinnovo: '22/03/2024',
    prossimoBilling: '22/04/2024',
    costoMensile: '€19.90',
    rete: '5G',
    zona: 'Roma EUR'
  },
  {
    id: 'MOB-003',
    numero: '+39 333 555 7777',
    cliente: 'Luigi Verdi',
    piano: 'MIA Super 50GB',
    consumoGiga: 48,
    limitGiga: 50,
    minuti: '1000',
    sms: '500',
    status: 'Traffico Esaurito',
    ultimoRinnovo: '03/03/2024',
    prossimoBilling: '03/04/2024',
    costoMensile: '€14.90',
    rete: '4G+',
    zona: 'Napoli Centro'
  },
  {
    id: 'MOB-004',
    numero: '+39 328 444 9999',
    cliente: 'Giulia Neri',
    piano: 'Business Mobile Pro',
    consumoGiga: 120,
    limitGiga: 500,
    minuti: 'Illimitati',
    sms: 'Illimitati',
    status: 'Attivo',
    ultimoRinnovo: '10/03/2024',
    prossimoBilling: '10/04/2024',
    costoMensile: '€39.90',
    rete: '5G',
    zona: 'Milano Porta Nuova'
  }
];

const ServiziMobile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pianoFilter, setPianoFilter] = useState('all');

  const filteredLinee = mockLinee.filter(linea => {
    const matchesSearch = linea.numero.includes(searchTerm) ||
                         linea.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         linea.piano.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || linea.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesPiano = pianoFilter === 'all' || linea.piano.includes(pianoFilter);
    
    return matchesSearch && matchesStatus && matchesPiano;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'attivo':
        return <Badge variant="default" className="bg-success text-success-foreground gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Attivo
        </Badge>;
      case 'traffico esaurito':
        return <Badge variant="outline" className="border-warning text-warning gap-1">
          <AlertCircle className="h-3 w-3" />
          Traffico Esaurito
        </Badge>;
      case 'sospeso':
        return <Badge variant="destructive">Sospeso</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getNetworkBadge = (rete: string) => {
    const colors = {
      '5G': 'bg-windtre-orange/20 text-windtre-orange border-windtre-orange/30',
      '4G+': 'bg-windtre-purple/20 text-windtre-purple border-windtre-purple/30',
      '4G': 'bg-info/20 text-info border-info/30'
    };
    return <Badge variant="outline" className={colors[rete as keyof typeof colors] || 'bg-muted'}>
      {rete}
    </Badge>;
  };

  const calculateUsagePercentage = (consumo: number, limite: number) => {
    return (consumo / limite) * 100;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return 'text-success';
    if (percentage < 80) return 'text-warning';
    return 'text-destructive';
  };

  const stats = {
    totaleLinee: mockLinee.length,
    lineeAttive: mockLinee.filter(l => l.status === 'Attivo').length,
    traffico5G: mockLinee.filter(l => l.rete === '5G').length,
    fatturato: mockLinee.reduce((sum, l) => sum + parseFloat(l.costoMensile.replace('€', '')), 0)
  };

  return (
    <EnterpriseLayout>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Servizi Mobile
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestisci tutte le linee mobile del tuo tenant WindTre
            </p>
          </div>
          <Button variant="enterprise" className="gap-2">
            <Plus className="h-4 w-4" />
            Nuova Linea
          </Button>
        </div>

        {/* Mobile Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="glass-strong border-windtre-orange/20 hover:shadow-glow-orange transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5 text-windtre-orange" />
                <span className="text-sm font-medium">Linee Totali</span>
              </div>
              <div className="text-2xl font-bold text-windtre-orange">{stats.totaleLinee}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-success/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Linee Attive</span>
              </div>
              <div className="text-2xl font-bold text-success">{stats.lineeAttive}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-windtre-purple/20 hover:shadow-glow-purple transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Signal className="h-5 w-5 text-windtre-purple" />
                <span className="text-sm font-medium">Rete 5G</span>
              </div>
              <div className="text-2xl font-bold text-windtre-purple">{stats.traffico5G}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.traffico5G / stats.totaleLinee) * 100)}% del totale
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-strong border-info/20 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-info" />
                <span className="text-sm font-medium">Fatturato Mobile</span>
              </div>
              <div className="text-2xl font-bold text-info">€{stats.fatturato.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Al mese</p>
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
                  placeholder="Cerca linea mobile..."
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
                  <SelectItem value="traffico-esaurito">Traffico Esaurito</SelectItem>
                  <SelectItem value="sospeso">Sospeso</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={pianoFilter} onValueChange={setPianoFilter}>
                <SelectTrigger className="glass border-border/50">
                  <SelectValue placeholder="Piano" />
                </SelectTrigger>
                <SelectContent className="glass border-border/50">
                  <SelectItem value="all">Tutti i piani</SelectItem>
                  <SelectItem value="MIA">MIA</SelectItem>
                  <SelectItem value="Giga">Giga</SelectItem>
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

      {/* Mobile Lines List */}
      <div className="grid gap-4">
        {filteredLinee.map((linea, index) => (
          <Card 
            key={linea.id} 
            className="glass-strong border-border/50 hover:glass transition-all duration-300 animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {linea.id}
                    </Badge>
                    {getStatusBadge(linea.status)}
                    {getNetworkBadge(linea.rete)}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-windtre-orange" />
                    <h3 className="text-lg font-bold">{linea.numero}</h3>
                  </div>
                  
                  <p className="text-sm font-medium mb-1">{linea.cliente}</p>
                  <p className="text-sm text-muted-foreground">{linea.piano}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-windtre-purple mb-1">
                    {linea.costoMensile}
                  </div>
                  <p className="text-xs text-muted-foreground">Al mese</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Usage Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Traffico Dati</span>
                    <span className={`text-sm font-bold ${getUsageColor(calculateUsagePercentage(linea.consumoGiga, linea.limitGiga))}`}>
                      {linea.consumoGiga}GB / {linea.limitGiga}GB
                    </span>
                  </div>
                  <Progress 
                    value={calculateUsagePercentage(linea.consumoGiga, linea.limitGiga)} 
                    className="h-2"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Minuti:</span>
                      <p className="font-medium">{linea.minuti}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SMS:</span>
                      <p className="font-medium">{linea.sms}</p>
                    </div>
                  </div>
                </div>

                {/* Billing Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Ultimo rinnovo:</span>
                  </div>
                  <p className="font-medium text-sm">{linea.ultimoRinnovo}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Prossimo billing:</span>
                  </div>
                  <p className="font-medium text-sm">{linea.prossimoBilling}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Zona:</span>
                  </div>
                  <p className="font-medium text-sm">{linea.zona}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 justify-center">
                  <Button variant="glass" size="sm" className="gap-1">
                    <Smartphone className="h-4 w-4" />
                    Dettagli Linea
                  </Button>
                  <Button variant="glass-orange" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Gestisci Piano
                  </Button>
                  {linea.status === 'Traffico Esaurito' && (
                    <Button variant="glass-purple" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Ricarica
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLinee.length === 0 && (
        <Card className="glass-strong border-border/50 mt-8">
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Nessuna linea mobile trovata</h3>
            <p className="text-muted-foreground">
              Prova a modificare i filtri di ricerca o attiva una nuova linea mobile.
            </p>
            <Button variant="enterprise" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Nuova Linea Mobile
            </Button>
          </CardContent>
        </Card>
      )}
    </EnterpriseLayout>
  );
};

export default ServiziMobile;