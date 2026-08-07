# ECC-inspired harness improvements

- **Status:** Completed
- **Product reference:** `docs/product/PRD.md` (template-level engineering capability)
- **Architecture decision:** `docs/decisions/0001-harness-verification-and-memory.md`
- **Dependencies:** Existing Node.js, pnpm, Git and Biome toolchain only

## Acceptance criteria

- The repository exposes a deterministic harness audit with tests.
- One command runs the harness audit, project checks and dependency audit and records local evidence.
- Local memory is ignored and shared memory requires review, source and update metadata.
- Agent instructions and coding standards describe the verification and memory trust boundaries.
- Obsolete `apps/frontend` and `apps/backend` guidance is removed.

## Security considerations

- The audit checks tracked filenames without reading secret values.
- Verification evidence stores only command, exit result and duration.
- Memory is explicitly untrusted, contains no secrets or personal data and cannot override governed
  project instructions.

## Verification

- `pnpm verify`
- `git diff --check`
