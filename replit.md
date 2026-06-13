# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

**Product identity**: PACTOR Protocols® — Integrated Treatment Management System, developed by PADCON Platform® (Advanced Systems Architecture, Dr. Caio Pádua). PADCOM Anamnese is the current module (~15% of the larger Integrative-Health-Engine system). GitHub remote: `caio-padua/Pactor`.

## Collaboration model (`consultores/`)

Multi-AI workflow, agents named by their platform. `consultores/` holds lanes: `dr-replit` (the agent inside Replit — THIS workspace — builder/senior programmer/implementer), `dr-claude` (the Claude app chat — technical auditor/strategist: architecture, data model, specs), `dr-code` (specialist AI like ChatGPT — clinical/content reviewer). Rule: Dr. Claude & Dr. Code suggest, Dr. Replit implements, Dr. Caio approves. Pactor is a leaner system parallel to PAWARDS (Integrative-Health-Engine, the larger production project). GitHub is the bridge (push/pull). See `README.md` and `consultores/README.md`.

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
