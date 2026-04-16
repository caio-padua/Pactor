import { useState } from "react";
import { HelpModal } from "./_shared/HelpModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

const SYMPTOMS = ["Dor de cabeça", "Insônia", "Fadiga", "Ansiedade"];

export function MobileStep() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <button className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white">
            <Stethoscope className="h-3.5 w-3.5" aria-hidden />
          </div>
          <span className="text-[13px] font-semibold tracking-tight">
            Anamnese
          </span>
        </div>
        <span className="w-9" />
      </header>

      <div className="px-4 pt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-500">
          <span>Etapa 2 de 5</span>
          <span>40%</span>
        </div>
        <Progress value={40} className="h-1.5 bg-slate-200" />
      </div>

      <main className="px-4 pb-28 pt-5">
        <h1 className="text-[20px] font-semibold leading-tight tracking-tight">
          Sintomas atuais
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
          Conte o que você tem sentido nas últimas semanas.
        </p>

        <Button
          variant="outline"
          onClick={() => setHelpOpen(true)}
          className="mt-4 w-full justify-center gap-2 border-sky-200 bg-sky-50/60 text-sky-700 hover:bg-sky-100"
        >
          <HelpCircle className="h-4 w-4" aria-hidden />
          Ver explicação
        </Button>

        <div className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="m-complaint" className="text-[13px] font-medium">
              Queixa principal
            </Label>
            <Input
              id="m-complaint"
              placeholder="Ex.: dores de cabeça frequentes"
              className="h-11"
            />
          </div>

          <fieldset className="space-y-2.5">
            <legend className="text-[13px] font-medium">
              Sintomas sentidos
            </legend>
            <div className="grid grid-cols-1 gap-2">
              {SYMPTOMS.map((s, i) => (
                <label
                  key={s}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px]"
                >
                  <Checkbox defaultChecked={i === 0} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <Button className="h-12 w-full justify-center gap-2 bg-slate-900 text-base text-white hover:bg-slate-800">
          Continuar
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>

      <HelpModal
        open={helpOpen}
        onOpenChange={setHelpOpen}
        stepEyebrow="Etapa 2 · Sintomas"
        stepTitle="Como descrever seus sintomas"
        guidance="Conte, com suas palavras, o que tem sentido. Foque em clareza, não em termos médicos."
        bullets={[
          "Quando começou e com que frequência aparece.",
          "O que melhora ou piora a sensação.",
          "Marque todos os sintomas que se aplicam.",
        ]}
        confirmLabel="Entendi, continuar"
      />
    </div>
  );
}
