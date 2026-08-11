---
name: execute-plan-with-agents
description: "Executar um plano aprovado com subagentes somente quando o usuário pedir explicitamente subagentes, delegação, paralelismo ou trabalho multiagente. Usar apenas para tarefas independentes com propriedade de arquivos não sobreposta; não ativar automaticamente por tamanho, existência de plano ou disponibilidade de ferramentas."
---

# Execute Plan With Agents

Orquestrar execução multiagente dentro da autorização existente. A skill não autoriza efeitos
externos, decisões materiais, mudanças de branch ou operações destrutivas.

## Confirmar precondições

Prosseguir somente quando todas forem verdadeiras:

1. o usuário pediu explicitamente subagentes, delegação, paralelismo ou trabalho multiagente;
2. existe um plano aprovado com critérios e verificações rastreáveis;
3. as tarefas podem receber proprietários sem edição concorrente dos mesmos arquivos;
4. há ferramentas e capacidade de agentes disponíveis.

Se alguma precondição falhar, executar localmente ou pedir a decisão material que falta. Não usar a
própria existência desta skill como autorização para delegar.

## Proteger o workspace

1. Inspecionar branch, worktree, status e diff antes de delegar.
2. Preservar mudanças preexistentes e atribuí-las ao usuário quando a autoria não estiver clara.
3. Não criar ou trocar branch, worktree ou checkout sem autorização. Se o ambiente já fornecer
   isolamento gerenciado, usá-lo sem aninhar outro worktree.
4. Dividir tarefas por arquivos ou componentes sem sobreposição. Quando isso não for possível,
   executar as tarefas conflitantes sequencialmente sob um único proprietário.

## Criar estado local limitado

Para execução longa, criar `.artifacts/execution/<id-do-plano>/ledger.md` com:

- caminho e revisão do plano;
- tarefa, proprietário e estado;
- arquivos atribuídos;
- comandos executados e resultado;
- achados de revisão e resolução.

Não registrar segredos, dados pessoais, conteúdo integral de prompts, raciocínio oculto ou alegações
não verificadas. O ledger é evidência local ignorada pelo Git; PRD, ADRs, código e testes continuam
sendo as fontes de verdade.

## Preparar cada delegação

Enviar ao agente apenas o necessário:

- objetivo e critérios cobertos;
- arquivos permitidos e arquivos que não deve editar;
- contratos consumidos e produzidos;
- instruções locais aplicáveis;
- comandos de teste e resultado esperado;
- mudanças preexistentes a preservar;
- efeitos externos expressamente proibidos.

Não delegar uma tarefa vaga nem confiar em contexto implícito da conversa.

## Executar e revisar

Para cada unidade:

1. o implementador executa a tarefa e relata diff e verificações;
2. o coordenador inspeciona o diff real e rejeita alterações fora da propriedade atribuída;
3. uma revisão somente leitura verifica cobertura do contrato e critérios de aceite;
4. outra revisão somente leitura verifica arquitetura, segurança, testes e complexidade;
5. o implementador original corrige achados enquanto sua tarefa permanecer ativa;
6. o coordenador executa a verificação focada antes de liberar dependentes.

Revisões podem ser feitas por agentes separados quando houver capacidade; caso contrário, o
coordenador mantém os dois eixos separados na própria revisão. Relatos de agentes não substituem
diffs, testes ou gates.

## Aplicar circuit breakers

- Após três hipóteses de implementação rejeitadas para o mesmo sintoma, interromper correções e
  reavaliar causa, contrato e arquitetura.
- Após cinco ciclos de correção e nova revisão da mesma tarefa, interromper a automação e apresentar
  ao usuário o bloqueio, evidências, alternativas e decisão necessária.
- Parar imediatamente quando surgir ambiguidade material, conflito de propriedade ou necessidade de
  nova autorização.

Não contornar o limite criando outra tarefa ou outro agente para repetir a mesma tentativa.

## Fechar a execução

1. Executar verificações focadas e depois os gates completos exigidos pelo repositório.
2. Conferir cada critério do plano e registrar a evidência real.
3. Inspecionar o diff combinado para conflitos, escopo extra e artefatos esquecidos.
4. Relatar resultados e limitações sem criar commit, push, pull request ou limpeza destrutiva salvo
   quando o usuário tiver autorizado essa ação separadamente.
