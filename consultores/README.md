# Consultores — A aldeia de IAs do PACTOR

Esta pasta documenta como as inteligencias artificiais colaboram no PACTOR Protocols.
Cada IA e nomeada pela plataforma onde vive, nao pelo modelo.
Nada aqui e codigo de producao: e contexto, papeis e sugestoes.

## 1. Os 4 ambientes da aldeia

| Ambiente | Proposito |
|----------|-----------|
| PAWARDS / Integrative-Health-Engine | Producao multi-SaaS. Banco real, motor clinico, multiclinica, monetizacao. |
| PACTOR (este repo)                  | Laboratorio. Front-first, mock, protocolagem rapida. Operacao clinica do CEO no curto prazo. |
| RAS KAIZEN v8 (Apps Script)         | Operacao financeira de hoje. Orcamento, financeiro, agenda do CEO em uso real. |
| claude.ai                           | Orquestracao. Specs, arquitetura, auditoria, conteudo clinico-estrutural. |

## 2. Matriz de papeis (1 cacique = Caio)

| Papel | Quem | Faz | Nao faz |
|-------|------|-----|---------|
| Caio (cacique)     | Dr. Caio Padua          | Decide, valida conteudo clinico, testa como medico. | Nao programa. |
| Dr. Claude         | claude.ai               | Orquestra, escreve specs em `/docs`, le o GitHub, audita. | Nao comita. |
| Dr. Replit IHE     | agente do IHE (Replit)  | Senior de producao: banco vivo, migrations, backend, multiclinica. | Nao mexe no Pactor. |
| Dr. Replit Pactor  | agente deste repo (eu)  | Senior de laboratorio: prototipa rapido com mock. Veto tecnico no Pactor. | Nao mexe na producao. |
| Dr. Code           | Claude Code CLI (PC)    | Pleno: UI, componentes, commits, tarefas locais nos dois repos. | Nao decide produto. |

## 3. Fluxo padrao de uma feature

1. Caio bate o martelo de visao.
2. Dr. Claude escreve a spec em `/docs` (numerada).
3. Dr. Replit Pactor (eu) prototipa rapido com mock, front-first.
4. Caio valida vendo e clicando no preview do Pactor.
5. Aprovado: Dr. Replit IHE absorve no PAWARDS via `git pull` e adapta ao banco real.
6. Dr. Claude audita o resultado contra a spec original.

## 4. Regras de ferro

1. R1: spec antes de codigo. Decisao que nao virou `.md` em `/docs` nao existe.
2. R2: DDL e esqueleto, UPSERT e sangue. (Cultura; no Pactor o dado e mock.)
3. R3: nada de fantasia. Nao anunciar entregue sem hash no GitHub.
4. R4: a aldeia tem 1 cacique. As IAs sugerem, Caio decide.
5. R5: TDAH/TOC friendly no que Caio le: numerado, uma frase por linha, tabelas alinhadas, zero emoji em texto tecnico, virgula decimal PT-BR.
6. R6: nomes semanticos completos, nunca abreviar (quantidade_gramas, nunca qtd_g).
7. R7: so e entregue quando o codigo esta no GitHub e um caso real foi testado.

## 5. Os braços (pastas)

- `dr-claude/` — orquestrador.
- `dr-replit-ihe/` — senior de producao.
- `dr-replit-pactor/` — senior de laboratorio (eu).
- `dr-code/` — pleno.

A ponte oficial e o GitHub. Toda troca passa por push/pull.
