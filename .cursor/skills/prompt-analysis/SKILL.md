---
name: prompt-analysis
description: Parse any prompt into requirements. Highlight keywords by type, identify patterns, check compounds. Use BEFORE coding.
---

# Prompt Analysis

## 3-Step Process

### Step 1: Highlight Keywords by Type

Scan prompt and categorize keywords:

| Type           | Look for                                                                     |
| -------------- | ---------------------------------------------------------------------------- |
| **UI**         | add, button, field, input, textarea, disabled, tooltip, readonly, hide, show |
| **Permission** | admin, manager, viewer, user, can, cannot, only, role                        |
| **Condition**  | when, if, status, state, or, and, then                                       |
| **Action**     | save, update, delete, call, API, toast, refetch, loading, close              |

### Step 2: Identify Patterns

Match highlighted keywords to these patterns:

| Pattern Type            | Examples                                           |
| ----------------------- | -------------------------------------------------- |
| **Add UI**              | "add [element]", "thêm [element]"                  |
| **Role Permission**     | "[role] can [action]", "[role] cannot [action]"    |
| **Conditional Show**    | "when [condition] show [element]"                  |
| **Conditional Disable** | "when [condition] disable [element]"               |
| **Status Check**        | "status is [value]", "status [value1] or [value2]" |
| **Action Sequence**     | "after [action1], [action2]"                       |
| **Multiple Conditions** | "[value1] or [value2]", "[value1] and [value2]"    |

### Step 3: Check Compound Keywords

**CRITICAL**: "X + Y" or "X and Y" = implement BOTH X and Y separately!

Look for:

- "disabled + tooltip"
- "toast + refetch"
- "save and close"
- "[action1] và [action2]"
- Any "X + Y" or "X and Y" pattern

---

## Application Steps

For any prompt:

1. **Read prompt** → Highlight keywords by type (UI, Permission, Condition, Action)
2. **Match patterns** → Identify which patterns apply
3. **Find compounds** → Look for "X + Y", list both X and Y separately
4. **Create checklist** → Write down ALL requirements found
5. **Code from checklist** → Implement each item

---

## Example: Quick Analysis

**Prompt**: "Add Export button. Admin can export; viewer cannot. Show loading when exporting. After export, toast + refetch."

**Step 1 - Keywords**:

- UI: Export button, loading
- Permission: Admin can, viewer cannot
- Action: export, toast, refetch
- Compound: "toast + refetch"

**Step 2 - Patterns**:

- Add UI: Export button
- Role Permission: admin can, viewer cannot
- Action Sequence: after export → toast + refetch

**Step 3 - Compounds**:

- "toast + refetch" = 2 things: toast AND refetch

**Checklist**:

- [ ] Export button
- [ ] Permission: admin only
- [ ] Loading state when exporting
- [ ] Toast after export
- [ ] Refetch after export

---

## Common Patterns Quick Ref

```
Role-based:
  "[role1] and [role2] can X" → both roles allowed
  "[role] only view" → read-only for that role

Conditional:
  "when X show Y" → conditional render
  "when X disable Y" → conditional disable
  "X or Y" → multiple conditions

Compound (CRITICAL):
  "X + Y" → implement BOTH X and Y
  "X and Y" → implement BOTH X and Y
  "X, Y" → implement BOTH X and Y

Action sequence:
  "after X, Y" → X then Y
  "when X then Y" → if X then Y
```

---

## Common Mistakes

❌ Miss compound: "X + Y" → only do X
❌ Skip implicit: "viewer only view" → forget to hide edit buttons
❌ Incomplete condition: "A or B" → only check A
❌ Wrong refetch: use callback instead of invalidateQueries

---

## Quick Ref

```
BEFORE coding:
1. Highlight: UI, Permission, Condition, Action
2. Match patterns
3. Find compounds (X + Y = BOTH!)
4. Checklist
5. Code
```
