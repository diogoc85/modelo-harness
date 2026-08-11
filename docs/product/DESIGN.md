# Design Implementation Guidance

This file is a compatibility bridge for the software template.

## Authority

When an approved Design OS handoff exists, the implementation must follow:

1. `project-context/design-blueprint/` — machine/human-readable design contract;
2. `project-context/figma-map.yaml` — semantic mapping to approved Figma nodes;
3. Figma — visual source of truth;
4. `project-context/implementation-handoff.md` — implementation-specific design guidance.

This file must not override those sources.

## Standalone fallback

Only when no approved Design OS handoff exists:

- build responsive interfaces;
- prefer reusable components over duplicated UI/CSS;
- use the repository's approved UI stack and existing components;
- do not introduce a competing UI library without explicit approval;
- derive visual direction from the active project requirements rather than fixed template colors.

## Design change rule

If the approved design conflicts with a material implementation constraint, do not silently redesign
the product. Document the constraint and request a Design Change Request for the affected scope.

## Implementation freedom

Engineering may choose internal component composition, state management and library mechanics when
approved design intent, behavior, accessibility and reuse boundaries are preserved.
