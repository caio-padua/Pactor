import React, { useState } from "react";
import { Link } from "wouter";
import { AdminLayout } from "@/components/layouts";
import { MOCK_PATIENTS } from "@/data/mockPatients";
import { computeScore, FUNNEL_STATUSES } from "@/data/scoring";
import { FunnelChip, ScoreBadge } from "@/components/chips";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ChevronRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Queue() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = MOCK_PATIENTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Funnel stats
  const stats = MOCK_PATIENTS.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Fila de Pacientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie e analise as anamneses recebidas.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(FUNNEL_STATUSES).map(([key, info]) => (
            <div 
              key={key} 
              onClick={() => setStatusFilter(statusFilter === key ? null : key)}
              className={`p-4 rounded-xl border bg-card cursor-pointer transition-all ${
                statusFilter === key ? "ring-2 ring-primary" : "hover:border-primary/50 hover:shadow-sm"
              }`}
            >
              <div className="text-2xl font-bold mb-1">{stats[key] || 0}</div>
              <div className="text-sm font-medium text-muted-foreground">{info.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/20">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" onClick={() => setStatusFilter(null)} className={!statusFilter ? "bg-muted" : ""}>
                Todos
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filtros avançados
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Paciente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Atualizado em</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((patient) => {
                  const score = computeScore(patient.answers);
                  const date = new Date(patient.updatedAt).toLocaleDateString("pt-BR", { 
                    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" 
                  });

                  return (
                    <TableRow key={patient.id} className="hover:bg-muted/50 transition-colors group cursor-pointer">
                      <TableCell>
                        <div className="font-medium text-foreground">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.age} anos · {patient.city}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 items-start">
                          <FunnelChip status={patient.status} />
                          {patient.lastStep < 5 && (
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                              Parou no Módulo {patient.lastStep}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal text-xs">{patient.origin}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {date}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <ScoreBadge score={score.score} className="h-9 w-9 text-sm" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/p/${patient.id}`}>
                          <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 group-hover:text-primary">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Nenhum paciente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
