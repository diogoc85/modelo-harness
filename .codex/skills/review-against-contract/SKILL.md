---
name: review-against-contract
description: "Revisar diffs, branches, commits ou pull requests contra dois eixos independentes: padrões do repositório e contrato original da mudança. Usar quando o usuário pedir code review, revisão de PR/branch/diff, conformidade com especificação ou avaliação antes de commit ou merge."
---

# Review Against Contract

Realizar revisão somente leitura, salvo se o usuário também pedir correções. Priorizar defeitos
acionáveis; não narrar o diff nem transformar preferências pessoais em violações.

## Fixar a superfície

1. Identificar o ponto-base solicitado. Para trabalho não commitado, incluir diff staged e unstaged;
   para branch ou PR, preferir o merge-base com a branch de destino.
2. Confirmar que a referência existe e que a superfície não está vazia.
3. Ler os arquivos completos afetados quando o contexto do hunk não for suficiente.

## Identificar o contrato

Procurar, nesta ordem, a solicitação atual, tarefa aprovada, PR ou issue referenciada, PRD, contrato
público e ADR aplicável. Se não houver especificação, declarar que o eixo de intenção tem evidência
limitada em vez de inventar requisitos.

## Revisar em dois eixos

### Padrões

Verificar instruções locais, limites arquiteturais, segurança, tratamento de erro, testes,
manutenibilidade e complexidade especulativa. Não repetir diagnósticos já cobertos por ferramentas,
a menos que revelem impacto comportamental.

### Intenção

Verificar critérios de aceite, casos importantes, compatibilidade pública, migrações e se cada
mudança é necessária para o contrato. Sinalizar tanto comportamento ausente quanto escopo extra que
aumente risco sem atender ao pedido.

Manter os eixos independentes. Quando o usuário pedir explicitamente revisão paralela e houver
suporte, executá-los em contextos separados; caso contrário, revisar sequencialmente sem reduzir o
rigor.

## Classificar e entregar

Ordenar achados por impacto:

- **P0:** perda de dados, comprometimento ou indisponibilidade ampla iminente.
- **P1:** comportamento principal incorreto, vulnerabilidade ou regressão relevante.
- **P2:** defeito real em cenário secundário ou risco importante de manutenção.
- **P3:** melhoria pequena e acionável; omitir preferências cosméticas.

Para cada achado, citar o menor intervalo de linhas, explicar o cenário que o ativa, o impacto e a
direção da correção. Apresentar achados primeiro, depois perguntas e resumo. Se não houver achados,
dizer explicitamente e registrar lacunas de teste ou contrato que limitem a confiança.
