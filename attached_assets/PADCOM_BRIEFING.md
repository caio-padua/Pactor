# PADCOM Anamnese SaaS V15 — Briefing técnico completo

> Documento de transferência de contexto. Cole no chat para que outro assistente entenda 100% do produto: visão, arquitetura, código, lógica clínica, motor de score, perguntas, estratégias de captação e roadmap.

---

## 1. Visão de produto

**O que é:** SaaS clínico de **anamnese digital progressiva** que substitui o questionário tradicional pré-consulta. O paciente responde no celular, em ~6 minutos, e o sistema gera automaticamente:

- **Score 0–100** que classifica o caso em 4 faixas de conduta
- **Lista de exames sugeridos**
- **Indicação de fórmula manipulada** (sempre presente) + **vias de potencialização** quando indicadas: IM (intramuscular), EV (endovenosa) e implante
- **Status no funil comercial** (4 estágios) para a equipe priorizar follow-up
- **Flags clínicas de validação humana obrigatória** (ex.: histórico de infarto, AVC, uso contínuo de medicamentos)

**Público:** clínicas de medicina integrativa / nutrologia / endocrinologia que querem qualificar leads e padronizar o primeiro raio-x do paciente antes da consulta presencial.

**Tese comercial:** anamnese digital qualifica antecipadamente, reduz no-show, cria oportunidade de upsell de plano longo (6m/12m) e libera o médico de coletar dado bruto na consulta.

**Status atual:** front-end completo, mockado, rodando em produção via Replit. Estrutura desenhada para receber depois o backend "Integrative-Health-Engine" (projeto Replit separado).

---

## 2. Stack & arquitetura

- **Monorepo pnpm** (workspace) com 3 artefatos:
  - `artifacts/api-server` (Express, porta 8080) — placeholder para backend futuro
  - `artifacts/mockup-sandbox` (Vite, porta 8081) — preview de componentes isolados
  - **`artifacts/padcom`** (Vite + React 18 + TypeScript, porta 5173) — **o app em si**
- **Roteamento:** `wouter` com base path `/padcom`
- **UI:** TailwindCSS + componentes shadcn/ui (Radix), tipografia Inter
- **Estado:** `useState` local + `useDraft` hook que persiste em `localStorage` (chave `padcom:draft`)
- **Gráficos:** Recharts (dashboard da clínica)
- **Idioma:** 100% pt-BR, sem emojis
- **Paleta:** verde-oliva calmo (médica/tecnológica), neutros quentes
- **Dados:** todos mockados em `src/data/`, prontos para troca por chamadas reais

### Estrutura de arquivos do app

```
artifacts/padcom/src/
├── App.tsx                       # rotas wouter
├── main.tsx                      # bootstrap
├── data/
│   ├── questionnaire.ts          # 34 perguntas, 5 módulos, microtextos
│   ├── scoring.ts                # motor: pesos, faixas, ações, funil
│   ├── mockPatients.ts           # 6 pacientes de exemplo
│   └── sampleProfiles.ts         # 3 perfis demo (básico/avançado/full)
├── hooks/
│   └── use-draft.ts              # autosave em localStorage
├── components/
│   ├── layouts.tsx               # PatientLayout / AdminLayout
│   ├── QuestionField.tsx         # renderiza pergunta + modal "Ver explicação"
│   ├── chips.tsx                 # ScoreBadge, BandChip, FunnelChip
│   └── ui/                       # shadcn (button, card, dialog, progress…)
└── pages/
    ├── patient/
    │   ├── landing.tsx           # hero + 3 cards + Modo Demonstração
    │   ├── flow.tsx              # 5 etapas com progress + sticky CTA
    │   └── summary.tsx           # score animado + faixa + ações + flags
    └── admin/
        ├── queue.tsx             # fila com chips de funil + busca + filtros
        ├── patient-detail.tsx    # detalhe + matriz por sistema + CTA validação
        └── dashboard.tsx         # Recharts: barras por faixa + funil + atividade
```

### Rotas

| Path                       | Tela                                  |
|----------------------------|---------------------------------------|
| `/`                        | Landing do paciente + Modo Demonstração |
| `/anamnese`                | Fluxo de 5 etapas                     |
| `/anamnese/concluido`      | Resumo com score, faixa, ações        |
| `/admin`                   | Fila da equipe com chips de funil     |
| `/admin/p/:id`             | Detalhe do paciente                   |
| `/admin/dashboard`         | Dashboard (gráficos)                  |

---

## 3. Catálogo completo das 34 perguntas (V15)

Cada pergunta tem:
- `code` semântico (ex.: `CARD_DOEN_HASA_001`) usado pelo motor
- `block` clínico (CARDIO, METAB, ENDO, SONO, INTEST, HORMO, HUMOR, CIRUR, MEDIC, ATIVI, TERAP, FINAN, DADOS)
- `step` (1 a 5) que define em qual módulo aparece
- `clinicalGoal` (objetivo clínico interno)
- `commercialGoal` (objetivo comercial interno)
- `helper` (texto curto sob o campo)
- `technicalName` (mostrado no modal "Ver explicação")

### Módulo 1 — Dados + clínico básico (9 perguntas)

| Code | Pergunta | Tipo | Clínico | Comercial |
|---|---|---|---|---|
| DADO_IDEN_NOME_001 | Qual seu nome completo? | text | Identificação | Cadastro |
| DADO_IDEN_NASC_002 | Qual sua data de nascimento? | date | Idade/risco | Cadastro |
| CARD_DOEN_HASA_001 | Você tem pressão alta? | select (não/controlada/descontrolada) | Risco cardio | Exames + fórmula |
| CARD_DOEN_INFA_002 | Já teve infarto? | sim/não | Risco cardio alto | **Validação humana** |
| CARD_DOEN_AVCX_003 | Já teve derrame? | sim/não | Risco neurovascular | **Validação humana** |
| META_DOEN_DIAB_001 | Você tem diabetes? | select (não/pré/controlada/descontrolada) | Risco metabólico | Fórmula + exames + EV |
| META_DOEN_DISL_002 | Colesterol/triglicérides altos? | sim/não | Risco metabólico | Fórmula + exames |
| ENDO_DOEN_HIPO_001 | Hipotireoidismo? | sim/não | Endócrino | Fórmula + exames |
| ENDO_DOEN_HASH_002 | Hashimoto? | sim/não | Autoimune endócrino | Fórmula + exames |

### Módulo 2 — Sintomas funcionais (6 perguntas)

| Code | Pergunta | Tipo |
|---|---|---|
| SONO_SINT_INSO_001 | Como está seu sono? | escala 0–5 |
| SONO_SINT_TIPO_002 | Pegar no sono ou continuar dormindo? | select (pegar/manter/ambos/não) |
| INST_SINT_FUNC_001 | Seu intestino funciona bem? | escala 0–5 |
| INST_SINT_TIPO_002 | Padrão intestinal | select (normal/preso/solto/oscila/estufamento) |
| LIBI_SINT_SEXO_001 | Como está sua libido? | escala 0–5 |
| HUMO_SINT_ANSI_001 | Humor e ansiedade? | escala 0–5 |

### Módulo 3 — Cirurgias, medicamentos, atividade (9 perguntas)

| Code | Pergunta | Tipo |
|---|---|---|
| CIRU_GERA_COLE_001 | Já retirou a vesícula? (colecistectomia) | sim/não |
| CIRU_GERA_HIST_002 | Já retirou o útero? (histerectomia) | sim/não |
| CIRU_GERA_OOFO_003 | Já retirou os ovários? (ooforectomia) | sim/não |
| CIRU_GERA_ARTL_004 | Cirurgia de coluna? (artrodese) | sim/não |
| MEDI_USO_CONT_001 | Usa medicamentos contínuos? | sim/não |
| MEDI_USO_NOME_002 | Quais medicamentos? | text |
| ATIV_FREQ_001 | Pratica atividade física? | select (não/1-2x/3-4x/5+) |
| ATIV_TIPO_002 | Tipo de exercício | select (musculação/aeróbico/ambos/caminhada/nenhum) |
| ATIV_ENER_003 | Energia para treinar | escala 0–5 |

### Módulo 4 — Preferências terapêuticas (7 perguntas)

| Code | Pergunta | Tipo |
|---|---|---|
| TERA_PLANO_001 | Plano mais completo p/ acelerar resultados? | toggle (sim/talvez/básico) |
| TERA_IM_002 | Aplicações intramusculares? | toggle (sim/talvez/depois) |
| TERA_EV_003 | Terapias endovenosas? | toggle (sim/talvez/depois) |
| TERA_IMPL_004 | Implantes? | toggle (sim/talvez/depois) |
| TERA_LOGI_005 | Logística (clínica/às vezes/prático) | select |
| TERA_AGIM_006 | Tolerância a agulha IM | select (sem problema/leve receio/evitar) |
| TERA_AGEV_007 | Tolerância a agulha EV | select |

### Módulo 5 — Financeiro (2 perguntas)

| Code | Pergunta | Tipo |
|---|---|---|
| FINA_HORI_001 | Horizonte de tratamento | select (1m/3m/6m/12m) |
| FINA_PERF_002 | Perfil de investimento | select (entrada/intermediário/avançado/eficiente) |

---

## 4. Motor de score — como gira

### 4.1 Pesos por código

```ts
const WEIGHTS = {
  CARD_DOEN_HASA_001: 3,
  CARD_DOEN_INFA_002: 5,   // peso máximo: infarto
  CARD_DOEN_AVCX_003: 5,   // peso máximo: AVC
  META_DOEN_DIAB_001: 4,
  META_DOEN_DISL_002: 3,
  ENDO_DOEN_HIPO_001: 2,
  ENDO_DOEN_HASH_002: 2,
  SONO_SINT_INSO_001: 3,
  INST_SINT_FUNC_001: 3,
  LIBI_SINT_SEXO_001: 2,
  HUMO_SINT_ANSI_001: 2,
  ATIV_FREQ_001: 2,        // sedentarismo aumenta score
  ATIV_ENER_003: 2,
  TERA_IM_002: 1,          // abertura comercial pesa baixo
  TERA_EV_003: 1,
  TERA_IMPL_004: 1,
  FINA_HORI_001: 2,
  FINA_PERF_002: 2,
};
```

### 4.2 Conversão da resposta em pontos brutos

- **Selects de severidade:** ex. HAS → não=0, controlada=1, descontrolada=2
- **Sim/não graves (infarto, AVC):** sim=3
- **Diabetes:** não=0, pré=1, controlada=2, descontrolada=3
- **Escalas 0–5:** valor literal
- **Atividade física:** invertida (5+/sem=0, 3-4x=1, 1-2x=2, **não=3**) — sedentário pesa mais
- **Preferências terapêuticas:** sim=2, talvez=1, depois=0
- **Horizonte financeiro:** 12m=4, 6m=3, 3m=2, 1m=1
- **Perfil de investimento:** eficiente=4, avançado=3, intermediário=2, entrada=1

### 4.3 Cálculo final

```
rawTotal = Σ (pontos_codigo × peso_codigo)
rawMax   = Σ (pontos_max_possivel × peso_codigo)
score    = round((rawTotal / rawMax) × 100)   // 0..100 normalizado
```

### 4.4 Faixas de conduta (matriz)

| Faixa | Range | Conduta |
|---|---|---|
| **Básico** | 0–20 | Fórmula base |
| **Intermediário** | 21–50 | Fórmula + IM |
| **Avançado** | 51–80 | Fórmula + IM + EV |
| **Full** | 81–100 | Fórmula + IM + EV + Implante |

### 4.5 Mapa Anamnese → Motor (regras determinísticas)

Independente do score, certas respostas disparam ações automaticamente:

```
HAS ≠ não                      → Painel cardiometabólico
Diabetes ≠ não                 → Glicemia + HbA1c + insulina
Diabetes descontrolada         → libera EV
Dislipidemia = sim             → Lipidograma completo
Hipo OU Hashimoto              → TSH, T3, T4 livre, anti-TPO
Intestino (escala) ≥ 3         → Avaliação intestinal funcional
TERA_IM ∈ {sim,talvez}         → libera IM
TERA_EV ∈ {sim,talvez}         → libera EV
TERA_IMPL ∈ {sim,talvez}       → libera Implante
fórmula                        → SEMPRE implícita (não precisa marcar)
```

### 4.6 Flags clínicas (validação humana obrigatória)

- `CARD_DOEN_INFA_002 = sim` → "Validação humana obrigatória — histórico de infarto"
- `CARD_DOEN_AVCX_003 = sim` → "Validação humana obrigatória — histórico de AVC"
- `MEDI_USO_CONT_001 = sim` → "Revisar interações medicamentosas"
- `CIRU_GERA_OOFO_003 = sim` → "Hormonal forte — ooforectomia"

A presença de qualquer flag de tipo `validation` **bloqueia automação** e exige aprovação manual da equipe antes de enviar protocolo ao paciente.

---

## 5. Funil comercial

Quatro estágios mapeados na planilha "FUNIL E ABANDONO":

| Status | Significado | Ação da equipe |
|---|---|---|
| **INICIOU_E_PAROU** | Paciente começou e não terminou | Enviar para CRM e contato humano |
| **CONCLUIU_CLINICO** | Terminou bloco clínico, falta financeiro | Convidar para concluir |
| **CONCLUIU_FINANCEIRO** | Anamnese completa | Gerar score e preview |
| **ALTO_INTERESSE** | Sinalizou plano completo (TERA_PLANO=sim + horizonte longo) | Priorizar follow-up |

Os chips do funil aparecem no topo da fila admin (`/admin`) com contagem em tempo real e servem como filtros.

---

## 6. Estratégia de captação (microtextos comerciais)

Embutidos no fluxo entre etapas (planilha "TEXTOS TRANSICAO APP" + "QUESTIONARIO COMERCIAL"):

```
Abertura:        "Com mais 30 segundos, conseguimos deixar sua análise muito mais precisa."
Pós-clínico:     "Sua análise inicial já foi registrada. Agora vamos refinar o formato mais inteligente para sua rotina."
Antes terapias:  "Alguns pacientes evoluem bem com o básico. Outros preferem estratégias mais eficientes e completas."
Antes financeiro:"Com esta última etapa, o sistema organiza o plano mais coerente com sua realidade e com maior chance de resultado."
Horizonte:       "Planos mais longos costumam oferecer mais consistência, mais ajuste fino e melhor custo-benefício global."
```

Transições por etapa (entre passos 1→5):

```
1: "Vamos começar pelo básico. É rápido e já nos dá uma visão inicial muito boa."
2: "Agora vamos aprofundar alguns sintomas que ajudam a deixar sua análise mais precisa."
3: "Estamos entendendo melhor sua rotina, recuperação e performance."
4: "Nesta etapa, vamos identificar formatos terapêuticos que podem tornar sua estratégia mais eficiente."
5: "Última etapa. Com ela, o sistema consegue organizar o formato de plano mais adequado para você."
```

**Princípio:** o paciente nunca é confrontado com termo técnico cru. "Hipertensão" vira "pressão alta", "AVC" vira "derrame", "ooforectomia" vira "retirou os ovários". O termo técnico fica disponível no modal "Ver explicação".

---

## 7. Modo Demonstração (validação rápida)

Na landing existem 3 perfis fictícios completos (`src/data/sampleProfiles.ts`) que carregam o questionário em 1 clique:

| Perfil | Score esperado | Características |
|---|---|---|
| **Mariana — básico** | Faixa Básico | Saudável, sem comorbidades, atividade 5+ x/sem, prefere começar simples |
| **Carlos — avançado** | Faixa Avançado | HAS controlada, pré-diabetes, dislipidemia, hipo, sintomas moderados, abre IM e EV, horizonte 6m |
| **Helena — full** | Faixa Full | Infarto + diabetes descontrolada + ooforectomia + Hashimoto + sintomas máximos + plano completo + horizonte 12m |

Cada cartão tem 2 botões: **"Ver resultado"** (vai direto pro resumo) e **"Abrir formulário preenchido"** (carrega no fluxo).

---

## 8. Painel da clínica

### 8.1 Fila (`/admin`)
- 4 chips no topo com contagem por status do funil (atuam como filtro)
- Busca por nome
- Filtros avançados (faixa de score, origem, módulo de parada)
- Cada linha: nome, idade/cidade, status colorido, origem do lead, atualização, score circular

### 8.2 Detalhe do paciente (`/admin/p/:id`)
- Cabeçalho: nome, idade, contato, score, faixa
- **Flags clínicas** em destaque (vermelho se validation, âmbar se warn)
- **Ações de motor**: chips para Fórmula / IM / EV / Implante + lista de exames
- **Matriz por sistema clínico** (cardio, metabólico, endo, sono, intestino, hormonal, humor)
- CTA "Validar e enviar protocolo" (bloqueado se houver flag de validation pendente)

### 8.3 Dashboard (`/admin/dashboard`)
- Barras: distribuição por faixa
- Funil: contagem por estágio
- Atividade recente: últimos N pacientes

---

## 9. Roadmap V16 — mudanças solicitadas (em discussão)

Pedidos do usuário pra próxima iteração, ainda não implementados:

### 9.1 Doenças por grupo (em vez de pergunta solta)
Substituir as perguntas individuais (HAS, infarto, AVC, diabetes, dislipidemia, hipo, Hashimoto…) por **painéis por sistema**:
- Painel **Cardiovascular** → checkboxes: HAS, infarto, AVC, IC, arritmia, valvulopatia… cada uma com status `diagnosticado | potencial`
- Mesmo padrão para: Metabólico, Endócrino, Digestivo, Neuro/Humor
- Vantagem: maior captação clínica + UX menos cansativa

### 9.2 Medicamentos como matriz dosada
Cada medicamento vira uma linha com:
- Nome + dosagem unitária (mg)
- Doença associada (link com painel de comorbidades, ou "outra" customizada)
- Distribuição **manhã / tarde / noite** com **número de comprimidos por turno**
- Total diário calculado
- Permite o motor "andar" horizontal/vertical pra disparar regras: lembretes WhatsApp por turno, alerta de polifarmácia, interações, carga por turno, adesão estimada

### 9.3 Sono detalhado
4 sub-escalas em vez de 2 perguntas:
- Dificuldade pra pegar no sono (0–5)
- Despertar à noite (0–5)
- Sono fragmentado (0–5)
- Sonolência diurna excessiva (0–5)

### 9.4 Atividade física múltipla com sub-bloco
Múltipla escolha (musculação, corrida, ciclismo, natação, caminhada, yoga, pilates, luta, dança, outro). Para cada selecionada:
- Frequência (x/semana)
- Período (manhã / tarde / noite)
- Intensidade (leve / moderada / intensa)

Objetivo: alimentar recomendação de **modulação de cortisol** (ex.: "musculação intensa à noite tende a elevar cortisol — sugerir deslocar pra manhã").

### 9.5 Vídeo explicativo por pergunta
Cada pergunta com player de vídeo no modal "Ver explicação". Decisão pendente: vídeos serão gravados pelo médico e adicionados pelo painel admin (campo `videoUrl` opcional + placeholder "Vídeo em breve").

### 9.6 Recalibragem do motor
Adaptar `WEIGHTS`, `rawPoints` e `motorActions` pra absorver os novos campos sem quebrar a normalização 0–100.

---

## 10. Próximos passos técnicos (pós V16)

1. **Backend Integrative-Health-Engine**: substituir `mockPatients.ts` por API real (REST/tRPC), persistir respostas no Postgres, autenticação da equipe.
2. **Disparo WhatsApp**: webhook por turno (manhã/tarde/noite) com lembrete de medicação dosada.
3. **Geração de PDF**: protocolo final assinado pelo médico responsável.
4. **Auditoria clínica**: log de quem validou cada flag e quando.
5. **Multi-clínica**: tenancy por slug, branding configurável.

---

## 11. Convenções de código

- **TypeScript estrito**, sem `any`
- **Componentes funcionais + hooks**, sem class components
- **Tailwind utility-first**, sem CSS solto exceto `index.css` global
- **Wouter** para roteamento (`Switch`/`Route`/`Link`/`useLocation`), com `base={import.meta.env.BASE_URL.replace(/\/$/, '')}` para respeitar o prefixo `/padcom`
- **Persistência local:** todas as respostas no `localStorage` via `useDraft`. Importante: `setAllAnswers` escreve **síncrono** no storage antes de navegar (corrige race condition na navegação para `/anamnese/concluido`)
- **Sem emojis** em nenhum lugar visível ao usuário
- **Tudo em pt-BR**, incluindo nomes de variáveis comerciais quando fizer sentido clínico (`FUNNEL_STATUSES`, `BANDS`)

---

## 12. Como rodar localmente

```bash
pnpm install
pnpm --filter @workspace/padcom run dev    # http://localhost:5173/padcom
pnpm --filter @workspace/padcom exec tsc --noEmit   # typecheck
```

A app está publicada via Replit Deploy (URL `.replit.app`).

---

## 13. Princípios de design não-negociáveis

1. **Mobile-first** no fluxo do paciente, **desktop-dense** no painel da equipe
2. **Tom calmo, profissional, sem alarme** — paciente fragilizado não pode sentir pressão
3. **Termo técnico só no modal** — superfície sempre em linguagem natural
4. **Score nunca é punitivo** — é descritivo. Faixa "Full" ≠ "você está mal"; significa "você se beneficia do plano completo"
5. **Validação humana é sagrada** — qualquer flag bloqueia automação até médico aprovar
6. **Fórmula é sempre implícita** — não pergunte ao paciente se quer fórmula, ele já está na clínica certa pra isso

---

*Briefing gerado para transferência de contexto entre assistentes. Use como fonte única da verdade do estado atual do PADCOM Anamnese SaaS V15.*
