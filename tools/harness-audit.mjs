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
  ".harness/skills/provenance.json",
  ".harness/delivery-models.json",
  "THIRD_PARTY_NOTICES.md",
  "docs/product/profiles/README.md",
  "docs/architecture/AGENTIC_SYSTEM.md",
  "docs/tasks/TEMPLATE.md",
];

const DELIVERY_MODEL_IDS = [
  "traditional",
  "saas",
  "service-as-software",
  "hybrid",
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

export function inspectTaskTemplate(contents) {
  const findings = [];
  const requiredSections = [
    "## Acceptance criteria",
    "## Change map",
    "## Tasks",
    "## Traceability",
    "## Security and operational considerations",
    "## Verification",
  ];
  for (const section of requiredSections) {
    if (!contents.includes(section))
      findings.push(`task template: missing '${section}'`);
  }
  if (!contents.includes("| Criterion | Task | Evidence |"))
    findings.push("task template: missing criterion-to-evidence mapping");
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

export function inspectDeliveryModels(manifest, documentExists = () => true) {
  const findings = [];
  if (manifest.schemaVersion !== 1)
    findings.push("delivery models: unsupported schemaVersion");
  if (!Array.isArray(manifest.profiles))
    return [...findings, "delivery models: profiles must be an array"];

  const ids = manifest.profiles.map((profile) => profile.id);
  for (const id of DELIVERY_MODEL_IDS) {
    if (!ids.includes(id))
      findings.push(`delivery models: missing profile '${id}'`);
  }
  for (const id of new Set(ids)) {
    if (ids.filter((candidate) => candidate === id).length > 1)
      findings.push(`delivery models: duplicate profile '${id}'`);
  }
  if (!ids.includes(manifest.default))
    findings.push("delivery models: default must reference a profile");

  for (const profile of manifest.profiles) {
    const document = profile.document || "";
    if (
      typeof document !== "string" ||
      !document.startsWith("docs/product/profiles/") ||
      !document.endsWith(".md") ||
      document.includes("..")
    ) {
      findings.push(`delivery models: invalid document for '${profile.id}'`);
    } else if (!documentExists(document)) {
      findings.push(`delivery models: missing document '${document}'`);
    }
    if (!Array.isArray(profile.extends)) {
      findings.push(
        `delivery models: extends must be an array for '${profile.id}'`,
      );
    } else {
      for (const parent of profile.extends) {
        if (!ids.includes(parent))
          findings.push(
            `delivery models: '${profile.id}' extends unknown profile '${parent}'`,
          );
      }
    }
  }

  const hybrid = manifest.profiles.find((profile) => profile.id === "hybrid");
  if (
    hybrid &&
    (!hybrid.extends?.includes("saas") ||
      !hybrid.extends?.includes("service-as-software"))
  ) {
    findings.push(
      "delivery models: hybrid must extend saas and service-as-software",
    );
  }
  return findings;
}

export function inspectSkillDocument(contents, expectedName, filename) {
  const findings = [];
  const frontmatter = contents.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) return [`${filename}: missing YAML frontmatter`];

  const fields = Object.fromEntries(
    frontmatter[1]
      .split("\n")
      .map((line) => line.match(/^([a-z-]+):\s*(.+)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2]]),
  );
  if (fields.name !== expectedName)
    findings.push(`${filename}: name must match directory '${expectedName}'`);
  if (!fields.description)
    findings.push(`${filename}: missing non-empty description`);
  return findings;
}

export function inspectSkillMetadata(contents, expectedName, filename) {
  const findings = [];
  const displayName = contents.match(/^\s{2}display_name:\s+"([^"]+)"$/m)?.[1];
  const shortDescription = contents.match(
    /^\s{2}short_description:\s+"([^"]+)"$/m,
  )?.[1];
  const defaultPrompt = contents.match(
    /^\s{2}default_prompt:\s+"([^"]+)"$/m,
  )?.[1];

  if (!displayName) findings.push(`${filename}: missing quoted display_name`);
  if (
    !shortDescription ||
    shortDescription.length < 25 ||
    shortDescription.length > 64
  )
    findings.push(
      `${filename}: short_description must contain 25-64 characters`,
    );
  if (!defaultPrompt?.includes(`$${expectedName}`))
    findings.push(
      `${filename}: default_prompt must reference $${expectedName}`,
    );
  return findings;
}

export function inspectSkillProvenance(manifest, skillExists = () => true) {
  const findings = [];
  if (manifest.schemaVersion !== 1)
    findings.push("skill provenance: unsupported schemaVersion");
  if (!Array.isArray(manifest.sources) || manifest.sources.length === 0)
    return [...findings, "skill provenance: sources must be a non-empty array"];

  for (const source of manifest.sources) {
    const label = source.id || "unnamed source";
    if (
      !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(source.repository || "")
    )
      findings.push(
        `${label}: repository must be a canonical HTTPS GitHub URL`,
      );
    if (!/^[a-f0-9]{40}$/.test(source.revision || ""))
      findings.push(
        `${label}: revision must be a full 40-character commit SHA`,
      );
    if (!source.license) findings.push(`${label}: license is required`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.reviewedAt || ""))
      findings.push(`${label}: reviewedAt must be an ISO date`);
    if (source.adaptation !== "rewritten")
      findings.push(`${label}: adaptation must declare 'rewritten'`);
    if (!Array.isArray(source.influences) || source.influences.length === 0) {
      findings.push(`${label}: influences must be a non-empty array`);
      continue;
    }
    for (const influence of source.influences) {
      if (!/^[a-z0-9-]+$/.test(influence.localSkill || "")) {
        findings.push(
          `${label}: invalid localSkill '${influence.localSkill || ""}'`,
        );
      } else if (!skillExists(influence.localSkill)) {
        findings.push(
          `${label}: local skill is missing: ${influence.localSkill}`,
        );
      }
      if (
        typeof influence.upstreamPath !== "string" ||
        !influence.upstreamPath.startsWith("skills/") ||
        influence.upstreamPath.includes("..")
      )
        findings.push(
          `${label}: invalid upstreamPath for ${
            influence.localSkill || "unknown skill"
          }`,
        );
    }
  }
  return findings;
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

  const taskTemplatePath = path.join(repositoryRoot, "docs/tasks/TEMPLATE.md");
  if (existsSync(taskTemplatePath)) {
    errors.push(...inspectTaskTemplate(readFileSync(taskTemplatePath, "utf8")));
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

  const skillsRoot = path.join(repositoryRoot, ".codex/skills");
  if (existsSync(skillsRoot)) {
    for (const entry of readdirSync(skillsRoot, { withFileTypes: true }).filter(
      (item) => item.isDirectory(),
    )) {
      const skillPath = path.join(skillsRoot, entry.name, "SKILL.md");
      const metadataPath = path.join(
        skillsRoot,
        entry.name,
        "agents/openai.yaml",
      );
      if (!existsSync(skillPath)) {
        errors.push(`skill is missing SKILL.md: ${entry.name}`);
        continue;
      }
      errors.push(
        ...inspectSkillDocument(
          readFileSync(skillPath, "utf8"),
          entry.name,
          `.codex/skills/${entry.name}/SKILL.md`,
        ),
      );
      if (!existsSync(metadataPath))
        errors.push(`skill is missing agents/openai.yaml: ${entry.name}`);
      else
        errors.push(
          ...inspectSkillMetadata(
            readFileSync(metadataPath, "utf8"),
            entry.name,
            `.codex/skills/${entry.name}/agents/openai.yaml`,
          ),
        );
    }
  }

  const provenancePath = path.join(
    repositoryRoot,
    ".harness/skills/provenance.json",
  );
  if (existsSync(provenancePath)) {
    try {
      const manifest = JSON.parse(readFileSync(provenancePath, "utf8"));
      errors.push(
        ...inspectSkillProvenance(manifest, (skill) =>
          existsSync(path.join(skillsRoot, skill, "SKILL.md")),
        ),
      );
    } catch {
      errors.push("skill provenance: invalid JSON");
    }
  }

  const deliveryModelsPath = path.join(
    repositoryRoot,
    ".harness/delivery-models.json",
  );
  if (existsSync(deliveryModelsPath)) {
    try {
      const manifest = JSON.parse(readFileSync(deliveryModelsPath, "utf8"));
      errors.push(
        ...inspectDeliveryModels(manifest, (document) =>
          existsSync(path.join(repositoryRoot, document)),
        ),
      );
    } catch {
      errors.push("delivery models: invalid JSON");
    }
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
