import React from "react";
import { useRoute, Link } from "wouter";
import { AdminLayout } from "@/components/layouts";
import { MOCK_PATIENTS } from "@/data/mockPatients";
import { computeScore, motorActions } from "@/data/scoring";
import { ScoreBadge, BandChip, FunnelChip } from "@/components/chips";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QUESTIONS } from "@/data/questionnaire";
import { ArrowLeft, User, Phone, Mail, MapPin, AlertTriangle, Info, ShieldAlert, CheckCircle, Activity, HeartPulse } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PatientDetail() {
  const [, params] = useRoute("/admin/p/:id");
  const patientId = params?.id;
  const patient = MOCK_PATIENTS.find(p => p.id === patientId);

  if (!patient) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-muted-foreground">Paciente não encontrado.</div>
      </AdminLayout>
    );
  }

  const result = computeScore(patient.answers);
  const actions = motorActions(patient.answers);

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
        
        {/* Top actions */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2 -ml-3 hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Voltar para Fila
            </Button>
          </Link>
        </div>

        {/* Header Profile */}
        <div className="bg-card border rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shadow-sm">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                {patient.name}
                <FunnelChip status={patient.status} />
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {patient.age} anos</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {patient.city}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {patient.phone}</span>
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {patient.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Button className="w-full">Validar e enviar para motor</Button>
            <Button variant="outline" className="w-full">Solicitar contato humano</Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Col 1: Score & Engine */}
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="shadow-sm border overflow-hidden">
              <div className="bg-primary/5 p-6 flex flex-col items-center justify-center border-b">
                <ScoreBadge score={result.score} className="h-24 w-24 text-4xl shadow-lg ring-4 ring-primary/20 mb-4" />
                <BandChip band={result.band} />
                <p className="text-sm font-medium mt-3 text-muted-foreground">Conduta Base: <span className="text-foreground">{result.band.conduct}</span></p>
              </div>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-x divide-y">
                  {Object.entries(result.perBlock).map(([block, pts]) => (
                    <div key={block} className="p-3 text-center">
                      <div className="text-xs text-muted-foreground font-mono uppercase">{block}</div>
                      <div className="font-semibold text-lg">{pts} <span className="text-xs font-normal text-muted-foreground">pts</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motor Actions */}
            <Card className="shadow-sm border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Motor Clínico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Exames Gerados</h4>
                  {actions.exames.length > 0 ? (
                    <ul className="space-y-1.5">
                      {actions.exames.map(ex => (
                        <li key={ex} className="text-sm bg-muted/50 p-2 rounded-md border text-foreground flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" /> {ex}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Nenhum exame mapeado.</span>
                  )}
                </div>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  {actions.formula && <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">Fórmula Base</Badge>}
                  {actions.im && <Badge variant="default" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Ter. Intramuscular</Badge>}
                  {actions.ev && <Badge variant="default" className="bg-violet-100 text-violet-700 hover:bg-violet-200">Ter. Endovenosa</Badge>}
                  {actions.implante && <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-200">Implante</Badge>}
                </div>
              </CardContent>
            </Card>

            {/* Flags */}
            {result.flags.length > 0 && (
              <Card className="shadow-sm border border-amber-200 bg-amber-50/30 dark:border-amber-900/30 dark:bg-amber-900/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-800 dark:text-amber-400">
                    <ShieldAlert className="h-5 w-5" /> Alertas Clínicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-card border rounded-lg shadow-sm">
                      {flag.kind === "validation" ? <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" /> : <Info className="h-5 w-5 text-amber-500 shrink-0" />}
                      <div>
                        <div className="font-semibold text-sm">{flag.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{flag.reason}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Col 2: Visual Matrix & Answers */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Visual Matrix (Simplified for concept) */}
            <Card className="shadow-sm border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-primary" /> Matriz de Sistemas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["CARDIO", "METAB", "ENDO", "SONO", "INTEST", "HUMOR", "CIRUR"].map(sys => {
                    const sysQs = QUESTIONS.filter(q => q.block === sys);
                    const sysScore = result.perBlock[sys] || 0;
                    if (sysQs.length === 0) return null;
                    
                    return (
                      <div key={sys} className="border rounded-lg p-4 bg-muted/20">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold uppercase tracking-wider text-sm">{sys}</span>
                          <Badge variant={sysScore > 3 ? "destructive" : sysScore > 0 ? "secondary" : "outline"}>
                            {sysScore} pts
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {sysQs.map(q => {
                            const val = patient.answers[q.code];
                            const hasPositiveHit = val && val !== "nao" && val !== "0";
                            return (
                              <div key={q.code} className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground truncate pr-2 max-w-[200px]" title={q.technicalName || q.question}>
                                  {q.technicalName || q.question.substring(0,30)+"..."}
                                </span>
                                <span className={`font-mono font-medium ${hasPositiveHit ? "text-primary" : "text-muted-foreground/50"}`}>
                                  {val || "-"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Raw Answers */}
            <Card className="shadow-sm border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Respostas Brutas</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto p-6 space-y-8">
                  {[1, 2, 3, 4, 5].map((step) => {
                    const stepQs = QUESTIONS.filter(q => q.step === step);
                    return (
                      <div key={step} className="space-y-4">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider border-b pb-2">
                          Módulo {step}
                        </h4>
                        <div className="space-y-4">
                          {stepQs.map(q => (
                            <div key={q.code} className="text-sm">
                              <p className="font-medium text-foreground mb-1">{q.question}</p>
                              <div className="flex gap-2 items-center">
                                <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground bg-muted/50">{q.code}</Badge>
                                <span className="text-primary font-medium">{patient.answers[q.code] || <span className="italic text-muted-foreground">Vazio</span>}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
