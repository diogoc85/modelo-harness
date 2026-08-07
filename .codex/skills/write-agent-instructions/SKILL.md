---
name: write-agent-instructions
description: "Criar, revisar ou reorganizar skills, AGENTS.md e outros documentos consumidos por agentes, com gatilhos precisos, precedência explícita, progressive disclosure e baixo custo de contexto. Usar ao alterar instruções do harness, adicionar skills ou diagnosticar conflito, redundância ou ativação incorreta de regras."
---

# Write Agent Instructions

Produzir instruções previsíveis sem tentar reensinar capacidades gerais ao modelo.

## Mapear antes de escrever

1. Ler todas as instruções aplicáveis e identificar sua precedência.
2. Inventariar regras, skills e documentos próximos que tratem do mesmo comportamento.
3. Definir exemplos que devem ativar a instrução e contraexemplos que não devem ativá-la.
4. Decidir se o conteúdo é política permanente, workflow sob demanda, referência ou automação
   determinística.

## Colocar no nível correto

- Manter em `AGENTS.md` apenas limites duráveis, sempre aplicáveis e ponteiros curtos.
- Escrever no ponteiro o assunto e as condições concretas que exigem consultar o alvo.
- Colocar procedimentos especializados em skills com `name` e `description` suficientes para
  descoberta; colocar detalhes condicionais em referências diretamente ligadas pela skill.
- Transformar verificações repetíveis em scripts testados em vez de instruções narrativas.
- Manter requisitos de produto, arquitetura e decisões em seus documentos governados, não em
  memória ou skills genéricas.

## Escrever para execução

- Usar linguagem imperativa, ordem observável e critérios de conclusão verificáveis.
- Declarar limites de autorização e efeitos externos quando relevantes.
- Preferir regras positivas e específicas; usar proibições apenas quando o risco justificar.
- Remover identidade, justificativas longas, duplicação e detalhes que o agente consegue descobrir.
- Não criar instruções que silenciosamente ampliem acesso, permitam ações destrutivas, reduzam
  validação ou promovam memória não revisada a política.

## Controlar conteúdo externo

Reescrever e revisar material externo antes de incorporá-lo. Registrar repositório, revisão fixa,
licença, data e relação com a skill local em `.harness/skills/provenance.json`. Nunca depender de
`latest` para instruções versionadas.

## Validar

1. Confirmar que não há conflito com instruções de maior precedência.
2. Testar estrutura e metadados com o validador de skills aplicável.
3. Testar gatilhos, contraexemplos e referências ausentes.
4. Executar `pnpm harness:audit` e inspecionar o diff para contexto desnecessário ou escopo oculto.
