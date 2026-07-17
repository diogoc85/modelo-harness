# Codex Project Guidance

## Source of truth

Before substantial work, read `docs/product/PRD.md`, `docs/product/DESIGN.md` when UI is involved,
and `docs/architecture/SYSTEM.md`. Record durable architectural decisions under `docs/decisions/`.

## Architecture

- `apps/web` contains only the Next.js frontend.
- `apps/api` contains HTTP transport and application composition.
- `packages/contracts` owns public schemas and DTOs.
- `packages/database` owns Drizzle schema, migrations and database access.
- Frontend must never import database or API internals.
- Do not expose database entities directly from public routes.

## Completion requirements

Run `pnpm check` and `pnpm audit:security`. Do not claim completion when either fails. Add tests for
new behavior, keep secrets and real user data out of the repository, and update documentation when
contracts or architecture change.

## Safety

Require authentication and resource-level authorization for private data. Validate untrusted input
at system boundaries. Log internal errors server-side and return stable, generic client errors.
