---
name: agent-coding-discipline
description: No guessing, minimal code, surgical diffs, clear verify criteria. For non-trivial tasks.
priority: high
triggerKeywords: [refactor, change, edit, fix, add, implement]
---

**🔹 Load:** Always for non-trivial tasks. Skip for typos/single constant changes.

# Coding Discipline (4 Principles)

## 1. Think First

- Read `prompt-analysis` to extract ALL requirements
- State assumptions; ask if unsure (no guessing)
- Present multiple interpretations if ambiguous
- Suggest simpler approaches
- Create checklist BEFORE coding

## 2. Simplicity

- Code only what's requested (no "just in case")
- No abstractions for single-use code
- Prefer fewer lines if clarity maintained

## 3. Surgical Changes

- Don't "improve" code outside task scope
- Don't refactor working code
- Keep existing style
- Remove only imports/vars made redundant by YOUR change
- **Check:** Every diff line traces to user request

## 4. Goal-Driven

- Define done criteria: "bug reproduces → after fix doesn't reproduce"
- Multiple steps: `step → verify`

## Pair With

- `prompt-analysis` (ALWAYS FIRST)
- `workflows/*` (bug/feature flows)
- `project-conventions` (repo details)
- `business-rules` (domain invariants)
