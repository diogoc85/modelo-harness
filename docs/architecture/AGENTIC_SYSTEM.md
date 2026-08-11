# Agentic service architecture

Use this reference only when the selected delivery model is `service-as-software` or `hybrid`.
Concrete providers and frameworks require a project decision.

## Runtime boundaries

Keep these responsibilities explicit even if a small implementation combines them initially:

- **Intake:** validates the service request and binds it to the authenticated tenant and actor.
- **Orchestrator:** advances a versioned workflow through durable states.
- **Model gateway:** applies approved model configuration, budgets, timeouts and telemetry policy.
- **Tool adapters:** expose narrow typed operations instead of raw credentials or unrestricted APIs.
- **Policy and approval:** decides whether an action may execute automatically, needs approval or
  must be rejected.
- **Run store:** records state, artifacts, attempts, approvals and observable outcomes.
- **Evaluation:** verifies outcome quality independently from the worker that produced it.
- **Metering:** derives billable usage or outcomes from authoritative execution events.

Do not expose model-provider responses or internal persistence entities as public contracts. Public
DTOs belong in `packages/contracts`; orchestration and provider internals belong behind the API.

## Execution lifecycle

Use explicit states appropriate to the product, normally including accepted, running,
awaiting-approval, succeeded, failed and cancelled. Every transition must have an authorized actor,
timestamp and idempotency boundary. Persist a checkpoint before and after external side effects.

A successful process exit is not proof of a successful service. Mark an outcome complete only after
the PRD-defined validator accepts it. Keep technical failure, rejected outcome, human escalation and
customer cancellation distinguishable.

## Trust boundaries

- System and developer policy outrank all retrieved or user-provided content.
- Treat documents, websites, email and tool results as potentially hostile.
- Validate model-generated tool arguments against strict schemas and business authorization.
- Resolve tenant, permissions and secret access server-side for every tool call.
- Sanitize traces and artifacts according to an explicit privacy and retention decision.
- Do not persist hidden chain-of-thought. Store concise decision summaries and operational evidence.

## Human control

Define an approval matrix from action risk, reversibility and impact. Approval records must bind the
reviewed action payload, approver, scope and expiration; changing the payload invalidates approval.
Cancellation and kill switches must prevent future tool execution, not only update the user
interface.

## Reliability and economics

Set per-run budgets for time, model usage, tool calls and retries. Use idempotency keys for external
effects, exponential backoff only for retryable failures and a terminal path for exhausted work.
Measure cost and latency by workflow version. Never let billing depend solely on an agent's claim
that it succeeded.

## Evaluation and release

Maintain versioned representative, edge and adversarial cases without real customer data. Prefer
deterministic checks for permissions, calculations, schemas and required evidence. If a model grades
subjective quality, calibrate it against reviewed examples and keep it independent from the worker
when practical.

Define release thresholds in the PRD. Run evaluations when workflows, instructions, models, tools or
policies change. Support rollback and retain enough version metadata to reproduce an execution.
