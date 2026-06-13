# 02 - Estudo do RAS v8 e do material de cabeceira

Autor: Dr. Replit Pactor (laboratorio).
Data: 13/06/2026.
Metodo: leitura via raw URL do repo Integrative-Health-Engine (ramo ver-l2-dr-claude),
conforme a regra R7 (auditoria com dados frescos). Nao transcrevi nenhum codigo .gs
(regra 6.4); aqui vai so o que entendi.

## 1. Arquivos .gs do RAS v8 (um paragrafo por arquivo)

1.1 Padronizacao.gs
    E o motor de normalizacao de nomes de substancias, para o mesmo item ter sempre
    o mesmo nome em todas as abas (exemplo: "Coenzima Q10 100mg"). A fonte da verdade
    e a aba CADASTRO SUBSTANCIAS. Ele resolve o nome canonico e gera um plano de
    varredura para corrigir as abas de Orcamento e Financeiro. Funcoes centrais:
    padronizar nome, resolver substancia canonica, planejar varredura.

1.2 Orcamento.gs
    E a logica pura de calculo de orcamento. Aplica descontos (a vista, ou entrada
    mais parcelas) e calcula a receita mensal. Cruza os itens de substancia com a
    aba CADASTRO SUBSTANCIAS e prepara os dados para o FINANCEIRO. Funcoes centrais:
    calcular total, montar itens, cenario de entrada. Importante: e aqui que moram
    os cenarios de pagamento que a Onda C vai trazer para o Pactor.

1.3 MultiCockpitProtocolo.gs
    Gerencia ate quatro cockpits independentes (areas de trabalho) e cria protocolos
    com numeracao unica de 000 a 100. Lanca os dados na TABELA GERAL e permite apagar
    um protocolo com backup automatico. Funcoes centrais: estruturar cockpits extras,
    apagar protocolo por linha, formatar numero do protocolo.

1.4 NovoProtocoloCockpit.gs
    E so um auxiliar pequeno. Reseta o formulario de digitacao do cockpit (limpa
    campos especificos) sem mexer nos dados ja consolidados na TABELA GERAL. Funcoes:
    novo protocolo cockpit, e o gatilho que a roda.

1.5 OrdenacaoCategoriaRas.gs
    Ordena as substancias por categoria (antioxidante, vitamina, hormonio, etc.)
    apenas para a exibicao no documento RAS. Usa um ranking de 1 a 7 baseado no
    CATALOGO SUBSTANCIAS. Funcoes centrais: ordenar substancias, ranquear categoria,
    achar categoria no catalogo. Relevante para a Onda B (ordenacao).

1.6 Code.gs
    E o nucleo do sistema, com 3.535 linhas. Define os identificadores das planilhas,
    o catalogo mestre e os utilitarios de manipulacao de planilha. Cuida da estrutura
    das abas, da geracao do PDF do RAS e da integracao geral entre TABELA GERAL,
    CADASTRO e FINANCEIRO. Pontos de entrada: abertura do menu, aplicar estrutura
    completa, lancar protocolo, montar paginas do RAS. E grande demais para transcrever;
    estudei por blocos de funcao.

1.7 AgendamentoMotor.gs
    Transforma os protocolos da TABELA GERAL em eventos no Google Agenda, de forma
    idempotente (rodar de novo nao duplica). Consolida as aplicacoes da semana, evita
    choque de horario e separa entre a agenda da ENFERMAGEM e a do MEDICO. Funcoes
    centrais: lancar agenda de todos, montar marcacoes, achar horario livre.

1.8 AgendamentoGoogleCalendar.gs
    E a camada que fala com a interface de programacao do Google Calendar (API, ou
    seja, o canal por onde um sistema conversa com o outro). Cria eventos com descricao
    rica, define cores por tipo e envia convite por e-mail ao paciente. Funcoes
    centrais: criar agendamento, montar descricao do evento, definir cor.

1.9 AppEnfermagemRasFap.gs
    E um aplicativo web para a enfermeira registrar a aplicacao a beira do leito,
    validado por um PIN do paciente. Gera o documento RAS-FAP (ficha de aplicacao) em
    PDF e salva na pasta do cliente no Google Drive. Funcoes centrais: ponto de entrada
    do app, registrar aplicacao, gerar o PDF.

1.10 GatilhoSonda.gs
     Automatiza a execucao diaria da sonda de integracao (uma rotina que checa a saude
     do sistema). Instala gatilhos de tempo que disparam a sonda e mandam relatorio por
     e-mail ao administrador. Funcoes centrais: instalar gatilho, executar sonda agendada.

1.11 TesteEnfermagem.gs
     E a sonda de integracao ponta a ponta. Testa todo o fluxo do app de enfermagem
     (leitura, PIN, Google Drive) sem tocar em dados reais, usando pacientes ficticios
     e pastas temporarias que se limpam sozinhas. Funcoes centrais: rodar sonda,
     verificar PIN.

## 2. Schemas do IHE (so para alinhar tipos, nao copio banco)

2.1 pacientes: id, nome, cpf, email, telefone, data_nascimento, unidade_id,
    plano_acompanhamento (diamante, ouro, prata, cobre), peso_kg, altura_cm, e token
    de pulso diario.
2.2 itens_terapeuticos: id, nome, descricao, codigo_padcom, bloco_id, categoria
    (formula, injetavel_im, injetavel_ev, implante, exame, protocolo), posologia
    estruturada (em formato JSON), preco, disponivel, exige_validacao_humana.
2.3 avaliacao_enfermagem: id, sessao_id, paciente_id, pressao arterial, cor de alerta,
    frequencia cardiaca, nivel de dor, peso, altura e varias medidas antropometricas.
2.4 agenda: tabelas de sub-agendas, regras de disponibilidade, slots e agendamentos,
    com vinculo ao Google Calendar.
2.5 padcom_agendamentos: id (UUID), sessao_id, paciente_id, tipo (retorno, reavaliacao,
    exame, consulta inicial), status (pendente, confirmado, cancelado, realizado),
    agendado_para, banda_origem (verde, amarela, laranja, vermelha).
2.6 Observacao de alinhamento: o Pactor hoje usa centavos? Nao. O IHE guarda preco
    como numero; a Onda C trara valor em centavos (inteiro). Vou exibir com virgula
    decimal no padrao do Brasil.

## 3. Contexto do irmao maior (arquitetura e propostas)

3.1 INVENTARIO_PAWARDS: levantamento de volume e saude (304 tabelas, 1.557 pacientes),
    focado em achar codigo pronto sem fluxo de dado real. Avisa que numeros antigos
    sao potenciais, nao faturamento.
3.2 MANIFESTO_DR_REPLIT: protocolo de hierarquia entre os agentes; respeitar o codigo
    consolidado antes de reformar.
3.3 Proposta acoplar orcamento ao financeiro: faixas de preco por duracao do programa
    (3, 6 e 12 meses).
3.4 Proposta app enfermagem: guardar aplicacoes como arquivos JSON no Drive, para nao
    criar coluna nova na planilha.
3.5 Proposta multi-cockpit: 4 cockpits e numeracao de protocolo, com tolerancia a
    espaco no nome (exemplo: "200 mg").
3.6 Proposta padronizacao: motor de nomes canonicos e um layout chamado "Penumbra"
    (molduras pretas grossas e tons pastel).

## 4. O que isso significa para o Pactor (sem codificar)

4.1 As Ondas A-D do meu primo correspondem direto a esses .gs: A = Padronizacao,
    B = MultiCockpit + NovoProtocolo + Ordenacao, C = Orcamento, D = pacientes.
4.2 Agendamento, Google Calendar e app de enfermagem sao ondas futuras (Instrucao 03),
    onde eu participo ativamente porque envolvem tela, webhook e login externo.
4.3 Eu nao recrio a logica: recebo o filho pronto e ploto na arquitetura React do Pactor.

## RESUMO EM 1 LINHA
Estudei os 11 arquivos .gs do RAS v8 e os 5 schemas do IHE via raw URL: as Ondas A-D
batem direto com Padronizacao, Protocolos (multi-cockpit/ordenacao), Orcamento e
Pacientes, e o agendamento/enfermagem ficam para as ondas futuras onde eu atuo.
