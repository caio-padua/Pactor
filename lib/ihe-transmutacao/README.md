# ihe-transmutacao — nucleo de logica pura (RAS KAIZEN v8 -> Pactor)

Transmutado por Dr. Replit IHE de Google Apps Script para TypeScript PURO.
Pasta aditiva e isolada: sem package.json/tsconfig proprios (nao entra no build
nem no lockfile do Pactor). Integracao no fluxo vivo = decisao do CEO + Dr. Claude.

## Modulos (fonte .gs -> destino .ts)

| Onda | Dominio       | Fonte Apps Script           | Testes |
|------|---------------|-----------------------------|--------|
| A    | padronizacao  | Padronizacao.gs             | 66 OK  |
| B    | orcamento     | Orcamento.gs                | 41 OK  |
| C    | varredura     | VarreduraSubstancias.gs     | 24 OK  |
| D    | ordenacao     | OrdenacaoCategoriaRas.gs    | 21 OK  |

## Rodar os testes

    pnpm exec tsx --test lib/ihe-transmutacao/modules/**/*.test.ts

## Invariantes preservadas

- Arredondamento ao centavo (epsilon 1e-9) identico ao original.
- Varredura fail-closed: orfao sem dose nunca e adivinhado.
- Ordem das categorias do RAS (1..7) travada pelo CEO (11/06/2026).
- Parametros de desconto do orcamento sao decisao do CEO (caso Luciano, total 15960).
