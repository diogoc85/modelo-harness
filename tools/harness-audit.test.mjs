import assert from "node:assert/strict";
import test from "node:test";
import {
  inspectMemoryDocument,
  inspectPackageScripts,
  inspectTrackedFiles,
} from "./harness-audit.mjs";

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
