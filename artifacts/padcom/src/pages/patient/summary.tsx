import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { PatientLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDraft } from "@/hooks/use-draft";
import { computeScore, motorActions } from "@/data/scoring";
import { ScoreBadge, BandChip } from "@/components/chips";
import { CheckCircle2, ChevronDown, ChevronUp, Beaker, ActivitySquare, Syringe, Sparkles } from "lucide-react";
import { QUESTIONS } from "@/data/questionnaire";
import { COMMERCIAL_MICROTEXTS } from "@/data/questionnaire";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function Summary() {
  const [, setLocation] = useLocation();
  const { answers, clearDraft } = useDraft();
  const [showAnswers, setShowAnswers] = useState(false);

  // If no answers, redirect back to start
  useEffect(() => {
    if (Object.keys(answers).length === 0) {
      setLocation("/");
    }
  }, [answers, setLocation]);

  if (Object.keys(answers).length === 0) return null;

  const result = computeScore(answers);
  const actions = motorActions(answers);

  // Animated score counter
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    const duration = 1000; // ms
    const steps = 20;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let current = 0;
    const timer = setInterval(() => {
      current += result.score / steps;
      if (current >= result.score) {
        setDisplayScore(result.score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [result.score]);

  return (
    <PatientLayout>
      <div className="max-w-2xl mx-auto px-4 py-12 pb-24">
        <div className="text-center space-y-4 mb-10">
          <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Análise Concluída</h1>
          <p className="text-lg text-muted-foreground">
            Obrigado por compartilhar suas informações. Nosso sistema já gerou um perfil inicial para sua estratégia.
          </p>
        </div>

        <Card className="mb-8 border-2 overflow-hidden shadow-md">
          <div className="bg-primary/5 p-6 border-b flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-xl font-semibold">Perfil de Conduta</h2>
              <p className="text-sm text-muted-foreground">Baseado no seu panorama clínico e objetivos</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ScoreBadge score={displayScore} className="h-20 w-20 text-3xl shadow-md ring-4 ring-primary/20" />
              <BandChip band={result.band} />
            </div>
          </div>
          
          <CardContent className="p-6">
            <h3 className="font-medium text-lg mb-4 text-center md:text-left">Rota sugerida</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border">
                <Beaker className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Fórmula Personalizada</p>
                  <p className="text-sm text-muted-foreground">Sempre inclusa na base</p>
                </div>
              </div>
              
              {actions.exames.length > 0 && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border">
                  <ActivitySquare className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Exames Laboratoriais</p>
                    <p className="text-sm text-muted-foreground">{actions.exames.length} painéis sugeridos</p>
                  </div>
                </div>
              )}
              
              {(actions.im || actions.ev) && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border">
                  <Syringe className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Terapia Injetável</p>
                    <p className="text-sm text-muted-foreground">
                      {actions.im && actions.ev ? "IM + EV" : actions.im ? "Intramuscular" : "Endovenosa"}
                    </p>
                  </div>
                </div>
              )}
              
              {actions.implante && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Implante</p>
                    <p className="text-sm text-muted-foreground">Estabilidade sugerida</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm text-primary/80 font-medium italic">
                "{COMMERCIAL_MICROTEXTS.antesFinanceiro}"
              </p>
            </div>
          </CardContent>
        </Card>

        <Collapsible open={showAnswers} onOpenChange={setShowAnswers} className="border rounded-xl bg-card overflow-hidden">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium hover:bg-muted/50 transition-colors">
            Ver minhas respostas
            {showAnswers ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t">
            <div className="p-4 space-y-6">
              {[1, 2, 3, 4, 5].map((step) => {
                const stepQs = QUESTIONS.filter(q => q.step === step);
                return (
                  <div key={step} className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Módulo {step}
                    </h4>
                    <div className="space-y-3">
                      {stepQs.map(q => (
                        <div key={q.code} className="bg-muted/30 p-3 rounded-lg text-sm">
                          <p className="font-medium mb-1">{q.question}</p>
                          <p className="text-muted-foreground">
                            {answers[q.code] || <span className="italic">Sem resposta</span>}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => { clearDraft(); setLocation("/"); }}>
            Voltar ao início
          </Button>
        </div>
      </div>
    </PatientLayout>
  );
}
