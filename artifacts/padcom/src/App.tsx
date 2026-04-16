import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/patient/landing";
import Flow from "@/pages/patient/flow";
import Summary from "@/pages/patient/summary";
import Queue from "@/pages/admin/queue";
import PatientDetail from "@/pages/admin/patient-detail";
import Dashboard from "@/pages/admin/dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Patient Flow */}
      <Route path="/" component={Landing} />
      <Route path="/anamnese" component={Flow} />
      <Route path="/anamnese/concluido" component={Summary} />

      {/* Admin Panel */}
      <Route path="/admin" component={Queue} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/p/:id" component={PatientDetail} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
