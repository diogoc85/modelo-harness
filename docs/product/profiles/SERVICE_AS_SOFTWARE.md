# Service as Software profile

## Activation signals

- Software performs a bounded workflow that was traditionally delivered by a person or service
  provider.
- The customer buys or measures a completed outcome, not merely access to a tool.
- Agents may plan steps, use tools, update external systems or route exceptional cases to people.

AI generation, chat or recommendations without ownership of the end-to-end outcome are insufficient
signals on their own.

## Required decisions

- Service promise, input contract, completion definition and evidence that proves the outcome.
- Eligible cases, unsupported cases, quality threshold and dispute or correction process.
- Workflow states, durable checkpoints, retries, idempotency and terminal failure behavior.
- Agent and tool boundaries, allowed data, maximum autonomy, cost, duration and attempts.
- Actions requiring preview, explicit approval or mandatory human execution.
- Human escalation owner, response objective and context included in a handoff.
- Evaluation dataset, deterministic validators, model-based evaluation limits and release thresholds.
- Per-run versioning of workflow, instructions, model and tools.
- Pricing unit and policy for incomplete, disputed or reversed outcomes.

Follow `docs/architecture/AGENTIC_SYSTEM.md` for runtime boundaries.

## Security gates

- Treat retrieved content, tool output and user-supplied documents as untrusted data, not
  instructions.
- Give every tool the minimum capability and data scope required for its current step.
- Keep credentials in a server-side secret boundary and never place them in prompts or traces.
- Require approval for destructive, irreversible, financial, legal or externally communicative
  actions unless an approved PRD and threat model establish a safer bounded policy.
- Provide a kill switch and prevent a failed run from continuing to use tools.
- Record observable decisions, tool requests, approvals and outcomes without storing hidden
  reasoning or unnecessary personal data.

## Verification gates

- Run regression evaluations on representative and adversarial cases before release.
- Test prompt injection, unauthorized tool use, approval bypass, retry duplication and tenant
  boundary failures.
- Measure completion, false-success, escalation, correction, latency and cost rates.
- Block release when a PRD-defined quality or safety threshold fails.
- Test rollback of workflow, prompt or model versions independently from application deployment.
