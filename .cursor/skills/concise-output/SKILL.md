---
name: concise-output
description: Minimize verbose explanations. Show code changes only. Brief summaries.
priority: high
triggerKeywords: [all]
---

**🔹 Load:** Always. Controls output style for all tasks.

# Concise Output

## Core Rule

**Show, don't tell.** Code speaks louder than explanations.

## Format

### ✅ DO

1. Make changes directly
2. Show only modified code blocks
3. One-line summary at end
4. Skip step-by-step narration

### ❌ DON'T

- Long introductions
- Step-by-step explanations ("Bước 1, Bước 2...")
- Repeat requirements analysis
- Verbose summaries with checkmarks/tables

## Structure

```
[Make file changes silently]
[Show only key code snippets if needed]
Done: [one sentence summary]
```

## When to Be Verbose

Only explain when:

- User explicitly asks "why" or "how"
- Complex architectural decision
- Breaking changes
- Security implications

## Pair With

Works with ALL workflows. Controls output style, not logic.
