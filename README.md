# Codex Software Template

Base moderna para iniciar produtos web com frontend e API separados, regras persistentes para
trabalho com Codex e validações objetivas de qualidade.

O template suporta quatro modelos de entrega opt-in: aplicação tradicional, SaaS, Service as
Software e híbrido. O PRD é classificado antes do plano para ativar somente os requisitos
necessários.

## Estrutura

```text
apps/
  web/                 frontend Next.js
  api/                 API Hono
packages/
  contracts/           schemas e tipos públicos
  database/            Drizzle, migrations e acesso a dados
docs/
  product/             PRD e design
    profiles/          requisitos por modelo de entrega
  architecture/        decisões e visão do sistema
  development/         definição de pronto
AGENTS.md              instruções permanentes do projeto para Codex
```

## Uso

Requer Node.js 20+ e pnpm.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Antes de entregar uma mudança:

```bash
pnpm verify
```

O comando audita a configuração do harness, executa lint, tipos, testes, build e auditoria de
dependências, e grava apenas status e duração em `.artifacts/verification/latest.md`.

## Fluxo com Codex

1. Registre requisitos em `docs/product/PRD.md`.
2. Classifique o produto como tradicional, SaaS, Service as Software ou híbrido.
3. Consulte `AGENTS.md` e o perfil selecionado antes do planejamento.
4. Planeje tarefas pequenas com critérios de aceite em `docs/tasks/`.
5. Implemente, teste e documente decisões relevantes.
6. Só considere a tarefa concluída quando a Definition of Done for atendida.

Memórias de trabalho locais podem ser mantidas em `.harness/memory/local/` e nunca são versionadas.
Memórias úteis à equipe ficam em `.harness/memory/team/`, após revisão e com fonte verificável. Elas
são contexto auxiliar, não substituem PRD, decisões arquiteturais, código ou testes.

## Skills nativas

O template inclui workflows sob demanda em `.codex/skills/` para disciplina geral de engenharia,
planejamento rastreável, diagnóstico baseado em evidências, escrita de instruções para agentes,
revisão contra padrões e contrato e execução multiagente explicitamente solicitada. Conceitos
adaptados de fontes externas usam revisão fixa e licença registradas em
`.harness/skills/provenance.json`; `pnpm harness:audit` valida a estrutura e a proveniência.

`classify-delivery-model` analisa PRDs e ativa os requisitos corretos sem confundir uma funcionalidade
de IA com Service as Software nem assumir autorização para implementar.

`plan-implementation` usa `docs/tasks/TEMPLATE.md` para ligar critérios de aceite a tarefas e
evidências. `execute-plan-with-agents` nunca ativa por conta própria: requer pedido explícito do
usuário e tarefas sem propriedade de arquivos sobreposta.

## Segurança

Não versione `.env`, bancos SQLite locais, tokens ou dados pessoais. A API deve validar entradas,
exigir autenticação/autorização para dados privados e retornar erros públicos estáveis.

Consulte [AGENTS.md](AGENTS.md), [arquitetura](docs/architecture/SYSTEM.md) e a
[Definition of Done](docs/development/DEFINITION_OF_DONE.md) para o contrato completo.
