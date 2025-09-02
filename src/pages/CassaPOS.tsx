import { EnterpriseLayout } from "@/components/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, DollarSign, Receipt, Printer } from "lucide-react";
import { useState } from "react";

const CassaPOS = () => {
  const [totaleGiornaliero, setTotaleGiornaliero] = useState(0);
  
  const transazioniRecenti = [
    { id: "TRX001", tipo: "Vendita", importo: 89.99, metodo: "Carta", prodotto: "Piano Mobile 30GB", ora: "14:30" },
    { id: "TRX002", tipo: "Attivazione", importo: 15.00, metodo: "Contanti", prodotto: "SIM Card", ora: "14:25" },
    { id: "TRX003", tipo: "Vendita", importo: 129.99, metodo: "Bancomat", prodotto: "Router Fibra", ora: "14:20" },
    { id: "TRX004", tipo: "Ricarica", importo: 20.00, metodo: "Carta", prodotto: "Credito Telefonico", ora: "14:15" },
  ];

  return (
    <EnterpriseLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cassa POS</h1>
            <p className="text-muted-foreground">Sistema di vendita integrato WindTre</p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Stampa Scontrino
            </Button>
            <Button variant="glass" size="sm">
              <Receipt className="h-4 w-4 mr-2" />
              Chiusura Cassa
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pannello Vendita */}
          <div className="lg:col-span-2">
            <Card className="glass-strong border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Pannello Vendita
                </CardTitle>
                <CardDescription>Seleziona prodotti e servizi da vendere</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { nome: "Piano Mobile 30GB", prezzo: 89.99, tipo: "Piano" },
                    { nome: "Fibra Casa 1000MB", prezzo: 29.90, tipo: "Fibra" },
                    { nome: "SIM Card", prezzo: 15.00, tipo: "Hardware" },
                    { nome: "Router WiFi 6", prezzo: 129.99, tipo: "Hardware" },
                    { nome: "Ricarica €20", prezzo: 20.00, tipo: "Ricarica" },
                    { nome: "Assicurazione Device", prezzo: 5.99, tipo: "Servizio" },
                  ].map((prodotto, index) => (
                    <Button 
                      key={index} 
                      variant="glass" 
                      className="h-20 flex flex-col items-start justify-between p-4"
                      onClick={() => setTotaleGiornaliero(prev => prev + prodotto.prezzo)}
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">{prodotto.nome}</p>
                        <Badge variant="secondary" className="text-xs">{prodotto.tipo}</Badge>
                      </div>
                      <p className="text-lg font-bold">€{prodotto.prezzo}</p>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Riepilogo e Pagamento */}
          <div className="space-y-4">
            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Totale Giornaliero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-success">€{totaleGiornaliero.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Vendite di oggi</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle>Metodi di Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="success" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Carta di Credito
                </Button>
                <Button variant="glass" className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Contanti
                </Button>
                <Button variant="glass" className="w-full">
                  Bancomat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transazioni Recenti */}
        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Transazioni Recenti</CardTitle>
            <CardDescription>Ultime operazioni di cassa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transazioniRecenti.map((transazione) => (
                <div key={transazione.id} className="flex items-center justify-between p-3 rounded-lg glass hover:glass-strong transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{transazione.id}</Badge>
                    <div>
                      <p className="font-medium text-sm">{transazione.prodotto}</p>
                      <p className="text-xs text-muted-foreground">{transazione.tipo} • {transazione.metodo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{transazione.importo}</p>
                    <p className="text-xs text-muted-foreground">{transazione.ora}</p>
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

export default CassaPOS;