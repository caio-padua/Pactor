import React from "react";
import { AdminLayout } from "@/components/layouts";
import { MOCK_PATIENTS } from "@/data/mockPatients";
import { computeScore, FUNNEL_STATUSES } from "@/data/scoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, ActivitySquare, BadgeDollarSign, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const totalIniciados = MOCK_PATIENTS.length;
  
  const concluiuClinico = MOCK_PATIENTS.filter(p => p.status === "CONCLUIU_CLINICO" || p.status === "CONCLUIU_FINANCEIRO" || p.status === "ALTO_INTERESSE").length;
  const taxaClinica = Math.round((concluiuClinico / totalIniciados) * 100) || 0;

  const concluiuFin = MOCK_PATIENTS.filter(p => p.status === "CONCLUIU_FINANCEIRO" || p.status === "ALTO_INTERESSE").length;
  const taxaFin = Math.round((concluiuFin / totalIniciados) * 100) || 0;

  const altoInt = MOCK_PATIENTS.filter(p => p.status === "ALTO_INTERESSE").length;

  // Band distribution
  const bandsCounts = {
    "BASICO": 0,
    "INTERMEDIARIO": 0,
    "AVANCADO": 0,
    "FULL": 0
  };
  
  MOCK_PATIENTS.forEach(p => {
    if(p.status === "INICIOU_E_PAROU") return; // Only count those who reached the end roughly
    const r = computeScore(p.answers);
    if(bandsCounts[r.band.band] !== undefined) {
      bandsCounts[r.band.band]++;
    }
  });

  const chartData = [
    { name: "Básico", count: bandsCounts.BASICO, color: "hsl(var(--muted-foreground))" },
    { name: "Intermediário", count: bandsCounts.INTERMEDIARIO, color: "hsl(210, 100%, 50%)" },
    { name: "Avançado", count: bandsCounts.AVANCADO, color: "hsl(30, 100%, 50%)" },
    { name: "Full", count: bandsCounts.FULL, color: "hsl(140, 60%, 40%)" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral do funil de conversão clínica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Iniciados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalIniciados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conclusão Clínica</CardTitle>
              <ActivitySquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taxaClinica}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conclusão Financeira</CardTitle>
              <BadgeDollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taxaFin}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alto Interesse</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{altoInt}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Distribuição por Band (Score)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}} 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }} 
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_PATIENTS.slice(0, 5).map(p => {
                  const date = new Date(p.updatedAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={p.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{FUNNEL_STATUSES[p.status].label}</p>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                        Hoje {date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
