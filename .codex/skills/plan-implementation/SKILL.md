---
name: plan-implementation
description: "Planejar mudanças de software com múltiplas etapas, dependências, contratos públicos ou risco material antes de editar código. Usar quando o trabalho precisa ser decomposto em tarefas verificáveis e rastreado até PRD, critérios de aceite e perfis de entrega; não usar para correções triviais, pesquisas somente leitura ou pedidos que caibam com segurança em uma única mudança direta."
---

# Plan Implementation

Converter requisitos aprovados em um plano executável sob `docs/tasks/current/`, sem criar uma
segunda fonte de verdade nem ampliar a autorização do pedido.

## Confirmar que um plano agrega valor

Usar esta skill quando houver ao menos um destes sinais:

- etapas dependentes ou vários limites arquiteturais;
- mudança de contrato público, migração, segurança ou dados;
- trabalho suficientemente longo para perder rastreabilidade sem decomposição;
- necessidade de dividir responsabilidade entre pessoas ou agentes.

Não criar plano para resposta, pesquisa somente leitura, edição pequena e localizada ou diagnóstico
sem autorização para corrigir. Se o pedido já autorizar implementação, planejar e continuar sem uma
segunda aprovação, salvo quando aparecer uma decisão material ainda aberta.

## Fixar o contrato

1. Ler `AGENTS.md`, PRD, perfil de entrega, ADRs, arquitetura, testes e código relevantes.
2. Separar requisitos explícitos, inferências seguras e decisões materiais abertas.
3. Pedir direção antes da implementação somente quando alternativas mudarem produto, dados,
   segurança, custo, compatibilidade pública, autonomia ou arquitetura de forma relevante.
4. Referenciar as fontes governadas; não copiar requisitos para um documento paralelo sem vínculo.

## Mapear a mudança

Antes de decompor tarefas, registrar:

- arquivos que serão criados ou modificados e suas responsabilidades;
- contratos, tipos, rotas ou artefatos produzidos e consumidos;
- dependências entre tarefas;
- riscos de segurança, migração, compatibilidade e operação;
- comandos que distinguem sucesso de falha.

Seguir a arquitetura existente. Incluir refatoração adjacente apenas quando necessária para entregar
o comportamento solicitado com segurança.

## Escrever o plano

Criar `docs/tasks/current/YYYY-MM-DD-<topico>.md` a partir de `docs/tasks/TEMPLATE.md`. Cada tarefa
deve produzir um resultado independente e verificável e conter:

- objetivo observável;
- arquivos exatos;
- interfaces consumidas e produzidas, quando existirem;
- passos de implementação suficientes para eliminar ambiguidade;
- teste focado e resultado esperado;
- gates adicionais proporcionais ao risco;
- critérios de aceite atendidos;
- dependências e efeitos externos.

Incluir assinaturas ou exemplos somente quando definirem um contrato não óbvio. Não duplicar a
implementação completa no plano nem adicionar commits automáticos.

## Construir a rastreabilidade

Para cada critério de aceite, apontar a tarefa e a evidência que o comprovará. Nenhum critério pode
ficar sem responsável; nenhuma tarefa pode existir sem ligação com o contrato, segurança,
documentação ou verificação necessária.

## Revisar antes de executar

Verificar:

1. cobertura de todos os critérios e perfis aplicáveis;
2. ausência de placeholders, decisões materiais ocultas e escopo especulativo;
3. consistência de nomes, tipos e interfaces entre tarefas;
4. ordem correta das dependências;
5. verificações que realmente observem o comportamento alegado.

Corrigir problemas no próprio plano. Se o usuário pediu somente planejamento, encerrar com o caminho
do plano e decisões pendentes. Se pediu implementação, prosseguir pelo plano sem criar branch,
worktree, commit, push ou efeito externo não autorizado.
