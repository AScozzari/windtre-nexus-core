import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Edit, FormInput, Palette } from "lucide-react";

export const CMSPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
          <Globe className="w-8 h-8" />
          <span>CMS Store</span>
          <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-400">Vetrina Digitale</Badge>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Siti Store</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Gestione siti per punto vendita</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Landing Pages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Editor pagine di atterraggio</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <FormInput className="w-5 h-5" />
              <span>Form Builder</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Creazione form personalizzati</p>
          </CardContent>
        </Card>

        <Card className="glass-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Templates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">Temi e personalizzazioni</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};