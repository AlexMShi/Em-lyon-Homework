import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Transparency from "./pages/Transparency";
import Reviews from "./pages/Reviews";
import Admission from "./pages/Admission";
import FamilyPortal from "./pages/FamilyPortal";
import DebugAnalytics from "./pages/DebugAnalytics";
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
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/family-portal" element={<FamilyPortal />} />
          <Route path="/debug/analytics" element={<DebugAnalytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
