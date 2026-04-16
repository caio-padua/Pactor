// PADCOM motor de score + mapa anamnese-motor
// Espelha as planilhas QUESTIONARIO SEMANTICO MOTOR, MAPA ANAMNESE MOTOR e MATRIZ SCORE.

import type { AnswerMap } from "./questionnaire";

export type ScoreBand = "BASICO" | "INTERMEDIARIO" | "AVANCADO" | "FULL";

export interface BandInfo {
  band: ScoreBand;
  label: string;
  range: [number, number];
  conduct: string;
  modules: string[];
  /** Cor semântica usada nos chips/badges. */
  tone: "neutral" | "info" | "warn" | "success";
}

export const BANDS: BandInfo[] = [
  {
    band: "BASICO",
    label: "Básico",
    range: [0, 20],
    conduct: "Fórmula base",
    modules: ["Fórmula"],
    tone: "neutral",
  },
  {
    band: "INTERMEDIARIO",
    label: "Intermediário",
    range: [21, 50],
    conduct: "Fórmula + IM",
    modules: ["Fórmula", "IM"],
    tone: "info",
  },
  {
    band: "AVANCADO",
    label: "Avançado",
    range: [51, 80],
    conduct: "Fórmula + IM + EV",
    modules: ["Fórmula", "IM", "EV"],
    tone: "warn",
  },
  {
    band: "FULL",
    label: "Full",
    range: [81, 100],
    conduct: "Fórmula + IM + EV + Implante",
    modules: ["Fórmula", "IM", "EV", "Implante"],
    tone: "success",
  },
];

export function bandFor(score: number): BandInfo {
  return BANDS.find((b) => score >= b.range[0] && score <= b.range[1]) ?? BANDS[0];
}

/** Pesos por código semântico (planilha QUESTIONARIO SEMANTICO MOTOR). */
const WEIGHTS: Record<string, number> = {
  CARD_DOEN_HASA_001: 3,
  CARD_DOEN_INFA_002: 5,
  CARD_DOEN_AVCX_003: 5,
  META_DOEN_DIAB_001: 4,
  META_DOEN_DISL_002: 3,
  ENDO_DOEN_HIPO_001: 2,
  ENDO_DOEN_HASH_002: 2,
  SONO_SINT_INSO_001: 3,
  INST_SINT_FUNC_001: 3,
  LIBI_SINT_SEXO_001: 2,
  HUMO_SINT_ANSI_001: 2,
  ATIV_FREQ_001: 2,
  ATIV_ENER_003: 2,
  TERA_IM_002: 1,
  TERA_EV_003: 1,
  TERA_IMPL_004: 1,
  FINA_HORI_001: 2,
  FINA_PERF_002: 2,
};

/** Conversão da resposta em pontos brutos (0..3 para selects, 0..5 para escalas). */
function rawPoints(code: string, value: string | undefined): number {
  if (!value) return 0;
  switch (code) {
    case "CARD_DOEN_HASA_001":
      return value === "sim_descontrolada" ? 2 : value === "sim_controlada" ? 1 : 0;
    case "CARD_DOEN_INFA_002":
    case "CARD_DOEN_AVCX_003":
      return value === "sim" ? 3 : 0;
    case "META_DOEN_DIAB_001":
      return value === "sim_descontrolada"
        ? 3
        : value === "sim_controlada"
          ? 2
          : value === "pre"
            ? 1
            : 0;
    case "META_DOEN_DISL_002":
    case "ENDO_DOEN_HIPO_001":
    case "ENDO_DOEN_HASH_002":
      return value === "sim" ? 1 : 0;
    case "SONO_SINT_INSO_001":
    case "INST_SINT_FUNC_001":
    case "LIBI_SINT_SEXO_001":
    case "HUMO_SINT_ANSI_001":
    case "ATIV_ENER_003":
      return Number(value) || 0; // 0..5
    case "ATIV_FREQ_001":
      return value === "5+" ? 0 : value === "3a4" ? 1 : value === "1a2" ? 2 : 3; // sedentário pesa mais
    case "TERA_IM_002":
    case "TERA_EV_003":
    case "TERA_IMPL_004":
      return value === "sim" ? 2 : value === "talvez" ? 1 : 0;
    case "FINA_HORI_001":
      return value === "12m" ? 4 : value === "6m" ? 3 : value === "3m" ? 2 : 1;
    case "FINA_PERF_002":
      return value === "eficiente" ? 4 : value === "avancado" ? 3 : value === "intermediario" ? 2 : 1;
    default:
      return 0;
  }
}

export interface ScoreResult {
  score: number; // 0..100 normalizado
  rawTotal: number;
  rawMax: number;
  band: BandInfo;
  perBlock: Record<string, number>;
  flags: ClinicalFlag[];
}

export interface ClinicalFlag {
  kind: "validation" | "info" | "warn";
  code: string;
  label: string;
  reason: string;
}

/** Calcula score normalizado 0..100 e flags. */
export function computeScore(answers: AnswerMap): ScoreResult {
  let rawTotal = 0;
  let rawMax = 0;
  const perBlock: Record<string, number> = {};
  const flags: ClinicalFlag[] = [];

  for (const [code, weight] of Object.entries(WEIGHTS)) {
    const points = rawPoints(code, answers[code]);
    // máximo possível por código: olhamos o pior cenário
    const maxPoints = (() => {
      switch (code) {
        case "SONO_SINT_INSO_001":
        case "INST_SINT_FUNC_001":
        case "LIBI_SINT_SEXO_001":
        case "HUMO_SINT_ANSI_001":
        case "ATIV_ENER_003":
          return 5;
        case "CARD_DOEN_INFA_002":
        case "CARD_DOEN_AVCX_003":
          return 3;
        case "META_DOEN_DIAB_001":
          return 3;
        case "FINA_HORI_001":
        case "FINA_PERF_002":
          return 4;
        case "ATIV_FREQ_001":
          return 3;
        case "TERA_IM_002":
        case "TERA_EV_003":
        case "TERA_IMPL_004":
          return 2;
        case "CARD_DOEN_HASA_001":
          return 2;
        default:
          return 1;
      }
    })();

    rawTotal += points * weight;
    rawMax += maxPoints * weight;
    const block = code.split("_")[0];
    perBlock[block] = (perBlock[block] ?? 0) + points * weight;
  }

  // Flags de validação humana obrigatória
  if (answers.CARD_DOEN_INFA_002 === "sim") {
    flags.push({
      kind: "validation",
      code: "CARD_DOEN_INFA_002",
      label: "Validação humana obrigatória",
      reason: "Histórico de infarto reportado.",
    });
  }
  if (answers.CARD_DOEN_AVCX_003 === "sim") {
    flags.push({
      kind: "validation",
      code: "CARD_DOEN_AVCX_003",
      label: "Validação humana obrigatória",
      reason: "Histórico de AVC reportado.",
    });
  }
  if (answers.MEDI_USO_CONT_001 === "sim") {
    flags.push({
      kind: "warn",
      code: "MEDI_USO_CONT_001",
      label: "Revisar interações",
      reason: "Paciente em uso contínuo de medicamentos.",
    });
  }
  if (answers.CIRU_GERA_OOFO_003 === "sim") {
    flags.push({
      kind: "info",
      code: "CIRU_GERA_OOFO_003",
      label: "Hormonal forte",
      reason: "Ooforectomia — peso hormonal elevado.",
    });
  }

  const score = rawMax > 0 ? Math.round((rawTotal / rawMax) * 100) : 0;
  return {
    score,
    rawTotal,
    rawMax,
    band: bandFor(score),
    perBlock,
    flags,
  };
}

/** Mapa anamnese → motor (planilha MAPA ANAMNESE MOTOR). */
export interface MotorActions {
  exames: string[];
  formula: boolean;
  im: boolean;
  ev: boolean;
  implante: boolean;
}

export function motorActions(answers: AnswerMap): MotorActions {
  const exames = new Set<string>();
  let im = false;
  let ev = false;
  let implante = false;

  // Cardio
  if (answers.CARD_DOEN_HASA_001 && answers.CARD_DOEN_HASA_001 !== "nao") {
    exames.add("Painel cardiometabólico");
  }
  // Metabólico
  const diab = answers.META_DOEN_DIAB_001;
  if (diab && diab !== "nao") {
    exames.add("Glicemia + HbA1c + insulina");
    if (diab === "sim_descontrolada") ev = true;
  }
  if (answers.META_DOEN_DISL_002 === "sim") exames.add("Lipidograma completo");
  // Endócrino
  if (answers.ENDO_DOEN_HIPO_001 === "sim" || answers.ENDO_DOEN_HASH_002 === "sim") {
    exames.add("TSH, T3, T4 livre, anti-TPO");
  }
  // Sono / intestino — só formula
  if (Number(answers.INST_SINT_FUNC_001 ?? "0") >= 3) {
    exames.add("Avaliação intestinal funcional");
  }

  // Preferências (potencialização)
  if (answers.TERA_IM_002 === "sim" || answers.TERA_IM_002 === "talvez") im = true;
  if (answers.TERA_EV_003 === "sim" || answers.TERA_EV_003 === "talvez") ev = true;
  if (answers.TERA_IMPL_004 === "sim" || answers.TERA_IMPL_004 === "talvez") implante = true;

  return {
    exames: Array.from(exames),
    formula: true, // sempre implícita
    im,
    ev,
    implante,
  };
}

/** Etapa do funil (planilha FUNIL E ABANDONO). */
export type FunnelStatus =
  | "INICIOU_E_PAROU"
  | "CONCLUIU_CLINICO"
  | "CONCLUIU_FINANCEIRO"
  | "ALTO_INTERESSE";

export const FUNNEL_STATUSES: Record<
  FunnelStatus,
  { label: string; description: string; action: string; tone: BandInfo["tone"] }
> = {
  INICIOU_E_PAROU: {
    label: "Iniciou e parou",
    description: "Paciente começou e não concluiu.",
    action: "Enviar para CRM e contato humano",
    tone: "warn",
  },
  CONCLUIU_CLINICO: {
    label: "Concluiu clínico",
    description: "Terminou o bloco clínico, falta o financeiro.",
    action: "Convidar para bloco financeiro",
    tone: "info",
  },
  CONCLUIU_FINANCEIRO: {
    label: "Concluiu financeiro",
    description: "Anamnese completa.",
    action: "Gerar score e preview",
    tone: "success",
  },
  ALTO_INTERESSE: {
    label: "Alto interesse",
    description: "Paciente sinalizou plano completo.",
    action: "Priorizar follow-up",
    tone: "success",
  },
};
