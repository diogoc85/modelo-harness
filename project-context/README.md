# Project Context

This directory is the Model Harness ingestion boundary for artifacts produced upstream by
Plan Architect and Design OS.

## Expected integrated structure

```text
project-context/
├── project-manifest.yaml
├── links.yaml
├── design-to-harness-handoff.yaml
├── product-blueprint/
├── design-blueprint/
├── figma-map.yaml
└── implementation-handoff.md
```

Projects may use equivalent paths when the handoff explicitly maps them.

## Authority

- Product Blueprint: product/business source of truth.
- Design Blueprint: experience contract.
- Figma: visual source of truth.
- GitHub repository: code source of truth.

Do not treat this directory as generated application code.

## Bootstrap

When an approved handoff exists, Codex should use the `ingest-project-handoff` skill before
substantial implementation work.

The handoff may be copied/exported from the Project Hub into this directory for V1. Future versions
may automate this ingestion through an orchestrator/API.
