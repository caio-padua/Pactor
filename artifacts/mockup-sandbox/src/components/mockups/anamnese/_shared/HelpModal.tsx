import { useEffect, useRef, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlayCircle, Sparkles } from "lucide-react";

export interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepTitle: string;
  stepEyebrow?: string;
  videoSrc?: string;
  videoPoster?: string;
  guidance: ReactNode;
  bullets?: string[];
  confirmLabel?: string;
  onConfirm?: () => void;
}

export function HelpModal({
  open,
  onOpenChange,
  stepTitle,
  stepEyebrow = "Ajuda contextual",
  videoSrc,
  videoPoster,
  guidance,
  bullets,
  confirmLabel = "Entendi, continuar",
  onConfirm,
}: HelpModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          gap-0 overflow-hidden border-slate-200/70 p-0
          w-[calc(100vw-1.5rem)] max-w-[960px]
          max-h-[92vh] rounded-2xl sm:rounded-3xl
          shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)]
        "
      >
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          {/* Video column */}
          <div className="relative bg-slate-950 md:min-h-[440px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.25),transparent_60%)]" />
            <div className="relative h-full w-full aspect-video md:aspect-auto">
              {videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={videoPoster}
                  controls
                  playsInline
                  preload="metadata"
                  // Intentionally no autoPlay with sound (requirement #4)
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center text-slate-200">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
                    <PlayCircle className="h-8 w-8 text-sky-300" aria-hidden />
                  </div>
                  <p className="text-sm font-medium tracking-wide text-slate-200/90">
                    Vídeo explicativo
                  </p>
                  <p className="max-w-[22ch] text-xs text-slate-400">
                    Toque em reproduzir para assistir à orientação desta etapa.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guidance column */}
          <div className="flex flex-col bg-white">
            <DialogHeader className="gap-2 border-b border-slate-100 px-6 pb-5 pt-6 text-left sm:px-7">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-sky-700 ring-1 ring-sky-100">
                <Sparkles className="h-3 w-3" aria-hidden />
                {stepEyebrow}
              </span>
              <DialogTitle className="text-xl font-semibold leading-tight text-slate-900 sm:text-[22px]">
                {stepTitle}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-slate-600">
                {guidance}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-7">
              {bullets && bullets.length > 0 && (
                <ul className="space-y-2.5">
                  {bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-700 ring-1 ring-slate-100"
                    >
                      <span
                        aria-hidden
                        className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                      />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-7">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-slate-600 hover:text-slate-900"
              >
                Fechar
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-sky-500"
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
