// Liquid Safari reminder: global routing should preserve clear escape routes between showroom, stock detail, and dealer operations.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Inventory from "@/pages/Inventory";
import VehicleDetail from "@/pages/VehicleDetail";
import DealerDashboard from "@/pages/DealerDashboard";
import LegalTrust from "@/pages/LegalTrust";
import NotFound from "@/pages/NotFound";
import ServicePage from "@/pages/ServicePage";
import ErrorBoundary from "@/components/ErrorBoundary";
import SEO from "@/components/SEO";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/inventory/:id" component={VehicleDetail} />
      <Route path="/dealer" component={DealerDashboard} />
      <Route path="/financing">
        <ServicePage type="finance" />
      </Route>
      <Route path="/trade-in">
        <ServicePage type="trade" />
      </Route>
      <Route path="/diaspora">
        <ServicePage type="diaspora" />
      </Route>
      <Route path="/about">
        <ServicePage type="about" />
      </Route>
      <Route path="/contact">
        <ServicePage type="contact" />
      </Route>
      <Route path="/legal" component={LegalTrust} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <SEO />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
