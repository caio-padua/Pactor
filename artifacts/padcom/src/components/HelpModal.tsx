import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./ui/dialog";
import { Play } from "lucide-react";
import { Button } from "./ui/button";

interface HelpModalProps {
  technicalName?: string;
  helper: string;
  clinicalGoal: string;
}

export function HelpModal({ technicalName, helper, clinicalGoal }: HelpModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-sm text-primary underline-offset-4">
          Ver explicação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">Explicação: {technicalName || "Detalhes"}</DialogTitle>
        <DialogDescription className="sr-only">{helper}</DialogDescription>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-muted aspect-video md:aspect-auto flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/5" />
            <div className="h-12 w-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center z-10">
              <Play className="h-5 w-5 text-primary ml-1" />
            </div>
          </div>
          <div className="p-6 flex flex-col justify-center space-y-4">
            {technicalName && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Termo Técnico
                </h4>
                <p className="text-lg font-semibold">{technicalName}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Orientação
              </h4>
              <p className="text-foreground leading-relaxed">{helper}</p>
            </div>
            <div className="pt-4 border-t">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Por que perguntamos?
              </h4>
              <p className="text-sm text-muted-foreground">{clinicalGoal}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
