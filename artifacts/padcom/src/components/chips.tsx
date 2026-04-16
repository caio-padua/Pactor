import React from "react";
import { Badge } from "./ui/badge";
import type { BandInfo, FunnelStatus } from "../data/scoring";
import { FUNNEL_STATUSES } from "../data/scoring";

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-full h-12 w-12 text-lg shadow-sm ${className || ""}`}>
      {score}
    </div>
  );
}

export function BandChip({ band }: { band: BandInfo }) {
  const tones = {
    neutral: "bg-muted text-muted-foreground border-transparent",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    warn: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
  };

  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 font-medium ${tones[band.tone]}`}>
      {band.label}
    </Badge>
  );
}

export function FunnelChip({ status }: { status: FunnelStatus }) {
  const info = FUNNEL_STATUSES[status];
  const tones = {
    neutral: "bg-muted text-muted-foreground border-transparent",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    warn: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
  };

  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 whitespace-nowrap ${tones[info.tone]}`}>
      {info.label}
    </Badge>
  );
}
