# Adapt professional engineering skills

- **Status:** Completed
- **Product reference:** `docs/product/PRD.md` (template-level engineering capability)
- **Architecture decision:** `docs/decisions/0002-project-native-engineering-skills.md`
- **Dependencies:** Existing Codex skill format, Node.js and repository audit tooling

## Acceptance criteria

- Evidence-driven diagnosis, agent-instruction authoring and contract-aware review are available as
  project-native skills.
- Each skill has valid frontmatter and Codex UI metadata.
- External influence is pinned to a full commit SHA with license and review date.
- The harness audit detects missing skills, malformed provenance and unsafe floating revisions.
- The repository documents discovery, provenance and attribution without installing a remote catalog.

## Security considerations

- Imported concepts are rewritten and reviewed instead of executing a remote installer.
- Skills cannot expand authorization granted by the user's request.
- Diagnostic outputs require secret and personal-data redaction.
- Review workflows are read-only unless correction is explicitly requested.

## Verification

- Skill Creator `quick_validate.py` for each new skill
- `pnpm test:harness`
- Independent read-only forward-tests for all three skills
- `pnpm verify`
- `git diff --check`
