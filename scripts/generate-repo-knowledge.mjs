import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcRoot = path.join(root, "src");
const outRoot = path.join(root, ".repo-knowledge");

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
const legacyPrefixes = ["components", "contexts", "hooks", "lib", "services", "types"];
const knownFlows = [
  {
    name: "create-order",
    file: ".repo-knowledge/flows/create-order.md",
    triggers: ["create order", "order total", "order form", "stock validation", "order RBAC"],
    primaryFeature: "orders",
  },
];
let prettierPromise;

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativeFromRoot(filePath) {
  return toPosix(path.relative(root, filePath));
}

function walk(dir) {
  if (!existsSync(dir)) return [];

  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry)) continue;
      files.push(...walk(fullPath));
      continue;
    }

    if (stats.isFile() && sourceExtensions.has(path.extname(entry))) {
      files.push(fullPath);
    }
  }

  return files;
}

function read(filePath) {
  return readFileSync(filePath, "utf8");
}

function extractImports(source) {
  const imports = new Set();
  const fromPattern = /import\s+(?:type\s+)?[\s\S]*?\s+from\s+["']([^"']+)["']/g;
  const sideEffectPattern = /import\s+["']([^"']+)["']/g;

  for (const pattern of [fromPattern, sideEffectPattern]) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      imports.add(match[1]);
    }
  }

  return [...imports].sort();
}

function classifyFile(relPath) {
  const parts = relPath.split("/");
  if (parts[0] !== "src") return "other";

  const top = parts[1];
  if (["app", "features", "shared", "core", "config", "data"].includes(top)) return top;
  if (legacyPrefixes.includes(top)) return "legacy";
  return "other";
}

function getFeatureName(relPath) {
  const parts = relPath.split("/");
  if (parts[0] === "src" && parts[1] === "features") return parts[2] ?? null;
  return null;
}

function routeFromPage(relPath) {
  if (/^src\/app\/page\.(tsx|ts|jsx|js)$/.test(relPath)) return "/";

  const routeParts = relPath
    .replace(/^src\/app\//, "")
    .replace(/\/page\.(tsx|ts|jsx|js)$/, "")
    .split("/")
    .filter(Boolean)
    .filter((part) => !part.startsWith("(") || !part.endsWith(")"));

  if (routeParts.length === 0) return "/";
  return `/${routeParts.join("/")}`;
}

function importToFeature(importPath) {
  return importPath.match(/^@\/features\/([^/]+)/)?.[1] ?? null;
}

function isLegacyImport(importPath) {
  return legacyPrefixes.some((prefix) => importPath.startsWith(`@/${prefix}`));
}

function makeRouteMap(files, fileInfoByPath) {
  return files
    .filter(
      (file) =>
        /src\/app\/.*\/page\.(tsx|ts|jsx|js)$/.test(file) ||
        /src\/app\/page\.(tsx|ts|jsx|js)$/.test(file)
    )
    .map((file) => {
      const info = fileInfoByPath.get(file);
      const importedFeatures = info.imports.map(importToFeature).filter(Boolean);

      return {
        route: routeFromPage(file),
        file,
        importedFeatures: [...new Set(importedFeatures)].sort(),
        legacyImports: info.imports.filter(isLegacyImport),
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

function makeFeatureMap(files, fileInfoByPath) {
  const features = new Map();

  for (const file of files) {
    const featureName = getFeatureName(file);
    if (!featureName) continue;

    if (!features.has(featureName)) {
      features.set(featureName, {
        name: featureName,
        root: `src/features/${featureName}`,
        publicApi: existsSync(path.join(srcRoot, "features", featureName, "index.ts"))
          ? `src/features/${featureName}/index.ts`
          : null,
        files: [],
        segments: {},
        importsFeatures: [],
        importsLegacy: [],
        debts: [],
      });
    }

    const feature = features.get(featureName);
    feature.files.push(file);

    const segment = file.split("/")[3]?.includes(".") ? "_root" : (file.split("/")[3] ?? "_root");
    feature.segments[segment] = feature.segments[segment] ?? [];
    feature.segments[segment].push(file);

    const info = fileInfoByPath.get(file);
    for (const importPath of info.imports) {
      const importedFeature = importToFeature(importPath);
      if (importedFeature && importedFeature !== featureName) {
        feature.importsFeatures.push(importedFeature);
        feature.debts.push({
          type: "cross-feature-import",
          file,
          import: importPath,
          note: `Feature "${featureName}" imports "${importedFeature}". Treat as current debt unless the feature boundary is explicitly redesigned.`,
        });
      }

      if (isLegacyImport(importPath)) {
        feature.importsLegacy.push(importPath);
        feature.debts.push({
          type: "legacy-import",
          file,
          import: importPath,
          note: "Uses a legacy top-level folder. Do not copy this pattern for new work.",
        });
      }

      if (
        importedFeature === featureName &&
        !importPath.startsWith(".") &&
        !new RegExp(`^@/features/${featureName}(/index)?$`).test(importPath)
      ) {
        feature.debts.push({
          type: "feature-self-deep-import",
          file,
          import: importPath,
          note: "Inside a feature, prefer relative imports over aliasing back into the same feature.",
        });
      }
    }
  }

  return [...features.values()]
    .map((feature) => ({
      ...feature,
      files: feature.files.sort(),
      segments: Object.fromEntries(
        Object.entries(feature.segments)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([segment, segmentFiles]) => [segment, segmentFiles.sort()])
      ),
      importsFeatures: [...new Set(feature.importsFeatures)].sort(),
      importsLegacy: [...new Set(feature.importsLegacy)].sort(),
      debts: feature.debts.sort((a, b) =>
        `${a.type}:${a.file}`.localeCompare(`${b.type}:${b.file}`)
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function layerCounts(files) {
  return files.reduce((counts, file) => {
    const layer = classifyFile(file);
    counts[layer] = (counts[layer] ?? 0) + 1;
    return counts;
  }, {});
}

function routeOwners(routes) {
  return routes
    .map((route) => {
      const owners = route.importedFeatures.length
        ? route.importedFeatures.map((name) => `\`${name}\``).join(", ")
        : "none";
      const debt = route.legacyImports.length ? " legacy-imports" : "";
      return `- \`${route.route}\` -> \`${route.file}\` | features: ${owners}${debt}`;
    })
    .join("\n");
}

function makeAgentMap(files, routes, features) {
  const counts = layerCounts(files);
  const legacyCount = files.filter((file) => classifyFile(file) === "legacy").length;
  const debtCount = features.reduce((sum, feature) => sum + feature.debts.length, 0);

  return `# Agent Map

Generated by \`pnpm repo:index\`. Read this first, then open only the linked feature or flow file.

## How To Route A Prompt

1. If the prompt matches a flow trigger, open that flow file.
2. If the prompt names a route, use the route ownership table below.
3. If the prompt names a domain noun, open \`.repo-knowledge/features/<feature>.md\`.
4. If a cache note conflicts with source code, source code wins; inspect the referenced file before editing.

## Flow Triggers

${knownFlows
  .map(
    (flow) =>
      `- \`${flow.name}\` (${flow.triggers.map((trigger) => `\`${trigger}\``).join(", ")}) -> \`${flow.file}\``
  )
  .join("\n")}

## Feature Lookup

${features
  .map((feature) => {
    const imports = feature.importsFeatures.length
      ? feature.importsFeatures.map((name) => `\`${name}\``).join(", ")
      : "none";
    const debt = feature.debts.length ? `; debt notes: ${feature.debts.length}` : "";
    return `- \`${feature.name}\` -> \`.repo-knowledge/features/${feature.name}.md\`; root: \`${feature.root}\`; imports features: ${imports}${debt}`;
  })
  .join("\n")}

## Route Ownership

${routeOwners(routes)}

## Repo Shape

- Source files indexed: ${files.length}
- Features indexed: ${features.length}
- Legacy source files: ${legacyCount}
- Architecture debt notes: ${debtCount}

${Object.entries(counts)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([layer, count]) => `- \`${layer}\`: ${count}`)
  .join("\n")}

## Agent Guardrails

- Prefer feature public APIs from \`src/features/<feature>/index.ts\` when importing from outside a feature.
- Prefer relative imports inside the same feature.
- Treat cross-feature imports and legacy imports as existing migration debt, not as examples for new code.
- Keep route files thin: route -> feature component/hook -> API/schema/utils.
`;
}

function makeFeatureIndex(features) {
  return `# Features

Generated by \`pnpm repo:index\`.

${features
  .map(
    (feature) =>
      `- \`${feature.name}\`: \`.repo-knowledge/features/${feature.name}.md\` (${feature.files.length} files)`
  )
  .join("\n")}
`;
}

function pickFirstMatching(files, patterns) {
  for (const pattern of patterns) {
    const found = files.find((file) => pattern.test(file));
    if (found) return found;
  }

  return null;
}

function makeReadFirst(feature) {
  const files = feature.files;
  const singular = feature.name.endsWith("s") ? feature.name.slice(0, -1) : feature.name;
  const pascal = singular.charAt(0).toUpperCase() + singular.slice(1);
  const candidates = [
    feature.publicApi,
    pickFirstMatching(files, [/\/types\/index\.ts$/]),
    pickFirstMatching(files, [/\/schemas\/.*\.schema\.ts$/]),
    pickFirstMatching(files, [
      new RegExp(`/api/${feature.name}\\.api\\.ts$`),
      /\/api\/[^/]+\.api\.ts$/,
    ]),
    pickFirstMatching(files, [
      new RegExp(`/hooks/use-${feature.name}\\.ts$`),
      new RegExp(`/hooks/use-${singular}s\\.ts$`),
      /\/hooks\/use-[^/]+\.ts$/,
    ]),
    pickFirstMatching(files, [
      new RegExp(`/components/${pascal}List\\.tsx$`),
      new RegExp(`/components/${pascal}Form\\.tsx$`),
      /\/components\/[^/]+-list\.tsx$/,
      /\/components\/[^/]+\.tsx$/,
    ]),
    pickFirstMatching(files, [/\/utils\/(?!index\.ts$)[^/]+\.ts$/]),
  ];

  return [...new Set(candidates.filter(Boolean))].slice(0, 8);
}

function makeFeatureDoc(feature, routes) {
  const owningRoutes = routes.filter((route) => route.importedFeatures.includes(feature.name));
  const segmentLines = Object.entries(feature.segments)
    .map(([segment, files]) => `- \`${segment}\`: ${files.length} files`)
    .join("\n");
  const readFirst = makeReadFirst(feature);
  const debtsByType = feature.debts.reduce((groups, debt) => {
    groups[debt.type] = groups[debt.type] ?? [];
    groups[debt.type].push(debt);
    return groups;
  }, {});

  return `# Feature: ${feature.name}

Root: \`${feature.root}\`  
Public API: ${feature.publicApi ? `\`${feature.publicApi}\`` : "none"}

## When To Open This

- Prompt mentions \`${feature.name}\`.
- Route ownership table in \`.repo-knowledge/AGENT_MAP.md\` points here.
- A flow file lists this feature as related context.

## Read First

${readFirst.map((file) => `- \`${file}\``).join("\n") || "- none"}

## Segments

${segmentLines || "- none"}

## Routes Using This Feature

${owningRoutes.map((route) => `- \`${route.route}\` -> \`${route.file}\``).join("\n") || "- none"}

## External Feature Imports

${
  feature.importsFeatures.length
    ? feature.importsFeatures.map((name) => `- \`${name}\``).join("\n")
    : "- none"
}

## Architecture Debt Notes

These replace the old \`violations.json\`. They exist so agents know which current imports are migration debt and should not be copied into new work.

${
  Object.keys(debtsByType).length
    ? Object.entries(debtsByType)
        .map(([type, debts]) => {
          const examples = debts
            .slice(0, 8)
            .map((debt) => `  - \`${debt.file}\` imports \`${debt.import}\``)
            .join("\n");
          const extra = debts.length > 8 ? `\n  - ...${debts.length - 8} more` : "";
          return `- \`${type}\`: ${debts.length}\n${examples}${extra}`;
        })
        .join("\n")
    : "- none"
}

## Import Guidance

- Outside this feature, import from ${feature.publicApi ? `\`${feature.publicApi}\`` : "the feature public API when it exists"}.
- Inside this feature, prefer relative imports.
- Do not add new legacy imports from \`@/components\`, \`@/hooks\`, \`@/services\`, \`@/types\`, or \`@/lib\`.
`;
}

function makeCreateOrderFlow(fileInfoByPath) {
  const flowFiles = [
    "src/app/orders/create/page.tsx",
    "src/features/orders/hooks/use-orders.ts",
    "src/features/orders/api/orders.api.ts",
    "src/features/orders/schemas/create-order.schema.ts",
    "src/features/orders/types/index.ts",
    "src/features/orders/utils/order-calculations.ts",
    "src/features/orders/components/customer-combobox.tsx",
    "src/features/orders/components/order-items-field.tsx",
    "src/features/orders/components/product-combobox.tsx",
    "src/features/customers/hooks/use-customers.ts",
    "src/features/products/hooks/use-products.ts",
  ].filter((file) => fileInfoByPath.has(file));

  return `# Flow: Create Order

Generated by \`pnpm repo:index\`.

## Trigger Prompts

- create order
- order total
- order form
- customer/product combobox
- stock validation
- order RBAC

## Entry

- Route: \`/orders/create\`
- File: \`src/app/orders/create/page.tsx\`
- Primary feature: \`.repo-knowledge/features/orders.md\`
- Related features: \`.repo-knowledge/features/customers.md\`, \`.repo-knowledge/features/products.md\`, \`.repo-knowledge/features/auth.md\`

## Read First

${flowFiles.map((file) => `- \`${file}\``).join("\n")}

## Current Flow

1. Route checks auth/RBAC, initializes React Hook Form, and submits through \`useCreateOrder\`.
2. \`useCreateOrder\` calls \`ordersApi.createNewOrder\` and invalidates order queries.
3. \`ordersApi.createNewOrder\` delegates to \`ordersApi.createOrder\`.
4. Customer/product selection currently reaches into \`customers\` and \`products\`; treat that as current architecture debt.
5. Money fields should be derived through \`order-calculations.ts\`.

## Guardrails

- Prefer \`src/features/orders/schemas/create-order.schema.ts\` over legacy \`src/types/form.ts\` for new create-order work.
- New order money must keep \`items[].subtotal\`, \`subtotal\`, \`tax\`, \`shipping\`, and \`total\` consistent.
- Do not introduce new legacy imports while touching this flow.
`;
}

async function format(content, parser) {
  try {
    prettierPromise ??= import("prettier");
    const prettier = await prettierPromise;
    return prettier.format(content, { parser });
  } catch {
    return content;
  }
}

async function writeMarkdown(filePath, content) {
  writeFileSync(filePath, await format(content, "markdown"));
}

async function main() {
  const absoluteFiles = walk(srcRoot).sort();
  const files = absoluteFiles.map(relativeFromRoot);
  const fileInfoByPath = new Map();

  for (const absoluteFile of absoluteFiles) {
    const relPath = relativeFromRoot(absoluteFile);
    const source = read(absoluteFile);

    fileInfoByPath.set(relPath, {
      file: relPath,
      layer: classifyFile(relPath),
      feature: getFeatureName(relPath),
      imports: extractImports(source),
    });
  }

  rmSync(outRoot, { recursive: true, force: true });
  mkdirSync(path.join(outRoot, "features"), { recursive: true });
  mkdirSync(path.join(outRoot, "flows"), { recursive: true });

  const routes = makeRouteMap(files, fileInfoByPath);
  const features = makeFeatureMap(files, fileInfoByPath);

  await writeMarkdown(path.join(outRoot, "AGENT_MAP.md"), makeAgentMap(files, routes, features));
  await writeMarkdown(path.join(outRoot, "features", "README.md"), makeFeatureIndex(features));
  for (const feature of features) {
    await writeMarkdown(
      path.join(outRoot, "features", `${feature.name}.md`),
      makeFeatureDoc(feature, routes)
    );
  }
  await writeMarkdown(
    path.join(outRoot, "flows", "create-order.md"),
    makeCreateOrderFlow(fileInfoByPath)
  );

  console.log(`Indexed ${files.length} source files.`);
  console.log(`Wrote compact markdown cache to ${path.relative(root, outRoot)}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
