// PADCOM Anamnese V15 — catálogo completo das 34 perguntas (5 módulos)
// Espelha 1:1 a planilha "QUESTIONARIO PACIENTE FINAL".

export type FieldType = "text" | "date" | "select" | "scale" | "toggle";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  /** Código semântico do motor (ex.: CARD_DOEN_HASA_001). */
  code: string;
  /** Bloco clínico (DADOS, CARDIO, METAB, ENDO, SONO, INTEST, HORMO, HUMOR, CIRUR, MEDIC, ATIVI, TERAP, FINAN). */
  block: string;
  /** Pergunta exibida ao paciente. */
  question: string;
  /** Termo técnico/explicação curta (vai no modal "Ver explicação"). */
  technicalName?: string;
  type: FieldType;
  /** Opções para select/toggle/scale. Para scale 0–5, gerar 0..5. */
  options?: QuestionOption[];
  /** Texto de apoio embaixo do campo. */
  helper: string;
  /** Objetivo clínico interno. */
  clinicalGoal: string;
  /** Objetivo comercial interno. */
  commercialGoal: string;
  /** Em que módulo (1..5) essa pergunta entra. */
  step: 1 | 2 | 3 | 4 | 5;
}

const yesNo: QuestionOption[] = [
  { value: "nao", label: "Não" },
  { value: "sim", label: "Sim" },
];

const scale0to5: QuestionOption[] = Array.from({ length: 6 }, (_, i) => ({
  value: String(i),
  label: String(i),
}));

const togglePref: QuestionOption[] = [
  { value: "sim", label: "Sim" },
  { value: "talvez", label: "Talvez" },
  { value: "depois", label: "Prefiro avaliar depois" },
];

const tolerAgulha: QuestionOption[] = [
  { value: "sem_problema", label: "Sem problema" },
  { value: "leve_receio", label: "Leve receio" },
  { value: "evitar", label: "Prefiro evitar" },
];

export const QUESTIONS: Question[] = [
  // ========== STEP 1 — DADOS + CLÍNICO BÁSICO ==========
  {
    code: "DADO_IDEN_NOME_001",
    block: "DADOS",
    question: "Qual seu nome completo?",
    type: "text",
    helper: "Seus dados ajudam a personalizar sua análise.",
    clinicalGoal: "Identificação",
    commercialGoal: "Cadastro",
    step: 1,
  },
  {
    code: "DADO_IDEN_NASC_002",
    block: "DADOS",
    question: "Qual sua data de nascimento?",
    type: "date",
    helper: "A idade ajuda a direcionar risco, recuperação e estratégia.",
    clinicalGoal: "Identificação",
    commercialGoal: "Cadastro",
    step: 1,
  },
  {
    code: "CARD_DOEN_HASA_001",
    block: "CARDIO",
    question: "Você tem pressão alta?",
    technicalName: "Hipertensão arterial",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "sim_controlada", label: "Sim, controlada" },
      { value: "sim_descontrolada", label: "Sim, descontrolada" },
    ],
    helper: "Essa informação ajuda a direcionar segurança e precisão.",
    clinicalGoal: "Risco cardio",
    commercialGoal: "Exames + fórmula",
    step: 1,
  },
  {
    code: "CARD_DOEN_INFA_002",
    block: "CARDIO",
    question: "Já teve infarto?",
    technicalName: "Infarto agudo do miocárdio",
    type: "select",
    options: yesNo,
    helper: "Selecione a opção que melhor representa sua história.",
    clinicalGoal: "Risco cardio alto",
    commercialGoal: "Validação humana",
    step: 1,
  },
  {
    code: "CARD_DOEN_AVCX_003",
    block: "CARDIO",
    question: "Já teve derrame?",
    technicalName: "AVC — acidente vascular cerebral",
    type: "select",
    options: yesNo,
    helper: "Essa etapa ajuda a definir o nível de segurança do plano.",
    clinicalGoal: "Risco neurovascular",
    commercialGoal: "Validação humana",
    step: 1,
  },
  {
    code: "META_DOEN_DIAB_001",
    block: "METAB",
    question: "Você tem diabetes?",
    technicalName: "Alteração da glicose",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "pre", label: "Pré-diabetes" },
      { value: "sim_controlada", label: "Sim, controlada" },
      { value: "sim_descontrolada", label: "Sim, descontrolada" },
    ],
    helper: "O controle metabólico muda exames e estratégias.",
    clinicalGoal: "Risco metabólico",
    commercialGoal: "Fórmula + exames + EV",
    step: 1,
  },
  {
    code: "META_DOEN_DISL_002",
    block: "METAB",
    question: "Você tem colesterol ou triglicérides altos?",
    technicalName: "Dislipidemia",
    type: "select",
    options: yesNo,
    helper: "Esse item ajuda a mapear risco cardiometabólico.",
    clinicalGoal: "Risco metabólico",
    commercialGoal: "Fórmula + exames",
    step: 1,
  },
  {
    code: "ENDO_DOEN_HIPO_001",
    block: "ENDO",
    question: "Você tem hipotireoidismo?",
    technicalName: "Tireoide baixa",
    type: "select",
    options: yesNo,
    helper: "Questões da tireoide afetam energia, peso e humor.",
    clinicalGoal: "Endócrino",
    commercialGoal: "Fórmula + exames",
    step: 1,
  },
  {
    code: "ENDO_DOEN_HASH_002",
    block: "ENDO",
    question: "Você tem Hashimoto?",
    technicalName: "Doença autoimune da tireoide",
    type: "select",
    options: yesNo,
    helper: "Refina o bloco autoimune e endócrino.",
    clinicalGoal: "Autoimune endócrino",
    commercialGoal: "Fórmula + exames",
    step: 1,
  },

  // ========== STEP 2 — SINTOMAS FUNCIONAIS ==========
  {
    code: "SONO_SINT_INSO_001",
    block: "SONO",
    question: "Como está seu sono?",
    technicalName: "Insônia ou sono não reparador",
    type: "scale",
    options: scale0to5,
    helper: "0 significa sem incômodo e 5 significa muito intenso.",
    clinicalGoal: "Recuperação",
    commercialGoal: "Bloco sono",
    step: 2,
  },
  {
    code: "SONO_SINT_TIPO_002",
    block: "SONO",
    question: "Você tem mais dificuldade para pegar no sono ou para continuar dormindo?",
    technicalName: "Padrão de insônia",
    type: "select",
    options: [
      { value: "pegar", label: "Pegar no sono" },
      { value: "manter", label: "Acordar no meio" },
      { value: "ambos", label: "Ambos" },
      { value: "nao", label: "Não tenho dificuldade" },
    ],
    helper: "Detalhar o padrão permite um plano mais preciso.",
    clinicalGoal: "Padrão funcional",
    commercialGoal: "Refina protocolo",
    step: 2,
  },
  {
    code: "INST_SINT_FUNC_001",
    block: "INTEST",
    question: "Seu intestino funciona bem?",
    technicalName: "Trânsito intestinal",
    type: "scale",
    options: scale0to5,
    helper: "0 funciona muito bem, 5 funciona muito mal.",
    clinicalGoal: "Saúde intestinal",
    commercialGoal: "Bloco gastro",
    step: 2,
  },
  {
    code: "INST_SINT_TIPO_002",
    block: "INTEST",
    question: "Qual situação representa melhor o seu intestino?",
    technicalName: "Padrão clínico",
    type: "select",
    options: [
      { value: "normal", label: "Normal" },
      { value: "preso", label: "Preso" },
      { value: "solto", label: "Solto" },
      { value: "oscila", label: "Oscila" },
      { value: "estufamento", label: "Estufamento" },
    ],
    helper: "Ajuda a ajustar absorção e inflamação.",
    clinicalGoal: "Saúde intestinal",
    commercialGoal: "Bloco gastro",
    step: 2,
  },
  {
    code: "LIBI_SINT_SEXO_001",
    block: "HORMO",
    question: "Como está sua libido?",
    technicalName: "Desejo sexual",
    type: "scale",
    options: scale0to5,
    helper: "Seu perfil hormonal pode mudar muito essa resposta.",
    clinicalGoal: "Hormonal",
    commercialGoal: "Módulo hormonal",
    step: 2,
  },
  {
    code: "HUMO_SINT_ANSI_001",
    block: "HUMOR",
    question: "Como está seu humor e sua ansiedade?",
    technicalName: "Ansiedade, irritabilidade, oscilação",
    type: "scale",
    options: scale0to5,
    helper: "Vamos entender melhor sua recuperação mental e funcional.",
    clinicalGoal: "Neuro humor",
    commercialGoal: "Módulo neuro",
    step: 2,
  },

  // ========== STEP 3 — CIRURGIAS, MEDICAMENTOS, ATIVIDADE ==========
  {
    code: "CIRU_GERA_COLE_001",
    block: "CIRUR",
    question: "Já retirou a vesícula?",
    technicalName: "Colecistectomia",
    type: "select",
    options: yesNo,
    helper: "Algumas cirurgias mudam absorção e estratégia.",
    clinicalGoal: "Digestivo",
    commercialGoal: "Regras de absorção",
    step: 3,
  },
  {
    code: "CIRU_GERA_HIST_002",
    block: "CIRUR",
    question: "Já retirou o útero?",
    technicalName: "Histerectomia",
    type: "select",
    options: yesNo,
    helper: "Esse dado ajuda a entender o contexto hormonal e ginecológico.",
    clinicalGoal: "Ginecológico",
    commercialGoal: "Módulo hormonal",
    step: 3,
  },
  {
    code: "CIRU_GERA_OOFO_003",
    block: "CIRUR",
    question: "Já retirou os ovários?",
    technicalName: "Ooforectomia",
    type: "select",
    options: yesNo,
    helper: "Esse dado tem forte impacto nutrológico e hormonal.",
    clinicalGoal: "Gonadal feminino",
    commercialGoal: "Módulo hormonal forte",
    step: 3,
  },
  {
    code: "CIRU_GERA_ARTL_004",
    block: "CIRUR",
    question: "Já fez cirurgia de coluna?",
    technicalName: "Artrodese lombar",
    type: "select",
    options: yesNo,
    helper: "Ajuda a pensar dor, mobilidade e limitações.",
    clinicalGoal: "Osteomuscular",
    commercialGoal: "Módulo dor e mobilidade",
    step: 3,
  },
  {
    code: "MEDI_USO_CONT_001",
    block: "MEDIC",
    question: "Usa medicamentos contínuos?",
    technicalName: "Uso contínuo",
    type: "select",
    options: yesNo,
    helper: "Essa informação ajuda na segurança da sua estratégia.",
    clinicalGoal: "Segurança clínica",
    commercialGoal: "Validação de regras",
    step: 3,
  },
  {
    code: "MEDI_USO_NOME_002",
    block: "MEDIC",
    question: "Quais medicamentos você usa?",
    technicalName: "Nome dos medicamentos",
    type: "text",
    helper: "Pode escrever somente os principais.",
    clinicalGoal: "Interação",
    commercialGoal: "Regras de bloqueio",
    step: 3,
  },
  {
    code: "ATIV_FREQ_001",
    block: "ATIVI",
    question: "Você pratica atividade física?",
    technicalName: "Frequência de exercício",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "1a2", label: "1 a 2x por semana" },
      { value: "3a4", label: "3 a 4x por semana" },
      { value: "5+", label: "5x ou mais" },
    ],
    helper: "Entender sua rotina ajuda a montar um plano mais inteligente.",
    clinicalGoal: "Estilo de vida",
    commercialGoal: "Módulo performance",
    step: 3,
  },
  {
    code: "ATIV_TIPO_002",
    block: "ATIVI",
    question: "Qual tipo de exercício representa melhor sua rotina?",
    technicalName: "Tipo de treino",
    type: "select",
    options: [
      { value: "musculacao", label: "Musculação" },
      { value: "aerobico", label: "Aeróbico" },
      { value: "ambos", label: "Ambos" },
      { value: "caminhada", label: "Caminhada" },
      { value: "nenhum", label: "Nenhum" },
    ],
    helper: "Com mais detalhe, a análise fica mais precisa.",
    clinicalGoal: "Perfil metabólico",
    commercialGoal: "Performance e emagrecimento",
    step: 3,
  },
  {
    code: "ATIV_ENER_003",
    block: "ATIVI",
    question: "Qual seu nível de energia para treinar?",
    technicalName: "Disposição para exercício",
    type: "scale",
    options: scale0to5,
    helper: "Diferencia fadiga, recuperação e performance.",
    clinicalGoal: "Recuperação",
    commercialGoal: "Abrir protocolo performance",
    step: 3,
  },

  // ========== STEP 4 — PREFERÊNCIAS TERAPÊUTICAS ==========
  {
    code: "TERA_PLANO_001",
    block: "TERAP",
    question:
      "Você gostaria de um plano mais completo para acelerar e consolidar resultados?",
    technicalName: "Plano mais amplo",
    type: "toggle",
    options: [
      { value: "sim", label: "Sim" },
      { value: "talvez", label: "Talvez" },
      { value: "basico", label: "Prefiro começar básico" },
    ],
    helper:
      "Alguns pacientes preferem começar com o básico. Outros preferem um plano mais estratégico e eficiente.",
    clinicalGoal: "Abertura comercial",
    commercialGoal: "Indução longo prazo",
    step: 4,
  },
  {
    code: "TERA_IM_002",
    block: "TERAP",
    question: "Incluiria aplicações intramusculares quando clinicamente indicadas?",
    technicalName: "Potencialização intramuscular",
    type: "toggle",
    options: togglePref,
    helper: "Em alguns casos, a via intramuscular pode trazer mais eficiência.",
    clinicalGoal: "IM",
    commercialGoal: "Libera IM",
    step: 4,
  },
  {
    code: "TERA_EV_003",
    block: "TERAP",
    question: "Incluiria terapias endovenosas quando clinicamente indicadas?",
    technicalName: "Potencialização endovenosa",
    type: "toggle",
    options: togglePref,
    helper:
      "Quando há indicação, ela pode ser uma etapa mais intensiva e direcionada.",
    clinicalGoal: "EV",
    commercialGoal: "Libera EV",
    step: 4,
  },
  {
    code: "TERA_IMPL_004",
    block: "TERAP",
    question: "Incluiria implantes quando clinicamente indicados?",
    technicalName: "Estabilidade terapêutica",
    type: "toggle",
    options: togglePref,
    helper:
      "Em casos selecionados, podem trazer mais estabilidade e continuidade.",
    clinicalGoal: "Implante",
    commercialGoal: "Libera implante",
    step: 4,
  },
  {
    code: "TERA_LOGI_005",
    block: "TERAP",
    question: "Para aplicações, o que combina mais com sua rotina?",
    technicalName: "Logística de aplicação",
    type: "select",
    options: [
      { value: "clinica", label: "Ir à clínica" },
      { value: "as_vezes", label: "Posso ir às vezes" },
      { value: "pratico", label: "Prefiro o mais prático" },
    ],
    helper: "Ajuda a organizar o formato mais compatível com sua vida.",
    clinicalGoal: "Operacional",
    commercialGoal: "Rota IM/EV",
    step: 4,
  },
  {
    code: "TERA_AGIM_006",
    block: "TERAP",
    question: "Em relação a aplicações intramusculares, como você se sente?",
    technicalName: "Tolerância a agulha IM",
    type: "select",
    options: tolerAgulha,
    helper: "Nada aqui é obrigatório. Essa etapa só ajuda a personalizar.",
    clinicalGoal: "Operacional",
    commercialGoal: "Rota IM",
    step: 4,
  },
  {
    code: "TERA_AGEV_007",
    block: "TERAP",
    question: "Em relação a acesso endovenoso, como você se sente?",
    technicalName: "Tolerância a agulha EV",
    type: "select",
    options: tolerAgulha,
    helper: "Assim conseguimos definir o melhor caminho para você.",
    clinicalGoal: "Operacional",
    commercialGoal: "Rota EV",
    step: 4,
  },

  // ========== STEP 5 — FINANCEIRO ==========
  {
    code: "FINA_HORI_001",
    block: "FINAN",
    question:
      "Pensando em um resultado mais consistente, qual horizonte de tratamento faz mais sentido para você?",
    technicalName: "Horizonte de tratamento",
    type: "select",
    options: [
      { value: "1m", label: "1 mês" },
      { value: "3m", label: "3 meses" },
      { value: "6m", label: "6 meses" },
      { value: "12m", label: "12 meses" },
    ],
    helper:
      "Com essa etapa o sistema consegue te mostrar um plano mais realista e estratégico.",
    clinicalGoal: "Planejamento",
    commercialGoal: "Priorizar 6M / 12M",
    step: 5,
  },
  {
    code: "FINA_PERF_002",
    block: "FINAN",
    question:
      "Qual formato de investimento em saúde hoje é mais confortável para você?",
    technicalName: "Perfil de investimento",
    type: "select",
    options: [
      { value: "entrada", label: "Entrada" },
      { value: "intermediario", label: "Intermediário" },
      { value: "avancado", label: "Avançado" },
      { value: "eficiente", label: "Busco o mais eficiente" },
    ],
    helper: "Seu perfil ajuda a definir o nível de entrega mais compatível.",
    clinicalGoal: "Segmentação",
    commercialGoal: "Ticket",
    step: 5,
  },
];

/** Microtextos de transição entre etapas (planilha TEXTOS TRANSICAO APP). */
export const STEP_TRANSITIONS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Vamos começar pelo básico. É rápido e já nos dá uma visão inicial muito boa.",
  2: "Agora vamos aprofundar alguns sintomas que ajudam a deixar sua análise mais precisa.",
  3: "Estamos entendendo melhor sua rotina, recuperação e performance.",
  4: "Nesta etapa, vamos identificar formatos terapêuticos que podem tornar sua estratégia mais eficiente.",
  5: "Última etapa. Com ela, o sistema consegue organizar o formato de plano mais adequado para você.",
};

/** Microtextos comerciais (planilha QUESTIONARIO COMERCIAL). */
export const COMMERCIAL_MICROTEXTS = {
  abertura:
    "Com mais 30 segundos, conseguimos deixar sua análise muito mais precisa.",
  posBlocoClinico:
    "Sua análise inicial já foi registrada. Agora vamos refinar o formato mais inteligente para sua rotina.",
  antesTerapias:
    "Alguns pacientes evoluem bem com o básico. Outros preferem estratégias mais eficientes e completas.",
  antesFinanceiro:
    "Com esta última etapa, o sistema organiza o plano mais coerente com sua realidade e com maior chance de resultado.",
  horizonte:
    "Planos mais longos costumam oferecer mais consistência, mais ajuste fino e melhor custo-benefício global.",
};

export const STEP_TITLES: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Dados e clínico básico",
  2: "Sintomas funcionais",
  3: "Rotina, cirurgias e performance",
  4: "Preferências terapêuticas",
  5: "Horizonte e investimento",
};

export function questionsForStep(step: 1 | 2 | 3 | 4 | 5): Question[] {
  return QUESTIONS.filter((q) => q.step === step);
}

export type AnswerMap = Record<string, string | undefined>;
