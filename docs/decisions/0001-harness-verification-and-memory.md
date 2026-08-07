# ADR 0001: Selective harness verification and governed memory

- **Status:** Accepted
- **Date:** 2026-08-07

## Context

The template already has architectural boundaries and project quality gates, but it lacked a
deterministic audit of its own agent configuration, a single evidence-producing verification entry
point and an explicit trust boundary for cross-session memory. ECC demonstrates useful separation
between rules, on-demand skills, agents, hooks and memory, but adopting its full catalog would add
overlap and provider-specific behavior.

## Decision

Adopt the relevant concepts as small project-native mechanisms:

1. `pnpm harness:audit` checks required governance files, required scripts, obsolete architecture
   paths, sensitive tracked filenames and metadata on shared memory.
2. `pnpm verify` runs the harness audit, project checks and dependency audit, recording only exit
   status and duration in an ignored local artifact.
3. `.harness/memory/local/` remains untracked; `.harness/memory/team/` accepts only reviewed,
   sourced and dated Markdown documents.
4. Existing project documents remain authoritative. Memory never becomes executable policy.

## Consequences

- The repository gains repeatable evidence and early detection of instruction drift without a new
  runtime dependency or external service.
- Teams must review shared memory and keep its sources current.
- The audit is intentionally bounded and complements, rather than replaces, code review, tests,
  secret scanning and dependency auditing.
