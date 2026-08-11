# Project Hub and Design OS Integration

## Purpose

Model Harness consumes structured handoffs instead of relying on prior chat context.

```text
Plan Architect
  → Product Blueprint
Design OS
  → Design Blueprint + Figma
Project Hub
  → approved handoff package
Model Harness / Codex
  → ingest-project-handoff
  → classify delivery model
  → implementation plan
  → implementation
```

## Boundary

Model Harness must not silently:

- change approved product scope;
- change business rules or permissions;
- redesign approved UX/UI;
- replace Design System tokens/components with template defaults.

Technical architecture remains Harness-owned.

## V1 ingestion

V1 accepts an exported/copy of the approved Project Hub handoff under `project-context/`.
The ingestion skill validates identity, versions, QA/readiness and scope before planning.

## Change requests

A material implementation constraint that changes approved experience creates a Design Change
Request back to Design OS. A missing product decision is routed back to Plan Architect/human.

## Compatibility fallback

If no integrated handoff exists, the repository continues to support standalone operation through
`docs/product/PRD.md` and `docs/product/DESIGN.md`.
