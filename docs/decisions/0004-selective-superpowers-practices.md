# ADR 0004: Selective Superpowers practices as governed native workflows

- **Status:** Accepted
- **Date:** 2026-08-11

## Context

The `obra/superpowers` repository provides mature workflows for executable planning, falsifiable
tests, bounded debugging, work isolation and subagent-driven delivery. Installing the complete
plugin would also introduce mandatory skill checks, universal design and TDD gates, a parallel
documentation hierarchy and agent orchestration that is disproportionate for small changes.

The template already uses risk-proportional engineering discipline, governed product documents,
project-native skills and deterministic verification. Any imported practice must preserve those
boundaries and the user's authorization.

## Decision

Adapt selected practices from Superpowers v6.2.0 as project-native mechanisms:

1. `plan-implementation` creates executable, contract-traceable plans in `docs/tasks/current/` only
   for multi-step, dependent or materially risky work.
2. Test guidance requires behavior-focused falsifiability and observed red/green evidence for fixes
   when feasible, without imposing universal test-first development on prototypes or prose.
3. Debugging and agent review workflows use circuit breakers before repeated attempts become churn.
4. `execute-plan-with-agents` is opt-in: it activates only when the user explicitly requests
   subagents, delegation or parallel agent work and an approved plan can be partitioned safely.
5. Plan-scoped execution state may be recorded under ignored `.artifacts/execution/`; it contains
   statuses and evidence, not secrets, personal data or hidden reasoning.

Do not install the upstream plugin, add session hooks, create `docs/superpowers/`, require worktrees,
or allow these workflows to commit, push, open pull requests or perform other external effects
without separate authorization.

Pin the reviewed upstream revision and license in `.harness/skills/provenance.json`; preserve
attribution in `THIRD_PARTY_NOTICES.md`.

## Consequences

- The harness gains the high-value planning, testing and orchestration patterns without importing a
  second methodology or update channel.
- Simple and exploratory work keeps a lightweight path; rigor increases with dependency, risk and
  explicit user intent.
- Multi-agent execution carries additional coordination cost and is unavailable unless the user
  opts in.
- Future upstream changes require deliberate review, a new pinned revision and normal verification.
