# Software as a Service profile

## Activation signals

- Customers receive ongoing access to a hosted product.
- The product has accounts, subscriptions, entitlements, usage limits or multiple customer tenants.
- Users operate product features rather than purchasing a completed autonomous work outcome.

## Required decisions

- Individual versus organization tenancy, tenant ownership and invitation lifecycle.
- Roles, permissions and resource-level authorization rules.
- Plans, entitlements, quotas, trials, upgrades, downgrades, cancellation and account recovery.
- Billing system of record, webhook semantics, idempotency and reconciliation.
- Data export, deletion, retention, backups, restoration and customer offboarding.
- Support and administrative access, including auditable impersonation if it is allowed.
- Availability objectives, operational ownership and abuse controls.

Do not add billing or organization abstractions until the PRD selects them.

## Security gates

- Derive tenant and owner identity from a trusted session, never solely from client input.
- Prove tenant isolation in API and database tests.
- Verify webhook authenticity and make event processing idempotent.
- Separate customer-facing privileges from support and platform administration.
- Rate-limit sensitive and costly operations using a documented policy.

## Verification gates

- Test cross-tenant access denial and role boundaries.
- Test entitlement and lifecycle transitions, including failed and replayed billing events.
- Exercise backup/restore and deletion procedures when the product stores durable customer data.
- Measure the service objectives committed in the PRD.
