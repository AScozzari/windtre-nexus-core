import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Warehouse, TruckIcon, BarChart3 } from "lucide-react";

export const MagazzinoPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <Package className="w-8 h-8" />
          <span>Magazzino</span>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">Real-time</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Articoli/SKU</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione catalogo prodotti</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Warehouse className="w-5 h-5" />
              <span>Giacenze</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Stock per store</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TruckIcon className="w-5 h-5" />
              <span>Trasferimenti</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Movimenti store-to-store</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Movimenti</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Storico movimentazioni</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};