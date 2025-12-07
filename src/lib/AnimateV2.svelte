<script lang="ts">
  import 'animate.css';
  import type { EnhancedAnimationProps as Props, AnimationType } from './types.ts';

  // Derived state for reduced motion preference (SSR-safe)
  let prefersReducedMotion = $derived(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  let isAnimating = $state(false);
  let currentAnimationIndex = $state(0);
  let repeatCount = $state(0);
  let hasCompletedAllRepeats = $state(false);
  let announcement = $state('');

  let {
    children,
    animations = 'bounce',
    trigger = 'hover',
    duration = '1s',
    hideBetween = false,
    hideEnd = false,
    delay = 0,
    repeat = '1',
    pauseDuration = 0,
    class: className = ''
  }: Props = $props();

  let animationClass = $state('animate__animated');
  let isVisible = $state(true);
  let totalRepeats = $derived(parseInt(repeat) || 1);

  let animationsArray: AnimationType[] = $derived(
    Array.isArray(animations) ? animations : [animations as AnimationType]
  );

  // Derived current animation label
  let currentAnimationLabel = $derived(
    `Animate child element with ${animationsArray[currentAnimationIndex]} effect`
  );

  function getAnimationClasses(animation: AnimationType) {
    const classes = [`animate__animated`, `animate__${animation}`];
    return classes.join(' ');
  }

  function parseDuration(duration: string): number {
    if (duration.endsWith('ms')) {
      return parseInt(duration);
    } else if (duration.endsWith('s')) {
      return parseFloat(duration) * 1000;
    }
    return 1000; // Default to 1s
  }

  function canStartNewAnimation() {
    if (isAnimating) return false;
    if (hasCompletedAllRepeats) return false;
    if (repeat === 'infinite') return true;
    return repeatCount < totalRepeats;
  }

  async function startAnimation(startFromIndex = 0) {
    if (!canStartNewAnimation() || prefersReducedMotion) return;

    isAnimating = true;
    isVisible = true;
    currentAnimationIndex = startFromIndex;

    try {
      // Handle initial delay if it's the first animation
      if (delay > 0 && startFromIndex === 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      for (let i = startFromIndex; i < animationsArray.length; i++) {
        if (!isAnimating) break; // Allow for interruption

        currentAnimationIndex = i;

        // Remove animation classes
        animationClass = '';
        // Force a browser reflow
        await new Promise((resolve) => requestAnimationFrame(resolve));
        // Add animation classes back
        animationClass = getAnimationClasses(animationsArray[i]);

        // Wait for animation to complete
        await new Promise((resolve) => {
          const durationMs = parseDuration(duration);
          setTimeout(resolve, durationMs);
        });

        // Add pause between animations if not the last animation
        if (i < animationsArray.length - 1 && pauseDuration > 0) {
          await new Promise((resolve) => setTimeout(resolve, pauseDuration));
        }
      }

      await completeAnimationSequence();
    } catch (error) {
      console.error('Animation error:', error);
      isAnimating = false;
    }
  }

  async function completeAnimationSequence() {
    repeatCount++;
    // Check if we've completed all repeats
    if (repeat !== 'infinite' && repeatCount >= totalRepeats) {
      hasCompletedAllRepeats = true;
    }

    // Reset for next animation
    animationClass = 'animate__animated';
    isAnimating = false;
    currentAnimationIndex = 0;

    if (hasCompletedAllRepeats) {
      isVisible = !hideEnd;
    } else if (hideBetween && repeatCount !== totalRepeats) {
      isVisible = false;
    } else {
      isVisible = !hideEnd;
    }

    // Announce completion
    announcement = 'Animation sequence complete';

    // Start next repetition if needed
    if (canStartNewAnimation()) {
      // Add a small delay before starting the next sequence
      await new Promise((resolve) => setTimeout(resolve, 10));
      startAnimation(0);
    }
  }

  function handleClick() {
    if (trigger === 'click' || trigger === 'both') {
      if (!isAnimating) {
        repeatCount = 0;
        hasCompletedAllRepeats = false;
        startAnimation();
      }
    }
  }

  function handleMouseEnter() {
    if (trigger === 'hover' || trigger === 'both') {
      if (!isAnimating) {
        repeatCount = 0;
        hasCompletedAllRepeats = false;
        startAnimation();
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (trigger === 'click' || trigger === 'both') {
        if (!isAnimating) {
          repeatCount = 0;
          hasCompletedAllRepeats = false;
          startAnimation();
        }
      }
    } else if (event.key === 'Escape' && isAnimating) {
      // Allow stopping animation with Escape key
      isAnimating = false;
    }
  }

  // Auto-trigger animation on mount
  $effect(() => {
    if (trigger === 'auto' && !prefersReducedMotion) {
      repeatCount = 0;
      hasCompletedAllRepeats = false;
      startAnimation();
    }
  });

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
{:else if trigger && trigger !== 'auto'}
  <button
    type="button"
    aria-label={currentAnimationLabel}
    aria-live="polite"
    class="{animationClass} {className}"
    style="opacity: {isVisible
      ? 1
      : 0}; animation-duration: {duration}; background: none; border: none; padding: 0; cursor: pointer;"
    onclick={handleClick}
    onmouseenter={handleMouseEnter}
    onkeydown={handleKeyDown}
  >
    {@render children()}
  </button>
{:else}
  <span
    aria-label={currentAnimationLabel}
    aria-live="polite"
    class="{animationClass} {className}"
    style="opacity: {isVisible ? 1 : 0}; animation-duration: {duration};"
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
@prop animations = 'bounce'
@prop trigger = 'hover'
@prop duration = '1s'
@prop hideBetween = false
@prop hideEnd = false
@prop delay = 0
@prop repeat = '1'
@prop pauseDuration = 0
@prop class: className = ''
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
