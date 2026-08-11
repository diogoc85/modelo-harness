# Coding standards

## Architecture boundaries

- `apps/web` contains Next.js UI and communicates with the API over HTTP.
- `apps/api` owns HTTP transport, application composition, authentication and authorization.
- `packages/contracts` owns public schemas and DTOs shared across the HTTP boundary.
- `packages/database` owns Drizzle schema, migrations and database access.
- Applications may depend on packages; packages must not depend on applications.
- The web application must never import database code or API internals.
- Public routes must return DTOs, never raw database entities.

## Security

- Validate untrusted input at HTTP and configuration boundaries with explicit schemas.
- Authenticate private routes and authorize every resource using the identity from the trusted
  session, never an owner identifier supplied by the client.
- Do not concatenate untrusted values into SQL. Use parameterized, typed Drizzle operations.
- Keep CORS origins, security headers and rate limits explicit and environment-aware.
- Never expose tokens, hashes, provider internals or stack traces in public responses.
- Do not render untrusted HTML without a reviewed sanitization boundary.
- Use non-sequential identifiers for externally visible or private resources.

Authentication providers and product-specific controls must be decided in the PRD or an ADR. The
template does not force a provider before product requirements are known.

## Quality and performance

- Use strict TypeScript and keep Biome checks passing.
- Add tests for new behavior and regression tests for fixes.
- Make tests behaviorally falsifiable: identify a production change that would make the test fail
  and derive expectations independently from the implementation.
- For fixes and high-risk behavior, observe the focused test fail for the expected reason before the
  implementation when feasible, then observe it pass. Document justified exceptions instead of
  deleting valid preexisting work to recreate the sequence.
- Assert observable behavior rather than source-text presence or mock call counts unless that call is
  itself the public contract.
- Avoid N+1 database access; use explicit joins or supported relational queries.
- Keep React components as Server Components unless client-side interactivity is required.
- Use `next/image` for product images and lazy-load genuinely heavy client components.
- Run independent asynchronous operations concurrently when ordering is unnecessary.
- Prefer narrow imports that preserve tree shaking.

## Observability and errors

- Use structured logging in production code; do not use raw `console.log` or `console.error`.
- Log internal errors server-side with useful operational context, excluding secrets and personal
  data, and return stable generic errors to clients.
- Product-specific tracing, including AI cost and prompt telemetry, requires an explicit privacy and
  retention decision.

## Delivery profiles

- Do not add tenancy, billing or agent infrastructure unless the PRD activates the relevant profile.
- For SaaS, derive tenant context from trusted identity and test cross-tenant denial.
- For Service as Software, validate model-generated tool arguments, enforce per-tool least privilege
  and bind approvals to the exact action payload.
- Treat retrieved content and tool output as untrusted. Do not store secrets or hidden reasoning in
  prompts, artifacts or traces.
- Measure agent outcomes independently from the agent that reports completion.

## Verification

- Use focused tests while implementing.
- Run `pnpm verify` before delivery. It audits the harness, then runs lint, type checks, tests, build
  and the dependency security audit.
- Inspect the final diff for unrelated changes and update product, architecture or decision records
  when their contracts change.
