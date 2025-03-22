
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CulturalProvider } from "./contexts/CulturalContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import VirtualWorld from "./pages/VirtualWorld";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import AdminProtected from "./components/AdminProtected";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Add scroll listener for smooth scroll effects
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        '--scroll-y', 
        `${window.scrollY}px`
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CulturalProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route 
                path="/admin" 
                element={
                  <AdminProtected>
                    <Admin />
                  </AdminProtected>
                } 
              />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/community" element={<Community />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CulturalProvider>
    </QueryClientProvider>
  );
};

export default App;
