# Traditional application profile

## Activation signals

- The product is a website, application, internal tool or API without a recurring hosted-service
  business model.
- People operate the software to perform the meaningful work.
- Tenancy, subscriptions and autonomous service delivery are not product requirements.

## Required decisions

- Users, workflows, scope, non-goals and testable acceptance criteria.
- Authentication, authorization and sensitive-data boundaries where applicable.
- Deployment environment, data lifecycle and operational owner.

## Security gates

- Validate untrusted inputs and authorize private resources.
- Keep secrets out of source control and public responses.
- Add controls proportional to the data and actions in scope.

## Verification gates

- Test critical behavior and boundaries described by the PRD.
- Pass the repository Definition of Done.
