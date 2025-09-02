import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Filter, MoreHorizontal } from "lucide-react";

const HRDipendenti = () => {
  const dipendenti = [
    { id: 1, nome: "Mario Rossi", ruolo: "Store Manager", negozio: "Roma Centro", stato: "Attivo", assunzione: "2020-01-15" },
    { id: 2, nome: "Laura Bianchi", ruolo: "Consulente", negozio: "Milano Nord", stato: "Attivo", assunzione: "2021-03-22" },
    { id: 3, nome: "Giuseppe Verde", ruolo: "Tecnico", negozio: "Napoli", stato: "Ferie", assunzione: "2019-07-10" },
    { id: 4, nome: "Anna Neri", ruolo: "Cassiere", negozio: "Torino", stato: "Attivo", assunzione: "2022-01-05" },
  ];

  return (
    <EnterpriseLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestione Dipendenti</h1>
            <p className="text-muted-foreground">Amministra il personale di tutti i negozi</p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtri
            </Button>
            <Button variant="glass" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Cerca
            </Button>
            <Button variant="enterprise">
              <UserPlus className="h-4 w-4 mr-2" />
              Nuovo Dipendente
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Totale Dipendenti</CardDescription>
              <CardTitle className="text-2xl">156</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>In Servizio</CardDescription>
              <CardTitle className="text-2xl text-success">142</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>In Ferie</CardDescription>
              <CardTitle className="text-2xl text-warning">8</CardTitle>
            </CardHeader>
          </Card>
          <Card className="glass-strong border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Assenti</CardDescription>
              <CardTitle className="text-2xl text-destructive">6</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Lista Dipendenti</CardTitle>
            <CardDescription>Panoramica di tutto il personale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dipendenti.map((dipendente) => (
                <div key={dipendente.id} className="flex items-center justify-between p-4 rounded-lg glass hover:glass-strong transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {dipendente.nome.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium">{dipendente.nome}</h4>
                      <p className="text-sm text-muted-foreground">{dipendente.ruolo} • {dipendente.negozio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={dipendente.stato === 'Attivo' ? 'default' : dipendente.stato === 'Ferie' ? 'secondary' : 'destructive'}
                    >
                      {dipendente.stato}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Dal {new Date(dipendente.assunzione).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </EnterpriseLayout>
  );
};

export default HRDipendenti;