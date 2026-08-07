# Codex Software Template

Base moderna para iniciar produtos web com frontend e API separados, regras persistentes para
trabalho com Codex e validações objetivas de qualidade.

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
2. Consulte `AGENTS.md` e os arquivos de orientação mais próximos do código a ser alterado.
3. Planeje tarefas pequenas com critérios de aceite em `docs/tasks/`.
4. Implemente, teste e documente decisões relevantes.
5. Só considere a tarefa concluída quando a Definition of Done for atendida.

Memórias de trabalho locais podem ser mantidas em `.harness/memory/local/` e nunca são versionadas.
Memórias úteis à equipe ficam em `.harness/memory/team/`, após revisão e com fonte verificável. Elas
são contexto auxiliar, não substituem PRD, decisões arquiteturais, código ou testes.

## Segurança

Não versione `.env`, bancos SQLite locais, tokens ou dados pessoais. A API deve validar entradas,
exigir autenticação/autorização para dados privados e retornar erros públicos estáveis.

Consulte [AGENTS.md](AGENTS.md), [arquitetura](docs/architecture/SYSTEM.md) e a
[Definition of Done](docs/development/DEFINITION_OF_DONE.md) para o contrato completo.
