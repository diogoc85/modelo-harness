---
name: ingest-project-handoff
description: "Validar e ingerir um handoff aprovado do Project Hub/Design OS antes do planejamento de implementação. Usar quando project-context/design-to-harness-handoff.yaml existir ou quando o usuário iniciar implementação a partir de Product Blueprint + Design Blueprint; não usar em projetos standalone sem handoff."
---

# Ingest Project Handoff

Transformar o pacote aprovado do Project Hub em contexto confiável para o Model Harness sem duplicar
fontes de verdade nem reinterpretar decisões de produto/design.

## Quando usar

Use esta skill antes de planejamento ou implementação substancial quando existir:

`project-context/design-to-harness-handoff.yaml`

ou quando o usuário fornecer explicitamente um pacote contendo Product Blueprint + Design Blueprint.

## 1. Validar identidade e versão

Leia, quando disponíveis:

- `project-context/project-manifest.yaml`
- `project-context/links.yaml`
- `project-context/design-to-harness-handoff.yaml`

Confirme:

- `project.id` consistente em todos os artefatos;
- handoff com status `ready` ou `accepted`;
- Design Blueprint aprovado;
- Product Blueprint de origem referenciado;
- `DESIGN_READY = true` / Design QA aprovado quando exigido pelo contrato;
- ausência de blocker aberto;
- versões do handoff e Design Blueprint compatíveis.

Se a inconsistência impedir implementação segura, pare o escopo afetado e reporte
`DESIGN_HANDOFF_BLOCKED`.

## 2. Ingerir Product Blueprint

Leia apenas os artefatos relevantes ao escopo atual.

Produto/negócio continuam sendo autoridade do Product Blueprint:

- escopo;
- features;
- requisitos;
- regras de negócio;
- papéis;
- permissões;
- plataformas;
- constraints;
- modelo de entrega.

Não invente decisões ausentes. Se uma decisão de produto material estiver faltando, bloqueie o escopo
e peça resolução ao Plan Architect/humano.

## 3. Ingerir Design Blueprint

Para trabalho de UI, leia os artefatos relevantes, incluindo quando existirem:

- `design-manifest.yaml`;
- `screen-inventory.yaml`;
- `user-flows.yaml`;
- `design-tokens.json`;
- `component-inventory.yaml`;
- `responsive-rules.yaml`;
- `screen-state-map.yaml`;
- `interaction-rules.yaml`;
- `motion-rules.yaml`;
- `accessibility.md`;
- `figma-map.yaml`;
- `implementation-handoff.md`;
- `design-qa-report.yaml`.

Não reduza o Design Blueprint a um link do Figma.

## 4. Preservar autoridades

Use esta ordem:

- Product Blueprint → regras de produto/negócio;
- Design Blueprint → contrato de experiência;
- Figma → verdade visual;
- Model Harness → arquitetura e implementação;
- código/testes → verdade técnica após implementação.

Se Figma e Design Blueprint divergirem materialmente, não adivinhe: bloqueie o escopo afetado e
solicite reconciliação.

## 5. Preparar o Harness

Depois da validação:

1. confirme/classifique o modelo de entrega com `classify-delivery-model`;
2. identifique requisitos adicionais do perfil selecionado;
3. leia arquitetura e ADRs existentes;
4. determine o escopo implementável;
5. use `plan-implementation` quando a mudança justificar planejamento rastreável.

Não reescreva todo o Product/Design Blueprint em `docs/product/`. Mantenha `project-context/` como
referência do handoff e crie somente pontes/resumos quando necessários ao trabalho técnico.

## 6. Design Change Request

Quando houver restrição técnica que exija alterar UX/UI aprovada:

- descreva a restrição;
- identifique feature/flow/screen/component afetado;
- explique o impacto;
- proponha alternativa sem aplicá-la silenciosamente;
- marque a implementação afetada como bloqueada;
- solicite Design Change Request.

Continue workstreams independentes somente quando não houver risco de inconsistência.

## Resultado

Ao concluir, informe:

- projeto e versões validadas;
- modelo de entrega confirmado/pendente;
- escopo pronto para implementação;
- blockers/warnings;
- próximo passo (`plan-implementation` ou implementação direta para mudança pequena).

Nunca declare handoff aceito se os artefatos exigidos não puderem ser verificados.
