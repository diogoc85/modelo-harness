import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const REQUIRED_FILES = [
  "AGENTS.md",
  "docs/product/PRD.md",
  "docs/architecture/SYSTEM.md",
  "docs/development/DEFINITION_OF_DONE.md",
  ".harness/memory/README.md",
];

const SENSITIVE_TRACKED_PATTERNS = [
  /(^|\/)\.env($|\.)/,
  /\.(pem|key|p12|pfx)$/i,
  /(^|\/)(id_rsa|id_ed25519)$/i,
  /\.(db|sqlite|sqlite3)$/i,
];

function relativeFiles(directory, extension = ".md") {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return relativeFiles(target, extension);
    return entry.name.endsWith(extension) ? [target] : [];
  });
}

export function inspectMemoryDocument(contents, filename) {
  const findings = [];
  if (!contents.startsWith("---\n")) {
    findings.push(`${filename}: missing YAML frontmatter`);
  }
  for (const field of ["status: reviewed", "source:", "updated:"]) {
    if (!contents.includes(field))
      findings.push(`${filename}: missing '${field}'`);
  }
  return findings;
}

export function inspectPackageScripts(packageJson) {
  const findings = [];
  for (const script of ["check", "audit:security", "harness:audit", "verify"]) {
    if (!packageJson.scripts?.[script])
      findings.push(`package.json: missing '${script}' script`);
  }
  return findings;
}

export function inspectTrackedFiles(files) {
  return files
    .filter((file) => {
      const basename = path.posix.basename(file);
      if (basename.startsWith(".env.example")) return false;
      return SENSITIVE_TRACKED_PATTERNS.some((pattern) => pattern.test(file));
    })
    .map((file) => `sensitive file is tracked: ${file}`);
}

export function auditRepository(repositoryRoot = root) {
  const errors = [];
  const warnings = [];

  for (const file of REQUIRED_FILES) {
    if (!existsSync(path.join(repositoryRoot, file)))
      errors.push(`required file is missing: ${file}`);
  }

  const packagePath = path.join(repositoryRoot, "package.json");
  if (existsSync(packagePath)) {
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    errors.push(...inspectPackageScripts(packageJson));
  }

  let trackedFiles = [];
  try {
    trackedFiles = execFileSync("git", ["ls-files"], {
      cwd: repositoryRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    warnings.push(
      "git index unavailable; tracked-secret filename check was skipped",
    );
  }
  errors.push(...inspectTrackedFiles(trackedFiles));

  const standardsPath = path.join(
    repositoryRoot,
    "docs/development/CODING_STANDARDS.md",
  );
  if (existsSync(standardsPath)) {
    const standards = readFileSync(standardsPath, "utf8");
    if (/apps\/(frontend|backend)/.test(standards)) {
      errors.push(
        "CODING_STANDARDS.md references obsolete apps/frontend or apps/backend paths",
      );
    }
  }

  const teamMemory = path.join(repositoryRoot, ".harness/memory/team");
  for (const file of relativeFiles(teamMemory).filter(
    (item) => !item.endsWith(".example.md"),
  )) {
    errors.push(
      ...inspectMemoryDocument(
        readFileSync(file, "utf8"),
        path.relative(repositoryRoot, file).replaceAll("\\", "/"),
      ),
    );
  }

  return { errors, warnings };
}

function main() {
  const result = auditRepository();
  for (const warning of result.warnings) console.warn(`[warning] ${warning}`);
  for (const error of result.errors) console.error(`[error] ${error}`);
  if (result.errors.length > 0) {
    console.error(
      `Harness audit failed with ${result.errors.length} error(s).`,
    );
    process.exitCode = 1;
    return;
  }
  console.log("Harness audit passed.");
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main();
