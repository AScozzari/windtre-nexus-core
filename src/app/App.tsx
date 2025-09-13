import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from '@/core/providers/AuthProvider';
import { RBACProvider } from '@/core/providers/RBACProvider';
import { AppRouter } from './AppRouter';

// QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <RBACProvider>
            <TooltipProvider>
              <AppRouter />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </RBACProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}