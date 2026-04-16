import { useState } from "react";
import { HelpModal } from "./_shared/HelpModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  HelpCircle,
  Save,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const SYMPTOMS = [
  "Dor de cabeça",
  "Insônia",
  "Fadiga",
  "Ansiedade",
  "Dores musculares",
  "Alterações no apetite",
];

export function StepWithHelp() {
  // Opens modal by default so the canvas preview showcases the component.
  const [helpOpen, setHelpOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Stethoscope className="h-4 w-4" aria-hidden />
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold tracking-tight">
                Clínica Vital
              </p>
              <p className="text-[11px] text-slate-500">Anamnese digital</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
            Dados protegidos · LGPD
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Stepper */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Etapa 2 de 5 · Sintomas atuais</span>
            <span>40%</span>
          </div>
          <Progress value={40} className="h-1.5 bg-slate-100" />
        </div>

        {/* Card */}
        <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_20px_50px_-30px_rgba(15,23,42,0.2)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-semibold leading-tight tracking-tight sm:text-2xl">
                Conte sobre seus sintomas
              </h1>
              <p className="mt-1.5 max-w-prose text-sm text-slate-600">
                Descreva o que tem sentido nas últimas semanas. Essas
                informações ajudam nossa equipe a preparar sua consulta.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setHelpOpen(true)}
              className="gap-2 border-sky-200 bg-sky-50/60 text-sky-700 hover:bg-sky-100 hover:text-sky-800"
            >
              <HelpCircle className="h-4 w-4" aria-hidden />
              Ver explicação
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="main-complaint" className="text-sm font-medium">
                Queixa principal
              </Label>
              <Input
                id="main-complaint"
                placeholder="Ex.: dores de cabeça frequentes no fim do dia"
                className="h-11"
              />
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">
                Sintomas que você tem sentido
              </legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SYMPTOMS.map((s, i) => (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm transition hover:border-sky-300 hover:bg-sky-50/40"
                  >
                    <Checkbox defaultChecked={i === 0 || i === 3} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Observações adicionais
              </Label>
              <Textarea
                id="notes"
                rows={4}
                placeholder="Descreva com suas próprias palavras..."
              />
            </div>
          </div>
        </section>

        {/* Footer actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" className="gap-2 text-slate-600">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" aria-hidden />
              Salvar rascunho
            </Button>
            <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
              Continuar
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </main>

      {/* Reusable contextual help modal */}
      <HelpModal
        open={helpOpen}
        onOpenChange={setHelpOpen}
        stepEyebrow="Etapa 2 · Sintomas"
        stepTitle="Como descrever seus sintomas"
        guidance="Este é o momento de contar, com suas próprias palavras, o que você tem sentido. Não se preocupe com termos médicos — foque em clareza e exemplos do dia a dia."
        bullets={[
          "Descreva quando os sintomas começaram e com que frequência aparecem.",
          "Mencione o que melhora ou piora a sensação (sono, alimentação, estresse).",
          "Marque todos os sintomas que se aplicam, mesmo que pareçam pequenos.",
          "Se tiver dúvida entre dois itens, marque os dois — a equipe refina depois.",
        ]}
        confirmLabel="Entendi, continuar"
      />
    </div>
  );
}
