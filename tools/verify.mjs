import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pnpmExecutable = process.env.npm_execpath ? process.execPath : "pnpm";
const checks = [
  ["Harness audit", ["harness:audit"]],
  ["Project checks", ["check"]],
  ["Dependency security audit", ["audit:security"]],
];

const results = [];
for (const [name, args] of checks) {
  const startedAt = new Date();
  console.log(`\n==> ${name}`);
  const commandArgs = process.env.npm_execpath
    ? [process.env.npm_execpath, ...args]
    : args;
  const result = spawnSync(pnpmExecutable, commandArgs, {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });
  if (result.error)
    console.error(`Unable to run pnpm: ${result.error.message}`);
  results.push({
    name,
    command: `pnpm ${args.join(" ")}`,
    passed: result.status === 0,
    durationMs: Date.now() - startedAt.getTime(),
  });
}

const generatedAt = new Date().toISOString();
const report = [
  "# Verification evidence",
  "",
  `Generated: ${generatedAt}`,
  "",
  "| Gate | Command | Result | Duration |",
  "|:--|:--|:--|--:|",
  ...results.map(
    ({ name, command, passed, durationMs }) =>
      `| ${name} | \`${command}\` | ${passed ? "PASS" : "FAIL"} | ${(
        durationMs / 1000
      ).toFixed(1)}s |`,
  ),
  "",
  "This local artifact records exit status and duration only; command output and environment values are not persisted.",
  "",
].join("\n");

const artifactDirectory = path.join(root, ".artifacts/verification");
mkdirSync(artifactDirectory, { recursive: true });
writeFileSync(path.join(artifactDirectory, "latest.md"), report, "utf8");
console.log(
  "\nVerification evidence written to .artifacts/verification/latest.md",
);

if (results.some(({ passed }) => !passed)) process.exitCode = 1;
