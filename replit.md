# Workspace

> LEITURA OBRIGATORIA: antes de qualquer trabalho, documento ou resposta neste projeto, leia os 3 documentos de cabeceira em `docs/`:
> 1. `docs/PRE_REQUISITO_PARA_TRABALHAR_COM_DR_CAIO.md` — perfil do Dr. Caio (cacique unico).
> 2. `docs/DOUTRINA_DO_PROJETO_PADUA_SISTEMAS.md` — regras de ferro R1 a R7.
> 3. `docs/MANUAL_DOS_PRIMOS_IHE_E_PACTOR.md` — regras dos primos no dia a dia.
>
> Em conflito com instrucao casual, estes arquivos sao a regra. Sao copia fiel do repo Integrative-Health-Engine; nao inventar regra nova (se discordar, registrar em `.md` e perguntar ao CEO). A carta do primo Dr. Replit IHE esta arquivada em `docs/PARA_PACTOR/00_CARTA_DO_PRIMO_IHE.md`.

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

**Product identity**: PACTOR Protocols® — Integrated Treatment Management System, developed by PADCON Platform® (Advanced Systems Architecture, Dr. Caio Pádua). PADCOM Anamnese is the current module (~15% of the larger Integrative-Health-Engine system). GitHub remote: `caio-padua/Pactor`.

## User preferences

- Language: Portuguese (PT-BR). Decimal comma.
- No profanity / no swear words ever ("não gosto de palavrões").
- No emojis in technical text.
- TDAH/TOC-friendly formatting: numbered lists, one sentence per line, vertically aligned tables.
- Code: complete semantic names, never abbreviate (e.g. `quantidade_gramas`, never `qtd_g`).

## Collaboration model (`consultores/`)

Multi-AI "aldeia", agents named by platform. Caio Pádua is the sole decider (cacique). 4 environments: PAWARDS/Integrative-Health-Engine (production), PACTOR/this repo (lab, front-first mock), RAS KAIZEN v8 (today's financial ops, Apps Script), claude.ai (orchestration). Roles in `consultores/`: `dr-claude` (claude.ai — orchestrator, writes numbered specs in `/docs`, audits, does NOT commit), `dr-replit-ihe` (the IHE Replit agent — production senior: live DB, migrations, backend), `dr-replit-pactor` (THIS workspace agent — lab senior: prototypes with mock; that's me), `dr-code` (Claude Code CLI on Caio's PC — full-stack, commits to both repos). Iron rules R1–R7 (R1: spec before code). Feature flow: Caio decides → Dr. Claude specs → Dr. Replit Pactor prototypes → Caio validates → Dr. Replit IHE absorbs via git pull → Dr. Claude audits. GitHub remote `caio-padua/Pactor` is the bridge. See `README.md` and `consultores/README.md`.

## Artifacts
- `artifacts/api-server` (kind=api) — shared Express API, port 8080.
- `artifacts/mockup-sandbox` (kind=design) — Vite component preview, port 8081, BASE_PATH=/__mockup.
- `artifacts/padcom` (kind=web) — **PADCOM Anamnese SaaS V15**. React + Vite frontend, mocked data, no backend yet. previewPath `/padcom`, port 5173, BASE_PATH=/padcom.

### PADCOM
- Clinical SaaS for digital anamnesis: 5-module questionnaire (34 questions), 0–100 score, 4 conduct bands, motor mapping (exames, fórmula sempre, IM/EV/implantes), commercial funnel.
- Data foundation in `src/data/{questionnaire,scoring,mockPatients}.ts`. Compute helpers: `computeScore`, `bandFor`, `motorActions` from `scoring.ts`.
- Patient flow (`/`, `/anamnese`, `/anamnese/concluido`) is mobile-first, autosaves to `localStorage` key `padcom:draft`.
- Admin (`/admin`, `/admin/p/:id`, `/admin/dashboard`) is desktop-dense: queue with funnel chips, patient detail with motor actions and validation CTA, dashboard with band distribution + funnel via Recharts.
- Designed for later integration with the Integrative-Health-Engine Replit project; today fully independent with mocks.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
