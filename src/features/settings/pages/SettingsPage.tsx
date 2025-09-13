import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Building2, CreditCard } from "lucide-react";

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <Settings className="w-8 h-8" />
          <span>Impostazioni</span>
          <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">Admin</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Utenti & Ruoli</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione RBAC</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>RS & Store</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Anagrafiche aziendali</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Billing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Profili fatturazione</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configurazioni</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Impostazioni sistema</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};