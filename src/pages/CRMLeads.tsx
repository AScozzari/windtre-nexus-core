import { useState } from 'react';
import { EnterpriseLayout } from '@/components/EnterpriseLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  Edit,
  MoreHorizontal,
  Target,
  Zap
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data per leads
const mockLeads = [
  {
    id: 1,
    name: "Marco Rossi",
    email: "marco.rossi@email.com",
    phone: "+39 335 123 4567",
    company: "Rossi Consulting",
    status: "new",
    stage: "Contatto Iniziale",
    value: 2500,
    source: "Website",
    assignee: "Giulia Bianchi",
    lastContact: "2025-01-02",
    notes: "Interessato a piano Business"
  },
  {
    id: 2,
    name: "Laura Verdi",
    email: "l.verdi@greentech.it",
    phone: "+39 347 987 6543",
    company: "GreenTech Solutions",
    status: "qualified",
    stage: "Proposta Inviata",
    value: 5800,
    source: "Google Ads",
    assignee: "Luca Ferrari",
    lastContact: "2025-01-01",
    notes: "Richiesta offerta fibra aziendale"
  },
  {
    id: 3,
    name: "Andrea Neri",
    email: "a.neri@fashionstore.com",
    phone: "+39 328 555 9999",
    company: "Fashion Store Milano",
    status: "proposal",
    stage: "Negoziazione",
    value: 8900,
    source: "Referral",
    assignee: "Sofia Romano",
    lastContact: "2024-12-30",
    notes: "Confronto con competitor"
  }
];

const pipelineStages = [
  { id: 'new', name: 'Nuovi Lead', color: 'bg-blue-500', count: 12 },
  { id: 'contact', name: 'Contatto Iniziale', color: 'bg-yellow-500', count: 8 },
  { id: 'qualified', name: 'Qualificati', color: 'bg-orange-500', count: 15 },
  { id: 'proposal', name: 'Proposta Inviata', color: 'bg-purple-500', count: 6 },
  { id: 'negotiation', name: 'Negoziazione', color: 'bg-indigo-500', count: 4 },
  { id: 'won', name: 'Vinti', color: 'bg-green-500', count: 23 },
  { id: 'lost', name: 'Persi', color: 'bg-red-500', count: 8 }
];

const getStatusBadge = (status: string) => {
  const statusMap = {
    'new': { label: 'Nuovo', variant: 'secondary' as const },
    'qualified': { label: 'Qualificato', variant: 'default' as const },
    'proposal': { label: 'Proposta', variant: 'outline' as const },
    'won': { label: 'Vinto', variant: 'default' as const },
    'lost': { label: 'Perso', variant: 'destructive' as const }
  };
  return statusMap[status] || { label: status, variant: 'secondary' as const };
};

const CRMLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [currentView, setCurrentView] = useState('list');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesStage = selectedStage === 'all' || lead.stage === selectedStage;
    return matchesSearch && matchesStatus && matchesStage;
  });

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CRM - Gestione Lead
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestisci tutti i tuoi prospect e clienti potenziali
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              GTM Sync
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Lead
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lead Totali</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76</div>
              <p className="text-xs text-muted-foreground">+12% dal mese scorso</p>
            </CardContent>
          </Card>

          <Card className="glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valore Pipeline</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€127.500</div>
              <p className="text-xs text-muted-foreground">+8% questa settimana</p>
            </CardContent>
          </Card>

          <Card className="glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasso Conversione</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">+2% dal trimestre</p>
            </CardContent>
          </Card>

          <Card className="glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lead Qualificati</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">43</div>
              <p className="text-xs text-muted-foreground">+18% questa settimana</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-strong">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca per nome, azienda o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="new">Nuovo</SelectItem>
                  <SelectItem value="qualified">Qualificato</SelectItem>
                  <SelectItem value="proposal">Proposta</SelectItem>
                  <SelectItem value="won">Vinto</SelectItem>
                  <SelectItem value="lost">Perso</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Fase Pipeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le fasi</SelectItem>
                  {pipelineStages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.name}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs per Views */}
        <Tabs value={currentView} onValueChange={setCurrentView}>
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="list">Vista Lista</TabsTrigger>
            <TabsTrigger value="kanban">Kanban Pipeline</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* Lista Lead */}
            <div className="grid gap-4">
              {filteredLeads.map((lead) => (
                <Card key={lead.id} className="glass-strong hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <Badge {...getStatusBadge(lead.status)}>
                            {getStatusBadge(lead.status).label}
                          </Badge>
                          <Badge variant="outline">{lead.stage}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>📧 {lead.email}</div>
                          <div>📱 {lead.phone}</div>
                          <div>🏢 {lead.company}</div>
                          <div>💰 €{lead.value.toLocaleString()}</div>
                          <div>👤 Assegnato a: {lead.assignee}</div>
                          <div>📅 Ultimo contatto: {lead.lastContact}</div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm">{lead.notes}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizza
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifica
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kanban">
            {/* Kanban Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 overflow-x-auto pb-4">
              {pipelineStages.map((stage) => (
                <Card key={stage.id} className="glass-strong min-h-[600px]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        {stage.name}
                      </CardTitle>
                      <Badge variant="secondary">{stage.count}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Lead cards nella colonna */}
                    {filteredLeads
                      .filter(lead => lead.stage === stage.name || (stage.id === 'new' && lead.status === 'new'))
                      .map((lead) => (
                        <Card key={lead.id} className="p-3 cursor-grab hover:shadow-md transition-all">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">{lead.name}</h4>
                            <p className="text-xs text-muted-foreground">{lead.company}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                €{lead.value.toLocaleString()}
                              </Badge>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Mail className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CRMLeads;