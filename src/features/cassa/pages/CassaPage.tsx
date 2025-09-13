import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CreditCard, Receipt, RotateCcw } from "lucide-react";

export const CassaPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <ShoppingCart className="w-8 h-8" />
          <span>Cassa POS</span>
          <Badge variant="secondary" className="bg-primary/20 text-primary">AI Enhanced</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Ordini</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione ordini e vendite</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Pagamenti</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Elaborazione pagamenti</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Receipt className="w-5 h-5" />
              <span>Scontrini</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Emissione ricevute</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <RotateCcw className="w-5 h-5" />
              <span>Resi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione resi</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};