# REGRA CENTRAL DO PROJETO (MONOREPO GUARDRAILS)

<isolamento_de_arquitetura>
  1. O projeto é um Monorepo estrito dividido em workspaces. É terminantemente PROIBIDO misturar lógicas ou fazer imports cruzados entre as pastas 'apps/frontend' e 'apps/backend'.
  2. FRONTEND (apps/frontend): Contém exclusivamente componentes de UI, páginas do Next.js e documentação do Storybook. Toda comunicação com dados deve ser feita via chamadas HTTP (fetch) apontando para as rotas do backend.
  3. BACKEND (apps/backend): Contém as rotas de API, validações de esquema Zod, autenticação do Google OAuth (Auth.js) e o mapeamento de tabelas do Drizzle ORM em 'db/schema.ts'.
</isolamento_de_arquitetura>

<seguranca_e_performance>
  - Siga rigorosamente as regras do OWASP Top 10 aplicadas a APIs.
  - IDs de tabelas devem utilizar UUIDv4 ou CUID2 em formato texto. Evite chaves numéricas sequenciais.
  - Evite o problema de consultas N+1 utilizando relacionamentos com Joins nativos do Drizzle.
</seguranca_e_performance>

<tecnologias_obrigatorias>
  1. BANCO DE DADOS & ORM: Use EXCLUSIVAMENTE Drizzle ORM localizado em `apps/backend/db/`. É proibido o uso de Prisma, Sequelize ou queries SQL cruas.
  2. AUTENTICAÇÃO: Use apenas Auth.js com provedor nativo do Google OAuth configurado no servidor da API no `apps/backend`.
  3. QUALIDADE: O código deve respeitar as checagens estritas do Biome (lint/format) em todos os pacotes e do TypeScript compiler (`tsc --noEmit`).
</tecnologias_obrigatorias>

<regras_de_vibe_coding>
  - Nunca remova comentários de tipagem TypeScript criados para documentar os schemas do Drizzle.
  - Ao criar componentes visuais no Frontend, a folha de estilos deve se limitar ao Tailwind CSS e componentes estendidos do shadcn/ui.
  - É expressamente proibido rodar instalações globais usando `npm` ou `yarn`. Use exclusivamente `pnpm`.
</regras_de_vibe_coding>

## 🔒 DIRETRIZES DE SEGURANÇA E API (OWASP TOP 10)

- **Controle de Acesso (A01):** Toda rota de API no backend que manipule dados privados DEVE validar rigorosamente a sessão de autenticação antes de responder. Nunca assuma que o ID do usuário enviado pelo cliente é seguro.
- **Isolamento de Dados & Simulação de RLS:** Toda tabela com dados privados (ex: posts, transações) DEVE possuir uma coluna `userId` referenciando `user.id`. Toda e qualquer query de leitura, inserção, atualização ou exclusão de dados privados DEVE filtrar obrigatoriamente pelo `userId` extraído da sessão segura (nunca usar o ID enviado pelo body/query do cliente de forma crua).
- **Prevenção de Injeção (A03):** É expressamente proibido concatenar strings diretamente dentro de queries de banco de dados. Use apenas os métodos nativos e tipados do Drizzle ORM.
- **Validação de Entrada (A04):** Todo dado vindo do cliente (Formulários, Query Params ou Requests) DEVE ser parseado e validado no backend usando a biblioteca **Zod** para criar esquemas de validação estritos.
- **CORS Restrito:** Todas as requisições de API no backend devem ter as origens validadas com base no `ALLOWED_ORIGINS` configurado nas variáveis de ambiente.
- **Security Headers (A05):** A aplicação frontend Next.js deve enviar cabeçalhos HTTP estritos (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) aplicados centralizadamente no `next.config.js`.
- **Exposição de Dados (A02):** Dados sensíveis de usuários (tokens, hashes, dados internos de contas OAuth) nunca devem ser retornados no JSON da API do backend.
- **Sanitização de HTML Dinâmico (A03):** É terminantemente proibido renderizar HTML ou Markdown dinâmico vindo de entradas de usuários usando `dangerouslySetInnerHTML` sem antes passar a string por uma biblioteca de sanitização estrita (recomenda-se o uso de `isomorphic-dompurify`).

### 🛡️ REGRAS DE ARQUITETURA AVANÇADA
- É terminantemente proibido o uso de IDs sequenciais (1, 2, 3) no banco de dados. Use exclusivamente uuid() ou initCuid() (através de CUID2).
- Variáveis de ambiente sensíveis devem ser mapeadas e tipadas estritamente via esquema Zod antes do consumo em ambos os lados (front e back).
- Rotas críticas de escrita ou consulta pesada devem implementar decorators ou checagens de Rate Limiting.

## 📊 DIRETRIZES DE OBSERVABILIDADE

- **Rastreamento de Tráfego e Performance (OpenTelemetry):** A latência de todas as rotas e queries de banco de dados é rastreada na raiz pelo `instrumentation.ts` via OpenTelemetry. Todo código deve ser otimizado buscando menor latência e livre de gargalos.
- **Logs Estruturados (Pino.js):** É expressamente proibido usar `console.log` ou `console.error` cruas em ambiente de produção. Toda rota de API sob o escopo `app/api/` deve conter blocos `try/catch` estruturados, e as exceções capturadas devem obrigatoriamente ser registradas através do utilitário `logger` importado de `lib/logger.ts`, injetando a mensagem de erro, stack trace e dados da sessão.
- **Rastreamento Semântico de LLMs (Langfuse):** Chamadas para serviços de Inteligência Artificial ou LLMs (como o Gemini) DEVEM ser rastreadas e auditadas em tempo real utilizando a instância `langfuse` importada de `lib/langfuse.ts`. Isso assegura o monitoramento de prompts, latência e consumo de tokens em produção.

## ⚡ DIRETRIZES DE ALTA PERFORMANCE (ANTI-GARGALO)

- **Otimização de Banco de Dados:** É expressamente proibido gerar loops que disparem consultas individuais ao banco (Problema N+1). Sempre utilize relacionamentos com Joins (`with` ou `.leftJoin()`) do Drizzle para trazer dados correlacionados de forma unificada.
- **Renderização Eficiente:** Mantenha componentes como Server Components por padrão. Só adicione `'use client'` se houver interatividade estrita que não possa ser resolvida no servidor.
- **Otimização de Mídias:** Nunca utilize a tag `<img>` comum para fotos locais ou externas. Use obrigatoriamente o componente `<Image />` do `next/image` para garantir compressão automática e Lazy Loading.
- **Operações Assíncronas:** Evite travar a execução com `await` sequenciais se eles puderem rodar em paralelo. Use `Promise.all()` para disparar requisições independentes simultaneamente.
- **Evitar Inchaço de Bundle (Bundle Size Bloat):** É proibido fazer importações globais que inchem o bundle final e quebrem o tree-shaking da aplicação (ex: prefira importar métodos específicos de utilitários ou ícones em vez da biblioteca inteira, ex: `import { map } from "lodash-es"` ou imports atômicos de ícones).
- **Carregamento Tardio (Lazy Loading):** Componentes do lado do cliente pesados ou não fundamentais para a renderização do primeiro frame da tela (ex: gráficos estatísticos complexos, editores de texto rico, modais complexos secundários) devem obrigatoriamente ser carregados dinamicamente via `next/dynamic`.