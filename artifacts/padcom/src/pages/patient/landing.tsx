import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PatientLayout } from "@/components/layouts";
import { ArrowRight, Clock, ShieldCheck, Activity } from "lucide-react";
import { useDraft } from "@/hooks/use-draft";

export default function Landing() {
  const { answers } = useDraft();
  const hasDraft = Object.keys(answers).length > 0;

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-24">
        <div className="space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Análise Clínica <br className="hidden md:block" />
              <span className="text-primary">Personalizada</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Nossa anamnese digital ajuda a mapear sua saúde de forma inteligente, 
              direcionando a melhor estratégia para o seu caso antes mesmo da primeira consulta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-12">
            <div className="flex flex-col items-center md:items-start space-y-2 p-6 bg-card rounded-2xl border shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Apenas ~6 minutos</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                5 módulos rápidos que cobrem todo o seu histórico clínico e rotina.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start space-y-2 p-6 bg-card rounded-2xl border shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Direcionamento Exato</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Gera um panorama inicial para exames, formulações e terapias.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start space-y-2 p-6 bg-card rounded-2xl border shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">100% Confidencial</h3>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Seus dados são criptografados e acessados apenas pela nossa equipe médica.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/anamnese">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full md:w-auto shadow-md">
                {hasDraft ? "Continuar Anamnese" : "Iniciar Anamnese"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              <Link href="/admin">
                <span className="hover:text-primary transition-colors cursor-pointer underline underline-offset-4">
                  Sou da equipe — entrar no painel
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
