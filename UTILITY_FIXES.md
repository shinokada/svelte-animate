# Utility Components Runes Fixes

## Overview

Fixed Svelte 5 runes warnings in utility components that were capturing initial prop values instead of reactive references.

## Fixed Components

### 1. DynamicCodeBlockHighlight.svelte

**Warning:**

```
This reference only captures the initial value of `replaceLib` and `code`.
Did you mean to reference it inside a closure instead?
```

**Issue:**
Props were being used in top-level code execution which only captured their initial values:

```javascript
// ❌ Before - captures initial value only
let { code, replaceLib, ... }: Props = $props();

if (replaceLib) {
  code = replaceLibImport(code); // Trying to mutate prop
}

$effect(() => {
  if (replaceLib) {
    code = replaceLibImport(code); // Also problematic
  }
});
```

**Fix:**
Used `$derived` to create a reactive computed value:

```javascript
// ✅ After - reactive and clean
let {
  code: rawCode,  // Rename prop
  replaceLib,
  ...
}: Props = $props();

// Derived value that updates when props change
let code = $derived(replaceLib ? replaceLibImport(rawCode) : rawCode);
```

**Benefits:**

- ✅ Reactive - updates when props change
- ✅ No prop mutation - keeps props immutable
- ✅ Clean - single source of truth
- ✅ Efficient - only recomputes when dependencies change

---

### 2. CodeWrapper.svelte

**Warning:**

```
This reference only captures the initial value of `children`.
Did you mean to reference it inside a closure instead?
```

**Issue:**
Prop was used in top-level variable assignment:

```javascript
// ❌ Before - captures initial value only
let { children, ... }: Props = $props();
const codeCls = children ? 'border-t border-gray-600' : '';
```

If `children` prop changes later, `codeCls` would still have the old value.

**Fix:**
Used `$derived` for reactive computation:

```javascript
// ✅ After - reactive
let { children, ... }: Props = $props();
const codeCls = $derived(children ? 'border-t border-gray-600' : '');
```

**Benefits:**

- ✅ Reactive - updates when `children` prop changes
- ✅ Simple - minimal code change
- ✅ Efficient - Svelte optimizes derived values

---

## The Pattern: Props in Top-Level Code

### ❌ Anti-pattern

```javascript
let { someProp }: Props = $props();
const computed = someProp ? 'value-a' : 'value-b'; // ⚠️ Only initial value
```

### ✅ Correct Pattern

```javascript
let { someProp }: Props = $props();
const computed = $derived(someProp ? 'value-a' : 'value-b'); // ✅ Reactive
```

## Why This Matters

In Svelte 5 with runes:

- Props are reactive references, not static values
- Top-level code runs once during component initialization
- To make computed values reactive, use `$derived`
- This ensures the UI updates when props change

## Verification

Both components verified with `svelte:svelte-autofixer`:

- ✅ No issues
- ✅ No suggestions
- ✅ Clean runes implementation

## Testing

The warnings should no longer appear when running:

```bash
pnpm test:e2e
```

All functionality remains the same - these were internal implementation fixes that don't affect the component API or behavior.
