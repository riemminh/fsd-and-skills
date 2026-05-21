---
title: Dynamic Imports For Heavy Client UI
impact: CRITICAL
tags: bundle, dynamic-import, client
---

## Dynamic Imports For Heavy Client UI

Lazy-load heavy UI that is not needed for the first meaningful view.

**Incorrect: eager heavy import**

```tsx
import { AnalyticsChart } from "./analytics-chart";
```

**Correct: load on demand**

```tsx
import dynamic from "next/dynamic";

const AnalyticsChart = dynamic(() => import("./analytics-chart"));
```

Do not lazy-load tiny components or content required above the fold.
