import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/clienti" element={<ProtectedRoute><Clienti /></ProtectedRoute>} />
            <Route path="/contratti" element={<ProtectedRoute><Contratti /></ProtectedRoute>} />
            <Route path="/fatturazione" element={<ProtectedRoute><Fatturazione /></ProtectedRoute>} />
            <Route path="/servizi/mobile" element={<ProtectedRoute><ServiziMobile /></ProtectedRoute>} />
            
            {/* Main Section Routes */}
            <Route path="/hr" element={<ProtectedRoute><HRSection /></ProtectedRoute>} />
            <Route path="/amministrazione" element={<ProtectedRoute><AmministrazioneSection /></ProtectedRoute>} />
            <Route path="/cassa" element={<ProtectedRoute><CassaSection /></ProtectedRoute>} />
            <Route path="/ai" element={<ProtectedRoute><AISection /></ProtectedRoute>} />
            
            {/* Legacy HR Routes */}
            <Route path="/hr/dipendenti" element={<ProtectedRoute><HRDipendenti /></ProtectedRoute>} />
            
            {/* Legacy Cassa Routes */}
            <Route path="/cassa/pos" element={<ProtectedRoute><CassaPOS /></ProtectedRoute>} />
            
            {/* Legacy AI Tools Routes */}
            <Route path="/ai/assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
