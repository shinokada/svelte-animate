<script lang="ts">
  import 'animate.css';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { AnimationType } from './types.ts';

  type TriggerType = 'hover' | 'click' | 'both' | undefined;
  type DurationType = '1s' | '2s' | '3s' | '800ms' | '500ms';
  type DelayType = '0s' | '1s' | '2s' | '3s' | '4s' | '5s';
  type RepeatType = '1' | '2' | '3' | 'infinite';
  interface Props extends HTMLButtonAttributes {
    animation?: AnimationType;
    trigger?: TriggerType;
    duration?: DurationType;
    children: Snippet;
    hideAfter?: boolean;
    delay?: DelayType;
    repeat?: RepeatType;
  }

  // Derived state for reduced motion preference (SSR-safe)
  let prefersReducedMotion = $derived(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  let isAnimating = $state(false);
  let announcement = $state('');

  let {
    children,
    animation = 'bounce',
    trigger,
    duration = '1s',
    hideAfter = false,
    delay,
    repeat
  }: Props = $props();

  let animationClass = $state('animate__animated');
  let isVisible = $state(true);

  function getAnimationClasses() {
    const classes = [`animate__animated`, `animate__${animation}`];

    if (delay) {
      classes.push(`animate__delay-${delay}`);
    }

    if (repeat) {
      switch (repeat) {
        case '1':
          classes.push('animate__repeat-1');
          break;
        case '2':
          classes.push('animate__repeat-2');
          break;
        case '3':
          classes.push('animate__repeat-3');
          break;
        case 'infinite':
          classes.push('animate__infinite');
          break;
      }
    }

    return classes.join(' ');
  }

  async function startAnimation() {
    // Don't start if animation is already in progress or reduced motion is preferred
    if (isAnimating || prefersReducedMotion) return;

    // Reset visibility if previously hidden
    isVisible = true;
    // Set animation lock
    isAnimating = true;
    // Remove animation classes
    animationClass = '';
    // Force a browser reflow
    await new Promise((resolve) => requestAnimationFrame(resolve));
    // Add animation classes back
    animationClass = getAnimationClasses();
  }

  function onAnimationEnd() {
    if (hideAfter) {
      isVisible = false;
    }
    animationClass = 'animate__animated';
    // Release animation lock
    isAnimating = false;

    // Set announcement for screen readers
    announcement = `${animation} animation complete`;
  }

  function handleClick() {
    if (trigger === 'click' || trigger === 'both') {
      startAnimation();
    }
  }

  function handleMouseEnter() {
    if (trigger === 'hover' || trigger === 'both') {
      startAnimation();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (trigger === 'click' || trigger === 'both') {
        startAnimation();
      }
    } else if (event.key === 'Escape' && isAnimating) {
      // Allow stopping animation with Escape key
      isAnimating = false;
      animationClass = 'animate__animated';
    }
  }

  // Clear announcement after delay
  $effect(() => {
    if (announcement) {
      const timer = setTimeout(() => {
        announcement = '';
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
</script>

{#if prefersReducedMotion}
  {@render children()}
{:else if trigger}
  <button
    type="button"
    aria-label={`Animate child element with ${animation} effect`}
    aria-live="polite"
    class={animationClass}
    style="display: {isVisible
      ? 'inline-block'
      : 'none'}; animation-duration: {duration}; background: none; border: none; padding: 0; cursor: pointer;"
    onclick={handleClick}
    onmouseenter={handleMouseEnter}
    onkeydown={handleKeyDown}
    onanimationend={onAnimationEnd}
  >
    {@render children()}
  </button>
{:else}
  <span
    aria-label={`Animate child element with ${animation} effect`}
    aria-live="polite"
    class={getAnimationClasses()}
    style="display: {isVisible ? 'inline-block' : 'none'}; animation-duration: {duration};"
  >
    {@render children()}
  </span>
{/if}

{#if announcement}
  <div role="status" aria-live="polite" class="sr-only">
    <p>{announcement}</p>
  </div>
{/if}

<!--
@component
[Go to docs](https://svelte-animate.codewithshin.com/)
## Props
@prop children
@prop animation = 'bounce'
@prop trigger
@prop duration = '1s'
@prop hideAfter = false
@prop delay
@prop repeat
-->

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
