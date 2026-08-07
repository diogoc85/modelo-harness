# ADR 0002: Project-native engineering skills with pinned provenance

- **Status:** Accepted
- **Date:** 2026-08-07

## Context

The `mattpocock/skills` repository contains useful workflows for evidence-driven debugging,
agent-facing documentation and contract-aware code review. Installing the entire catalog through a
floating package command would introduce overlapping instructions, an implicit update channel and
workflows that assume external issue trackers or Unix shell tooling.

## Decision

Recreate the three relevant practices as concise project-native skills:

- `diagnose-with-evidence` for reproduction-led debugging;
- `write-agent-instructions` for context-efficient and safe instruction authoring;
- `review-against-contract` for separate standards and intent review axes.

The skills preserve this repository's authorization, safety, documentation and verification rules.
They do not require a provider, issue tracker, network service or subagent runtime. External
influence is recorded in `.harness/skills/provenance.json` with a full commit SHA, license, review
date and upstream path. `THIRD_PARTY_NOTICES.md` preserves attribution.

The harness audit validates every project skill's frontmatter and UI metadata presence, resolves
each provenance entry to a local skill and rejects floating or malformed source revisions.

## Consequences

- The template gains stronger engineering workflows without importing an external catalog.
- Adaptations evolve under this project's review and release process rather than updating silently.
- Upstream improvements must be reviewed and deliberately re-applied; changing the pinned revision
  requires updating provenance and rerunning verification.
