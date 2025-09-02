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
import CassaPOS from "./pages/CassaPOS";
import AIAssistant from "./pages/AIAssistant";
import WorkspaceTasks from "./pages/WorkspaceTasks";
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
          
          {/* HR Routes */}
          <Route path="/hr/dipendenti" element={<HRDipendenti />} />
          
          {/* Cassa Routes */}
          <Route path="/cassa/pos" element={<CassaPOS />} />
          
          {/* AI Tools Routes */}
          <Route path="/ai/assistant" element={<AIAssistant />} />
          
          {/* Workspace Routes */}
          <Route path="/workspace/tasks" element={<WorkspaceTasks />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
