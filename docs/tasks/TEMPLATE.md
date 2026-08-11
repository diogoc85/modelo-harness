# <Task title>

- **Status:** Proposed | Approved | In progress | Blocked | Completed
- **Product reference:** `<PRD, profile or approved specification>`
- **Architecture decision:** `<ADR or N/A>`
- **Dependencies:** `<task identifiers or None>`

## Outcome

Describe the observable result and the boundary of this task. Record material non-goals when they
prevent accidental scope growth.

## Acceptance criteria

- **AC-01:** Objective, testable behavior.
- **AC-02:** Objective, testable behavior.

## Change map

| File or component | Responsibility | Change |
|:---|:---|:---|
| `path/to/file` | Existing responsibility | Create or modify |

## Interfaces

- **Consumes:** Existing contracts, types, routes or artifacts.
- **Produces:** New or changed signatures, schemas, routes or artifacts.
- **Compatibility:** Migration, rollout or backward-compatibility requirements.

## Tasks

### Task 1: <independent deliverable>

- **Files:** Exact files owned by this task.
- **Depends on:** Task identifiers or None.
- **Steps:** Implementation actions needed to remove ambiguity.
- **Focused verification:** Command and expected observable result.
- **Acceptance criteria:** AC identifiers covered by this task.

## Traceability

| Criterion | Task | Evidence |
|:---|:---|:---|
| AC-01 | Task 1 | Focused test or observable verification |
| AC-02 | Task 1 | Static check, build, audit or manual observation |

## Security and operational considerations

- Authentication, authorization, input validation and sensitive-data handling, when applicable.
- Migration, rollback, telemetry, cost and operational effects, when applicable.
- External effects that require separate authorization.

## Verification

- Focused behavior check: `<command>` — expected `<result>`
- Repository gates: `pnpm verify`
- Final diff inspection for unrelated changes and unresolved placeholders

## Decisions and exceptions

Record material assumptions, approved deviations and verification that cannot be run, with reasons.
