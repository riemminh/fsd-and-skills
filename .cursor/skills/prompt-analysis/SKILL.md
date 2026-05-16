---
name: prompt-analysis
description: Parse prompt into requirements. Highlight keywords, identify patterns, check compounds. Use BEFORE coding.
priority: high
triggerKeywords: [all]
---

**🔹 Load:** ALWAYS FIRST before coding any non-trivial task.

# Prompt Analysis (3 Steps)

## Step 1: Highlight Keywords

| Type           | Look For                                                                     |
| -------------- | ---------------------------------------------------------------------------- |
| **UI**         | add, button, field, input, textarea, disabled, tooltip, readonly, hide, show |
| **Permission** | admin, manager, viewer, user, can, cannot, only, role                        |
| **Condition**  | when, if, status, state, or, and, then                                       |
| **Action**     | save, update, delete, call, API, toast, refetch, loading, close              |

## Step 2: Match Patterns

| Pattern                 | Examples                                           |
| ----------------------- | -------------------------------------------------- |
| **Add UI**              | "add [element]", "thêm [element]"                  |
| **Role Permission**     | "[role] can [action]", "[role] cannot [action]"    |
| **Conditional Show**    | "when [condition] show [element]"                  |
| **Conditional Disable** | "when [condition] disable [element]"               |
| **Status Check**        | "status is [value]", "status [value1] or [value2]" |
| **Action Sequence**     | "after [action1], [action2]"                       |
| **Multiple Conditions** | "[value1] or [value2]", "[value1] and [value2]"    |

## Step 3: Check Compounds

**CRITICAL:** "X + Y" or "X and Y" = implement BOTH X and Y separately!

Look for:

- "disabled + tooltip"
- "toast + refetch"
- "save and close"
- Any "X + Y" or "X and Y" pattern

## Application

1. Read prompt → Highlight keywords
2. Match patterns
3. Find compounds → List both X and Y
4. Create checklist → ALL requirements
5. Code from checklist

## Example

**Prompt:** "Add Export button. Admin can export; viewer cannot. Show loading when exporting. After export, toast + refetch."

**Keywords:** UI (Export button, loading), Permission (admin, viewer), Action (export, toast, refetch), Compound (toast + refetch)

**Checklist:**

- [ ] Export button
- [ ] Permission: admin only
- [ ] Loading state
- [ ] Toast after export
- [ ] Refetch after export

## Common Mistakes

❌ Miss compound: "X + Y" → only do X
❌ Skip implicit: "viewer only view" → forget to hide edit buttons
❌ Incomplete condition: "A or B" → only check A
