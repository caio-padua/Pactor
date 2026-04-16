import React from "react";
import { Link, useLocation } from "wouter";
import { Stethoscope, Users, LayoutDashboard } from "lucide-react";

export function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="h-16 border-b bg-card/50 backdrop-blur sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-tight">
          <Stethoscope className="h-5 w-5" />
          <span>PADCOM</span>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  
  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-muted/30">
      <aside className="w-full md:w-64 border-r bg-card flex-shrink-0">
        <div className="p-6 flex items-center gap-2 text-primary font-semibold tracking-tight border-b">
          <Stethoscope className="h-5 w-5" />
          <span>PADCOM Team</span>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin">
            <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              location === "/admin" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}>
              <Users className="h-4 w-4" />
              Fila de Pacientes
            </span>
          </Link>
          <Link href="/admin/dashboard">
            <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              location === "/admin/dashboard" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </span>
          </Link>
          <div className="pt-4 mt-4 border-t">
            <Link href="/">
              <span className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                Ver fluxo público
              </span>
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
