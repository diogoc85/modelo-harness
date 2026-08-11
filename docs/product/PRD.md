# Documento de Requisitos do Produto

## Visao geral

- **Nome:** {{NOME_DO_PROJETO}}
- **Objetivo:** {{Descreva o que o sistema faz}}
- **Modelo de entrega:** {{traditional | saas | service-as-software | hybrid | undecided}}
- **Resultado comprado pelo cliente:** {{Acesso a funcionalidades, trabalho concluido ou ambos}}
- **Quem executa o trabalho principal:** {{Usuario, software/agente ou ambos}}

Se o modelo estiver `undecided`, classifique-o antes do planejamento usando
`.harness/delivery-models.json`. Confirme com o responsavel quando alternativas plausiveis mudarem
tenancy, cobranca, autonomia, seguranca ou arquitetura.

## Escopo funcional

- [ ] {{Requisito 1}}
- [ ] {{Requisito 2}}

## Stack proposta

- **Frontend:** {{Ex.: Next.js, Tailwind}}
- **Backend/dados:** {{Ex.: Node.js, Drizzle, SQLite/PostgreSQL}}

## Regras criticas

- Defina autenticacao, autorizacao e dados sensiveis conforme as necessidades do produto.
- Aplique os requisitos do perfil selecionado em `docs/product/profiles/`.
- Para `service-as-software` ou `hybrid`, defina resultado verificavel, limites de autonomia,
  aprovacoes humanas, avaliacoes e evidencia operacional.
- {{Regra de negocio adicional}}

## Criterios de sucesso

- **Resultado mensuravel:** {{Como saberemos que o produto ou servico funcionou}}
- **Criterios de aceite:** {{Comportamentos objetivos e testaveis}}
- **Sinais de falha:** {{Resultados incorretos, inseguros ou comercialmente invalidos}}
