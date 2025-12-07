# Animation Behavior Fix - Animator Component

## Issue

After the initial refactoring, the `Animator` component examples stopped working correctly. Multiple instances on the same page were not animating as expected.

## Root Cause

The refactored version removed the `hasInitialized` flag, which caused the `$effect` to potentially run multiple times or not trigger animations correctly for each component instance.

## Solution

1. **Restored `hasInitialized` flag** - Ensures each component instance only triggers its animation sequence once on mount
2. **Added `getConfigForIndex()` helper** - Computes animation config for each step in the loop without relying on reactive `$derived` state that may not update synchronously
3. **Proper state management** - Each animation step now explicitly computes its own config

## Technical Details

### Before (Broken)

```javascript
$effect(() => {
  if (action === true && !prefersReducedMotion) {
    startAnimation(); // Could run multiple times
  }
});
```

### After (Fixed)

```javascript
$effect(() => {
  if (!hasInitialized && action === true && !prefersReducedMotion) {
    hasInitialized = true;
    startAnimation(); // Runs exactly once per instance
  }
});
```

## Why This Matters

The `Animator` component is designed for auto-playing animations with precise timing (`hideFor`, `hideEnd`, etc.). Multiple instances on the same page (like in the examples) each need to:

- Start their animation sequence independently
- Respect their individual timing parameters
- Not interfere with other instances

The `hasInitialized` flag ensures each component instance maintains its own initialization state.

## Acceptable Trade-off

The autofixer still suggests this is a "malpractice" because we're setting state in an `$effect`. However, this is one of the acceptable use cases for `$effect`:

- **Initialization logic** that should run exactly once
- **Side effects** that need to happen on mount
- Not all state updates in effects are anti-patterns

## Examples Working Again

All three example pages should now work correctly:

- `Impressed.svelte` - Multiple animations with different timings
- `NorthStar.svelte` - Sequential text animations
- `SvelteAnimate.svelte` - Looping animation showcase

Each `Animator` instance plays its animation independently with proper timing.
