# PACTOR Protocols®
### Integrated Treatment Management System

Desenvolvido por PADCON Platform® — Advanced Systems Architecture.
Empresa do Dr. Caio Padua, responsavel pelo desenvolvimento e arquitetura de sistemas.

---

## O que e

PACTOR Protocols e um sistema de gestao integrada de tratamento.
O modulo atual deste repositorio e o PADCOM Anamnese: anamnese digital do paciente.
Tem questionario progressivo de 5 modulos (34 perguntas), motor de score 0-100, condutas por faixa, motores clinicos (exames, formula, IM/EV/implantes) e funil comercial.

## Os dois irmaos: Pactor x PAWARDS

1. PACTOR (este repo) e o irmao menor, agil, focado em "agora e suficiente".
2. PAWARDS / Integrative-Health-Engine e o irmao maior, robusto, focado em "tudo e escalavel".
3. Nao sao rivais: sao complementares no tempo.
4. O Pactor da autonomia clinica ao CEO ja, enquanto o PAWARDS amadurece.
5. Horizonte futuro do Pactor: sistema unico para 1 clinica que quer simplicidade.

## A aldeia — 4 ambientes

| Ambiente | Proposito |
|----------|-----------|
| PAWARDS / Integrative-Health-Engine | Producao multi-SaaS: banco real, motor clinico, multiclinica, monetizacao. |
| PACTOR (este repo)                  | Laboratorio: front-first, mock, protocolagem rapida. |
| RAS KAIZEN v8 (Apps Script)         | Operacao financeira de hoje: orcamento, financeiro, agenda. |
| claude.ai                           | Orquestracao: specs, arquitetura, auditoria. |

## Matriz de papeis (1 cacique = Caio)

| Papel | Quem | Faz |
|-------|------|-----|
| Caio (cacique)     | Dr. Caio Padua          | Decide, valida clinica, testa como medico. Nao programa. |
| Dr. Claude         | claude.ai               | Orquestra, escreve specs, audita. Nao comita. |
| Dr. Replit IHE     | agente do IHE (Replit)  | Senior de producao: banco vivo, migrations, backend. |
| Dr. Replit Pactor  | agente deste repo       | Senior de laboratorio: prototipa com mock. |
| Dr. Code           | Claude Code CLI (PC)    | Pleno: UI, componentes, commits nos dois repos. |

## Fluxo padrao de uma feature

1. Caio bate o martelo de visao.
2. Dr. Claude escreve a spec em `/docs` (numerada).
3. Dr. Replit Pactor prototipa rapido com mock.
4. Caio valida vendo e clicando no preview.
5. Aprovado: Dr. Replit IHE absorve no PAWARDS via `git pull`.
6. Dr. Claude audita o resultado contra a spec.

## Regras de ferro

1. R1: spec antes de codigo.
2. R2: DDL e esqueleto, UPSERT e sangue (cultura; no Pactor o dado e mock).
3. R3: nada de fantasia; nao anunciar entregue sem hash no GitHub.
4. R4: a aldeia tem 1 cacique; as IAs sugerem, Caio decide.
5. R5: TDAH/TOC friendly no que Caio le: numerado, uma frase por linha, tabelas alinhadas, zero emoji em texto tecnico, virgula decimal PT-BR.
6. R6: nomes semanticos completos, nunca abreviar.
7. R7: so e entregue quando o codigo esta no GitHub e um caso real foi testado.

## Estrutura do projeto

Monorepo pnpm + TypeScript.

- `artifacts/padcom` — app PADCOM Anamnese (React + Vite, mock). Coracao do projeto.
- `artifacts/api-server` — API Express compartilhada.
- `artifacts/mockup-sandbox` — preview de componentes.
- `lib/` — bibliotecas compartilhadas.
- `docs/` — specs numeradas (escritas pelo Dr. Claude).
- `consultores/` — papeis e sugestoes das IAs (ver `consultores/README.md`).

## Stack

pnpm workspaces. Node 24. TypeScript 5.9. Express 5. PostgreSQL + Drizzle (producao). Zod. Orval. React + Vite.

---

© PADCON Platform® — Advanced Systems Architecture. Todos os direitos reservados.
