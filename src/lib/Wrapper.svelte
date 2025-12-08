<script lang="ts">
  import type { Snippet } from 'svelte';
  import type {
    FadeParams,
    BlurParams,
    FlyParams,
    SlideParams,
    ScaleParams,
    DrawParams
  } from 'svelte/transition';
  import { setContext } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type ParamsType = FadeParams | BlurParams | FlyParams | SlideParams | ScaleParams | DrawParams;

  interface Props extends HTMLButtonAttributes {
    children: Snippet;
    pauseDuration?: number;
    event?: 'onmouseenter' | 'onclick';
    params?: ParamsType;
  }

  let {
    children,
    pauseDuration = 300,
    event = 'onmouseenter',
    params = {
      duration: 800,
      delay: 0
    },
    ...restProps
  }: Props = $props();

  // Derived duration calculation
  let animationDuration = $derived.by(() => {
    if (!params?.duration) return 0;
    if (typeof params.duration === 'function') {
      return params.duration(0);
    }
    return params.duration;
  });

  let totalDuration = $derived(animationDuration + pauseDuration);

  let visible = $state(true);
  let shouldAnimate = $state(true);

  // Create a derived context value
  let contextValue = $derived({
    params,
    shouldAnimate,
    visible
  });

  // Set the context with a getter function
  setContext('transition-params', () => contextValue);

  const handleEvent = () => {
    if (!visible) return; // Prevent multiple triggers

    // Step 1: Instantly hide the element
    visible = false;

    // Step 2: Wait for total duration, then show with animation
    setTimeout(() => {
      // Step 3: Enable animation for the reappearance
      shouldAnimate = true;
      // Step 4: Show element, which will trigger the animation
      visible = true;
    }, totalDuration);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleEvent();
    }
  };

  // Initialize visibility on mount
  $effect(() => {
    visible = true;
    shouldAnimate = true;
  });
</script>

{#if event === 'onmouseenter'}
  <button
    {...restProps}
    onmouseenter={handleEvent}
    onkeydown={handleKeyDown}
    aria-label="Animated element trigger"
  >
    <div class="placeholder">
      {@render children()}
    </div>
  </button>
{:else}
  <button
    {...restProps}
    onclick={handleEvent}
    onkeydown={handleKeyDown}
    aria-label="Animated element trigger"
  >
    <div class="placeholder">
      {@render children()}
    </div>
  </button>
{/if}

<style>
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  .placeholder {
    display: inline-block;
    min-width: var(--size, 24px);
    min-height: var(--size, 24px);
  }
</style>
