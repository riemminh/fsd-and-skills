---
title: Avoid Broad Barrel Imports
impact: CRITICAL
tags: bundle, imports, client
---

## Avoid Broad Barrel Imports

In client-heavy code, avoid importing a large barrel when a direct import exists.

**Incorrect: broad import**

```ts
import { HeavyChart } from "@/features/dashboard";
```

**Correct: direct import**

```ts
import { HeavyChart } from "@/features/dashboard/components/heavy-chart";
```

Keep this within local project conventions; do not break public API boundaries without cause.
