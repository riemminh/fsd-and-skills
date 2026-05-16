---
name: workflows
description: Workflow router - bug vs feature vs tiny change. Use decision tree to pick workflow.
priority: high
triggerKeywords: [bug, fix, add, create, feature, implement, edit, change]
---

**🔹 Load:** FIRST to choose workflow based on prompt keywords.

# Workflows (Router)

## Decision Tree

### 1. Is it a bug? → `fix-bug-default`

**Keywords:** bug, fix, wrong, broken, error, crash, issue, regression, not working, incorrect, unexpected, fails, defect, hotfix, patch (behavior), used to work, stopped working

**Examples:**

- "Fix sort order bug"
- "Cancel button not working"
- "Wrong total calculation"

### 2. Is it a feature? → `feature-shipping`

**Keywords:** add, create, new, implement, extend, remove, delete, update, edit, modify, feature, ship, build, column, button, page, route, filter, dialog, form
