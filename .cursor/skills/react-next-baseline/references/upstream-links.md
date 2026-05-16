# Sync Vercel baseline

## Vendored copy in repo

Full upstream skill is copied to:

**`../../references/react-best-practices/`**

Includes: `SKILL.md`, `README.md`, `metadata.json`, **`rules/`** (per-rule `.md` files).

**Agents in order-management:** for perf/React tasks, **do not** bulk-read all of vendor. Standard flow: [vercel-SKILL-excerpt.md](vercel-SKILL-excerpt.md) → open only **`../../references/react-best-practices/rules/<rule>.md`** as needed (1–3 files). Prefer reading local **individual rule files** instead of opening the same content on GitHub.

## Origin (for future updates)

- Repo: https://github.com/vercel-labs/agent-skills
- Folder: `skills/react-best-practices/`
- Upstream skill name (frontmatter): `vercel-react-best-practices`

## Refresh vendor when Vercel changes

**Option A — Zip (same as initial copy):**

```bash
cd .cursor/references
curl -fsSL "https://codeload.github.com/vercel-labs/agent-skills/zip/refs/heads/main" -o .upstream.zip
unzip -q -o .upstream.zip "agent-skills-main/skills/react-best-practices/*" -d .upstream-extract
rm -rf react-best-practices
mkdir -p react-best-practices && cp -R .upstream-extract/agent-skills-main/skills/react-best-practices/* react-best-practices/
rm -rf .upstream-extract .upstream.zip
```

**Option B — CLI:** `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices` (may create a parallel folder; merge manually into `react-best-practices/` if needed).

## After updating vendor

Re-sync the **"Index of files in `../../references/react-best-practices/rules/`"** section in [`vercel-SKILL-excerpt.md`](vercel-SKILL-excerpt.md) with the actual files in `../../references/react-best-practices/rules/` (so agents do not pick non-existent rules).

## Reference URLs (when not using vendor)

| File     | URL                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------- |
| SKILL.md | https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md |
| Rules    | https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules              |

Keep the URL table for quick checks or work outside the repo.
