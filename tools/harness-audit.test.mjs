import assert from "node:assert/strict";
import test from "node:test";
import {
  inspectDeliveryModels,
  inspectMemoryDocument,
  inspectPackageScripts,
  inspectSkillDocument,
  inspectSkillMetadata,
  inspectSkillProvenance,
  inspectTaskTemplate,
  inspectTrackedFiles,
} from "./harness-audit.mjs";

test("requires complete and safe delivery model profiles", () => {
  const valid = {
    schemaVersion: 1,
    default: "traditional",
    profiles: [
      {
        id: "traditional",
        document: "docs/product/profiles/TRADITIONAL.md",
        extends: [],
      },
      {
        id: "saas",
        document: "docs/product/profiles/SAAS.md",
        extends: [],
      },
      {
        id: "service-as-software",
        document: "docs/product/profiles/SERVICE_AS_SOFTWARE.md",
        extends: [],
      },
      {
        id: "hybrid",
        document: "docs/product/profiles/HYBRID.md",
        extends: ["saas", "service-as-software"],
      },
    ],
  };
  assert.deepEqual(inspectDeliveryModels(valid), []);

  valid.profiles[3].extends = ["saas", "missing"];
  valid.profiles[0].document = "../outside.md";
  assert.deepEqual(
    inspectDeliveryModels(valid, () => false),
    [
      "delivery models: invalid document for 'traditional'",
      "delivery models: missing document 'docs/product/profiles/SAAS.md'",
      "delivery models: missing document 'docs/product/profiles/SERVICE_AS_SOFTWARE.md'",
      "delivery models: missing document 'docs/product/profiles/HYBRID.md'",
      "delivery models: 'hybrid' extends unknown profile 'missing'",
      "delivery models: hybrid must extend saas and service-as-software",
    ],
  );
});

test("accepts the required harness scripts", () => {
  assert.deepEqual(
    inspectPackageScripts({
      scripts: {
        check: "x",
        "audit:security": "x",
        "harness:audit": "x",
        verify: "x",
      },
    }),
    [],
  );
});

test("requires traceability and verification in the task template", () => {
  const valid = [
    "## Acceptance criteria",
    "## Change map",
    "## Tasks",
    "## Traceability",
    "| Criterion | Task | Evidence |",
    "## Security and operational considerations",
    "## Verification",
  ].join("\n");
  assert.deepEqual(inspectTaskTemplate(valid), []);
  assert.deepEqual(inspectTaskTemplate("## Tasks\n"), [
    "task template: missing '## Acceptance criteria'",
    "task template: missing '## Change map'",
    "task template: missing '## Traceability'",
    "task template: missing '## Security and operational considerations'",
    "task template: missing '## Verification'",
    "task template: missing criterion-to-evidence mapping",
  ]);
});

test("requires complete and discoverable skill UI metadata", () => {
  assert.deepEqual(
    inspectSkillMetadata(
      'interface:\n  display_name: "Safe Skill"\n  short_description: "Perform safe and focused work"\n  default_prompt: "Use $safe-skill for this task."\n',
      "safe-skill",
      "openai.yaml",
    ),
    [],
  );
  assert.deepEqual(
    inspectSkillMetadata(
      'interface:\n  display_name: "Safe Skill"\n  short_description: "Too short"\n  default_prompt: "Use another skill."\n',
      "safe-skill",
      "openai.yaml",
    ),
    [
      "openai.yaml: short_description must contain 25-64 characters",
      "openai.yaml: default_prompt must reference $safe-skill",
    ],
  );
});

test("validates skill structure and directory name", () => {
  assert.deepEqual(
    inspectSkillDocument(
      "---\nname: example-skill\ndescription: Does useful work.\n---\n\n# Skill\n",
      "example-skill",
      "SKILL.md",
    ),
    [],
  );
  assert.deepEqual(
    inspectSkillDocument(
      "---\nname: wrong-name\ndescription: Does useful work.\n---\n",
      "example-skill",
      "SKILL.md",
    ),
    ["SKILL.md: name must match directory 'example-skill'"],
  );
});

test("requires pinned and resolvable external skill provenance", () => {
  const valid = {
    schemaVersion: 1,
    sources: [
      {
        id: "example",
        repository: "https://github.com/example/skills",
        revision: "a".repeat(40),
        license: "MIT",
        reviewedAt: "2026-08-07",
        adaptation: "rewritten",
        influences: [
          { localSkill: "safe-skill", upstreamPath: "skills/safe/SKILL.md" },
        ],
      },
    ],
  };
  assert.deepEqual(
    inspectSkillProvenance(valid, (skill) => skill === "safe-skill"),
    [],
  );

  valid.sources[0].revision = "main";
  assert.deepEqual(
    inspectSkillProvenance(valid, () => false),
    [
      "example: revision must be a full 40-character commit SHA",
      "example: local skill is missing: safe-skill",
    ],
  );
});

test("rejects tracked secret and database filenames", () => {
  assert.deepEqual(
    inspectTrackedFiles([
      "src/index.ts",
      ".env",
      ".env.example.txt",
      "certs/app.pem",
      "dev.db",
    ]),
    [
      "sensitive file is tracked: .env",
      "sensitive file is tracked: certs/app.pem",
      "sensitive file is tracked: dev.db",
    ],
  );
});

test("requires governance metadata in shared memories", () => {
  assert.deepEqual(inspectMemoryDocument("# note\n", "note.md"), [
    "note.md: missing YAML frontmatter",
    "note.md: missing 'status: reviewed'",
    "note.md: missing 'source:'",
    "note.md: missing 'updated:'",
  ]);
  assert.deepEqual(
    inspectMemoryDocument(
      "---\nstatus: reviewed\nsource: docs/decisions/001.md\nupdated: 2026-08-07\n---\n",
      "note.md",
    ),
    [],
  );
});
