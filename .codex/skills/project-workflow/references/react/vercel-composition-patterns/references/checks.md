# Composition Rule Selector

Open this file first. Pick at most 2 rule IDs, then open only `rules/<id>.md`.

## Component Architecture

- `architecture-avoid-boolean-props`: prefer composition over boolean mode props.
- `architecture-compound-components`: split complex shared-state UI into compound parts.

## State Management

- `state-context-interface`: expose `state`, `actions`, and `meta` from context.
- `state-decouple-implementation`: keep state implementation inside providers.
- `state-lift-state`: lift state when siblings need to coordinate.

## Implementation Patterns

- `patterns-explicit-variants`: create named variant components instead of mode branches.
- `patterns-children-over-render-props`: prefer children slots over render props.
- `react19-no-forwardref`: React 19 only; skip if project is React 18.
