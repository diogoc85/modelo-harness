# Definition of Done

- Acceptance criteria are traceable to the PRD or task.
- Multi-step plans map every acceptance criterion to an implementation task and verification
  evidence.
- Inputs, authentication and authorization are tested.
- Regression tests are behaviorally falsifiable and have observed red/green evidence when feasible,
  with justified exceptions recorded.
- `pnpm verify` succeeds, covering the harness audit, `pnpm check` and dependency security audit.
- Verification evidence is available locally in `.artifacts/verification/latest.md`.
- Migrations, configuration and operational impact are documented.
- No secret, token, local database or personal data is tracked.
- The PRD records a confirmed delivery model and applicable profile gates are satisfied.
- SaaS changes test tenant and entitlement boundaries when present.
- Agentic changes pass PRD-defined outcome, adversarial, approval and tool-authorization evaluations.
