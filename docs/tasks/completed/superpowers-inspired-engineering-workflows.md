# Superpowers-inspired engineering workflows

- **Status:** Completed
- **Product reference:** `docs/product/PRD.md` (template-level engineering capability)
- **Architecture decision:** `docs/decisions/0004-selective-superpowers-practices.md`
- **Dependencies:** Existing Codex skill format, task documentation and harness audit tooling

## Outcome

Add selected Superpowers planning, testing and orchestration practices as governed project-native
workflows. Do not install the upstream plugin, add remote hooks or replace existing product and
architecture sources of truth.

## Acceptance criteria

- **AC-01:** Multi-step or high-risk changes can be converted into executable plans under
  `docs/tasks/current/`
  without forcing planning for trivial work.
- **AC-02:** Plans trace acceptance criteria to tasks and verification evidence.
- **AC-03:** Test guidance checks behavioral falsifiability and uses observed red/green evidence for
  regressions when feasible.
- **AC-04:** Repeated failed hypotheses and review loops trigger bounded architectural reassessment
  instead of unlimited retries.
- **AC-05:** Subagent execution is available only after an explicit user request and only for
  independent tasks with non-overlapping ownership.
- **AC-06:** External influence is pinned to a full commit SHA with license, review date and
  attribution.
- **AC-07:** The harness audit validates the task template and all new skill metadata.

## Change map

| File or component | Responsibility | Change |
|:---|:---|:---|
| `.codex/skills/` | Agent workflows | Add planning/orchestration and refine testing/debugging |
| `docs/tasks/` | Governed task records | Add reusable traceability template |
| `AGENTS.md` and development docs | Durable discovery and quality rules | Add narrow triggers and test requirements |
| `.harness/skills/provenance.json` | External provenance | Pin reviewed Superpowers revision |
| `tools/harness-audit*` | Deterministic harness validation | Validate task template and skill metadata |

## Interfaces

- **Consumes:** Existing PRD, delivery profiles, ADRs, task records and Codex skill discovery.
- **Produces:** `plan-implementation`, `execute-plan-with-agents` and `docs/tasks/TEMPLATE.md`.
- **Compatibility:** Existing small-task workflow remains valid; no runtime or remote dependency is
  added.

## Tasks

### Task 1: Record the selective adaptation

- **Files:** `docs/decisions/0004-selective-superpowers-practices.md`, this task record.
- **Depends on:** None.
- **Steps:** Define included practices, non-goals, authorization boundaries and consequences.
- **Focused verification:** Read the decision against `AGENTS.md` and existing ADRs for conflicts.
- **Acceptance criteria:** AC-01, AC-05, AC-06.

### Task 2: Add native workflows and quality guidance

- **Files:** `.codex/skills/`, `AGENTS.md`, `README.md`, `docs/development/`.
- **Depends on:** Task 1.
- **Steps:** Add narrow skill triggers, traceable planning, falsifiable tests and circuit breakers.
- **Focused verification:** Skill Creator `quick_validate.py` and `pnpm harness:audit`.
- **Acceptance criteria:** AC-01, AC-03, AC-04, AC-05.

### Task 3: Add task traceability and governed provenance

- **Files:** `docs/tasks/TEMPLATE.md`, `.harness/skills/provenance.json`,
  `THIRD_PARTY_NOTICES.md`, `tools/harness-audit.mjs`, `tools/harness-audit.test.mjs`.
- **Depends on:** Task 2.
- **Steps:** Add the criterion-to-evidence template, pinned attribution and deterministic checks.
- **Focused verification:** `pnpm test:harness` and `pnpm harness:audit`.
- **Acceptance criteria:** AC-02, AC-06, AC-07.

## Traceability

| Criterion | Task | Evidence |
|:---|:---|:---|
| AC-01 | Task 1, Task 2 | `plan-implementation` trigger and task template |
| AC-02 | Task 3 | Criterion-to-task-to-evidence table in `docs/tasks/TEMPLATE.md` |
| AC-03 | Task 2 | Engineering discipline, coding standards and Definition of Done |
| AC-04 | Task 2 | Debugging and multi-agent circuit breakers |
| AC-05 | Task 1, Task 2 | Explicit-only multi-agent trigger in ADR, `AGENTS.md` and skill |
| AC-06 | Task 1, Task 3 | Pinned SHA and MIT notice |
| AC-07 | Task 3 | Harness tests and audit output |

## Security considerations

- Imported concepts are rewritten and reviewed; no remote plugin, hook or update channel is added.
- Skills do not broaden authorization, create branches, commit, push or contact external systems
  unless the user separately authorizes those actions.
- Local execution ledgers stay under ignored `.artifacts/`, exclude secrets and personal data, and
  never become a source of truth.
- Subagents receive the minimum task context and the coordinator independently verifies their work.

## Verification

- Skill Creator `quick_validate.py` — passed for both new and both modified skills.
- `pnpm test:harness` — passed, 8/8 tests.
- `pnpm harness:audit` — passed.
- `pnpm check` — passed, including lint, type checks, tests and production builds.
- `pnpm audit:security` — passed, no known vulnerabilities.
- `pnpm verify` — passed and wrote `.artifacts/verification/latest.md`.
- `git diff --check` — passed.
