import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { PatientLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionField } from "@/components/QuestionField";
import { useDraft } from "@/hooks/use-draft";
import { QUESTIONS, STEP_TRANSITIONS, STEP_TITLES, questionsForStep } from "@/data/questionnaire";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Flow() {
  const [, setLocation] = useLocation();
  const { answers, updateAnswer } = useDraft();
  const [step, setStep] = useState<1|2|3|4|5>(1);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const questions = questionsForStep(step);
  const progress = (step / 5) * 100;

  const handleNext = () => {
    if (step < 5) {
      setStep((s) => (s + 1) as 1|2|3|4|5);
    } else {
      setLocation("/anamnese/concluido");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as 1|2|3|4|5);
    } else {
      setLocation("/");
    }
  };

  // Simple validation for the current step: all questions must have an answer
  // (In a real app, some might be optional, but we assume all are required for now)
  const isStepComplete = questions.every(q => answers[q.code] !== undefined && answers[q.code] !== "");

  return (
    <PatientLayout>
      {/* Sticky Progress Header */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur border-b">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-2 text-sm font-medium">
            <span className="text-muted-foreground">Etapa {step} de 5</span>
            <span className="text-primary">{STEP_TITLES[step]}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-32">
        <div className="mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {STEP_TRANSITIONS[step]}
          </p>
        </div>

        <div className="space-y-8">
          {questions.map((q) => (
            <QuestionField 
              key={q.code} 
              question={q} 
              value={answers[q.code]} 
              onChange={(val) => updateAnswer(q.code, val)} 
            />
          ))}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur border-t z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleBack}
            className="h-14 px-4 shrink-0 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            onClick={handleNext}
            disabled={!isStepComplete}
            className="h-14 flex-1 rounded-full text-lg shadow-md"
          >
            {step === 5 ? "Concluir Análise" : "Continuar"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </PatientLayout>
  );
}
