# Web guidance

Use Server Components by default. Keep client components narrow. Consume API types only from
`@repo/contracts`; never import `@repo/database`. Preserve accessibility, CSP compatibility and
bundle budgets. UI changes require a production build and relevant component or E2E tests.
