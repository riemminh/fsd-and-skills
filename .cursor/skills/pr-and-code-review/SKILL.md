---
name: pr-and-code-review
description: PR review checklist. Use for reviewing code changes.
priority: low
triggerKeywords: [pr, pull request, review, code review, diff]
---

**🔹 Load:** For PR reviews.

# PR & Code Review

## Checklist

- [ ] Business logic correct (`business-rules`)
- [ ] No scope creep (surgical changes only)
- [ ] Tests pass (if exist)
- [ ] Type-check + lint pass
- [ ] No hardcoded values (use config)
- [ ] No security issues (tokens, sensitive data)
- [ ] Consistent with project conventions

## Pair With

- `agent-coding-discipline` (surgical changes)
- `business-rules` (domain correctness)
- `security-frontend` (security review)
