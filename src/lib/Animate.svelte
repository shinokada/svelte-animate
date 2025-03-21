<script lang="ts">
  import 'animate.css';
  import type { AnimationProps as Props, AnimationType, AnimationConfig } from './types.ts';

  let prefersReducedMotion = $state();
  let isAnimating = $state(false);
  let currentAnimationIndex = $state(0);
  let repeatCount = $state(0);
  let hasCompletedAllRepeats = $state(false);
  let hasInitialized = $state(false);
  let animationLabel = $state('');
  let ariaAnnouncement = $state('');
  let shouldShowReplayButton = $state(false);

  $effect(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animationClass = '';
    }
  });

  let {
    children,
    animations = 'bounce',
    trigger = 'hover',
    duration = 1000,
    hideEnd = false,
    showReplayButton = false,
    delay = 0,
    repeat = '1',
    pauseDuration = 0,
    class: className = '',
    debug = false
  }: Props = $props();

  let animationClass = $state('animate__animated');
  let isVisible = $state(true);
  let totalRepeats = $derived(parseInt(repeat) || 1);

  // Convert animations to normalized array of AnimationConfig
  let animationsArray = $derived.by((): AnimationConfig[] => {
    if (typeof animations === 'string') {
      return [{ action: animations as AnimationType }];
    }
    if (Array.isArray(animations)) {
      return animations.map((anim) => {
        if (typeof anim === 'string') {
          return { action: anim as AnimationType };
        }
        return anim as AnimationConfig;
      });
    }
    return [{ action: 'bounce' }];
  });

  function getAnimationClasses(animation: AnimationConfig | AnimationType): string {
    if (typeof animation === 'string') {
      return [`animate__animated`, `animate__${animation}`].join(' ');
    }
    return [`animate__animated`, `animate__${animation.action}`].join(' ');
  }

  function getCurrentConfig(): { duration: number; delay: number; pause: number } {
    const config = animationsArray[currentAnimationIndex];
    return {
      duration: config.duration || duration,
      delay: currentAnimationIndex === 0 ? (config.delay ?? delay) : (config.delay ?? 0),
      pause: config.pause ?? pauseDuration
    };
  }

  function canStartNewAnimation() {
    if (isAnimating) return false;
    if (!shouldShowReplayButton && hasCompletedAllRepeats) return false;
    if (repeat === 'infinite') return true;
    return repeatCount < totalRepeats;
  }

  function resetAnimation() {
    repeatCount = 0;
    hasCompletedAllRepeats = false;
    isVisible = true;
    shouldShowReplayButton = false;
    startAnimation();
  }

  async function startAnimation(startFromIndex = 0) {
    if (!canStartNewAnimation()) return;

    isAnimating = true;
    isVisible = true;
    currentAnimationIndex = startFromIndex;

    animationLabel = `${animationsArray[currentAnimationIndex].action} animation in progress`;

    try {
      for (let i = startFromIndex; i < animationsArray.length; i++) {
        if (!isAnimating) break;

        currentAnimationIndex = i;
        const config = getCurrentConfig();

        // Handle delay
        if (config.delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, config.delay));
        }

        // Reset and start animation
        animationClass = '';
        await new Promise((resolve) => setTimeout(resolve, 1));
        animationClass = getAnimationClasses(animationsArray[i]);

        // Wait for animation to complete
        await new Promise((resolve) => {
          setTimeout(resolve, duration);
        });

        // Handle pause between animations
        if (i < animationsArray.length - 1 && config.pause > 0) {
          await new Promise((resolve) => setTimeout(resolve, config.pause));
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
    animationClass = 'animate__animated';
    isAnimating = false;
    currentAnimationIndex = 0;

    if (repeat !== 'infinite' && repeatCount >= totalRepeats) {
      hasCompletedAllRepeats = true;
      isVisible = !hideEnd;
      shouldShowReplayButton = hideEnd && showReplayButton;
    } else {
      if (repeatCount !== totalRepeats) {
        isVisible = false;
      } else {
        isVisible = !hideEnd;
      }
    }

    animationLabel = '';

    await new Promise((resolve) => setTimeout(resolve, 100));
    ariaAnnouncement = hasCompletedAllRepeats ? 'All animations complete' : 'Animation sequence complete';

    // Clear announcement after a longer delay
    setTimeout(() => {
      ariaAnnouncement = '';
    }, 3000);

    // Start next repetition if needed
    if (canStartNewAnimation()) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      startAnimation(0);
    }
  }

  function handleClick() {
    if (trigger === 'click' || trigger === 'both') {
      // Reset repeat count when starting a new click-triggered sequence
      if (!isAnimating) {
        repeatCount = 0;
        hasCompletedAllRepeats = false;
        shouldShowReplayButton = false;
        startAnimation();
      }
    }
  }

  function handleMouseEnter() {
    if (trigger === 'hover' || trigger === 'both') {
      if (!isAnimating) {
        repeatCount = 0;
        // Reset completion state
        hasCompletedAllRepeats = false;
        shouldShowReplayButton = false;
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
          // Reset completion state
          hasCompletedAllRepeats = false;
          shouldShowReplayButton = false;
          startAnimation();
        }
      }
    }
  }

  $effect(() => {
    if (!hasInitialized && trigger === 'auto' && !prefersReducedMotion) {
      hasInitialized = true;
      repeatCount = 0;
      hasCompletedAllRepeats = false;
      shouldShowReplayButton = false;
      startAnimation();
    }
  });

  $effect(() => {
    $inspect('Animation state:', {
      isAnimating,
      hasCompletedAllRepeats,
      repeatCount,
      totalRepeats,
      animationClass,
      currentAnimationIndex,
      showReplayButton
    });
  });
</script>

{#snippet showReplay()}
  <button
    type="button"
    onclick={resetAnimation}
    class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white rounded transition-opacity"
    style="opacity: {!isVisible ? 1 : 0}; pointer-events: {!isVisible ? 'auto' : 'none'}"
  >
    Show Again
  </button>
{/snippet}

{#if prefersReducedMotion}
  {@render children()}
{:else if trigger && trigger !== 'auto'}
  <div class="relative">
    <button
      type="button"
      aria-label={animationLabel}
      aria-live="polite"
      class="{animationClass} {className}"
      style="opacity: {isVisible ? 1 : 0}; animation-duration: {getCurrentConfig().duration}ms; background: none; border: none; padding: 0; cursor: pointer;"
      onclick={handleClick}
      onmouseenter={handleMouseEnter}
      onkeydown={handleKeyDown}
    >
      {@render children()}
    </button>
    {#if shouldShowReplayButton}
      {@render showReplay()}
    {/if}
  </div>
{:else}
  <div class="relative">
    <span
      aria-label={`Animat child element with ${typeof animationsArray[currentAnimationIndex] === 'string' ? animationsArray[currentAnimationIndex] : animationsArray[currentAnimationIndex].action} effect`}
      aria-live="polite"
      class="{animationClass} {className}"
      style="opacity: {isVisible ? 1 : 0}; animation-duration: {getCurrentConfig().duration};"
    >
      {@render children()}
    </span>
    {#if shouldShowReplayButton}
      {@render showReplay()}
    {/if}
  </div>
{/if}

<div role="status" aria-live="polite" aria-atomic="true" class={debug ? 'debug-visible' : 'sr-only'}>
  {#if ariaAnnouncement}
    <p>{ariaAnnouncement}</p>
  {/if}
</div>

<!--
@component
[Go to docs](https://svelte-animate.codewithshin.com/)
## Props
@prop children
@prop animations = 'bounce'
@prop trigger = 'hover'
@prop duration = 1000
@prop hideEnd = false
@prop showReplayButton = false
@prop delay = 0
@prop repeat = '1'
@prop pauseDuration = 0
@prop class: className = ''
@prop debug = false
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

  .debug-visible {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 1rem;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    z-index: 9999;
  }
</style>
