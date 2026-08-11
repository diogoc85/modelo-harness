# System architecture

The repository is a pnpm monorepo. `apps/web` renders the UI and communicates with `apps/api` over
HTTP. Public request/response contracts live in `packages/contracts`. Database implementation and
migrations live in `packages/database` and are consumed only by the API.

Dependencies point inward toward contracts; no package may import from an application. Operational
quality is enforced by read-only lint, strict types, tests, production builds and dependency audit.

Delivery-specific architecture is opt-in through `.harness/delivery-models.json`. SaaS requirements
are defined in `docs/product/profiles/SAAS.md`. Service as Software and hybrid products must also
follow `docs/architecture/AGENTIC_SYSTEM.md`; the base template does not select a model provider,
agent framework, billing provider or tenancy model before the PRD requires one.
