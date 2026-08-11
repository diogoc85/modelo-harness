# Delivery model profiles

- **Status:** Completed
- **Product reference:** `docs/product/PRD.md` (template-level product classification)
- **Architecture decision:** `docs/decisions/0003-delivery-model-profiles.md`
- **Dependencies:** Existing Node.js, pnpm and Codex skill validation only

## Acceptance criteria

- A PRD can declare or be classified as traditional, SaaS, Service as Software or hybrid.
- Each delivery model has opt-in product, security, operational and verification requirements.
- Ambiguous material classifications require confirmation before implementation.
- Agentic products require outcome definitions, bounded tools, approvals, evaluations and traces.
- The harness audit rejects missing, unsafe or inconsistent delivery-model manifests.
- Agent instructions and documentation explain classification without granting implementation authority.

## Security considerations

- Profiles require tenant isolation and resource authorization where private shared data exists.
- Agentic profiles address prompt injection, tool privilege, approvals, secrets and auditability.
- No model provider, billing provider, external service or credential was added.
- Vulnerable transitive dependencies are pinned or upgraded to patched versions, including `nanoid`,
  `esbuild`, `postcss`, Hono, the Hono Node adapter and the OpenTelemetry integration.

## Verification

- `pnpm test:harness` — passed, 7 tests.
- `pnpm harness:audit` — passed.
- `pnpm check` — passed.
- `pnpm audit:security` — passed with zero known vulnerabilities.
- `pnpm verify` — passed and wrote local evidence under `.artifacts/verification/`.
- `git diff --check` — passed.
