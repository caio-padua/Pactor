# Carta do Pactor para o Dr. Replit Manager (versao 2, com zelo)

> Bloco ASCII puro, pronto para colar no Dr. Replit Manager (Art. 48).
> Reescrito em 16/06/2026 por Dr. Replit Pactor a pedido do CEO Dr. Caio.
> Foco desta versao: explicar o PORQUE de cada tela, garantir que o
> cliente ENTENDEU, e exigir melhoria continua (Kaizen).

```
================================================================
CARTA DO CEO DR. CAIO (via Dr. Replit Pactor) - VERSAO 2 (ZELO)
PARA: Dr. Replit Manager (produto Padcon Conect)
ASSUNTO: clonar a anamnese do PADCOM e MELHORAR pela filosofia Kaizen
DATA: 16/06/2026
================================================================

CONCLUSAO PRIMEIRO:
Voce esta autorizado a clonar a jornada de anamnese do PADCOM
(repositorio caio-padua/Pactor) e adaptar ao Padcon Conect, SEM
quebrar o seu sistema. Mas o pedido do CEO nao e so copiar: e
entender o PORQUE de cada tela e MELHORAR a cada ciclo (Kaizen).

A FILOSOFIA QUE GUIA TUDO (leia antes de codar):
O cliente PRECISA ENTENDER. Cada tela existe para reduzir confusao
e garantir que a pessoa compreendeu a pergunta antes de responder.
Uma resposta dada sem entender e um dado errado que estraga a
analise inteira. Entao a regra mae e: clareza acima de velocidade.

PORQUE DE CADA TELA (a logica que voce deve preservar):

1. TELA DE ABERTURA (landing)
   - arquivo: artifacts/padcom/src/pages/patient/landing.tsx
   - o que mostra: "cerca de 6 minutos", "5 modulos", "100 por
     cento confidencial".
   - PORQUE existe: tirar o medo do formulario longo. Quem sabe
     quanto tempo leva e que os dados sao sigilosos responde com
     calma e honestidade. Confianca primeiro, perguntas depois.

2. LINHA DO TEMPO E UM BLOCO POR TELA (fluxo)
   - arquivo: artifacts/padcom/src/pages/patient/flow.tsx
   - o que mostra: "Etapa X de 5" e uma barra de progresso fixa no
     topo; cada bloco cabe em uma unica tela; botao "Continuar".
   - PORQUE existe: a pessoa SEMPRE sabe onde esta e quanto falta;
     isso evita a sensacao de formulario sem fim. Um bloco por tela
     evita sobrecarga: poucos campos de cada vez, a pessoa foca,
     entende e avanca. Pensado para quem se distrai com facilidade.

3. OS 5 BLOCOS E O TEXTO DE PASSAGEM (questionnaire)
   - arquivo: artifacts/padcom/src/data/questionnaire.ts
   - cada bloco abre com uma frase que explica o PORQUE de seguir:
     Bloco 1 - "Dados e clinico basico":
       "Vamos comecar pelo basico. E rapido e ja nos da uma visao
        inicial muito boa."
     Bloco 2 - "Sintomas funcionais":
       "Agora vamos aprofundar alguns sintomas que ajudam a deixar
        sua analise mais precisa."
     Bloco 3 - "Rotina, cirurgias e performance":
       "Estamos entendendo melhor sua rotina, recuperacao e
        performance."
     Bloco 4 - "Preferencias terapeuticas":
       "Nesta etapa, vamos identificar formatos terapeuticos que
        podem tornar sua estrategia mais eficiente."
     Bloco 5 - "Horizonte e investimento":
       "Ultima etapa. Com ela, o sistema consegue organizar o
        formato de plano mais adequado para voce."
   - PORQUE existe: o texto de passagem diz para a pessoa POR QUE
     aquele bloco importa. Ela nao responde no escuro; entende o
     sentido de cada etapa e segue motivada.

4. AJUDA NA DUVIDA COM VIDEO (HelpModal)
   - arquivo: artifacts/padcom/src/components/HelpModal.tsx
   - o que mostra: o link "Ver explicacao" abre um quadro com area
     de video (botao de play), o termo tecnico em palavras simples,
     uma orientacao e o trecho "Por que perguntamos?".
   - PORQUE existe: ESTE e o coracao do pedido do CEO. Quando a
     pessoa nao entende um termo, em vez de chutar ou desistir, ela
     ve a explicacao com video e linguagem simples. Garante que ela
     ENTENDEU antes de responder. Hoje o video e um espaco
     reservado; voce pluga a URL do seu proprio video.

5. CAMPO DE PERGUNTA (QuestionField)
   - arquivo: artifacts/padcom/src/components/QuestionField.tsx
   - PORQUE existe: desenha cada pergunta com seu texto de apoio e
     chama o HelpModal; mantem cada pergunta limpa e com a ajuda
     sempre a um toque de distancia.

6. TELA DE CONCLUSAO (summary)
   - arquivo: artifacts/padcom/src/pages/patient/summary.tsx
   - o que mostra: um numero (score) que sobe animado, o perfil de
     conduta, a rota sugerida e o botao "Ver minhas respostas".
   - PORQUE existe: fecha o ciclo. A pessoa ve que o que respondeu
     virou algo concreto e pode reler todas as respostas. Isso gera
     transparencia e confianca no resultado.

MOLDURAS, BORDAS E ESTILO (o acabamento):
   - arquivos: artifacts/padcom/src/components/layouts.tsx
              artifacts/padcom/src/index.css
   - cartoes, cantos arredondados, cabecalho e rodape fixos com
     leve desfoque, bordas e sombras suaves; as cores e bordas
     ficam no index.css. PORQUE: visual calmo e limpo ajuda a
     pessoa a focar no conteudo, nao na tela.

COMO ACESSAR:
   - Clonar: git clone https://github.com/caio-padua/Pactor.git
   - Ler arquivo cru (exemplo do fluxo):
     https://raw.githubusercontent.com/caio-padua/Pactor/main/artifacts/padcom/src/pages/patient/flow.tsx

REGRAS DE ADAPTACAO (nao quebrar o seu sistema):
   - No Padcon Conect a pessoa atendida chama-se CLIENTE, nunca
     paciente: troque todo rotulo "paciente" por "cliente".
   - Leve apenas a camada de apresentacao (telas, componentes,
     estilos); mantenha a SUA camada de dados e as SUAS rotas.
   - Adapte o conteudo dos blocos e perguntas ao Padcon Conect; o
     que se copia e a ESTRUTURA e a LOGICA do porque, nao o texto
     clinico do PADCOM ao pe da letra.
   - Teste cada bloco antes de seguir; nao suba nada que quebre.

A PARTE KAIZEN (melhoria continua - obrigatoria):
   Kaizen quer dizer melhorar um pouco a cada ciclo. Voce nao deve
   so copiar; deve deixar MELHOR que o original. Ciclo sugerido:
   - MEDIR: em qual bloco o cliente trava, abandona ou demora.
   - OUVIR: quais termos geram mais cliques em "Ver explicacao".
   - MELHORAR: reescrever esses termos em palavras mais simples,
     gravar o video que faltava, encurtar o bloco mais pesado.
   - REPETIR: a cada versao, uma melhoria pequena e medida.
   Toda melhoria boa que voce encontrar, mande de volta ao CEO para
   voltar tambem ao PADCOM. A familia toda sobe junto.

CONFIRME DE VOLTA AO CEO:
   (a) o que clonou, (b) o que adaptou de paciente para cliente,
   (c) a primeira melhoria Kaizen que voce ja conseguiu enxergar,
   (d) um print da primeira tela com a linha do tempo.

RESUMO EM 1 LINHA:
   Clone a anamnese do PADCOM entendendo o PORQUE de cada tela (a
   pessoa precisa COMPREENDER antes de responder), troque paciente
   por cliente, adapte ao Padcon Conect sem quebrar, e melhore a
   cada ciclo pela filosofia Kaizen.
================================================================
```
