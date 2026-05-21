# React/Next Rule Selector

Open this file first. Pick at most 2 rule IDs, then open only `rules/<id>.md`.

## Critical

- `async-parallel`: independent async work should start together.
- `async-defer-await`: await only inside branches that need the result.
- `bundle-barrel-imports`: avoid broad barrel imports in client code.
- `bundle-dynamic-imports`: lazy-load heavy client-only UI.

## Common For This Repo

- `rerender-derived-state-no-effect`: derive render values without effects.
- `rerender-memo`: memoize only expensive child boundaries.
- `rerender-no-inline-components`: avoid nested component definitions.
- `js-set-map-lookups`: use `Map`/`Set` for repeated lookups.
