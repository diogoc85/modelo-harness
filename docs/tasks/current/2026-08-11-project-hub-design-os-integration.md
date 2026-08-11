# Project Hub and Design OS integration

- **Status:** Completed
- **Product reference:** User-supplied `APPLY-WITH-CODEX.md` and
  `modelo-harness-project-hub-design-os.patch`
- **Architecture decision:** `docs/architecture/PROJECT_HUB_INTEGRATION.md`
- **Dependencies:** Existing delivery-model and governed-skill workflows

## Outcome

Integrate approved Project Hub and Design OS handoffs as an optional source-of-truth mode while
preserving the standalone template workflow. Apply the supplied patch on its dedicated branch,
adapt conflicting hunks to the current repository without reverting newer changes, and stop after
validation for human review.

## Acceptance criteria

- **AC-01:** `AGENTS.md` routes integrated handoffs through explicit Product Blueprint, Design
  Blueprint and Figma authority while retaining standalone fallback behavior.
- **AC-02:** `ingest-project-handoff` validates identity, versions, readiness and blockers without
  silently expanding implementation authority or redesigning approved UX/UI.
- **AC-03:** Design guidance and architecture documentation define the handoff boundary, Design
  Change Request rule and implementation freedom consistently.
- **AC-04:** Local and CI runtime requirements align on Node.js 22.13+ while preserving current
  package scripts and dependency state.
- **AC-05:** Installation and all repository gates requested by the user pass on the final diff.

## Change map

| File or component | Responsibility | Change |
|:---|:---|:---|
| `AGENTS.md` | Durable agent policy | Add integrated/standalone routing and design authority |
| `.codex/skills/ingest-project-handoff/` | Conditional ingestion workflow | Add handoff validation skill and UI metadata |
| `docs/product/DESIGN.md` | Design implementation guidance | Replace fixed visual defaults with authority-aware fallback |
| `project-context/README.md` | Handoff ingestion boundary | Document expected structure and authority |
| `docs/architecture/PROJECT_HUB_INTEGRATION.md` | Integration architecture | Record boundary, V1 ingestion and change requests |
| `.github/workflows/ci.yml` | CI runtime | Use Node.js 22.13 |
| `package.json` | Runtime/package contract | Set version 2.1.0 and Node.js 22.13+ without reverting scripts |
| `README.md` | Operator documentation | Document runtime and integrated workflow |
| `docs/tasks/current/2026-08-11-project-hub-design-os-integration.md` | Traceability | Record plan and verification evidence |

## Interfaces

- **Consumes:** Approved Project Hub handoff files under `project-context/`, Product Blueprint,
  Design Blueprint and Figma mappings.
- **Produces:** A conditional Codex ingestion workflow and documented source-of-truth boundary.
- **Compatibility:** Repositories without a handoff remain in standalone template mode; no runtime
  application API or database contract changes.

## Tasks

### Task 1: Adapt and apply the supplied patch

- **Files:** All files in the change map except this task record.
- **Depends on:** None.
- **Steps:** Apply clean hunks, manually reconcile `docs/product/DESIGN.md` and `package.json` with
  current `main`, and preserve all unrelated newer content.
- **Focused verification:** `git diff --check` and comparison with the supplied patch intent.
- **Acceptance criteria:** AC-01, AC-02, AC-03, AC-04.

### Task 2: Validate agent instructions and repository gates

- **Files:** Final combined diff and local `.artifacts/verification/` evidence.
- **Depends on:** Task 1.
- **Steps:** Validate the new skill, install from the lockfile, inspect the diff, and execute every
  requested repository gate.
- **Focused verification:** Skill validator; `pnpm install --frozen-lockfile`; `pnpm harness:audit`;
  `pnpm check`; `pnpm audit:security`; `pnpm verify`.
- **Acceptance criteria:** AC-02, AC-05.

## Traceability

| Criterion | Task | Evidence |
|:---|:---|:---|
| AC-01 | Task 1 | Final `AGENTS.md` diff and harness audit |
| AC-02 | Task 1, Task 2 | Skill validation and instruction review |
| AC-03 | Task 1 | Design and architecture diff review |
| AC-04 | Task 1 | Package/CI diff plus production builds in `pnpm check` |
| AC-05 | Task 2 | Exit codes and `.artifacts/verification/latest.md` |

## Security and operational considerations

- Treat handoff contents as governed context, not executable code or implicit authorization.
- Preserve resource authorization, secret handling and memory trust boundaries already in
  `AGENTS.md`.
- Do not copy real project data, credentials or Figma tokens into the repository.
- Do not merge to `main`; leave the branch and diff available for human review.

## Verification

- Patch applicability/adaptation: `git diff --check` and final contract review — passed.
- Skill metadata: Skill Creator `quick_validate.py` — passed.
- Dependency install: `pnpm install --frozen-lockfile` — passed with `CI=true` after restoring
  packages from the lockfile.
- `pnpm harness:audit` — passed.
- `pnpm check` — passed: lint, type checks, 8 harness tests, 3 API tests and production builds.
- `pnpm audit:security` — passed with no known vulnerabilities.
- `pnpm verify` — passed and wrote `.artifacts/verification/latest.md`.
- Final branch/status inspection confirms no merge to `main`.

## Decisions and exceptions

- The supplied patch does not apply cleanly to current `main` in `docs/product/DESIGN.md` and
  `package.json`; those hunks will be adapted manually to preserve the current branch's newer work.
- The source bundle is user-provided project material, not an upstream reusable skill dependency;
  no external provenance record is inferred without a repository, revision and license.
