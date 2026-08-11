# ADR 0003: Opt-in delivery model profiles

- **Status:** Accepted
- **Date:** 2026-08-07

## Context

The template must support conventional applications, Software as a Service products and products
where software agents deliver work previously performed as a human service. These models share a
technical foundation but differ materially in product definition, authorization, commercial
metering, safety, evaluation and operations.

Treating every project as SaaS would burden simple applications. Treating every AI feature as an
autonomous service would create unsafe defaults. Inferring a model silently from an ambiguous PRD
could also lock a project into the wrong architecture.

## Decision

Maintain one common architecture and expose four opt-in delivery profiles in
`.harness/delivery-models.json`: `traditional`, `saas`, `service-as-software` and `hybrid`.

At project inception, classify the PRD using observable product signals. A clear declaration may be
accepted directly. A material ambiguity must be presented to the user before implementation. The
classification selects requirements and gates; it does not authorize code changes by itself.

Keep provider-specific runtime code out of the template. Store product requirements in profile
documents, agent-runtime boundaries in `docs/architecture/AGENTIC_SYSTEM.md`, and the reusable
classification workflow in a project-native skill. Validate the manifest deterministically in the
harness audit.

## Consequences

- Traditional projects remain lightweight.
- SaaS projects gain explicit tenancy, entitlement and lifecycle decisions.
- Service as Software projects gain outcome, autonomy, evaluation and audit requirements.
- Hybrid products apply both profiles and resolve conflicts explicitly.
- Concrete providers, frameworks and infrastructure remain project decisions documented in PRDs or
  later ADRs.
