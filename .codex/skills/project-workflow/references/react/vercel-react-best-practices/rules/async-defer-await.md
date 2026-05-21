---
title: Defer Await Until Needed
impact: CRITICAL
tags: async, branching, latency
---

## Defer Await Until Needed

Do not await expensive values before knowing they are needed by the selected branch.

**Incorrect: always waits**

```ts
const details = await getDetails(id);
if (!showDetails) return summary;
return details;
```

**Correct: branch first**

```ts
if (!showDetails) return summary;
return getDetails(id);
```

This keeps the fast path fast.
