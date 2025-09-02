import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clienti from "./pages/Clienti";
import Contratti from "./pages/Contratti";
import Fatturazione from "./pages/Fatturazione";
import ServiziMobile from "./pages/ServiziMobile";
import HRDipendenti from "./pages/HRDipendenti";
import HRSection from "./pages/HRSection";
import AmministrazioneSection from "./pages/AmministrazioneSection";
import CassaPOS from "./pages/CassaPOS";
import CassaSection from "./pages/CassaSection";
import AIAssistant from "./pages/AIAssistant";
import AISection from "./pages/AISection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clienti" element={<Clienti />} />
          <Route path="/contratti" element={<Contratti />} />
          <Route path="/fatturazione" element={<Fatturazione />} />
          <Route path="/servizi/mobile" element={<ServiziMobile />} />
          
          {/* Main Section Routes */}
          <Route path="/hr" element={<HRSection />} />
          <Route path="/amministrazione" element={<AmministrazioneSection />} />
          <Route path="/cassa" element={<CassaSection />} />
          <Route path="/ai" element={<AISection />} />
          
          {/* Legacy HR Routes */}
          <Route path="/hr/dipendenti" element={<HRDipendenti />} />
          
          {/* Legacy Cassa Routes */}
          <Route path="/cassa/pos" element={<CassaPOS />} />
          
          {/* Legacy AI Tools Routes */}
          <Route path="/ai/assistant" element={<AIAssistant />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
