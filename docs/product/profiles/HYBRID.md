# Hybrid SaaS and Service as Software profile

## Activation signals

- Customers use a hosted product while agents also deliver completed work outcomes.
- Subscription or tenant entitlements coexist with task, consumption or outcome-based execution.
- People supervise, approve or correct agent work through the product.

## Required decisions

Apply every applicable requirement from the SaaS and Service as Software profiles, then resolve:

- which capabilities are subscription entitlements and which executions consume metered units;
- whether agent runs belong to a user, organization or other tenant boundary;
- who may start, inspect, approve, cancel and dispute a run;
- how plan changes affect active work and retained artifacts;
- how customer support accesses execution evidence without crossing tenant or privacy boundaries;
- how service outcomes reconcile with usage and billing records.

## Security gates

- Enforce both tenant isolation and per-tool least privilege.
- Bind every run, approval, artifact and billing event to a trusted tenant context.
- Prevent administrative or agent workflows from bypassing customer authorization.

## Verification gates

- Run all applicable SaaS and Service as Software verification gates.
- Test entitlement changes during active runs and cross-tenant run access.
- Reconcile outcome, usage and billing records under retries, cancellation and disputes.
