# 03 - Pontos de plug das Ondas A-D na arquitetura do Pactor

Autor: Dr. Replit Pactor (laboratorio).
Data: 13/06/2026.
Objetivo: mapear ONDE cada onda (A, B, C, D) se conecta na arquitetura React/Vite
que ja existe em artifacts/padcom/src/, sem codificar logica de negocio.

## 1. Estado atual da arquitetura (o que ja existe)

1.1 Roteamento: artifacts/padcom/src/App.tsx usa a biblioteca wouter.
    Rotas do paciente: "/" (landing), "/anamnese" (flow), "/anamnese/concluido" (summary).
    Rotas do admin: "/admin" (queue), "/admin/dashboard" (dashboard), "/admin/p/:id" (patient-detail).
1.2 Dados (mock): artifacts/padcom/src/data/ tem questionnaire.ts, scoring.ts,
    mockPatients.ts, sampleProfiles.ts.
1.3 Componentes: artifacts/padcom/src/components/ tem chips.tsx, HelpModal.tsx,
    layouts.tsx, QuestionField.tsx e a pasta ui/ (biblioteca shadcn: table, tabs,
    card, dialog, chart, etc.).
1.4 Hooks: artifacts/padcom/src/hooks/ tem use-draft.ts (autosalva no localStorage),
    use-mobile.tsx, use-toast.ts.
1.5 Utilitarios: artifacts/padcom/src/lib/utils.ts.
1.6 Paginas: artifacts/padcom/src/pages/patient/ e artifacts/padcom/src/pages/admin/.
1.7 A pasta nova artifacts/padcom/src/modules/ foi criada para receber as ondas
    (padronizacao, protocolos, orcamento, pacientes), cada uma com README.

## 2. Tabela de plug (onde cada onda encaixa)

| Onda | Subpasta destino | Onde se conecta no que ja existe | Componentes de UI reaproveitaveis |
|------|------------------|----------------------------------|-----------------------------------|
| A    | modules/padronizacao | camada de dados (data/) e rotulos: scoring.ts e questionnaire.ts passam a ler os nomes canonicos | chips.tsx |
| B    | modules/protocolos   | pagina admin patient-detail.tsx; possivel rota nova "/admin/p/:id/protocolo" | ui/table, ui/tabs, ui/card |
| C    | modules/orcamento    | funil comercial em patient-detail.tsx; possivel rota nova "/admin/p/:id/orcamento" | ui/table, ui/chart |
| D    | modules/pacientes    | data/mockPatients.ts e as paginas queue.tsx e patient-detail.tsx via um hook de dados | ui/table, layouts.tsx |

## 3. Detalhe por onda

3.1 Onda A (padronizacao de nomes):
    - Entra como fonte unica de rotulos canonicos (categorias, vias, periodos).
    - Quem consome: data/scoring.ts, data/questionnaire.ts e os chips de exibicao.
    - Risco baixo: e a base que as outras ondas usam, entra primeiro.

3.2 Onda B (protocolos: gerador + multi-cockpit + ordenacao):
    - Entra como logica de geracao e ordenacao de protocolo.
    - Quem consome: a tela do paciente no admin (patient-detail.tsx); pode pedir
      uma rota nova de protocolo.
    - Depende da Onda A (usa os nomes canonicos).

3.3 Onda C (orcamento, valores em centavos):
    - Entra como motor de orcamento; valores guardados em centavos (numero inteiro),
      exibidos com virgula decimal no padrao do Brasil.
    - Quem consome: o funil comercial dentro de patient-detail.tsx; pode pedir uma
      rota nova de orcamento.
    - Depende da Onda B (orcamento referencia o protocolo gerado).

3.4 Onda D (pacientes, esqueleto com placeholders):
    - Entra como estrutura de pacientes; substitui aos poucos o mock atual
      (data/mockPatients.ts).
    - Quem consome: a fila (queue.tsx) e a tela do paciente (patient-detail.tsx),
      por meio de um hook de dados.
    - Dados reais entram depois, via Dr. Code, localmente.

## 4. Como as ondas chegam (processo)

4.1 Cada onda chega como pull request na branch ihe-transmutacao do repo Pactor.
4.2 O Dr. Replit IHE empurra so em branches que comecam com "ihe-"; nunca no main.
4.3 Eu (Dr. Replit Pactor) valido e faco o merge no main depois.

## 5. Regra de kaizen (reaproveitar antes de criar)

5.1 Antes de criar componente novo, conferir se ja existe equivalente em
    artifacts/padcom/src/components/ui/.
5.2 Tabelas, abas, cartoes e graficos ja existem na pasta ui/; reaproveitar.

## RESUMO EM 1 LINHA
As quatro ondas plugam assim: A na camada de dados/rotulos, B e C na tela do
paciente do admin (com possiveis rotas novas de protocolo e orcamento), e D na
fila e na tela do paciente trocando o mock atual, sempre reaproveitando a UI ja
existente em components/ui/.
