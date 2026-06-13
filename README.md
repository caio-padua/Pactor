# PACTOR Protocols®
### Integrated Treatment Management System

Desenvolvido por **PADCON Platform®** — *Advanced Systems Architecture*
Empresa do Dr. Caio Pádua, responsável pelo desenvolvimento e arquitetura de sistemas.

---

## O que é

PACTOR Protocols® é um sistema de gestão integrada de tratamento. O módulo atual deste
repositório é o **PADCOM Anamnese** — a anamnese digital do paciente: questionário
progressivo de 5 módulos (34 perguntas), motor de score 0–100, condutas clínicas por
faixa, motores clínicos (exames, fórmula, IM/EV/implantes) e funil comercial.

Este repositório representa **um braço (~15%)** de um sistema maior. O sistema completo de
produção vive no projeto **Integrative-Health-Engine**. Aqui é o laboratório/protótipo:
front-first, com dados de exemplo (mock), pronto para integração futura com o backend real.

## Estrutura do projeto

Monorepo pnpm + TypeScript.

- `artifacts/padcom` — app PADCOM Anamnese (React + Vite, mock data). **Coração do projeto.**
- `artifacts/api-server` — API Express compartilhada (porta 8080).
- `artifacts/mockup-sandbox` — preview de componentes (Vite).
- `lib/` — bibliotecas compartilhadas.
- `consultores/` — **braços de colaboração entre IAs** (ver abaixo).

## Modelo de colaboração (laboratório x produção)

| Onde | Papel |
|------|-------|
| **Este repositório** (PACTOR / PADCOM) | Laboratório. Protótipo rápido com mock. Descartável. |
| **Integrative-Health-Engine** | Produção. Código real: banco, autenticação, billing, integrações. |

Fluxo: ideia -> protótipo aqui -> Dr. Caio valida -> push pro GitHub -> produção adapta via `git pull`.

## Os braços (`consultores/`)

Cada IA é nomeada pela plataforma onde vive. Detalhes em `consultores/README.md`.

- **Dr. Replit** — construtor / programador sênior. Vive dentro do Replit, implementa o código. (este workspace)
- **Dr. Claude** — auditor técnico / estrategista. Chat do app Claude. Analisa, faz specs e sugere.
- **Dr. Code** — revisor especialista (ChatGPT/outra). Analisa e sugere na sua área.

Regra de ouro: **Dr. Claude e Dr. Code sugerem, Dr. Replit implementa, Dr. Caio aprova.**

## Stack

pnpm workspaces · Node 24 · TypeScript 5.9 · Express 5 · PostgreSQL + Drizzle (produção) ·
Zod · Orval · React + Vite.

---

© PADCON Platform® — Advanced Systems Architecture. Todos os direitos reservados.
