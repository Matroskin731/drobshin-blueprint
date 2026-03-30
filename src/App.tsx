import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Wholesale from "./pages/Wholesale";
import Retail from "./pages/Retail";
import Recycling from "./pages/Recycling";
import Rop from "./pages/Rop";
import Accessories from "./pages/Accessories";
import Applications from "./pages/Applications";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/wholesale" element={<PageTransition><Wholesale /></PageTransition>} />
        <Route path="/retail" element={<PageTransition><Retail /></PageTransition>} />
        <Route path="/recycling" element={<PageTransition><Recycling /></PageTransition>} />
        <Route path="/rop" element={<PageTransition><Rop /></PageTransition>} />
        <Route path="/accessories" element={<PageTransition><Accessories /></PageTransition>} />
        <Route path="/applications" element={<PageTransition><Applications /></PageTransition>} />
        <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
        <Route path="/articles/:id" element={<PageTransition><ArticlePage /></PageTransition>} />
        <Route path="/contacts" element={<PageTransition><Contacts /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <PageTransition><Admin /></PageTransition>
          </ProtectedRoute>
        } />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <SiteConfigProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <AnimatedRoutes />
              </Layout>
            </BrowserRouter>
          </SiteConfigProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
