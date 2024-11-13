<script lang="ts">
  import 'animate.css';
  import type { EnhancedAnimationProps as Props, AnimationType } from './types.ts';

  let prefersReducedMotion = $state();
  let isAnimating = $state(false);
  let currentAnimationIndex = $state(0);
  let repeatCount = $state(0);

  $effect(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animationClass = '';
    }
  });

  let { children, animations = 'bounce', trigger = 'hover', duration = '1s', hideBetween = false, hideEnd = false, delay = 0, repeat = '1', pauseDuration = 0, class: className = '' }: Props = $props();

  let animationClass = $state('animate__animated');
  let isVisible = $state(true);
  let totalRepeats = $derived(parseInt(repeat) || 1);

  let animationsArray: AnimationType[] = $derived(Array.isArray(animations) ? animations : [animations as AnimationType]);

  function getAnimationClasses(animation: AnimationType) {
    const classes = [`animate__animated`, `animate__${animation}`];
    return classes.join(' ');
  }

  function canStartNewAnimation() {
    if (isAnimating) return false;
    if (repeat === 'infinite') return true;
    return repeatCount < totalRepeats;
  }

  async function startAnimation(startFromIndex = 0) {
    if (!canStartNewAnimation()) return;

    isAnimating = true;
    isVisible = true;
    currentAnimationIndex = startFromIndex;

    try {
      // Handle initial delay if it's the first animation
      if (delay > 0 && startFromIndex === 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      for (let i = startFromIndex; i < animationsArray.length; i++) {
        console.log('i', i);
        if (!isAnimating) break; // Allow for interruption

        currentAnimationIndex = i;

        // Remove animation classes
        animationClass = '';
        // Force a browser reflow
        await new Promise((resolve) => setTimeout(resolve, 1));
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
    // Reset for next animation
    animationClass = 'animate__animated';
    isAnimating = false;
    currentAnimationIndex = 0;
    repeatCount++;

    // Update isVisible based on hideBetween and current animation index
    if (hideBetween && repeatCount !== totalRepeats) {
      isVisible = false;
    } else {
      if (hideEnd) {
        isVisible = false;
      } else {
        isVisible = true;
      }
      // isVisible = true;
    }

    // Announce completion
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = 'Animation sequence complete';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);

    // Start next repetition if needed
    if (canStartNewAnimation()) {
      // Add a small delay before starting the next sequence
      await new Promise((resolve) => setTimeout(resolve, 10));
      startAnimation(0);
    }
  }

  function parseDuration(duration: string): number {
    if (duration.endsWith('ms')) {
      return parseInt(duration);
    } else if (duration.endsWith('s')) {
      return parseFloat(duration) * 1000;
    }
    return 1000; // Default to 1s
  }

  function handleClick() {
    if (trigger === 'click' || trigger === 'both') {
      // Reset repeat count when starting a new click-triggered sequence
      if (!isAnimating) {
        repeatCount = 0;
        startAnimation();
      }
    }
  }

  function handleMouseEnter() {
    if (trigger === 'hover' || trigger === 'both') {
      if (!isAnimating) {
        repeatCount = 0;
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
          startAnimation();
        }
      }
    }
  }

  $effect(() => {
    if (trigger === 'auto' && !prefersReducedMotion) {
      repeatCount = 0;
      startAnimation();
    }
  });

  $effect(() => {
    $inspect('animationClass', animationClass);
    $inspect('currentAnimationIndex', currentAnimationIndex);
    $inspect('repeatCount', repeatCount);
    $inspect('totalRepeats', totalRepeats);
  });
</script>

{#if prefersReducedMotion}
  {@render children()}
{:else if trigger && trigger !== 'auto'}
  <button
    type="button"
    aria-label={`Animate child element with ${animationsArray[currentAnimationIndex]} effect`}
    aria-live="polite"
    class="{animationClass} {className}"
    style="opacity: {isVisible ? 1 : 0}; animation-duration: {duration}; background: none; border: none; padding: 0; cursor: pointer;"
    onclick={handleClick}
    onmouseenter={handleMouseEnter}
    onkeydown={handleKeyDown}
  >
    {@render children()}
  </button>
{:else}
  <span aria-label={`Animate child element with ${animationsArray[currentAnimationIndex]} effect`} aria-live="polite" class="{animationClass} {className}" style="opacity: {isVisible ? 1 : 0}; animation-duration: {duration};">
    {@render children()}
  </span>
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
