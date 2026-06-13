# Consultores — Braços de colaboração entre IAs

Esta pasta organiza como as diferentes inteligências artificiais colaboram no
**PACTOR Protocols®**. Cada braço é uma "via" de revisão. Não é código de produção —
é onde cada IA lê o contexto, registra sua análise e deixa sugestões.

## Por que existe

O Dr. Caio trabalha com várias IAs ao mesmo tempo, cada uma forte em algo diferente.
Para não virar bagunça (e não gerar conflitos de código), cada IA tem o seu braço:

- Lê o briefing e o código real do PADCOM.
- Escreve a análise e as sugestões **dentro do seu braço**.
- **Não altera o código de produção diretamente.** Quem implementa é o Dr. Claude.

## Os braços

| Braço | Quem | Papel |
|-------|------|-------|
| `dr-claude/` | Claude (este workspace) | **Programador sênior.** Implementa o que é aprovado. |
| `dr-replit/` | Agente do Integrative-Health-Engine | Revisor: olha integração com produção, banco, escala. |
| `dr-code/`   | IA especialista (ChatGPT / outra) | Revisor: olha clínica, perguntas, motor de score. |

## Fluxo de trabalho

1. Dr. Caio pede para uma IA revisar um trecho específico.
2. A IA escreve a sugestão em `consultores/<braço>/sugestoes/`.
3. Dr. Caio traz a sugestão para o Dr. Claude.
4. Dr. Claude implementa no código real (`artifacts/padcom/...`).
5. Dr. Caio valida no preview e aprova.
6. Push pro GitHub -> as outras IAs puxam a versão nova (`git pull`).

## Regras de ouro

1. Revisores **sugerem**; Dr. Claude **implementa**; Dr. Caio **aprova**.
2. Ninguém altera código de produção sem o OK do Dr. Caio.
3. O GitHub é a ponte oficial. Toda troca passa por push/pull.
4. Uma feature por vez.
